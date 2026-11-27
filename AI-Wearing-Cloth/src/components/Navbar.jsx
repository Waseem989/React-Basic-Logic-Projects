
import {
  ShoppingBag,
  Search,
  User,
  Menu,
} from "lucide-react";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">

      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <div className="text-2xl font-black tracking-tighter">
          STYLEFIT<span className="text-gray-400"> AI.</span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">

          <a href="/" className="hover:text-black transition">
            Home
          </a>

          <a href="#products" className="hover:text-black transition">
            Shop
          </a>

          <a href="#categories" className="hover:text-black transition">
            Categories
          </a>

          <a href="#about" className="hover:text-black transition">
            About
          </a>

        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-5">

          <button className="hover:text-gray-500 transition">
            <Search size={21} />
          </button>

          <button className="hover:text-gray-500 transition">
            <User size={21} />
          </button>

          <button className="relative hover:text-gray-500 transition">
            <ShoppingBag size={21} />

            <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              0
            </span>
          </button>

          {/* Mobile Menu */}
          <button className="md:hidden">
            <Menu size={23} />
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;
