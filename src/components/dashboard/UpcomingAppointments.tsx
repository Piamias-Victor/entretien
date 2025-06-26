'use client';

import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AppointmentData } from '@/types/dashboard';

const upcomingAppointments: AppointmentData[] = [
  {
    id: '5',
    patientName: 'Claire Petit',
    patientInitials: 'CP',
    interviewType: 'AVK',
    time: 'Demain 09:30',
    status: 'scheduled'
  },
  {
    id: '6',
    patientName: 'Michel Blanc',
    patientInitials: 'MB',
    interviewType: 'BPM',
    time: 'Demain 11:00',
    status: 'scheduled'
  },
  {
    id: '7',
    patientName: 'Emma Moreau',
    patientInitials: 'EM',
    interviewType: 'Anticancereux',
    time: 'Jeudi 14:30',
    status: 'scheduled'
  },
  {
    id: '8',
    patientName: 'Paul Girard',
    patientInitials: 'PG',
    interviewType: 'AOD',
    time: 'Vendredi 10:00',
    status: 'scheduled'
  }
];

export function UpcomingAppointments() {
  const getTypeColor = (type: AppointmentData['interviewType']) => {
    const colors = {
      'AVK': 'bg-amber-50 text-amber-700 border-amber-200',
      'AOD': 'bg-blue-50 text-blue-700 border-blue-200',
      'Corticoide': 'bg-pink-50 text-pink-700 border-pink-200',
      'BPM': 'bg-emerald-50 text-emerald-700 border-emerald-200',
      'Anticancereux': 'bg-red-50 text-red-700 border-red-200',
      'Antalgique': 'bg-purple-50 text-purple-700 border-purple-200'
    };
    return colors[type];
  };

  return (
    <div className="bg-white/40 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <Calendar size={18} className="text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">
          À venir
        </h3>
      </div>
      
      {upcomingAppointments.length > 0 ? (
        <div className="space-y-3">
          {upcomingAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-gray-50/30 hover:bg-gray-50/50 transition-colors border border-gray-200/30"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-700 text-xs font-medium">
                {appointment.patientInitials}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium text-gray-900 text-sm truncate">
                    {appointment.patientName}
                  </p>
                  <span className="text-xs text-gray-500 flex-shrink-0">
                    {appointment.time}
                  </span>
                </div>
                
                <span className={cn(
                  'inline-flex px-2 py-0.5 text-xs font-medium rounded-md border',
                  getTypeColor(appointment.interviewType)
                )}>
                  {appointment.interviewType}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <Calendar size={24} className="text-gray-300 mx-auto mb-2" />
          <p className="text-gray-400 text-sm">Aucun rendez-vous programmé</p>
        </div>
      )}
    </div>
  );
}