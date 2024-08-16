import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentSong } from '../../redux/audioPlayerSlice'; // Import the action creator

const AudioPlayer = () => {
  const dispatch = useDispatch(); // Hook to dispatch actions
  const currentSong = useSelector((state) => state.audioPlayer.currentSong); // Access the currentSong from Redux

  // Function to dispatch an action to play a song
  const playSong = (song) => {
    dispatch(setCurrentSong(song));
  };

  return (
    <div>
      {currentSong && (
        <div>
          <p>Now playing: {currentSong.name}</p>
          <audio src={currentSong.url} controls autoPlay />
        </div>
      )}
      <button onClick={() => playSong({ name: 'Song 1', url: '/song1.mp3' })}>
        Play Song 1
      </button>
    </div>
  );
};

export default AudioPlayer;