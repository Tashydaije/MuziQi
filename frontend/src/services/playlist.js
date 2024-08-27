import { checkTokenExpiration } from './auth'
const API_URL = process.env.REACT_APP_API_URL;


export const UserPlaylists = async () => {
    await checkTokenExpiration();
    const token = localStorage.getItem('token');
  
    const response = await fetch(`${API_URL}/api/playlists`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch user playlists');
    }
  
  const playlists = await response.json();
  console.log('Fetched playlists:', playlists);
  
  return playlists;
  };

  export const getPlaylistDetails = async (playlistId) => {
    await checkTokenExpiration();
    const token = localStorage.getItem('token');
  
    if (!token) {
      throw new Error('No token found. Please log in again.');
    }
  
    if (!playlistId) {
      throw new Error('No playlistId provided');
    }
  
    try {
      const response = await fetch(`${API_URL}/api/playlists/${playlistId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch playlist details: ${errorText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching playlist details:', error);
      throw error;
    }
  };

  export const createPlaylist = async (playlistData) => {
    await checkTokenExpiration();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${API_URL}/api/playlists/create-playlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(playlistData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create playlist');
      }
  
      const data = await response.json();
      console.log('Playlist created:', data);
  
    } catch (error) {
      console.error('Error:', error);
    }
  };

  export const updatePlaylistName = async (playlistId, newName) => {
    await checkTokenExpiration();
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/api/playlists/${playlistId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ name: newName }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to update playlist name');
    }
  
    return response.json();
  };

  export const deletePlaylist = async (playlistId) => {
    await checkTokenExpiration();
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/api/playlists/${playlistId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to delete playlist');
    }
  
    return response.json();
  };