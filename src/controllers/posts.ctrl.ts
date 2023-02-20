import { Request, Response } from "express";
import postModel from "../models/post.model";

export const getAllPosts = async (req: Request, res: Response) => {
  const posts = await postModel.find();
  res.status(200).json({
    statusText: "success",
    statusCode: 200,
    message: "fetched all posts",
    payload: posts,
  });
};
