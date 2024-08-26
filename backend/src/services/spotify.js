import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

// Function to authenticate and get access token
const authenticate = async () => {
  try {
    const data = await spotifyApi.clientCredentialsGrant();
    spotifyApi.setAccessToken(data.body['access_token']);
    console.log('Spotify access token set:', data.body['access_token']);

    // Set up a timer to refresh the token 5 minutes before it expires
    const expiresIn = data.body['expires_in'];
    setTimeout(authenticate, (expiresIn - 300) * 1000);
  } catch (err) {
    console.error('Error getting Spotify access token:', err);
  }
};

// Function to get track details from Spotify
const getTrack = async (trackId) => {
    try {
      const trackData = await spotifyApi.getTrack(trackId);
      return trackData.body;
    } catch (err) {
      console.error('Error fetching track from Spotify:', err.message);
      throw new Error('Failed to fetch song details from Spotify');
    }
  };  

export { spotifyApi, authenticate, getTrack };