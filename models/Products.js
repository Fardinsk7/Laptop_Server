const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    colors:{
        type:Array,
    },
    
    description:{
        type:String,
        required:true
    },
    
    category:{
        type:String,
        required:true
    },
    featured:{
        type: Boolean,
        required:true
    },
    stock:{
        type:Number,
        required:true,
    },
    reviews:{
        type:Number,
        required:true,
    },
    stars:{
        type: Number,
        required:true,
    },
    image:[]


})

module.exports = ProductModel = mongoose.model("Product",ProductSchema);