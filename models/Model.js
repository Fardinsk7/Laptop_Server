const mongoose = require('mongoose');

const MySchema =  new mongoose.Schema({
    name:String,
    img:[]
});

module.exports = MyImageModel = mongoose.model("Image",MySchema)