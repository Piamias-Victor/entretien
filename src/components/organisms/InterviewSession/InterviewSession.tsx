// src/components/organisms/InterviewSession/InterviewSession.tsx - Correction erreurs ESLint
'use client';

import { useState } from 'react';
import { ArrowLeft, FileText, Mail, Calendar, CreditCard, PenTool, Save, CheckCircle } from 'lucide-react';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { Card } from '@/components/atoms/Card';
import { Input } from '@/components/atoms/Input';
import { useInterviewSession } from '@/hooks/interviews/useInterviewSession';
import { usePatientDetail } from '@/hooks/patients/usePatientDetail';
import { avkDocuments } from '@/lib/mockData/interview-documents';
import { InterviewDocument } from '@/types/interview-session';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface InterviewSessionProps {
  interviewId: string;
  patientId: string;
}

export function InterviewSession({ interviewId, patientId }: InterviewSessionProps) {
  const { patient } = usePatientDetail(patientId);
  const {
    session,
    sections,
    currentSection,
    setCurrentSection,
    updateResponse,
    updateSectionNotes,
    requestSignature,
    completeInterview,
    markAsBilled
  } = useInterviewSession(interviewId, patientId);

  const [activeTab, setActiveTab] = useState<'questions' | 'documents'>('questions');

  if (!patient) {
    return (
      <Card className="p-8 text-center">
        <p className="text-gray-500">Patient non trouvé</p>
      </Card>
    );
  }

  const getResponseValue = (questionId: string) => {
    const response = session.responses.find(r => r.questionId === questionId);
    return response?.response || '';
  };

  const getResponseNotes = (questionId: string) => {
    const response = session.responses.find(r => r.questionId === questionId);
    return response?.notes || '';
  };

  const handleQuestionResponse = (questionId: string, value: string | string[], notes?: string) => {
    updateResponse(questionId, value, notes);
  };

  const handleSectionNotesChange = (sectionId: string, notes: string) => {
    updateSectionNotes(sectionId, notes);
  };

  // CORRECTION : Typage strict au lieu de any
  const handleDownloadDocument = (doc: InterviewDocument) => {
    console.log('Downloading document:', doc.name);
    // TODO: Implement download
  };

  // CORRECTION : Typage strict au lieu de any
  const handleSendDocument = (doc: InterviewDocument) => {
    console.log('Sending document to patient:', doc.name);
    alert(`Document "${doc.name}" envoyé à ${patient.email}`);
  };

  const handleSendReport = () => {
    console.log('Sending interview report to patient');
    alert(`Compte-rendu d&apos;entretien envoyé à ${patient.email}`);
  };

  const currentSectionData = sections[currentSection];

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <button 
          onClick={() => window.history.back()}
          className="hover:text-gray-900 transition-colors"
        >
          Patients
        </button>
        <span>/</span>
        <button 
          onClick={() => window.history.go(-1)}
          className="hover:text-gray-900 transition-colors"
        >
          {patient.firstName} {patient.lastName}
        </button>
        <span>/</span>
        <span className="text-gray-900 font-medium">Entretien AVK</span>
      </div>

      {/* Header avec info patient */}
      <Card className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => window.history.back()}>
              <ArrowLeft size={16} />
              Retour
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Entretien AVK - {patient.firstName} {patient.lastName}
              </h1>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                <span>{patient.age} ans</span>
                <span>{patient.email}</span>
                <span>{patient.phone}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge className={cn(
              'font-medium',
              session.status === 'completed' ? 'bg-green-100 text-green-700' :
              session.status === 'billed' ? 'bg-blue-100 text-blue-700' :
              'bg-amber-100 text-amber-700'
            )}>
              {session.status === 'in_progress' ? 'En cours' :
               session.status === 'completed' ? 'Terminé' :
               session.status === 'billed' ? 'Facturé' : 'Brouillon'}
            </Badge>
            <span className="text-sm text-gray-500">
              Démarré: {formatDate(session.startTime)}
            </span>
          </div>
        </div>
      </Card>

      {/* Section Signature */}
      <Card className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <PenTool size={20} className="text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Signature du patient</h3>
              <p className="text-sm text-gray-600">
                {session.signatureRequested 
                  ? `Signature demandée le ${formatDate(session.signatureDate!)}`
                  : 'Demander la signature avant de commencer l&apos;entretien'
                }
              </p>
            </div>
          </div>
          
          {!session.signatureRequested ? (
            <Button variant="outline" onClick={requestSignature}>
              <PenTool size={16} />
              Demander signature
            </Button>
          ) : (
            <Badge className="bg-green-100 text-green-700 border border-green-200">
              <CheckCircle size={14} className="mr-1" />
              Signature obtenue
            </Badge>
          )}
        </div>
        
        {!session.signatureRequested && (
          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-sm text-amber-700">
              ⚠️ Il est recommandé de demander la signature du patient avant de débuter l&apos;entretien
            </p>
          </div>
        )}
      </Card>

      {/* Navigation Tabs */}
      <Card className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 shadow-lg">
        <div className="flex gap-6 border-b border-gray-200 mb-6">
          <button
            onClick={() => setActiveTab('questions')}
            className={cn(
              'pb-3 px-1 text-sm font-medium border-b-2 transition-colors',
              activeTab === 'questions' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            )}
          >
            Questions d&apos;entretien
          </button>
          <button
            onClick={() => setActiveTab('documents')}
            className={cn(
              'pb-3 px-1 text-sm font-medium border-b-2 transition-colors',
              activeTab === 'documents' 
                ? 'border-blue-500 text-blue-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700'
            )}
          >
            Documents
          </button>
        </div>

        {activeTab === 'questions' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Navigation sections */}
            <div className="lg:col-span-1">
              <h3 className="font-semibold text-gray-900 mb-3">Sections</h3>
              <div className="space-y-2">
                {sections.map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => setCurrentSection(index)}
                    className={cn(
                      'w-full text-left p-3 rounded-lg text-sm transition-colors',
                      currentSection === index 
                        ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    )}
                  >
                    <div className="font-medium">{section.title}</div>
                    <div className="text-xs opacity-75 mt-1">
                      {section.questions.length} questions
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Contenu section active */}
            <div className="lg:col-span-3">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {currentSectionData.title}
                </h2>
                {currentSectionData.description && (
                  <p className="text-gray-600">{currentSectionData.description}</p>
                )}
              </div>

              {/* Questions */}
              <div className="space-y-6">
                {currentSectionData.questions.map((question) => (
                  <div key={question.id} className="border-b border-gray-100 pb-6 last:border-0">
                    <h4 className="font-medium text-gray-900 mb-3">{question.question}</h4>
                    
                    {question.responseType === 'checkbox' && question.options && (
                      <div className="flex gap-4 mb-3">
                        {question.options.map((option) => (
                          <label key={option} className="flex items-center gap-2">
                            <input
                              type="radio"
                              name={question.id}
                              value={option}
                              checked={getResponseValue(question.id) === option}
                              onChange={(e) => handleQuestionResponse(question.id, e.target.value)}
                              className="text-blue-600"
                            />
                            <span className="text-sm font-medium">{option}</span>
                          </label>
                        ))}
                      </div>
                    )}

                    {question.responseType === 'text' && (
                      <Input
                        placeholder="Votre réponse..."
                        value={getResponseValue(question.id) as string}
                        onChange={(e) => handleQuestionResponse(question.id, e.target.value)}
                        className="mb-3"
                      />
                    )}

                    {/* Notes pour la question */}
                    <Input
                      placeholder="Notes complémentaires (optionnel)..."
                      value={getResponseNotes(question.id)}
                      onChange={(e) => handleQuestionResponse(
                        question.id, 
                        getResponseValue(question.id), 
                        e.target.value
                      )}
                      className="text-sm"
                    />
                  </div>
                ))}

                {/* Notes de section */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes pour cette section
                  </label>
                  <textarea
                    placeholder="Notes générales pour la section..."
                    value={session.sectionNotes[currentSectionData.id] || ''}
                    onChange={(e) => handleSectionNotesChange(currentSectionData.id, e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Documents d&apos;entretien AVK</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {avkDocuments.map((doc) => (
                <Card key={doc.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <FileText size={20} className="text-red-500 mt-1" />
                      <div>
                        <h4 className="font-medium text-gray-900">{doc.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                        <Badge className="bg-gray-100 text-gray-600 text-xs mt-2">
                          {doc.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDownloadDocument(doc)}
                      >
                        <FileText size={14} />
                        Télécharger
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => handleSendDocument(doc)}
                      >
                        <Mail size={14} />
                        Envoyer
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Actions finales */}
      <Card className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-200 shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => console.log('Manual save')}>
              <Save size={16} />
              Sauvegarder
            </Button>
            
            {session.status === 'in_progress' && (
              <Button variant="primary" onClick={completeInterview}>
                <CheckCircle size={16} />
                Terminer l&apos;entretien
              </Button>
            )}
          </div>

          <div className="flex gap-3">
            {session.status === 'completed' && (
              <>
                <Button variant="outline" onClick={handleSendReport}>
                  <Mail size={16} />
                  Envoyer compte-rendu
                </Button>
                
                <Button variant="outline">
                  <Calendar size={16} />
                  Planifier prochain
                </Button>
                
                <Button 
                  variant="primary" 
                  onClick={markAsBilled}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CreditCard size={16} />
                  Marquer facturé
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}