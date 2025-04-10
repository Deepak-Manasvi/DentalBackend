const User = require('../Models/userModel');  
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userLogin = async (req, res) => {
      console.log("Request body:", req.body);  // 👈 Add this line

  const { email, password, role } = req.body;

  // Validation checks
  if (!email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Password length check
  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters" });
  }

   // Role check
   const allowedRoles = ["admin", "receptionist"];
   if (!allowedRoles.includes(role)) {
     return res.status(400).json({ message: "Invalid role" });
   }
 
  try {
    const user = await User.findOne({
        email: email 
      });
      
    console.log("user",user)
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

     console.log(password )
     console.log(user.password )
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });

    res.status(200).json({
      message: 'Login Successful',
      token,
      role: user.role,
      userId: user._id,
      email: user.email
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};



const registerUser = async (req, res) => {
  const { email, password, role } = req.body;
 // Basic field check
  if (!email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  
  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  // Password length validation
  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long" });
  }

  // Role validation
  const allowedRoles = ["admin", "receptionist"];
  if (!allowedRoles.includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }
  
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  }catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

  

module.exports = { userLogin , registerUser};
