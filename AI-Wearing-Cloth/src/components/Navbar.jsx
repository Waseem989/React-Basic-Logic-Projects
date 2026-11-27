


import { Search, User, ShoppingBag, Menu } from "lucide-react";

function Navbar({ cartCount = 0, onCartClick }) {
  return (
    <nav className="sticky top-0 z-50 bg-black text-white px-6 py-5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        <h1 className="text-2xl font-black tracking-widest">
          STYLEFIT <span className="text-purple-400">AI.</span>
        </h1>

        <div className="hidden md:flex items-center gap-8 text-sm">
          <a href="#" className="hover:text-purple-400">Home</a>
          <a href="#shop" className="hover:text-purple-400">Shop</a>
          <a href="#categories" className="hover:text-purple-400">Categories</a>
          <a href="#about" className="hover:text-purple-400">About</a>
        </div>

        <div className="flex items-center gap-5">
          <Search size={20} className="cursor-pointer" />
          <User size={20} className="cursor-pointer" />

          <button
            onClick={onCartClick}
            className="relative"
            aria-label="Open shopping cart"
          >
            <ShoppingBag size={22} />

            {cartCount > 0 && (
              <span className="absolute -top-3 -right-3 bg-purple-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          <Menu className="md:hidden" size={23} />
        </div>

      </div>
    </nav>
  );
}

export default Navbar;

