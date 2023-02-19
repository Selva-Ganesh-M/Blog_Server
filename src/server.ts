import express, { Request, Response } from "express";
import { PORT } from "./utils/config";
import { connectToDB } from "./utils/connectToDb";
import { customErrorHandler } from "./middlewares/customErrorHandler";
import customReqLogger from "./utils/customRequestLogger";
import cors from "cors";

const server = express();

// middlewares
server.use(cors());
server.use(express.json());
//custom request logger
server.use(customReqLogger);

// Routers

// custom error handler
server.use(customErrorHandler);

const startServer = async () => {
  try {
    await connectToDB();
    console.log("connected to mongoose.");
    server.listen(PORT, () =>
      console.log(`server started listening at port ${PORT}`)
    );
  } catch (error: any) {
    console.log(error.message);
  }
};
startServer();
