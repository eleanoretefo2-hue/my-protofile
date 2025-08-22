import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface NeonButtonProps {
  icon: LucideIcon;
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

const NeonButton: React.FC<NeonButtonProps> = ({ 
  icon: Icon, 
  children, 
  onClick, 
  variant = 'primary',
  className = '' 
}) => {
  const baseClasses = "group relative px-8 py-4 rounded-full font-semibold text-lg transition-all duration-75 transform hover:scale-110 active:scale-90 flex items-center gap-3 overflow-hidden";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-green-400/20 to-blue-500/20 border-2 border-green-400/50 text-green-400 hover:border-green-400 hover:shadow-lg hover:shadow-green-400/25",
    secondary: "bg-gradient-to-r from-pink-400/20 to-purple-500/20 border-2 border-pink-400/50 text-pink-400 hover:border-pink-400 hover:shadow-lg hover:shadow-pink-400/25"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {/* New fast ripple effect */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className={`h-full w-full translate-x-[-100%] animate-ripple-fast opacity-80 ${variant === 'primary' ? 'bg-gradient-to-r from-green-400/60 via-green-300/40 to-transparent' : 'bg-gradient-to-r from-pink-400/60 via-pink-300/40 to-transparent'}`} />
      </div>

      {/* Fast pulse effect */}
      <div className={`absolute inset-0 rounded-full animate-pulse-fast ${variant === 'primary' ? 'bg-green-400/20' : 'bg-pink-400/20'}`} />

      {/* Fast rotating border */}
      <div className={`absolute -inset-1 rounded-full animate-spin-fast border-2 border-transparent ${variant === 'primary' ? 'border-t-green-400 border-r-blue-400' : 'border-t-pink-400 border-r-purple-400'}`} />

      {/* Fast bouncing dots */}
      <div className={`absolute top-2 right-2 w-2 h-2 rounded-full animate-bounce-fast ${variant === 'primary' ? 'bg-green-400' : 'bg-pink-400'}`} />
      <div className={`absolute bottom-2 left-2 w-2 h-2 rounded-full animate-bounce-fast ${variant === 'primary' ? 'bg-blue-400' : 'bg-purple-400'}`} style={{ animationDelay: '0.2s' }} />

      <Icon className="w-6 h-6 group-hover:rotate-180 group-hover:scale-125 transition-all duration-75" />
      <span className="relative z-10 group-hover:scale-110 transition-transform duration-75">{children}</span>
      
      {/* Fast glow effect */}
      <div className={`absolute -inset-2 rounded-full blur-xl pointer-events-none opacity-60 animate-glow-fast ${variant === 'primary' ? 'bg-gradient-to-r from-green-400/70 to-blue-500/70' : 'bg-gradient-to-r from-pink-400/70 to-purple-500/70'}`} />
      
      {/* Fast sparkle effect */}
      <div className={`absolute top-1 left-1 w-1 h-1 rounded-full animate-sparkle-fast ${variant === 'primary' ? 'bg-yellow-300' : 'bg-cyan-300'}`} />
      <div className={`absolute top-3 right-3 w-1 h-1 rounded-full animate-sparkle-fast ${variant === 'primary' ? 'bg-yellow-300' : 'bg-cyan-300'}`} style={{ animationDelay: '0.3s' }} />
      <div className={`absolute bottom-3 left-3 w-1 h-1 rounded-full animate-sparkle-fast ${variant === 'primary' ? 'bg-yellow-300' : 'bg-cyan-300'}`} style={{ animationDelay: '0.6s' }} />
    </button>
  );
};

export default NeonButton;