import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";
export const verifyToken = async (req, res, next) => {
  const token = req.cookies.access_token;
  console.log("Inside Verify User");
  console.log(token);
  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(403, "Forbidden"));
    }
    req.user = user;
    // Which will be basically _id.
    next();
  });
};
