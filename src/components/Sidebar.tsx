// src/components/Sidebar.tsx - Modification pour état actif dynamique
'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation'; // AJOUT
import { LayoutDashboard, Calendar, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  count?: number;
}

// SUPPRESSION du "active: true" - sera calculé dynamiquement
const navItems: NavItem[] = [
  { 
    id: 'dashboard',
    label: 'Dashboard', 
    href: '/', 
    icon: LayoutDashboard, 
    count: 5
  },
  { 
    id: 'planning',
    label: 'Planning', 
    href: '/planning', 
    icon: Calendar,
    count: 12
  },
  { 
    id: 'patients',
    label: 'Patients', 
    href: '/patients', 
    icon: Users,
    count: 127
  },
];

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname(); // AJOUT

  // AJOUT: Fonction pour déterminer si un item est actif
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <aside 
      className={cn(
        'fixed left-0 top-0 z-50 h-screen transition-all duration-300 ease-in-out',
        'bg-white/70 backdrop-blur-xl border-r border-white/20',
        'shadow-xl shadow-black/5',
        isExpanded ? 'w-[280px]' : 'w-20'
      )}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex flex-col h-full">
        
        {/* Logo Section */}
        <div className="flex items-center h-16 px-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            {/* Logo Icon */}
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
              Rx
            </div>
            
            {/* Logo Text */}
            <div className={cn(
              'transition-all duration-300 ease-in-out overflow-hidden',
              isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'
            )}>
              <span className="text-lg font-bold text-gray-800 whitespace-nowrap">
                PharmaFlow
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const active = isActive(item.href); // MODIFICATION: calculé dynamiquement
            
            return (
              <a key={item.id}
                href={item.href}
                className={cn(
                  'group relative flex items-center rounded-xl transition-all duration-200',
                  'hover:bg-white/60 hover:shadow-md hover:shadow-black/5',
                  isExpanded ? 'px-4 py-3' : 'px-3 py-3 justify-center',
                  active // MODIFICATION: utilise la variable calculée
                    ? 'bg-blue-50/80 text-blue-700 shadow-sm border border-blue-200/50' 
                    : 'text-gray-600 hover:text-gray-800'
                )}
              >
                {/* Icon */}
                <IconComponent 
                  size={20} 
                  className={cn(
                    'transition-colors duration-200 shrink-0',
                    active ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700' // MODIFICATION
                  )}
                />
                
                {/* Label */}
                <div className={cn(
                  'transition-all duration-300 ease-in-out overflow-hidden',
                  isExpanded ? 'opacity-100 w-auto ml-3' : 'opacity-0 w-0'
                )}>
                  <span className="font-medium whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
                
                {/* Count Badge */}
                {item.count && (
                  <div className={cn(
                    'transition-all duration-300 ease-in-out',
                    isExpanded ? 'opacity-100 ml-auto' : 'opacity-0 absolute'
                  )}>
                    <span className={cn(
                      'px-2 py-0.5 text-xs font-medium rounded-full',
                      active // MODIFICATION
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-gray-100 text-gray-600'
                    )}>
                      {item.count}
                    </span>
                  </div>
                )}
                
                {/* Active Indicator */}
                {active && ( // MODIFICATION
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">          
          
          {/* User Profile */}
          <div className={cn(
            'flex items-center mt-4 transition-all duration-300 ease-in-out',
            isExpanded ? 'gap-3' : 'justify-center'
          )}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg">
              PM
            </div>
            
            <div className={cn(
              'transition-all duration-300 ease-in-out overflow-hidden',
              isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0'
            )}>
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-gray-800 whitespace-nowrap">
                  Pharmacie Martin
                </p>
                <p className="text-xs text-gray-500 whitespace-nowrap">
                  Connecté
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}