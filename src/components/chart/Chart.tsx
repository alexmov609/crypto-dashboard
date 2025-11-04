import { useEffect, useState } from "react";
import type { UTCTimestamp } from "lightweight-charts";
import type { ChartComponentProps, ChartData } from "../../types/Chart.types";
import useChart from "../../hooks/useChart";
import { getHistoricalData } from "../../services/coinGecko";

export const ChartComponent = ({
  coinId,
  cryptoName = "Bitcoin",
  cryptoSymbol = "BTC",
}: ChartComponentProps) => {
  const [graphRange, setGraphRange] = useState<string>("1D");
  const [data, setData] = useState<ChartData[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [priceChange24h, setPriceChange24h] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //in case range changed,will trigger to fetach new data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const numberOfDays =
          graphRange === "1D"
            ? 7
            : graphRange === "1W"
            ? 35
            : graphRange === "1M"
            ? 90
            : graphRange === "1Y"
            ? 365
            : 1;

        const rawData = await getHistoricalData(coinId, numberOfDays);

        // Transform CoinGecko data [timestamp, price] to {time, value} format
        const formattedData: ChartData[] = rawData.prices.map(
          ([timestamp, price]: [number, number]) => ({
            time: Math.floor(timestamp / 1000) as UTCTimestamp,
            value: price,
          })
        );

        const prices = rawData.prices;
        const latestPrice = prices[prices.length - 1][1];
        const firstPrice = prices[0][1];
        const change = ((latestPrice - firstPrice) / firstPrice) * 100;

        setData(formattedData);
        setCurrentPrice(latestPrice);
        setPriceChange24h(change);
      } catch (error) {
        console.error(`Error fetching data for ${coinId}:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [coinId, graphRange]);

  const isPositiveChange = priceChange24h >= 0;
  const chartContainerRef = useChart(data, graphRange, setGraphRange);

  return (
    <div className="w-full h-full min-h-[200px] p-4 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out">
      {/* Crypto Info Header */}
      <div className="mb-4 text-left">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {cryptoSymbol}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {cryptoName}
            </p>
          </div>
          <div className="text-right">
            {isLoading ? (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Loading...
              </p>
            ) : (
              <>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  $
                  {currentPrice.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p
                  className={`text-sm font-semibold ${
                    isPositiveChange ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {isPositiveChange ? "+" : ""}
                  {priceChange24h.toFixed(2)}%
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className={"block"} ref={chartContainerRef} />
    </div>
  );
};
