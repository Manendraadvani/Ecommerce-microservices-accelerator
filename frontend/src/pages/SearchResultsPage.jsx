// src/pages/SearchResultsPage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchBooks } from '../utils/apiClient';
import { productService } from '../services/productService';
import ProductCard from '../components/Product/ProductCard';
import axios from 'axios'; // ADD THIS IMPORT

const SearchResultsPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');

    const [searchResponse, setSearchResponse] = useState(null);
    const [totalResults, setTotalResults] = useState(0);
    const [books, setBooks] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!query) {
            setIsLoading(false);
            return;
        }

        const fetchAndEnrichResults = async () => {
            setIsLoading(true);
            setError(null);
            setBooks([]);

            try {
                // NEW: Use PostgreSQL search instead of Coveo
                const API_URL = import.meta.env.VITE_API_URL || "http://localhost:1110";
                const response = await axios.get(`${API_URL}/api/v1/products/search`, {
                    params: { q: query }
                });

                console.log("🐞 DEBUG 1: Search Response:", response.data);

                // Extract the actual products array from CustomResponse
                const products = response.data.response || response.data || [];
                
                setTotalResults(products.length);
                
                if (products.length === 0) {
                    setIsLoading(false);
                    return;
                }

                // Map the products to the format expected by ProductCard
                const formattedBooks = products.map(product => ({
                    id: product.id,
                    name: product.name,
                    authorName: product.authorName,
                    unitPrice: product.unitPrice,
                    imageUrl: product.imageUrl,
                    category: product.category,
                    publisher: product.publisher,
                    _uniqueKey: product.id
                }));

                console.log("🐞 DEBUG 2: Formatted books:", formattedBooks);
                setBooks(formattedBooks);

            } catch (err) {
                setError("An error occurred during the search. Please try again.");
                console.error("Search failed:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAndEnrichResults();
    }, [query]);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full"></div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="text-center py-10 text-red-600">
                    {error}
                </div>
            );
        }

        if (books.length === 0) {
            return (
                <div className="text-center py-10 text-zinc-600 dark:text-zinc-400">
                    No books found matching your search.
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {books.map(book => (
                    !book.error && <ProductCard key={book._uniqueKey} book={book} />
                ))}
            </div>
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-2 text-zinc-800 dark:text-white">Search Results</h1>

            {!isLoading && !error && (
                <p className="mb-6 text-zinc-600 dark:text-zinc-300">
                    Found {totalResults} result{totalResults !== 1 ? 's' : ''} for "{query}"
                </p>
            )}

            {renderContent()}
        </div>
    );
};

export default SearchResultsPage;