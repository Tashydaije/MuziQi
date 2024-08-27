import React from 'react';
import { Home, Search, Library, Heart, PlusSquare, ChevronLeft, ChevronRight, Play, SkipBack, SkipForward, Volume2 } from 'lucide-react';

const SpotifyClone = () => {
  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-gray-900">
        <div className="flex items-center space-x-4">
          <ChevronLeft className="w-6 h-6" />
          <ChevronRight className="w-6 h-6" />
        </div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 rounded-full bg-white text-black font-bold">Sign up</button>
          <button className="px-4 py-2 rounded-full bg-gray-800 text-white font-bold">Log in</button>
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <nav className="w-64 bg-gray-900 p-4">
          <ul className="space-y-4">
            <li className="flex items-center space-x-2">
              <Home className="w-6 h-6" />
              <span>Home</span>
            </li>
            <li className="flex items-center space-x-2">
              <Search className="w-6 h-6" />
              <span>Search</span>
            </li>
            <li className="flex items-center space-x-2">
              <Library className="w-6 h-6" />
              <span>Your Library</span>
            </li>
          </ul>
          <div className="mt-8">
            <button className="flex items-center space-x-2 mb-4">
              <PlusSquare className="w-6 h-6" />
              <span>Create Playlist</span>
            </button>
            <button className="flex items-center space-x-2">
              <Heart className="w-6 h-6" />
              <span>Liked Songs</span>
            </button>
          </div>
        </nav>

        {/* Main view */}
        <main className="flex-1 overflow-y-auto p-8 bg-gradient-to-b from-purple-900 to-black">
          <h1 className="text-3xl font-bold mb-6">Good afternoon</h1>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-gray-800 p-4 rounded-lg flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-700 rounded"></div>
                <span>Playlist {item}</span>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Playback controls */}
      <footer className="bg-gray-900 p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gray-800 rounded"></div>
            <div>
              <p className="font-semibold">Song Name</p>
              <p className="text-sm text-gray-400">Artist Name</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <SkipBack className="w-5 h-5" />
            <Play className="w-8 h-8" />
            <SkipForward className="w-5 h-5" />
          </div>
          <div className="flex items-center space-x-2">
            <Volume2 className="w-5 h-5" />
            <div className="w-24 h-1 bg-gray-700 rounded-full">
              <div className="w-1/2 h-full bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SpotifyClone;
