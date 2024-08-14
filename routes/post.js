const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    postText: {
        type: String,//this means the data type would be of type string 
        required: true//this mean it is neccessary to fill this 
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"//here it means it is pointing to this model
    },
    createAt:{
        type: Date,
        default: Date.now,//this will give the current date as a default if we don;t specify
    },
    likes: {
        type: Array,
        default: [],
    }
})

module.exports = mongoose.model("Post",postSchema);