import React, { useEffect, useState } from "react";

const PopupForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-4 top-3 text-2xl text-gray-500 hover:text-black"
        >
          &times;
        </button>

        {submitted ? (
          <div className="py-6 text-center">
            <h2 className="mb-3 text-2xl font-bold text-green-600">
              Thank You!
            </h2>
            <p className="text-gray-600">Thanks for joining us, {form.name}!</p>
            <button
              onClick={() => setIsOpen(false)}
              className="mt-5 rounded-lg bg-green-600 px-6 py-2 text-white"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h2 className="mb-2 text-2xl font-bold">Get 10% OFF!</h2>

            <p className="mb-5 text-sm text-gray-500">
              Subscribe to our newsletter and get 10% off your first order.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Enter your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
                required
              />

              <input
                type="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-green-500"
                required
              />

              <button
                type="submit"
                className="w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
              >
                Subscribe Now
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default PopupForm;
