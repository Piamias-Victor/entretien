// src/hooks/planning/useDragAndDrop.ts - Éviter duplication lors drag
import { useCallback } from 'react';
import { Appointment } from '@/types/appointment';
import { isTimeInRange } from '@/lib/utils/dateUtils';

interface UseDragAndDropProps {
  onUpdateAppointment: (id: string, updates: Partial<Appointment>) => void;
}

export const useDragAndDrop = ({ onUpdateAppointment }: UseDragAndDropProps) => {
  const handleDragStart = useCallback((e: React.DragEvent, appointment: Appointment) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({
      appointmentId: appointment.id,
      originalDate: appointment.date.toISOString(),
      originalTime: appointment.startTime
    }));
    e.dataTransfer.effectAllowed = 'move';
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, newDate: Date, newTime: string) => {
    e.preventDefault();
    
    try {
      const dragData = JSON.parse(e.dataTransfer.getData('text/plain'));
      const { appointmentId, originalDate, originalTime } = dragData;

      // Éviter le drop sur la même position
      if (originalDate === newDate.toISOString() && originalTime === newTime) {
        return;
      }

      // Validation: heures d'ouverture (7h-20h)
      if (!isTimeInRange(newTime, '07:00', '20:00')) {
        console.warn('Heure en dehors des heures d\'ouverture');
        return;
      }

      // Validation: pas le dimanche
      if (newDate.getDay() === 0) {
        console.warn('Pas de RDV le dimanche');
        return;
      }

      onUpdateAppointment(appointmentId, {
        date: newDate,
        startTime: newTime
      });
    } catch (error) {
      console.error('Erreur lors du drop:', error);
    }
  }, [onUpdateAppointment]);

  return {
    handleDragStart,
    handleDragOver,
    handleDrop
  };
};