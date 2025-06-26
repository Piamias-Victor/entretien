'use client';

import { useState } from 'react';
import { LogOut, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'flex items-center gap-2 px-2 py-2 rounded-xl transition-all duration-200',
          'bg-white/80 backdrop-blur-sm border border-gray-200/50',
          'hover:bg-white/90 hover:border-gray-300/60 hover:shadow-md',
          isOpen && 'bg-white/95 border-blue-300/60 shadow-lg'
        )}
      >
        {/* Status indicator */}
        <div className="relative">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center text-white font-semibold text-xs shadow-sm">
            PM
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
        </div>
        
        {/* User info compact */}
        <div className="text-left">
          <p className="text-sm font-medium text-gray-800">Dr. Martin</p>
        </div>
        
        <ChevronDown 
          size={14} 
          className={cn(
            'text-gray-500 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {/* Dropdown menu sans avatar */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-xl rounded-xl border border-gray-200/50 shadow-xl z-50">
          <div className="p-4 border-b border-gray-100/60">
            <div>
              <p className="font-semibold text-gray-900">Dr. Philippe Martin</p>
              <p className="text-sm text-gray-600 mt-1">philippe.martin@pharma.fr</p>
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                En ligne
              </p>
            </div>
          </div>
          
          <div className="py-2">
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50/60 transition-colors font-medium">
              <LogOut size={16} className="text-red-500" />
              Se déconnecter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}