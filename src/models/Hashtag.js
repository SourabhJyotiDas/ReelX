import mongoose from "mongoose";

const HashtagSchema = new mongoose.Schema({
  tag: { type: String, required: true, unique: true },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }]
}, { timestamps: true });

const Hashtag = mongoose.models.Hashtag || mongoose.model("Hashtag", HashtagSchema);
export default Hashtag;
