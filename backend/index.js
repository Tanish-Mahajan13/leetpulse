require('dotenv').config();
const express = require("express");
const mongoose = require('mongoose'); 
const app = express()   
app.use(express.json())
const userRouter = require("./routes/user.route");
app.use(express.urlencoded())
app.use("/users",userRouter);

mongoose.connect("mongodb://127.0.0.1:27017/leetpulse")
  .then(() => console.log('DB Connected!'))
  .catch((e)=>console.log(e));

app.listen(4444, () => {
  console.log('Server is running on http://localhost:4444')
})