// src/components/Home/FinalCTA.jsx
import React from "react";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 px-6 md:px-12 lg:px-24 text-white text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to explore your next great read?
        </h2>
        <p className="text-lg mb-6">
          Dive into our wide collection of books and find your next favorite.
        </p>
        <Link
          to="/books"
          className="inline-block bg-white text-indigo-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium transition transform hover:scale-105"
        >
          Browse All Books
        </Link>
      </div>
    </section>
  );
};

export default FinalCTA;
