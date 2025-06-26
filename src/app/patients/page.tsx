// src/app/patients/page.tsx - Correction avec layout cohérent
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { PatientManagement } from '@/components/organisms/PatientManagement/PatientManagement';

export default function PatientsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <Sidebar />
      <Header currentPage="Patients" />
      
      <div className="pl-20 pt-18">
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <PatientManagement />
          </div>
        </div>
      </div>
    </div>
  );
}