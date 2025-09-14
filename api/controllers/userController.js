import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.SECRET;

// register user
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ message: "User already exists", success: false });

    const hashPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.error("Registration error:", error.message);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// login user
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: "User Not exists", success: false });

    let validPass = await bcrypt.compare(password, user.password);
    if (!validPass)
      return res
        .status(400)
        .json({ message: "Invalid Credentials", success: false });

    const token = jwt.sign({ user: user._id }, jwtSecret, { expiresIn: "1d" });
    res.json({
      message: `${user.name}`,
      success: true,
      token,
      userId: user._id,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// get all user
export const getAllUser = async (req, res) => {
  try {
    let user = await User.find();
    if (!user)
      return res
        .status(400)
        .json({ message: "User Not exists", success: false });

    res.json({ message: "All users ", user, success: true });
  } catch (error) {
    console.error("Login error:", error.message);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

// get user by id
export const getUserById = async (req, res) => {
  const userId = "688ccb234f718181b5299261";
  try {
    let user = await User.findById(userId);
    if (!user)
      return res
        .status(400)
        .json({ message: "User Not exists", success: false });

    res.json({ message: "users ", user, success: true });
  } catch (error) {
    console.error("Login error:", error.message);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};
