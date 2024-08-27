import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';
import Profile from './pages/Profile';
import Library from './pages/Library';
import Playlist from './pages/Playlist';
import SpotifyPage from './pages/SpotifyPage/SpotifyPage';
import SearchResults from './pages/SearchResults/Index';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/library" element={<Library />} />
          <Route path="/playlist/:playlistId" element={<Playlist />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/spotify" element={<SpotifyPage />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
