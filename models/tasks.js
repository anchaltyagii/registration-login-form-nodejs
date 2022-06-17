const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : String,
    username : String,
    email : String,
    phone : Number,
    password : String
})

module.exports =  mongoose.model("User", userSchema);