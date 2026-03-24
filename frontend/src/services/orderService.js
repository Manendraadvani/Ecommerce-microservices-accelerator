import apiClient, { getAuthHeaders } from '../utils/apiClient';
 
/**
* Places a new order and returns the created order details.
* @param {import('../types/order.types').CreateOrderRequest} orderRequest
* @returns {Promise<import('../types/order.types').Order>}
*/
export const placeOrder = async (orderRequest) => {
  // Pass the order payload and the authentication headers
  const { data } = await apiClient.post('/api/v1/orders', orderRequest, getAuthHeaders());
  return data.response;
};
 
export const createCheckoutSession = async (orderId) => {
  const { data } = await apiClient.post(
    '/api/v1/payments/create-checkout-session',
    { orderId }, // The request body
    getAuthHeaders()
  );
  // The backend responds with { response: { redirectUrl: "https://..." } }
  return data.response.redirectUrl;
};

/**
* Fetches the order history for the currently logged-in user.
* @returns {Promise<import('../types/order.types').OrderHistoryItem[]>}
*/
export const getOrderHistory = async () => {
  const { data } = await apiClient.get('/api/v1/orders/history', getAuthHeaders());
  return data.response;
};
 
/**
* Fetches a single, detailed order by its ID.
* @param {string} orderId
* @returns {Promise<import('../types/order.types').Order>}
*/
export const getOrderById = async (orderId) => {
  const { data } = await apiClient.get(`/api/v1/orders/${orderId}`, getAuthHeaders());
  return data.response;
};