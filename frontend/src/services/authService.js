const API_GATEWAY_URL = 'http://localhost:1110';
const AUTH_SERVICE_PREFIX = 'authservice';
const USER_SERVICE_PREFIX = 'userservice'; 

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
      throw new Error(data.message || data.header || "Login failed");
    }
    if (data.isSuccess && data.response) {
      return data.response; 
    }
    throw new Error("Login failed: Invalid response structure.");
  },

  async register(userData) { 
    const response = await fetch(`${AUTH_BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: "Registration request failed." })); 
      throw new Error(errorData.message || errorData.header || "Registration failed");
    }

    const data = await response.json().catch(() => ({ isSuccess: response.ok })); 
     if (data.isSuccess) {
        return { message: "Registration successful. Please login." }; 
     }
     throw new Error("Registration failed: Invalid response structure or operation not successful.");
  },

  async fetchUserProfile(token) {
    
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); 
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
    return null;
  }
};