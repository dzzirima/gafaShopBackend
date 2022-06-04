import express from "express"

const authRoute = express.Router()

authRoute.post('/api/signup',(req,res)=>{
    //get the data from the user 
    const {name, email,password } = req.body
    //post that data to the database

    //return to the user

} )



export default authRoute;
