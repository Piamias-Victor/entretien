// Types de base pour l'application PharmaFlow

/**
 * Types d'entretiens pharmaceutiques
 */
export type InterviewTypeCode = 
  | 'AVK' 
  | 'AOD' 
  | 'Corticoide' 
  | 'BPM' 
  | 'Anticancereux' 
  | 'Antalgique';

/**
 * Statuts des entretiens
 */
export type InterviewStatus = 
  | 'scheduled'   // Programmé
  | 'completed'   // Réalisé
  | 'invoiced'    // Facturé
  | 'cancelled';  // Annulé

/**
 * Années de cycle d'entretien
 */
export type YearCycle = 1 | 2;

/**
 * Interface pour les types d'entretiens
 */
export interface InterviewType {
  id: string;
  code: InterviewTypeCode;
  name: string;
  description?: string;
  isActive: boolean;
}

/**
 * Interface patient de base
 */
export interface Patient {
  id: string;
  email: string;
  name: string;
  phone: string;
  age: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Interface pour les éligibilités patient
 */
export interface PatientEligibility {
  id: string;
  patientId: string;
  interviewTypeId: string;
  createdAt: Date;
}

/**
 * Interface entretien
 */
export interface Interview {
  id: string;
  patientId: string;
  interviewTypeId: string;
  scheduledDate: Date;
  completedDate?: Date;
  notes?: string;
  status: InterviewStatus;
  yearCycle: YearCycle;
  sequenceNumber: number;
  amount: number;
  isInvoiced: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Types d'API Response générique
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Props communes pour les composants
 */
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}