import express from "express"
import authRoute from "./routes/auth.js";
import mongoose from "mongoose";
const mongoURL = "mongodb://localhost:27017/gafashop"

//when running on android  we need to specify that it can be  accessed from anywhere

const PORT = 400
const app = express();

app.use(authRoute)




//connecting to db
mongoose.connect(mongoURL).then(()=>{
    console.log("Db Connected")
}).catch((error) =>{
    console.log("Error in connecting to the db")
})

app.listen(PORT ,"0.0.0.0",() =>{
    /**Allows the server to listen to any connecting to it
     * good for android emulation...
     */
    console.log(`App running on  port : ${PORT}`  )
})