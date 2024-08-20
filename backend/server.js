import express from 'express';
import { connectToServer } from './src/config/db.js';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth.js';
import playlistRoutes from './src/routes/playlist.js';

dotenv.config();

const app = express();

// Connect to MongoDB
connectToServer();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/playlists', playlistRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));