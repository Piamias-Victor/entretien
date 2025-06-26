// src/hooks/patients/usePatientFilters.ts
import { useState, useMemo } from 'react';
import { Patient, PatientFilters } from '@/types/patient';
import { InterviewTypeCode } from '@/types';

export const usePatientFilters = (patients: Patient[]) => {
  const [filters, setFilters] = useState<PatientFilters>({
    search: '',
    eligibleTypes: [],
    status: [],
    ageRange: { min: 0, max: 100 }
  });

  const filteredPatients = useMemo(() => {
    return patients.filter(patient => {
      // Recherche par nom/prénom
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const fullName = `${patient.firstName} ${patient.lastName}`.toLowerCase();
        if (!fullName.includes(searchLower)) return false;
      }

      // Filtre par types d'entretiens éligibles
      if (filters.eligibleTypes.length > 0) {
        const hasMatchingType = filters.eligibleTypes.some(type => 
          patient.eligibleTypes.includes(type)
        );
        if (!hasMatchingType) return false;
      }

      // Filtre par statut
      if (filters.status.length > 0) {
        if (!filters.status.includes(patient.status)) return false;
      }

      // Filtre par âge
      if (patient.age < filters.ageRange.min || patient.age > filters.ageRange.max) {
        return false;
      }

      return true;
    });
  }, [patients, filters]);

  const updateSearch = (search: string) => {
    setFilters(prev => ({ ...prev, search }));
  };

  const updateEligibleTypes = (eligibleTypes: InterviewTypeCode[]) => {
    setFilters(prev => ({ ...prev, eligibleTypes }));
  };

  const updateStatus = (status: Patient['status'][]) => {
    setFilters(prev => ({ ...prev, status }));
  };

  const updateAgeRange = (ageRange: { min: number; max: number }) => {
    setFilters(prev => ({ ...prev, ageRange }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      eligibleTypes: [],
      status: [],
      ageRange: { min: 0, max: 100 }
    });
  };

  return {
    filters,
    filteredPatients,
    updateSearch,
    updateEligibleTypes,
    updateStatus,
    updateAgeRange,
    clearFilters
  };
};