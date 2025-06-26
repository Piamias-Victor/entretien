// src/hooks/patients/usePatientAppointments.ts
import { useState, useCallback } from 'react';
import { AppointmentFormData } from '@/types/appointment';
import { InterviewTypeCode } from '@/types';

export const usePatientAppointments = (patientId: string, patientName: string) => {
  const [isScheduling, setIsScheduling] = useState(false);
  const [selectedType, setSelectedType] = useState<InterviewTypeCode | null>(null);

  const startScheduling = useCallback((interviewType?: InterviewTypeCode) => {
    if (interviewType) {
      setSelectedType(interviewType);
    }
    setIsScheduling(true);
  }, []);

  const cancelScheduling = useCallback(() => {
    setIsScheduling(false);
    setSelectedType(null);
  }, []);

  const scheduleAppointment = useCallback((appointmentData: AppointmentFormData) => {
    console.log('Scheduling appointment for patient:', {
      ...appointmentData,
      patientId,
      patientName
    });
    
    // TODO: Intégrer avec l'API de planning
    // addAppointment({ ...appointmentData, patientId, patientName });
    
    setIsScheduling(false);
    setSelectedType(null);
    
    // Feedback utilisateur
    alert(`Entretien ${appointmentData.interviewType} planifié pour ${patientName}`);
  }, [patientId, patientName]);

  return {
    isScheduling,
    selectedType,
    startScheduling,
    cancelScheduling,
    scheduleAppointment
  };
};