import express from "express";
import {
  addPassword,
  deletePassword,
  getPassword,
} from "../controllers/passwordController.js";
import { Authenticated } from "../middlewares/auth.js";

const router = express.Router();
// ad password
router.post("/add", Authenticated, addPassword);
// get password
router.get("/get", Authenticated, getPassword);
// delete password
router.delete("/delete/:userDataId", Authenticated, deletePassword);

export default router;
