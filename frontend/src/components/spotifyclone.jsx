import React, { useEffect, useState } from 'react';

const SpotifyPlayer = () => {
  const [player, setPlayer] = useState(null);
  const [track, setTrack] = useState(null);

  useEffect(() => {
    let tokenRefreshTimeout;

    const initializePlayer = async () => {
      const response = await fetch('https://backend-muziqi-53ef7f049bb5.herokuapp.com/api/spotify/get-token');
      const data = await response.json();
      const token = data.accessToken;

      if (!token) {
        console.error('Spotify token not available');
        return;
      }

      const player = new window.Spotify.Player({
        name: 'Spotify Player',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5,
      });

      player.connect().then(() => {
        console.log('Spotify Player connected');
      });

      player.addListener('ready', ({ device_id }) => {
        console.log('Spotify Player is ready');
      });

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Spotify Player is not ready');
      });

      player.addListener('player_state_changed', (state) => {
        if (state) {
          console.log('Player state changed:', state);
          setTrack(state.track_window.current_track);
        }
      });

      setPlayer(player);

      // Set a timeout to refresh the token just before it expires
      tokenRefreshTimeout = setTimeout(initializePlayer, 3300 * 1000);
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

  const play = () => {
    if (player) {
      player.togglePlay().then(() => {
        console.log('Playback toggled');
      });
    }
  };

  const pause = () => {
    if (player) {
      player.pause().then(() => {
        console.log('Playback paused');
      });
    }
  };

  return (
    <div>
      <div id="spotify-player"></div>
      <div>
        {track && (
          <div>
            <h2>{track.name}</h2>
            <h3>{track.artists.map(artist => artist.name).join(', ')}</h3>
            <img src={track.album.images[0].url} alt={track.name} width="200" />
          </div>
        )}
        <button onClick={play}>Play</button>
        <button onClick={pause}>Pause</button>
      </div>
    </div>
  );
};

export default SpotifyPlayer;