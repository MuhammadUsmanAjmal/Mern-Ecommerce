import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";

// @desc Auth user $ get token
// @route POST /api/users.login
// @access Public

const authUser = asyncHandler(async (req, res) => {
  // Client do Request
  const { email, password } = req.body;
  console.log("reqbody", req.body);
  // res.send({
  //     email,
  //     password,
  // })
  const user = await User.findOne({ email });
  //   if (!user) {
  //   console.log('user :- ', user)
  //    res.send ({message: "your email or password is incorrect"})
  //    return res.status(404);
  // }
  //   const checkpass = await user.matchPassword(password);
  //   console.log('check pass :- ', checkpass);

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
    console.log("user", user);
  } else {
    res.status(404);
    throw new Error("Invalid Email Or Password");
  }
});

// @desc Aregister User
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exist");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

const registerSignUp = asyncHandler(async (req, res) => {
  const { fname,lname, email, phn, password } = req.body;
  const userExists = await User.findOne({ phn });

  if (userExists) {
    res.status(400);
    throw new Error("phn already exist");
  }
  const user = await User.create({
    fname,
    lname,
    email,
    phn,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      fname: user.fname,
      lname:user.lname,
      email: user.email,
      phn: user.phn,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("SignUp Failed");
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  // res.send("Success")
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

export { authUser, getUserProfile, registerUser, registerSignUp };
