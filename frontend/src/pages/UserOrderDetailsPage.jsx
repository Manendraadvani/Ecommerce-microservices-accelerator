// src/pages/UserOrderDetailsPage.jsx
import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrderById } from "../services/orderService";
import { productService } from "../services/productService";
import { toast } from "react-toastify";


const formatDisplayId = (id) => id ? id.split('-')[0].toUpperCase() : "N/A";

const formatDate = (dateInput) => {
    if (!dateInput) return "N/A";
    try {
        const date = new Date(dateInput);
        if (!isNaN(date.getTime())) {
            return date.toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        }
    } catch (e) { }
    if (Array.isArray(dateInput) && dateInput.length >= 6) {
        const [year, month, day, hour, minute] = dateInput;
        return new Date(year, month - 1, day, hour, minute).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    }
    return "Invalid Date";
};

const UserOrderDetailsPage = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchAndEnrichOrderDetails = useCallback(async () => {
        if (!orderId) {
            toast.error("No Order ID provided.");
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const baseOrder = await getOrderById(orderId);
            if (!baseOrder || !baseOrder.id) {
                throw new Error("Order not found or you do not have permission to view it.");
            }

            const productIds = baseOrder.items?.map(item => item.productId) || [];
            if (productIds.length > 0) {
                const productPromises = productIds.map(id => productService.getProductById(id));
                const productResults = await Promise.all(productPromises);

                const productMap = new Map();
                productResults.forEach(p => { if (p && p.id) productMap.set(p.id, p); });

                baseOrder.items = baseOrder.items.map(item => ({
                    ...item,
                    imageUrl: productMap.get(item.productId)?.imageUrl || '/placeholder-book.jpg',
                }));
            }

            setOrder(baseOrder);

        } catch (err) {
            toast.error(err.message || "Failed to load order details.");
        } finally {
            setLoading(false);
        }
    }, [orderId]);

    useEffect(() => {
        fetchAndEnrichOrderDetails();
    }, [fetchAndEnrichOrderDetails]);



    if (loading) {
        return <div className="p-10 text-center text-lg text-gray-500">Loading Order Details...</div>;
    }

    if (!order) {
        return (
            <div className="p-10 text-center">
                <p className="text-red-600 font-semibold mb-4">Order could not be loaded.</p>
                <Link to="/account/orders" className="text-indigo-600 font-semibold hover:underline">
                    ← Return to Order History
                </Link>
            </div>
        );
    }

    return (
        <section className="bg-gray-50 min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4">
                <div className="mb-6">
                    <Link to="/account/orders" className="text-indigo-600 font-semibold hover:underline">
                        ← Back to All Orders
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-800 mt-2">Order Details</h1>
                    <p className="text-sm text-gray-500 font-mono">
                        Order #{formatDisplayId(order.id)} • Placed on {formatDate(order.createdAt)}
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6 border-b pb-6">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">Shipping Address</h2>
                            <address className="not-italic text-gray-600">
                                <p>{order.shippingAddress.street}</p>
                                {order.shippingAddress.apartmentSuiteEtc && <p>{order.shippingAddress.apartmentSuiteEtc}</p>}
                                <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
                                <p>{order.shippingAddress.country}</p>
                            </address>
                        </div>
                        <div className="text-left md:text-right">
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">Order Summary</h2>
                            <p>
                                <strong>Status:</strong>
                                <span className="font-bold text-indigo-600">
                                    {(order.orderStatus === "PENDING" ? "Confirmed" : order.orderStatus.replace('_', ' '))}
                                </span>
                            </p>

                            <p><strong>Total Amount:</strong> <span className="text-2xl font-bold text-gray-800">₹{(order.totalAmount || 0).toFixed(2)}</span></p>
                        </div>
                    </div>

                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Items in this Order ({order.items.length})</h2>
                    <div className="space-y-4">
                        {order.items?.map((item) => (
                            <div key={item.productId} className="flex items-center gap-4 border p-4 rounded-lg bg-gray-50">
                                <img
                                    src={item.imageUrl} 
                                    alt={item.productName}
                                    className="w-20 h-28 object-cover rounded-md shadow bg-gray-200" 
                                />
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-gray-900">{item.productName}</h3>
                                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold">₹{(item.totalPrice || 0).toFixed(2)}</p>
                                    <p className="text-xs text-gray-500">(@ ₹{(item.unitPrice || 0).toFixed(2)} each)</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserOrderDetailsPage;

