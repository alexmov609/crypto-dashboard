// Icon mapping for crypto coins
export const coinIcons: { [key: string]: string } = {
    bitcoin: "/cryptoIcons/bitcoin.svg",
    ethereum: "/cryptoIcons/ethereum.svg",
    tether: "/cryptoIcons/tether.svg",
    binancecoin: "/cryptoIcons/binancecoin.svg",
    xrp: "/cryptoIcons/xrp.svg",
    solana: "/cryptoIcons/solana.svg",
    "usd-coin": "/cryptoIcons/usd-coin.svg",
    dogecoin: "/cryptoIcons/dogecoin.svg",
    tron: "/cryptoIcons/tron.svg",
    cardano: "/cryptoIcons/cardano.svg",
    hyperliquid: "/cryptoIcons/hyperliquid.svg",
    chainlink: "/cryptoIcons/chainlink.svg",
    "bitcoin-cash": "/cryptoIcons/bitcoin-cash.svg",
};

// List of coins to fetch prices for from CoinGecko
export const coinPricesArray = [
    "bitcoin",
    "ethereum",
    "tether",
    "binancecoin",
    "xrp",
    "solana",
    "usd-coin",
    "dogecoin",
    "tron",
    "cardano",
    "hyperliquid",
    "chainlink",
    "bitcoin-cash",
];

// Binance trading pairs corresponding to coinPricesArray
export const binanceSymbols = [
    "btcusdt",
    "ethusdt",
    "usdtusdt",
    "bnbusdt",
    "xrpusdt",
    "solusdt",
    "usdcusdt",
    "dogeusdt",
    "trxusdt",
    "adausdt",
    "hypeusdt",
    "linkusdt",
    "bchusdt",
];