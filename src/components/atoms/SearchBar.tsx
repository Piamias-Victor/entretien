'use client';

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export function SearchBar({ placeholder = "Rechercher...", className }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={cn(
      'relative transition-all duration-300 ease-in-out',
      isFocused ? 'w-80' : 'w-64',
      className
    )}>
      <div className={cn(
        'relative flex items-center transition-all duration-200',
        'bg-white/60 backdrop-blur-sm rounded-xl border',
        isFocused 
          ? 'border-blue-300/50 shadow-lg shadow-blue-500/10' 
          : 'border-white/30 hover:border-white/50'
      )}>
        <Search 
          size={18} 
          className={cn(
            'absolute left-3 transition-colors duration-200',
            isFocused ? 'text-blue-500' : 'text-gray-400'
          )}
        />
        
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={cn(
            'w-full pl-10 pr-10 py-2.5 bg-transparent text-sm',
            'placeholder:text-gray-400 text-gray-700',
            'focus:outline-none'
          )}
        />
        
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 p-1 rounded-md hover:bg-gray-100/50 transition-colors"
          >
            <X size={14} className="text-gray-400" />
          </button>
        )}
      </div>
    </div>
  );
}