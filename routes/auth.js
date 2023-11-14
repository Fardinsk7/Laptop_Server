const express = require("express");
const router = express.Router();
const UsersModel = require("../models/Users");
const jwt = require('jsonwebtoken')
const JWT_TOKEN = "jasklfdjsdoriwenfoaioewir92734398";
const bcrypt = require("bcryptjs")


//Signup
router.post("/signup",async(req,res)=>{
    try {
        const {email,password} = req.body;
        const existEmail = await UsersModel.findOne({email});
        if(existEmail){
           return res.status(400).json({message:"User Exist"})
        }
        const secondPass = await bcrypt.hash(password,10);
        const newUser = await UsersModel.create({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            address:req.body.address,
            email:email,
            password:secondPass
        })

        const data = {
            user:{
                id:newUser.id
            }
        }

        //Creating Jwt auth token for user
        const token = await jwt.sign(data,JWT_TOKEN,{expiresIn:"24h"});
        console.log(JWT_TOKEN)
    
        res.status(201).json({message:"Sign up Successfull",token});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }

    
})

//Login
router.post("/login",async(req,res)=>{
    try {
        const JWT_TOKEN = "jasklfdjsdoriwenfoaioewir92734398";
        const {email,password}=req.body
        //checking email
        const existUser = await UsersModel.findOne({email});
        if(!existUser){
            return res.status(404).send("User Not Found");
        }
        //checking password
        const passwordCheck = await bcrypt.compare(req.body.password,existUser.password);
        if(!passwordCheck){
            return res.status(404).send("Password Not Match")
        }

        const token = jwt.sign({
            user:{
                id:existUser._id
            }
        },JWT_TOKEN,{expiresIn:"24h"});

        return res.status(200).json({message:"Login Successfull",token});
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Server Error")
    }
})

router.get("/getuser/:token",async(req,res)=>{
    try {
    const token = req.params.token;
    const data = jwt.verify(token,JWT_TOKEN);
    const userId = data.user.id
    const userData = await UsersModel.findById(userId);
    if(!userData){
        return res.status(404).send("User Not Found")
    }
    res.status(201).json({firstname:userData.firstname,lastname:userData.lastname,address:userData.address,email:userData.email});
        
    } catch (error) {
        console.log(error);
        return res.status(500).send("Server Error")
    }

})


module.exports = router;