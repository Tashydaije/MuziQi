import React, { useEffect, useState } from 'react';

const SpotifyPlayer = () => {
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    let tokenRefreshTimeout;

    const initializePlayer = async () => {
      const response = await fetch('/spotify/get-token');
      const data = await response.json();
      const token = data.accessToken;

      if (!token) {
        console.error('Spotify token not available');
        return;
      }

      const player = new window.Spotify.Player({
        name: 'Spotify Clone Player',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5,
      });

      player.connect();
      setPlayer(player);

      // Set a timeout to refresh the token just before it expires
      tokenRefreshTimeout = setTimeout(initializePlayer, 3300 * 1000); // Refresh 5 minutes before expiration
    };

    // Load the Spotify SDK script
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = initializePlayer;

    return () => {
      clearTimeout(tokenRefreshTimeout);
    };
  }, []);

  return (
    <div>
      {/* You can add UI components here to interact with the player */}
      <div id="spotify-player"></div>
    </div>
  );
};

export default SpotifyPlayer;