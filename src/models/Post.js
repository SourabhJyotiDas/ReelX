import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  image: { type: String, required: true },
  caption: String,
}, { timestamps: true });

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);
export default Post;
