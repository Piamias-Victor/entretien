// src/components/organisms/PatientManagement/PatientManagement.tsx - Contraste amélioré
'use client';

import { useState } from 'react';
import { Search, Plus, Filter, Calendar, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const { patients, addPatient } = usePatients();
  const { filters, filteredPatients, updateSearch } = usePatientFilters(patients);
  const [showForm, setShowForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const handleAddPatient = (data: PatientFormData) => {
    addPatient(data);
    setShowForm(false);
  };

  const handleViewPatientDetail = (patientId: string) => {
    router.push(`/patients/${patientId}`);
  };

  const getStatusBadge = (patient: Patient) => {
    const statusConfig = {
      not_started: { label: 'Pas commencé', variant: 'bg-gray-200 text-gray-800 border border-gray-300' },
      in_progress: { label: 'En cours', variant: 'bg-blue-200 text-blue-800 border border-blue-300' },
      completed: { label: 'Terminé', variant: 'bg-green-200 text-green-800 border border-green-300' },
      overdue: { label: 'En retard', variant: 'bg-red-200 text-red-800 border border-red-300' }
    };
    const config = statusConfig[patient.status];
    return <Badge className={config.variant}>{config.label}</Badge>;
  };

  const getTypeColors = (type: string) => {
    const colors = {
      'AVK': {
        bg: 'bg-amber-100',
        text: 'text-amber-800',
        border: 'border-amber-300'
      },
      'AOD': {
        bg: 'bg-blue-100',
        text: 'text-blue-800',
        border: 'border-blue-300'
      },
      'Corticoide': {
        bg: 'bg-pink-100',
        text: 'text-pink-800',
        border: 'border-pink-300'
      },
      'BPM': {
        bg: 'bg-emerald-100',
        text: 'text-emerald-800',
        border: 'border-emerald-300'
      },
      'Anticancereux': {
        bg: 'bg-red-100',
        text: 'text-red-800',
        border: 'border-red-300'
      },
      'Antalgique': {
        bg: 'bg-purple-100',
        text: 'text-purple-800',
        border: 'border-purple-300'
      }
    };
    return colors[type as keyof typeof colors] || {
      bg: 'bg-gray-100',
      text: 'text-gray-800',
      border: 'border-gray-300'
    };
  };

  const getAvatarGradient = (initials: string) => {
    const gradients = [
      'from-blue-500 to-blue-600',
      'from-emerald-500 to-emerald-600',
      'from-purple-500 to-purple-600',
      'from-amber-500 to-amber-600',
      'from-pink-500 to-pink-600',
      'from-indigo-500 to-indigo-600',
      'from-teal-500 to-teal-600',
      'from-orange-500 to-orange-600'
    ];
    const index = initials.charCodeAt(0) % gradients.length;
    return gradients[index];
  };

  return (
    <div className="space-y-6">
      {/* Header avec contraste amélioré */}
      <Card className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-md">
              <Search size={18} className="text-white" />
            </div>
            <h1 className="text-lg font-bold text-gray-900">Patients</h1>
            <Badge className="bg-blue-100 text-blue-800 border border-blue-200 text-xs font-semibold rounded-full">
              {filteredPatients.length} patients
            </Badge>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="border-gray-300 hover:border-gray-400 hover:bg-gray-50"
            >
              <Filter size={16} />
              Filtres
            </Button>
            <Button 
              variant="primary" 
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 shadow-md"
            >
              <Plus size={16} />
              Nouveau patient
            </Button>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="relative flex-1">
            {/* CORRECTION : Icône search avec couleur visible */}
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Rechercher un patient..."
              value={filters.search}
              onChange={(e) => updateSearch(e.target.value)}
              className="pl-10 bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </Card>

      {/* Liste patients avec contraste amélioré */}
      <Card className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 shadow-lg">
        {filteredPatients.length > 0 ? (
          <div className="space-y-3">
            {filteredPatients.map((patient) => {
              const avatarGradient = getAvatarGradient(`${patient.firstName[0]}${patient.lastName[0]}`);
              const isCompleted = patient.status === 'completed';
              
              return (
                <div
                  key={patient.id}
                  className={cn(
                    'flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 cursor-pointer',
                    'hover:shadow-lg hover:-translate-y-1',
                    isCompleted 
                      ? 'bg-gray-50 border-gray-200 opacity-80' 
                      : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                  )}
                  onClick={() => handleViewPatientDetail(patient.id)}
                >
                  <div className="relative">
                    <div className={cn(
                      'w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center text-white font-bold text-sm shadow-lg',
                      avatarGradient
                    )}>
                      {patient.firstName[0]}{patient.lastName[0]}
                    </div>
                    {isCompleted && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center shadow-sm">
                        <CheckCircle2 size={10} className="text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <p className={cn(
                          'font-semibold text-sm',
                          isCompleted ? 'text-gray-600' : 'text-gray-900'
                        )}>
                          {patient.firstName} {patient.lastName}
                        </p>
                        <Badge className={cn(
                          'text-xs font-medium border',
                          isCompleted 
                            ? 'bg-gray-100 text-gray-600 border-gray-200' 
                            : 'bg-gray-100 text-gray-700 border-gray-300'
                        )}>
                          {patient.age} ans
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          'text-sm font-medium',
                          isCompleted ? 'text-gray-500' : 'text-gray-700'
                        )}>
                          {patient.completedInterviews}/{patient.totalInterviews} entretiens
                        </span>
                        {patient.lastInterviewDate && (
                          <div className="flex items-center gap-1">
                            <Calendar size={12} className="text-gray-500" />
                            <span className="text-xs text-gray-600">
                              {formatDate(patient.lastInterviewDate)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {patient.eligibleTypes.map((type) => {
                          const typeColors = getTypeColors(type);
                          return (
                            <Badge
                              key={type}
                              className={cn(
                                'text-xs font-semibold rounded-full border',
                                typeColors.bg,
                                typeColors.text,
                                typeColors.border
                              )}
                            >
                              {type}
                            </Badge>
                          );
                        })}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {getStatusBadge(patient)}
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewPatientDetail(patient.id);
                          }}
                          className="shrink-0 border-gray-300 hover:border-gray-400 hover:bg-gray-50 shadow-sm"
                        >
                          Voir détails
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
              <Search size={24} className="text-gray-600" />
            </div>
            <p className="text-gray-700 font-medium">Aucun patient trouvé</p>
            <p className="text-gray-500 text-sm mt-1">
              {filters.search ? 'Modifiez votre recherche' : 'Ajoutez votre premier patient'}
            </p>
          </div>
        )}
      </Card>

      {/* Modal nouveau patient */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
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