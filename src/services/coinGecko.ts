import axios from "axios";
const coinGeckoBaseUrl = import.meta.env.VITE_COINGECKO_API_BASE;

/**
 * Get historical data for the cpecific symbol.
 * https://docs.coingecko.com/docs/2-get-historical-data
 * @param coinId 
 * @param days 
 * @returns 
 */
export const getHistoricalData = async (coinId: string, days: number) => {
    const response = await axios.get(`${coinGeckoBaseUrl}/coins/${coinId}/market_chart`,
        {
            params: {
                vs_currency: 'usd',
                days,
            },
        }
    );
    return response.data;
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
    console.log("results from coinGecko", results);

    return results; // Array of historical data objects
}