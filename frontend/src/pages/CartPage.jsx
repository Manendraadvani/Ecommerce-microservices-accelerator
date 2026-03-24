import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import { useCart } from '../context/useCart';
import { Trash2, Plus, Minus } from 'lucide-react'; 

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); 

  const handleQuantityChange = (productId, newQuantity) => {
    const quantity = parseInt(newQuantity, 10);
    if (!isNaN(quantity) && quantity > 0) {
      const item = cartItems.find(i => i.id === productId);
      if (item) {
        const maxQuantity = item.stock || 1;
        const clampedQuantity = Math.min(quantity, maxQuantity);
        if (clampedQuantity < quantity) {
          toast.warn(`Only ${maxQuantity} in stock. Quantity adjusted.`);
        }
        updateQuantity(productId, clampedQuantity);
      }
    }
  };


  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8">Looks like you haven't added any books to your cart yet.</p>
        <Link
          to="/books"
          className="bg-indigo-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Your Shopping Cart</h1>
        <button
          onClick={clearCart}
          className="text-sm font-medium text-red-600 hover:text-red-800 transition"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center bg-white p-4 rounded-lg shadow-sm">
              <img
                src={item.image || '/placeholder-book.jpg'}
                alt={item.title}
                className="w-20 h-28 object-cover rounded-md mr-6"
              />
              <div className="flex-grow">
                <h2 className="font-bold text-lg text-gray-800">{item.title}</h2>
                <p className="text-sm text-gray-500">by {item.author}</p>
                <p className="text-md font-semibold text-indigo-600 mt-1">₹{item.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <input
                  type="text"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  onBlur={(e) => {
                    if (e.target.value === '' || isNaN(parseInt(e.target.value))) {
                      updateQuantity(item.id, 1); // fallback to 1
                    }
                  }}
                  className="w-12 text-center border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />

                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  disabled={item.quantity >= item.stock}
                  className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>

              </div>

              <div className="text-right ml-6 flex-shrink-0 w-32">
                <p className="font-bold text-lg text-gray-800">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-xs text-red-500 hover:text-red-700 mt-2"
                  aria-label={`Remove ${item.title} from cart`}
                >
                  <Trash2 size={16} className="inline-block mr-1" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm sticky top-28">
            <h2 className="text-xl font-bold text-gray-800 border-b pb-4 mb-4">Order Summary</h2>
            <div className="flex justify-between text-gray-600 mb-2">
              <span>Subtotal</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600 mb-4">
              <span>Shipping</span>
              <span className="font-medium text-green-600">FREE</span>
            </div>
            <div className="border-t pt-4 flex justify-between items-center font-bold text-xl text-gray-900">
              <span>Total</span>
              <span>₹{cartTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={() => {
                if (!isAuthenticated) {
                  navigate("/login", { state: { from: "/checkout" } }); 
                } else {
                  navigate("/checkout");
                }
              }}
              className="w-full bg-indigo-600 text-white font-semibold py-3 mt-6 rounded-lg hover:bg-indigo-700 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;