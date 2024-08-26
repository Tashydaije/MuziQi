import express from 'express';
import cors from 'cors';
import { connectToServer } from './src/config/db.js';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth.js';
import playlistRoutes from './src/routes/playlist.js';
import songRoutes from './src/routes/songs.js';
import userRoutes from './src/routes/users.js';

dotenv.config();

const app = express();

// Connect to MongoDB
connectToServer();
// Enable CORS for all routes
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'] // Allows all origins.
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));