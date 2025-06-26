// src/app/planning/page.tsx
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { WeeklyPlanning } from '@/components/organisms/WeeklyPlanning/WeeklyPlanning';

export default function PlanningPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <Sidebar />
      <Header currentPage="Planning" />
      
      <div className="pl-20 pt-18">
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <WeeklyPlanning />
          </div>
        </div>
      </div>
    </div>
  );
}