import { useEffect, useState } from "react";
import type { Ticker } from "../types/Ticker.types";
import { getTopGainersAndLosers } from "../services/binance";

export const useGainers = () => {
    const [gainers, setGainers] = useState<Ticker[]>([]);
    const [losers, setLosers] = useState<Ticker[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetach top gainer and losers data from BINANCE
    useEffect(() => {
        const fetchGainers = async () => {
            try {
                setLoading(true);
                const { gainers, losers } = await getTopGainersAndLosers();
                setGainers(gainers);
                setLosers(losers);
                setError(null);
            } catch (error) {
                console.error("Error fetching gainers and losers:", error);
                setError("Failed to fetch data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchGainers();
    }, []);

    return {
        gainers,
        losers,
        loading,
        error,
    }
}