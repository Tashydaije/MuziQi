import React, { useState, useEffect } from 'react';


const NewIn = () => {
  const [songs, setSongs] = useState([]); // Initialize songs as an empty array

  useEffect(() => {
    // Function to fetch songs from the backend
    const fetchSongs = async () => {
      try {
        const response = await fetch(
          "https://backend-muziqi-53ef7f049bb5.herokuapp.com/api/songs/"
        );
        const data = await response.json();
        setSongs(data);
        return data; // Ensure it returns an empty array if 'songs' is undefined
      } catch (error) {
        console.error("Failed to fetch songs:", error);
        return []; // Return an empty array on error
      }
    };
    fetchSongs();
    
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 py-10">
      {songs.length > 0 ? ( // Check if songs array has items
        songs.map((song) => (
          <div
            key={song.spotifyUri}
            className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-lg"
          >
    const getSongs = async () => {
      const songsData = await fetchSongs();
      setSongs(songsData);
    };
    getSongs();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      {songs.length > 0 ? ( // Check if songs array has items
        songs.map((song) => (
          <div key={song.id} className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-lg">
            <img
              src={song.imageUrl} // Replace with the correct property
              alt={song.title}
              className="w-24 h-24 object-cover rounded-md mb-2"
            />
            <div className="text-center">
              <h2 className="text-xl font-bold mb-1">{song.title}</h2>
              <p className="text-sm text-gray-600">{song.artist}</p>
              <p className="text-sm text-gray-400">{song.album}</p>{" "}
              {/* Display album name if available */}
            </div>
          </div>
        ))
      ) : (
        <p>No songs available</p> // Fallback in case songs are empty or data hasn't loaded yet
      )}
    </div>
  );
};

export default NewIn;
