import axios from 'axios';
 
// The base URL for your backend services, as seen in Postman and userService.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:1110';
 
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});
 
/**
* A helper function that creates the authorization header object.
* It reads the token from localStorage, matching your app's existing pattern.
* @returns {object} An object containing the Authorization header, or an empty object if no token is found.
*/
 
export const getAuthHeaders = () => {
  const token = localStorage.getItem('bookbazaar_accessToken');
  if (!token) {
    console.error("Authentication token not found in localStorage.");
    return {};
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
};
 
export const searchBooks = async (query) => {
  try {
    const response = await apiClient.get(`/api/v1/search`, {
      params: { q: query, size: 20 },
    });
    return response.data;
  } catch (error) {
    console.error(`Error searching for books with query "${query}":`, error);
    throw error;
  }
};
 
 
export default apiClient;