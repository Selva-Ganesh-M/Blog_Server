import mongoose from "mongoose";

const userSchema = new mongoose.Schema<{
  username: string;
  email: string;
  password: string;
}>({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
