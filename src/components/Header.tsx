import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="min-h-15 bg-gradient-to-r from-black to-green-400 px-4 sm:px-6 py-4">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="text-xl sm:text-2xl font-bold text-white">CryptoDash</div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-6 text-white">
          <Link className="relative transition-all duration-300 hover:scale-110 hover:text-green-300 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-green-300 after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full" to="/">
            Prices
          </Link>
          <Link className="relative transition-all duration-300 hover:scale-110 hover:text-green-300 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-green-300 after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full" to="/charts">
            Charts
          </Link>
          <Link className="relative transition-all duration-300 hover:scale-110 hover:text-green-300 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-green-300 after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full" to="/converter">
            Converter
          </Link>
          <Link className="relative transition-all duration-300 hover:scale-110 hover:text-green-300 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-green-300 after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full" to="/gainers">
            Gainers/Losers
          </Link>
        </ul>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-gradient-to-r from-black to-green-400 md:hidden shadow-lg z-50">
            <ul className="flex flex-col text-white">
              <Link
                className="px-6 py-4 hover:bg-green-500/20 transition-colors border-b border-green-500/20"
                to="/"
                onClick={() => setIsMenuOpen(false)}
              >
                Prices
              </Link>
              <Link
                className="px-6 py-4 hover:bg-green-500/20 transition-colors border-b border-green-500/20"
                to="/charts"
                onClick={() => setIsMenuOpen(false)}
              >
                Charts
              </Link>
              <Link
                className="px-6 py-4 hover:bg-green-500/20 transition-colors border-b border-green-500/20"
                to="/converter"
                onClick={() => setIsMenuOpen(false)}
              >
                Converter
              </Link>
              <Link
                className="px-6 py-4 hover:bg-green-500/20 transition-colors"
                to="/gainers"
                onClick={() => setIsMenuOpen(false)}
              >
                Gainers/Losers
              </Link>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
