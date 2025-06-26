// src/app/patients/[id]/page.tsx
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { PatientDetail } from '@/components/organisms/PatientDetail/PatientDetail';

interface PatientDetailPageProps {
  params: { id: string };
}

export default function PatientDetailPage({ params }: PatientDetailPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <Sidebar />
      <Header />
      
      <div className="pl-20 pt-18">
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <PatientDetail patientId={params.id} />
          </div>
        </div>
      </div>
    </div>
  );
}