import express from "express";
import { getAllPosts } from "../controllers/posts.ctrl";

const postsRouter = express.Router();

// get all posts
postsRouter.get("/", getAllPosts);

export default postsRouter;
