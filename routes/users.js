const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(400).send({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, username: user.username }, 'your_jwt_secret');
    res.send({ user, token });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
