import { config } from "dotenv";
import { sign } from "jsonwebtoken";
import { compare, hash } from "bcrypt";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

import User from "../models/User";

const HOUR = 3600000;

config();

const { JWT_SECRET } = process.env;

class AuthC {
  async login(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          data: null,
          errors: errors.array(),
          message: "Validation error",
        });
        return;
      }
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        res.status(400).json({ message: "User not found", data: null });
        return;
      }

      const isMatch = await compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ message: "Incorrect password", data: null });
        return;
      }

      const token = sign({ userId: user.id }, JWT_SECRET as string, {
        expiresIn: "1h",
      });

      res.cookie("token", token, { maxAge: HOUR, httpOnly: true });

      res.json({
        message: "Successfully logged in",
        data: { token, user },
      });
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message, data: null });
      }
    }
  }

  async register(req: Request, res: Response) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          data: null,
          errors: errors.array(),
          message: "Validation error",
        });
        return;
      }

      let { email, password } = req.body;

      const duplicateEmail = await User.findOne({ email });
      if (duplicateEmail) {
        res.status(400).json({
          data: null,
          message: "User with this email already registered",
        });
        return;
      }

      const userModel = new User({
        ...req.body,
        password: await hash(password, 12),
      });

      const user = await userModel.save();

      const token = sign({ userId: user._id }, JWT_SECRET as string, {
        expiresIn: "1h",
      });

      res.cookie("token", token, { maxAge: HOUR, httpOnly: true });

      res.status(201).json({
        data: { token, user },
        message: "Registration is completed",
      });
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message, data: null });
      }
    }
  }
}

export const AuthController = new AuthC();
