import mongoose from "mongoose";

export type TPost = {
  cover: string;
  title: string;
  category: string;
  desc: string;
  likes?: Array<string>;
  userId: string;
};

const postSchema = new mongoose.Schema<TPost>(
  {
    cover: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    likes: {
      type: [{ type: String }],
      default: [],
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const postModel = mongoose.model("Post", postSchema);

export default postModel;
