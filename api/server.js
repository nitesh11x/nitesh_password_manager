import express from "express";
import cors from "cors";
const app = express();

// to use dot env
import dotenv from "dotenv";
dotenv.config();

// variables
const port = process.env.PORT || 3000;

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// routes
app.get("/", (req, res) => res.json("Welcome To nitesh Password Manager"));

// user route
import userRoute from "./routes/userRouter.js";
app.use("/api/user/", userRoute);

import passwordRoute from "./routes/passwordRouter.js";
app.use("/api/password/", passwordRoute);

// database connection
import { mongoClient } from "./utils/db.js";
mongoClient();

// start server
app.listen(port, () => console.log(`server is live on port ${port}`));
