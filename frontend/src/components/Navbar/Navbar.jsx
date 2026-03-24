import React, { useState } from "react";
import { Link, useLocation , useNavigate} from "react-router-dom";
import { Menu, X, ShoppingCart, User, Search, PlusCircle } from "lucide-react";
import logo from "../../assets/logo.png";
import { useCart } from "../../context/useCart";
import { useAuth } from "../../context/AuthProvider";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { uniqueItemCount } = useCart();
  const { isAuthenticated, user, isAdmin } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
    
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleSearch = (e) => {
    e.preventDefault(); // Prevents the browser from doing a full page reload
    // Only search if the query isn't empty or just whitespace
    if (searchQuery.trim()) {
      // Navigate to the search results page, passing the query in the URL
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-zinc-100 dark:bg-zinc-900 shadow-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={logo} alt="BookBazaar Logo" className="h-8 w-8" />
          <Link
            to="/"
            className="text-xl font-bold text-zinc-800 dark:text-white hover:text-indigo-600 transition-colors"
          >
            BookBazaar
          </Link>
        </div>

        <div className="hidden md:flex flex-1 justify-center">
          {/* Wrap the input in a <form> to easily handle 'Enter' key submission */}
          <form onSubmit={handleSearch} className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search for books..."
              // Bind the input's value and onChange handler to our state
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-zinc-300 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow dark:bg-zinc-800 dark:text-white dark:border-zinc-600"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-zinc-500 dark:text-zinc-400" />
          </form>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            to="/"
            className={`transition-all hover:text-indigo-600 ${isActive("/") ? "border-b-2 border-indigo-600" : ""}`}
          >
            Home
          </Link>
          <Link
            to="/books"
            className={`transition-all hover:text-indigo-600 ${isActive("/books") ? "border-b-2 border-indigo-600" : ""}`}
          >
            All Books
          </Link>

          {isAdmin && (
            <Link
              to="/admin/add-book"
              className="flex items-center gap-1 bg-indigo-600 text-white px-3 py-1.5 rounded-full hover:bg-indigo-700 transition"
            >
              <PlusCircle className="h-5 w-5" />
              Add Book
            </Link>
          )}

          {!isAdmin && (
            <Link
              to="/cart"
              className="relative hover:text-indigo-600 transition-transform hover:scale-110"
            >
              <ShoppingCart className="h-6 w-6 text-zinc-700 dark:text-white" />
              {uniqueItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1 leading-none">
                  {uniqueItemCount}
                </span>
              )}
            </Link>
          )}

          <div className="relative group">
            <User className="h-6 w-6 text-zinc-700 dark:text-white hover:text-indigo-600 transition-transform hover:scale-110 cursor-pointer" />
            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-zinc-800 shadow-lg rounded-md opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transition-all z-50">
              {!isAuthenticated ? (
                <>
                  <Link to="/login" className="block px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700">
                    Login
                  </Link>
                  <Link to="/signup" className="block px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700">
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  {isAdmin ? (
                    <>
                      <Link to="/admin" className="block px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700">
                        Admin Dashboard
                      </Link>
                      <Link to="/admin/orders" className="block px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700">
                        Orders
                      </Link>
                      <Link to="/admin/users" className="block px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700">
                        Users
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/account" className="block px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700">
                        My Account
                      </Link>
                    </>
                  )}
                  <Link to="/logout" className="block px-4 py-2 text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-700">
                    Logout
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? (
            <X className="h-6 w-6 text-zinc-700 dark:text-white" />
          ) : (
            <Menu className="h-6 w-6 text-zinc-700 dark:text-white" />
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link to="/" className="block text-zinc-700 dark:text-white hover:text-indigo-600">Home</Link>
          <Link to="/books" className="block text-zinc-700 dark:text-white hover:text-indigo-600">All Books</Link>

          {!isAdmin && (
            <Link to="/cart" className="block text-zinc-700 dark:text-white hover:text-indigo-600">
              Cart
              {uniqueItemCount > 0 && (
                <span className="ml-2 inline-block bg-red-600 text-white text-xs rounded-full px-2 py-0.5 leading-none">
                  {uniqueItemCount}
                </span>
              )}
            </Link>
          )}

          {isAdmin && (
            <>
              <Link to="/admin/add-book" className="block text-indigo-600 font-semibold hover:underline">
                ➕ Add Book
              </Link>
              <Link to="/admin/orders" className="block text-zinc-700 hover:text-indigo-600">Orders</Link>
              <Link to="/admin/users" className="block text-zinc-700 hover:text-indigo-600">Users</Link>
            </>
          )}

          {!isAuthenticated ? (
            <>
              <Link to="/login" className="block text-zinc-700 hover:text-indigo-600">Login</Link>
              <Link to="/signup" className="block text-zinc-700 hover:text-indigo-600">Sign Up</Link>
            </>
          ) : (
            <Link to="/logout" className="block text-red-600">Logout</Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;

