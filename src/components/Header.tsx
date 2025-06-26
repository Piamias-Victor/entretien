'use client';

import { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import { NotificationButton } from './atoms/NotificationButton';
import { UserMenu } from './atoms/UserMenu';
import { cn } from '@/lib/utils';

interface HeaderProps {
  currentPage?: string;
}

export function Header({ currentPage = 'Dashboard' }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      'sticky top-0 z-40 w-full h-[7vh] transition-all duration-300',
      'bg-white/75 backdrop-blur-xl border-b border-gray-200/50',
      'shadow-sm shadow-black/5',
      isScrolled && 'shadow-md shadow-black/10'
    )}>
      <div className="flex items-center justify-between h-full px-6">
        
        {/* Left side - Page title */}
        <div className="flex items-center gap-6 min-w-0 flex-1">
          {/* Sidebar space */}
          <div className="w-20 shrink-0"></div>
          
          {/* Page info */}
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-gray-900 truncate">
              {currentPage}
            </h1>
          </div>
        </div>

        {/* Right side - Actions avec boutons plus visibles */}
        <div className="flex items-center gap-4">
          {/* Settings button */}
          <button className={cn(
            'p-2.5 rounded-xl transition-all duration-200',
            'bg-white/80 backdrop-blur-sm border border-gray-200/50',
            'hover:bg-white/90 hover:border-gray-300/60 hover:shadow-md'
          )}>
            <Settings size={20} className="text-gray-700" />
          </button>

          {/* Notifications */}
          <NotificationButton />

          {/* User menu */}
          <UserMenu />
        </div>
      </div>
    </header>
  );
}