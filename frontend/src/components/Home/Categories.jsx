import React, { useEffect, useState } from "react";
import { BookOpen, Heart, Rocket, Brain, Baby } from "lucide-react";
import { Link } from "react-router-dom";

const staticCategories = [
  { name: "Fiction", icon: BookOpen },
  { name: "Romance", icon: Heart },
  { name: "Sci-Fi", icon: Rocket },
  { name: "Non-Fiction", icon: Brain },
  { name: "Children", icon: Baby },
];

const Categories = () => {
  const [categories, setCategories] = useState(staticCategories); 
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories(staticCategories);
      } finally {
        setLoading(false);
      }
    };

  }, []);

  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-4">Browse by Category</h2>
      <p className="text-center text-gray-600 mb-10">
        Find books by your favorite genres and themes.
      </p>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-indigo-600" />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 justify-items-center">
          {categories.map(({ name, icon: Icon, iconUrl }) => (
            <Link
              key={name}
              to={`/books?category=${encodeURIComponent(name)}`}
              className="flex flex-col items-center justify-center bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition duration-300 ease-in-out group w-full max-w-[140px]"
            >
              {Icon ? (
                <Icon className="h-10 w-10 text-indigo-600 group-hover:scale-110 transition-transform duration-300" />
              ) : iconUrl ? (
                <img
                  src={iconUrl}
                  alt={`${name} icon`}
                  className="h-10 w-10 object-contain group-hover:scale-110 transition-transform duration-300"
                />
              ) : null}

              <p className="mt-4 text-sm font-medium text-gray-800 group-hover:text-indigo-600">
                {name}
              </p>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default Categories;
