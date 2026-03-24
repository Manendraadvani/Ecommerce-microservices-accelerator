// src/pages/BooksPage.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../components/Product/ProductCard";
import { productService } from "../services/productService";
import { toast } from "react-toastify";

const BooksPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const [allFetchedBooks, setAllFetchedBooks] = useState([]);
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState(["All"]);
  const [totalElements, setTotalElements] = useState(0);

  const [selectedCategory, setSelectedCategory] = useState(queryParams.get("category") || "All");
  const [priceRange, setPriceRange] = useState(Number(queryParams.get("maxPrice")) || 1000);
  const [maxPriceLimit, setMaxPriceLimit] = useState(1000);

  const [currentPage, setCurrentPage] = useState(Number(queryParams.get("page")) || 0);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(displayedBooks.length / itemsPerPage);

  useEffect(() => {
    const initializePage = async () => {
      try {
        const [fetchedCategories, topPriceProductData] = await Promise.all([
          productService.getCategories(),
          productService.getProducts({ size: 1, sortBy: 'unitPrice,desc' })
        ]);
        setCategories(["All", ...fetchedCategories.filter(c => c !== "All")]);

        if (topPriceProductData?.products?.[0]) {
          const trueMaxPrice = Math.ceil(topPriceProductData.products[0].unitPrice / 100) * 100;
          setMaxPriceLimit(trueMaxPrice);
          if (!queryParams.has("maxPrice")) {
            setPriceRange(trueMaxPrice);
          }
        }
      } catch (err) {
        toast.error("Could not initialize page filters.");
      }
    };
    initializePage();
  }, []);

  const fetchBooksByCategory = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = {
        category: selectedCategory === "All" ? null : selectedCategory,
        size: 1000,
      };
      const result = await productService.getProducts(params);
      
      if (result && result.products) {
        setAllFetchedBooks(result.products);
        setTotalElements(result.totalElements);
      } else {
        setAllFetchedBooks([]);
        setTotalElements(0);
      }
    } catch (err) {
      setError("Failed to load books for the selected category.");
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchBooksByCategory();
  }, [fetchBooksByCategory]);

  useEffect(() => {
    const filtered = allFetchedBooks.filter(book => book.unitPrice <= priceRange);
    setDisplayedBooks(filtered);
    setCurrentPage(0); 

    const params = new URLSearchParams();
    if (selectedCategory !== "All") params.set("category", selectedCategory);
    if (priceRange < maxPriceLimit) params.set("maxPrice", priceRange.toString());
    if (currentPage > 0) params.set("page", currentPage.toString());
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });

  }, [priceRange, allFetchedBooks, selectedCategory, maxPriceLimit, navigate, location.pathname]);

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setPriceRange(maxPriceLimit);
  };

  const handlePriceChange = (e) => {
    setPriceRange(Number(e.target.value));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
      const params = new URLSearchParams(location.search);
      if (selectedCategory !== "All") params.set("category", selectedCategory);
      if (priceRange < maxPriceLimit) params.set("maxPrice", priceRange.toString());
      params.set("page", newPage.toString());
      navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    }
  };

  const paginatedBooks = displayedBooks.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

  if (isLoading && allFetchedBooks.length === 0) {
    return <div className="text-center py-20">Loading books...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <header className="mb-8 sm:mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">All Books</h1>
        <p className="text-gray-600">Browse our collection of {totalElements} books</p>
      </header>

      <div className="mb-6 sm:mb-8">
        <div className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button key={cat} onClick={() => handleCategoryClick(cat)}
              className={`px-3 sm:px-4 py-2 rounded-full border transition whitespace-nowrap text-xs sm:text-sm font-medium ${cat === selectedCategory ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-6 mb-8 sm:mb-10">
        <div className="flex flex-col gap-2 w-full md:w-1/2">
          <label htmlFor="priceRangeSlider" className="font-medium text-gray-700">
            Max Price: ₹{priceRange}
          </label>
          <input id="priceRangeSlider" type="range" min={0} max={maxPriceLimit} value={priceRange} onChange={handlePriceChange}
            className="w-full accent-indigo-600 cursor-pointer" />
          <div className="flex justify-between text-sm text-gray-500">
            <span>₹0</span>
            <span>₹{maxPriceLimit}</span>
          </div>
        </div>
      </div>

      <div className="mb-4 sm:mb-6">
        <p className="text-gray-600 text-sm sm:text-base">
          Showing {paginatedBooks.length} of {displayedBooks.length} matching books in this category
        </p>
      </div>

      {paginatedBooks.length === 0 ? (
        <div className="text-center py-10 sm:py-20">
          <div className="text-gray-400 mb-4">
            <h2 className="text-xl sm:text-2xl text-gray-600 mb-2">No books found</h2>
            <p className="text-gray-500">Try adjusting your price filter or selecting another category.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {paginatedBooks.map((book) => (
            <ProductCard key={book.id} book={book} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-10 sm:mt-12 flex justify-center items-center space-x-1 sm:space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className="px-3 sm:px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition text-sm"
          >
            Previous
          </button>

          <div className="flex space-x-1">
            {[...Array(totalPages).keys()].map(num =>
              (num < 2 || num > totalPages - 3 || Math.abs(num - currentPage) <= 1) && (
                <button
                  key={num}
                  onClick={() => handlePageChange(num)}
                  className={`px-2 sm:px-3 py-2 border rounded-lg transition text-xs sm:text-sm ${num === currentPage
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "hover:bg-gray-50"
                    }`}
                >
                  {num + 1}
                </button>
              )
            )}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages - 1}
            className="px-3 sm:px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition text-sm"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default BooksPage;
