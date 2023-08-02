const express=require("express");
const User = require("../models/user");
const Order = require("../models/order");
const router=express.Router()


//api for order placement
router.get("/orders",async(req,res)=>{
  const userId=req.body.userId;

  try {
    
    const user = await User.findById(userId).populate('cart.product');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }


    let totalAmount = 0;
    user.cart.forEach(item => {
      totalAmount += item.product.price * item.quantity;
    });


    const orderDetails = {
      user: userId,
      products: user.cart,
      totalAmount,
    };

    const newOrder = await Order.create(orderDetails);

 //clearing the cart after order placement
    user.cart = [];
    await user.save();

    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: 'Error while placing order'});
  }

})
//order history
router.get('orders/history', async (req, res) => {
    const userId = req.user.id; 
  try {
      const orders = await Order.find({ user: userId });
     res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ message: 'Couldnt load order history' });
    }
  });

  //order details
  router.get('/orders/:orderId', async (req, res) => {
    const orderId = req.params.orderId;
  
    try {
      const order = await Order.findById(orderId).populate('user', 'name').populate('products.product', 'title price');
  
      if (!order) {
        return res.status(404).json({ message:'Order not found'});
      }
  
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ message: 'Error while fetching order details' });
    }
  });
   module.exports=router