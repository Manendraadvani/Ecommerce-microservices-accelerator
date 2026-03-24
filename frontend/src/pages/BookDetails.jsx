import React, { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../context/useCart";
import { useAuth } from "../context/AuthProvider";
import { productService } from "../services/productService";

const BookDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userActionLoading, setUserActionLoading] = useState(false); 
  const [isDeleting, setIsDeleting] = useState(false); 
  const [quantity, setQuantity] = useState(1);

  const { addToCart, cartItems } = useCart();
  const { isAuthenticated, isAdmin } = useAuth(); 

  const fetchBookById = useCallback(async () => {
    if (!productId) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await productService.getProductById(productId);


      setBook({
        id: data.id,
        title: data.name,
        author: data.authorName,
        description: data.description,
        price: data.unitPrice,
        category: data.category,
        image: data.imageUrl,
        stock: data.amount,
      });
      if (data.amount > 0) {
        setQuantity(1);
      } else {
        setQuantity(0);
      }
    } catch (err) {
      console.error("Failed to fetch book:", err);
      const errorMessage = err.fullError?.message || err.message || "Failed to load book details";
      setError(errorMessage);
      toast.error(errorMessage, { autoClose: 3000 });
    } finally {
      setIsLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchBookById();
  }, [fetchBookById]);

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setQuantity(value);
    }
  };

  const alreadyInCart = cartItems?.find((item) => item.id === productId);
  const alreadyInCartQuantity = alreadyInCart ? alreadyInCart.quantity : 0;
  const availableToAdd = book ? Math.max(book.stock - alreadyInCartQuantity, 0) : 0;

  const handleQuantityBlur = () => {
    let numQuantity = parseInt(quantity, 10);
    if (isNaN(numQuantity) || numQuantity < 1) {
      setQuantity(1);
    } else if (numQuantity > availableToAdd) {
      setQuantity(availableToAdd);
      toast.warn(`Only ${availableToAdd} item(s) can be added to cart. Quantity adjusted.`, { autoClose: 2500 });
    }
  };


  const incrementQuantity = () => {
    if (quantity < availableToAdd) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (userActionLoading || !book || quantity < 1) return;
    addToCart(book, quantity);
    toast.success(`${quantity} x ${book.title} added to cart`, { autoClose: 2000 });
  };

  const handleBuyNow = async () => {
    if (userActionLoading || !book || quantity < 1) return;

    if (!isAuthenticated) {
      toast.info("Please login to continue your purchase.", { autoClose: 2000 });
      navigate("/login", { state: { from: location } });
      return;
    }

    setUserActionLoading(true);
  
    try {
      addToCart(book, quantity);
      navigate("/checkout");
    } catch (err) {
      console.error("Buy Now failed:", err);
      toast.error("Failed to proceed with purchase. Please try again.", { autoClose: 3000 });
    } finally {
      setUserActionLoading(false);
    }
  };

  const handleDeleteBook = async () => {
    if (!book) return;
    const isConfirmed = window.confirm(`Are you sure you want to delete "${book.title}"? This action cannot be undone.`);

    if (isConfirmed) {
      setIsDeleting(true);
      try {
        await productService.deleteProduct(book.id);
        toast.success(`"${book.title}" has been deleted successfully.`);
        navigate("/books"); // Redirect to the book list after deletion
      } catch (err) {
        const errorMessage = err.fullError?.message || err.message || "Failed to delete the book.";
        toast.error(errorMessage);
        console.error("Delete error:", err);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-lg text-gray-600">Loading book details...</p>
      </div>
    );
  }

  if (error && !book) {
    return (
      <div className="text-center py-20">
        <div className="text-red-500 mb-4">
          <h2 className="text-2xl font-bold mb-2">Error Loading Book</h2>
          <p className="text-lg">{error}</p>
        </div>
        <button onClick={() => navigate("/books")} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
          Back to Books
        </button>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl text-gray-600 mb-2">Book Not Found</h2>
        <p className="text-gray-500">The book you're looking for doesn't exist.</p>
        <button onClick={() => navigate("/books")} className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
          Browse All Books
        </button>
      </div>
    );
  }

  const getAvailability = () => {
    if (book.stock <= 0) return { label: "Out of Stock", color: "bg-red-100 text-red-700" };
    if (book.stock < 10) return { label: `Limited Stock (${book.stock} left)`, color: "bg-yellow-100 text-yellow-700" };
    return { label: "In Stock", color: "bg-green-100 text-green-700" };
  };
  const availability = getAvailability();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Book Image */}
        <div className="flex justify-center items-start">
          <div className="w-full max-w-sm bg-white rounded-xl shadow-lg overflow-hidden">
            <img
              src={book.image || '/placeholder-book.jpg'}
              alt={book.title}
              className="w-full h-auto aspect-[2/3] object-cover"
              onError={(e) => { e.target.onerror = null; e.target.src = '/placeholder-book.jpg'; }}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <span className="inline-block bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full mb-2">
              {book.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{book.title}</h1>
            <p className="text-xl md:text-2xl text-gray-500 mt-1">by {book.author}</p>
          </div>

          <div className="flex items-center space-x-3">
            <span className={`px-2.5 py-0.5 text-sm font-semibold rounded-full ${availability.color}`}>
              {availability.label}
            </span>
          </div>

          <p className="text-3xl font-bold text-indigo-600">
            {`₹${book.price.toFixed(2)}`}
          </p>

          <div className="prose prose-sm sm:prose-base max-w-none text-gray-700 pt-2">
            <h3 className="text-lg font-semibold mb-1">Description</h3>
            <p>{book.description}</p>
          </div>

         

          {!isAdmin && book.stock > 0 && (
            <div className="pt-4 border-t border-gray-200">
              <label htmlFor="quantity" className="text-gray-700 font-medium text-sm mb-2 block">
                Quantity:
              </label>
              <div className="flex items-center">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1 || userActionLoading}
                  className="px-3 py-1.5 border border-gray-300 rounded-l-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Decrement quantity"
                >
                  -
                </button>
                <input
                  id="quantity"
                  type="text"
                  value={quantity}
                  onChange={handleQuantityChange}
                  onBlur={handleQuantityBlur}
                  disabled={userActionLoading}
                  className="w-16 px-2 py-1.5 border-t border-b border-gray-300 text-center focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  aria-live="polite"
                />
                <button
                  onClick={incrementQuantity}
                  disabled={quantity >= book.stock || userActionLoading}
                  className="px-3 py-1.5 border border-gray-300 rounded-r-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Increment quantity"
                >
                  +
                </button>
              </div>
              {alreadyInCartQuantity > 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  You already have {alreadyInCartQuantity} in your cart. You can add {availableToAdd} more.
                </p>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            {isAdmin ? (
              <>
                <button
                  onClick={() => navigate(`/admin/edit-book/${book.id}`)}
                  disabled={isDeleting}
                  className="w-full sm:w-auto flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-5 rounded-lg transition disabled:opacity-60"
                >
                  Edit Book
                </button>
                <button
                  onClick={handleDeleteBook}
                  disabled={isDeleting}
                  className="w-full sm:w-auto flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-5 rounded-lg transition disabled:opacity-60"
                >
                  {isDeleting ? "Deleting..." : "Delete Book"}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleAddToCart}
                  disabled={availableToAdd <= 0 || userActionLoading || quantity < 1}
                  className="w-full sm:w-auto flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-5 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {userActionLoading ? "Processing..." : "Add to Cart"}
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={availableToAdd <= 0 || userActionLoading || quantity < 1}
                  className="w-full sm:w-auto flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-5 rounded-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {userActionLoading ? "Processing..." : "Buy Now"}
                </button>

              </>
            )}
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </div>
    </section>
  );
};

export default BookDetails;
