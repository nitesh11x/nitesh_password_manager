import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { User } from "../models/User.js";

export const Authenticated = async (req, res, next) => {
  const token = req.header("Auth");

  if (!token) return res.json({ message: "Login First", success: false });

  const decode = jwt.verify(token, process.env.SECRET);
  const id = decode.user;
  //   console.log(id);

  const user = await User.findById(id);
  if (!user) return res.json({ message: "User not found ", success: false });
  req.user = id;
  next();
};
