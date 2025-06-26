// src/app/interviews/[id]/layout.tsx
import { ReactNode } from 'react';

interface InterviewLayoutProps {
  children: ReactNode;
}

export default function InterviewLayout({ children }: InterviewLayoutProps) {
  return children;
}