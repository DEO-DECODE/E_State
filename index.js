import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
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
app.listen(8000, () => {
  console.log("Server is running on port 3000!");
});
