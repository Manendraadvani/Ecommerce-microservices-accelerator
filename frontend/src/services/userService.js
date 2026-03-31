import apiClient, { getAuthHeaders } from '../utils/apiClient.jsx';

const API_GATEWAY_URL = import.meta.env.VITE_API_URL || 'http://localhost:1110';
const USER_API_URL = `${API_GATEWAY_URL}/api/v1`;

export async function fetchMyDetails() {
    const token = localStorage.getItem('bookbazaar_accessToken');
    if (!token) {
        throw new Error("No authentication token found. Please log in.");
    }

    const response = await fetch(`${USER_API_URL}/users/authenticate?token=${encodeURIComponent(token)}`, {
        method: 'GET',
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Failed to authenticate user.");
    }

    const data = await response.json();

    const claims = data?.principal?.claims;
    if (!claims) {
        throw new Error("Could not find 'principal.claims' object in the server response.");
    }

    return {
        firstName: claims.userFirstName,
        lastName: claims.userLastName,
        email: claims.userEmail,
        phoneNumber: claims.userPhoneNumber,
        role: claims.userType,
    };
}

// Keep other services under a single object
export const userApiService = {
    /**
   * Fetches details for a single user by their ID.
   * This is the new function required by the OrderDetailsPage.
   * @param {string} userId - The UUID of the user to fetch.
   * @returns {Promise<object|null>} The user object or null if not found.
   */
    async getUserById(userId) {
        if (!userId) {
            console.error("getUserById called with an invalid userId.");
            return null;
        }
        try {
            // IMPORTANT: This assumes your backend has a standard GET endpoint for a single user.
            // e.g., GET /api/v1/users/{userId}
            // You must ensure this endpoint exists in your User/Auth microservice.
            const response = await fetch(`${USER_API_URL}/users/${userId}`, {
                method: 'GET',
                headers: getAuthHeaders().headers, // Reusing your header function
            });

            if (!response.ok) {
                // This will handle 404 Not Found gracefully
                return null;
            }

            const data = await response.json();
            if (data.isSuccess && data.response) {
                return data.response;
            }
            return null;

        } catch (error) {
            console.error(`Error fetching user with ID ${userId}:`, error);
            return null; // Return null so the UI can handle the failure
        }
    },
    async fetchAllUsers(token) {
        const response = await fetch(`${USER_API_URL}/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || "Failed to fetch users.");
        }

        const data = await response.json();
        if (data.isSuccess && data.response) {
            return data.response;
        }
        throw new Error("Unexpected response structure");
    },

    async deleteUser(userId, token) {
        const response = await fetch(`${USER_API_URL}/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || "Failed to delete user.");
        }

        return true;
    },
};
