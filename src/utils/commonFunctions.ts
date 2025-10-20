
/**
 * Beautify number by passed currency.
 * @param number 
 * @param currency 
 * @returns 
 */
export const beautifyNumber = (number: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
    }).format(number);
}

/**
 * Beautify number to percent.
 * @param number 
 * @param maximumFractionDigits 
 * @returns 
 */
export const beautifyNumberToPercent = (number: number, maximumFractionDigits: number) => {
    return new Intl.NumberFormat("en-IN", {
        style: "percent",
        maximumFractionDigits: maximumFractionDigits,
    }).format(number);
}