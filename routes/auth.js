import express from "express";
import User from "../model/user.js";
import bcrypt from "bcryptjs/dist/bcrypt.js";

const authRoute = express.Router();

authRoute.post("/api/signup", async (req, res) => {
  try {
    //get the data from the user
    const { name, email, password } = req.body;

    const existingUSer = await User.findOne({email});

    if (existingUSer) {
      return res
        .status(400)
        .json({ msg: "User with that email already exists" });
    }
    //post that data to the database
    const hashedPassword = bcrypt.hashSync(password, 8);
    let user = new User({
      email,
      password: hashedPassword,
      name,
    });
    user = await user.save();

    return res.json(user);
    //return to the user
  } catch (error) {
      return res.status(500).json({msg:error.message})
  }
});

export default authRoute;
