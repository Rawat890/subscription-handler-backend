import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";
import mongoose from "mongoose";

const generateAuthToken = (user) => {
  return jwt.sign(
    { userId: user._id },
    JWT_SECRET,
    { expiresIn: "3d" }
  );
};

export const registerUserController = async (req, res, next) => {

  const session = await mongoose.startSession();
  session.startTransaction()
  try {
    let { name, password, email } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        message: "All fields are required"
      })
    }

    const isUserExists = await User.findOne({ email });
    if (isUserExists) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    let hashPassword = await bcrypt.hash(password, 10);
    password = hashPassword

    const newUser = await User.create([{ name, email, password }], { session });

    const token = await generateAuthToken(newUser[0]);

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        token,
        user: newUser[0]
      }
    })
  } catch (error) {
    console.log("error get ---->", error);
    await session.abortTransaction();
    session.endSession();
    next(error)
  }
}

export const loginUserController = async (req, res, next) => {

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      })
    }

    const isUserExists = await User.findOne({ email });
    if (!isUserExists) {
      return res.status(404).json({
        message: "User not found"
      })
    }

    if (password !== await bcrypt.compare(password, isUserExists.password)) {
      return res.status(401).json({
        message: "Invalid credentials"
      })
    }

    console.log(isUserExists)
    const token = await generateAuthToken(isUserExists);

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        token,
        user: isUserExists
      }
    })
  } catch (error) {
    next(error);
  }

}

export const logoutUserController = async () => {

}

