import React from 'react';
import logoImage from 'figma:asset/984eb42813bbe5924f24c73a5f00cbdb5e1db2bc.png';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-14 w-14',
    xl: 'h-16 w-16',
  };

  return (
    <img 
      src={logoImage} 
      alt="ProSpaces CRM Logo" 
      className={`${sizeClasses[size]} ${className} object-contain`}
    />
  );
}
