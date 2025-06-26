import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { InterviewStatus, InterviewTypeCode } from '@/types';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'status' | 'type' | 'default';
  status?: InterviewStatus;
  typeCode?: InterviewTypeCode;
}

const badgeStyles = {
  base: 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
  variants: {
    default: 'bg-gray-100 text-gray-800',
    status: {
      scheduled: 'bg-blue-100 text-blue-800 border border-blue-200',
      completed: 'bg-green-100 text-green-800 border border-green-200',
      invoiced: 'bg-amber-100 text-amber-800 border border-amber-200',
      cancelled: 'bg-red-100 text-red-800 border border-red-200'
    },
    type: {
      AVK: 'bg-yellow-100 text-yellow-800',
      AOD: 'bg-blue-100 text-blue-800',
      Corticoide: 'bg-pink-100 text-pink-800',
      BPM: 'bg-green-100 text-green-800',
      Anticancereux: 'bg-red-100 text-red-800',
      Antalgique: 'bg-purple-100 text-purple-800'
    }
  }
};

export function Badge({ 
  variant = 'default', 
  status, 
  typeCode, 
  className, 
  children, 
  ...props 
}: BadgeProps) {
  const getVariantStyles = () => {
    if (variant === 'status' && status) {
      return badgeStyles.variants.status[status];
    }
    if (variant === 'type' && typeCode) {
      return badgeStyles.variants.type[typeCode];
    }
    return badgeStyles.variants.default;
  };

  return (
    <span
      className={cn(badgeStyles.base, getVariantStyles(), className)}
      {...props}
    >
      {children || status || typeCode}
    </span>
  );
}