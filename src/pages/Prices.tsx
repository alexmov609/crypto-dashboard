import { useState } from "react";
import Card from "../components/card/Card";
import type {
  LiveDataResponse,
  LiveDataResponseObject,
} from "../types/Prices.types";
import { binanceSymbols, coinIcons, coinPricesArray } from "../data/pricesData";
import { usePrices } from "../hooks/usePrices";

const Prices = () => {
  const [liveData, setLiveData] = useState<LiveDataResponse | null>(null);
  const [prevPrices, setPrevPrices] = useState<{
    [k: string]: number;
  } | null>(null);
  const [livePrices, setLivePrices] = useState<{ [k: string]: number } | null>(
    null
  );

  const tickerRef = usePrices(setLiveData, setPrevPrices, setLivePrices);
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
