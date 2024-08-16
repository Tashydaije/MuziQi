import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Import useSelector to access Redux state
import Home from './pages/Home';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';

function App() {
  // Access the currentSong state from Redux
  const currentSong = useSelector((state) => state.audioPlayer.currentSong);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <AudioPlayer />
        {currentSong && (
          <div>
            <p>Now playing: {currentSong.name}</p>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
