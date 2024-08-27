import express from 'express';
import cors from 'cors';
import { connectToServer } from './src/config/db.js';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth.js';
import playlistRoutes from './src/routes/playlist.js';
import songRoutes from './src/routes/songs.js';
import userRoutes from './src/routes/users.js';
import YAML from "yaml"
import fs from "fs"
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import swaggerUi from 'swagger-ui-express';

dotenv.config();

const filename = fileURLToPath(import.meta.url);
const __dirname = dirname(filename);
const outputFile = path.join(__dirname ,"src","swagger","swagger.yaml")


const file = fs.readFileSync(outputFile, "utf8")

const swaggerDocument = YAML.parse(file)

const app = express();

// Connect to MongoDB
connectToServer();
// Enable CORS for all routes
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());

// Setup Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/playlists', playlistRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));