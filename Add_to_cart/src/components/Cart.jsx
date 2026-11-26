
import React from "react";

const Cart = ({ cart, setCart }) => {

  const subtotal = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const removeitem = (product) => {
    setCart((prev) => {
      return prev.filter((item) => item.id !== product.id);
    });
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">My Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center py-10">
          Your cart is empty!
        </p>
      ) : (
        cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border p-4 mb-3 rounded-lg gap-3"
          >
            <div>
              <span className="text-5xl">{item.icon}</span>
              <h2 className="font-bold">{item.name}</h2>
              <p>Price: Rs. {item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>

            <div className="text-right">
              <h2 className="font-bold mb-3">
                Rs. {item.price * item.quantity}
              </h2>

              <button
                onClick={() => removeitem(item)}
                className="bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          </div>
        ))
      )}

      <div className="border-t pt-4 mt-5 flex justify-between items-center">
        <h2 className="text-xl font-bold">Subtotal:</h2>

        <h2 className="text-xl font-bold text-blue-600">
          Rs. {subtotal.toLocaleString("en-PK")}
        </h2>
      </div>
    </div>
  );
};

export default Cart;
