import { useEffect, useRef, useState } from "react";
import Card from "../components/card/Card";
import { getLivePriceData } from "../services/coinGecko";
import type {
  LiveDataResponse,
  LiveDataResponseObject,
} from "../types/Prices.types";
import { binanceSymbols, coinIcons, coinPricesArray } from "../data/pricesData";

const Prices = () => {
  const [liveData, setLiveData] = useState<LiveDataResponse | null>(null);
  const [prevPrices, setPrevPrices] = useState<{
    [k: string]: number;
  } | null>();
  const [livePrices, setLivePrices] = useState<{ [k: string]: number } | null>(
    null
  );

  const tickerRef = useRef<HTMLDivElement>(null);

  /**
   * Trading view widget
   */
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

  /**
   * Fetch live price data on component mount
   */
  useEffect(() => {
    const getLiveData = async () => {
      const response = await getLivePriceData(coinPricesArray);
      setLiveData(response);
    };

    getLiveData();
  }, []);

  useEffect(() => {
    // Combined streams for multiple symbols
    const streams = binanceSymbols.map((s) => `${s}@trade`).join("/");
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/stream?streams=${streams}`
    );
    ws.onopen = () => {
      console.log("Connected to Binance WebSocket");
    };

    const lastPricesData = new Map<string, number>();
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const coinData = message.data;
      // Store with lowercase symbol to match binanceSymbols array
      const symbol = coinData.s.toLowerCase(); // "BTCUSDT" -> "btcusdt"
      const price = parseFloat(coinData.p); // Convert string to number
      lastPricesData.set(symbol, price);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket");
    };

    const intervalId = setInterval(() => {
      if (lastPricesData.size > 0) {
        const pricesObject = Object.fromEntries(lastPricesData);

        // Use functional update to get current state value
        setLivePrices((currentLivePrices) => {
          // Save current live prices as previous before updating
          setPrevPrices(currentLivePrices);
          // Return new prices
          return pricesObject;
        });
      }
    }, 1000);

    // Cleanup: close connection when component unmounts
    return () => {
      ws.close();
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="min-h-[calc(100vh-64px)] text-white overflow-y-auto overflow-x-hidden bg-black">
      {/* TradingView Ticker */}
      <div className="w-full px-3 md:px-5 pt-4 md:pt-6 pb-4">
        <div
          className="tradingview-widget-container rounded-lg overflow-hidden"
          ref={tickerRef}
        ></div>
      </div>

      {/* Cards Grid */}
      <div className="w-full px-3 md:px-5 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {liveData &&
            coinPricesArray.map((el, ind) => {
              const coinData: LiveDataResponseObject = liveData[el];
              if (!coinData) {
                return "";
              }

              return (
                <Card
                  key={ind}
                  name={el}
                  data={coinData}
                  icon={coinIcons[el]}
                  binanceLiveData={livePrices?.[binanceSymbols[ind]]}
                  binancePrevData={prevPrices?.[binanceSymbols[ind]]}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Prices;
