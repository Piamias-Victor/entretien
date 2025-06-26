export interface KPIData {
  id: string;
  title: string;
  value: string | number;
  description: string;
  icon: string; // Gardé pour compatibilité mais non utilisé
  color: 'blue' | 'green' | 'purple' | 'amber' | 'red';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export interface AppointmentData {
  id: string;
  patientName: string;
  patientInitials: string;
  interviewType: 'AVK' | 'AOD' | 'Corticoide' | 'BPM' | 'Anticancereux' | 'Antalgique';
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  isToday?: boolean;
}

export interface QuickActionData {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: 'blue' | 'green' | 'purple';
  action: () => void;
}