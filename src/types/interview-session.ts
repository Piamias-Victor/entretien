// src/types/interview-session.ts - Correction pour exactOptionalPropertyTypes
import { InterviewTypeCode } from '@/types';

export interface InterviewQuestion {
  id: string;
  section: string;
  question: string;
  responseType: 'checkbox' | 'text' | 'select';
  options: string[] | undefined; // Correction
  required: boolean | undefined; // Correction
}

export interface QuestionResponse {
  questionId: string;
  response: string | string[];
  notes: string | undefined; // Correction explicite
}

export interface InterviewSection {
  id: string;
  title: string;
  description: string | undefined; // Correction
  questions: InterviewQuestion[];
  notes: string | undefined; // Correction
}

export interface InterviewSession {
  id: string;
  patientId: string;
  interviewType: InterviewTypeCode;
  status: 'draft' | 'in_progress' | 'completed' | 'billed';
  signatureRequested: boolean;
  signatureDate: Date | undefined; // Correction
  responses: QuestionResponse[];
  sectionNotes: Record<string, string>;
  globalNotes: string | undefined; // Correction
  startTime: Date;
  endTime: Date | undefined; // Correction
  pharmacistName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface InterviewDocument {
  id: string;
  name: string;
  description: string;
  filename: string;
  downloadUrl: string;
  category: 'formulaire' | 'guide' | 'info';
}