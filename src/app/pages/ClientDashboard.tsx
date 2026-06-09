import { useNavigate } from 'react-router';
import { Sidebar } from '../components/Sidebar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Calendar, Clock, Plus, ArrowRight } from 'lucide-react';

export function ClientDashboard() {
  const navigate = useNavigate();

  const upcomingAppointments = [
    {
      id: 1,
      service: 'Corte de Cabelo',
      date: '2026-05-15',
      time: '10:00',
      professional: 'Carlos Silva',
      status: 'confirmed',
    },
    {
      id: 2,
      service: 'Massagem Relaxante',
      date: '2026-05-18',
      time: '14:30',
      professional: 'Ana Santos',
      status: 'confirmed',
    },
    {
      id: 3,
      service: 'Consulta Nutricional',
      date: '2026-05-22',
      time: '09:00',
      professional: 'Dr. Pedro Costa',
      status: 'pending',
    },
  ];

  const recentAppointments = [
    {
      id: 4,
      service: 'Limpeza de Pele',
      date: '2026-05-08',
      time: '15:00',
      status: 'completed',
    },
    {
      id: 5,
      service: 'Manicure',
      date: '2026-05-05',
      time: '11:30',
      status: 'completed',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'completed':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default:
        return 'bg-white/10 text-white/60 border-white/20';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmado';
      case 'pending':
        return 'Pendente';
      case 'completed':
        return 'Concluído';
      default:
        return status;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#050508]">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl text-white mb-2">Dashboard</h1>
              <p className="text-white/60">
                Bem-vindo de volta! Aqui estão seus próximos agendamentos.
              </p>
            </div>
            <Button onClick={() => navigate('/appointment/new')} className="gap-2">
              <Plus className="w-5 h-5" />
              Novo Agendamento
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <p className="text-2xl text-white">{upcomingAppointments.length}</p>
                  <p className="text-sm text-white/60">Próximos</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl text-white">{recentAppointments.length}</p>
                  <p className="text-sm text-white/60">Realizados</p>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl text-white">
                    {upcomingAppointments.length + recentAppointments.length}
                  </p>
                  <p className="text-sm text-white/60">Total</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl text-white">Próximos Agendamentos</h2>
            </div>
            <div className="space-y-3">
              {upcomingAppointments.map(appointment => (
                <Card
                  key={appointment.id}
                  className="hover:border-white/20 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                        <Calendar className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg text-white mb-1">{appointment.service}</h3>
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(appointment.date).toLocaleDateString('pt-BR')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {appointment.time}
                          </span>
                          <span>{appointment.professional}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-lg text-sm border ${getStatusColor(
                          appointment.status
                        )}`}
                      >
                        {getStatusLabel(appointment.status)}
                      </span>
                      <ArrowRight className="w-5 h-5 text-white/40" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl text-white">Histórico Recente</h2>
              <Button variant="ghost" onClick={() => navigate('/history')}>
                Ver tudo
              </Button>
            </div>
            <div className="space-y-3">
              {recentAppointments.map(appointment => (
                <Card
                  key={appointment.id}
                  className="hover:border-white/20 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center">
                        <Calendar className="w-7 h-7 text-white/60" />
                      </div>
                      <div>
                        <h3 className="text-lg text-white mb-1">{appointment.service}</h3>
                        <div className="flex items-center gap-4 text-sm text-white/60">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(appointment.date).toLocaleDateString('pt-BR')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {appointment.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-lg text-sm border ${getStatusColor(
                        appointment.status
                      )}`}
                    >
                      {getStatusLabel(appointment.status)}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
