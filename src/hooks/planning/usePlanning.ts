// src/hooks/planning/usePlanning.ts - Version simplifiée
import { useState, useCallback, useMemo } from 'react';
import { Appointment, AppointmentFormData } from '@/types/appointment';
import { mockAppointments } from '@/lib/mockData/appointments';

// Fonction simple pour obtenir les jours de la semaine
const getWeekDays = (date: Date): Date[] => {
  const startOfWeek = new Date(date);
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Lundi
  startOfWeek.setDate(diff);

  const weekDays: Date[] = [];
  for (let i = 0; i < 6; i++) { // Lundi à Samedi
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + i);
    weekDays.push(day);
  }
  return weekDays;
};

export const usePlanning = () => {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const weekDays = useMemo(() => getWeekDays(currentWeek), [currentWeek]);

  const weekAppointments = useMemo(() => {
    const startOfWeek = weekDays[0];
    const endOfWeek = weekDays[weekDays.length - 1];
    
    return appointments.filter(apt => {
      const aptDate = new Date(apt.date);
      return aptDate >= startOfWeek && aptDate <= endOfWeek;
    });
  }, [appointments, weekDays]);

  const addAppointment = useCallback((appointmentData: AppointmentFormData & { patientName: string }) => {
    const newAppointment: Appointment = {
      id: `appointment-${Date.now()}`,
      patientId: appointmentData.patientId,
      patientName: appointmentData.patientName,
      interviewType: appointmentData.interviewType,
      date: appointmentData.date,
      startTime: appointmentData.startTime,
      duration: appointmentData.duration,
      notes: appointmentData.notes,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setAppointments(prev => [...prev, newAppointment]);
    return newAppointment;
  }, []);

  const updateAppointment = useCallback((id: string, updates: Partial<Appointment>) => {
    setAppointments(prev => prev.map(apt => 
      apt.id === id 
        ? { ...apt, ...updates, updatedAt: new Date() }
        : apt
    ));
  }, []);

  const deleteAppointment = useCallback((id: string) => {
    setAppointments(prev => prev.filter(apt => apt.id !== id));
  }, []);

  const goToNextWeek = useCallback(() => {
    setCurrentWeek(prev => {
      const next = new Date(prev);
      next.setDate(prev.getDate() + 7);
      return next;
    });
  }, []);

  const goToPreviousWeek = useCallback(() => {
    setCurrentWeek(prev => {
      const previous = new Date(prev);
      previous.setDate(prev.getDate() - 7);
      return previous;
    });
  }, []);

  const goToToday = useCallback(() => {
    setCurrentWeek(new Date());
  }, []);

  return {
    appointments: weekAppointments,
    currentWeek,
    weekDays,
    addAppointment,
    updateAppointment,
    deleteAppointment,
    goToNextWeek,
    goToPreviousWeek,
    goToToday
  };
};