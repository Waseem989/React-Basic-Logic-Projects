import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "https://6aea1a473d3dd3d37be624cd.mockapi.io/Products";

const emptyForm = { Title: "", Des: "", Image: "", Price: "", Rating: "" };

const AdminDashboard = () => {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // page reload na ho
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          Price: Number(form.Price),
          Rating: Number(form.Rating),
        }),
      });

      if (!response.ok) throw new Error("Failed to add product");

      setForm(emptyForm);
       // list page pe wapas, wahan fresh data fetch hoga
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };
   const filteredItems = items.filter((item) =>
    item.Title.toLowerCase().includes(search.toLowerCase()),
  );

  const inputClass =
    "w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="container mx-auto px-4 py-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4 border rounded-xl p-5 shadow-md">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            name="Title"
            value={form.Title}
            onChange={handleChange}
            className={inputClass}
            placeholder="Product title"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="Des"
            value={form.Des}
            onChange={handleChange}
            className={inputClass}
            rows={3}
            placeholder="Short description"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="url"
            name="Image"
            value={form.Image}
            onChange={handleChange}
            className={inputClass}
            placeholder="https://..."
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Price ($)</label>
            <input
              type="number"
              name="Price"
              value={form.Price}
              onChange={handleChange}
              className={inputClass}
              min="0"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Rating (0-5)</label>
            <input
              type="number"
              name="Rating"
              value={form.Rating}
              onChange={handleChange}
              className={inputClass}
              min="0"
              max="5"
              step="0.1"
              required
            />
          </div>
        </div>

        {error && <p className="text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60"
        >
          {submitting ? "Adding..." : "Add Product"}
        </button>
      </form>


      
    </div>
  );
};

export default AdminDashboard;