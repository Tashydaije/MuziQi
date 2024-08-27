const API_URL = process.env.REACT_APP_API_URL;


export const storeTokens = ({ token, refreshToken }) => {
  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refreshToken);
};

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');
  
  if (!refreshToken) throw new Error('No refresh token available');

  const response = await fetch(`${API_URL}/api/auth/refresh-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  const data = await response.json();
  storeTokens(data);
};

export const checkTokenExpiration = async () => {
  const token = localStorage.getItem('token');
  
  if (!token) throw new Error('No token available');
  
  const decodedToken = JSON.parse(atob(token.split('.')[1]));
  const now = Date.now() / 1000;

  if (decodedToken.exp < now) {
    await refreshToken();
  }
};

const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const registerUser = async (userData) => {

  const { profilePhoto, ...restOfUserData } = userData;
  const profilePhotoBase64 = profilePhoto ? await fileToBase64(profilePhoto) : null;

  const payload = { 
    ...restOfUserData, 
    profilePhoto: profilePhotoBase64 
  };

  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to register: ${errorText}`);
  }

  return response.json();
};

export const signInUser = async (credentials) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Invalid credentials');
  }

  const data = await response.json();
  storeTokens(data);
  return data;
};

export const UserDetails = async (userId) => {
  if (!userId) throw new Error('User ID is required');

  await checkTokenExpiration();

  const token = localStorage.getItem('token');

  const response = await fetch(`${API_URL}/api/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user details: ${response.statusText}`);
  }

  return response.json();
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
};