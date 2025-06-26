// src/components/organisms/PatientManagement/PatientManagement.tsx - Correction 'use client' + types
'use client';

import { useState } from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Badge } from '@/components/atoms/Badge';
import { Card } from '@/components/atoms/Card';
import { usePatients } from '@/hooks/patients/usePatients';
import { usePatientFilters } from '@/hooks/patients/usePatientFilters';
import { Patient, PatientFormData } from '@/types/patient';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { PatientForm } from '../PatientForm/PatientForm';

export function PatientManagement() {
  const { patients, addPatient } = usePatients();
  const { filters, filteredPatients, updateSearch } = usePatientFilters(patients);
  const [showForm, setShowForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const handleAddPatient = (data: PatientFormData) => {
    addPatient(data);
    setShowForm(false);
  };

  const getStatusBadge = (patient: Patient) => {
    const statusConfig = {
      not_started: { label: 'Pas commencé', color: 'bg-gray-100 text-gray-700' },
      in_progress: { label: 'En cours', color: 'bg-blue-100 text-blue-700' },
      completed: { label: 'Terminé', color: 'bg-green-100 text-green-700' },
      overdue: { label: 'En retard', color: 'bg-red-100 text-red-700' }
    };
    const config = statusConfig[patient.status];
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getTypesBadges = (types: string[]) => {
    const colors = {
      'AVK': 'bg-amber-100 text-amber-700',
      'AOD': 'bg-blue-100 text-blue-700', 
      'Corticoide': 'bg-pink-100 text-pink-700',
      'BPM': 'bg-green-100 text-green-700',
      'Anticancereux': 'bg-red-100 text-red-700',
      'Antalgique': 'bg-purple-100 text-purple-700'
    };
    return types.map(type => (
      <Badge key={type} className={cn('text-xs', colors[type as keyof typeof colors])}>
        {type}
      </Badge>
    ));
  };

  return (
    <div className="space-y-6">
      <Card variant="elevated" className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
              <Filter size={16} />
              Filtres
            </Button>
            <Button variant="primary" onClick={() => setShowForm(true)}>
              <Plus size={16} />
              Nouveau patient
            </Button>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Rechercher un patient..."
              value={filters.search}
              onChange={(e) => updateSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </Card>

      <Card variant="elevated" className="overflow-hidden">
        <div className="divide-y divide-gray-100">
          {filteredPatients.map((patient) => (
            <div key={patient.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 flex-1">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {patient.firstName[0]}{patient.lastName[0]}
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="font-semibold text-gray-900">
                      {patient.firstName} {patient.lastName}
                    </h3>
                    <p className="text-sm text-gray-600">{patient.age} ans</p>
                  </div>

                  <div className="flex gap-1 flex-wrap">
                    {getTypesBadges(patient.eligibleTypes)}
                  </div>

                  <div className="text-sm text-gray-600">
                    <div>{patient.completedInterviews}/{patient.totalInterviews} entretiens</div>
                    {patient.lastInterviewDate && (
                      <div className="text-xs">Dernier: {formatDate(patient.lastInterviewDate)}</div>
                    )}
                  </div>

                  {getStatusBadge(patient)}
                </div>

                <Button variant="outline" size="sm">
                  Voir détails
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">Nouveau patient</h2>
              <PatientForm 
                onSubmit={handleAddPatient}
                onCancel={() => setShowForm(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}