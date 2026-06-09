import { useNavigate, useLocation } from 'react-router';
import { Calendar, Home, Clock, LogOut, Settings, User } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  isAdmin?: boolean;
}

export function Sidebar({ isAdmin = false }: SidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const clientLinks = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Calendar, label: 'Novo Agendamento', path: '/appointment/new' },
    { icon: Clock, label: 'Histórico', path: '/history' },
    { icon: User, label: 'Perfil', path: '/profile' },
  ];

  const adminLinks = [
    { icon: Home, label: 'Dashboard', path: '/admin' },
    { icon: Settings, label: 'Serviços', path: '/admin/services' },
    { icon: Clock, label: 'Histórico', path: '/history' },
  ];

  const links = isAdmin ? adminLinks : clientLinks;

  return (
    <div className="w-64 h-screen bg-[#0a0a0f] border-r border-white/5 flex flex-col">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl text-white">AgendaPro</span>
        </div>
      </div>

      <nav className="flex-1 px-3">
        {links.map(link => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;

          return (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all duration-200',
                isActive
                  ? 'bg-white/10 text-white'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{link.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button
          onClick={() => navigate('/')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span>Sair</span>
        </button>
      </div>
    </div>
  );
}
