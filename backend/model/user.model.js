const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        require:true
    },
    password:String
});

const User = mongoose.model("User",userSchema);
module.exports=User;