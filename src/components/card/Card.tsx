import type { LiveDataResponseObject } from "../../types/Prices.types";
import {
  beautifyNumber,
  beautifyNumberToPercent,
} from "../../utils/commonFunctions";

const Card = ({
  name,
  data,
  icon,
  binanceLiveData,
  binancePrevData,
}: {
  name: string;
  data: LiveDataResponseObject;
  icon?: string;
  binanceLiveData?: number;
  binancePrevData?: number;
}) => {
  const currentPrice = beautifyNumber(data.usd, "USD");
  const marketCap = beautifyNumber(data.usd_market_cap, "USD");
  const price24HChange = beautifyNumberToPercent(data.usd_24h_change / 100, 2);

  // Format Binance live data if available
  const displayPrice = binanceLiveData
    ? beautifyNumber(binanceLiveData, "USD")
    : currentPrice;

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700/50 shadow-lg py-4 sm:py-6 px-3 sm:px-5 hover:shadow-2xl hover:border-gray-600 hover:-translate-y-1 transition-all duration-300 ease-out">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full flex items-center justify-center font-bold text-blue-400 text-base sm:text-lg border border-blue-500/30 overflow-hidden">
            {icon ? (
              <img
                src={icon}
                alt={name}
                className="w-full h-full object-contain p-1.5"
              />
            ) : (
              name.charAt(0).toUpperCase()
            )}
          </div>
          <span className="font-semibold text-base sm:text-lg text-gray-100">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </span>
        </div>
        <h1
          className={`font-bold text-lg sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r ${
            binanceLiveData !== undefined && binancePrevData !== undefined
              ? binanceLiveData > binancePrevData
                ? "from-green-400 to-green-600"
                : "from-red-400 to-red-600"
              : "from-green-400 to-green-600"
          }`}
        >
          {displayPrice}
        </h1>
      </div>
      <div className="flex flex-row justify-between gap-3 sm:gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-xs text-gray-500 mb-1 uppercase tracking-wide">
            Marketcap
          </h3>
          <span className="font-semibold text-sm sm:text-base text-gray-200 break-words">{marketCap}</span>
        </div>
        <div className="flex-1 text-right min-w-0">
          <h3 className="font-medium text-xs text-gray-500 mb-1 uppercase tracking-wide">
            24H Change
          </h3>
          <span
            className={`font-semibold text-sm sm:text-base inline-flex items-center justify-end gap-1 ${
              data.usd_24h_change < 0 ? "text-red-400" : "text-green-400"
            }`}
          >
            <span className="text-base sm:text-lg">
              {data.usd_24h_change >= 0 ? "↗" : "↘"}
            </span>
            {price24HChange}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
