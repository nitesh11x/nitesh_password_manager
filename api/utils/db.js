import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;
console.log("Mongo URI:", uri);

export const mongoClient = () => {
  mongoose
    .connect(uri, { dbName: "Nitesh_Password_Manager" })
    .then(() => console.log("✅ Connected To Database"))
    .catch((err) => console.error("❌ DB connection error:", err));
};
