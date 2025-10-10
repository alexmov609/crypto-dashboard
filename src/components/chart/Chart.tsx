import type { ChartComponentProps } from "./Chart.types";
import useChart from "../../hooks/useChart";

export const ChartComponent = ({
  data,
  cryptoName = "Bitcoin",
  cryptoSymbol = "BTC",
  currentPrice = 0,
  priceChange24h = 0,
}: ChartComponentProps) => {
  const isPositiveChange = priceChange24h >= 0;
  //Chart conteiner ref
  const chartContainerRef = useChart(data);
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
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className={"block"} ref={chartContainerRef} />
    </div>
  );
};
