import { ChartComponent } from "../components/chart/Chart";
import { useEffect, useRef, useState } from "react";
import { fetchMultipleCoinsHistoricalData } from "../services/coinGecko";
import type { Data24H, ChartData } from "../components/chart/Chart.types";
import type { UTCTimestamp } from "lightweight-charts";

const coinList = [
  ["bitcoin", "BTC"],
  // ["ethereum", "ETH"],
  // ["cardano", "ADA"],
  // ["solana", "SOL"],
];
const Chart = () => {
  const tickerRef = useRef<HTMLDivElement>(null);
  const [data24H, setData24H] = useState<Data24H[] | null>(null);
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

  useEffect(() => {
    const getHistoryData = async () => {
      const numberOfDays = 1;

      fetchMultipleCoinsHistoricalData(coinList, numberOfDays)
        .then((dataArray) => {
          const newData = dataArray.map((data, index) => ({
            key: coinList[index][0],
            ...data,
          }));

          setData24H(newData);
        })
        .catch((error) => {
          console.error(
            "Error fetching multiple coins historical data:",
            error
          );
        });
    };

    getHistoryData();
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
        {data24H?.map((coinData, ind) => {
          // Transform CoinGecko data [timestamp, price] to {time, value} format
          const formattedData: ChartData[] = coinData.prices.map(([timestamp, price]) => ({
            time: Math.floor(timestamp / 1000) as UTCTimestamp, // Unix timestamp in seconds for intraday data
            value: price,
          }));
          const prices = coinData.prices;

          return (
            <ChartComponent
              key={coinData.key}
              data={formattedData}
              cryptoName={`${coinData.key
                .charAt(0)
                .toUpperCase()}${coinData.key.slice(1)}`}
              cryptoSymbol={coinList[ind][1]}
              currentPrice={prices[prices.length - 1][1]}
              priceChange24h={
                ((prices[prices.length - 1][1] - prices[0][1]) / prices[0][1]) *
                100
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default Chart;
