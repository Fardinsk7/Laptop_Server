const express = require("express");
const router = express.Router();
const ProductModel = require('../models/Products')
const stripe = require("stripe")(process.env.STRIPE_KEY);


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


//Stripe route
router.post("/createCheckoutSession", async(req,res)=>{
    const{products} = req.body;
    console.log("Hello Stripe");
    const lineItems = products.map((product)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name: product.name,
                images:[product.image]
            },
            unit_amount: Math.round(product.price*100)
        },
        quantity: product.amount
    }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items: lineItems,
        mode:"payment",
        success_url:"https://caymanlaptops.netlify.app/paymentSuccess",
        cancel_url:"https://caymanlaptops.netlify.app/paymentFail",
        shipping_address_collection: {
            allowed_countries: ['US', 'CA', 'GB', 'AU', 'IN'], // Add the two-letter country code for India
        },
    })
    res.json({id:session.id})
    
})



module.exports = router;
