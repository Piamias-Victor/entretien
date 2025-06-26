// src/types/document.ts
export interface PatientDocument {
  id: string;
  patientId: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  uploadDate: Date;
  downloadUrl: string;
}