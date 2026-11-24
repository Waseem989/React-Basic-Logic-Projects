import React, { useEffect, useState } from "react";

const SHOW_AFTER_MS = 5000; // popup appears after 5 seconds
const COUNTDOWN_SECONDS = 30; // offer timer inside the popup
const CLOSE_AFTER_SUBMIT_MS = 2500; // thank-you message stays this long

const formatTime = (s) =>
  `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

const PopupForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({});

  // 1) setTimeout: open the popup once, after a delay
  useEffect(() => {
    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem("popupSeen") === "1";
    } catch {}
    if (alreadySeen) return;

    const timer = setTimeout(() => setIsOpen(true), SHOW_AFTER_MS);
    return () => clearTimeout(timer);
  }, []);

  // 2) setInterval: tick the countdown every second while the popup is open
  useEffect(() => {
    if (!isOpen || submitted) return;

    setSecondsLeft(COUNTDOWN_SECONDS);
    const interval = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isOpen, submitted]);

  // Auto-close when the countdown reaches 0
  useEffect(() => {
    if (isOpen && !submitted && secondsLeft <= 0) closePopup();
  }, [secondsLeft, isOpen, submitted]);

  // 3) setTimeout: close a moment after a successful submit
  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(closePopup, CLOSE_AFTER_SUBMIT_MS);
    return () => clearTimeout(timer);
  }, [submitted]);

  const closePopup = () => {
    setIsOpen(false);
    try {
      sessionStorage.setItem("popupSeen", "1");
    } catch {}
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = {};
    if (form.name.trim().length < 2) err.name = "Enter your name";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) err.email = "Enter a valid email";
    setErrors(err);
    if (Object.keys(err).length > 0) return;

    // Send form.name / form.email to your API here if needed
    setSubmitted(true);
  };

  if (!isOpen) return null;

  const progress = (secondsLeft / COUNTDOWN_SECONDS) * 100;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4"
      onClick={closePopup}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Countdown bar */}
        {!submitted && (
          <div className="h-1.5 bg-gray-200">
            <div
              className="h-full bg-emerald-500 transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        <button
          onClick={closePopup}
          aria-label="Close"
          className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-gray-700"
        >
          ×
        </button>

        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6">
              <div className="mx-auto w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl mb-3">
                ✓
              </div>
              <h2 className="text-xl font-extrabold mb-1">You're in!</h2>
              <p className="text-gray-600 text-sm">
                Thanks {form.name.trim()}, check your email for your 10% code.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-extrabold">Get 10% off your first order</h2>
              <p className="text-sm text-gray-600 mt-1">
                Join our list. This offer expires in{" "}
                <span className="font-mono font-bold text-red-500">
                  {formatTime(Math.max(secondsLeft, 0))}
                </span>
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-5 flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={`w-full border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500 ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`w-full border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500 ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700"
                >
                  Claim My Discount
                </button>
                <button
                  type="button"
                  onClick={closePopup}
                  className="text-sm text-gray-500 hover:underline"
                >
                  No thanks
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PopupForm;