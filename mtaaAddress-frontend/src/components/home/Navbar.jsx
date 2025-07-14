// src/components/Navbar.jsx
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'How it Works', path: '/how-it-works' },
    { name: 'FAQs', path: '/faq' },
    { name: 'Login', path: '/login' },
    { name: 'Register', path: '/register' },
  ];

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all ${
        scrolled
          ? 'bg-white/80 backdrop-blur shadow-md'
          : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-green-700 tracking-tight"
        >
          <span className="text-yellow-500">📍</span> Mtaa
          <span className="text-yellow-500">Address</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-gray-700 font-medium">
          {navLinks.map(({ name, path }) => (
            <NavLink
              key={name}
              to={path}
              className={({ isActive }) =>
                `relative transition ${
                  isActive
                    ? 'text-green-700 font-semibold after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-green-600'
                    : 'hover:text-green-600'
                }`
              }
            >
              {name}
            </NavLink>
          ))}
        </nav>

        {/* Language Toggle */}
        <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
          <button className="hover:text-green-700">🇬🇧 EN</button> |{' '}
          <button className="hover:text-green-700">🇹🇿 SW</button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 text-xl focus:outline-none"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 bg-white shadow-lg">
          {navLinks.map(({ name, path }) => (
            <NavLink
              key={name}
              to={path}
              onClick={() => setMenuOpen(false)}
              className="block py-2 text-gray-700 hover:text-green-600 font-medium"
            >
              {name}
            </NavLink>
          ))}
          <div className="flex gap-4 mt-3 text-sm text-gray-600">
            <button className="hover:text-green-700">🇬🇧 EN</button>
            <button className="hover:text-green-700">🇹🇿 SW</button>
          </div>
        </div>
      )}
    </header>
  );
}
