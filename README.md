## MuziQi
A web application that allows users to create playlists, search for songs, and play music, similar to Spotify. Built using React, Node.js, and MongoDB.

## Features
User Authentication: Sign up, log in, and manage your profile.
Music Search: Search for songs, albums, and artists.
Playlist Management: Create, update, and delete playlists. Add or remove songs from playlists.
Music Playback: Play, pause, skip, forward, and rewind tracks. Control the volume.
## Tech Stack
Frontend: React.js
Backend: Node.js with Express.js
Database: MongoDB
Music API: Integrated with a third-party music API for streaming and song details.
## Installation
## Clone the repository:

git clone https://github.com/TashyDaije/MuziQi.git
cd MuziQi
## Install dependencies for the backend:

cd backend
npm install
## Install dependencies for the frontend:

cd ../frontend
npm install
## Set up environment variables:

Create a .env file in the backend directory and add the following:
env
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
MUSIC_API_KEY=your_music_api_key
Run the backend:

- cd backend
- npm start
Run the frontend:

- cd ../frontend
- npm start
Access the app:

- Open your browser and go to [http://localhost:3000](http://localhost:3000)
## Usage
* Sign Up or Log In: Create an account or log in to access the features.
* Search Music: Use the search bar to find songs, albums, or artists.
* Create Playlists: Manage your playlists by adding or removing songs.
* Control Playback: Use the music player controls to play, pause, skip, and adjust the volume.
## Contributing
Feel free to fork this repository and contribute by submitting a pull request. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Acknowledgements
Inspired by Spotify's sleek design and powerful features.