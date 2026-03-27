// src/services/adminOrderService.js
import apiClient, { getAuthHeaders } from '../utils/apiClient.jsx';
import { toast } from 'react-toastify';

/**
 * Fetches a paginated list of all orders for the admin dashboard.
 * @param {number} page - The page number to fetch (0-indexed).
 * @param {number} size - The number of orders per page.
 * @returns {Promise<object>} A promise that resolves to the pagination object from the backend.
 */
export const getAllOrders = async (page = 0, size = 10) => {
  try {
    const endpoint = `/ORDERSERVICE/api/v1/orders/admin/all?page=${page}&size=${size}&sort=createdAt,desc`;
    const { data } = await apiClient.get(endpoint, getAuthHeaders());
    
    if (data.isSuccess && data.response) {
      return data.response;
    } else {
      throw new Error(data.message || 'Failed to fetch orders.');
    }
  } catch (error) {
    console.error("Error in getAllOrders:", error);
    toast.error(error.message || 'An unknown error occurred while fetching orders.');
    return { content: [], number: 0, totalPages: 1, totalElements: 0 };
  }
};

/**
 * Updates the status of a specific order.
 * @param {string} orderId - The ID of the order to update.
 * @param {string} status - The new status string.
 * @returns {Promise<object>} A promise that resolves to the updated order.
 */
export const updateOrderStatus = async (orderId, status) => {
  try {
    const endpoint = `/ORDERSERVICE/api/v1/orders/${orderId}/status`;
    
    
    const payload = { newStatus: status }; 

    const { data } = await apiClient.put(endpoint, payload, getAuthHeaders());

    if (data.isSuccess) {
      toast.success(`Order status updated to ${status}.`);
      return data.response;
    } else {
      throw new Error(data.message || 'Failed to update order status.');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || 'An unknown error occurred.';
    console.error("Error in updateOrderStatus:", error);
    toast.error(`Update failed: ${errorMessage}`);
    throw error;
  }
};