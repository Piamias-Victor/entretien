import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { Dashboard } from '@/components/dashboard/Dashboard';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <Sidebar />
      <Header currentPage="Dashboard" />
      
      <div className="pl-20 pt-18">
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <Dashboard />
          </div>
        </div>
      </div>
    </div>
  );
}