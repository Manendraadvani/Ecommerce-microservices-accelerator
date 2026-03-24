// src/components/Home/HeroSection.jsx
import React from "react";
import { Link } from "react-router-dom";


const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-indigo-100 to-indigo-50 py-20 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-zinc-800">
          Discover Your Next Favorite Book
        </h1>
        <p className="text-lg text-zinc-600 mb-6">
          Bestsellers, classics, and more — all in one place.
        </p>
        <Link
          to="/books"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-all"
        >
          View All Books
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
