export const lineColors = {
    "1D": "#2962FF",
    "1W": "rgb(225, 87, 90)",
    "1M": "rgb(242, 142, 44)",
    "1Y": "rgb(164, 89, 209)",
};
export const areaTopColors = {
    "1D": "#2962FF",
    "1W": "rgb(225, 87, 90)",
    "1M": "rgb(242, 142, 44)",
    "1Y": "rgb(164, 89, 209)",
};


export const intervals = ["1D", "1W", "1M", "1Y"] as const;
export type Interval = (typeof intervals)[number];

// Color palette for multiple coin comparison
export const compareColors = [
  "#2962FF", // Blue
  "#E15758", // Red
  "#F29A2E", // Orange
  "#A459D1", // Purple
  "#4ECDC4", // Teal
  "#FFE66D", // Yellow
  "#FF6B6B", // Coral
  "#95E1D3", // Mint
  "#F38181", // Pink
  "#AA96DA", // Lavender
];

