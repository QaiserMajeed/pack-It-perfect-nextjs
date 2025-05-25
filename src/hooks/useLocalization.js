// src/hooks/useLocalization.js
'use client';
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import locationDetector from "../services/locationDetector";
// src/hooks/useCountryContent.js

export const useLocalization = () => {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [currentLocale, setCurrentLocale] = useState("en-UK");

  useEffect(() => {
    const initializeLocalization = async () => {
      try {
        const detectedLocale = await locationDetector.initializeLocation();
        setCurrentLocale(detectedLocale);
      } catch (error) {
        console.error("Failed to initialize localization:", error);
        setCurrentLocale("en-UK");
      } finally {
        setIsLoading(false);
      }
    };

    initializeLocalization();
  }, []);

  const changeLocale = (locale) => {
    if (locationDetector.setLocale(locale)) {
      setCurrentLocale(locale);
      return true;
    }
    return false;
  };

  const formatCurrency = (amount, options = {}) => {
    return locationDetector.formatCurrency(amount, options);
  };

  const getCurrencyConfig = () => {
    return locationDetector.getCurrencyConfig();
  };

  return {
    t,
    i18n,
    currentLocale,
    isLoading,
    changeLocale,
    formatCurrency,
    getCurrencyConfig,
  };
};


