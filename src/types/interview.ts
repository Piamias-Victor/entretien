// src/types/interview.ts
import { InterviewTypeCode } from '@/types';

export interface Interview {
  id: string;
  patientId: string;
  type: InterviewTypeCode;
  scheduledDate: Date;
  completedDate: Date | undefined; // Changement: suppression du ? pour exactOptionalPropertyTypes
  status: 'scheduled' | 'completed' | 'cancelled';
  yearCycle: 1 | 2;
  sequenceNumber: number;
  notes: string | undefined; // Changement: suppression du ? pour exactOptionalPropertyTypes
  amount: number;
  createdAt: Date;
}

export interface InterviewProgress {
  type: InterviewTypeCode;
  year1: {
    completed: number;
    total: number;
    nextDueDate: Date | undefined; // Changement: suppression du ? pour exactOptionalPropertyTypes
  };
  year2: {
    completed: number;
    total: number;
    nextDueDate: Date | undefined; // Changement: suppression du ? pour exactOptionalPropertyTypes
  };
}