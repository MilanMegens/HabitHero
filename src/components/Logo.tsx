import React from 'react';

const Logo = ({ className = "w-12 h-12" }: { className?: string }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="45" fill="url(#logoGradient)" />
      <path 
        d="M35 50L45 60L65 40" 
        stroke="white" 
        strokeWidth="8" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <circle cx="75" cy="25" r="8" fill="#fbbf24" />
    </svg>
  );
};

export default Logo;