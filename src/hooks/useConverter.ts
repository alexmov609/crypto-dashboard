import { useEffect, useRef } from "react";
import type { UseConverterParams } from "../types/Converter.types";
import { getCoinsList, getLivePrice } from "../services/coinGecko";

export const useConverter = ({ setConvertAmount,
    setConvertAmountError,
    setCoinList,
    setConvertionResult,
    setShowFromDropdown,
    setShowToDropdown,
    coinToBuy,
    coinToSell,
    convertAmount,
    setCoinToBuy,
    setCoinToSell,
    setCoinToSellError,
    setCoinToBuyError,
    setApiGetPriceError,
}: UseConverterParams) => {

    const fromDropdownRef = useRef<HTMLDivElement>(null);
    const toDropdownRef = useRef<HTMLDivElement>(null);

    /**
     * Fetch coins list on mount
     */
    useEffect(() => {
        const fetchCoinList = async () => {
            const coins: string[][] | [] = await getCoinsList();
            if (!coins || coins.length === 0)
                return;

            setCoinList(coins);
        };

        fetchCoinList();
    }, []);

    /**
     * Handle click outside of dropdowns to close them
     */
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                fromDropdownRef.current &&
                !fromDropdownRef.current.contains(event.target as Node)
            ) {
                setShowFromDropdown(false);
            }
            if (
                toDropdownRef.current &&
                !toDropdownRef.current.contains(event.target as Node)
            ) {
                setShowToDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    /**
     * Change amount input handler
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        // Allow only digits and one dot
        if (/^\d*\.?\d*$/.test(val)) {
            setConvertAmount(val);
        }
    };

    /**
     * Add convert amount by 1 or 0.01
     * @param convertAmount 
     */
    const addConvertAmount = (convertAmount: string) => {
        const currentAmount = parseFloat(convertAmount) || 0;
        const newAmount =
            currentAmount % 1 === 0 ? currentAmount + 1 : currentAmount + 0.01;
        setConvertAmount(newAmount.toFixed(2).toString());
    };

    /**
     * Substract convert amount by 1 or 0.01
     * @param convertAmount 
     * @returns 
     */
    const subConvertAmount = (convertAmount: string) => {
        const currentAmount = parseFloat(convertAmount) || 0;
        if (currentAmount === 0) return;

        const newAmount =
            currentAmount % 1 === 0 ? currentAmount - 1 : currentAmount - 0.01;
        setConvertAmount(newAmount.toFixed(2).toString());
    };

    /**
     * Calculate conversion result
     */
    const handleConvert = async () => {
        setCoinToBuyError(false);
        setCoinToSellError(false);
        setApiGetPriceError(false);
        setConvertAmountError(false);

        if (coinToBuy === null || coinToSell === null) {
            setCoinToBuyError(true);
            setCoinToSellError(true);
            return;
        }

        if (convertAmount === "" || parseFloat(convertAmount!) === 0) {
            setConvertAmountError(true);
            return;
        }

        //get live prices for both coins
        const prices = await getLivePrice([coinToBuy.name, coinToSell.name]);
        if (!prices) {
            setApiGetPriceError(true);
            return;
        }

        //calculate conversion
        const convertRes =
            (prices[coinToSell.name].usd / prices[coinToBuy.name].usd) *
            parseFloat(convertAmount!);

        setConvertionResult(convertRes);
    };

    /**
     * Handle change coins button click
     */
    const handleChangeCoins = () => {
        const tmp = coinToBuy;
        setCoinToBuy(coinToSell);
        setCoinToSell(tmp);
    };

    return {
        fromDropdownRef,
        toDropdownRef,
        handleChange,
        handleChangeCoins,
        handleConvert,
        addConvertAmount,
        subConvertAmount,
    }

}