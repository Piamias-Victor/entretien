// src/hooks/patients/usePatientInterviews.ts
import { useState, useMemo } from 'react';
import { InterviewProgress } from '@/types/interview';
import { InterviewTypeCode } from '@/types';
import { mockInterviews } from '@/lib/mockData/interviews';

export const usePatientInterviews = (patientId: string) => {
  const [selectedType, setSelectedType] = useState<InterviewTypeCode | 'all'>('all');

  const patientInterviews = useMemo(() => {
    return mockInterviews.filter(interview => interview.patientId === patientId);
  }, [patientId]);

  const filteredInterviews = useMemo(() => {
    if (selectedType === 'all') return patientInterviews;
    return patientInterviews.filter(interview => interview.type === selectedType);
  }, [patientInterviews, selectedType]);

  const interviewProgress = useMemo((): InterviewProgress[] => {
    const types: InterviewTypeCode[] = ['AVK', 'AOD', 'Corticoide', 'BPM', 'Anticancereux', 'Antalgique'];
    
    return types.map(type => {
      const typeInterviews = patientInterviews.filter(i => i.type === type);
      const year1Completed = typeInterviews.filter(i => i.yearCycle === 1 && i.status === 'completed').length;
      const year2Completed = typeInterviews.filter(i => i.yearCycle === 2 && i.status === 'completed').length;

      // Assignation explicite pour exactOptionalPropertyTypes
      const progress: InterviewProgress = {
        type,
        year1: {
          completed: year1Completed,
          total: 3,
          nextDueDate: year1Completed < 3 ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) : undefined
        },
        year2: {
          completed: year2Completed,
          total: 2,
          nextDueDate: year2Completed < 2 ? new Date(Date.now() + 45 * 24 * 60 * 60 * 1000) : undefined
        }
      };

      return progress;
    });
  }, [patientInterviews]);

  return {
    interviews: filteredInterviews,
    interviewProgress,
    selectedType,
    setSelectedType
  };
};