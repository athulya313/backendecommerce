const express=require("express");
const Category = require("../models/category");
const Product = require("../models/products");
const router=express.Router();

//a.)endpoint that retrieves a list of categories
router.get("/categories",async(req,res)=>{
  try{
     const categories= await Category.find({})
   res.status(201).json(categories)
  }
  catch(err){
    res.status(401).json({message:"couldnt find the details"})
  }
})
//b) endpoint that retrieves a list of products with cartId
 router.get("/products/:catId",async(req,res)=>{
    try{
        const id=req.params.catId
        console.log(id);
        const products= await Product.find({category:id})
        
       
        res.status(200).json(products)
    }catch(err){
        res.status(400).json({message:"cant find any products"})
    }

 })  
 //c.)endpoint that fetches the detailed information of a specific product by its ID
  router.get("/product/:productId",async(req,res)=>{
    const productid=req.params.productId;
    try{
      const products= await Product.findById(productid);
      res.status(200).json(products)

    }catch(err){
        res.status(400).json({message:"couldnt find product details"})
    }
  })


module.exports=router;