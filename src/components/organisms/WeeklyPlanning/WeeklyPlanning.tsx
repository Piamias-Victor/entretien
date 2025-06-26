// src/components/organisms/WeeklyPlanning/WeeklyPlanning.tsx - Corrections
'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { Card } from '@/components/atoms/Card';
import { AppointmentForm } from '../AppointmentForm/AppointmentForm';
import { usePlanning } from '@/hooks/planning/usePlanning';
import { AppointmentFormData } from '@/types/appointment';
import { cn } from '@/lib/utils';

export function WeeklyPlanning() {
  const {
    appointments,
    currentWeek,
    weekDays,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    goToNextWeek,
    goToPreviousWeek,
    goToToday
  } = usePlanning();

  const [showForm, setShowForm] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState<{ date: Date; time: string } | null>(null);

  // Étendu jusqu'à 20h (12 créneaux : 9h-20h)
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const getTypeColor = (type: string) => {
    const colors = {
      'AVK': 'bg-amber-100 text-amber-700 border-amber-200',
      'AOD': 'bg-blue-100 text-blue-700 border-blue-200',
      'Corticoide': 'bg-pink-100 text-pink-700 border-pink-200',
      'BPM': 'bg-green-100 text-green-700 border-green-200',
      'Anticancereux': 'bg-red-100 text-red-700 border-red-200',
      'Antalgique': 'bg-purple-100 text-purple-700 border-purple-200'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const hasConflict = (date: Date, startTime: string, duration: number, excludeId?: string) => {
    return appointments.some(apt => {
      if (excludeId && apt.id === excludeId) return false;
      
      const aptDate = new Date(apt.date);
      if (aptDate.toDateString() !== date.toDateString()) return false;
      
      const [startHour, startMin] = startTime.split(':').map(Number);
      const startMinutes = startHour * 60 + startMin;
      const endMinutes = startMinutes + duration;
      
      const [aptStartHour, aptStartMin] = apt.startTime.split(':').map(Number);
      const aptStartMinutes = aptStartHour * 60 + aptStartMin;
      const aptEndMinutes = aptStartMinutes + apt.duration;
      
      return startMinutes < aptEndMinutes && endMinutes > aptStartMinutes;
    });
  };

  const getAppointmentsForDay = (date: Date) => {
    return appointments.filter(apt => {
      const aptDate = new Date(apt.date);
      return aptDate.toDateString() === date.toDateString();
    });
  };

  const handleSlotClick = (date: Date, time: string) => {
    setSelectedSlot({ date, time });
    setEditingAppointment(null);
    setShowForm(true);
  };

  const handleEditAppointment = (appointment: any) => {
    setEditingAppointment(appointment);
    setSelectedSlot(null);
    setShowForm(true);
  };

  const handleDeleteAppointment = (appointmentId: string) => {
    if (confirm('Supprimer ce rendez-vous ?')) {
      deleteAppointment(appointmentId);
    }
  };

  const handleSubmitAppointment = (data: AppointmentFormData & { patientName: string }) => {
    console.log('Submitting appointment:', data); // DEBUG

    if (editingAppointment) {
      if (hasConflict(data.date, data.startTime, data.duration, editingAppointment.id)) {
        alert('Conflit avec un autre rendez-vous');
        return;
      }
      updateAppointment(editingAppointment.id, data);
    } else {
      if (hasConflict(data.date, data.startTime, data.duration)) {
        alert('Conflit avec un autre rendez-vous');
        return;
      }
      addAppointment(data);
    }
    
    setShowForm(false);
    setSelectedSlot(null);
    setEditingAppointment(null);
  };

  const handleDragStart = (e: React.DragEvent, appointment: any) => {
    e.dataTransfer.setData('text/plain', appointment.id);
  };

  const handleDrop = (e: React.DragEvent, date: Date, time: string) => {
    e.preventDefault();
    const appointmentId = e.dataTransfer.getData('text/plain');
    const appointment = appointments.find(apt => apt.id === appointmentId);
    
    if (!appointment) return;

    if (hasConflict(date, time, appointment.duration, appointmentId)) {
      alert('Conflit avec un autre rendez-vous');
      return;
    }

    updateAppointment(appointmentId, { date, startTime: time });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const formatWeekRange = () => {
    const start = weekDays[0];
    const end = weekDays[weekDays.length - 1];
    return `${start.getDate()} - ${end.getDate()} ${end.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}`;
  };

  return (
    <div className="space-y-6">
      {/* Header Navigation */}
      <Card variant="elevated" className="p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">Planning</h1>
            <Badge className="bg-blue-100 text-blue-700">
              {formatWeekRange()}
            </Badge>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={goToToday}>
              Aujourd&apos;hui
            </Button>
            <Button variant="outline" size="sm" onClick={goToPreviousWeek}>
              <ChevronLeft size={16} />
            </Button>
            <Button variant="outline" size="sm" onClick={goToNextWeek}>
              <ChevronRight size={16} />
            </Button>
            <Button variant="primary" onClick={() => {
              setSelectedSlot(null);
              setEditingAppointment(null);
              setShowForm(true);
            }}>
              <Plus size={16} />
              Nouveau RDV
            </Button>
          </div>
        </div>
      </Card>

      {/* Planning Grid */}
      <Card variant="elevated" className="overflow-hidden">
        {/* Header jours */}
        <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
          <div className="p-4 text-sm font-medium text-gray-600">Heures</div>
          {weekDays.map((date, index) => (
            <div key={index} className="p-4 text-center border-l border-gray-200">
              <div className="text-sm font-medium text-gray-900">
                {date.toLocaleDateString('fr-FR', { weekday: 'short' })}
              </div>
              <div className="text-xl font-bold text-gray-900 mt-1">
                {date.getDate()}
              </div>
            </div>
          ))}
        </div>

        {/* Grille horaires - Hauteur ajustée pour 12 créneaux */}
        <div className="grid grid-cols-7" style={{ maxHeight: '720px' }}>
          {/* Colonne des heures */}
          <div className="bg-gray-50">
            {timeSlots.map((time) => (
              <div key={time} className="h-16 p-3 border-b border-gray-200 text-sm font-medium text-gray-600 flex items-center">
                {time}
              </div>
            ))}
          </div>

          {/* Colonnes des jours */}
          {weekDays.map((date, dayIndex) => (
            <div key={dayIndex} className="border-l border-gray-200">
              {timeSlots.map((time) => {
                const dayAppointments = getAppointmentsForDay(date);
                const slotAppointments = dayAppointments.filter(apt => apt.startTime === time);

                return (
                  <div
                    key={time}
                    className="h-16 border-b border-gray-200 p-1 cursor-pointer hover:bg-blue-50 transition-colors relative"
                    onClick={() => handleSlotClick(date, time)}
                    onDrop={(e) => handleDrop(e, date, time)}
                    onDragOver={handleDragOver}
                  >
                    {slotAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, appointment)}
                        className={cn(
                          'absolute inset-1 rounded-md p-2 text-xs font-medium cursor-move border shadow-sm group',
                          getTypeColor(appointment.interviewType)
                        )}
                        style={{
                          height: `${(appointment.duration / 30) * 32}px`, // 32px = moitié de 64px (1h)
                          minHeight: '28px'
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1 min-w-0">
                            <div className="truncate font-semibold">
                              {appointment.patientName}
                            </div>
                            <div className="truncate opacity-80">
                              {appointment.interviewType}
                            </div>
                          </div>
                          
                          {/* Icônes actions */}
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditAppointment(appointment);
                              }}
                              className="p-1 rounded hover:bg-black/10 transition-colors"
                            >
                              <Edit size={12} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteAppointment(appointment.id);
                              }}
                              className="p-1 rounded hover:bg-black/10 transition-colors"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </Card>

      {/* Modal formulaire */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">
                {editingAppointment ? 'Modifier le rendez-vous' : 'Nouveau rendez-vous'}
              </h2>
              
              <AppointmentForm 
                onSubmit={handleSubmitAppointment}
                onCancel={() => {
                  setShowForm(false);
                  setSelectedSlot(null);
                  setEditingAppointment(null);
                }}
                initialDate={selectedSlot?.date || editingAppointment?.date}
                initialTime={selectedSlot?.time || editingAppointment?.startTime}
                editData={editingAppointment}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}