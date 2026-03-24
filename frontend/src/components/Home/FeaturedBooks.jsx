// src/pages/FeaturedBooks.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../Product/ProductCard"; // Assuming path is correct
import { productService } from "../../services/productService";

const FeaturedBooks = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const paramsForService = {
          page: 1,      
          size: 4,      
          sortBy: 'name' 
        };

        const result = await productService.getProducts(paramsForService);

        if (result && result.products && Array.isArray(result.products)) {
          const transformedBooks = result.products.map(backendBook => ({
            id: backendBook.id,
            name: backendBook.name,                
            authorName: backendBook.authorName,     
            description: backendBook.description,
            unitPrice: backendBook.unitPrice,       
            category: backendBook.category,
            imageUrl: backendBook.imageUrl,        
            amount: backendBook.amount,          
          }));

          if (transformedBooks.length > 0) {
            setFeaturedBooks(transformedBooks);
          } else {
            setFeaturedBooks([]); 
          }
        } else {
          console.warn("FeaturedBooks: Unexpected response structure from productService.getProducts or no products array.", result);
          setFeaturedBooks([]);
        }
      } catch (err) { 
        console.error("Error fetching featured books:", err);
        setError(err.message || "Failed to load featured books");
        setFeaturedBooks([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedBooks();
  }, []); 

  if (error) { 
    return (
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50 dark:bg-zinc-900">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Featured Books</h2>
          <Link
            to="/books"
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline transition"
          >
            View All
          </Link>
        </div>
        
        <div className="text-center py-12">
          <div className="text-gray-500 dark:text-gray-400 mb-4">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <p className="text-lg text-red-600 dark:text-red-400">Unable to load featured books</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{error}</p>
          </div>
          <button
            onClick={() => { setLoading(true); setError(null); fetchFeaturedBooks(); }} 
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50 dark:bg-zinc-800">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Featured Books</h2>
        <Link
          to="/books"
          className="text-blue-600 dark:text-blue-400 font-medium hover:underline transition"
        >
          View All
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 dark:border-zinc-600 dark:border-t-blue-400" />
          <span className="ml-4 text-gray-600 dark:text-gray-300">Loading featured books...</span>
        </div>
      ) : featuredBooks.length === 0 ? ( 
        <div className="text-center py-12">
          <div className="text-gray-500 dark:text-gray-400 mb-4">
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <p className="text-lg text-gray-600 dark:text-gray-300">No featured books available at the moment.</p>
          </div>
          <Link
            to="/books"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Browse All Books
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {featuredBooks.map((book) => (
            <ProductCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </section>
  );
};

export default FeaturedBooks;