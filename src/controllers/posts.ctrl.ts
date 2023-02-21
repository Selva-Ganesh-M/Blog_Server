import { Request, Response } from "express";
import postModel from "../models/post.model";
import asyncHandler from "express-async-handler";
import { customError } from "../utils/customError";

export const getAllPosts = async (req: Request, res: Response) => {
  const posts = await postModel.find();
  res.status(200).json({
    statusText: "success",
    statusCode: 200,
    message: "fetched all posts",
    payload: posts,
  });
};

// like post
export const likePost = asyncHandler(
  async (
    req: Request<{ id: string }, {}, { userId: string }>,
    res: Response
  ) => {
    console.log("like post");

    // update the /model
    const post = await postModel.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $addToSet: {
          likes: req.body.userId,
        },
      },
      {
        new: true,
      }
    );

    // response
    res.status(200).json({
      statusText: "success",
      statusCode: 200,
      message: "like success",
      payload: post,
    });
  }
);

// dis-like post
export const dislikePost = asyncHandler(
  async (
    req: Request<{ id: string }, {}, { userId: string }>,
    res: Response
  ) => {
    console.log("dislike post");

    // update the /model
    const post = await postModel.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $pull: {
          likes: req.body.userId,
        },
      },
      {
        new: true,
      }
    );

    // response
    res.status(200).json({
      statusText: "success",
      statusCode: 200,
      message: "like success",
      payload: post,
    });
  }
);

// get a post
export const getsinglePost = asyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    console.log("get single post");

    const post = await postModel.findById(req.params.id);
    if (!post)
      throw new customError(404, "fetch post failed: requested post not found");

    // response
    res.status(200).json({
      statusText: "success",
      statusCode: 200,
      message: "post found",
      payload: post,
    });
  }
);
