
import { ShoppingCart, Sparkles } from "lucide-react";

function ProductCard({ product, onAddToCart, onTryOn }) {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition duration-300">

      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-100">

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-cover group-hover:scale-105 transition duration-500"
        />

        {/* Category */}
        <span className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-semibold">
          {product.category}
        </span>

        {/* AI Try On Button */}
        <button
          onClick={() => onTryOn(product)}
          className="absolute bottom-4 left-4 right-4 bg-black text-white py-3 rounded-xl flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition"
        >
          <Sparkles size={17} />
          Try On with AI
        </button>

      </div>

      {/* Product Details */}
      <div className="p-5">

        <h3 className="font-bold text-lg">
          {product.name}
        </h3>

        <p className="text-gray-500 text-sm mt-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-5">

          <span className="text-xl font-black">
            Rs. {product.price.toLocaleString()}
          </span>

          <button
            onClick={() => onAddToCart(product)}
            className="bg-black text-white p-3 rounded-xl hover:bg-gray-700 transition"
          >
            <ShoppingCart size={19} />
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;
