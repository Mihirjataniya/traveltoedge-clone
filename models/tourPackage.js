import mongoose from "mongoose";


const tourPackagesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    image: { type: String, required: true },
    category: { type: String },
    itinerary: { type: String },
}, { timestamps: true });


export default mongoose.models.TourPackage || mongoose.model("TourPackage", tourPackagesSchema);
