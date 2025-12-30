'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, TranslationType } from './index';

export type Language = "en" | "ar" | "ku";

interface LanguageContextProps {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: TranslationType; // This gives you auto-complete for translations
    dir: "ltr" | "rtl";
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    // Default to English or read from LocalStorage
    const [language, setLanguageState] = useState<Language>('en');

    useEffect(() => {
        const savedLang = localStorage.getItem('app_lang') as Language;
        if (savedLang) {
            setLanguageState(savedLang);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem('app_lang', lang);

        // Update HTML direction for proper CSS layout
        const direction = lang === 'en' ? 'ltr' : 'rtl';
        document.documentElement.dir = direction;
        document.documentElement.lang = lang;
    };

    // Calculate Direction
    const dir = language === 'en' ? 'ltr' : 'rtl';

    // Get the current translation object
    const t = translations[language];

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
            <div dir={dir} className={language === 'ar' || language === 'ku' ? 'font-sans-arabic' : 'font-sans'}>
                {children}
            </div>
        </LanguageContext.Provider>
    );
};

// Custom Hook for easy usage
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};