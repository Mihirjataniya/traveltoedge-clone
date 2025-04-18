import mongoose from "mongoose";

const formDataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    travellers: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default  mongoose.model("FormData", formDataSchema);
