import axios from 'axios';
import { checkTokenExpiration } from './auth';

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const searchSongs = async (query) => {
  await checkTokenExpiration();

  const token = localStorage.getItem('token');

  try {
    const response = await axios.post(`${API_BASE_URL}/api/songs/search`, { query }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data || []; 
  } catch (error) {
    console.error('Error searching for songs:', error);
    throw error;
  }
};

export const fetchAllSongs = async () => {
  await checkTokenExpiration();

  const token = localStorage.getItem('token');

  try {
    const response = await axios.get(`${API_BASE_URL}/api/songs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data || []; 
  } catch (error) {
    console.error('Error fetching all songs:', error);
    throw error;
  }
};

export const getSongById = async (songId) => {
  await checkTokenExpiration();
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${API_BASE_URL}/api/songs/${songId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching song with ID ${songId}:`, error);
    throw error;
  }
};
