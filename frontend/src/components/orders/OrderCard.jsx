// src/components/orders/OrderCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, CheckCircle, XCircle } from 'lucide-react';

const formatDate = (dateInput) => {
    if (!dateInput) return "N/A";
    try {
        const date = new Date(dateInput);
        if (!isNaN(date.getTime())) {
            return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        }
    } catch (e) { }
    if (Array.isArray(dateInput) && dateInput.length >= 3) {
        return new Date(dateInput[0], dateInput[1] - 1, dateInput[2]).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    return "Invalid Date";
};

const getStatusVisuals = (status) => {
    const normalized = status === 'PENDING' ? 'CONFIRMED' : (status || 'UNKNOWN');

    const statusMap = {
        CONFIRMED: { color: 'indigo', Icon: CheckCircle, text: 'Confirmed' },
        SHIPPED: { color: 'blue', Icon: Truck, text: 'Shipped' },
        DELIVERED: { color: 'green', Icon: CheckCircle, text: 'Delivered' },
        CANCELLED: { color: 'red', Icon: XCircle, text: 'Cancelled' },
        PENDING_PAYMENT: { color: 'yellow', Icon: Package, text: 'Pending Payment' },
        UNKNOWN: { color: 'gray', Icon: Package, text: 'Unknown' },
    };

    return statusMap[normalized] || statusMap.UNKNOWN;
};


const StatusBadge = ({ status }) => {
    const { color, Icon, text } = getStatusVisuals(status);
    const colorClasses = {
        indigo: 'bg-indigo-100 text-indigo-800',
        blue: 'bg-blue-100 text-blue-800',
        green: 'bg-green-100 text-green-800',
        red: 'bg-red-100 text-red-800',
        yellow: 'bg-yellow-100 text-yellow-800',
        gray: 'bg-gray-100 text-gray-800',
    };

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses[color]}`}>
            <Icon className="w-4 h-4 mr-1.5" />{text}
        </span>
    );
};

export const OrderCard = ({ order }) => {
    if (!order || !order.id) return null;

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Card Header */}
            <div className="bg-gray-50 px-6 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="font-semibold text-gray-800">Order #{order.id.split('-')[0].toUpperCase()}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Placed on {formatDate(order.createdAt)}
                    </p>
                </div>
                <div className="flex flex-col md:items-end gap-2">
                    <p className="text-lg font-bold text-gray-900">₹{(order.totalAmount || 0).toFixed(2)}</p>
                    <StatusBadge status={order.orderStatus} />
                </div>
            </div>

            <div className="p-6 space-y-4">
                {order.items?.map(item => (
                    <div key={item.productId} className="flex items-center gap-4">
                        <img
                            src={item.imageUrl || '/placeholder-book.jpg'} 
                            alt={item.productName || "Book cover"}
                            className="w-16 h-20 object-cover rounded-md flex-shrink-0 bg-gray-100"
                        />
                        <div className="flex-1">
                            <p className="font-semibold text-gray-800">{item.productName || "Item details not available"}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-semibold text-gray-700">₹{(item.totalPrice || 0).toFixed(2)}</p>
                    </div>
                ))}
            </div>

            <div className="bg-gray-50 px-6 py-3 text-right">
                <Link to={`/account/orders/${order.id}`} className="font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                    View Order Details →
                </Link>
            </div>
        </div>
    );
};