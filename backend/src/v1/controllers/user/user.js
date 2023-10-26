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
      const { accountNumber, bankName, IFSCcode, accountHolderName } = req.body;
      const userId = req.user.id;

      // Check if the user exists
      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });

      if (user) {
        // Update the user's bank details
        const updatedUser = await prisma.user.update({
          where: { id: userId },
          data: {
            AccountNumber: accountNumber,
            bank: bankName,
            AccountHolderName: accountHolderName,
            IFSC: IFSCcode,
          },
        });

        // You can send a response or handle success here
        res.status(200).json({
          success: true,
          message: "Bank details updated successfully",
          user: updatedUser,
        });
      } else {
        // Handle the case where the user does not exist
        res.status(404).json({ success: false, error: "User not found" });
      }
    } catch (err) {
      // Handle any errors that occur during the process
      console.error(err);
      res
        .status(500)
        .json({
          success: false,
          error: "An error occurred while updating bank details",
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
      });
      res.json(customResponse(200, user));
    } catch (err) {
      res.json(customResponse(400, err));
      console.log(err, "err");
    }
  },
  async sendMoney(req, res, next) {
    const { receiverId, amount, description, currency, paymentMethod } =
      req.body;
    const senderId = req.user.id;

    try {
      const sender = await prisma.user.findUnique({
        where: { id: senderId },
        select: {
          wallet: true,
        },
      });
      const receiver = await prisma.user.findUnique({
        where: { id: receiverId },
        select: {
          wallet: true,
        },
      });

      if (!receiver) {
        return res.status(404).json({ message: "Receiver not found" });
      }

      if (sender.wallet[0].balance < amount) {
        return res.status(400).json({ message: "Insufficient balance" });
      }

      // Perform the money transfer and update wallet balances
      const timestamp = new Date();

      // Create a single transaction record for the sender and receiver
      const transaction = await prisma.transaction.create({
        data: {
          senderId,
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
      const updatedSenderBalance = sender.wallet[0].balance - amount;
      const updatedReceiverBalance = receiver.wallet[0].balance + amount;
      console.log(sender.wallet[0]);
      console.log(receiverId);
      console.log(updatedSenderBalance);

      console.log(updatedReceiverBalance);

      await prisma.wallet.update({
        where: {
          id: sender.wallet[0].id,
        },
        data: {
          balance: updatedSenderBalance,
        },
      });

      await prisma.wallet.update({
        where: {
          id: receiver.wallet[0].id,
        },
        data: {
          balance: updatedReceiverBalance,
        },
      });

      res.json({ message: "Money sent successfully", transaction });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error });
    }
  },
};
export default userController;
