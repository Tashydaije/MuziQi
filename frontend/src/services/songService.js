// src/services/songService.js
import axios from 'axios';

const API_BASE_URL = 'https://backend-muziqi-53ef7f049bb5.herokuapp.com/api/songs';
const token = localStorage.getItem("token");

export const searchSongs = async (query) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/search`, { query }, {
      headers: {
        Authorization: `Bearer ${token}`, // Replace YOUR_TOKEN_HERE with the actual token
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching for songs:', error);
    throw error;
  }
};

export const fetchAllSongs = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching all songs:', error);
    throw error;
  }
};

export const getSongById = async (songId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${songId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching song with ID ${songId}:`, error);
    throw error;
  }
};
