// src/models/song.js
import { ObjectId } from 'mongodb';
import getDb from '../config/db.js';

class Song {
  constructor({ title, artist, album, duration, spotifyUri }) {
    this.title = title;
    this.artist = artist;
    this.album = album;
    this.duration = duration;
    this.spotifyUri = spotifyUri;
    this.createdAt = new Date();
  }

  // Save the song to the database
  async save() {
    const db = getDb();
    const songsCollection = db.collection('songs');

    // Insert the new song into the collection
    const result = await songsCollection.insertOne(this);
    console.log('logging result', result);
    if (result && result.insertedId) {
      const newSong = await songsCollection.findOne({ _id: result.insertedId, ...this });
      return newSong;
    } else {
      throw new Error('song search and add failed');
    }
  }

  // Static method to find a song by ID
  static async findById(id) {
    const db = getDb();
    const songsCollection = db.collection('songs');
    const song = await songsCollection.findOne({ _id: new ObjectId(id) });
    console.log("Song:", song);
    return song;
  }

  // Static method to find a song by Spotify URI
  static async findBySpotifyUri(spotifyUri) {
    const db = getDb();
    const songsCollection = db.collection('songs');
    const song = await songsCollection.findOne({ spotifyUri });
    return song;
  }

  // Static method to find all songs
  static async findAll() {
    const db = getDb();
    const songsCollection = db.collection('songs');
    const songs = await songsCollection.find({}).toArray();
    return songs;
  }
}

export default Song;