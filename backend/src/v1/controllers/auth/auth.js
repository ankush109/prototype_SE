import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { ZodError, z } from "zod";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import ms from "ms";
import { customResponse } from "../../../utils/Response";

const prisma = new PrismaClient();
const loginController = {
  async login(req, res, next) {
    try {
      const { email, password } = await req.body;
      let user;
      user = await prisma.user.findUniqueOrThrow({
        where: {
          email,
        },
      });

      if (!user) {
        return next(createError.Unauthorized("Verify your Credentials"));
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return next(createError.Unauthorized("Verify your Credentials1"));
      }

      // generating jwt tokens for the logged in user

      const accessToken = jwt.sign(user.id, process.env.USER_ACCESS_SECRET);

      res.cookie("accessToken", accessToken, {
        maxAge: ms("30m"),
        httpOnly: true,
      });

      res.json(customResponse(200, { accessToken }));
    } catch (err) {
      console.log(err);
      res.status(400).json({
        message: err,
      });
    }
  },

  async logout(req, res, next) {
    try {
      res.clearCookie("accessToken");
      res.json(customResponse(200, "Logged Out"));
    } catch (err) {
      console.log(err);
      return next(createError.InternalServerError());
    }
  },
  // register function

  async register(req, res, next) {
    try {
      const resp = await req.body;
      delete resp.confirmPassword;

      const existingUser = await prisma.user.findUnique({
        where: {
          email: resp.email,
        },
      });

      if (existingUser) {
        return res.status(400).json({
          message: "User already exists",
        });
      }

      // Continue with user registration
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(resp.password, salt);
      const data = {
        ...resp,
        password: hashedPassword,
      };
      const createdUser = await prisma.user.create({
        data,
      });

      return res.status(200).json({
        success: true,
        message: "User created successfully",
        createdUser,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: err,
        success: false,
      });
    }
  },
};
export default loginController;
