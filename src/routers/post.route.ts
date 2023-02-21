import express from "express";
import {
  dislikePost,
  getAllPosts,
  getsinglePost,
  likePost,
} from "../controllers/posts.ctrl";

const postsRouter = express.Router();

// like a post
postsRouter.post("/like/:id", likePost);

// dislike a post
postsRouter.post("/dislike/:id", dislikePost);

// get single post
postsRouter.get("/:id", getsinglePost);

// get all posts
postsRouter.get("/", getAllPosts);

export default postsRouter;
