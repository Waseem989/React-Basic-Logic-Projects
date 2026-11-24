import { useState, useEffect } from "react";

const API = "https://6aea1a473d3dd3d37be624cd.mockapi.io/Products";

const emptyForm = { Title: "", Des: "", Image: "", Price: "", Rating: "" };

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null); // null = add mode
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  // ---------- Fetch all products ----------
  const fetchProducts = async () => {
    try {
      setListError(null);
      const res = await fetch(API);
      if (!res.ok) throw new Error("Products load nahi hue");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setListError(err.message);
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ---------- Modal open / close ----------
  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setError(null);
    setSuccess("");
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setEditingId(product.id);
    setForm({
      Title: product.Title,
      Des: product.Des,
      Image: product.Image,
      Price: product.Price,
      Rating: product.Rating,
    });
    setError(null);
    setSuccess("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm(emptyForm);
    setError(null);
    setSuccess("");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ---------- Add / Update ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess("");

    const isEdit = editingId !== null;

    try {
      const response = await fetch(isEdit ? `${API}/${editingId}` : API, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          Title: form.Title.trim(),
          Des: form.Des.trim(),
          Price: Number(form.Price),
          Rating: Number(form.Rating),
        }),
      });

      if (!response.ok) {
        throw new Error(isEdit ? "Update fail ho gaya" : "Product add nahi hua");
      }

      // Add mode mein form khali, edit mode mein same values rehne do
      if (!isEdit) setForm(emptyForm);

      setSuccess(
        isEdit ? "Product updated successfully!" : "Product added successfully!"
      );
      setTimeout(() => setSuccess(""), 3000);

      fetchProducts(); // list refresh (form open rahega)
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // ---------- Delete ----------
  const handleDelete = async (id) => {
    if (!window.confirm("Kya aap sach mein ye product delete karna chahte hain?"))
      return;

    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete fail ho gaya");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };
  

  const inputClass =
    "w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={openAddModal}
          className="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700"
        >
          + Add Item
        </button>
      </div>

      {/* ---------- Popup Form ---------- */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl bg-white p-6 shadow-2xl">
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-3 text-2xl text-gray-400 hover:text-red-500"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-4">
              {editingId ? "Update Product" : "Add New Product"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
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
              {success && (
                <p className="rounded-lg bg-green-100 px-3 py-2 text-green-700">
                  {success}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60"
              >
                {submitting
                  ? "Please wait..."
                  : editingId
                  ? "Update Product"
                  : "Add Product"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ---------- Products List ---------- */}
      <h2 className="text-xl font-semibold mb-4">
        All Products ({products.length})
      </h2>

      {listLoading && <p>Loading...</p>}
      {listError && <p className="text-red-600">{listError}</p>}
      {!listLoading && !listError && products.length === 0 && (
        <p className="text-gray-500">Abhi koi product nahi hai.</p>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div
            key={p.id}
            className="border rounded-xl shadow-md overflow-hidden flex flex-col"
          >
            <img
              src={p.Image}
              alt={p.Title}
              className="h-48 w-full object-cover bg-gray-100"
            />

            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-bold text-lg">{p.Title}</h3>
              <p className="text-gray-600 text-sm mt-1 flex-1">{p.Des}</p>

              <div className="flex justify-between mt-3 font-medium">
                <span>${p.Price}</span>
                <span>⭐ {p.Rating}</span>
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => openEditModal(p)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;