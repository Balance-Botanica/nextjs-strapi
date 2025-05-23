'use client';

import React from 'react';
import { useTheme } from '../context/ThemeContext';

type ButtonVariant = 'primary' | 'secondary' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
  href?: string;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
  [key: string]: any; // For any additional props
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className,
  style,
  as: Component = 'button',
  ...props
}: ButtonProps) => {
  const { currentTheme } = useTheme();
  
  const baseStyles = {
    borderRadius: '8px', // Figma's border radius
    transition: 'all 0.2s ease',
    fontFamily: currentTheme.typography.fontFamily,
    fontWeight: 600,
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
  };

  const sizeStyles = {
    sm: {
      padding: `${currentTheme.spacing.xs} ${currentTheme.spacing.sm}`,
      fontSize: '0.875rem',
    },
    md: {
      padding: `${currentTheme.spacing.sm} ${currentTheme.spacing.md}`,
      fontSize: '1rem',
    },
    lg: {
      padding: `${currentTheme.spacing.md} ${currentTheme.spacing.lg}`,
      fontSize: '1.125rem',
    },
  };

  const variantStyles = {
    primary: {
      backgroundColor: currentTheme.color.primary[500],
      color: currentTheme.color.text.primary,
      '&:hover': {
        backgroundColor: currentTheme.color.primary[900],
      },
    },
    secondary: {
      backgroundColor: currentTheme.color.accent,
      color: currentTheme.color.white,
      '&:hover': {
        backgroundColor: currentTheme.color.success,
      },
    },
    text: {
      backgroundColor: 'transparent',
      color: currentTheme.color.text.primary,
      '&:hover': {
        opacity: 0.8,
      },
    },
  };

  // Handle the special hover state for CSS-in-JS
  const handleMouseOver = (e: React.MouseEvent<HTMLElement>) => {
    if (variant === 'primary') {
      e.currentTarget.style.backgroundColor = currentTheme.color.primary[900];
    } else if (variant === 'secondary') {
      e.currentTarget.style.backgroundColor = currentTheme.color.success;
    } else {
      e.currentTarget.style.opacity = '0.8';
    }
  };

  const handleMouseOut = (e: React.MouseEvent<HTMLElement>) => {
    if (variant === 'primary') {
      e.currentTarget.style.backgroundColor = currentTheme.color.primary[500];
    } else if (variant === 'secondary') {
      e.currentTarget.style.backgroundColor = currentTheme.color.accent;
    } else {
      e.currentTarget.style.opacity = '1';
    }
  };

  return (
    <Component
      className={className}
      onClick={onClick}
      style={{
        ...baseStyles,
        ...sizeStyles[size],
        backgroundColor: variantStyles[variant].backgroundColor,
        color: variantStyles[variant].color,
        ...style,
      }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      {...props}
    >
      {children}
    </Component>
  );
}; 