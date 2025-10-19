// Types for live data response
export interface LiveDataResponseObject {
    usd: number;
    usd_market_cap: number;
    usd_24h_vol: number;
    usd_24h_change: number;
    last_updated_at: number;
}
export interface LiveDataResponse {
    [key: string]: LiveDataResponseObject;
}