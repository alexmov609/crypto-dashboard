import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Prices from "./pages/Prices";
// import Charts from "./pages/Charts";
// import Converter from "./pages/Converter";
// import Gainers from "./pages/Gainers";
// import Alerts from "./pages/Alerts";
// import Portfolio from "./pages/Portfolio";
import "./index.css";
import Chart from "./pages/Chart";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Chart />} />
        <Route path="/prices" element={<Prices />} />
        {/* <Route path="/prices" element={<Prices />} />
        <Route path="/converter" element={<Converter />} />
        <Route path="/gainers" element={<Gainers />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/portfolio" element={<Portfolio />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
