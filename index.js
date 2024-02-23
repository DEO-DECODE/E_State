import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes";
import authRouter from "./routes/authRoutes";
import { signup } from "./controllers/authController";
dotenv.config();
mongoose
  .connect("mongodb://127.0.0.1/Estate")
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.log(error);
  });
const app = express();
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.listen(8000, () => {
  console.log("Server is running on port 8000!");
});
