import express from "express";
import User from "../model/user.js";
import bcrypt from "bcryptjs";
import  Jwt  from "jsonwebtoken";
import { auth } from "../middlewares/auth.js";

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

//checking the validity of token
authRoute.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header('x-auth-token')
    if(!token) return res.json(false)

   const verified=  Jwt.verify(token,"passwordKey")
   if(!verified) return res.json(false);

   //getting the user associated  with the person who is sending the request
   const user = await User.findById(verified.id)
   if(!user)  return res.json(false)

   res.json(true)

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


//getting the user Data
authRoute.get('/',auth,async (req,res) =>{
  try {
    const user = await User.findById(req.user)

    res.json({...user._doc , token :req.token})
  } catch (error) {
    
  }
} )

export default authRoute;
