import { type ClassValue, clsx } from 'clsx';

/**
 * Combine les classes CSS de manière conditionnelle
 * Utilise clsx pour une gestion optimale des classes
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Formate un prix en euros
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
}

/**
 * Formate une date en français
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

/**
 * Génère un ID unique simple
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

/**
 * Vérifie si une valeur est définie et non nulle
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}