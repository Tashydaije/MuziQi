import express from 'express';
import { spotifyApi } from '../services/spotify.js';

const router = express.Router();

// Endpoint to get the Spotify access token
router.get('/get-token', (req, res) => {
  const token = spotifyApi.getAccessToken();
  if (!token) {
    return res.status(500).json({ message: 'No Spotify access token available' });
  }
  res.status(200).json({ accessToken: token });
});

export default router;