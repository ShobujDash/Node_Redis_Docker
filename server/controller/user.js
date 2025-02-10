import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../model/user.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    // finding user ki whith this emial id se register toh ni
    const user = await User.findOne({ email });
    if (user) {
      return res.status(403).json({
        success: false,
        message: "The email id is already registered.",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullName: fullname,
      email,
      password: hashPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Register successfull.",
    });
  } catch (error) {
    console.log(error);
  }
};

export const lgoin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Incorrect email or password.",
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(403).json({
        success: false,
        message: "Incorrect email or password.",
      });
    }

    const token = await jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return (
      res.status(200).
      cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      }).json({
        success: true,
        message: `Welcome back ${user.fullName}`,
      })
    );
  } catch (error) {
    console.log(error);
  }
};
export const logout = async (req, res) => {
  try {
    return (
      res.status(200).
      cookie("token", "", {
        maxAge: 0,
      }).json({
        success: true,
        message: `User logout successfully`,
      })
    );
  } catch (error) {
    console.log(error);
  }
};
