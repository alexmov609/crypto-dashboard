import { ChartComponent } from "../components/chart/Chart";
import { useEffect, useRef, useState } from "react";
import { getCoinsList } from "../services/coinGecko";

type CoinTuple = [id: string, name: string, symbol: string, image: string];

const Chart = () => {
  const tickerRef = useRef<HTMLDivElement>(null);
  const [coins, setCoins] = useState<CoinTuple[]>([]);
  const [isLoadingCoins, setIsLoadingCoins] = useState<boolean>(true);
  const [selectedCoin, setSelectedCoin] = useState<string>("bitcoin");
  const [selectedCoins, setSelectedCoins] = useState<Set<string>>(new Set(["bitcoin"]));
  const [filterText, setFilterText] = useState<string>("");
  const [compareMode, setCompareMode] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;
    const loadCoins = async () => {
      try {
        setIsLoadingCoins(true);
        const list = await getCoinsList();
        if (isMounted && Array.isArray(list)) {
          setCoins(list as CoinTuple[]);
          // Determine initial selection from URL, localStorage, or fallback
          const params = new URLSearchParams(window.location.search);
          const urlCoin = params.get("coin") || undefined;
          const storedCoin = localStorage.getItem("selectedCoin") || undefined;
          const candidate = urlCoin || storedCoin || selectedCoin;
          const hasCandidate = (list as CoinTuple[]).some((c) => c[0] === candidate);
          const initial = hasCandidate
            ? candidate
            : (list as CoinTuple[]).find((c) => c[0] === "bitcoin")?.[0] || (list as CoinTuple[])[0]?.[0] || "bitcoin";
          setSelectedCoin(initial);
          // Sync URL without reloading
          const nextParams = new URLSearchParams(window.location.search);
          nextParams.set("coin", initial);
          window.history.replaceState({}, "", `${window.location.pathname}?${nextParams.toString()}`);
          localStorage.setItem("selectedCoin", initial);
          
          // Load saved compare coins
          const savedCoins = localStorage.getItem("selectedCoins");
          if (savedCoins) {
            try {
              const parsed = JSON.parse(savedCoins) as string[];
              const validCoins = parsed.filter((id) => 
                (list as CoinTuple[]).some((c) => c[0] === id)
              );
              if (validCoins.length > 0) {
                setSelectedCoins(new Set(validCoins));
              }
            } catch (e) {
              console.error("Failed to parse saved coins", e);
            }
          }
        }
      } catch (e) {
        console.error("Failed to load coins list", e);
      } finally {
        if (isMounted) setIsLoadingCoins(false);
      }
    };
    loadCoins();
    return () => {
      isMounted = false;
    };
  }, []);

  // Persist selection to URL and localStorage on change
  useEffect(() => {
    if (!selectedCoin) return;
    const params = new URLSearchParams(window.location.search);
    params.set("coin", selectedCoin);
    window.history.replaceState({}, "", `${window.location.pathname}?${params.toString()}`);
    localStorage.setItem("selectedCoin", selectedCoin);
  }, [selectedCoin]);

  // Persist compare mode selection
  useEffect(() => {
    const compareCoins = Array.from(selectedCoins);
    if (compareCoins.length > 0) {
      localStorage.setItem("selectedCoins", JSON.stringify(compareCoins));
    }
  }, [selectedCoins]);

  const toggleCoinSelection = (coinId: string) => {
    setSelectedCoins((prev) => {
      const next = new Set(prev);
      if (next.has(coinId)) {
        next.delete(coinId);
      } else {
        // Limit to maximum 2 coins to avoid API rate limiting
        if (next.size >= 2) {
          return next; // Don't add more than 2 coins
        }
        next.add(coinId);
      }
      return next;
    });
  };

  const selectedCoinsData = Array.from(selectedCoins)
    .map((id) => {
      const coin = coins.find((c) => c[0] === id);
      if (!coin) return null;
      return {
        coinId: coin[0],
        cryptoName: coin[1],
        cryptoSymbol: coin[2],
        image: coin[3],
      };
    })
    .filter((c): c is NonNullable<typeof c> => c !== null);

  const selectedTuple = coins.find((c) => c[0] === selectedCoin);
  const selectedName = selectedTuple ? selectedTuple[1] : "Bitcoin";
  const selectedSymbol = selectedTuple ? selectedTuple[2].toUpperCase() : "BTC";
  const selectedImage = selectedTuple ? selectedTuple[3] : undefined;

  const filteredCoins = filterText
    ? coins.filter(([id, name, symbol]) => {
        const q = filterText.toLowerCase();
        return (
          id.toLowerCase().includes(q) ||
          name.toLowerCase().includes(q) ||
          symbol.toLowerCase().includes(q)
        );
      })
    : coins;

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-3 sm:p-4 md:p-6 my-auto">
      {/* Page Header */}
      <div className="mb-4 sm:mb-6 md:mb-8">
        {/* TradingView Ticker */}
        <div
          className="tradingview-widget-container rounded-lg overflow-hidden"
          ref={tickerRef}
        ></div>
      </div>

      {/* Controls */}
      <div className="w-full mb-4 space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-3">
            {!compareMode && selectedImage && (
              <img src={selectedImage} alt={selectedName} className="w-6 h-6 rounded-full" />
            )}
            <label className="text-sm text-gray-300">
              {compareMode ? "Compare coins" : "Select coin"}
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={compareMode}
                onChange={(e) => {
                  setCompareMode(e.target.checked);
                  if (!e.target.checked && selectedCoins.size > 0) {
                    setSelectedCoin(Array.from(selectedCoins)[0]);
                  }
                }}
                className="w-4 h-4"
              />
              <span>Compare mode</span>
            </label>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search name/symbol..."
              className="bg-gray-800 border border-gray-700 text-gray-100 text-sm rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-60"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              disabled={isLoadingCoins}
            />
            {!compareMode && (
              <select
                id="coin-select"
                className="bg-gray-800 border border-gray-700 text-gray-100 text-sm rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-[220px]"
                value={selectedCoin}
                onChange={(e) => setSelectedCoin(e.target.value)}
                disabled={isLoadingCoins}
              >
                {isLoadingCoins && <option>Loading...</option>}
                {!isLoadingCoins && filteredCoins.map(([id, name, symbol]) => (
                  <option key={id} value={id}>{`${name} (${symbol.toUpperCase()})`}</option>
                ))}
              </select>
            )}
          </div>
        </div>
        {compareMode && (
          <div className="space-y-2">
            <div className="flex items-center justify-between px-2">
              <p className="text-xs text-gray-400">
                Select up to 2 coins to compare (selected: {selectedCoins.size}/2)
              </p>
              {selectedCoins.size >= 2 && (
                <p className="text-xs text-amber-400">
                  Maximum limit reached. Deselect a coin to choose another.
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 bg-gray-800 rounded-lg border border-gray-700">
              {filteredCoins.slice(0, 50).map(([id, name, symbol, image]) => {
                const isDisabled = !selectedCoins.has(id) && selectedCoins.size >= 2;
                return (
                  <label
                    key={id}
                    className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-colors ${
                      isDisabled
                        ? "bg-gray-800 opacity-50 cursor-not-allowed"
                        : "bg-gray-700 hover:bg-gray-600 cursor-pointer"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedCoins.has(id)}
                      onChange={() => toggleCoinSelection(id)}
                      disabled={isDisabled}
                      className="w-4 h-4"
                    />
                    {image && (
                      <img src={image} alt={name} className="w-4 h-4 rounded-full" />
                    )}
                    <span className="text-sm text-gray-100">
                      {symbol.toUpperCase()}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Chart */}
      <div className="w-full">
        {compareMode ? (
          selectedCoinsData.length === 0 ? (
            <div className="w-full min-h-[350px] sm:min-h-[450px] md:min-h-[60vh] flex items-center justify-center rounded-lg border border-gray-700 bg-gray-800/40 text-gray-300">
              <p className="text-sm">No coins selected. Use the checkboxes above to choose coins to compare.</p>
            </div>
          ) : (
            <ChartComponent
              key={`compare-${Array.from(selectedCoins).sort().join("-")}`}
              coins={selectedCoinsData}
            />
          )
        ) : (
          <ChartComponent
            key={selectedCoin}
            coinId={selectedCoin}
            cryptoName={selectedName}
            cryptoSymbol={selectedSymbol}
          />
        )}
      </div>
    </div>
  );
};

export default Chart;
