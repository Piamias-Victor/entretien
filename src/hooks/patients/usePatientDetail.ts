// src/hooks/patients/usePatientDetail.ts
import { useState, useCallback } from 'react';
import { Patient, PatientFormData } from '@/types/patient';
import { mockPatients } from '@/lib/mockData/patients';

export const usePatientDetail = (patientId: string) => {
  const [patient, setPatient] = useState<Patient | null>(
    mockPatients.find(p => p.id === patientId) || null
  );
  const [isEditing, setIsEditing] = useState(false);

  const updatePatient = useCallback((updates: Partial<PatientFormData>) => {
    if (patient) {
      setPatient(prev => prev ? { 
        ...prev, 
        ...updates, 
        updatedAt: new Date() 
      } : null);
    }
  }, [patient]);

  const startEdit = useCallback(() => {
    setIsEditing(true);
  }, []);

  const cancelEdit = useCallback(() => {
    setIsEditing(false);
  }, []);

  const savePatient = useCallback((data: PatientFormData) => {
    updatePatient(data);
    setIsEditing(false);
  }, [updatePatient]);

  return {
    patient,
    isEditing,
    startEdit,
    cancelEdit,
    savePatient
  };
};