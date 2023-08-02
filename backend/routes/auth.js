const express=require("express");
const User = require("../models/user");
const router=express.Router()

const secretKey="jhkdhjqgdygqugfggyjugtu";

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, secretKey, { expiresIn: '6h' });
  };
//register
router.post("/register",async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const existingUser = await User.findOne({ email });
      if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = await User.create({ name, email, password: hashedPassword });

    
    const token = generateToken(newUser);

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Error while registering user', });
  
    }
})

//login 
exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({email});
      if (!user) {
        return res.status(401).json({message: 'Invalid username or password'});
      }
  
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = generateToken(user);
    res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ message:'cant login'});
    }
  };

module.exports=router