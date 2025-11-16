import React from 'react';
import CurrencySymbol from './CurrencySymbol';

interface PriceDisplayProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Component that replaces currency "D " with đồng symbol image
 */
const PriceDisplay: React.FC<PriceDisplayProps> = ({ children, className }) => {
  if (typeof children === 'string') {
    // Replace "D " pattern with CurrencySymbol component
    const parts = children.split(/(D\s+)/g);
    
    return (
      <span className={className}>
        {parts.map((part, index) => {
          if (part.match(/^D\s+$/)) {
            return <CurrencySymbol key={index} size={16} />;
          }
          return <span key={index}>{part}</span>;
        })}
      </span>
    );
  }
  
  return <span className={className}>{children}</span>;
};

export default PriceDisplay;

