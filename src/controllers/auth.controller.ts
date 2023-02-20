import { Request } from "express";
import asyncHandler from "express-async-handler";
import userModel from "../models/user.model";
import { JWT_SECRET } from "../utils/config";
import { customError } from "../utils/customError";
import hashPassword from "../utils/hashPassword";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registerUser = asyncHandler(
  async (
    req: Request<
      {},
      {},
      {
        username: string;
        email: string;
        password: string;
      }
    >,
    res
  ) => {
    console.log(req.body);

    // if user already exists send error
    let user = await userModel.findOne({ email: req.body.email });
    if (user) throw new customError(400, "provided email is already in user.");
    console.log("here1");

    // create user
    user = new userModel({
      ...req.body,
      password: hashPassword(req.body.password),
    });
    console.log("here2");

    await user.save();
    console.log("here3");

    // send user as response
    const resUser = await userModel
      .findOne({ email: req.body.email })
      .select("-password")
      .lean();
    console.log("here5");

    if (!resUser)
      throw new customError(
        500,
        "mongoose user fetch failed: mongoose doesn't returned the user."
      );
    console.log("here6");

    // reponse
    res.status(201).json({
      statusText: "success",
      statusCode: 201,
      message: "user created successfully",
      payload: resUser,
    });
  }
);

export const loginUser = asyncHandler(
  async (
    req: Request<
      {},
      {},
      {
        email: string;
        password: string;
      }
    >,
    res
  ) => {
    console.log(req.body);

    // if user not found send error
    let user = await userModel.findOne({ email: req.body.email });
    if (!user)
      throw new customError(404, "no user found with the provided email.");

    // password verification
    const isValidPassword = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isValidPassword) {
      throw new customError(400, "password mismatch found");
    }

    // jwt token prep
    const token = jwt.sign(
      {
        email: user.email,
        _id: user._id,
      },
      JWT_SECRET
    );

    // send user as response
    const resUser = await userModel
      .findOne({ email: req.body.email })
      .lean()
      .select("-password");

    // reponse
    res.status(200).json({
      statusText: "success",
      statusCode: 200,
      message: "login successsful",
      payload: { ...resUser, token },
    });
  }
);
