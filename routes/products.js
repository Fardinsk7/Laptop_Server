const express = require("express");
const router = express.Router();
const ProductModel = require('../models/Products')


//Uploading Products to database
router.post("/admin/uploadProducts",async(req,res)=>{
    
    try {
        const product = new ProductModel({
            name: req.body.name,
            company:req.body.company,
            price:req.body.price,
            colors:req.body.colors,
            description: req.body.description,
            category: req.body.category,
            featured: req.body.featured,
            stock:req.body.stock,
            reviews: req.body.reviews,
            stars: req.body.stars,
            image:req.body.image,
        })
        product.save()
        .then(()=>{
            res.send("Products stored successfully")
        })
        .catch(err=>{
            res.send(err)
        })
        
        
    } catch (error) {
        console.log(error)
        res.status(500).json({mesage:"Server Error"})
    }
})

//Getting all Products details
router.get("/admin/getallProduct",async(req,res)=>{
    try {
        const data = await ProductModel.find();
        res.status(200).send(data);
        
        
    } catch (error) {
        console.log(error)
        res.status(500).json({mesage:"Server Error"})
    }
})

//Getting Single Product detail by id
router.get("/admin/:id",async(req,res)=>{
    try {
        const singleData = await ProductModel.findById(req.params.id)
        if(!singleData){
            return res.status(404).json({message:"Product Not Found"})
        }
        res.json(singleData)
        // res.send("hell id")
        
    } catch (error) {
        console.log(error)
        res.status(500).json({mesage:"Server Error"})
    }
})

//Deleting a Product 
router.delete("/delete/:id",async(req,res)=>{
    try {
        const dataToDelete = await ProductModel.findByIdAndDelete(req.params.id)
        if(!dataToDelete){
            return res.status(401).json({message:"Process Failed"})
        }
        res.status(201).json({message:"Successfully Deleted",deletedItem:dataToDelete})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"})
    }
})



module.exports = router;
