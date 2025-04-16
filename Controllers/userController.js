const User = require('../Models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.userLogin = async (req, res) => {
  const { email, password, role } = req.body;

  // Field validation
  if (!email || !password || !role) {
    return res.status(400).json({
      status: 400,
      message: "Validation error: Email, password, and role are required."
    });
  }

  // Role check
  const allowedRoles = ["admin", "receptionist"];
  if (!allowedRoles.includes(role)) {
    return res.status(400).json({
      status: 400,
      message: "Validation error: Role must be either 'admin' or 'receptionist'."
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "Authentication error: User not found."
      });
    }

    if (user.role !== role) {
      return res.status(403).json({
        status: 403,
        message: `Unauthorized access: Role mismatch. Registered as '${user.role}'.`
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        status: 401,
        message: "Authentication error: Invalid credentials."
      });
    }

    const payload = {
      id: user._id,
      email: user.email,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });

    return res.status(200).json({
      status: 200,
      message: "Login successful.",
      token,
      role: user.role,
      userId: user._id,
      email: user.email
    });

  } catch (error) {
    console.error('Login Error:', error);
    return res.status(500).json({
      status: 500,
      message: "Internal server error while logging in."
    });
  }
};

exports.userRegister = async (req, res) => {
  const { email, password, role, username } = req.body;

  // Field validation
  if (!email || !password || !role || !username) {
    return res.status(400).json({
      status: 400,
      message: "Validation error: Email, password, and role are required."
    });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      status: 400,
      message: "Validation error: Invalid email format."
    });
  }

  // Password length validation
  if (password.length < 6) {
    return res.status(400).json({
      status: 400,
      message: "Validation error: Password must be at least 6 characters long."
    });
  }

  // Role validation
  const allowedRoles = ["admin", "receptionist"];
  if (!allowedRoles.includes(role)) {
    return res.status(400).json({
      status: 400,
      message: "Validation error: Role must be either 'admin' or 'receptionist'."
    });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({
        status: 409,
        message: "Conflict: User with this email already exists."
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      role,
      username
    });

    await newUser.save();

    return res.status(201).json({
      status: 201,
      message: "User registered successfully."
    });
  } catch (err) {
    console.error("Register Error:", err);
    return res.status(500).json({
      status: 500,
      message: "Internal server error while registering user."
    });
  }
};

