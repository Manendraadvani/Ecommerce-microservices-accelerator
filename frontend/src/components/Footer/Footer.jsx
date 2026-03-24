// Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-zinc-100 py-10 ">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">

        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={logo} alt="Logo" className="h-8 w-8" />
            <span className="text-xl font-semibold">BookBazaar</span>
          </div>
          <p className="text-sm">
            Discover your next favorite book at unbeatable prices.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Explore</h4>
          <ul className="space-y-1 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/books" className="hover:underline">All Books</Link></li>
            <li><Link to="/about" className="hover:underline">About Us</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Contact</h4>
          <ul className="space-y-1 text-sm">
            <li>Email: support@bookbazaar.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Location: Remote, India</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-indigo-400"><Facebook /></a>
            <a href="#" className="hover:text-indigo-400"><Twitter /></a>
            <a href="#" className="hover:text-indigo-400"><Instagram /></a>
            <a href="mailto:support@bookbazaar.com" className="hover:text-indigo-400"><Mail /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-zinc-400 mt-6">
        &copy; {new Date().getFullYear()} BookBazaar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
