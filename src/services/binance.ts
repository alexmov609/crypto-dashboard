import type { TickerResponse } from "../types/Ticker.types";

const binanceTopGainersLosers = import.meta.env.VITE_BINANCE_API_TOP_GAINERS_AND_LOSERS

/**
 * Creates a WebSocket connection to Binance for real-time price updates
 * @param symbols - Array of trading pair symbols (e.g., ["btcusdt", "ethusdt"])
 * @param onPriceUpdate - Callback function called every second with updated prices
 * @returns Cleanup function to close the WebSocket and clear the interval
 */
export function createBinanceWebSocket(
    symbols: string[],
    onPriceUpdate: (prices: Map<string, number>) => void
) {
    // Create the combined streams URL: "btcusdt@trade/ethusdt@trade"
    const streams = symbols.map((s) => `${s}@trade`).join("/");

    const ws = new WebSocket(
        `wss://stream.binance.com:9443/stream?streams=${streams}`
    );

    ws.onopen = () => {
        console.log("Connected to Binance WebSocket");
    };

    // Map to store the latest price for each symbol
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
        console.log("Disconnected from Binance WebSocket");
    };

    // Update prices every second via callback
    const intervalId = setInterval(() => {
        if (lastPricesData.size > 0) {
            onPriceUpdate(lastPricesData);
        }
    }, 500);

    // Return cleanup function
    return () => {
        ws.close();
        clearInterval(intervalId);
    };
}

/**
 * Top Gainers/losers from binance. 
 * @returns 
 */
export const getTopGainersAndLosers = async () => {
    try {
        // Fetch all 24hr tickers
        const response = await fetch(binanceTopGainersLosers);
        const data = await response.json();

        // Get top 10 gainers
        const gainers = data
            .filter((ticker: TickerResponse) => ticker.symbol.endsWith('USDT')) // Filter for USDT pairs
            .sort((a: TickerResponse, b: TickerResponse) => parseFloat(b.priceChangePercent) - parseFloat(a.priceChangePercent))
            .slice(0, 10);

        // Get top 10 losers
        const losers = data
            .filter((ticker: TickerResponse) => ticker.symbol.endsWith('USDT'))
            .sort((a: TickerResponse, b: TickerResponse) => parseFloat(a.priceChangePercent) - parseFloat(b.priceChangePercent))
            .slice(0, 10);

        return { gainers, losers };
    } catch (error) {
        console.error("Error fetching top gainers and losers:", error);
        throw error;
    }
}
