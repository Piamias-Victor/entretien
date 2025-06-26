// src/app/interviews/[id]/page.tsx - CORRECTION Next.js 15
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { InterviewSession } from '@/components/organisms/InterviewSession/InterviewSession';

interface InterviewPageProps {
  params: Promise<{ id: string }>; // CORRECTION: Promise pour Next.js 15
}

export default async function InterviewPage({ params }: InterviewPageProps) {
  const { id } = await params; // CORRECTION: await params
  
  // Pour le moment, on simule l'extraction du patientId depuis l'ID d'entretien
  const mockPatientId = 'patient-1'; // TODO: Extraire depuis l'API
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <Sidebar />
      <Header />
      
      <div className="pl-20 pt-18">
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <InterviewSession 
              interviewId={id} 
              patientId={mockPatientId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}