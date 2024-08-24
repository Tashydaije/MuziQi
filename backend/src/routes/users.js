import express, { Router } from 'express';
import User from '../models/User.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// get user details by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findById(id);
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
});

// update user
router.put('/:id/edit', protect, async (req, res) => {
    const { id } = req.params;
    const { updateData } = req.body;

    try {
      const updateUser = await User.updateUser(id, updateData);
      console.log(updateUser);
      res.status(200).json({ message: 'User updated successfully', update: updateUser});
    } catch (error) {
      res.status(500).json({ message: 'Error updating user', error: error.message });
    }
});

// delete user/account
router.delete('/:id/delete', protect, async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await User.deleteAccount(id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
});

export default router;