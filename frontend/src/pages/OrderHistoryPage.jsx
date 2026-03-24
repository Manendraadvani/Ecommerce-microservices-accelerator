// src/pages/OrderHistoryPage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { getOrderHistory, getOrderById } from '../services/orderService';
import { productService } from '../services/productService';
import { useAuth } from '../context/AuthProvider';
import { toast } from 'react-toastify';
import OrderList from '../components/orders/OrderList';
import { OrderHistorySkeleton } from '../components/orders/OrderHistorySkeleton';

const OrderHistoryPage = () => {
  const [enrichedOrders, setEnrichedOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const fetchAndEnrichOrders = useCallback(async () => {
    if (!token) {
      setError('You must be logged in to view your order history.');
      setLoading(false);
      return;
    }
 
    setLoading(true);
    setError(null);
    try {
      const orderSummaries = await getOrderHistory();
      if (!orderSummaries || orderSummaries.length === 0) {
        setEnrichedOrders([]);
        setLoading(false);
        return;
      }

      const detailPromises = orderSummaries.map(summary => getOrderById(summary.id));
      const detailedOrders = await Promise.all(detailPromises);
      
      const allProductIds = new Set();
      detailedOrders.forEach(order => {
        order.items?.forEach(item => allProductIds.add(item.productId));
      });

      const productPromises = [...allProductIds].map(id => productService.getProductById(id));
      const productResults = await Promise.all(productPromises);
      
      const productMap = new Map();
      productResults.forEach(product => {
        if (product && product.id) {
          
          productMap.set(product.id, product);
        }
      });
      
      const finalEnrichedOrders = detailedOrders.map(order => {
        if (!order || !order.items) return null; 

        return {
          ...order,
          items: order.items.map(item => {
            const productDetails = productMap.get(item.productId);
            return {
              ...item,
              imageUrl: productDetails?.imageUrl || '/placeholder-book.jpg',
            };
          }),
        };
      }).filter(Boolean); 
      
      setEnrichedOrders(finalEnrichedOrders);

    } catch (err) {
      const message = err.response?.data?.message || 'Could not load your order history.';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }, [token]);
 
  useEffect(() => {
    fetchAndEnrichOrders();
  }, [fetchAndEnrichOrders]);
 
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">My Orders</h1>
          
          {loading && <OrderHistorySkeleton />}
          {!loading && error && <p className="text-red-500 bg-red-100 p-4 rounded-md">{error}</p>}
          {!loading && !error && <OrderList orders={enrichedOrders} />}
        </div>
      </div>
    </div>
  );
};
 
export default OrderHistoryPage;