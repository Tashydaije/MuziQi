import React from 'react';
// Define an array of album objects
const albums = [
  {
    id: 1,
    title: "On My Mama",
    artist: "Victoria Monet",
    image: require('../../images/On My Mama.jpg'),
  },
  {
    id: 2,
    title: "Pov",
    artist: "Ariana Grande",
    image: require('../../images/Pov.jpg'),
  },
  {
    id: 3,
    title: "Chilombo",
    artist: "Jhene Aiko",
    image: require('../../images/Chilombo.jpg'),
  },
  {
    id: 4,
    title: "Love Me Jeje",
    artist: "Tems",
    image: require('../../images/Love Me Jeje.jpg'),
  },
  {
    id: 5,
    title: "Snooze",
    artist: "SZA",
    image: require('../../images/Snooze.jpg'),
  },
  {
    id: 6,
    title: "OTW",
    artist: "Khalid",
    image: require('../../images/OTW.jpg'),
  }

];
const NewIn = () => {
  return (
    <div className="grid grid-cols-3 gap-4"> {/* Grid layout with two columns */}
      {albums.map(album => (
        <div key={album.id} className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-lg">
          {/* Image on top */}
          <img
            src={album.image}
            alt={album.title}
            className="w-24 h-24 object-cover rounded-md mb-2"
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