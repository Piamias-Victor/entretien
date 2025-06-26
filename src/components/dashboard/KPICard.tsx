'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { KPIData } from '@/types/dashboard';

interface KPICardProps {
  data: KPIData;
}

export function KPICard({ data }: KPICardProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const colorClasses = {
    blue: {
      bg: 'bg-slate-100/80',
      border: 'border-slate-200',
      hover: 'hover:bg-slate-200/80 hover:border-slate-300',
      value: 'text-slate-700',
      trend: 'text-blue-600',
      accent: 'bg-blue-500'
    },
    green: {
      bg: 'bg-slate-100/80',
      border: 'border-slate-200',
      hover: 'hover:bg-slate-200/80 hover:border-slate-300',
      value: 'text-slate-700',
      trend: 'text-emerald-600',
      accent: 'bg-emerald-500'
    },
    purple: {
      bg: 'bg-slate-100/80',
      border: 'border-slate-200',
      hover: 'hover:bg-slate-200/80 hover:border-slate-300',
      value: 'text-slate-700',
      trend: 'text-purple-600',
      accent: 'bg-purple-500'
    },
    amber: {
      bg: 'bg-slate-100/80',
      border: 'border-slate-200',
      hover: 'hover:bg-slate-200/80 hover:border-slate-300',
      value: 'text-slate-700',
      trend: 'text-amber-600',
      accent: 'bg-amber-500'
    },
    red: {
      bg: 'bg-slate-100/80',
      border: 'border-slate-200',
      hover: 'hover:bg-slate-200/80 hover:border-slate-300',
      value: 'text-slate-700',
      trend: 'text-red-600',
      accent: 'bg-red-500'
    }
  };

  const colors = colorClasses[data.color];

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className={cn(
        'h-24 p-4 rounded-2xl border transition-all duration-200 relative overflow-hidden',
        'group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-black/5',
        colors.bg,
        colors.border,
        colors.hover
      )}>
        {/* Accent coloré en haut */}
        <div className={cn('absolute top-0 left-0 right-0 h-1 rounded-t-2xl', colors.accent)}></div>
        
        <div className="flex items-center justify-between h-full">
          <div className="flex flex-col justify-center flex-1">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
              {data.title}
            </p>
            <div className="flex items-baseline gap-2">
              <p className={cn('text-xl font-bold', colors.value)}>
                {data.value}
              </p>
              {data.trend && (
                <span className={cn(
                  'text-xs font-semibold flex items-center gap-1',
                  data.trend.isPositive ? 'text-emerald-600' : 'text-red-500'
                )}>
                  <span>{data.trend.isPositive ? '↗' : '↘'}</span>
                  {data.trend.value}%
                </span>
              )}
            </div>
          </div>
          
          {/* Point coloré à droite */}
          <div className={cn('w-2 h-2 rounded-full', colors.accent)}></div>
        </div>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-2 bg-gray-900 text-white text-xs rounded-xl whitespace-nowrap z-50 shadow-lg">
          {data.description}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
}