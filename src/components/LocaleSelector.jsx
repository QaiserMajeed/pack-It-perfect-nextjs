'use client';
// src/components/LocaleSelector.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { useLocalization } from "../hooks/useLocalization";

const SelectorContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const SelectedLocale = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: transparent;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    border-color: #000;
    background-color: #f9f9f9;
  }

  &:focus {
    outline: none;
    border-color: #000;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
`;

const Flag = styled.span`
  font-size: 16px;
  line-height: 1;
`;

const LocaleName = styled.span`
  font-weight: 500;
`;

const DropdownIcon = styled.span`
  font-size: 12px;
  transition: transform 0.2s ease;
  transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin-top: 4px;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const DropdownItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  text-align: left;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
  }

  &:first-child {
    border-radius: 4px 4px 0 0;
  }

  &:last-child {
    border-radius: 0 0 4px 4px;
  }

  ${(props) =>
    props.isSelected &&
    `
    background-color: #f0f0f0;
    font-weight: 600;
  `}
`;

const CurrencyCode = styled.span`
  color: #666;
  font-size: 12px;
  margin-left: auto;
`;

const LOCALES = [
  {
    code: "en-UK",
    name: "United Kingdom",
    flag: "ðŸ‡¬ðŸ‡§",
    currency: "GBP",
  },
  {
    code: "en-US",
    name: "United States",
    flag: "ðŸ‡ºðŸ‡¸",
    currency: "USD",
  },
  {
    code: "en-CA",
    name: "Canada",
    flag: "ðŸ‡¨ðŸ‡¦",
    currency: "CAD",
  },
  {
    code: "en-AU",
    name: "Australia",
    flag: "ðŸ‡¦ðŸ‡º",
    currency: "AUD",
  },
  {
    code: "en-NZ",
    name: "New Zealand",
    flag: "ðŸ‡³ðŸ‡¿",
    currency: "NZD",
  },
];

const LocaleSelector = ({ className = "" }) => {
  const { currentLocale, changeLocale } = useLocalization();
  const [isOpen, setIsOpen] = useState(false);

  const currentLocaleData =
    LOCALES.find((locale) => locale.code === currentLocale) || LOCALES[0];

  const handleLocaleChange = (localeCode) => {
    changeLocale(localeCode);
    setIsOpen(false);
    // Reload page to apply changes throughout the app
    window.location.reload();
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest("[data-locale-selector]")) {
      setIsOpen(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <SelectorContainer className={className} data-locale-selector>
      <SelectedLocale
        onClick={toggleDropdown}
        aria-label="Select country/region"
      >
        <Flag>{currentLocaleData.flag}</Flag>
        <LocaleName>{currentLocaleData.name}</LocaleName>
        <DropdownIcon isOpen={isOpen}>â–¼</DropdownIcon>
      </SelectedLocale>

      <DropdownMenu isOpen={isOpen}>
        {LOCALES.map((locale) => (
          <DropdownItem
            key={locale.code}
            onClick={() => handleLocaleChange(locale.code)}
            isSelected={locale.code === currentLocale}
          >
            <Flag>{locale.flag}</Flag>
            <LocaleName>{locale.name}</LocaleName>
            <CurrencyCode>{locale.currency}</CurrencyCode>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </SelectorContainer>
  );
};

export default LocaleSelector;

