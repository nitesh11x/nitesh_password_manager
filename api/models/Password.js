import mongoose from "mongoose";

const passwordDataSchema = new mongoose.Schema({
  siteName: { type: String, required: true },
  siteUrl: { type: String, required: true },
  password: { type: String, required: true },
});

const passwordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userData: [passwordDataSchema],
});

export const Password = mongoose.model("Passwords", passwordSchema);
