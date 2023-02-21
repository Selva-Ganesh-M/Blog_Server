import express from "express";
import {
  createPost,
  deletePost,
  dislikePost,
  getAllPosts,
  getsinglePost,
  likePost,
  updatePost,
} from "../controllers/posts.ctrl";

const postsRouter = express.Router();

// get single post
postsRouter.get("/:id", getsinglePost);

// like a post
postsRouter.post("/like/:id", likePost);

// dislike a post
postsRouter.post("/dislike/:id", dislikePost);

// delete post
postsRouter.delete("/delete/:id", deletePost);

// update post
postsRouter.patch("/update/:id", updatePost);

// create new post
postsRouter.post("/create", createPost);

// get all posts
postsRouter.get("/", getAllPosts);

export default postsRouter;
