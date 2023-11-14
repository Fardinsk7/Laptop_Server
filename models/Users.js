const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    firstname:{
        type:String,
        require
    },
    lastname:{
        type:String,
        require
    },
    address:{
        type:String,
        require
    },
    email:{
        type:String,
        require
    },
    password:{
        type:String,
        require
    }

})

module.exports = UsersModel = mongoose.model("UserInfo",UserSchema);