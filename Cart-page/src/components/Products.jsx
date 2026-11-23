import { useState, useEffect, } from "react";
import { useDispatch } from "react-redux";
import { additem } from "../Slice/Slice";



const Products = ({ searchTerm }) => {
    const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://6aea1a473d3dd3d37be624cd.mockapi.io/Products",
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

  const filteredItems = items.filter((item) =>
    item.Title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="container mx-auto px-4 py-6">
      {loading && (
        <h1 className="text-center font-extrabold text-xl py-6">
          Loading data...
        </h1>
      )}

      {error && <p className="text-center text-red-600 py-6">{error}</p>}

      {!loading && !error && filteredItems.length === 0 && (
        <p className="text-center text-gray-500 py-6">No products found.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="border p-3 sm:p-4 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300"
          >
            <div className="overflow-hidden rounded-lg">
              <img
                src={item.Image}
                alt={item.Title}
                className="w-full h-40 sm:h-48 md:h-52 object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>

            <h2 className="text-lg font-semibold mt-3 mb-2 line-clamp-1">
              {item.Title}
            </h2>

            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {item.Des}
            </p>

            <p className="text-yellow-500 mb-2 text-sm">
              ★★★★☆ <span className="text-gray-600">{item.Rating}</span>
            </p>

            <p className="text-gray-800 font-bold text-lg">${item.Price}</p>
            <div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={()=>dispatch(additem(1))} >
                Add to Cart
              </button>
              <button className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500"  >
                Remove Item
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
