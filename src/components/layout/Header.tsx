import { Logo } from '@/components/atoms/Logo';
import { Button } from '@/components/atoms/Button';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo et titre */}
        <div className="flex items-center gap-6">
          <Logo size="md" />
          <div className="hidden lg:block">
            <h1 className="text-sm font-medium text-gray-600 tracking-tight">
              Gestion des entretiens pharmaceutiques
            </h1>
          </div>
        </div>

        {/* Actions utilisateur */}
        <div className="flex items-center gap-4">
          {/* Status pharmacie */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-50 rounded-full border border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-700">Pharmacie Martin</span>
          </div>
          
          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <span className="text-lg">🔔</span>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>
          
          {/* Menu utilisateur */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              ⚙️
            </Button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-semibold shadow-sm">
              PM
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}