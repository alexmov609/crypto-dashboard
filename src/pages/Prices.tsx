import { useEffect, useRef, useState } from "react";
import Card from "../components/card/Card";
import { getLivePriceData } from "../services/coinGecko";

// Icon mapping for crypto coins
const coinIcons: { [key: string]: string } = {
  bitcoin: "/cryptoIcons/bitcoin.svg",
  ethereum: "/cryptoIcons/ethereum.svg",
  tether: "/cryptoIcons/tether.svg",
  binancecoin: "/cryptoIcons/binancecoin.svg",
  xrp: "/cryptoIcons/xrp.svg",
  solana: "/cryptoIcons/solana.svg",
  "usd-coin": "/cryptoIcons/usd-coin.svg",
  dogecoin: "/cryptoIcons/dogecoin.svg",
  tron: "/cryptoIcons/tron.svg",
  cardano: "/cryptoIcons/cardano.svg",
  hyperliquid: "/cryptoIcons/hyperliquid.svg",
  chainlink: "/cryptoIcons/chainlink.svg",
  "bitcoin-cash": "/cryptoIcons/bitcoin-cash.svg",
};

const coinPricesArray = [
  "bitcoin",
  "ethereum",
  "tether",
  "binancecoin",
  "xrp",
  "solana",
  "usd-coin",
  "dogecoin",
  "tron",
  "cardano",
  "hyperliquid",
  "chainlink",
  "bitcoin-cash",
];

export interface LiveDataResponseObject {
  usd: number;
  usd_market_cap: number;
  usd_24h_vol: number;
  usd_24h_change: number;
  last_updated_at: number;
}
export interface LiveDataResponse {
  [key: string]: LiveDataResponseObject;
}
const Prices = () => {
  const [liveData, setLiveData] = useState<LiveDataResponse | null>(null);

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

  useEffect(() => {
    const getLiveData = async () => {
      const response = await getLivePriceData(coinPricesArray);
      console.log("response data", response);

      setLiveData(response);
    };

    getLiveData();
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
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Prices;
