import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="min-h-15 bg-gradient-to-r from-black to-green-400 px-6 py-4">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-white">CryptoDash</div>
        <ul className="flex gap-6 text-white">
          <Link to="/">Prices</Link>
          <Link to="/charts">Charts</Link>
          {/* <Link to="/">Converter</Link>
          <Link to="/"> Gainers/Losers</Link>
          <Link to="/">Alerts</Link>
          <Link to="/">Portfolio</Link> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
