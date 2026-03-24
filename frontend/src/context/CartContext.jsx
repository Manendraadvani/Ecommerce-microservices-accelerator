// src/context/CartContext.jsx
import React, { createContext, useReducer, useEffect, useContext } from "react";
import { useAuth } from "./AuthProvider";

export const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const initialState = { cart: [] };

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return { ...state, cart: action.payload };
    case "ADD_TO_CART": {
      const newItem = action.payload;
      const qty = Number(newItem.quantity); // Coerce to number
      const index = state.cart.findIndex(item => item.id === newItem.id);

      if (index > -1) {
        const updated = [...state.cart];
        const currentQty = Number(updated[index].quantity) || 0;
        const stockLimit = newItem.stock || 1;
        const newQty = Math.min(currentQty + qty, stockLimit);

        updated[index] = {
          ...updated[index],
          quantity: newQty,
        };
        return { ...state, cart: updated };
      }

      const safeQty = Math.min(qty, newItem.stock || 1);
      return { ...state, cart: [...state.cart, { ...newItem, quantity: safeQty }] };
    }

    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter(item => item.id !== action.payload.productId) };
    case "UPDATE_QUANTITY": {
      const { productId, newQuantity } = action.payload;
      if (newQuantity <= 0) {
        return { ...state, cart: state.cart.filter(item => item.id !== productId) };
      }
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        ),
      };
    }
    case "CLEAR_CART":
      return { ...state, cart: [] };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const token = user?.token || "";
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const syncCartOnLogin = async () => {
      const localCart = JSON.parse(localStorage.getItem("bookbazaar_cart")) || [];

      if (isAuthenticated && user) {
        try {
          if (localCart.length > 0) {
            await fetch(`/api/cart/${user.id}/merge`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ items: localCart }),
            });
            localStorage.removeItem("bookbazaar_cart");
          }

          const res = await fetch(`/api/cart/${user.id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          const data = await res.json();
          dispatch({ type: "SET_CART", payload: data.cart || [] });
        } catch (err) {
          console.error("Failed to sync/merge cart:", err);
        }
      } else {
        dispatch({ type: "SET_CART", payload: localCart });
      }
    };

    syncCartOnLogin();
  }, [isAuthenticated, user, token]);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch({ type: "CLEAR_CART" });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("bookbazaar_cart", JSON.stringify(state.cart));
    }
  }, [state.cart, isAuthenticated]);


  const addToCart = async (book, quantity = 1) => {
    const qty = Number(quantity);

    dispatch({ type: "ADD_TO_CART", payload: { ...book, quantity: qty } });

    if (isAuthenticated && user) {
      try {
        await fetch(`/api/cart/${user.id}/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ book: { ...book, quantity: qty } }),
        });
      } catch (error) {
        console.error("Error adding book to backend cart:", error);
      }
    }
  };


  const removeFromCart = async (bookId) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { productId: bookId } });

    if (isAuthenticated && user) {
      try {
        await fetch(`/api/cart/${user.id}/remove`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ bookId }),
        });
      } catch (error) {
        console.error("Error removing book from backend cart:", error);
      }
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, newQuantity } });

    if (isAuthenticated && user) {
      try {
        await fetch(`/api/cart/${user.id}/update`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId, quantity: newQuantity }),
        });
      } catch (error) {
        console.error("Error updating quantity in backend cart:", error);
      }
    }
  };

  const clearCart = async () => {
    dispatch({ type: "CLEAR_CART" });

    if (isAuthenticated && user) {
      try {
        await fetch(`/api/cart/${user.id}/clear`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Error clearing backend cart:", error);
      }
    }

    localStorage.removeItem("bookbazaar_cart");
  };

  const uniqueItemCount = state.cart.length;
  const totalQuantityCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = state.cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        uniqueItemCount,
        totalQuantityCount,
        cartTotal,
        dispatch,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

