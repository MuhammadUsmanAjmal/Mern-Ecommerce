import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // yahan bearer token match krwa rhy h
    //    res.send("Token Found");

    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // jo env main secret key d h us ko access krnay k liay decode use hota h
      req.user = await User.findById(decoded.id).select("-password"); // yahan decode ki request send ki h with id
      next();
    } catch (error) {
      console.log(error.message);
      res.status(401);
      throw new Error("No Authorized, Token Failed");
    }
  }

  if (!token) {
    res.status(401);
    res.send("No Authorized , No Token");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };
