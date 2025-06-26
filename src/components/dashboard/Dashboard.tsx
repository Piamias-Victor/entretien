import { KPICard } from './KPICard';
import { QuickActions } from './QuickActions';
import { TodayAgenda } from './TodayAgenda';
import { KPIData } from '@/types/dashboard';

const kpiData: KPIData[] = [
  {
    id: 'patients',
    title: 'Patients',
    value: 127,
    description: 'Nombre total de patients suivis actuellement',
    icon: '👥',
    color: 'blue',
    trend: { value: 8, isPositive: true }
  },
  {
    id: 'appointments-week',
    title: 'Cette semaine',
    value: 23,
    description: 'Entretiens programmés cette semaine',
    icon: '📅',
    color: 'green',
    trend: { value: 15, isPositive: true }
  },
  {
    id: 'completion-rate',
    title: 'Réalisation',
    value: '94%',
    description: 'Taux de réalisation des entretiens',
    icon: '📈',
    color: 'purple',
    trend: { value: 2, isPositive: true }
  },
  {
    id: 'revenue',
    title: 'Revenus',
    value: '2,480€',
    description: 'Chiffre d\'affaires ce mois',
    icon: '💰',
    color: 'amber',
    trend: { value: 12, isPositive: true }
  },
  {
    id: 'invoiced',
    title: 'Facturés',
    value: 45,
    description: 'Entretiens facturés ce mois',
    icon: '✅',
    color: 'green'
  },
  {
    id: 'pending',
    title: 'En attente',
    value: 8,
    description: 'Entretiens à facturer',
    icon: '⏳',
    color: 'red'
  }
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Layout en grille : KPIs gauche + Actions droite */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* KPIs - 3 colonnes avec 3 lignes (2 KPIs par ligne) */}
        <div className="xl:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {kpiData.map((kpi) => (
              <KPICard key={kpi.id} data={kpi} />
            ))}
          </div>
        </div>
        
        {/* Actions rapides - 1 colonne */}
        <div className="xl:col-span-1">
          <QuickActions />
        </div>
      </div>

      {/* Planning du jour en pleine largeur */}
      <div>
        <TodayAgenda />
      </div>
    </div>
  );
}