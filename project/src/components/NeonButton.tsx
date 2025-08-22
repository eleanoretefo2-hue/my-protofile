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
  const baseClasses = "group relative px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-3 overflow-hidden";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-slate-900/40 to-slate-800/30 border-2 border-blue-300/50 text-blue-200 hover:border-blue-300 hover:shadow-[0_0_24px_rgba(147,197,253,0.35)]",
    secondary: "bg-gradient-to-r from-slate-900/40 to-slate-800/30 border-2 border-pink-300/50 text-pink-200 hover:border-pink-300 hover:shadow-[0_0_24px_rgba(244,114,182,0.35)]"
  } as const;

  const sweepClass = variant === 'primary'
    ? 'bg-gradient-to-r from-blue-300/40 via-blue-200/30 to-transparent'
    : 'bg-gradient-to-r from-pink-300/40 via-pink-200/30 to-transparent';

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {/* Animated neon border layers */}
      <span className="btn-neon-border" aria-hidden="true" />
      <span className="btn-neon-border-inner" aria-hidden="true" />

      {/* Geometric inner pattern */}
      <span className="btn-geo-pattern" aria-hidden="true" />

      {/* Moving internal glow */}
      <span className="btn-moving-glow" aria-hidden="true" />

      {/* Inner moving sweep highlight */}
      <div className="absolute inset-0 rounded-full pointer-events-none">
        <div className={`h-full w-1/3 translate-x-[-150%] animate-sweep opacity-60 ${sweepClass}`} />
      </div>

      <Icon className="w-6 h-6 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default NeonButton;