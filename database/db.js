const mongoose = require("mongoose");
require("dotenv").config()

const server = "127.0.0.1:27017";
const database = "ecommerce";

mongoose.set("strictQuery", false);
const connecttoMongo = async()=>{
    
    const db = await mongoose.connect(`${process.env.MONGO_URL}`);
    console.log("Connection to Mongodb successfull");
    return db;
}

module.exports = connecttoMongo;


