import bcryptjs from "bcryptjs";
import User from "../models/userModel.js";
import Listing from "../models/listingModel.js";
import { errorHandler } from "../utils/error.js";
export const test = (req, res) => {
  res.json({
    message: "API is working",
  });
};
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only Update your Own Profile"));
  }
  try {
    console.log("Inside Update User Function");
    console.log(req.body);
    console.log(req.user);
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updateUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      {
        new: true,
      }
    );
    const { password, ...rest } = updateUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return next(errorHandler(401, "You Can Only Delete Your Own Account"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been Deleted!");
  } catch (error) {
    next(error);
  }
};
export const getUserListings = async (req, res, next) => {
  try {
    if (req.user.id === req.params.id) {
      const listings = await Listing.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } else {
      return next(errorHandler(401, "You can only view your own Listings"));
    }
  } catch (error) {
    s;
    next(error);
  }
};
