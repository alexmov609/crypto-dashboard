export interface ChartData {
    time: string;
    value: number;
}

export interface ChartComponentProps {
    data: ChartData[];
    cryptoName?: string;
    cryptoSymbol?: string;
    currentPrice?: number;
    priceChange24h?: number;
}