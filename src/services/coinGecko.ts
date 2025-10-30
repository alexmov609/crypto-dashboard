import axios from "axios";
import type { CoinListResponse } from "../types/Converter.types";
const coinGeckoBaseUrl = import.meta.env.VITE_COINGECKO_API_BASE;

/**
 * Get historical data for the cpecific symbol.
 * https://docs.coingecko.com/docs/2-get-historical-data
 * @param coinId 
 * @param days 
 * @returns 
 */
export const getHistoricalData = async (coinId: string, days: number) => {
    try {
        const response = await axios.get(`${coinGeckoBaseUrl}/coins/${coinId}/market_chart`,
            {
                params: {
                    vs_currency: 'usd',
                    days,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching historical data:", error);
        throw error;
    }

}


/**
 * Fetch from coinGecko historical data for the multiple coins.
 * @param coinIds 
 * @param days 
 * @returns 
 */
export const fetchMultipleCoinsHistoricalData = async (coinIds: string[][], days: number) => {
    const promises = coinIds.map(id => getHistoricalData(id[0], days));
    const results = await Promise.all(promises);

    return results; // Array of historical data objects
}

/**
 * Fetch from coinGecko current data about symbols.
 * https://docs.coingecko.com/reference/simple-price
 * @param coins 
 * @returns 
 */
export const getLivePriceData = async (coins: string[]) => {
    try {
        const response = await axios.get(`${coinGeckoBaseUrl}/simple/price?ids=${coins.toString()}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`);
        return response.data;
    } catch (error) {
        console.error("Error fetching live price data:", error);
        throw error;
    }
}

/**
 * Fetch from coinGecko current price only for the multiple coins.
 * @param coins 
 * @returns 
 */
export const getLivePrice = async (coins: string[]) => {
    try {
        const response = await axios.get(`${coinGeckoBaseUrl}/simple/price`, {
            params: {
                ids: coins.toString(),
                vs_currencies: 'usd',

            },
        });

        if (!response.data)
            return {};
        return response.data;
    } catch (error) {
        console.error("Error fetching live price:", error);
        throw error;
    }
}

// Cache for coins list - persists for the entire session
let coinsListCache: string[][] | null = null;
let coinsListPromise: Promise<string[][]> | null = null;

/**
 * Fetch from coinGecko the list of coin names.
 * Uses in-memory cache to avoid duplicate requests per session.
 * @returns
 */
export const getCoinsList = async (): Promise<string[][] | []> => {
    // Return cached data if available
    if (coinsListCache) {
        console.log("Returning cached coins list");
        return coinsListCache;
    }

    // If a request is already in progress, return that promise
    // This prevents duplicate requests if called multiple times quickly
    if (coinsListPromise) {
        console.log("Request already in progress, waiting...");
        return coinsListPromise;
    }

    // Create new request
    coinsListPromise = (async () => {
        try {
            console.log("Fetching coins list from API...");
            const response = await axios.get(`${coinGeckoBaseUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1`);
            if (!response.data) {
                coinsListCache = [];
                return [];
            }
            const data = response.data.map((coin: CoinListResponse) => [coin.id, coin.name, coin.symbol, coin.image]);
            coinsListCache = data; // Cache the result
            return data;
        } catch (error) {
            console.error("Error fetching coins list:", error);
            throw error;
        } finally {
            coinsListPromise = null; // Clear the promise after completion
        }
    })();

    return coinsListPromise;
}

