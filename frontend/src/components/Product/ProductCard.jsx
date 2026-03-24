import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ book }) => {
  if (!book) return null;

  const {
    id,
    name = "Untitled Book",
    authorName = "Unknown Author",
    imageUrl = "/placeholder-book.jpg",
    unitPrice = "N/A",
  } = book;

  return (
    <Link
      to={`/books/${id}`}
      className="focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-2xl"
      aria-label={`View details for ${name}`}
    >
      <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 cursor-pointer overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-60 object-cover group-hover:opacity-90 transition duration-300"
        />

        <div className="p-4 space-y-1">
          <h3 className="text-lg font-semibold group-hover:text-indigo-600 transition-colors line-clamp-2">
            {name}
          </h3>
          <p className="text-sm text-gray-600 truncate">{authorName}</p>
          <p className="text-indigo-600 font-bold">Rs {unitPrice}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
