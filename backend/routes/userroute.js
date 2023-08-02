const express=require("express");
const User = require("../models/user");

const router=express.Router();

// endpoints to allow users to add products to their cart
 router.post("/users/cart/:userId",async(req,res)=>{
  const userId=req.params.userId;
  const productId=req.body.productId
  try{
   const user=await User.findById(userId)
   if(!user){
   res.status(400).json({message:"user not found"})
   }
   const product=await User.findById(productId)
   if(!product){
    res.status(400).json({message:"sorry,couldnt find the product"})
   }
   //if the product exists already
   const existInCart=user.cart.find(prod=>prod.product.toString())
   if(existInCart){
        existInCart.quantity=existInCart.quantity+quantity
   }else{
     user.cart.push({product:productId,quantity})
   }
  await user.save() ;
  res.status(200).json(user)
}catch(err){
    res.status(400).json({message:"product couldnt add to cart"})
}
 })
//view the cart
router.get("/users/cart/:userId",async(req,res)=>{
    const userId=req.params.userId
    try{
        const user=await User.findById(userId)
        const cart=user.cart
        if(!user){
            res.status(400).json({message:"cant find user"})
        }
        res.status(200).json(cart)
    }catch(err){
        res.status(404).json({message:"cant find the cart items"})
    }
})
//remove item from cart
router.delete("users/cart/delete/:userId/:productId",async(req,res)=>{
    const userId=req.params.userId;
    const productId=req.params.productId;

    try {
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message:'User not found' });
        }
    
        
        user.cart = user.cart.filter(item => item.product.toString() !== productId);
        await user.save();
    
        res.status(200).json(user.cart);
      } catch (err) {
        res.status(500).json({ message: 'cant delete the product' });
      }
    
})



module.exports=router;
