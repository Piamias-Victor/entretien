// src/types/appointment.ts
import { InterviewTypeCode } from '@/types';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  interviewType: InterviewTypeCode;
  date: Date;
  startTime: string; // Format "09:30"
  duration: number; // En minutes
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AppointmentFormData {
  patientId: string;
  interviewType: InterviewTypeCode;
  date: Date;
  startTime: string;
  duration: number;
  notes: string;
}

export interface TimeSlot {
  time: string;
  hour: number;
  minute: number;
}

export interface WeekDay {
  date: Date;
  dayName: string;
  dayNumber: number;
  isToday: boolean;
  appointments: Appointment[];
}