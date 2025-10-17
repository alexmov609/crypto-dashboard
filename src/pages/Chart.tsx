import { ChartComponent } from "../components/chart/Chart";
import { useEffect, useRef } from "react";

const coinList = [
  ["bitcoin", "BTC"],
  ["ethereum", "ETH"],
  // ["cardano", "ADA"],
  // ["solana", "SOL"],
];
const Chart = () => {
  const tickerRef = useRef<HTMLDivElement>(null);

  //Trading view widget
  useEffect(() => {
    if (!tickerRef.current) return;

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
        { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
        { proName: "BINANCE:ADAUSD", title: "Cardano" },
        { proName: "BINANCE:SOLUSD", title: "Solana" },
        { proName: "BINANCE:DOTUSD", title: "Polkadot" },
        { proName: "BITSTAMP:XRPUSD", title: "Ripple" },
      ],
      showSymbolLogo: true,
      colorTheme: "dark",
      isTransparent: true,
      displayMode: "adaptive",
      locale: "en",
    });

    tickerRef.current.appendChild(script);
  }, []);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-6 my-auto">
      {/* Page Header */}
      <div className="mb-8">
        {/* TradingView Ticker */}
        <div
          className="tradingview-widget-container rounded-lg overflow-hidden"
          ref={tickerRef}
        ></div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        {coinList.map(([coinId, coinSymbol]) => (
          <ChartComponent
            key={coinId}
            coinId={coinId}
            cryptoName={`${coinId.charAt(0).toUpperCase()}${coinId.slice(1)}`}
            cryptoSymbol={coinSymbol}
          />
        ))}
      </div>
    </div>
  );
};

export default Chart;
