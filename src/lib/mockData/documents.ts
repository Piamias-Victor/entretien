// src/lib/mockData/documents.ts
import { PatientDocument } from '@/types/document';
import { mockPatients } from './patients';

const generateMockDocument = (patientId: string, index: number): PatientDocument => {
  const docTypes = ['prescription', 'ordonnance', 'compte-rendu', 'attestation'];
  const docType = docTypes[index % docTypes.length];
  
  return {
    id: `doc-${patientId}-${index}`,
    patientId,
    filename: `${docType}-${index + 1}.pdf`,
    originalName: `${docType}_patient_${index + 1}.pdf`,
    mimeType: 'application/pdf',
    size: Math.floor(Math.random() * 500000) + 100000,
    uploadDate: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000),
    downloadUrl: `/api/documents/${patientId}/${docType}-${index + 1}.pdf`
  };
};

export const mockDocuments: PatientDocument[] = mockPatients.flatMap(patient => 
  Array.from({ length: Math.floor(Math.random() * 4) + 1 }, (_, i) => 
    generateMockDocument(patient.id, i)
  )
);