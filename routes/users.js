const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Pinterest")

const userSchema  = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true//this means every data that we gonna post hsould beunique 
  },
  password:{
    type: String,
    required: true,
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,//out post will be the array of ids
    ref: 'Post',//it is pointing it this model
  }],
  email:{
    type: String,
    required: true,
    unique: true
  },
  fullname: {
    type: String,
    required : true,
  }
})

module.exports = mongoose.model("User",userSchema);