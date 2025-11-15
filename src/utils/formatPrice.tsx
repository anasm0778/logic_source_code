import React from 'react';
import CurrencySymbol from '../components/CurrencySymbol';

/**
 * Utility function to format price strings by replacing "D " with đồng symbol
 */
export const formatPriceWithSymbol = (price: string | number): React.ReactNode => {
  const priceStr = String(price);
  
  // Replace "D " pattern with CurrencySymbol
  const parts = priceStr.split(/(D\s+)/g);
  
  return (
    <>
      {parts.map((part, index) => {
        if (part.match(/^D\s+$/)) {
          return <CurrencySymbol key={index} size={16} />;
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
};

/**
 * Simple string replacement for non-React contexts
 */
export const replaceCurrencyD = (text: string): string => {
  // This will be handled by components, but useful for plain text
  return text.replace(/D\s+/g, '₫ ');
};

