import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PrivateRoute from "./routes/PrivateRoute";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import UserOrderDetailsPage from "./pages/UserOrderDetailsPage";

// --- Providers ---
import { AuthProvider } from "./context/AuthProvider";
import { CartProvider } from "./context/CartContext";

// --- Components ---
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AdminRoute from "./routes/AdminRoute";

// --- Pages ---
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AllBooks from "./pages/BooksPage";
import BookDetails from "./pages/BookDetails";
import Cart from "./pages/CartPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Logout from "./pages/logout";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";

// --- Admin Pages ---
import AdminDashboard from "./pages/admin/AdminDashboard";
import OrdersPage from "./pages/admin/OrdersPage";
import UsersPage from "./pages/admin/UsersPage";
import AddBookPage from "./pages/admin/AddBookPage";
import OrderDetailsPage from "./pages/admin/OrderDetailsPage";
import EditBook from "./pages/admin/EditBook";
import SearchResultsPage from "./pages/SearchResultsPage";
// --- ✅ NEW IMPORTS FOR ACCOUNT PAGE ---
import AccountPage from "./pages/account/AccountPage";
import ProfileDetails from "./components/account/ProfileDetails";
import ChangePassword from './components/account/ChangePassword';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* --- Public Routes --- */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/books" element={<AllBooks />} />
              <Route path="/books/:id" element={<BookDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/payment/success" element={<PaymentSuccessPage />} />
              <Route path="/search" element={<SearchResultsPage />} />

              {/* ✅ ADDED the new nested /account route */}
              <Route
                path="/account"
                element={
                  <PrivateRoute>
                    <AccountPage />
                  </PrivateRoute>
                }
              >
                <Route index element={<ProfileDetails />} />
                <Route path="details" element={<ProfileDetails />} />
                 <Route path="/account/orders/:orderId" element={<UserOrderDetailsPage />} />
                <Route path="orders" element={<OrderHistoryPage />} />
                <Route path="change-password" element={<ChangePassword />} />
              </Route>


              {/* --- Admin-Only Routes (each guarded individually) --- */}
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <AdminRoute>
                    <OrdersPage />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/orders/:orderId"
                element={
                  <AdminRoute>
                    <OrderDetailsPage />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <AdminRoute>
                    <UsersPage />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/add-book"
                element={
                  <AdminRoute>
                    <AddBookPage />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/edit-book/:id"
                element={
                  <AdminRoute>
                    <EditBook />
                  </AdminRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;