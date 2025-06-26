// src/lib/mockData/interview-documents.ts
import { InterviewDocument } from '@/types/interview-session';

export const avkDocuments: InterviewDocument[] = [
  {
    id: 'doc-1',
    name: 'Formulaire Entretien AVK',
    description: 'Formulaire officiel d\'entretien AVK à compléter',
    filename: 'formulaire-avk-entretien.pdf',
    downloadUrl: '/documents/avk/formulaire-entretien.pdf',
    category: 'formulaire'
  },
  {
    id: 'doc-2',
    name: 'Guide Patient AVK',
    description: 'Guide d\'information pour les patients sous AVK',
    filename: 'guide-patient-avk.pdf',
    downloadUrl: '/documents/avk/guide-patient.pdf',
    category: 'guide'
  },
  {
    id: 'doc-3',
    name: 'Carte de Suivi AVK',
    description: 'Modèle de carte de suivi pour le patient',
    filename: 'carte-suivi-avk.pdf',
    downloadUrl: '/documents/avk/carte-suivi.pdf',
    category: 'info'
  },
  {
    id: 'doc-4',
    name: 'Interactions Médicamenteuses',
    description: 'Liste des interactions médicamenteuses à éviter',
    filename: 'interactions-avk.pdf',
    downloadUrl: '/documents/avk/interactions.pdf',
    category: 'info'
  },
  {
    id: 'doc-5',
    name: 'Conseils Alimentaires',
    description: 'Recommandations alimentaires pour patients sous AVK',
    filename: 'conseils-alimentaires-avk.pdf',
    downloadUrl: '/documents/avk/conseils-alimentaires.pdf',
    category: 'guide'
  }
];