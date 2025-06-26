// src/hooks/interviews/useInterviewAutoSave.ts - Correction globalNotes optionnel
import { useEffect, useCallback } from 'react';
import { QuestionResponse } from '@/types/interview-session';

interface UseInterviewAutoSaveProps {
  interviewId: string;
  responses: QuestionResponse[];
  sectionNotes: Record<string, string>;
  globalNotes: string | undefined; // Correction explicite
}

export const useInterviewAutoSave = ({
  interviewId,
  responses,
  sectionNotes,
  globalNotes
}: UseInterviewAutoSaveProps) => {
  
  const saveInterview = useCallback(async () => {
    try {
      console.log('Auto-saving interview:', {
        interviewId,
        responses,
        sectionNotes,
        globalNotes,
        timestamp: new Date().toISOString()
      });
      
      // TODO: Appel API pour sauvegarder
      // await updateInterview(interviewId, { responses, sectionNotes, globalNotes });
      
    } catch (error) {
      console.error('Error auto-saving interview:', error);
    }
  }, [interviewId, responses, sectionNotes, globalNotes]);

  // Auto-save toutes les 30 secondes si des changements
  useEffect(() => {
    const interval = setInterval(() => {
      if (responses.length > 0 || Object.keys(sectionNotes).length > 0) {
        saveInterview();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [saveInterview, responses, sectionNotes]);

  // Save immédiat sur changement
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveInterview();
    }, 2000); // 2 secondes après le dernier changement

    return () => clearTimeout(timeoutId);
  }, [responses, sectionNotes, globalNotes, saveInterview]);

  return { saveInterview };
};