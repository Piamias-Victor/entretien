// src/components/organisms/PatientDetail/PatientDetail.tsx - Version complète avec navigation entretien
'use client';

import { ArrowLeft, Edit, Plus, FileText, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { Card } from '@/components/atoms/Card';
import { PatientForm } from '../PatientForm/PatientForm';
import { AppointmentForm } from '../AppointmentForm/AppointmentForm';
import { usePatientDetail } from '@/hooks/patients/usePatientDetail';
import { usePatientInterviews } from '@/hooks/patients/usePatientInterviews';
import { usePatientAppointments } from '@/hooks/patients/usePatientAppointments';
import { mockDocuments } from '@/lib/mockData/documents';
import { formatDate } from '@/lib/utils';
import { PatientFormData } from '@/types/patient';
import { cn } from '@/lib/utils';
import { InterviewTypeCode } from '@/types';

interface PatientDetailProps {
  patientId: string;
}

export function PatientDetail({ patientId }: PatientDetailProps) {
  const router = useRouter();
  const { patient, isEditing, startEdit, cancelEdit, savePatient } = usePatientDetail(patientId);
  const { interviews, interviewProgress, selectedType, setSelectedType } = usePatientInterviews(patientId);
  
  // Hook pour la planification
  const {
    isScheduling,
    selectedType: schedulingType,
    startScheduling,
    cancelScheduling,
    scheduleAppointment
  } = usePatientAppointments(
    patientId, 
    patient ? `${patient.firstName} ${patient.lastName}` : ''
  );
  
  const patientDocuments = mockDocuments.filter(doc => doc.patientId === patientId);

  if (!patient) {
    return (
      <Card className="p-8 text-center">
        <p className="text-gray-500">Patient non trouvé</p>
      </Card>
    );
  }

  const getTypeColor = (type: string) => {
    const colors = {
      'AVK': 'bg-amber-100 text-amber-700',
      'AOD': 'bg-blue-100 text-blue-700',
      'Corticoide': 'bg-pink-100 text-pink-700',
      'BPM': 'bg-green-100 text-green-700',
      'Anticancereux': 'bg-red-100 text-red-700',
      'Antalgique': 'bg-purple-100 text-purple-700'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  const handleTypeFilterChange = (value: string) => {
    setSelectedType(value as InterviewTypeCode | 'all');
  };

  const getInitialFormData = (): PatientFormData => ({
    firstName: patient.firstName,
    lastName: patient.lastName,
    email: patient.email,
    age: patient.age,
    phone: patient.phone,
    eligibleTypes: patient.eligibleTypes
  });

  // Gestion planification depuis carte progression
  const handlePlanifyFromCard = (interviewType: InterviewTypeCode) => {
    startScheduling(interviewType);
  };

  // NOUVELLE FONCTION : Commencer un entretien
  const handleStartInterview = () => {
    // Générer un nouvel ID d'entretien
    const interviewId = `interview-${Date.now()}`;
    
    // Rediriger vers la page d'entretien
    router.push(`/interviews/${interviewId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header avec navigation */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => window.history.back()}>
          <ArrowLeft size={16} />
          Retour
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">
          {patient.firstName} {patient.lastName}
        </h1>
      </div>

      {/* Informations patient */}
      <Card variant="elevated" className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold">Informations patient</h2>
          <Button variant="outline" size="sm" onClick={startEdit}>
            <Edit size={16} />
            Modifier
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium">{patient.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Téléphone</p>
            <p className="font-medium">{patient.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Âge</p>
            <p className="font-medium">{patient.age} ans</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Types éligibles</p>
            <div className="flex gap-1 flex-wrap mt-1">
              {patient.eligibleTypes.map(type => (
                <Badge key={type} className={cn('text-xs', getTypeColor(type))}>
                  {type}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Éligibilités et progression */}
      <Card variant="elevated" className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Progression des entretiens</h2>
          {/* MODIFICATION : Bouton commencer entretien avec navigation */}
          <Button variant="primary" size="sm" onClick={handleStartInterview}>
            <Plus size={16} />
            Commencer entretien
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {interviewProgress.filter(progress => patient.eligibleTypes.includes(progress.type)).map(progress => (
            <div key={progress.type} className="p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <Badge className={getTypeColor(progress.type)}>{progress.type}</Badge>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handlePlanifyFromCard(progress.type)}
                >
                  <Calendar size={14} />
                  Planifier
                </Button>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Année 1:</span>
                  <span>{progress.year1.completed}/{progress.year1.total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Année 2:</span>
                  <span>{progress.year2.completed}/{progress.year2.total}</span>
                </div>
                {/* Indication prochaine échéance */}
                {progress.year1.nextDueDate && progress.year1.completed < progress.year1.total && (
                  <div className="text-xs text-blue-600 font-medium">
                    Prochain: {formatDate(progress.year1.nextDueDate)}
                  </div>
                )}
                {progress.year2.nextDueDate && progress.year1.completed === progress.year1.total && progress.year2.completed < progress.year2.total && (
                  <div className="text-xs text-purple-600 font-medium">
                    Année 2: {formatDate(progress.year2.nextDueDate)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Timeline entretiens */}
        <Card variant="elevated" className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Historique des entretiens</h2>
            <select 
              value={selectedType} 
              onChange={(e) => handleTypeFilterChange(e.target.value)}
              className="text-sm border rounded px-2 py-1"
            >
              <option value="all">Tous types</option>
              {patient.eligibleTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          {/* Padding x pour éviter que les boutons touchent les bords */}
          <div className="space-y-4 max-h-96 overflow-y-auto px-2">
            {interviews.map((interview, index) => (
              <div key={interview.id} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={cn(
                    'w-3 h-3 rounded-full',
                    interview.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                  )} />
                  {index < interviews.length - 1 && <div className="w-px h-8 bg-gray-300 mt-2" />}
                </div>
                
                <div className="flex-1 pb-4">
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex-1">
                      <p className="font-medium">{interview.type}</p>
                      <p className="text-sm text-gray-600">
                        {formatDate(interview.scheduledDate)}
                      </p>
                      {interview.notes && (
                        <p className="text-sm text-gray-500 mt-1">{interview.notes}</p>
                      )}
                    </div>
                    <Button variant="outline" size="sm" className="shrink-0">
                      Voir
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Documents */}
        <Card variant="elevated" className="p-6">
          <h2 className="text-xl font-semibold mb-4">Documents</h2>
          
          <div className="space-y-3">
            {patientDocuments.map(doc => (
              <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-red-500" />
                  <div>
                    <p className="font-medium text-sm">{doc.originalName}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(doc.uploadDate)} • {Math.round(doc.size / 1024)} KB
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Télécharger
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Modal planification d'entretien */}
      {isScheduling && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">
                Planifier un entretien - {patient.firstName} {patient.lastName}
              </h2>
              <AppointmentForm 
                onSubmit={scheduleAppointment}
                onCancel={cancelScheduling}
                initialDate={new Date()}
                initialTime="09:00"
                editData={{
                  patientId: patient.id,
                  patientName: `${patient.firstName} ${patient.lastName}`,
                  interviewType: schedulingType || patient.eligibleTypes[0],
                  date: new Date(),
                  startTime: '09:00',
                  duration: 30,
                  notes: ''
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal édition patient */}
      {isEditing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">Modifier le patient</h2>
              <PatientForm 
                onSubmit={savePatient}
                onCancel={cancelEdit}
                initialData={getInitialFormData()}
                isEditing={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}