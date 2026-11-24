import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const paymentLabels = {
  cod: "Cash on Delivery",
  card: "Credit / Debit Card",
  bank: "Bank Transfer",
};

const OrderSuccess = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order;

  // Opened directly (e.g. page refresh with no order data)
  if (!order) return <Navigate to="/" replace />;

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mb-4">
          ✓
        </div>
        <h1 className="text-2xl font-extrabold mb-1">Order Placed!</h1>
        <p className="text-gray-600">
          Thank you, {order.customer.fullName}. Your order has been received.
        </p>
        <p className="mt-2 text-sm text-gray-500">
          Order ID: <span className="font-mono font-semibold">#{order.id}</span>
        </p>
      </div>

      <div className="border rounded-xl p-5 shadow-sm flex flex-col gap-4">
        <div>
          <h2 className="font-bold mb-2">Delivery To</h2>
          <p className="text-sm text-gray-700">{order.customer.fullName}</p>
          <p className="text-sm text-gray-700">{order.customer.phone}</p>
          <p className="text-sm text-gray-700">
            {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
            {order.shippingAddress.postalCode}
          </p>
        </div>

        <div className="border-t pt-4">
          <h2 className="font-bold mb-2">Items</h2>
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm py-1">
              <span>
                {item.Title} × {item.quantity}
              </span>
              <span>${(item.Price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 text-sm flex flex-col gap-1">
          <div className="flex justify-between">
            <span>Payment</span>
            <span>{paymentLabels[order.paymentMethod]}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>
              {order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between text-lg font-bold pt-2">
            <span>Total</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={() => navigate("/")}
          className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg hover:bg-emerald-700"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;