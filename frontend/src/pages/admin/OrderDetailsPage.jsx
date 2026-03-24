import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getOrderById } from "../../services/orderService"; 
import { userApiService } from "../../services/userService";
import { productService } from "../../services/productService"; 

const formatDisplayId = (id) => id ? id.split('-')[0].toUpperCase() : "N/A";

const formatDateFromArray = (dateArray) => {
  if (!Array.isArray(dateArray) || dateArray.length < 6) return "Invalid Date";
  const [year, month, day, hour, minute] = dateArray;
  return new Date(year, month - 1, day, hour, minute).toLocaleString();
};

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [enrichedOrder, setEnrichedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAndEnrichOrder = useCallback(async () => {
    if (!orderId) {
      setError("No Order ID provided.");
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      const baseOrder = await getOrderById(orderId);
      if (!baseOrder || !baseOrder.id) throw new Error("Order not found.");

      const promises = [
        userApiService.getUserById(baseOrder.userId),
        ...baseOrder.items.map(item => productService.getProductById(item.productId))
      ];
      
      const results = await Promise.allSettled(promises);
      
      const userResult = results[0];
      const productResults = results.slice(1);

      const fetchedUser = userResult.status === 'fulfilled' ? userResult.value : null;

      const productDetailsMap = new Map();
      productResults.forEach((result, index) => {
        const productId = baseOrder.items[index].productId;
        if (result.status === 'fulfilled' && result.value) {
          productDetailsMap.set(productId, result.value);
        }
      });

      const finalItems = baseOrder.items.map(item => ({
        ...item,
        product: productDetailsMap.get(item.productId) || { imageUrl: '/placeholder-book.jpg', authorName: 'N/A' },
      }));

      setEnrichedOrder({
        ...baseOrder,
        customerName: fetchedUser ? `${fetchedUser.firstName} ${fetchedUser.lastName}` : "User Not Found",
        customerEmail: fetchedUser ? fetchedUser.email : "N/A",
        items: finalItems,
      });

    } catch (err) {
      setError("Failed to load complete order details.");
      toast.error("An error occurred while fetching order data.");
      console.error("Fetch & Enrich Error:", err);
    } finally {
      setLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchAndEnrichOrder();
  }, [fetchAndEnrichOrder]);


  if (loading) {
    return <div className="p-10 text-center text-lg text-gray-500">Fetching and assembling order data...</div>;
  }

  if (error || !enrichedOrder) {
    return <div className="p-10 text-center text-red-600 font-semibold">{error || "Order could not be loaded."}</div>;
  }

  return (
    <section className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Order Details</h1>
          <p className="text-sm text-gray-500 font-mono">ID: {enrichedOrder.id}</p>
        </div>
        <button onClick={() => navigate(-1)} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">
          ← Back to Orders
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold border-b pb-2 mb-3 text-gray-700">Customer</h2>
          <p className="text-xl font-semibold">{enrichedOrder.customerName}</p>
          <p className="text-sm text-blue-600">{enrichedOrder.customerEmail}</p>
          <p className="mt-2 text-xs text-gray-400 font-mono">User ID: {enrichedOrder.userId}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold border-b pb-2 mb-3 text-gray-700">Order Summary</h2>
          <p><strong>Status:</strong> <span className="font-bold text-indigo-600">{enrichedOrder.orderStatus}</span></p>
          <p><strong>Date Placed:</strong> {formatDateFromArray(enrichedOrder.createdAt)}</p>
          <p className="mt-2 text-3xl font-bold text-gray-800">₹{(enrichedOrder.totalAmount || 0).toFixed(2)}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold border-b pb-2 mb-3 text-gray-700">Shipping To</h2>
          <address className="not-italic text-sm leading-relaxed">
            {enrichedOrder.shippingAddress.street}<br/>
            {enrichedOrder.shippingAddress.apartmentSuiteEtc && <>{enrichedOrder.shippingAddress.apartmentSuiteEtc}<br/></>}
            {enrichedOrder.shippingAddress.city}, {enrichedOrder.shippingAddress.state} {enrichedOrder.shippingAddress.postalCode}<br/>
            <strong>{enrichedOrder.shippingAddress.country}</strong>
          </address>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Items Ordered ({enrichedOrder.items.length})</h2>
        <div className="space-y-4">
          {enrichedOrder.items?.map((item) => (
            <div key={item.productId} className="flex items-center gap-6 p-4 border rounded-lg bg-gray-50">
              <img
                src={item.product?.imageUrl || '/placeholder-book.jpg'}
                alt={item.productName}
                className="w-24 h-32 object-cover rounded-md shadow-sm flex-shrink-0"
              />
              <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                <div className="md:col-span-2">
                  <h3 className="text-lg font-bold text-gray-900">{item.productName}</h3>
                  <p className="text-sm text-gray-500">by {item.product?.authorName || 'N/A'}</p>
                  <p className="text-xs text-gray-400 font-mono mt-1">Product ID: {item.productId}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500">Unit Price</p>
                  <p className="font-semibold">₹{(item.unitPrice || 0).toFixed(2)}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500">Quantity</p>
                  <p className="font-semibold text-xl">{item.quantity}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-500">Subtotal</p>
                  <p className="font-semibold text-lg">₹{(item.totalPrice || 0).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OrderDetailsPage;