// src/hooks/patients/usePatients.ts - Suppression variable non utilisée
import { useState, useCallback } from 'react';
import { Patient, PatientFormData } from '@/types/patient';
import { mockPatients } from '@/lib/mockData/patients';

export const usePatients = () => {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  // Suppression de setLoading non utilisé
  const [selectedPatients, setSelectedPatients] = useState<string[]>([]);

  const addPatient = useCallback((patientData: PatientFormData) => {
    const newPatient: Patient = {
      id: `patient-${Date.now()}`,
      ...patientData,
      completedInterviews: 0,
      totalInterviews: patientData.eligibleTypes.length * 5,
      status: 'not_started',
      lastInterviewDate: undefined,
      nextInterviewDate: undefined,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setPatients(prev => [newPatient, ...prev]);
    return newPatient;
  }, []);

  const updatePatient = useCallback((id: string, updates: Partial<Patient>) => {
    setPatients(prev => prev.map(patient => 
      patient.id === id 
        ? { ...patient, ...updates, updatedAt: new Date() }
        : patient
    ));
  }, []);

  const togglePatientSelection = useCallback((id: string) => {
    setSelectedPatients(prev => 
      prev.includes(id) 
        ? prev.filter(selectedId => selectedId !== id)
        : [...prev, id]
    );
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedPatients([]);
  }, []);

  return {
    patients,
    selectedPatients,
    addPatient,
    updatePatient,
    togglePatientSelection,
    clearSelection
  };
};