const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    let token;

    // 1. check header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    // 2. verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. get user from DB
    req.user = await User.findById(decoded.id).select('-password');

    next();
  } catch (error) {
    res.status(401).json({ message: 'Token failed or expired' });
  }
};

module.exports = protect;