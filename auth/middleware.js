const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ error: 'Access denied' });
  }
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const user = await User.findByPk(decoded.id);
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;
