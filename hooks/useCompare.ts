
import { useState, useEffect } from 'react';

const COMPARE_KEY = 'stoneTradeCompare';
const MAX_COMPARE_ITEMS = 4;

export const useCompare = () => {
    const [compareList, setCompareList] = useState<number[]>([]);

    useEffect(() => {
        try {
            const storedCompareList = localStorage.getItem(COMPARE_KEY);
            if (storedCompareList) {
                setCompareList(JSON.parse(storedCompareList));
            }
        } catch (error) {
            console.error("Could not parse compare list from localStorage", error);
        }
    }, []);

    const updateLocalStorage = (list: number[]) => {
        localStorage.setItem(COMPARE_KEY, JSON.stringify(list));
    }

    const toggleCompare = (productId: number) => {
        let newCompareList;
        if (compareList.includes(productId)) {
            newCompareList = compareList.filter(id => id !== productId);
        } else {
            if (compareList.length >= MAX_COMPARE_ITEMS) {
                alert(`You can only compare up to ${MAX_COMPARE_ITEMS} items at a time.`);
                return;
            }
            newCompareList = [...compareList, productId];
        }
        setCompareList(newCompareList);
        updateLocalStorage(newCompareList);
    };

    const clearCompare = () => {
        setCompareList([]);
        updateLocalStorage([]);
    }

    return { compareList, toggleCompare, clearCompare };
};
