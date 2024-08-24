import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import getDb from '../config/db.js';

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  const { username, email, password, firstName, lastName, profilePhoto } = req.body;

  try {
    const db = getDb();
    const usersCollection = db.collection('users');

    let user = await usersCollection.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      profilePhoto,
      createdAt: new Date(),
    };

    const result = await usersCollection.insertOne(newUser);
    const createdUser = result.insertedId;

    const payload = {
      user: {
        id: createdUser._id,
      },
    };

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ msg: 'JWT secret is not defined in environment variables' });
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: createdUser });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/auth/login
// @desc    Login user and get token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const db = getDb();
    const usersCollection = db.collection('users');

    let user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user._id,
      },
    };

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ msg: 'JWT secret is not defined in environment variables' });
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;