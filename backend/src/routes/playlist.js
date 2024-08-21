import express from 'express';
import { createPlaylist, getPlaylists } from '../models/playlist.js';
import { protect } from '../middleware/auth.js'; // Middleware to protect routes

const router = express.Router();

// Create a new playlist
router.post('/', protect, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Playlist name is required' });
    }
    const playlist = await createPlaylist(req.user._id, name);
    res.status(201).json(playlist);
  } catch (error) {
    console.error('Error creating playlist:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all playlists for the logged-in user
router.get('/', protect, async (req, res) => {
    try {
      // Find all playlists that belong to the authenticated user
      const playlists = await getPlaylists(req.user._id)
      
      console.log(playlists)
      // Return the playlists to the client
      res.json(playlists);
    } catch (error) {
      console.error('Error fetching playlists:', error.message);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });
  
  export default router;