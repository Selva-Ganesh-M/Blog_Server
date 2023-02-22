import { Request, Response } from "express";
import postModel from "../models/post.model";
import asyncHandler from "express-async-handler";
import { customError } from "../utils/customError";
import userModel from "../models/user.model";

export type TPost = {
  cover: string;
  category: string;
  title: string;
  desc: string;
  userId: string;
};

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

// delete a post
export const deletePost = asyncHandler(
  async (
    req: Request<{ id: string }, {}, { userId: string }>,
    res: Response
  ) => {
    const post = await postModel.findByIdAndDelete(req.params.id);

    // response
    res.status(200).json({
      statusText: "success",
      statusCode: 200,
      message: "post deleted successfully",
      payload: post,
    });
  }
);

// create a post
export const createPost = asyncHandler(
  async (req: Request<{}, {}, TPost>, res: Response) => {
    // creation
    const post = new postModel(req.body);
    await post.save();

    // response
    res.status(201).json({
      statusText: "success",
      statusCode: 201,
      message: "new post created",
      payload: post,
    });
  }
);

// update post
export const updatePost = asyncHandler(
  async (req: Request<{ id: string }, {}, Partial<TPost>>, res: Response) => {
    const data = req.body;
    const post = await postModel.findByIdAndUpdate(req.params.id, req.body, {
      upsert: true,
      new: true,
    });

    if (!post) throw new customError(500, "update failed: update post failed.");

    res.status(200).json({
      statusText: "success",
      statusCode: 200,
      message: "post updated successfully",
      payload: post,
    });
  }
);

// get my blogs
export const getMyBlogs = asyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const posts = await postModel.find({ userId: id }).lean();

    // if mongoose failed
    if (!posts)
      throw new customError(
        500,
        "fetch my posts failed: mongoose return null, but the possible value is []"
      );

    // resposne
    res.status(200).json({
      statusText: "success",
      statusCode: 200,
      message: "fetched myblogs",
      payload: posts,
    });
  }
);
