import mongoose from "mongoose";

// Define the schema outside of any conditions
const tourPackagesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    image: { type: String, required: true },
    coverImage: { type: String },
    coverImages: { type: [String], default: [] },
    category: {
      type: String,
      enum: ["Islands", "Mountains", "Adventure", "Beach", "City", 'Cultural'],
    },
    tourType: {
      type: String,
      enum: ["Domestic", "International"],
      default: "Domestic",
    },
    itinerary: { type: String },
    content: { type: String },
    isTopTour: { type: Boolean, default: false },
    // SEO (optional; blank = derived from title)
    slug: { type: String, trim: true, lowercase: true, index: true },
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
  },
  { timestamps: true }
);


const TourPackage = mongoose.models.TourPackage || mongoose.model("TourPackage", tourPackagesSchema);

export default TourPackage;