'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '@/translations';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
    language: 'en',
    setLanguage: () => { },
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('en');

    // Persist language preference
    useEffect(() => {
        const saved = localStorage.getItem('stonetrade_lang');
        if (saved) setLanguage(saved as Language);
    }, []);

    const handleSetLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem('stonetrade_lang', lang);
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
