'use client';

import { Users, Calendar, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

const quickActions = [
  {
    id: 'new-patient',
    title: 'Nouveau Patient',
    icon: Users,
    color: 'blue' as const,
    action: () => console.log('Nouveau patient')
  },
  {
    id: 'new-interview',
    title: 'Nouvel Entretien',
    icon: Plus,
    color: 'emerald' as const,
    action: () => console.log('Nouvel entretien')
  },
  {
    id: 'plan-interview',
    title: 'Planifier RDV',
    icon: Calendar,
    color: 'purple' as const,
    action: () => console.log('Planifier')
  }
];

export function QuickActions() {
  const colorClasses = {
    blue: 'bg-blue-500',
    emerald: 'bg-emerald-500',
    purple: 'bg-purple-500'
  };

  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-sm">
      <h3 className="text-lg font-bold text-gray-900 mb-6">
        Actions rapides
      </h3>
      
      <div className="space-y-4">
        {quickActions.map((action) => {
          const IconComponent = action.icon;
          
          return (
            <button
              key={action.id}
              onClick={action.action}
              className={cn(
                'w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200',
                'bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200',
                'hover:border-slate-300 hover:shadow-sm group relative overflow-hidden'
              )}
            >
              {/* Accent coloré à gauche */}
              <div className={cn('absolute left-0 top-0 bottom-0 w-1 rounded-l-xl', colorClasses[action.color])}></div>
              
              <div className="p-2 bg-white/80 rounded-lg group-hover:bg-white transition-colors shadow-sm">
                <IconComponent size={16} className="text-slate-600" />
              </div>
              
              <span className="font-semibold text-slate-700 text-sm">{action.title}</span>
              
              {/* Point coloré à droite */}
              <div className={cn('w-1.5 h-1.5 rounded-full ml-auto', colorClasses[action.color])}></div>
            </button>
          );
        })}
      </div>
    </div>
  );
}