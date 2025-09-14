import { getAllUser, getUserById, login, register } from "../controllers/userController.js";
import express from "express";
const router = express.Router();

//http://localhost:4000/api/user/register
router.post("/register", register);
//http://localhost:4000/api/user/login
router.post("/login", login);
//http://localhost:4000/api/user/all
router.get("/all", getAllUser);
router.get("/:userId", getUserById);

export default router;
