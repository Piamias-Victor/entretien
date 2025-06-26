// src/app/patients/[id]/page.tsx - CORRECTION Next.js 15
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { PatientDetail } from '@/components/organisms/PatientDetail/PatientDetail';

interface PatientDetailPageProps {
  params: Promise<{ id: string }>; // CORRECTION: Promise pour Next.js 15
}

export default async function PatientDetailPage({ params }: PatientDetailPageProps) {
  const { id } = await params; // CORRECTION: await params
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <Sidebar />
      <Header />
      
      <div className="pl-20 pt-18">
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <PatientDetail patientId={id} />
          </div>
        </div>
      </div>
    </div>
  );
}