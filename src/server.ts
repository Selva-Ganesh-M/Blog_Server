import express, { Request, Response } from "express";
import { PORT } from "./utils/config";
import { connectToDB } from "./utils/connectToDb";
import { customErrorHandler } from "./middlewares/customErrorHandler";
import customReqLogger from "./utils/customRequestLogger";
import cors from "cors";
import authRouter from "./routers/auth.route";
import postModel from "./models/post.model";
import postsRouter from "./routers/post.route";

const server = express();

// middlewares
server.use(
  cors({
    origin: (origin: any, callback: any) => {
      console.log("request origin: ", origin);
      if (
        ["https://gostblog.netlify.app", "http://localhost:5173"].indexOf(
          origin
        ) !== -1 ||
        !origin
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
server.use(express.json());
//custom request logger
server.use(customReqLogger);

// Routers
// auth router
server.use("/api/auth", authRouter);

// posts router
server.use("/api/posts", postsRouter);

// custom error handler
server.use(customErrorHandler);

const startServer = async () => {
  try {
    await connectToDB();
    console.log("connected to mongoose.");
    server.listen(PORT, async () => {
      console.log(`server started listening at port ${PORT}`);
    });
  } catch (error: any) {
    console.log(error.message);
  }
};
startServer();
