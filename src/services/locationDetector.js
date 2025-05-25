// src/services/locationDetector.js
import i18n from "../i18n/config";

// Country mappings
const COUNTRY_MAPPINGS = {
  GB: "en-UK",
  US: "en-US",
  CA: "en-CA",
  AU: "en-AU",
  NZ: "en-NZ",
};

// Currency mappings
export const CURRENCY_CONFIG = {
  "en-UK": { symbol: "£", code: "GBP", locale: "en-GB" },
  "en-US": { symbol: "$", code: "USD", locale: "en-US" },
  "en-CA": { symbol: "CAD $", code: "CAD", locale: "en-CA" },
  "en-AU": { symbol: "AUD $", code: "AUD", locale: "en-AU" },
  "en-NZ": { symbol: "NZD $", code: "NZD", locale: "en-NZ" },
};

class LocationDetector {
  constructor() {
    this.detectedCountry = null;
    this.detectedLocale = null;
  }

  // Detect country from IP using multiple APIs
  async detectCountryFromIP() {
    const apis = [
      {
        url: "https://ipapi.co/json/",
        parser: (data) => data.country_code,
      },
      {
        url: "https://ipinfo.io/json",
        parser: (data) => data.country,
      },
      {
        url: "https://api.country.is/",
        parser: (data) => data.country,
      },
    ];

    for (const api of apis) {
      try {
        const response = await fetch(api.url);
        if (response.ok) {
          const data = await response.json();
          const countryCode = api.parser(data);

          if (countryCode && COUNTRY_MAPPINGS[countryCode]) {
            this.detectedCountry = countryCode;
            this.detectedLocale = COUNTRY_MAPPINGS[countryCode];
            return this.detectedLocale;
          }
        }
      } catch (error) {
        console.warn(`Failed to detect location from ${api.url}:`, error);
        continue;
      }
    }

    return null;
  }

  // Detect country from browser locale
  detectCountryFromBrowser() {
    const browserLanguage = navigator.language || navigator.languages[0];

    // Check for specific regional locales
    const localeMap = {
      "en-GB": "en-UK",
      "en-US": "en-US",
      "en-CA": "en-CA",
      "en-AU": "en-AU",
      "en-NZ": "en-NZ",
    };

    if (localeMap[browserLanguage]) {
      this.detectedLocale = localeMap[browserLanguage];
      return this.detectedLocale;
    }

    // Check timezone for additional hints
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timezoneCountryMap = {
      "America/New_York": "en-US",
      "America/Los_Angeles": "en-US",
      "America/Chicago": "en-US",
      "America/Denver": "en-US",
      "America/Toronto": "en-CA",
      "America/Vancouver": "en-CA",
      "Australia/Sydney": "en-AU",
      "Australia/Melbourne": "en-AU",
      "Australia/Perth": "en-AU",
      "Pacific/Auckland": "en-NZ",
      "Europe/London": "en-UK",
    };

    if (timezoneCountryMap[timezone]) {
      this.detectedLocale = timezoneCountryMap[timezone];
      return this.detectedLocale;
    }

    return null;
  }

  // Main detection method
  async detectUserLocation() {
    // First try browser detection (faster)
    let locale = this.detectCountryFromBrowser();

    // if (locale) {
    //   console.log("Location detected from browser:", locale);
    //   return locale;
    // }

    // Then try IP detection
    locale = await this.detectCountryFromIP();

    if (locale) {
      console.log("Location detected from IP:", locale);
      return locale;
    }

    // Fallback to UK
    console.log("Location detection failed, falling back to en-UK");
    return "en-UK";
  }

  // Initialize location detection and set i18n locale
  async initializeLocation() {
    try {
      // Check if locale is already stored
      const storedLocale = localStorage.getItem("user-locale");
      if (storedLocale && CURRENCY_CONFIG[storedLocale]) {
        this.detectedLocale = storedLocale;
        i18n.changeLanguage(storedLocale);
        return storedLocale;
      }
      // Detect new location
      const detectedLocale = await this.detectUserLocation();
      this.detectedLocale = detectedLocale;

      // Store in localStorage
      localStorage.setItem("user-locale", detectedLocale);

      // Set i18n language
      i18n.changeLanguage(detectedLocale);

      return detectedLocale;
    } catch (error) {
      console.error("Error initializing location:", error);
      const fallbackLocale = "en-UK";
      this.detectedLocale = fallbackLocale;
      i18n.changeLanguage(fallbackLocale);
      return fallbackLocale;
    }
  }

  // Get current locale
  getCurrentLocale() {
    return this.detectedLocale || i18n.language || "en-UK";
  }

  // Get currency configuration for current locale
  getCurrencyConfig() {
    const locale = this.getCurrentLocale();
    return CURRENCY_CONFIG[locale] || CURRENCY_CONFIG["en-UK"];
  }

  // Format currency
  formatCurrency(amount, options = {}) {
    const locale = this.getCurrentLocale();
    const config = this.getCurrencyConfig();

    return new Intl.NumberFormat(config.locale, {
      style: "currency",
      currency: config.code,
      minimumFractionDigits: options.minimumFractionDigits || 2,
      maximumFractionDigits: options.maximumFractionDigits || 2,
      ...options,
    }).format(amount);
  }

  // Manually set locale (for user preference)
  setLocale(locale) {
    if (CURRENCY_CONFIG[locale]) {
      this.detectedLocale = locale;
      localStorage.setItem("user-locale", locale);
      i18n.changeLanguage(locale);
      return true;
    }
    return false;
  }
}

// Create singleton instance
const locationDetector = new LocationDetector();
export default locationDetector;
