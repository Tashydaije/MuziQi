import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';
import getDb from '../config/db.js';

const createPlaylist = async (userId, name) => {
  const db = getDb();
  const userObjectId = new ObjectId(userId);
  const newPlaylist = {
    userId: userObjectId,
    name,
    songs: [],
    createdAt: new Date(),
  };
  const result = await db.collection('playlists').insertOne(newPlaylist);
  if (result && result.insertedId) {
    // Fetch the newly created playlist by its ID
    const newPlaylist = await db.collection('playlists').findOne({ _id: result.insertedId });
    console.log(newPlaylist)
    return newPlaylist;
  } else {
    throw new Error('Playlist creation failed');
  }
};

const getPlaylists = async (userId) => {
  const db = getDb();
  // Convert userId to ObjectId if it's not already an ObjectId
  const userObjectId = new ObjectId(userId);

  console.log('ObjectId', userObjectId)
  const playlists = await db.collection('playlists').find({ userId: userObjectId }).toArray();
  console.log('Fetched playlists:', playlists);
  return playlists;
};

export { createPlaylist, getPlaylists };