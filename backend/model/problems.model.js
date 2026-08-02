const mongoose = require("mongoose");

const problemsSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    code: { 
        type: String, 
        required: true 
    },
    difficulty:{
        type:String,
        enum: ['Easy', 'Medium', 'Hard'],
        required:true
    },
    comment:{
        type:String
    },
    revision_count:{
        type:Number,
        default:1
    },
    last_revised_at:{
        type:Date,
        default:Date.now
    },
    next_revision_date:{
        type:Date
    }

});

const Problems = mongoose.model("Problems",problemsSchema);
module.exports=Problems;