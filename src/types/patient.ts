// src/types/patient.ts - Mise à jour des types
import { InterviewTypeCode } from '@/types';

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone: string;
  eligibleTypes: InterviewTypeCode[];
  completedInterviews: number;
  totalInterviews: number;
  lastInterviewDate?: Date | undefined;  // Correction pour exactOptionalPropertyTypes
  nextInterviewDate?: Date | undefined;  // Correction pour exactOptionalPropertyTypes
  status: PatientStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type PatientStatus = 'not_started' | 'in_progress' | 'completed' | 'overdue';

export interface PatientFilters {
  search: string;
  eligibleTypes: InterviewTypeCode[];
  status: PatientStatus[];
  ageRange: {
    min: number;
    max: number;
  };
}

export interface PatientFormData {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone: string;
  eligibleTypes: InterviewTypeCode[];
}