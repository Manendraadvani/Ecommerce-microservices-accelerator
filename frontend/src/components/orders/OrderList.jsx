// src/components/orders/OrderList.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { OrderCard } from './OrderCard';

const ITEMS_PER_PAGE = 4; 

const OrderList = ({ orders }) => {
  const [currentPage, setCurrentPage] = useState(0);

  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-gray-500">You have not placed any orders yet.</p>
        <Link to="/books" className="text-indigo-600 font-semibold hover:underline mt-2 inline-block">
          Start Shopping
        </Link>
      </div>
    );
  }

  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);
  const paginatedOrders = orders.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );

  return (
    <>
      <div className="space-y-6">
        {paginatedOrders.map(order => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-8">
            <span className="text-sm text-gray-700">
                Page {currentPage + 1} of {totalPages}
            </span>
            <div className="flex gap-2">
                <button
                    onClick={() => setCurrentPage(p => p - 1)}
                    disabled={currentPage === 0}
                    className="px-4 py-2 bg-white border rounded-lg shadow-sm font-semibold disabled:opacity-50"
                >
                    ← Previous
                </button>
                <button
                    onClick={() => setCurrentPage(p => p + 1)}
                    disabled={currentPage >= totalPages - 1}
                    className="px-4 py-2 bg-white border rounded-lg shadow-sm font-semibold disabled:opacity-50"
                >
                    Next →
                </button>
            </div>
        </div>
      )}
    </>
  );
};
 
export default OrderList;