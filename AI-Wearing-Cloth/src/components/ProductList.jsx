
import { useState } from "react";
import { Search } from "lucide-react";
import products from "../data/products";
import ProductCard from "./ProductCard";

function ProductList({ onAddToCart, onTryOn }) {

  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const categories = [
    "All",
    "T-Shirts",
    "Hoodies",
    "Jackets",
    "Shoes",
    "Jeans",
  ];

  // Filter products by category and search
  const filteredProducts = products.filter((product) => {

    const matchCategory =
      category === "All" || product.category === category;

    const matchSearch =
      product.name.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <section id="products" className="max-w-7xl mx-auto px-6 py-20">

      {/* Heading */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">

        <div>
          <p className="text-sm font-bold tracking-widest text-gray-400">
            OUR COLLECTION
          </p>

          <h2 className="text-4xl font-black mt-2">
            Latest Products
          </h2>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 w-full md:w-80">

          <Search size={20} className="text-gray-400" />

          <input
            type="text"
            placeholder="Search clothing..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none w-full text-sm"
          />

        </div>

      </div>

      {/* Categories */}
      <div className="flex gap-3 overflow-x-auto mt-10 pb-3">

        {categories.map((item) => (

          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`px-6 py-3 rounded-full text-sm font-semibold whitespace-nowrap transition ${
              category === item
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {item}
          </button>

        ))}

      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-10">

        {filteredProducts.length > 0 ? (

          filteredProducts.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onTryOn={onTryOn}
            />

          ))

        ) : (

          <p className="col-span-full text-center text-gray-500 py-16">
            No products found.
          </p>

        )}

      </div>

    </section>
  );
}

export default ProductList;
