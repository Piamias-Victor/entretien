// src/app/patients/layout.tsx - Layout requis pour Next.js
import { ReactNode } from 'react';

interface PatientsLayoutProps {
  children: ReactNode;
}

export default function PatientsLayout({ children }: PatientsLayoutProps) {
  return children;
}