import React, { useState } from 'react';
import { useCart } from '../context/useCart';
import { useNavigate, Navigate } from 'react-router-dom';
// Import BOTH service functions
import { placeOrder, createCheckoutSession } from '../services/orderService';
 
const FormInput = ({ id, label, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input id={id} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" {...props}/>
    </div>
);
 
const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
 
  const [formData, setFormData] = useState({
    street: '123 Bookworm Lane',
    city: 'Readerstown',
    state: 'CA',
    postalCode: '90210',
    country: 'USA',
    apartmentSuiteEtc: '',
  });
  const [orderNotes, setOrderNotes] = useState('');
 
  if (cartItems.length === 0 && !isLoading) {
    return <Navigate to="/cart" replace />;
  }
 
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };
 
  const handleProceedToPayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
 
    const orderRequestPayload = {
        items: cartItems.map(item => ({
            productId: item.id,
            name: item.title,
            quantity: item.quantity,
            unitPrice: item.price
        })),
        shippingAddress: formData,
        orderNotes: orderNotes,
    };
 
    try {
        const newlyCreatedOrder = await placeOrder(orderRequestPayload);
        const orderId = newlyCreatedOrder.id;
 
        const redirectUrl = await createCheckoutSession(orderId);
 
        if (redirectUrl) {
            clearCart(); 
            window.location.href = redirectUrl;
        } else {
            throw new Error("Could not retrieve the payment URL.");
        }
 
    } catch (err) {
        const errorMessage = err.response?.data?.message || 'Could not initiate your payment. Please try again.';
        setError(errorMessage);
        setIsLoading(false);
    }
  }; 
 
  return (
    <div className="bg-gray-50 min-h-screen">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">Checkout</h1>
            </div>
            <form onSubmit={handleProceedToPayment} className="mt-12 grid grid-cols-1 lg:grid-cols-3 lg:gap-x-12">
                <section className="lg:col-span-2 bg-white p-8 rounded-lg shadow-md h-fit">
                    <h2 className="text-xl font-bold text-gray-900">Shipping Address</h2>
                    <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        <div className="sm:col-span-2"><FormInput id="street" label="Street Address" type="text" value={formData.street} onChange={handleChange} required /></div>
                        <div className="sm:col-span-2"><FormInput id="apartmentSuiteEtc" label="Apartment, suite, etc. (Optional)" type="text" value={formData.apartmentSuiteEtc} onChange={handleChange} /></div>
                        <FormInput id="city" label="City" type="text" value={formData.city} onChange={handleChange} required />
                        <FormInput id="state" label="State / Province" type="text" value={formData.state} onChange={handleChange} required />
                        <FormInput id="postalCode" label="ZIP / Postal Code" type="text" value={formData.postalCode} onChange={handleChange} required />
                        <FormInput id="country" label="Country" type="text" value={formData.country} onChange={handleChange} required />
                    </div>
                </section>
                
                <section className="mt-10 lg:mt-0 lg:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow-md sticky top-28">
                        <h2 className="text-xl font-bold text-gray-800 border-b pb-4 mb-4">Order Summary</h2>
                        <div className="space-y-4">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex justify-between items-center text-sm">
                                    <p className="font-semibold text-gray-800">{item.title} x {item.quantity}</p>
                                    <p className="font-medium text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                        <div className="border-t mt-6 pt-6 flex justify-between font-bold text-xl text-gray-900">
                            <span>Total</span>
                            <span>₹{cartTotal.toFixed(2)}</span>
                        </div>
                        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
                        <button type="submit" disabled={isLoading} className="w-full bg-indigo-600 text-white font-semibold py-3 mt-6 rounded-lg hover:bg-indigo-700 transition disabled:bg-indigo-300">
                            {isLoading ? 'Processing...' : 'Proceed to Payment'}
                        </button>
                    </div>
                </section>
            </form>
        </main>
    </div>
  );
};
 
export default CheckoutPage;