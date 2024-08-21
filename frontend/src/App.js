import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector to access Redux state
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AudioPlayer from "./components/AudioPlayer";

function App() {
  // Access the currentSong state from Redux
  const currentSong = useSelector((state) => state.audioPlayer.currentSong);

  return (
    // I've removed the Browser Router because it has been declared in the index file
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <AudioPlayer />
      {currentSong && (
        <div>
          <p>Now playing: {currentSong.name}</p>
        </div>
      )}
    </div>
  );
}

export default App;
