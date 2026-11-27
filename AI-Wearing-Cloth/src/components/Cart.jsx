
import { Plus, Minus, Trash2, ShoppingBag } from "lucide-react";

function Cart({ cart, setCart, onBack }) {
  // Increase or decrease product quantity
  const updateQuantity = (id, amount) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove product from cart
  const removeItem = (id) => {
    setCart((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  // Calculate total price
  const total = cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  return (
    <section className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-6xl mx-auto">

        <button
          onClick={onBack}
          className="text-gray-500 hover:text-black mb-8"
        >
          ← Continue Shopping
        </button>

        <h1 className="text-4xl font-black mb-8">
          Your Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center">
            <ShoppingBag
              size={55}
              className="mx-auto text-gray-400"
            />
            <h2 className="text-2xl font-bold mt-5">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mt-2">
              Add some products to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Cart Products */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-5 flex gap-5 items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-28 object-cover rounded-xl"
                  />

                  <div className="flex-1">
                    <h3 className="font-bold text-lg">
                      {item.name}
                    </h3>

                    <p className="text-gray-500 mt-1">
                      Rs. {item.price.toLocaleString()}
                    </p>

                    <div className="flex items-center gap-4 mt-4">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="border rounded-lg p-2"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="font-bold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="border rounded-lg p-2"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-black">
                      Rs. {(item.price * item.quantity).toLocaleString()}
                    </p>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 mt-5"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl p-6 h-fit shadow-sm">
              <h2 className="text-xl font-bold mb-6">
                Order Summary
              </h2>

              <div className="flex justify-between mb-4 text-gray-500">
                <span>Subtotal</span>
                <span>Rs. {total.toLocaleString()}</span>
              </div>

              <div className="flex justify-between mb-4 text-gray-500">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <hr className="my-5" />

              <div className="flex justify-between text-xl font-black">
                <span>Total</span>
                <span>Rs. {total.toLocaleString()}</span>
              </div>

              <button
                disabled={cart.length === 0}
                className="w-full bg-black text-white py-4 rounded-xl mt-7 font-bold disabled:bg-gray-300"
              >
                Proceed to Checkout
              </button>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}

export default Cart;
