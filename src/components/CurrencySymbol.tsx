import React from 'react';
import Image from 'next/image';

interface CurrencySymbolProps {
  className?: string;
  style?: React.CSSProperties;
  size?: number;
}

const CurrencySymbol: React.FC<CurrencySymbolProps> = ({ className, style, size = 16 }) => {
  return (
    <span 
      className={`currency-symbol ${className || ''}`} 
      style={{ 
        display: 'inline-block', 
        verticalAlign: 'middle', 
        lineHeight: 1,
        ...style 
      }}
    >
      <Image 
        src="/dong-symbol.png" 
        alt="₫" 
        width={size} 
        height={size}
        style={{ display: 'inline-block', verticalAlign: 'middle' }}
      />
    </span>
  );
};

export default CurrencySymbol;

