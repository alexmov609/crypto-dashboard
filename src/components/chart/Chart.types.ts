export interface ChartData {
    time: number; // Unix timestamp in seconds for intraday data
    value: number;
}

export interface ChartComponentProps {
    data: ChartData[];
    cryptoName?: string;
    cryptoSymbol?: string;
    currentPrice?: number;
    priceChange24h?: number;
}