// src/lib/mockData/interview-questions.ts - Ajout export manquant
import { InterviewSection } from '@/types/interview-session';

export const avkInterviewSections: InterviewSection[] = [
  {
    id: 'general-info',
    title: 'Informations Générales',
    description: 'Recueil des informations sur le patient et son traitement',
    questions: [
      {
        id: 'avk-prescribed',
        section: 'general-info',
        question: 'AVK prescrit et posologies',
        responseType: 'text',
        options: undefined,
        required: undefined
      },
      {
        id: 'other-treatments',
        section: 'general-info',
        question: 'Autres traitements prescrits au long cours',
        responseType: 'text',
        options: undefined,
        required: undefined
      },
      {
        id: 'supplements',
        section: 'general-info',
        question: 'Autres médicaments/compléments alimentaires consommés',
        responseType: 'text',
        options: undefined,
        required: undefined
      }
    ],
    notes: undefined
  },
  {
    id: 'treatment-knowledge',
    title: 'Notions Générales sur le Traitement AVK',
    description: 'Évaluation des connaissances du patient',
    questions: [
      {
        id: 'treatment-purpose',
        section: 'treatment-knowledge',
        question: 'Sait-il à quoi sert son traitement AVK ?',
        responseType: 'checkbox',
        options: ['A', 'PA', 'NA'],
        required: undefined
      },
      {
        id: 'why-prescribed',
        section: 'treatment-knowledge',
        question: 'Le patient sait-il pourquoi son AVK lui a été prescrit ?',
        responseType: 'checkbox',
        options: ['A', 'PA', 'NA'],
        required: undefined
      },
      {
        id: 'treatment-risks',
        section: 'treatment-knowledge',
        question: 'Sait-il que son traitement présente certains risques ?',
        responseType: 'checkbox',
        options: ['A', 'PA', 'NA'],
        required: undefined
      },
      {
        id: 'biological-monitoring',
        section: 'treatment-knowledge',
        question: 'Sait-il que son traitement requiert une surveillance biologique ?',
        responseType: 'checkbox',
        options: ['A', 'PA', 'NA'],
        required: undefined
      }
    ],
    notes: undefined
  },
  {
    id: 'observance',
    title: 'Observance du Traitement',
    description: 'Évaluation du respect du traitement par le patient',
    questions: [
      {
        id: 'knows-dose',
        section: 'observance',
        question: 'Le patient connaît-il la dose prescrite par son médecin ?',
        responseType: 'checkbox',
        options: ['A', 'PA', 'NA'],
        required: undefined
      },
      {
        id: 'respects-dose',
        section: 'observance',
        question: 'Si oui, la respecte-t-il ?',
        responseType: 'checkbox',
        options: ['A', 'PA', 'NA'],
        required: undefined
      },
      {
        id: 'knows-schedule',
        section: 'observance',
        question: 'Sait-il à quelle heure prendre le médicament et qu\'il faut le prendre tous les jours à la même heure ?',
        responseType: 'checkbox',
        options: ['A', 'PA', 'NA'],
        required: undefined
      },
      {
        id: 'forgets-treatment',
        section: 'observance',
        question: 'Le patient oublie-t-il parfois son traitement ?',
        responseType: 'checkbox',
        options: ['OUI', 'NON'],
        required: undefined
      },
      {
        id: 'what-if-forgot',
        section: 'observance',
        question: 'Sait-il quoi faire en cas d\'oubli d\'une dose ?',
        responseType: 'checkbox',
        options: ['A', 'PA', 'NA'],
        required: undefined
      }
    ],
    notes: undefined
  },
  {
    id: 'monitoring',
    title: 'Surveillance et Suivi',
    description: 'Carnet de suivi et surveillance biologique',
    questions: [
      {
        id: 'has-booklet',
        section: 'monitoring',
        question: 'Le patient a-t-il un carnet de suivi ?',
        responseType: 'checkbox',
        options: ['OUI', 'NON'],
        required: undefined
      },
      {
        id: 'notes-intake',
        section: 'monitoring',
        question: 'Sait-il qu\'il est important de noter les prises sur son carnet de suivi ?',
        responseType: 'checkbox',
        options: ['A', 'PA', 'NA'],
        required: undefined
      },
      {
        id: 'notes-missed',
        section: 'monitoring',
        question: 'Sait-il qu\'il est important de noter tout oubli éventuel dans son carnet ?',
        responseType: 'checkbox',
        options: ['A', 'PA', 'NA'],
        required: undefined
      },
      {
        id: 'laboratory',
        section: 'monitoring',
        question: 'Laboratoire habituel qui dose l\'INR du patient',
        responseType: 'text',
        options: undefined,
        required: undefined
      }
    ],
    notes: undefined
  },
  {
    id: 'daily-life',
    title: 'Vie Quotidienne',
    description: 'Habitudes de vie et interactions',
    questions: [
      {
        id: 'lifestyle-habits',
        section: 'daily-life',
        question: 'Habitudes de vie pouvant interférer (alimentation, alcool, tabac, activité physique, sport)',
        responseType: 'text',
        options: undefined,
        required: undefined
      },
      {
        id: 'other-health-professionals',
        section: 'daily-life',
        question: 'Quels autres professionnels de santé voit-il ?',
        responseType: 'text',
        options: undefined,
        required: undefined
      },
      {
        id: 'shows-card',
        section: 'daily-life',
        question: 'Leur présente-t-il sa carte "Je prends un traitement par AVK" ?',
        responseType: 'checkbox',
        options: ['OUI', 'NON'],
        required: undefined
      },
      {
        id: 'informs-interventions',
        section: 'daily-life',
        question: 'Sait-il qu\'il doit informer son médecin de toute intervention médicale ?',
        responseType: 'checkbox',
        options: ['OUI', 'NON'],
        required: undefined
      }
    ],
    notes: undefined
  }
];