// src/pages/admin/OrdersPage.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { getAllOrders, updateOrderStatus } from "../../services/adminOrderService";
import { userApiService } from "../../services/userService";

const StatusBadge = ({ status }) => {
  const safeStatus = status || "UNKNOWN";
  const statusStyles = {
    PENDING: "bg-yellow-100 text-yellow-800",
    PENDING_PAYMENT: "bg-orange-100 text-orange-800",
    SHIPPED: "bg-blue-100 text-blue-800",
    DELIVERED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
    DEFAULT: "bg-gray-100 text-gray-800",
  };
  const style = statusStyles[status] || statusStyles.DEFAULT;
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${style}`}>
      {status.replace('_', ' ')}
    </span>
  );
};

const formatOrderId = (id) => id ? id.split('-')[0].toUpperCase() : "N/A";

const formatDate = (dateInput) => {
  if (!dateInput) return "N/A";
  try {
    const date = new Date(dateInput);
    if (!isNaN(date.getTime())) return date.toLocaleDateString();
  } catch (e) { }
  if (Array.isArray(dateInput) && dateInput.length >= 3) {
    return new Date(dateInput[0], dateInput[1] - 1, dateInput[2]).toLocaleDateString();
  }
  return "Invalid Date";
};

const adminStatusOptions = ["PENDING", "SHIPPED", "DELIVERED", "CANCELLED"];
const filterStatusOptions = ["ALL", ...adminStatusOptions];

const OrdersPage = () => {
  const navigate = useNavigate();
  const [pageData, setPageData] = useState({
    content: [], pageNumber: 0, totalPageCount
      : 1, totalElementCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [userNames, setUserNames] = useState(new Map());
  const [currentPage, setCurrentPage] = useState(0);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [error, setError] = useState(null);

  const fetchOrdersAndUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllOrders(currentPage);
      console.log("RAW PAGE DATA FROM API:", data);
      setPageData(data);

      if (data.content?.length > 0) {
        const token = localStorage.getItem('bookbazaar_accessToken');
        const userIds = [...new Set(data.content.map(order => order.userId))];
        const userPromises = userIds.map(id => userApiService.getUserById(id, token));
        const userResults = await Promise.all(userPromises);

        const namesMap = new Map();
        userResults.forEach(user => {
          if (user) namesMap.set(user.id, `${user.firstName} ${user.lastName}`);
        });
        setUserNames(namesMap);
      }
    } catch (err) {
      setError("Failed to load orders. Please try again later.");
      toast.error("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchOrdersAndUsers();
  }, [fetchOrdersAndUsers]);

  useEffect(() => {
    setCurrentPage(0);
  }, [filterStatus]);

  const handleStatusChange = async (orderId, newStatus) => {
    const originalContent = [...pageData.content];
    const orderToUpdate = originalContent.find(o => o.id === orderId);
    if (!orderToUpdate || orderToUpdate?.status === newStatus) return;

    const updatedContent = originalContent.map(o => o.id === orderId ? { ...o, status: newStatus } : o);
    setPageData(prev => ({ ...prev, content: updatedContent }));

    try {
      await updateOrderStatus(orderId, newStatus);
    } catch (error) {
      setPageData(prev => ({ ...prev, content: originalContent }));
    }
  };
  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage >= pageData.totalPageCount
    - 1;


  return (
    <section className="p-6 md:p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Orders</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 font-semibold text-gray-600">Order No.</th>
              <th className="p-4 font-semibold text-gray-600">Customer</th>
              <th className="p-4 font-semibold text-gray-600">Date</th>
              <th className="p-4 font-semibold text-gray-600">Total</th>
              <th className="p-4 font-semibold text-gray-600">Current Status</th>
              <th className="p-4 font-semibold text-gray-600">Change Status</th>
              <th className="p-4 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="7" className="text-center py-10">Loading...</td></tr>
            ) : error ? (
              <tr><td colSpan="7" className="text-center py-10 text-red-500">{error}</td></tr>
            ) : pageData.content.length === 0 ? (
              <tr><td colSpan="7" className="text-center p-10">No orders found.</td></tr>
            ) : (
              pageData.content.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-mono text-indigo-600">{formatOrderId(order.id)}</td>
                  <td className="p-4 font-semibold">{userNames.get(order.userId) || <span className="text-gray-400">User Not Found</span>}</td>
                  <td className="p-4">{formatDate(order.createdAt)}</td>
                  <td className="p-4 font-semibold">₹{(order.totalAmount || 0).toFixed(2)}</td>
                  <td className="p-4"><StatusBadge status={order.orderStatus} /></td>
                  <td className="p-4">
                    <select
                      value={order.orderStatus}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="border border-gray-300 rounded-md px-2 py-1"
                    >
                      {adminStatusOptions.map((status) => (
                        <option key={status} value={status}>{status.replace('_', ' ')}</option>
                      ))}
                    </select>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => navigate(`/admin/orders/${order.id}`)}
                      className="text-indigo-600 hover:underline font-semibold"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div className="flex gap-2">
          <button
            onClick={() => !isFirstPage && setCurrentPage((p) => p - 1)}
            disabled={isFirstPage || loading}
            className={`px-4 py-2 border rounded-lg shadow-sm font-semibold transition-colors ${isFirstPage || loading
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white hover:bg-gray-50 text-black'
              }`}
          >
            ← Previous
          </button>

          <button
            onClick={() => !isLastPage && setCurrentPage((p) => p + 1)}
            disabled={isLastPage || loading}
            className={`px-4 py-2 border rounded-lg shadow-sm font-semibold transition-colors ${isLastPage || loading
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white hover:bg-gray-50 text-black'
              }`}
          >
            Next →
          </button>
        </div>

        {!loading && pageData.totalPageCount
          > 0 && (
            <span className="text-gray-500 text-sm font-medium">
              Page {currentPage + 1} of {pageData.totalPageCount
              }
            </span>
          )}
      </div>

    </section>
  );
};

export default OrdersPage;
