import { useLocalization } from "./useLocalization";

export const useCurrency = () => {
  const { formatCurrency, getCurrencyConfig, currentLocale } =
    useLocalization();

  const formatPrice = (amount, options = {}) => {
    return formatCurrency(amount, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      ...options,
    });
  };

  const formatPriceCompact = (amount) => {
    return formatCurrency(amount, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      notation: "compact",
    });
  };

  const getCurrencySymbol = () => {
    const config = getCurrencyConfig();
    return config.symbol;
  };

  const getCurrencyCode = () => {
    const config = getCurrencyConfig();
    return config.code;
  };

  return {
    formatPrice,
    formatPriceCompact,
    getCurrencySymbol,
    getCurrencyCode,
    currentLocale,
  };
};
