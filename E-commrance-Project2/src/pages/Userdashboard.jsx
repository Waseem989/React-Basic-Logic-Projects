import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import PopupForm from "../components/PopupForm";

const UserDashboard = ({ search = "" }) => {
  const dispatch = useDispatch();

  const [items, setItems] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [latestLoading, setLatestLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState("All");

  // Show 6 products initially
  const [visibleCount, setVisibleCount] = useState(6);

  // Success popup state
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch main products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://6aea1a473d3dd3d37be624cd.mockapi.io/Products",
        );

        if (!response.ok) {
          throw new Error("Server error");
        }

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

  // Fetch latest products
  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products?limit=4",
        );

        if (!response.ok) {
          throw new Error("Latest API error");
        }

        const data = await response.json();
        setLatestProducts(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLatestLoading(false);
      }
    };

    fetchLatest();
  }, []);

  // Reset visible products when search or category changes
  useEffect(() => {
    setVisibleCount(6);
  }, [selectedCategory, search]);

  // Get category from API
  const getCategory = (item) =>
    item.type || item.category || item.Category || "Other";

  // Dynamic categories
  const categories = ["All", ...new Set(items.map(getCategory))];

  // Filter products
  const filteredItems = items.filter((item) => {
    const matchesSearch = (item.Title || "")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || getCategory(item) === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Show next 6 products
  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  // Add product to cart and show success popup
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));

    setSuccessMessage(`${item.Title} added to cart successfully!`);

    setTimeout(() => {
      setSuccessMessage("");
    }, 2500);
  };

  // Products currently visible
  const visibleItems = filteredItems.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-gray-50">
      <PopupForm />

      {/* SUCCESS POPUP */}
      {successMessage && (
        <div className="fixed top-5 right-5 z-[9999] animate-in slide-in-from-right duration-300">
          <div className="flex items-center gap-3 bg-white border border-green-200 shadow-xl rounded-xl p-4 max-w-sm">
            <div className="bg-green-100 text-green-600 w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-xl font-bold">
              ✓
            </div>

            <div className="flex-1">
              <h3 className="font-bold text-gray-900">Added Successfully!</h3>

              <p className="text-sm text-gray-500">{successMessage}</p>
            </div>

            <button
              onClick={() => setSuccessMessage("")}
              className="text-gray-400 hover:text-gray-700 ml-2"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-2">
        {/* LATEST PRODUCTS */}
        <section className="mb-4">
          <div className="flex justify-between items-center mb-5">
            <div>
              <p className="text-blue-600 text-xs font-bold uppercase tracking-widest">
                Just Arriving
              </p>

              <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">
                Latest Products
              </h2>
            </div>

            <span className="text-sm text-gray-500">New Collection</span>
          </div>

          {latestLoading ? (
            <p className="py-5 text-gray-500">Loading latest products...</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {latestProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl border shadow-sm overflow-hidden hover:shadow-lg transition"
                >
                  <div className="bg-white p-4">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-32 md:h-40 w-full object-contain"
                    />
                  </div>

                  <div className="p-3 border-t">
                    <h3 className="font-semibold text-sm line-clamp-2">
                      {product.title}
                    </h3>

                    <p className="text-blue-600 font-bold mt-2">
                      {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* MAIN PRODUCTS */}
        <section className="border-t pt-8">
          <div className="mb-5">
            <h2 className="text-2xl font-extrabold text-gray-900">
              Explore Products
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Browse products by category
            </p>
          </div>

          {/* HORIZONTAL CATEGORY FILTER */}
          <div className="flex gap-3 overflow-x-auto pb-4 mb-5">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white border text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* PRODUCT COUNT */}
          {!loading && !error && (
            <p className="text-sm text-gray-500 mb-4">
              Showing {visibleItems.length} of {filteredItems.length} products
            </p>
          )}

          {/* LOADING */}
          {loading && <p className="text-center py-10">Loading products...</p>}

          {/* ERROR */}
          {error && <p className="text-center text-red-600 py-10">{error}</p>}

          {/* NO PRODUCTS */}
          {!loading && !error && filteredItems.length === 0 && (
            <p className="text-center py-10 text-gray-500">
              No products found.
            </p>
          )}

          {/* PRODUCT GRID */}
          {!loading && !error && visibleItems.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
              {visibleItems.map((item) => (
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

                  <h3 className="font-bold text-lg mt-3 line-clamp-1">
                    {item.Title}
                  </h3>

                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                    {item.Des}
                  </p>

                  <div className="flex justify-between items-center mt-3">
                    <span className="text-yellow-500 text-sm">★★★★☆</span>

                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {getCategory(item)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <p className="font-bold text-xl">Rs. {item.Price}</p>

                    <button
                      onClick={() => handleAddToCart(item)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SHOW MORE BUTTON */}
          {!loading && !error && visibleCount < filteredItems.length && (
            <div className="flex justify-center mt-10">
              <button
                onClick={handleShowMore}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition"
              >
                Show More Products
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default UserDashboard;
