// src/lib/mockData/interviews.ts
import { Interview } from '@/types/interview';
import { mockPatients } from './patients';

const generateMockInterview = (patientId: string, index: number): Interview => {
  const types = ['AVK', 'AOD', 'Corticoide', 'BPM'] as const;
  const type = types[index % types.length];
  
  const pastDate = new Date();
  pastDate.setDate(pastDate.getDate() - (index * 30));

  // Assignation explicite pour exactOptionalPropertyTypes
  const interview: Interview = {
    id: `interview-${patientId}-${index}`,
    patientId,
    type,
    scheduledDate: pastDate,
    completedDate: Math.random() > 0.3 ? pastDate : undefined,
    status: Math.random() > 0.3 ? 'completed' : 'scheduled',
    yearCycle: index < 3 ? 1 : 2,
    sequenceNumber: (index % 3) + 1,
    notes: index % 2 === 0 ? `Notes entretien ${type}` : undefined,
    amount: index < 3 ? 15 : 20,
    createdAt: pastDate
  };

  return interview;
};

export const mockInterviews: Interview[] = mockPatients.flatMap(patient => 
  Array.from({ length: Math.floor(Math.random() * 5) + 2 }, (_, i) => 
    generateMockInterview(patient.id, i)
  )
);