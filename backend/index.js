const express=require("express");
const { default: mongoose } = require("mongoose");
const app=express();
const productRouter=require("./routes/productsroute")
const userRouter=require("./routes/userroute")
const orderRouter=require("./routes/orderroute")
const authRouter=require("./routes/auth")

const bodyParser = require("body-parser");

PORT=4000

mongoose.connect("mongodb+srv://athulyaathu313:7Nb8yLv1iQvEaWMC@cluster0.nymntnf.mongodb.net/?retryWrites=true&w=majority")

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
  });
    
  
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
  
app.use("/",productRouter) 
app.use("/",userRouter)
app.use("/",orderRouter)
app.use("/",authRouter)

app.use(bodyParser.json()); 



app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})    

//7Nb8yLv1iQvEaWMC