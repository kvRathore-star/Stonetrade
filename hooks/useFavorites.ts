
import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'stoneTradeFavorites';

export const useFavorites = () => {
    const [favorites, setFavorites] = useState<number[]>([]);

    useEffect(() => {
        try {
            const storedFavorites = localStorage.getItem(FAVORITES_KEY);
            if (storedFavorites) {
                setFavorites(JSON.parse(storedFavorites));
            }
        } catch (error) {
            console.error("Could not parse favorites from localStorage", error);
        }
    }, []);

    const toggleFavorite = (productId: number) => {
        const newFavorites = favorites.includes(productId)
            ? favorites.filter(id => id !== productId)
            : [...favorites, productId];
        
        setFavorites(newFavorites);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    };

    return { favorites, toggleFavorite };
};
