'use client';

import { Clock, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AppointmentData } from '@/types/dashboard';

const todayAppointments: AppointmentData[] = [
  {
    id: '1',
    patientName: 'Marie Dubois',
    patientInitials: 'MD',
    interviewType: 'AVK',
    time: '09:00',
    status: 'completed',
    isToday: true
  },
  {
    id: '2',
    patientName: 'Jean Martin',
    patientInitials: 'JM',
    interviewType: 'BPM',
    time: '10:30',
    status: 'completed',
    isToday: true
  },
  {
    id: '3',
    patientName: 'Sophie Bernard',
    patientInitials: 'SB',
    interviewType: 'AOD',
    time: '14:00',
    status: 'scheduled',
    isToday: true
  },
  {
    id: '4',
    patientName: 'Pierre Durand',
    patientInitials: 'PD',
    interviewType: 'Corticoide',
    time: '16:30',
    status: 'scheduled',
    isToday: true
  },
  {
    id: '5',
    patientName: 'Claire Rousseau',
    patientInitials: 'CR',
    interviewType: 'Anticancereux',
    time: '17:15',
    status: 'scheduled',
    isToday: true
  }
];

export function TodayAgenda() {
  const getTypeColors = (type: AppointmentData['interviewType']) => {
    const colors = {
      'AVK': {
        bg: 'bg-amber-50/80',
        text: 'text-amber-700',
        border: 'border-amber-200'
      },
      'AOD': {
        bg: 'bg-blue-50/80',
        text: 'text-blue-700',
        border: 'border-blue-200'
      },
      'Corticoide': {
        bg: 'bg-pink-50/80',
        text: 'text-pink-700',
        border: 'border-pink-200'
      },
      'BPM': {
        bg: 'bg-emerald-50/80',
        text: 'text-emerald-700',
        border: 'border-emerald-200'
      },
      'Anticancereux': {
        bg: 'bg-red-50/80',
        text: 'text-red-700',
        border: 'border-red-200'
      },
      'Antalgique': {
        bg: 'bg-purple-50/80',
        text: 'text-purple-700',
        border: 'border-purple-200'
      }
    };
    return colors[type];
  };

  const getAvatarGradient = (initials: string) => {
    const gradients = [
      'from-blue-400 to-blue-500',
      'from-emerald-400 to-emerald-500',
      'from-purple-400 to-purple-500',
      'from-amber-400 to-amber-500',
      'from-pink-400 to-pink-500'
    ];
    const index = initials.charCodeAt(0) % gradients.length;
    return gradients[index];
  };

  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/40 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl">
          <Clock size={18} className="text-white" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">
          Aujourd&apos;hui
        </h3>
        <span className="px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200">
          {todayAppointments.length} entretiens
        </span>
      </div>
      
      {todayAppointments.length > 0 ? (
        <div className="space-y-3">
          {todayAppointments.map((appointment) => {
            const typeColors = getTypeColors(appointment.interviewType);
            const avatarGradient = getAvatarGradient(appointment.patientInitials);
            
            return (
              <div
                key={appointment.id}
                className={cn(
                  'flex items-center gap-4 p-4 rounded-xl border transition-all duration-200',
                  'hover:shadow-md hover:-translate-y-0.5',
                  appointment.status === 'completed' 
                    ? 'bg-slate-50/50 border-slate-200 opacity-75' 
                    : 'bg-white/80 border-white/60 hover:bg-white/90'
                )}
              >
                <div className="relative">
                  <div className={cn(
                    'w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-bold text-sm shadow-sm',
                    avatarGradient
                  )}>
                    {appointment.patientInitials}
                  </div>
                  {appointment.status === 'completed' && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                      <CheckCircle2 size={10} className="text-white" />
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <p className={cn(
                      'font-semibold text-sm',
                      appointment.status === 'completed' ? 'text-gray-600' : 'text-gray-900'
                    )}>
                      {appointment.patientName}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className={cn(
                        'text-sm font-medium',
                        appointment.status === 'completed' ? 'text-gray-500' : 'text-gray-700'
                      )}>
                        {appointment.time}
                      </span>
                      {appointment.status === 'scheduled' && (
                        <Circle size={6} className="text-blue-500 fill-current" />
                      )}
                    </div>
                  </div>
                  
                  <span className={cn(
                    'inline-flex px-3 py-1 text-xs font-semibold rounded-full border',
                    typeColors.bg,
                    typeColors.text,
                    typeColors.border
                  )}>
                    {appointment.interviewType}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
            <Clock size={24} className="text-gray-400" />
          </div>
          <p className="text-gray-500 font-medium">Aucun entretien aujourd&apos;hui</p>
          <p className="text-gray-400 text-sm mt-1">Profitez de cette journée libre !</p>
        </div>
      )}
    </div>
  );
}