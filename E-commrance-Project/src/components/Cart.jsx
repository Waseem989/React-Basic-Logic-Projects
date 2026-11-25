import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  selectCartTotal,
} from "../Redux/CartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.cart.items);
  const total = useSelector(selectCartTotal);

  if (items.length === 0) {
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
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-extrabold">Shopping Cart</h1>
        <button
          onClick={() => dispatch(clearCart())}
          className="text-red-600 hover:underline"
        >
          Clear Cart
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border rounded-xl p-3 shadow-sm"
          >
            <img
              src={item.Image}
              alt={item.Title}
              className="w-20 h-20 object-cover rounded-lg"
            />

            <div className="flex-1">
              <h2 className="font-semibold line-clamp-1">{item.Title}</h2>
              <p className="text-gray-600">${item.Price}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => dispatch(decreaseQty(item.id))}
                className="w-8 h-8 border rounded hover:bg-gray-100"
              >
                −
              </button>
              <span className="w-6 text-center">{item.quantity}</span>
              <button
                onClick={() => dispatch(increaseQty(item.id))}
                className="w-8 h-8 border rounded hover:bg-gray-100"
              >
                +
              </button>
            </div>

            <p className="w-20 text-right font-bold">
              ${(item.Price * item.quantity).toFixed(2)}
            </p>

            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6 pt-4 border-t">
        <span className="text-xl font-bold">Total</span>
        <span className="text-xl font-bold">${total.toFixed(2)}</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <button
          onClick={() => navigate("/")}
          className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-50"
        >
          Continue Shopping
        </button>
        <button
          onClick={() => navigate("/checkout")}
          className="flex-1 bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
