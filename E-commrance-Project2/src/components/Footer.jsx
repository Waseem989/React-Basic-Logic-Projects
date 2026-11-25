import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcAmex,
} from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-300">
      {/* Newsletter */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Stay Updated!</h2>
            <p className="text-gray-400 mt-2">
              Subscribe to get special offers and updates.
            </p>
          </div>

          <div className="flex gap-4 mt-6">
            {[FaFacebookF, FaInstagram, FaTwitter, FaYoutube].map(
              (Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-emerald-500 hover:text-white transition"
                >
                  <Icon />
                </a>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h1 className="text-3xl font-extrabold text-white">
            Shop<span className="text-emerald-500">Zone.</span>
          </h1>

          <p className="text-gray-400 mt-5 leading-7">
            Your one-stop destination for quality products, amazing deals and a
            better shopping experience.
          </p>

          <div className="flex items-center gap-4 text-2xl text-gray-400">
            <FaCcVisa />
            <FaCcMastercard />
            <FaCcPaypal />
            <FaCcAmex />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white text-lg font-bold mb-6">Quick Links</h3>

          <ul className="space-y-4">
            {["Home", "Shop", "About Us", "Contact", "My Account"].map(
              (item) => (
                <li key={item}>
                  <a href="#" className="hover:text-emerald-400 transition">
                    {item}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-white text-lg font-bold mb-6">
            Customer Service
          </h3>

          <ul className="space-y-4">
            {[
              "FAQs",
              "Shipping Policy",
              "Return & Refund",
              "Privacy Policy",
              "Terms & Conditions",
            ].map((item) => (
              <li key={item}>
                <a href="#" className="hover:text-emerald-400 transition">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white text-lg font-bold mb-6">Contact Us</h3>

          <ul className="space-y-5">
            <li className="flex gap-3 items-start">
              <FiMapPin className="text-emerald-400 mt-1" />
              <span>Lahore, Pakistan</span>
            </li>

            <li className="flex gap-3 items-center">
              <FiPhone className="text-emerald-400" />
              <span>+92 000000000</span>
            </li>

            <li className="flex gap-3 items-center">
              <FiMail className="text-emerald-400" />
              <span>kashmiri6980@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 text-center">
            © {date} ShopZone. All Rights Reserved by Waseem Ashraf
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
