import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { ZodError, z } from "zod";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import ms from "ms";
import { customResponse } from "../../../utils/Response";

const prisma = new PrismaClient();
const userController = {
  async fillBankDetails(req, res, next) {
    try {
      const {
        phoneNumber,
        mpin,
        accountNumber,
        bankName,
        IFSCcode,
        accountHolderName,
      } = req.body;
      const userId = req.user.id;

      // Check if the user exists
      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });

      if (user) {
        console.log(user, "user");
        // Create a new wallet for the user
        const createdWallet = await prisma.wallet.create({
          data: {
            userId,
            balance: 100000.0,
          },
        });
        console.log(createdWallet);
        // Create a new bank account associated with the created wallet
        const createdBankAccount = await prisma.bankAccount.create({
          data: {
            bankName,
            accountNumber,
            phoneNumber,
            accountHolderName,
            ifsc: IFSCcode,
            mpin,

            wallet: {
              connect: {
                id: createdWallet.id,
              },
            },
            user: {
              connect: {
                id: userId,
              },
            },
          },
        });

        // You can send a response or handle success here
        res.status(200).json({
          success: true,
          message: "Bank details updated successfully",
          user: {
            ...user,
            bankAccounts: [createdBankAccount],
          },
        });
      } else {
        // Handle the case where the user does not exist
        res.status(404).json({ success: false, error: "User not found" });
      }
    } catch (err) {
      // Handle any errors that occur during the process
      console.error(err, "s");
      res.status(500).json({
        success: false,
        error: err,
      });
    } finally {
      // Close the Prisma client connection
      await prisma.$disconnect();
    }
  },
  async userDetails(req, res, next) {
    try {
      // find the user
      let user;
      user = await prisma.user.findFirst({
        where: {
          id: req.user.id,
        },
        include: {
          bankAccounts: {
            include: {
              wallet: true,
            },
          },
        },
      });
      // console.log(user.mpin, "user");
      res.json(customResponse(200, user));
    } catch (err) {
      res.json(customResponse(400, err));
      console.log(err, "err");
    }
  },
  async getUserByPhoneNumber(req, res, next) {
    try {
      console.log(req.params.id);
      const bankAccount = await prisma.bankAccount.findFirst({
        where: {
          phoneNumber: req.query.phonenumber,
        },
      });

      if (bankAccount) {
        console.log(bankAccount, "user");
        res.status(200).json({
          message: bankAccount,
          success: true,
        });
      } else {
        res.status(200).json({
          message: "no user found",
          success: false,
        });
      }
    } catch (err) {
      res.status(500).json({
        success: false,
        error: err,
      });
    }
  },
  async sendMoney(req, res, next) {
    try {
      const {
        receiverPhoneNumber,
        senderPhonenumber,
        senderWalletId,
        amount,
        description,
        currency,
        receiverWalletId,
        paymentMethod,
      } = req.body;
      const user = await prisma.user.findFirst({
        where: {
          wallet: {
            some: {
              id: receiverWalletId,
            },
          },
        },
      });
      let receiverId;
      if (user) {
        receiverId = user.id;
      } else {
        return res.status(404).json({ message: "Receiver not found" });
      }
      const sender = await prisma.wallet.findUnique({
        where: {
          id: senderWalletId,
        },
      });
      const receiver = await prisma.wallet.findUnique({
        where: {
          id: receiverWalletId,
        },
      });

      if (!receiver) {
        return res.status(404).json({ message: "Receiver not found" });
      }
      console.log(sender, "sender");
      if (sender.balance < amount) {
        return res.status(400).json({ message: "Insufficient balance" });
      }

      // Perform the money transfer and update wallet balances
      const timestamp = new Date();

      // Create a single transaction record for the sender and receiver
      const transaction = await prisma.transaction.create({
        data: {
          senderId: req.user.id,
          recieverPhoneNumber: receiverPhoneNumber,
          senderPhoneNumber: senderPhonenumber,
          receiverId,
          amount: amount, // Deduct amount from sender
          timestamp,
          status: "completed",
          description,
          currency,
          paymentMethod,
        },
      });

      // Update sender's and receiver's wallet balances
      const updatedSenderBalance = sender.balance - amount;
      const updatedReceiverBalance = receiver.balance + amount;

      await prisma.wallet.update({
        where: {
          id: sender.id,
        },
        data: {
          balance: updatedSenderBalance,
        },
      });

      await prisma.wallet.update({
        where: {
          id: receiver.id,
        },
        data: {
          balance: updatedReceiverBalance,
        },
      });

      res.json({
        message: "Money sent successfully",
        transaction,
        success: true,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error, success: false });
    }
  },
  async getTransactionDetails(req, res, next) {
    try {
      const userId = req.user.id;
      const sendTransactions = await prisma.transaction.findMany({
        where: {
          senderId: userId,
        },
        include: {
          receiver: true,
        },
      });
      const receivedTransactions = await prisma.transaction.findMany({
        where: {
          receiverId: userId,
        },
        include: {
          sender: true,
        },
      });

      const allTransactions = [...sendTransactions, ...receivedTransactions];

      res.status(200).json({
        message: allTransactions,
        status: true,
      });
    } catch (err) {
      // Handle errors here
      console.error(err);
      res.status(500).json({
        message: "An error occurred while fetching transactions",
        status: false,
      });
    }
  },
  async validateEmail(req, res, next) {
    try {
      const { email } = req.body; // Assuming the email is in the request body
      console.log(email, "email");
      // Check if the email already exists in the database
      const existingUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (existingUser) {
        // The email already exists in the database
        return res
          .status(200)
          .json({ success: true, message: "Email already exists" });
      } else {
        return res
          .status(200)
          .json({ success: true, message: "Email  is avaliable" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error });
    }
  },
};
export default userController;
