import type { UTCTimestamp } from "lightweight-charts";

// Data point for charting
export interface ChartData {
    time: UTCTimestamp; // Unix timestamp in seconds for intraday data
    value: number;
}

// Props for Chart component
export interface ChartComponentProps {
    coinId?: string;
    cryptoName?: string;
    cryptoSymbol?: string;
    coins?: Array<{
        coinId: string;
        cryptoName: string;
        cryptoSymbol: string;
        image?: string;
    }>;
}

//Interface for the reruned data from COINGECKO + key(coin name)
export interface Data24H {
    key: string;
    market_caps: [number, number][];
    prices: [number, number][];
    total_volumes: [number, number][];
}
