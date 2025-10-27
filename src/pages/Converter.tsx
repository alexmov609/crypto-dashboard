const Converter = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
        <div className="text-3xl md:text-4xl tracking-wide font-bold mb-8 text-center">
          Currency Converter
        </div>

        {/* Main Conversion Card */}
        <div className="relative w-full p-6 md:p-8 rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-green-500/30 shadow-[0_0_40px_rgba(74,222,128,0.15),0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl hover:border-green-500/50 hover:shadow-[0_0_60px_rgba(74,222,128,0.25),0_25px_60px_rgba(0,0,0,0.6)] transition-all duration-500 ease-in-out before:absolute before:inset-0 before:rounded-2xl before:p-[1px] before:bg-gradient-to-br before:from-green-500/20 before:via-transparent before:to-green-500/20 before:-z-10 before:opacity-0 before:hover:opacity-100 before:transition-opacity before:duration-500">
          {/* From Section */}
          <div className="mb-6">
            <div className="relative flex flex-col text-start bg-gradient-to-br from-gray-900 to-black rounded-xl p-5 shadow-lg border border-green-500/20 hover:border-green-500/40 transition-all duration-300">
              <label
                htmlFor="exchange-coin1"
                className="text-sm font-semibold text-gray-400 mb-3 transition-all duration-200 ease-in-out"
              >
                From
              </label>

              <div className="flex flex-col sm:flex-row gap-3 items-end">
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
                    placeholder="0.00"
                    className="h-12 w-full rounded-lg bg-black/50 backdrop-blur-sm px-4 border border-green-400/50 font-medium outline-none transition-all duration-300 ease-in-out hover:border-green-400 hover:shadow-[0_0_15px_rgba(74,222,128,0.3)] focus:border-green-500 focus:ring-2 focus:ring-green-500/50 focus:shadow-[0_0_20px_rgba(74,222,128,0.4)]"
                  />
                </div>

                {/* Quick Amount Buttons */}
                <div className="flex flex-row gap-2">
                  <button className="w-[45px] h-[45px] text-lg text-center font-bold bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 rounded-lg cursor-pointer text-gray-900 shadow-lg hover:shadow-[0_0_20px_rgba(74,222,128,0.4)] transition-all duration-300">
                    -
                  </button>
                  <button className="w-[45px] h-[45px] text-lg text-center font-bold bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 rounded-lg cursor-pointer text-gray-900 shadow-lg hover:shadow-[0_0_20px_rgba(74,222,128,0.4)] transition-all duration-300">
                    +
                  </button>
                </div>
              </div>

              {/* Coin Select */}
              <div className="mt-4">
                <label
                  htmlFor="from-coin"
                  className="block pb-2 text-xs font-medium text-gray-500"
                >
                  Cryptocurrency
                </label>
                <select
                  name="from-coin"
                  id="from-coin"
                  className="w-full px-4 py-3 bg-black/50 backdrop-blur-sm border border-green-400/50 rounded-lg text-white font-medium cursor-pointer outline-none transition-all duration-300 ease-in-out hover:border-green-400 hover:shadow-[0_0_15px_rgba(74,222,128,0.3)] focus:border-green-500 focus:ring-2 focus:ring-green-500/50 focus:shadow-[0_0_20px_rgba(74,222,128,0.4)] appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27rgb(74,222,128)%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.5em] bg-[right_0.5rem_center] bg-no-repeat pr-12"
                >
                  <option value="btc" className="bg-gray-900">
                    Bitcoin (BTC)
                  </option>
                  <option value="eth" className="bg-gray-900">
                    Ethereum (ETH)
                  </option>
                  <option value="usdt" className="bg-gray-900">
                    Tether (USDT)
                  </option>
                  <option value="bnb" className="bg-gray-900">
                    BNB (BNB)
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Exchange Icon */}
          <div className="flex justify-center -my-3 relative z-10">
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
          <div className="mt-6">
            <div className="relative flex flex-col text-start bg-gradient-to-br from-gray-900 to-black rounded-xl p-5 shadow-lg border border-green-500/20 hover:border-green-500/40 transition-all duration-300">
              <label
                htmlFor="exchange-coin2"
                className="text-sm font-semibold text-gray-400 mb-3 transition-all duration-200 ease-in-out"
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
                <select
                  name="to-coin"
                  id="to-coin"
                  className="w-full px-4 py-3 bg-black/50 backdrop-blur-sm border border-green-400/50 rounded-lg text-white font-medium cursor-pointer outline-none transition-all duration-300 ease-in-out hover:border-green-400 hover:shadow-[0_0_15px_rgba(74,222,128,0.3)] focus:border-green-500 focus:ring-2 focus:ring-green-500/50 focus:shadow-[0_0_20px_rgba(74,222,128,0.4)] appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27rgb(74,222,128)%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.5em] bg-[right_0.5rem_center] bg-no-repeat pr-12"
                >
                  <option value="eth" className="bg-gray-900">
                    Ethereum (ETH)
                  </option>
                  <option value="btc" className="bg-gray-900">
                    Bitcoin (BTC)
                  </option>
                  <option value="usdt" className="bg-gray-900">
                    Tether (USDT)
                  </option>
                  <option value="bnb" className="bg-gray-900">
                    BNB (BNB)
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* Result Section */}
          <div className="mt-8 pt-6 border-t border-green-500/20">
            <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 rounded-xl p-5 border border-green-500/30">
              <div className="text-sm font-semibold text-gray-400 mb-2">
                Conversion Result
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl md:text-4xl font-bold text-green-400">
                  0.00
                </span>
                <span className="text-lg text-gray-400">ETH</span>
              </div>
              <div className="text-xs text-gray-500 mt-2">1 BTC = 0.00 ETH</div>
            </div>
          </div>

          {/* Convert Button */}
          <button className="w-full mt-6 px-6 py-4 bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 rounded-xl cursor-pointer text-gray-900 font-bold text-lg shadow-lg hover:shadow-[0_0_30px_rgba(74,222,128,0.5)] transition-all duration-300 transform hover:scale-[1.02]">
            Convert
          </button>
        </div>
      </div>
    </div>
  );
};

export default Converter;
