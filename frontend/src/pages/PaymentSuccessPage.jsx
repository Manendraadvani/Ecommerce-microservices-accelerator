import React from 'react';
import { Link } from 'react-router-dom';
 
const PaymentSuccessPage = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
      <p className="text-gray-600 mb-8">Thank you for your order. You can view your order details in your account.</p>
      <Link
        to="/account/orders"
        className="bg-indigo-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-indigo-700 transition"
      >
        View My Orders
      </Link>
    </div>
  );
};
 
export default PaymentSuccessPage;