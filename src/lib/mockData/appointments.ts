// src/lib/mockData/appointments.ts - Données simples
import { Appointment } from '@/types/appointment';
import { mockPatients } from './patients';

const generateMockAppointment = (index: number): Appointment => {
  const patient = mockPatients[Math.floor(Math.random() * mockPatients.length)];
  const type = patient.eligibleTypes[Math.floor(Math.random() * patient.eligibleTypes.length)];
  
  // Dates cette semaine
  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + Math.floor(Math.random() * 7));
  
  // Éviter dimanche
  if (futureDate.getDay() === 0) {
    futureDate.setDate(futureDate.getDate() + 1);
  }

  // Heures simples
  const hours = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];
  const startTime = hours[Math.floor(Math.random() * hours.length)];

  // Durées simples
  const durations = [30, 60];
  const duration = durations[Math.floor(Math.random() * durations.length)];

  return {
    id: `appointment-${index + 1}`,
    patientId: patient.id,
    patientName: `${patient.firstName} ${patient.lastName}`,
    interviewType: type,
    date: futureDate,
    startTime,
    duration,
    notes: '',
    createdAt: new Date(),
    updatedAt: new Date()
  };
};

export const mockAppointments: Appointment[] = Array.from({ length: 8 }, (_, i) => generateMockAppointment(i));