import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="min-h-15 bg-gradient-to-r from-black to-green-400 px-6 py-4">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-white">CryptoDash</div>
        <ul className="flex gap-6 text-white">
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
            {" "}
            Gainers/Losers
          </Link>
          {/* 
          <Link to="/"> Gainers/Losers</Link>
          <Link to="/">Alerts</Link>
          <Link to="/">Portfolio</Link> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
