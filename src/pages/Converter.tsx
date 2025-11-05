import { useState } from "react";
import { useConverter } from "../hooks/useConverter";
import type { SellBuyCoin } from "../types/Converter.types";

const Converter = () => {
  const [convertAmount, setConvertAmount] = useState<string>("");
  const [convertAmountError, setConvertAmountError] = useState<boolean>(false);
  const [coinList, setCoinList] = useState<string[][] | null>(null);
  const [coinToSell, setCoinToSell] = useState<SellBuyCoin | null>(null);
  const [coinToSellError, setCoinToSellError] = useState<boolean>(false);
  const [coinToBuy, setCoinToBuy] = useState<SellBuyCoin | null>(null);
  const [coinToBuyError, setCoinToBuyError] = useState<boolean>(false);
  const [convertionResult, setConvertionResult] = useState<number | null>(null);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [apiGetPriceError, setApiGetPriceError] = useState(false);

  const useConverterData = useConverter({
    setConvertAmount,
    setConvertAmountError,
    setCoinList,
    setConvertionResult,
    setShowFromDropdown,
    setShowToDropdown,
    coinToBuy,
    coinToSell,
    convertAmount,
    setCoinToBuy,
    setCoinToSell,
    setCoinToSellError,
    setCoinToBuyError,
    setApiGetPriceError,
  });
  const {
    fromDropdownRef,
    toDropdownRef,
    handleChange,
    handleChangeCoins,
    handleConvert,
    addConvertAmount,
    subConvertAmount,
  } = useConverterData;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-auto flex items-center justify-center p-3 sm:p-4 md:p-6">
      <div className="w-full max-w-2xl">
        <div className="text-2xl sm:text-3xl md:text-4xl tracking-wide font-bold mb-6 sm:mb-8 text-center">
          Currency Converter
        </div>

        {/* Main Conversion Card */}
        <div className="relative w-full p-4 sm:p-6 md:p-8 rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-green-500/30 shadow-[0_0_40px_rgba(74,222,128,0.15),0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl hover:border-green-500/50 hover:shadow-[0_0_60px_rgba(74,222,128,0.25),0_25px_60px_rgba(0,0,0,0.6)] transition-all duration-500 ease-in-out before:absolute before:inset-0 before:rounded-2xl before:p-[1px] before:bg-gradient-to-br before:from-green-500/20 before:via-transparent before:to-green-500/20 before:-z-10 before:opacity-0 before:hover:opacity-100 before:transition-opacity before:duration-500">
          {/* From Section */}
          <div className="mb-4 sm:mb-6">
            <div className="relative flex flex-col text-start bg-gradient-to-br from-gray-900 to-black rounded-xl p-3 sm:p-5 shadow-lg border border-green-500/20 hover:border-green-500/40 transition-all duration-300">
              <label
                htmlFor="exchange-coin1"
                className="text-xs sm:text-sm font-semibold text-gray-400 mb-2 sm:mb-3 transition-all duration-200 ease-in-out"
              >
                From
              </label>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-end">
                {/* Amount Input */}
                <div className="flex-1 w-full">
                  <label
                    htmlFor="amount"
                    className="block pb-2 text-xs font-medium text-gray-500"
                  >
                    Amount
                  </label>
                  <input
                    id="amount"
                    type="text"
                    value={convertAmount}
                    onChange={(e) => handleChange(e)}
                    placeholder="0.00"
                    className="h-12 w-full rounded-lg bg-black/50 backdrop-blur-sm px-4 border border-green-400/50 font-medium outline-none transition-all duration-300 ease-in-out hover:border-green-400 hover:shadow-[0_0_15px_rgba(74,222,128,0.3)] focus:border-green-500 focus:ring-2 focus:ring-green-500/50 focus:shadow-[0_0_20px_rgba(74,222,128,0.4)]"
                  />
                </div>
                {/* Quick Amount Buttons */}
                <div className="flex flex-row gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => subConvertAmount(convertAmount)}
                    className="flex-1 sm:flex-none w-auto sm:w-[45px] h-[45px] text-lg text-center font-bold bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 rounded-lg cursor-pointer text-gray-900 shadow-lg hover:shadow-[0_0_20px_rgba(74,222,128,0.4)] transition-all duration-300"
                  >
                    -
                  </button>
                  <button
                    onClick={() => addConvertAmount(convertAmount)}
                    className="flex-1 sm:flex-none w-auto sm:w-[45px] h-[45px] text-lg text-center font-bold bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 rounded-lg cursor-pointer text-gray-900 shadow-lg hover:shadow-[0_0_20px_rgba(74,222,128,0.4)] transition-all duration-300"
                  >
                    +
                  </button>
                </div>
              </div>
              {convertAmountError ? (
                <div className="text-red-500 text-xs sm:text-sm mt-2 ms-2">
                  Amount is required *
                </div>
              ) : (
                ""
              )}
              {/* Coin Select */}
              <div className="mt-4">
                <label
                  htmlFor="from-coin"
                  className="block pb-2 text-xs font-medium text-gray-500"
                >
                  Cryptocurrency
                </label>
                <div className="relative" ref={fromDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setShowFromDropdown(!showFromDropdown)}
                    className="w-full px-4 py-3 bg-black/50 backdrop-blur-sm border border-green-400/50 rounded-lg text-white font-medium cursor-pointer outline-none transition-all duration-300 ease-in-out hover:border-green-400 hover:shadow-[0_0_15px_rgba(74,222,128,0.3)] focus:border-green-500 focus:ring-2 focus:ring-green-500/50 focus:shadow-[0_0_20px_rgba(74,222,128,0.4)] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      {coinToSell && coinList ? (
                        <>
                          <img
                            src={
                              coinList.find(
                                (c) => c[0] === coinToSell.name
                              )?.[3]
                            }
                            className="w-6 h-6 rounded-full"
                            alt={coinToSell.name}
                          />
                          <span>
                            {coinToSell.name.charAt(0).toUpperCase() +
                              coinToSell.name.slice(1)}
                          </span>
                        </>
                      ) : (
                        <span className="text-gray-400">Select a coin</span>
                      )}
                    </div>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {showFromDropdown && coinList && (
                    <div className="absolute z-50 w-full mt-2 bg-gray-900 border border-green-400/50 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {coinList.map((coin: string[], ind: number) => (
                        <button
                          key={ind + "_sell"}
                          type="button"
                          onClick={() => {
                            setCoinToSell({ name: coin[0], coin: coin[2] });
                            setShowFromDropdown(false);
                          }}
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-green-500/20 transition-colors text-left"
                        >
                          <img
                            src={coin[3]}
                            className="w-6 h-6 rounded-full"
                            alt={coin[0]}
                          />
                          <span className="text-white font-medium">
                            {coin[0].charAt(0).toUpperCase() + coin[0].slice(1)}{" "}
                            ({coin[2]})
                          </span>
                          <span className="text-gray-400 text-sm ml-auto">
                            {coin[1].toUpperCase()}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                  {coinToSellError ? (
                    <div className="text-red-500 mt-2 ms-2">
                      Please provide correct Coin to Sell *
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Exchange Icon */}
          <div
            onClick={handleChangeCoins}
            className="flex justify-center -my-3 relative z-10 cursor-pointer"
          >
            <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-full p-3 shadow-lg shadow-green-500/50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-900"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                />
              </svg>
            </div>
          </div>

          {/* To Section */}
          <div className="mt-4 sm:mt-6">
            <div className="relative flex flex-col text-start bg-gradient-to-br from-gray-900 to-black rounded-xl p-3 sm:p-5 shadow-lg border border-green-500/20 hover:border-green-500/40 transition-all duration-300">
              <label
                htmlFor="exchange-coin2"
                className="text-xs sm:text-sm font-semibold text-gray-400 mb-2 sm:mb-3 transition-all duration-200 ease-in-out"
              >
                To
              </label>

              {/* Coin Select */}
              <div>
                <label
                  htmlFor="to-coin"
                  className="block pb-2 text-xs font-medium text-gray-500"
                >
                  Cryptocurrency
                </label>
                <div className="relative" ref={toDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setShowToDropdown(!showToDropdown)}
                    className="w-full px-4 py-3 bg-black/50 backdrop-blur-sm border border-green-400/50 rounded-lg text-white font-medium cursor-pointer outline-none transition-all duration-300 ease-in-out hover:border-green-400 hover:shadow-[0_0_15px_rgba(74,222,128,0.3)] focus:border-green-500 focus:ring-2 focus:ring-green-500/50 focus:shadow-[0_0_20px_rgba(74,222,128,0.4)] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      {coinToBuy && coinList ? (
                        <>
                          <img
                            src={
                              coinList.find((c) => c[0] === coinToBuy.name)?.[3]
                            }
                            className="w-6 h-6 rounded-full"
                            alt={coinToBuy.name}
                          />
                          <span>
                            {coinToBuy.name.charAt(0).toUpperCase() +
                              coinToBuy.name.slice(1)}
                          </span>
                        </>
                      ) : (
                        <span className="text-gray-400">Select a coin</span>
                      )}
                    </div>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {showToDropdown && coinList && (
                    <div className="absolute z-50 w-full mt-2 bg-gray-900 border border-green-400/50 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                      {coinList.map((coin: string[], ind: number) => (
                        <button
                          key={ind + "_buy"}
                          type="button"
                          onClick={() => {
                            setCoinToBuy({ name: coin[0], coin: coin[2] });
                            setShowToDropdown(false);
                          }}
                          className="w-full px-4 py-3 flex items-center gap-3 hover:bg-green-500/20 transition-colors text-left"
                        >
                          <img
                            src={coin[3]}
                            className="w-6 h-6 rounded-full"
                            alt={coin[0]}
                          />
                          <span className="text-white font-medium">
                            {coin[0].charAt(0).toUpperCase() + coin[0].slice(1)}{" "}
                            ({coin[2]})
                          </span>
                          <span className="text-gray-400 text-sm ml-auto">
                            {coin[1].toUpperCase()}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                  {coinToBuyError ? (
                    <div className="text-red-500 mt-2 ms-2">
                      Please provide correct Coin to Buy *
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Result Section */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-green-500/20">
            <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 rounded-xl p-3 sm:p-5 border border-green-500/30">
              <div className="text-xs sm:text-sm font-semibold text-gray-400 mb-2">
                Conversion Result
              </div>
              {apiGetPriceError ? (
                <div className="text-red-500 text-xs sm:text-sm mt-2 ms-2">
                  Error to fetch Coins Prices, please try again later *
                </div>
              ) : (
                <div>
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-400 break-all">
                      {convertionResult && convertionResult.toFixed(6)}
                      0.00
                    </span>
                    <span className="text-base sm:text-lg text-gray-400">ETH</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-2 break-words">
                    {convertionResult
                      ? `1 ${coinToSell!.coin.toUpperCase()} = ${
                          convertionResult / parseFloat(convertAmount)
                        } ${coinToBuy!.coin.toUpperCase()}`
                      : ""}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Convert Button */}
          <button
            className="w-full mt-4 sm:mt-6 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 rounded-xl cursor-pointer text-gray-900 font-bold text-base sm:text-lg shadow-lg hover:shadow-[0_0_30px_rgba(74,222,128,0.5)] transition-all duration-300 transform hover:scale-[1.02]"
            onClick={handleConvert}
          >
            Convert
          </button>
        </div>
      </div>
    </div>
  );
};

export default Converter;
