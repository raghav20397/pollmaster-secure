const jwt = require('jsonwebtoken');
const User = require('../models/User');
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, 'process.env.JWT_SECRET');
      //get user's details from db by decrypting the token and attaching in req
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }
      return next();
    } catch (error) {
      console.error('Token verification failed:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
    return res.status(401).json({ message: 'Unauthorized, no token found.' });
};
module.exports = { protect };