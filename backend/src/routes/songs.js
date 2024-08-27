import express from 'express';
import Song from '../models/song.js';
import { spotifyApi, authenticate, getTrack } from '../services/spotify.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Authenticate Spotify API before handling requests
authenticate();

router.post('/addSong', async (req, res) => {
    try {
      const { spotifyUri } = req.body;

      if (!spotifyUri) {
        return res.status(400).json({ msg: 'spotifyUri is required' });
      }
  
      // Check if the song already exists by Spotify URI
      const existingSong = await Song.findBySpotifyUri(spotifyUri);
      if (existingSong) {
        return res.status(400).json({ msg: 'Song already exists in the database' });
      }
  
      // Extract track ID from Spotify URI
      const trackId = spotifyUri.split(':')[2];
      if (!trackId) {
        return res.status(400).json({ msg: 'Invalid Spotify URI format' });
      }

      // Fetch song details from Spotify API
      const trackData = await getTrack(trackId);

      if (!trackData) {
        return res.status(400).json({ msg: 'Failed to fetch song details from Spotify' });
      }
  
      const newSong = new Song({
        title: trackData.name,
        artist: trackData.artists[0].name,
        album: trackData.album.name,
        duration: trackData.duration_ms,
        spotifyUri,
      });
      console.log('NewSong', newSong);
      const savedSong = await newSong.save();
      res.status(201).json(savedSong);
    } catch (error) {
      console.error('Error adding song:', error.message);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
});
  
// Search and add song
router.post('/search', protect,  async (req, res) => {
    try {
      const { query } = req.body;
  
      // Fetch songs from Spotify
      const searchResults = await spotifyApi.searchTracks(query);
      const tracks = searchResults.body.tracks.items;
  
      if (tracks.length === 0) {
        return res.status(404).json({ msg: 'No tracks found' });
      }

      // Return list of tracks for user to select
      const trackOptions = tracks.map(track => ({
        title: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        duration: track.duration_ms,
        spotifyUri: track.uri
      }));
  
      res.status(201).json(trackOptions);
    } catch (err) {
      console.error('Error searching for song:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// get all songs
router.get('/', async (req, res) => {
  try {
    const songs = await Song.findAll();
    res.status(200).json(songs);
  } catch (error) {
    console.error('Error fetching songs', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

// get song by Id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const song = await Song.findById(id);

    if (song) {
      res.status(200).json(song);
    } else {
      res.status(404).json({ message: 'song not found' })
    }
  } catch (error) {
    console.error('Error fetching song', error.message);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});
  
export default router;