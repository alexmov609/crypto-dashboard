import { useEffect, useState } from "react";
import type { UTCTimestamp } from "lightweight-charts";
import type { ChartComponentProps, ChartData } from "../../types/Chart.types";
import useChart from "../../hooks/useChart";
import { getHistoricalData } from "../../services/coinGecko";
import { createBinanceWebSocket } from "../../services/binance";
import { compareColors } from "./chartConfigurations";

export const ChartComponent = ({
  coinId,
  cryptoName = "Bitcoin",
  cryptoSymbol = "BTC",
  coins,
}: ChartComponentProps) => {
  const [graphRange, setGraphRange] = useState<string>("1D");
  const [data, setData] = useState<ChartData[]>([]);
  const [multiSeriesData, setMultiSeriesData] = useState<Array<{
    data: ChartData[];
    label: string;
    color: string;
    topColor: string;
    currentPrice: number;
    priceChange: number;
    firstPrice: number;
    livePrice?: number;
  }>>([]);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [priceChange24h, setPriceChange24h] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [firstPrice, setFirstPrice] = useState<number>(0);
  const [livePrice, setLivePrice] = useState<number | null>(null);
  const [livePrices, setLivePrices] = useState<Map<string, number>>(new Map());
  
  const isCompareMode = coins && coins.length > 0;

  // Fetch data for single coin mode
  useEffect(() => {
    if (isCompareMode || !coinId) return;
    
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
        setFirstPrice(firstPrice);
      } catch (error) {
        console.error(`Error fetching data for ${coinId}:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [coinId, graphRange, isCompareMode]);

  // Fetch data for compare mode (multiple coins)
  useEffect(() => {
    if (!isCompareMode || !coins || coins.length === 0) return;

    const fetchAllData = async () => {
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

        const promises = coins.map((coin) =>
          getHistoricalData(coin.coinId, numberOfDays).then((rawData) => ({
            coin,
            rawData,
          }))
        );

        const results = await Promise.all(promises);

        const seriesData = results.map(({ coin, rawData }, index) => {
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

          // Normalize to percentage change for fair comparison
          const normalizedData: ChartData[] = formattedData.map((point) => ({
            time: point.time,
            value: ((point.value - firstPrice) / firstPrice) * 100,
          }));

          const color = compareColors[index % compareColors.length];
          const topColor = color + "40"; // Add transparency

          return {
            data: normalizedData,
            label: coin.cryptoSymbol.toUpperCase(),
            color,
            topColor,
            currentPrice: latestPrice,
            priceChange: change,
            firstPrice,
          };
        });

        setMultiSeriesData(seriesData);
      } catch (error) {
        console.error("Error fetching compare data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [coins, graphRange, isCompareMode]);

  // Update live prices for compare mode without refetching history
  useEffect(() => {
    if (!isCompareMode || multiSeriesData.length === 0) return;
    setMultiSeriesData((prev) =>
      prev.map((series) => {
        const lp = livePrices.get(series.label);
        const normalized = lp != null && series.firstPrice > 0
          ? ((lp - series.firstPrice) / series.firstPrice) * 100
          : undefined;
        return { ...series, livePrice: normalized };
      })
    );
  }, [livePrices, isCompareMode]);

  // Live price subscription via Binance WebSocket (single coin)
  useEffect(() => {
    if (isCompareMode || !cryptoSymbol) return;
    const symbol = `${cryptoSymbol.toLowerCase()}usdt`;
    const cleanup = createBinanceWebSocket([symbol], (prices) => {
      const p = prices.get(symbol);
      if (typeof p === "number") {
        setLivePrice(p);
      }
    });
    return () => {
      setLivePrice(null);
      cleanup?.();
    };
  }, [cryptoSymbol, isCompareMode]);

  // Live price subscription for compare mode (multiple coins)
  useEffect(() => {
    if (!isCompareMode || !coins || coins.length === 0) return;
    
    const symbols = coins.map((coin) => `${coin.cryptoSymbol.toLowerCase()}usdt`);
    const cleanup = createBinanceWebSocket(symbols, (prices) => {
      const newLivePrices = new Map<string, number>();
      coins.forEach((coin) => {
        const symbol = `${coin.cryptoSymbol.toLowerCase()}usdt`;
        const price = prices.get(symbol);
        if (typeof price === "number") {
          newLivePrices.set(coin.cryptoSymbol.toUpperCase(), price);
        }
      });
      setLivePrices(newLivePrices);
    });
    return () => {
      setLivePrices(new Map());
      cleanup?.();
    };
  }, [coins, isCompareMode]);

  const displayedPrice = livePrice ?? currentPrice;
  const displayedChange = firstPrice ? ((displayedPrice - firstPrice) / firstPrice) * 100 : priceChange24h;
  const isPositiveChange = displayedChange >= 0;
  
  const chartContainerRef = isCompareMode
    ? useChart(multiSeriesData, graphRange, setGraphRange)
    : useChart(data, graphRange, setGraphRange, livePrice ?? undefined);

  return (
    <div className="w-full h-auto min-h-[400px] sm:min-h-[500px] md:h-[70vh] my-0 bg-white border p-3 sm:p-4 border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out">
      {/* Crypto Info Header */}
      <div className="mb-3 sm:mb-4 text-left">
        {isCompareMode ? (
          <div className="space-y-2">
            <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2">
              Comparison
            </h3>
            <div className="flex flex-wrap gap-3">
              {isLoading ? (
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  Loading...
                </p>
              ) : (
                multiSeriesData.map((series) => (
                  <div
                    key={series.label}
                    className="flex items-center gap-2 px-3 py-1 bg-gray-700 dark:bg-gray-700 rounded-lg"
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: series.color }}
                    />
                    <span className="text-xs sm:text-sm font-semibold text-gray-100">
                      {series.label}
                    </span>
                    <span className="text-xs text-gray-400">
                      ${series.currentPrice.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                    <span
                      className={`text-xs font-semibold ${
                        series.priceChange >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {series.priceChange >= 0 ? "+" : ""}
                      {series.priceChange.toFixed(2)}%
                    </span>
                    {series.livePrice != null && (
                      <span className="text-[10px] text-amber-400">Live</span>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between mb-2 gap-2">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                {cryptoSymbol}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {cryptoName}
              </p>
            </div>
            <div className="text-right">
              {isLoading ? (
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  Loading...
                </p>
              ) : (
                <>
                  <p className="text-base sm:text-xl font-bold text-gray-900 dark:text-white">
                    $
                    {displayedPrice.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                  <p
                    className={`text-xs sm:text-sm font-semibold ${
                      isPositiveChange ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {isPositiveChange ? "+" : ""}
                    {displayedChange.toFixed(2)}%
                  </p>
                  {livePrice != null && (
                    <p className="text-[10px] sm:text-xs text-amber-400">Live</p>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Chart */}
      <div className={"block w-full min-h-[350px] sm:min-h-[450px] md:min-h-[60vh]"} ref={chartContainerRef} />
    </div>
  );
};
