// src/components/organisms/PatientForm/PatientForm.tsx - Correction error props
'use client';

import { useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { PatientFormData } from '@/types/patient';
import { InterviewTypeCode } from '@/types';
import { cn } from '@/lib/utils';

interface PatientFormProps {
  onSubmit: (data: PatientFormData) => void;
  onCancel: () => void;
}

const interviewTypes: { code: InterviewTypeCode; name: string; color: string }[] = [
  { code: 'AVK', name: 'AVK', color: 'bg-amber-100 text-amber-700' },
  { code: 'AOD', name: 'AOD', color: 'bg-blue-100 text-blue-700' },
  { code: 'Corticoide', name: 'Corticoïde', color: 'bg-pink-100 text-pink-700' },
  { code: 'BPM', name: 'BPM', color: 'bg-green-100 text-green-700' },
  { code: 'Anticancereux', name: 'Anticancéreux', color: 'bg-red-100 text-red-700' },
  { code: 'Antalgique', name: 'Antalgique', color: 'bg-purple-100 text-purple-700' }
];

export function PatientForm({ onSubmit, onCancel }: PatientFormProps) {
  const [formData, setFormData] = useState<PatientFormData>({
    firstName: '',
    lastName: '',
    email: '',
    age: 0,
    phone: '',
    eligibleTypes: []
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    if (!formData.firstName) newErrors.firstName = 'Prénom requis';
    if (!formData.lastName) newErrors.lastName = 'Nom requis';
    if (!formData.email) newErrors.email = 'Email requis';
    if (formData.age < 1) newErrors.age = 'Âge requis';
    if (formData.eligibleTypes.length === 0) newErrors.eligibleTypes = 'Au moins un type requis';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  };

  const toggleEligibleType = (type: InterviewTypeCode) => {
    setFormData(prev => ({
      ...prev,
      eligibleTypes: prev.eligibleTypes.includes(type)
        ? prev.eligibleTypes.filter(t => t !== type)
        : [...prev.eligibleTypes, type]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Prénom"
          value={formData.firstName}
          onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
          error={errors.firstName}
          isRequired
        />
        <Input
          label="Nom"
          value={formData.lastName}
          onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
          error={errors.lastName}
          isRequired
        />
      </div>

      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
        error={errors.email}
        isRequired
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Âge"
          type="number"
          value={formData.age === 0 ? '' : formData.age.toString()}
          onChange={(e) => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
          error={errors.age}
          isRequired
        />
        <Input
          label="Téléphone"
          value={formData.phone}
          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          placeholder="06 12 34 56 78"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Types d&apos;entretiens éligibles *
        </label>
        <div className="grid grid-cols-2 gap-2">
          {interviewTypes.map((type) => (
            <button
              key={type.code}
              type="button"
              onClick={() => toggleEligibleType(type.code)}
              className={cn(
                'p-3 rounded-lg border transition-all duration-200 text-left',
                formData.eligibleTypes.includes(type.code)
                  ? `${type.color} border-current`
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              )}
            >
              <div className="font-medium text-sm">{type.name}</div>
            </button>
          ))}
        </div>
        {errors.eligibleTypes && (
          <p className="text-xs text-red-600 mt-1">{errors.eligibleTypes}</p>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" variant="primary" className="flex-1">
          Créer le patient
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
      </div>
    </form>
  );
}