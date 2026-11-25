
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../Redux/CartSlice";
import PopupForm from "../components/PopupForm";

const UserDashboard = ({ search = "" }) => {
  const dispatch = useDispatch();

  const [items, setItems] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [latestLoading, setLatestLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(150000);
  const [showSidebar, setShowSidebar] = useState(false);

  // Main products API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://6aea1a473d3dd3d37be624cd.mockapi.io/Products"
        );

        if (!response.ok) throw new Error("Server error");

        const data = await response.json();
        setItems(data);
      } catch (err) {
        setError("Server not responding, try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Latest products API
  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products?limit=4"
        );

        if (!response.ok) throw new Error("Latest products API error");

        const data = await response.json();
        setLatestProducts(data);
      } catch (err) {
        console.log("Latest products could not load", err);
      } finally {
        setLatestLoading(false);
      }
    };

    fetchLatest();
  }, []);

  // Extract unique categories
  const categories = [
    "All",
    ...new Set(items.map((item) => item.type).filter(Boolean)),
  ];

  // Filter products
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.Title?.toLowerCase().includes(
      search.toLowerCase()
    );

    const matchesCategory =
      selectedCategory === "All" ||
      item.type === selectedCategory;

    const matchesPrice = Number(item.Price) <= maxPrice;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50">

      <PopupForm />

      <div className="container mx-auto px-4 py-6">

        {/* LATEST PRODUCTS SECTION */}
        <section className="mb-10">

          <div className="flex justify-between items-center mb-5">
            <div>
              <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider">
                Fresh Arrivals
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Latest Products
              </h2>
            </div>

            <span className="text-sm text-gray-500">
              New Collection
            </span>
          </div>

          {latestLoading ? (
            <p className="py-6 text-gray-500">Loading latest products...</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

              {latestProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-lg transition"
                >
                  <div className="bg-gray-100 p-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-36 md:h-44 w-full object-contain"
                    />
                  </div>

                  <div className="p-3">
                    <h3 className="font-semibold text-sm line-clamp-2">
                      {product.title}
                    </h3>

                    <p className="text-blue-600 font-bold mt-2">
                      ${product.price}
                    </p>

                    <span className="text-xs text-green-600">
                      Latest Arrival
                    </span>
                  </div>
                </div>
              ))}

            </div>
          )}
        </section>

        {/* MAIN PRODUCT SECTION */}
        <div className="border-t border-gray-200 pt-8">

          <div className="flex flex-wrap justify-between items-center gap-3 mb-6">

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Explore Products
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Find products that match your needs
              </p>
            </div>

            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="lg:hidden bg-gray-900 text-white px-4 py-2 rounded-lg"
            >
              {showSidebar ? "Close Filters" : "☰ Filters"}
            </button>

          </div>

          <div className="flex flex-col lg:flex-row gap-6">

            {/* SIDEBAR */}
            <aside
              className={`${
                showSidebar ? "block" : "hidden"
              } lg:block w-full lg:w-64 shrink-0`}
            >

              <div className="bg-white border rounded-xl p-5 shadow-sm sticky top-5">

                <div className="flex justify-between items-center mb-5">
                  <h3 className="font-bold text-lg">Filters</h3>

                  <button
                    onClick={() => {
                      setSelectedCategory("All");
                      setMaxPrice(1000);
                    }}
                    className="text-blue-600 text-sm"
                  >
                    Reset
                  </button>
                </div>

                {/* CATEGORY FILTER */}
                <div className="mb-7">

                  <h4 className="font-semibold mb-3">
                    Categories
                  </h4>

                  <div className="space-y-3">

                    {categories.map((category) => (
                      <label
                        key={category}
                        className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === category}
                          onChange={() => setSelectedCategory(category)}
                          className="accent-blue-600"
                        />

                        {category}
                      </label>
                    ))}

                  </div>
                </div>

                <hr className="mb-6" />

                {/* PRICE FILTER */}
                <div>

                  <h4 className="font-semibold mb-3">
                    Maximum Price
                  </h4>

                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="10"
                    value={maxPrice}
                    onChange={(e) =>
                      setMaxPrice(Number(e.target.value))
                    }
                    className="w-full accent-blue-600"
                  />

                  <div className="flex justify-between text-sm mt-3">
                    <span className="text-gray-500">Min: $0</span>

                    <span className="font-bold text-blue-600">
                      Max: ${maxPrice}
                    </span>
                  </div>

                </div>

              </div>

            </aside>

            {/* PRODUCTS GRID */}
            <div className="flex-1 min-w-0">

              {loading && (
                <h2 className="text-center py-10 font-semibold">
                  Loading products...
                </h2>
              )}

              {error && (
                <p className="text-center text-red-600 py-10">
                  {error}
                </p>
              )}

              {!loading && !error && filteredItems.length === 0 && (
                <p className="text-center py-10 text-gray-500">
                  No products found.
                </p>
              )}

              {!loading && !error && filteredItems.length > 0 && (

                <>
                  <p className="text-sm text-gray-500 mb-4">
                    Showing {filteredItems.length} products
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

                    {filteredItems.map((item) => (

                      <div
                        key={item.id}
                        className="bg-white border rounded-xl p-3 shadow-sm hover:shadow-xl transition duration-300 overflow-hidden"
                      >

                        <div className="overflow-hidden rounded-lg bg-gray-100">
                          <img
                            src={item.Image}
                            alt={item.Title}
                            className="w-full h-48 object-cover hover:scale-110 transition duration-300"
                          />
                        </div>

                        <div className="pt-3">

                          <h3 className="font-bold text-lg line-clamp-1">
                            {item.Title}
                          </h3>

                          <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                            {item.Des}
                          </p>

                          <div className="flex justify-between items-center mt-3">

                            <span className="text-yellow-500 text-sm">
                              ★★★★☆
                            </span>

                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {item.type || "General"}
                            </span>

                          </div>

                          <div className="flex justify-between items-center mt-4">

                            <p className="font-bold text-xl text-gray-900">
                              ${item.Price}
                            </p>

                            <button
                              onClick={() => dispatch(addToCart(item))}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                            >
                              Add to Cart
                            </button>

                          </div>

                        </div>

                      </div>

                    ))}

                  </div>
                </>
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default UserDashboard;
