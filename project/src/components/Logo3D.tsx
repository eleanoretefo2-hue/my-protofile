import React from 'react';

interface Logo3DProps {
	className?: string;
}

const Logo3D: React.FC<Logo3DProps> = ({ className = '' }) => {
	return (
		<div className={`relative select-none ${className}`} aria-label="MA logo 3D">
			{/* Aura behind */}
			<div className="aura-pulse-blue" aria-hidden="true" />

			{/* Rings stack */}
			<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
				<div className="relative">
					<div className="w-28 h-28 md:w-36 md:h-36 rounded-full ring-blue-glow" />
					<div className="absolute inset-0 rounded-full ring-blue" />
					<div className="absolute inset-0 rounded-full ring-ticks-blue" />
					<div className="absolute inset-0 rounded-full ring-blue-dots" />
					<div className="absolute inset-0 rounded-full ring-runner-blue" />
					<div className="absolute inset-[-6px] rounded-full ring-sheen-blue animate-spin-very-slow" />
					<div className="absolute inset-0 rounded-full shine-arc-blue" />
					<div className="absolute inset-0 rounded-full inner-shadow-blue" />
					<div className="absolute inset-0 rounded-full glass-circle-blue" />
				</div>
			</div>

			{/* Main 3D-ish text with inner glow flow */}
			<div className="relative flex items-center justify-center">
				<span className="text-5xl md:text-7xl font-extrabold tracking-tight text-glow-flow text-emboss-blue tilt-sway">
					MA
				</span>

				{/* Moving shine sweep */}
				<span className="absolute inset-x-[-20%] -top-2 h-10 pointer-events-none">
					<span className="block h-full w-1/3 bg-white/20 blur-md rounded-full animate-sweep" />
				</span>
			</div>

			{/* Reflection */}
			<div className="absolute left-1/2 top-full -translate-x-1/2 mt-2 scale-y-[-1] opacity-35 pointer-events-none">
				<span className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-br from-blue-300 via-blue-400 to-blue-200 bg-clip-text text-transparent blur-[1px] mask-fade-b">
					MA
				</span>
			</div>

			{/* Optional notches */}
			<div className="absolute -top-2 left-1/2 -translate-x-1/2 w-24 flex justify-between opacity-80">
				<span className="notch-blue" />
				<span className="notch-blue" />
				<span className="notch-blue" />
			</div>
			<div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 flex justify-between opacity-80">
				<span className="notch-blue" />
				<span className="notch-blue" />
				<span className="notch-blue" />
			</div>
		</div>
	);
};

export default Logo3D;

