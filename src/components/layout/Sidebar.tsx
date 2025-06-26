'use client';

import { useState } from 'react';
import { Logo } from '@/components/atoms/Logo';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon: string;
  active?: boolean;
  count?: number;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/', icon: '📊', active: true },
  { label: 'Patients', href: '/patients', icon: '👥', count: 127 },
  { label: 'Entretiens', href: '/interviews', icon: '📋', count: 23 },
  { label: 'Planification', href: '/planning', icon: '📅' },
  { label: 'Facturation', href: '/billing', icon: '💰' },
  { label: 'Rapports', href: '/reports', icon: '📈' },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={cn(
      'fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300 shadow-sm',
      collapsed ? 'w-16' : 'w-72'
    )}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <Logo size={collapsed ? 'sm' : 'md'} variant={collapsed ? 'icon' : 'full'} />
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-700"
          >
            {collapsed ? '→' : '←'}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            
            <a  key={item.href}
              href={item.href}
              className={cn(
                'flex items-center rounded-xl text-sm font-medium transition-all duration-200 group',
                collapsed ? 'justify-center p-3' : 'gap-3 px-3 py-2.5',
                item.active 
                  ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <span className="text-lg shrink-0">{item.icon}</span>
              
              {!collapsed && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.count && (
                    <span className="px-2 py-0.5 text-xs bg-gray-200 text-gray-700 rounded-full font-medium">
                      {item.count}
                    </span>
                  )}
                </>
              )}
              
              {collapsed && item.count && (
                <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.count}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Footer avec métriques */}
        <div className="p-4 border-t border-gray-100">
          <div className={cn(
            'p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100',
            collapsed && 'text-center'
          )}>
            {!collapsed ? (
              <div className="space-y-2">
                <div className="text-xs font-medium text-blue-700 uppercase tracking-wider">
                  Revenus du mois
                </div>
                <div className="text-2xl font-bold text-blue-900">
                  2,480€
                </div>
                <div className="text-xs text-blue-600 flex items-center gap-1">
                  <span className="text-green-600">↗</span>
                  +12% vs mois dernier
                </div>
              </div>
            ) : (
              <div className="text-xl font-bold text-blue-700">€</div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}