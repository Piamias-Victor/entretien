// src/hooks/interviews/useInterviewSession.ts - Correction assignations explicites
import { useState, useCallback } from 'react';
import { InterviewSession, QuestionResponse } from '@/types/interview-session';
import { avkInterviewSections } from '@/lib/mockData/interview-questions';
import { useInterviewAutoSave } from './useInterviewAutoSave';

export const useInterviewSession = (interviewId: string, patientId: string) => {
  const [session, setSession] = useState<InterviewSession>({
    id: interviewId,
    patientId,
    interviewType: 'AVK',
    status: 'in_progress',
    signatureRequested: false,
    signatureDate: undefined, // Correction explicite
    responses: [],
    sectionNotes: {},
    globalNotes: undefined, // Correction explicite
    startTime: new Date(),
    endTime: undefined, // Correction explicite
    pharmacistName: 'Dr. Philippe Martin',
    createdAt: new Date(),
    updatedAt: new Date()
  });

  const [currentSection, setCurrentSection] = useState(0);

  // Auto-save hook
  useInterviewAutoSave({
    interviewId: session.id,
    responses: session.responses,
    sectionNotes: session.sectionNotes,
    globalNotes: session.globalNotes // Maintenant compatible
  });

  const updateResponse = useCallback((questionId: string, response: string | string[], notes?: string) => {
    setSession(prev => {
      const existingIndex = prev.responses.findIndex(r => r.questionId === questionId);
      
      // Assignation explicite pour exactOptionalPropertyTypes
      const newResponse: QuestionResponse = { 
        questionId, 
        response, 
        notes: notes || undefined // Correction explicite
      };
      
      const updatedResponses = existingIndex >= 0
        ? prev.responses.map((r, i) => i === existingIndex ? newResponse : r)
        : [...prev.responses, newResponse];

      return {
        ...prev,
        responses: updatedResponses,
        updatedAt: new Date()
      };
    });
  }, []);

  const updateSectionNotes = useCallback((sectionId: string, notes: string) => {
    setSession(prev => ({
      ...prev,
      sectionNotes: {
        ...prev.sectionNotes,
        [sectionId]: notes
      },
      updatedAt: new Date()
    }));
  }, []);

  const requestSignature = useCallback(() => {
    setSession(prev => ({
      ...prev,
      signatureRequested: true,
      signatureDate: new Date(),
      updatedAt: new Date()
    }));
  }, []);

  const completeInterview = useCallback(() => {
    setSession(prev => ({
      ...prev,
      status: 'completed',
      endTime: new Date(),
      updatedAt: new Date()
    }));
  }, []);

  const markAsBilled = useCallback(() => {
    setSession(prev => ({
      ...prev,
      status: 'billed',
      updatedAt: new Date()
    }));
  }, []);

  return {
    session,
    sections: avkInterviewSections,
    currentSection,
    setCurrentSection,
    updateResponse,
    updateSectionNotes,
    requestSignature,
    completeInterview,
    markAsBilled
  };
};