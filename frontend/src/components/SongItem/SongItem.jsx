// src/components/SongItem/SongItem.jsx
import React from "react";
import PropTypes from "prop-types";

const SongItem = ({ title, artist, album, duration, spotifyUri }) => {
  const songDuration = (duration) => {
    const milisec = +duration;
    let minutes = Math.floor(milisec / 60000);
    let seconds = ((milisec % 60000) / 1000).toFixed(0);
    return seconds === 60
      ? minutes + 1 + ":00"
      : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };

  return (
    <>
        <div className="flex flex-col gap-2 items-center bg-gray-100 p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold">{title}</h3>
          <p>{artist}</p>
          <p>{album}</p>
          <p>Duration {songDuration(duration)} minutes</p>
          <a href={spotifyUri} target="_blank" rel="noopener noreferrer" className="bg-green-600 hover:bg-green-800 px-8 py-2 rounded-full text-white hover:font-bold">
            Listen
          </a>
        </div>
    </>
  );
};

SongItem.propTypes = {
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  album: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  spotifyUri: PropTypes.string.isRequired,
};

export default SongItem;
