import type { LiveDataResponseObject } from "../../pages/Prices";
import {
  beautifyNumber,
  beautifyNumberToPercent,
} from "../../utils/commonFunctions";

const Card = ({
  name,
  data,
  icon,
}: {
  name: string;
  data: LiveDataResponseObject;
  icon?: string;
}) => {
  const currentPrice = beautifyNumber(data.usd, "USD");
  const marketCap = beautifyNumber(data.usd_market_cap, "USD");
  const price24HChange = beautifyNumberToPercent(data.usd_24h_change / 100, 2);

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700/50 shadow-lg py-6 px-5 hover:shadow-2xl hover:border-gray-600 hover:-translate-y-1 transition-all duration-300 ease-out">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full flex items-center justify-center font-bold text-blue-400 text-lg border border-blue-500/30 overflow-hidden">
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
          <span className="font-semibold text-lg text-gray-100">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </span>
        </div>
        <h1 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
          {currentPrice}
        </h1>
      </div>
      <div className="flex flex-row justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-medium text-xs text-gray-500 mb-1 uppercase tracking-wide">
            Marketcap
          </h3>
          <span className="font-semibold text-gray-200">{marketCap}</span>
        </div>
        <div className="flex-1 text-right">
          <h3 className="font-medium text-xs text-gray-500 mb-1 uppercase tracking-wide">
            24H Change
          </h3>
          <span
            className={`font-semibold inline-flex items-center gap-1 ${
              data.usd_24h_change < 0 ? "text-red-400" : "text-green-400"
            }`}
          >
            <span className="text-lg">
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
