import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  date: { type: Date, default: Date.now },
  readTime: { type: String, required: true },
  category: {
    type: String,
    enum: ["Food", "Wildlife", "Islands", "History", "Mountains", "Adventure", "Beach"],
    required: true
  },
  location: { type: String, required: true },
  image: { type: String, required: true },
  author: { type: String, required: true },
});

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
