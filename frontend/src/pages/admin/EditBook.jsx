import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { productService } from "../../services/productService";

const EditBook = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    authorName: "",
    unitPrice: "",
    amount: "",
    category: "",
    imageUrl: "",
    description: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!productId) {
      setError("No valid book ID was found in the URL.");
      setLoading(false);
      return;
    }

    const fetchBookDetails = async () => {
      try {
        const book = await productService.getProductById(productId);
        setFormData({
          name: book.name || "",
          authorName: book.authorName || "",
          unitPrice: String(book.unitPrice || ""),
          amount: String(book.amount || ""),
          category: book.category || "",
          imageUrl: book.imageUrl || "",
          description: book.description || "",
        });
      } catch (err) {
        const msg = err.fullError?.message || "Failed to load book data";
        setError(msg);
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const requiredFields = ["name", "authorName", "unitPrice", "amount", "category", "description"];
    for (const field of requiredFields) {
      if (!formData[field].trim()) {
        const errorMsg = `The ${field} field cannot be empty.`;
        setError(errorMsg);
        toast.error(errorMsg);
        return;
      }
    }

    const price = parseFloat(formData.unitPrice);
    const stock = parseInt(formData.amount, 10);
    if (isNaN(price) || price < 0) {
      toast.error("Invalid price.");
      return;
    }
    if (isNaN(stock) || stock < 0) {
      toast.error("Invalid stock amount.");
      return;
    }

    const updatePayload = {
      name: formData.name.trim(),
      authorName: formData.authorName.trim(),
      description: formData.description.trim(),
      category: formData.category.trim(),
      imageUrl: formData.imageUrl.trim(),
      unitPrice: price,
      amount: stock,
    };

    setSubmitting(true);
    try {
      await productService.updateProduct(productId, updatePayload);
      toast.success("Book updated successfully!");
      navigate(`/books/${productId}`);
    } catch (err) {
      const msg = err.fullError?.message || "Update failed.";
      setError(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">Edit Book</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        {[{ name: "name", label: "Title" },
          { name: "authorName", label: "Author" },
          { name: "unitPrice", label: "Price", type: "number" },
          { name: "amount", label: "Stock", type: "number" },
          { name: "category", label: "Category" },
          { name: "imageUrl", label: "Image URL" }].map(({ name, label, type = "text" }) => (
          <div key={name}>
            <label className="block text-gray-700 font-semibold mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        ))}

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold disabled:opacity-50"
          >
            {submitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBook;
