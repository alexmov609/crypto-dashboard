import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";
import { binanceSymbols, coinPricesArray } from "../data/pricesData";
import { getLivePriceData } from "../services/coinGecko";
import type { LiveDataResponse } from "../types/Prices.types";

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
        // Combined streams for multiple symbols
        const streams = binanceSymbols.map((s) => `${s}@trade`).join("/");
        const ws = new WebSocket(
            `wss://stream.binance.com:9443/stream?streams=${streams}`
        );
        ws.onopen = () => {
            console.log("Connected to Binance WebSocket");
        };

        const lastPricesData = new Map<string, number>();
        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            const coinData = message.data;
            // Store with lowercase symbol to match binanceSymbols array
            const symbol = coinData.s.toLowerCase(); // "BTCUSDT" -> "btcusdt"
            const price = parseFloat(coinData.p); // Convert string to number
            lastPricesData.set(symbol, price);
        };

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        ws.onclose = () => {
            console.log("Disconnected from WebSocket");
        };

        // Update live prices state every time interval
        const intervalId = setInterval(() => {
            if (lastPricesData.size > 0) {
                const pricesObject = Object.fromEntries(lastPricesData);

                // Use functional update to get current state value
                setLivePrices((currentLivePrices) => {
                    // Save current live prices as previous before updating
                    setPrevPrices(currentLivePrices);
                    // Return new prices
                    return pricesObject;
                });
            }
        }, 1000);

        // Cleanup: close connection when component unmounts
        return () => {
            ws.close();
            clearInterval(intervalId);
        };
    }, []);


    return tickerRef;
}