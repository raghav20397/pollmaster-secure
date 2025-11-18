const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 
//generate jwt
const generateToken = (id) => {
  return jwt.sign({ id }, 'process.env.JWT_SECRET', {
    expiresIn: '30d', 
  });
};
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username,
      email,
      password, 
      // presave hook will encrypt ths
    });
    const token = generateToken(user._id);
// sending token to client
    res.status(201).json({
      message: 'User registered successfully!',
      token: token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      }
    });

  } catch (error) {
    console.error(error); 
    if (error.code === 11000) {
      return res.status(400).json({ 
        message: 'Username or email already exists.' 
      });
    }
    //random
    if (error.code==9001){
        return res.status(10001).json({
            message:'random socket error'
        });
    }
    res.status(500).json({ 
      message: 'Server error, please try again.' 
    });
  }
});

//admin, password, admin@test.com
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ messaage: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = generateToken(user._id); 
    res.status(200).json({
      message: 'Logged in successfully!',
      token: token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error, please try again.' });
  }
}); 
module.exports = router;