import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'full' | 'icon';
}

export function Logo({ size = 'md', variant = 'full', className, ...props }: LogoProps) {
  const sizeClasses = {
    sm: 'h-6 w-6 text-xs',
    md: 'h-8 w-8 text-sm',
    lg: 'h-12 w-12 text-xl'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  return (
    <div className={cn('flex items-center gap-3', className)} {...props}>
      {/* Icône moderne avec gradient */}
      <div className={cn(
        'relative flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white font-bold shadow-lg',
        sizeClasses[size]
      )}>
        Rx
        <div className="absolute inset-0 rounded-xl bg-white/20 backdrop-blur-sm"></div>
      </div>
      
      {/* Texte du logo */}
      {variant === 'full' && (
        <span className={cn(
          'font-bold tracking-tight text-gray-900',
          textSizes[size]
        )}>
          PharmaFlow
        </span>
      )}
    </div>
  );
}