import express from "express";
import User from "../model/user.js";
import bcrypt from "bcryptjs";
import  Jwt  from "jsonwebtoken";

const authRoute = express.Router();

authRoute.post("/api/signup", async (req, res) => {
  try {
    //get the data from the user
    const { name, email, password } = req.body;

    const existingUSer = await User.findOne({ email });

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
    return res.status(500).json({ msg: error.message });
  }
});

//sign in User
// jwt will allow us to verify who we say are we
authRoute.post("/api/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    //gard closes
    if (!user) {
      return res.status(400).json({msg:"User with this email does not exist !"})
    }

    //due to the salt issues 2 paswords will never have the same hashed passwords
    const isMatch = await bcrypt.compare(password,user.password)

    if(!isMatch){
      return res.status(400).json({msg:"Incorrect Password"})
    }

    //token should be stored in memory
    const token = Jwt.sign({id:user._id},"passwordKey")

    return res.json({token,...user._doc})


  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default authRoute;
