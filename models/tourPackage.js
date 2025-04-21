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
    category: {
      type: String,
      enum: ["Islands", "Mountains", "Adventure", "Beach", "City", 'Cultural'],
    },
    itinerary: { type: String },
    isTopTour: { type: Boolean, default: false },
  },
  { timestamps: true }
);


const TourPackage = mongoose.models.TourPackage || mongoose.model("TourPackage", tourPackagesSchema);

export default TourPackage;