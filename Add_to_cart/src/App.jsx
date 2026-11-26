import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import Cart from "./components/Cart";

function App() {
  const products = [
    { id: 1, icon: "💻", name: "Laptop", price: 50000 },
    { id: 2, icon: "📱 ", name: "Mobile", price: 30000 },
    { id: 3, icon: "🎧 ", name: "Handfree", price: 800 },
    { id: 4, icon: "🖥️ ", name: "Monitor", price: 10000 },
  ];
  const [iscart, setIsCart] = useState(false);
  const [cart, setCart] = useState([]);
const addtocart = (product) => {
  setCart((prev) => {
    const exist = prev.find((item) => {
      return item.id === product.id;
    });

    if (exist) {
      return prev.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    return  [...prev, { ...product, quantity: 1 }];
  });
};




  return (
    
<>
  <div className="max-w-6xl mx-auto px-4 py-10">
    <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
      Our Products
    </h1>

    {/* Cart Button */}
    <button
      className="bg-blue-600 rounded-xl px-5 py-3 text-white hover:bg-blue-700 transition"
      onClick={() => setIsCart(true)}
    >
      🛒 My Cart
      <span className="ml-2 bg-white text-blue-600 rounded-full px-2 py-1 text-sm font-bold">
        {cart.length}
      </span>
    </button>

    {/* Products */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {products.map((item) => (
        <div
          key={item.id}
          className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition duration-300"
        >
          <div className="bg-gray-100 rounded-xl h-36 flex items-center justify-center mb-4">
            <span className="text-6xl">{item.icon}</span>
          </div>

          <h1 className="text-xl font-bold text-gray-800">
            {item.name}
          </h1>

          <h2 className="text-lg font-semibold text-blue-600 my-3">
            Rs. {item.price}
          </h2>

          <button
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition active:bg-blue-900"
            onClick={() => addtocart(item)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  </div>

  {/* Background Overlay */}
  {iscart && (
    <div
      className="fixed inset-0 bg-black/50 z-40"
      onClick={() => setIsCart(false)}
    />
  )}

  {/* Cart Sidebar */}
  <div
    className={`fixed top-0 right-0 z-50 h-screen w-full sm:w-[420px] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ${
      iscart ? "translate-x-0" : "translate-x-full"
    }`}
  >
    {/* Sidebar Header */}
    <div className="flex items-center justify-between p-5 border-b">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          🛒 My Cart
        </h2>
        <p className="text-sm text-gray-500">
          <i>{cart.length} </i> catageory {cart.reduce((total,item)=>total +item.quantity, 0)} items in your cart
        </p>
      </div>

      <button
        onClick={() => setIsCart(false)}
        className="text-3xl text-gray-500 hover:text-red-500 transition"
      >
        &times;
      </button>
    </div>

    {/* Cart Items */}
    <div className="flex-1 overflow-y-auto p-5">
      <Cart cart={cart} setCart={setCart} />
    </div>

    {/* Sidebar Footer */}
    <div className="border-t p-5">
      <button
        onClick={() => setIsCart(false)}
        className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
      >
        Continue Shopping
      </button>
    </div>
  </div>
</>

  );
}

export default App;
