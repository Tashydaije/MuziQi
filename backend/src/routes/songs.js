import express from 'express';
import Song from '../models/song.js';
import { spotifyApi, authenticate, getTrack } from '../services/spotify.js';

const router = express.Router();

// Authenticate Spotify API before handling requests
authenticate();

router.post('/add', async (req, res) => {
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
router.post('/search', async (req, res) => {
    try {
      const { query } = req.body; // Expecting a search query
  
      // Fetch songs from Spotify
      const searchResults = await spotifyApi.searchTracks(query);
      const tracks = searchResults.body.tracks.items;
  
      if (tracks.length === 0) {
        return res.status(404).json({ msg: 'No tracks found' });
      }
  
      // Optionally, you can pick a track or let the user select one
      const track = tracks[0]; // Just an example, may want to refine this
      //console.log(track)
      const spotifyUri = track.uri;
      console.log('spotifyUri', spotifyUri);

      // Check if the song already exists by Spotify URI
      const existingSong = await Song.findBySpotifyUri(spotifyUri);
      console.log('existing song', existingSong);
      if (existingSong) {
        return res.status(200).json({ msg: 'Song already exists in the database', song: existingSong });
      }

      // Create and save the song
      const newSong = new Song({
        title: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        duration: track.duration_ms,
        spotifyUri: track.uri
      });
  
      const savedSong = await newSong.save();
      res.status(201).json(savedSong);
    } catch (err) {
      console.error('Error searching for song:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });
  
  export default router;