// src/app/patients/[id]/layout.tsx
import { ReactNode } from 'react';

interface PatientDetailLayoutProps {
  children: ReactNode;
}

export default function PatientDetailLayout({ children }: PatientDetailLayoutProps) {
  return children;
}