import type { UTCTimestamp } from "lightweight-charts";

export interface ChartData {
    time: UTCTimestamp; // Unix timestamp in seconds for intraday data
    value: number;
}

export interface ChartComponentProps {
    data: ChartData[];
    cryptoName?: string;
    cryptoSymbol?: string;
    currentPrice?: number;
    priceChange24h?: number;
}

//Interface for the reruned data from COINGECKO + key(coin name)
export interface Data24H {
    key: string;
    market_caps: [number, number][];
    prices: [number, number][];
    total_volumes: [number, number][];
}
