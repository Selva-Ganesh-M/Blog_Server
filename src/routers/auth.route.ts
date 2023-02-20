import express from "express";
import { loginUser, registerUser } from "../controllers/auth.controller";

const authRouter = express.Router();

// signup - create user
authRouter.post("/register", registerUser);

// signin
authRouter.post("/login", loginUser);

export default authRouter;
