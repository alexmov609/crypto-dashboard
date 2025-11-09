import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <header className="min-h-15 bg-gradient-to-r from-black to-green-400 px-4 sm:px-6 py-4">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="text-xl sm:text-2xl font-bold text-white">
            CryptoDash
          </div>
          <div className="hidden lg:flex items-center gap-2 text-xs text-white/80">
            <span>© {currentYear} Alex Movchan</span>
            <span>•</span>
            <a
              href="https://github.com/alexmov609/crypto-dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-green-300 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
              GitHub
            </a>
          </div>
        </div>

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
          <Link
            className="relative transition-all duration-300 hover:scale-110 hover:text-green-300 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-green-300 after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full"
            to="/"
          >
            Prices
          </Link>
          <Link
            className="relative transition-all duration-300 hover:scale-110 hover:text-green-300 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-green-300 after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full"
            to="/charts"
          >
            Charts
          </Link>
          <Link
            className="relative transition-all duration-300 hover:scale-110 hover:text-green-300 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-green-300 after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full"
            to="/converter"
          >
            Converter
          </Link>
          <Link
            className="relative transition-all duration-300 hover:scale-110 hover:text-green-300 after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-green-300 after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full"
            to="/gainers"
          >
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
