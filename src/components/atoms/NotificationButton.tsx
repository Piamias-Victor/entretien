'use client';

import { useState } from 'react';
import { Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

export function NotificationButton() {
  const [isOpen, setIsOpen] = useState(false);
  const notificationCount = 3;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'relative p-2.5 rounded-xl transition-all duration-200',
          'bg-white/80 backdrop-blur-sm border border-gray-200/50',
          'hover:bg-white/90 hover:border-gray-300/60 hover:shadow-md',
          isOpen && 'bg-white/95 border-blue-300/60 shadow-lg'
        )}
      >
        <Bell 
          size={20} 
          className={cn(
            'transition-colors duration-200',
            isOpen ? 'text-blue-600' : 'text-gray-700'
          )}
        />
        
        {notificationCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold shadow-sm">
            {notificationCount}
          </span>
        )}
      </button>

      {/* Dropdown notifications */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-xl border border-gray-200/50 shadow-xl z-50">
          <div className="p-4 border-b border-gray-100/60">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {[
              { title: 'Entretien programmé', desc: 'Marie Dubois - AVK demain 9h', time: '5 min' },
              { title: 'Rappel facturation', desc: '3 entretiens à facturer', time: '1h' },
              { title: 'Patient en attente', desc: 'Jean Martin souhaite reporter', time: '2h' }
            ].map((notif, index) => (
              <div key={index} className="p-4 hover:bg-gray-50/60 transition-colors cursor-pointer border-b border-gray-100/40 last:border-0">
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-sm">{notif.title}</p>
                    <p className="text-gray-600 text-xs mt-1">{notif.desc}</p>
                  </div>
                  <span className="text-xs text-gray-500">{notif.time}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t border-gray-100/60">
            <button className="w-full text-center text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
              Voir toutes les notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}