// src/services/productService.js

// 1. Correct BASE_URL to include the service name for API Gateway routing
const API_GATEWAY_URL = 'http://localhost:1110'; // Your API Gateway
const BASE_URL = `${API_GATEWAY_URL}/api/v1`;

// Helper function to get the auth token (you'll need to implement this based on your auth flow)
// For example, it might get the token from localStorage or a state management store
const getAuthToken = () => {
  return localStorage.getItem('bookbazaar_accessToken'); // Replace with your actual token retrieval logic
};

export const productService = {
  // Get products: either all (paginated via query params) or by category (list)
  async getProducts(params = {}) {
    // params can include: category, page, size, sortBy, maxPrice
    let url;
    let requestOptions = {
      method: 'GET',
      headers: {
        // 'Content-Type': 'application/json', // Not needed for GET with query params and no body
        // Public GET endpoints might not strictly need a token,
        // but if you have one, sending it usually doesn't hurt if backend ignores it when not needed.
        // const token = getAuthToken();
        // if (token) {
        //   requestOptions.headers['Authorization'] = `Bearer ${token}`;
        // }
      },
    };

    try {
      const queryParams = new URLSearchParams(); // Initialize here for all cases

      if (params.sortBy) { 
        queryParams.append('sort', params.sortBy); // Use 'sort' as it's more standard for Spring Data
      }
      
      if (params.category && params.category !== "All") {
        url = `${BASE_URL}/products/category/${encodeURIComponent(params.category)}`;
        // Note: The backend endpoint for fetching by category currently does not support
        // pagination (page, size) or sorting (sortBy) or filtering (maxPrice) via query parameters.
        // If these are needed for category-specific views, the backend endpoint
        // /products/category/{category} would need to be updated to accept them as @RequestParams.
        console.log('Fetching products by category from URL:', url);
      } else {
        // Fetching all products (paginated via query parameters)
        url = `${BASE_URL}/products`;

        if (params.page !== undefined) { // page is 1-based from client
          queryParams.append('page', params.page.toString());
        }
        if (params.size !== undefined) {
          queryParams.append('size', params.size.toString());
        }
        if (params.sortBy) {
          queryParams.append('sortBy', params.sortBy);
        }
        if (params.maxPrice !== undefined) {
          queryParams.append('maxPrice', params.maxPrice.toString());
        }
        // Add other query parameters here if your backend supports them
      }

      const queryString = queryParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }


      // requestOptions.body is REMOVED for GET as browsers don't allow it with fetch
      const response = await fetch(url, requestOptions);
      const data = await response.json(); // Try to parse JSON even for errors

      if (!response.ok) {
        // Backend sends CustomError for failures
        const errorMessage = data?.message || `HTTP error! status: ${response.status}`;
        const errorDetails = data?.subErrors || []; // If backend provides subErrors
        console.error('Error fetching products:', errorMessage, errorDetails, data);
        throw { status: response.status, message: errorMessage, details: errorDetails, fullError: data };
      }

      if (data.isSuccess && data.response) {
        if (params.category && params.category !== "All") {
          // For category, backend returns CustomResponse<List<ProductResponse>>
          // Adapt to a structure similar to paginated results for consistency if UI expects it.
          return {
            products: data.response, // This is List<ProductResponse>
            pageNumber: 1, // Mocked as it's a non-paginated list from backend
            pageSize: data.response.length,
            totalElements: data.response.length,
            totalPages: 1,
            isList: true // Flag to indicate it's a direct list
          };
        } else {
          // For all products, backend returns CustomResponse<CustomPagingResponse<ProductResponse>>
          // Ensure backend's CustomPagingResponse returns 1-based pageNumber
          return {
            products: data.response.content,
            pageNumber: data.response.pageNumber,
            pageSize: data.response.pageSize,
            totalElements: data.response.totalElementCount,
            totalPages: data.response.totalPageCount,
          };
        }
      } else {
        const errorMessage = data?.message || 'Invalid response format or operation not successful.';
        console.error('Invalid response format:', data);
        throw { message: errorMessage, fullError: data };
      }
    } catch (error) {
      console.error('Error in getProducts:', error);
      throw error; 
    }
  },

  // Get a single product by ID
  async getProductById(productId) {
    try {
      const url = `${BASE_URL}/products/${productId}`;
      // console.log('Fetching product by ID from URL:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          // 'Content-Type': 'application/json', // Not strictly necessary for GET without body
        },
      });
      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data?.message || `HTTP error! status: ${response.status}`;
        console.error('Error fetching product by ID:', errorMessage, data);
        throw { status: response.status, message: errorMessage, fullError: data };
      }

      if (data.isSuccess && data.response) {
        return data.response; // This is ProductResponse
      } else {
        const errorMessage = data?.message || 'Invalid response format or operation not successful.';
        console.error('Invalid response format:', data);
        throw { message: errorMessage, fullError: data };
      }
    } catch (error) {
      console.error('Error in getProductById:', error);
      throw error;
    }
  },

  async createProduct(productCreateRequest) {
    const token = getAuthToken();
    if (!token) {
      return Promise.reject({
        message: "Authentication token not found. Please login.",
        status: 401,
      });
    }

    try {
      const url = `${BASE_URL}/products`;
      console.log("Creating product at URL:", url, "with data:", productCreateRequest);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productCreateRequest),
      });

      let data = null;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.warn("Could not parse JSON from response", jsonError);
      }

      if (!response.ok) {
        const errorMessage = data?.message || `HTTP error! status: ${response.status}`;
        const errorDetails = data?.subErrors || [];
        console.error("Error creating product:", errorMessage, errorDetails, data);
        throw {
          status: response.status,
          message: errorMessage,
          details: errorDetails,
          fullError: data,
        };
      }

      if (data?.isSuccess) {
        if (typeof data.response === "string") {
          // If response is just the ID
          return { id: data.response };
        } else if (data.response?.content?.[0]) {
          // Old format
          return data.response.content[0];
        }
      }

      throw {
        message: data?.message || "Invalid response format.",
        fullError: data,
      };
    } catch (error) {
      console.error("Error in createProduct:", error);
      throw error;
    }
  },


  // Update an existing product
  async updateProduct(productId, productUpdateRequest) {
    const token = getAuthToken();
    if (!token) {
      return Promise.reject({ message: 'Authentication token not found. Please login.', status: 401 });
    }
    try {
      const url = `${BASE_URL}/products/${productId}`;
      console.log('Updating product at URL:', url, 'with data:', productUpdateRequest);

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(productUpdateRequest),
      });
      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data?.message || `HTTP error! status: ${response.status}`;
        const errorDetails = data?.subErrors || [];
        console.error('Error updating product:', errorMessage, errorDetails, data);
        throw { status: response.status, message: errorMessage, details: errorDetails, fullError: data };
      }

      if (data.isSuccess && data.response) {
        return data.response; // This is the updated ProductResponse
      } else {
        const errorMessage = data?.message || 'Invalid response format or operation not successful.';
        console.error('Invalid response format:', data);
        throw { message: errorMessage, fullError: data };
      }
    } catch (error) {
      console.error('Error in updateProduct:', error);
      throw error;
    }
  },

  // Delete a product
  async deleteProduct(productId) {
    const token = getAuthToken();
    if (!token) {
      return Promise.reject({ message: 'Authentication token not found. Please login.', status: 401 });
    }
    try {
      const url = `${BASE_URL}/products/${productId}`;
      console.log('Deleting product at URL:', url);

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          // 'Content-Type' not needed for DELETE with no body
        },
      });
      // For DELETE, backend might send 204 No Content with empty body,
      // or a 200 OK with a CustomResponse.
      // If 204, response.json() will fail.
      if (response.status === 204) { // Handle No Content explicitly
        return { isSuccess: true, response: null }; // Or just true
      }
      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data?.message || `HTTP error! status: ${response.status}`;
        console.error('Error deleting product:', errorMessage, data);
        throw { status: response.status, message: errorMessage, fullError: data };
      }

      if (data.isSuccess) { // Assumes backend sends CustomResponse even for successful delete
        return data; // Or true, or data.response
      } else {
        const errorMessage = data?.message || 'Operation not successful.';
        console.error('Delete operation not successful:', data);
        throw { message: errorMessage, fullError: data };
      }
    } catch (error) {
      console.error('Error in deleteProduct:', error);
      throw error;
    }
  },

  // Purchase a product - This is a new function you'll need
  async purchaseProduct(productId, quantity) {
    const token = getAuthToken();
    if (!token) {
      return Promise.reject({ message: 'Authentication token not found. Please login.', status: 401 });
    }
    try {
      // Assuming your backend endpoint is POST /api/v1/products/{productId}/purchase
      const url = `${BASE_URL}/products/${productId}/purchase`;
      console.log('Purchasing product at URL:', url, 'with quantity:', quantity);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity }), // Send quantity in the body as per PurchaseRequest DTO
      });
      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data?.message || `HTTP error! status: ${response.status}`;
        throw { status: response.status, message: errorMessage, fullError: data };
      }
      // Expecting backend to send CustomResponse<ProductResponse> (updated product)
      return data;
    } catch (error) {
      console.error('Error in purchaseProduct:', error);
      throw error;
    }
  },


  // Get all categories
  async getCategories() {
    // Backend does NOT have a dedicated /categories endpoint currently.
    // This function will continue to return hardcoded categories.
    // If you need dynamic categories, a backend endpoint must be created.
    console.log('Fetching categories (hardcoded)');
    try {
      await new Promise(resolve => setTimeout(resolve, 100)); // Simulating async
      return ["All", "Fiction", "Romance", "Sci-Fi", "Non-Fiction", "Children"];
    } catch (error) {
      console.error('Error fetching categories (hardcoded):', error);
      return ["All", "Fiction", "Romance", "Sci-Fi", "Non-Fiction", "Children"]; // Fallback
    }
  }
};

