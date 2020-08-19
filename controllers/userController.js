const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      return res.status(500).json({ error: { message: 'Error creating new user', error: err.message } });
    } else {
      try {
        const user = new User({
          username : username,
          password : hash
        });
        const newUser = await user.save();
        res.status(201).json({ message: 'Successfully created new user' });
      } catch (error) {
        res.status(500).json({ error: { message: 'Error creating new user', error: error.message } });
      }
    }
  });
};

exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: { message: 'Invalid credentials' } });
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ error: { message: 'Error logging in... Please try again', error: err.message } });
      } else if (result) {
        const { username, _id } = user;
        const token = jwt.sign({ email: username, id: _id }, process.env.JWT_KEY, { expiresIn: 60 * 60 * 8 });
        res.status(200).json({ user: { username, _id: _id, token } });
      } else {
        res.status(400).json({ error: { message: 'Invalid credentials' } });
      }
    });
  } catch (error) {
    res.status(500).json({ error: { message: 'Error logging in... Please try again', error: error.message } });
  }
};
