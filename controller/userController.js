import bcrypt from "bcryptjs";
import User from "../model/userModel.js";
import { generateToken } from "../helpers/generateToken.js";
import asyncHandler from "express-async-handler";
import { sendEmail } from "../helpers/sendEmail.js";
import crypto from "crypto";

export const signup = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("all fields are required");
  }

  if (password.length < 5) {
    res.status(400);
    throw new Error("password should be 5 or more characters");
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(409);
    throw new Error("user already exist");
  }

  // hash password
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    const check = await bcrypt.compare(password, user.password);

    if (check) {
      // generate jwt token
      const token = generateToken(user._id);

      // set cookies for subsequent requests
      res.cookie("jwt", token, {
        maxAge: 3 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      res.status(200).json({
        _id: user._id,
        email: user.email,
      });
    } else {
      res.status(401);
      throw new Error("wrong email or password");
    }
  } else {
    res.status(401);
    throw new Error("wrong email or password");
  }
});

export const logOut = (req, res) => {
  res.cookie("jwt", "", { maxAge: -1 });

  res.sendStatus(200);
};

export const allTicketsByUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).select("-password").populate("tickets");
  res.status(200).send(user);
});


export const allUsers = asyncHandler(async (req, res) => {
  const users = await User.find()

  res.status(200).send(users)
})

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  //check if user exists in the db
  const user = await User.findOne({ email });

  // const user = new User()

  if (user) {
    const token = user.generatePasswordToken();

    // await user.save();
    await user.save({ validateBeforeSave: false });

    // const emailUrl = `http:localhost:5173/forgot-password/${token}`;
    const emailUrl = `http:localhost:5173/reset-password/${token}`;

    const message = `We have received a request from your account for a password reset.
         Kindly follow the link below \n ${emailUrl} \n This link expires in 15 minutes. Kindly ignore this message if you didn't request a password reset or call support for assistance`;

    const options = {
      email: user.email,
      subject: "Password reset request",
      text: message,
    };

    const send = await sendEmail(options);

    if (send) {
      res.status(200).json({ message: "Email success", send });
    } else {
      res.status(500);
      throw new Error("Email could not be sent");
    }
  } else {
    res.status(404);
    throw new Error("Email not found, please sign up");
  }
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;

  const isSame = crypto.createHash("sha256").update(token).digest("hex");

  console.log('isSame', { isSame });

  const user = await User.findOne({
    passwordResetToken: isSame,
    passwordResetTokenExpiry: { $gt: Date.now() }});

  if (!user) {
    res.status(400);
    throw new Error("Token is invalid or expired");
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //user.password = req.body;
  user.password = hashedPassword;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpiry = undefined;

  await user.save();

  res.status(200).json({ message: "password changed successfully" });
});


export const changePassword = asyncHandler(async (req, res) => {
    
const user = await User.findById(req.user._id);
// console.log(user)

const {currentPassword, newPassword} = req.body

const checkPassword = await bcrypt.compare(currentPassword, user.password)

if(!checkPassword) {
    res.status(403)
    throw new Error('password provided is invalid')
}

if(currentPassword === newPassword) {
    res.status(400);
    throw new Error('password should not be same as old password')
}

const salt = await bcrypt.genSalt(10);

const hashedPassword = await bcrypt.hash(newPassword, salt);


user.password = hashedPassword;

await user.save()

res.status(200).json({message: 'Password changed successfully'})


})
