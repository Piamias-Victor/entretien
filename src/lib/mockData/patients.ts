// src/lib/mockData/patients.ts - Correction des types optionnels
import { Patient, PatientStatus } from '@/types/patient';
import { InterviewTypeCode } from '@/types';

const firstNames = ['Marie', 'Jean', 'Sophie', 'Pierre', 'Claire', 'Michel', 'Emma', 'Paul', 'Anne', 'David'];
const lastNames = ['Dubois', 'Martin', 'Bernard', 'Durand', 'Rousseau', 'Blanc', 'Moreau', 'Girard', 'Lambert', 'Roux'];

const interviewTypes: InterviewTypeCode[] = ['AVK', 'AOD', 'Corticoide', 'BPM', 'Anticancereux', 'Antalgique'];

const generateMockPatient = (index: number): Patient => {
  const firstName = firstNames[index % firstNames.length];
  const lastName = lastNames[Math.floor(index / firstNames.length) % lastNames.length];
  const eligibleCount = Math.floor(Math.random() * 3) + 1;
  const eligibleTypes = interviewTypes.slice(0, eligibleCount);
  const totalInterviews = eligibleCount * 5;
  const completedInterviews = Math.floor(Math.random() * totalInterviews);
  
  let status: PatientStatus;
  if (completedInterviews === 0) status = 'not_started';
  else if (completedInterviews === totalInterviews) status = 'completed';
  else if (Math.random() > 0.8) status = 'overdue';
  else status = 'in_progress';

  // Correction pour les types optionnels
  const lastInterviewDate: Date | undefined = completedInterviews > 0 
    ? new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000) 
    : undefined;

  const nextInterviewDate: Date | undefined = status === 'in_progress' 
    ? new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000)
    : undefined;

  return {
    id: `patient-${index + 1}`,
    firstName,
    lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.fr`,
    age: 25 + Math.floor(Math.random() * 60),
    phone: `06 ${Math.floor(Math.random() * 90 + 10)} ${Math.floor(Math.random() * 90 + 10)} ${Math.floor(Math.random() * 90 + 10)} ${Math.floor(Math.random() * 90 + 10)}`,
    eligibleTypes,
    completedInterviews,
    totalInterviews,
    lastInterviewDate,
    nextInterviewDate,
    status,
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000)
  };
};

export const mockPatients: Patient[] = Array.from({ length: 45 }, (_, i) => generateMockPatient(i));