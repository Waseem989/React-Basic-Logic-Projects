
import { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductList from "./components/ProductList";
import VirtualTryOn from "./pages/VirtualTryOn";
import Cart from "./components/cart";

function App() {
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleTryOn = (product) => {
    setSelectedProduct(product);
    setShowCart(false);
  };

  const handleBack = () => {
    setSelectedProduct(null);
  };

  const handleOpenCart = () => {
    setShowCart(true);
    setSelectedProduct(null);
  };

  const handleCloseCart = () => {
    setShowCart(false);
  };

  return (
    <>
      <Navbar
        cartCount={cart.reduce(
          (total, item) => total + item.quantity,
          0
        )}
        onCartClick={handleOpenCart}
      />

      {showCart ? (
        <Cart
          cart={cart}
          setCart={setCart}
          onBack={handleCloseCart}
        />
      ) : selectedProduct ? (
        <VirtualTryOn
          product={selectedProduct}
          onBack={handleBack}
        />
      ) : (
        <>
          <Hero />
          <ProductList
            onAddToCart={addToCart}
            onTryOn={handleTryOn}
          />
        </>
      )}
    </>
  );
}

export default App;
