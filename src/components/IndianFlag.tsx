import React from 'react';

interface IndianFlagProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  rounded?: boolean;
}

/**
 * Authentic SVG rendering of the National Flag of India (Tiranga)
 * Features Saffron (#FF9933), White (#FFFFFF) with 24-spoke Navy Ashoka Chakra (#000080), and India Green (#138808).
 */
export const IndianFlag: React.FC<IndianFlagProps> = ({
  className = '',
  width = 36,
  height = 24,
  rounded = true
}) => {
  return (
    <svg
      viewBox="0 0 90 60"
      width={width}
      height={height}
      className={`shadow-xs border border-slate-200/80 shrink-0 ${rounded ? 'rounded-xs' : ''} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="National Flag of India"
    >
      {/* Saffron Top Band */}
      <rect width="90" height="20" fill="#FF9933" />
      
      {/* White Middle Band */}
      <rect y="20" width="90" height="20" fill="#FFFFFF" />
      
      {/* India Green Bottom Band */}
      <rect y="40" width="90" height="20" fill="#138808" />

      {/* Ashoka Chakra (Navy Blue: #000080) */}
      <g transform="translate(45, 30)">
        {/* Outer Ring */}
        <circle r="8.2" fill="none" stroke="#000080" strokeWidth="1.2" />
        
        {/* Inner Hub Ring */}
        <circle r="1.8" fill="#000080" />
        <circle r="0.8" fill="#FFFFFF" />

        {/* 24 Radial Spokes */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * 360) / 24;
          return (
            <line
              key={i}
              x1="0"
              y1="0"
              x2={8 * Math.cos((angle * Math.PI) / 180)}
              y2={8 * Math.sin((angle * Math.PI) / 180)}
              stroke="#000080"
              strokeWidth="0.6"
            />
          );
        })}
      </g>
    </svg>
  );
};
