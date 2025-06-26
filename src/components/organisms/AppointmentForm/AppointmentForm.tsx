// src/components/organisms/AppointmentForm/AppointmentForm.tsx - Correction ligne 17
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { AppointmentFormData, Appointment } from '@/types/appointment'; // AJOUT import Appointment
import { InterviewTypeCode } from '@/types';
import { usePatients } from '@/hooks/patients/usePatients';
import { cn } from '@/lib/utils';

interface AppointmentFormProps {
  onSubmit: (data: AppointmentFormData & { patientName: string }) => void;
  onCancel: () => void;
  initialDate?: Date | undefined;
  initialTime?: string | undefined;
  editData?: Appointment | undefined; // CORRECTION : Type spécifique au lieu de any
}

const interviewTypes: { code: InterviewTypeCode; name: string; color: string }[] = [
  { code: 'AVK', name: 'AVK', color: 'bg-amber-100 text-amber-700' },
  { code: 'AOD', name: 'AOD', color: 'bg-blue-100 text-blue-700' },
  { code: 'Corticoide', name: 'Corticoïde', color: 'bg-pink-100 text-pink-700' },
  { code: 'BPM', name: 'BPM', color: 'bg-green-100 text-green-700' },
  { code: 'Anticancereux', name: 'Anticancéreux', color: 'bg-red-100 text-red-700' },
  { code: 'Antalgique', name: 'Antalgique', color: 'bg-purple-100 text-purple-700' }
];

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00'
];

export function AppointmentForm({ onSubmit, onCancel, initialDate, initialTime, editData }: AppointmentFormProps) {
  const { patients } = usePatients();

  const [formData, setFormData] = useState<AppointmentFormData>({
    patientId: editData?.patientId || '',
    interviewType: editData?.interviewType || 'AVK',
    date: editData?.date || initialDate || new Date(),
    startTime: editData?.startTime || initialTime || '09:00',
    duration: editData?.duration || 30,
    notes: editData?.notes || ''
  });

  const [patientSearch, setPatientSearch] = useState('');
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const filteredPatients = useMemo(() => {
    let eligible = patients.filter(patient => 
      patient.eligibleTypes.includes(formData.interviewType)
    );

    if (patientSearch) {
      const searchLower = patientSearch.toLowerCase();
      eligible = eligible.filter(patient => 
        `${patient.firstName} ${patient.lastName}`.toLowerCase().includes(searchLower)
      );
    }

    return eligible;
  }, [patients, formData.interviewType, patientSearch]);

  useEffect(() => {
    if (formData.patientId && !filteredPatients.find(p => p.id === formData.patientId)) {
      setFormData(prev => ({ ...prev, patientId: '' }));
      setPatientSearch('');
    }
  }, [formData.interviewType, filteredPatients, formData.patientId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    if (!formData.patientId) newErrors.patientId = 'Patient requis';
    if (!formData.startTime) newErrors.startTime = 'Heure requise';
    if (formData.duration < 30) newErrors.duration = 'Durée minimum 30 minutes';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const selectedPatient = patients.find(p => p.id === formData.patientId);
      const patientName = selectedPatient ? `${selectedPatient.firstName} ${selectedPatient.lastName}` : '';
      
      onSubmit({
        ...formData,
        patientName
      });
    }
  };

  const handlePatientSelect = (patientId: string) => {
    const selectedPatient = patients.find(p => p.id === patientId);
    if (selectedPatient) {
      setFormData(prev => ({ ...prev, patientId }));
      setPatientSearch(`${selectedPatient.firstName} ${selectedPatient.lastName}`);
      setShowPatientDropdown(false);
    }
  };

  const selectedPatient = patients.find(p => p.id === formData.patientId);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      
      {/* Type d'entretien */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Type d&apos;entretien *
        </label>
        <div className="grid grid-cols-3 gap-2">
          {interviewTypes.map((type) => (
            <button
              key={type.code}
              type="button"
              onClick={() => {
                setFormData(prev => ({ ...prev, interviewType: type.code }));
                setPatientSearch('');
              }}
              className={cn(
                'p-3 rounded-lg border transition-all duration-200 text-left',
                formData.interviewType === type.code
                  ? `${type.color} border-current`
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              )}
            >
              <div className="font-medium text-sm">{type.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Recherche patient */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Patient *
        </label>
        <Input
          placeholder="Rechercher un patient..."
          value={patientSearch}
          onChange={(e) => {
            setPatientSearch(e.target.value);
            setShowPatientDropdown(true);
            if (!e.target.value) {
              setFormData(prev => ({ ...prev, patientId: '' }));
            }
          }}
          onFocus={() => setShowPatientDropdown(true)}
          error={errors.patientId}
        />
        
        {showPatientDropdown && filteredPatients.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {filteredPatients.map((patient) => (
              <button
                key={patient.id}
                type="button"
                onClick={() => handlePatientSelect(patient.id)}
                className={cn(
                  'w-full text-left px-3 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-0',
                  formData.patientId === patient.id && 'bg-blue-50'
                )}
              >
                <div className="font-medium text-sm">
                  {patient.firstName} {patient.lastName}
                </div>
                <div className="text-xs text-gray-500">
                  {patient.age} ans • {patient.email}
                </div>
              </button>
            ))}
          </div>
        )}
        
        {selectedPatient && (
          <div className="mt-2 p-2 bg-blue-50 rounded-lg">
            <div className="text-sm text-blue-700">
              Entretiens réalisés: {selectedPatient.completedInterviews}/{selectedPatient.totalInterviews}
            </div>
          </div>
        )}
      </div>

      {/* Date et heure */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Input
            label="Date *"
            type="date"
            value={formData.date.toISOString().split('T')[0]}
            onChange={(e) => setFormData(prev => ({ ...prev, date: new Date(e.target.value) }))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Heure *
          </label>
          <select
            value={formData.startTime}
            onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {timeSlots.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Durée */}
      <div>
        <Input
          label="Durée (minutes) *"
          type="number"
          min="30"
          step="30"
          value={formData.duration}
          onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) || 30 }))}
          error={errors.duration}
        />
      </div>

      {/* Notes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Notes
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Notes optionnelles..."
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" variant="primary" className="flex-1">
          {editData ? 'Modifier' : 'Créer'} le rendez-vous
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
      </div>
    </form>
  );
}