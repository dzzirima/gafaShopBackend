import express from "express"

//when running on android  we need to specify that it can be  accessed from anywhere

const PORT = 400
const app = express();

app.listen(PORT ,"0.0.0.0",() =>{
    /**Allows the server to listen to any connecting to it */
    console.log(`App running on  port : ${PORT}`  )
})