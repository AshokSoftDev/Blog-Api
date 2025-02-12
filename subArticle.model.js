import mongoose from "mongoose";

const SubArticleSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  subTitle: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const SubArticle = mongoose.model("SubArticle", SubArticleSchema);
export default SubArticle;
