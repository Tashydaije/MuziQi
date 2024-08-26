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
  
    return response.json();
  };

  export const getPlaylistDetails = async (playlistId) => {
    const response = await fetch(`${API_URL}/api/playlists/${playlistId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch playlist details');
    }
  
    return response.json();
  };

  export const updatePlaylistName = async (playlistId, newName) => {
    const response = await fetch(`${API_URL}/api/playlists/${playlistId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ name: newName }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to update playlist name');
    }
  
    return response.json();
  };

  export const deletePlaylist = async (playlistId) => {
    const response = await fetch(`${API_URL}/api/playlists/${playlistId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
  
    if (!response.ok) {
      throw new Error('Failed to delete playlist');
    }
  
    return response.json();
  };