import React from 'react';

// Define an array of album objects
const albums = [
  {
    id: 1,
    title: "On My Mama",
    artist: "Victoria Monet",
    image: require('../../images/On My Mama.jpg'), // Use require for local images
  },
  {
    id: 2,
    title: "Pov",
    artist: "Ariana Grande",
    image: require('../../images/Pov.jpg'), // Replace with actual image path
  },
  {
    id: 3,
    title: "Chilombo",
    artist: "Jhene Aiko",
    image: require('../../images/Chilombo.jpg'), // Replace with actual image path
  },
  {
    id: 4,
    title: "Love Me Jeje",
    artist: "Tems",
    image: require('../../images/Love Me Jeje.jpg'), // Replace with actual image path
  },
  {
    id: 5,
    title: "Snooze",
    artist: "SZA",
    image: require('../../images/Snooze.jpg'), // Replace with actual image path
  },
  {
    id: 6,
    title: "OTW",
    artist: "Khalid",
    image: require('../../images/OTW.jpg'), // Replace with actual image path
  }
  // Add more albums here
];

const NewIn = () => {
  return (
    <div className="grid grid-cols-2 gap-4"> {/* Grid layout with two columns */}
      {albums.map(album => (
        <div key={album.id} className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-lg">
          {/* Image on top */}
          <img
            src={album.image}
            alt={album.title}
            className="w-24 h-24 object-cover rounded-md mb-2" // Reduced size and object-cover to maintain aspect ratio
          />
          
          {/* Text at the bottom */}
          <div className="text-center">
            <h2 className="text-xl font-bold mb-1">{album.title}</h2>
            <p className="text-sm text-gray-600">{album.artist}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewIn;
