import { ChartComponent } from "../components/chart/Chart";
import { useEffect, useRef } from "react";
import { chartData } from "../components/chart/chartData";

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
        <ChartComponent
          data={chartData["1D"]}
          cryptoName="Bitcoin"
          cryptoSymbol="BTC"
          currentPrice={45230.5}
          priceChange24h={2.45}
        />
        <ChartComponent
          data={chartData["1D"]}
          cryptoName="Ethereum"
          cryptoSymbol="ETH"
          currentPrice={3120.75}
          priceChange24h={-1.23}
        />
        <ChartComponent
          data={chartData["1D"]}
          cryptoName="Cardano"
          cryptoSymbol="ADA"
          currentPrice={0.58}
          priceChange24h={5.67}
        />
        <ChartComponent
          data={chartData["1D"]}
          cryptoName="Solana"
          cryptoSymbol="SOL"
          currentPrice={98.42}
          priceChange24h={-3.12}
        />
        <ChartComponent
          data={chartData["1D"]}
          cryptoName="Polkadot"
          cryptoSymbol="DOT"
          currentPrice={7.23}
          priceChange24h={1.89}
        />
        <ChartComponent
          data={chartData["1D"]}
          cryptoName="Ripple"
          cryptoSymbol="XRP"
          currentPrice={0.52}
          priceChange24h={4.32}
        />
      </div>
    </div>
  );
};

export default Chart;
