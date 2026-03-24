import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { productService } from "../../services/productService";

const AddBook = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    unitPrice: "",
    imageUrl: "",
    description: "",
    category: "",
    stock: "",
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    productService.getCategories().then(setCategories);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const payload = {
      name: formData.title,
      authorName: formData.author,
      unitPrice: parseFloat(formData.unitPrice),
      amount: parseInt(formData.stock),
      description: formData.description,
      category: formData.category,
      imageUrl: formData.imageUrl,
    };

    const createdBook = await productService.createProduct(payload);
    if (!createdBook?.id) throw new Error("Book created, but ID missing in response");

    toast.success("Book added successfully!");
    navigate(`/books/${createdBook.id}`); 
  } catch (error) {
    toast.error(error.message || "Failed to add book.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-xl rounded-2xl mt-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
        Add New Book
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
          className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
        />
        <input
          type="number"
          name="unitPrice"
          placeholder="Price"
          value={formData.unitPrice}
          onChange={handleChange}
          required
          min="0"
          step="0.01"
          className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock Quantity"
          value={formData.stock}
          onChange={handleChange}
          required
          min="0"
          className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL (e.g., https://...)"
          value={formData.imageUrl}
          onChange={handleChange}
          required
          className="col-span-1 sm:col-span-2 p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white col-span-1 sm:col-span-2"
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          rows="4"
          className="p-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white resize-none col-span-1 sm:col-span-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="col-span-1 sm:col-span-2 p-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white font-semibold text-lg shadow-md transition duration-300"
        >
          {loading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
