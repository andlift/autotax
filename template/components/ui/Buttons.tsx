
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'neon' | 'outline' | 'ghost' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'neon', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold tracking-wider uppercase transition-all duration-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neon/50";
  
  const variants = {
    neon: "bg-neon text-dark hover:bg-white hover:shadow-neon-glow",
    outline: "border-2 border-neon text-neon hover:bg-neon hover:text-dark",
    secondary: "bg-tech-blue text-white hover:bg-white hover:text-dark",
    ghost: "bg-transparent text-white hover:bg-white/10"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
