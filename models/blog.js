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
  content: { type: String, required: true },
  // SEO (optional; blank = derived from title/excerpt)
  slug: { type: String, trim: true, lowercase: true, index: true },
  metaTitle: { type: String, trim: true },
  metaDescription: { type: String, trim: true },
  metaKeywords: { type: String, trim: true }, // comma-separated
  imageAlt: { type: String, trim: true },
  // Former URL slugs; requests to these 301 to the current URL.
  previousSlugs: { type: [String], default: [], index: true },
}, { timestamps: true });


export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);
 