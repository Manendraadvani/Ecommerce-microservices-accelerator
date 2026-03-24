import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, CheckCircle, XCircle } from 'lucide-react';
 
const getStatusVisuals = (status) => {
  switch (status) {
    case 'SHIPPED': return { color: 'blue', Icon: Truck, text: 'Shipped' };
    case 'DELIVERED': return { color: 'green', Icon: CheckCircle, text: 'Delivered' };
    case 'PROCESSING': return { color: 'purple', Icon: Package, text: 'Processing' };
    case 'CONFIRMED': return { color: 'indigo', Icon: Package, text: 'Confirmed' };
    case 'PENDING_PAYMENT': return { color: 'yellow', Icon: Package, text: 'Pending Payment' };
    case 'CANCELLED_BY_USER': case 'CANCELLED_BY_ADMIN': case 'PAYMENT_FAILED':
      return { color: 'red', Icon: XCircle, text: 'Cancelled' };
    default: return { color: 'gray', Icon: Package, text: status.replace('_', ' ') };
  }
};
 
const StatusBadge = ({ status }) => {
  const { color, Icon, text } = getStatusVisuals(status);
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    purple: 'bg-purple-100 text-purple-800',
    indigo: 'bg-indigo-100 text-indigo-800',
    gray: 'bg-gray-100 text-gray-800',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses[color]}`}>
      <Icon className="w-4 h-4 mr-1.5" />{text}
    </span>
  );
};
 
const OrderItem = ({ order }) => {
  return (
    <div className="grid grid-cols-12 gap-4 px-6 py-5 items-center hover:bg-gray-50 transition-colors">
      <div className="col-span-12 md:col-span-5">
        <Link to={`/account/orders/${order.id}`} className="font-semibold text-gray-800 hover:text-indigo-600">
          View Order Details
        </Link>
        <p className="text-sm text-gray-500 mt-1">
          {new Date(order.orderDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>
      <div className="col-span-6 md:col-span-2 text-sm text-gray-600 font-mono truncate" title={order.id}>
        #{order.id.substring(0, 8)}...
      </div>
      <div className="col-span-6 md:col-span-1 text-sm text-gray-800 text-center">{order.itemCount}</div>
      <div className="col-span-6 md:col-span-2 text-sm font-semibold text-gray-900">₹{order.totalAmount.toFixed(2)}</div>
      <div className="col-span-6 md:col-span-2"><StatusBadge status={order.status} /></div>
    </div>
  );
};
 
export default OrderItem;