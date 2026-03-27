// For Vite projects, use import.meta.env
const API_GATEWAY_URL = import.meta.env.VITE_API_URL || 'http://localhost:1110';

// Ensure this path matches the route you set in the API Gateway
const AUTH_BASE_URL = `${API_GATEWAY_URL}/api/v1/authentication/users`;

export const authApiService = {
  async login(credentials) { 
    const response = await fetch(`${AUTH_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await response.json(); 
    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }
    return data.response; // Returning the user data + token
  },

  async register(userData) { 
    const response = await fetch(`${AUTH_BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await response.json().catch(() => ({})); 
    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }
    return { message: "Registration successful. Please login." };
  },

  async fetchUserProfile(token) {
    if (!token) return null;
    try {
      const parts = token.split('.');
      if (parts.length < 2) return null;
      
      const decodedToken = JSON.parse(atob(parts[1])); 
      return {
        id: decodedToken.userId,
        email: decodedToken.userEmail,
        firstName: decodedToken.userFirstName,
        lastName: decodedToken.userLastName,
        role: decodedToken.userType, 
        status: decodedToken.userStatus,
      };
    } catch (e) {
      console.error("Failed to decode token:", e);
      return null;
    }
  }
};