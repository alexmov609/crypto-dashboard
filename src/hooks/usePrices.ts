import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";
import { binanceSymbols, coinPricesArray } from "../data/pricesData";
import { getLivePriceData } from "../services/coinGecko";
import type { LiveDataResponse } from "../types/Prices.types";
import { createBinanceWebSocket } from "../services/binance";

export const usePrices = (
    setLiveData: Dispatch<SetStateAction<LiveDataResponse | null>>,
    setPrevPrices: Dispatch<SetStateAction<{ [k: string]: number } | null>>,
    setLivePrices: Dispatch<SetStateAction<{ [k: string]: number } | null>>) => {

    const tickerRef = useRef<HTMLDivElement>(null);

    /**
     * Trading view widget
     */
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

    /**
     * Fetch live price data on component mount
     */
    useEffect(() => {
        const getLiveData = async () => {
            const response = await getLivePriceData(coinPricesArray);
            setLiveData(response);
        };

        getLiveData();
    }, []);

    /**
     * WebSocket connection to Binance for live price updates
     */
    useEffect(() => {
        const cleanup = createBinanceWebSocket(
            binanceSymbols,
            (pricesMap) => {
                // Convert Map to plain object
                const pricesObject = Object.fromEntries(pricesMap);

                // Use functional update to get current state value
                setLivePrices((currentLivePrices) => {
                    // Save current live prices as previous before updating
                    setPrevPrices(currentLivePrices);
                    // Return new prices
                    return pricesObject;
                });
            }
        );

        // Cleanup: close connection when component unmounts
        return cleanup;
    }, []);


    return tickerRef;
}