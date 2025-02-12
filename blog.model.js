import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
  image: { type: String },
  subArticles: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubArticle" }],
});

const Post = mongoose.model("Post", PostSchema);
export default Post;
