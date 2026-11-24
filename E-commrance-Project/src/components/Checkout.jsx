import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart, selectCartTotal } from "../redux/CartSlice";

const FREE_SHIPPING_ABOVE = 100;
const SHIPPING_FEE = 5;

const inputClass = (hasError) =>
  `w-full border rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-emerald-500 ${
    hasError ? "border-red-500" : "border-gray-300"
  }`;

// Defined OUTSIDE Checkout so inputs don't lose focus while typing
const Field = ({ label, name, type = "text", placeholder, value, error, onChange }) => (
  <div>
    <label className="block text-sm font-medium mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={inputClass(error)}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

const paymentOptions = [
  { value: "cod", title: "Cash on Delivery" },
  { value: "card", title: "Credit / Debit Card" },
  { value: "bank", title: "Bank Transfer" },
];

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items);
  const subtotal = useSelector(selectCartTotal);
  const placedRef = useRef(false);

  const shipping =
    subtotal === 0 || subtotal >= FREE_SHIPPING_ABOVE ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    paymentMethod: "cod",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (form.fullName.trim().length < 3) e.fullName = "Enter your full name";
    if (!/^[0-9+\-\s]{10,15}$/.test(form.phone.trim()))
      e.phone = "Enter a valid phone number";
    if (form.address.trim().length < 5) e.address = "Enter your address";
    if (form.city.trim().length < 2) e.city = "Enter your city";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const order = {
      id: Date.now().toString().slice(-6),
      customer: {
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
      },
      shippingAddress: {
        address: form.address.trim(),
        city: form.city.trim(),
        postalCode: "",
      },
      items: items.map((i) => ({
        id: i.id,
        Title: i.Title,
        Price: i.Price,
        quantity: i.quantity,
      })),
      shipping,
      total,
      paymentMethod: form.paymentMethod,
    };

    placedRef.current = true;
    navigate("/order-success", { state: { order }, replace: true });
    dispatch(clearCart());
  };

  if (items.length === 0 && !placedRef.current) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <button
          onClick={() => navigate("/")}
          className="bg-emerald-600 text-white px-5 py-2 rounded-lg hover:bg-emerald-700"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <h1 className="text-2xl font-extrabold mb-6">Checkout</h1>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="md:col-span-2 flex flex-col gap-6">
          <section className="border rounded-xl p-5 shadow-sm">
            <h2 className="text-lg font-bold mb-4">Delivery Details</h2>
            <div className="flex flex-col gap-4">
              <Field
                label="Full Name"
                name="fullName"
                placeholder="John Doe"
                value={form.fullName}
                error={errors.fullName}
                onChange={handleChange}
              />
              <Field
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="03001234567"
                value={form.phone}
                error={errors.phone}
                onChange={handleChange}
              />
              <Field
                label="Address"
                name="address"
                placeholder="House #, Street, Area"
                value={form.address}
                error={errors.address}
                onChange={handleChange}
              />
              <Field
                label="City"
                name="city"
                placeholder="City"
                value={form.city}
                error={errors.city}
                onChange={handleChange}
              />
            </div>
          </section>

          <section className="border rounded-xl p-5 shadow-sm">
            <h2 className="text-lg font-bold mb-4">Payment Method</h2>
            <div className="flex flex-col gap-3">
              {paymentOptions.map((opt) => (
                <label
                  key={opt.value}
                  className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer ${
                    form.paymentMethod === opt.value
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={opt.value}
                    checked={form.paymentMethod === opt.value}
                    onChange={handleChange}
                    className="accent-emerald-600"
                  />
                  <span className="font-medium">{opt.title}</span>
                </label>
              ))}
            </div>
          </section>
        </div>

        <aside className="border rounded-xl p-5 shadow-sm h-fit">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t pt-2 mt-1">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700"
          >
            Place Order
          </button>
          <button
            type="button"
            onClick={() => navigate("/cart")}
            className="w-full mt-2 text-sm text-gray-600 hover:underline"
          >
            ← Back to cart
          </button>
        </aside>
      </form>
    </div>
  );
};

export default Checkout;