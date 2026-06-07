import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Calendar, Clock, CheckCircle2, XCircle, AlertCircle, Filter } from 'lucide-react';

export function History() {
  const [filter, setFilter] = useState('all');

  const appointments = [
    {
      id: 1,
      service: 'Corte de Cabelo',
      date: '2026-05-08',
      time: '10:00',
      professional: 'Carlos Silva',
      price: 'R$ 50,00',
      status: 'completed',
    },
    {
      id: 2,
      service: 'Massagem Relaxante',
      date: '2026-05-05',
      time: '14:30',
      professional: 'Ana Santos',
      price: 'R$ 120,00',
      status: 'completed',
    },
    {
      id: 3,
      service: 'Consulta Nutricional',
      date: '2026-05-03',
      time: '09:00',
      professional: 'Dr. Pedro Costa',
      price: 'R$ 150,00',
      status: 'cancelled',
    },
    {
      id: 4,
      service: 'Limpeza de Pele',
      date: '2026-04-28',
      time: '15:00',
      professional: 'Marina Oliveira',
      price: 'R$ 200,00',
      status: 'completed',
    },
    {
      id: 5,
      service: 'Manicure',
      date: '2026-04-25',
      time: '11:30',
      professional: 'Julia Lima',
      price: 'R$ 40,00',
      status: 'completed',
    },
    {
      id: 6,
      service: 'Pedicure',
      date: '2026-04-22',
      time: '16:00',
      professional: 'Julia Lima',
      price: 'R$ 45,00',
      status: 'completed',
    },
    {
      id: 7,
      service: 'Corte de Cabelo',
      date: '2026-04-18',
      time: '10:30',
      professional: 'Carlos Silva',
      price: 'R$ 50,00',
      status: 'cancelled',
    },
    {
      id: 8,
      service: 'Massagem Relaxante',
      date: '2026-04-15',
      time: '14:00',
      professional: 'Ana Santos',
      price: 'R$ 120,00',
      status: 'completed',
    },
    {
      id: 9,
      service: 'Consulta Nutricional',
      date: '2026-05-15',
      time: '09:00',
      professional: 'Dr. Pedro Costa',
      price: 'R$ 150,00',
      status: 'pending',
    },
    {
      id: 10,
      service: 'Limpeza de Pele',
      date: '2026-05-18',
      time: '15:00',
      professional: 'Marina Oliveira',
      price: 'R$ 200,00',
      status: 'pending',
    },
  ];

  const filteredAppointments = appointments.filter((app) => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          label: 'Concluído',
          color: 'bg-green-500/10 text-green-400 border border-green-500/20',
          icon: <CheckCircle2 className="w-4 h-4" />,
        };
      case 'cancelled':
        return {
          label: 'Cancelado',
          color: 'bg-red-500/10 text-red-400 border border-red-500/20',
          icon: <XCircle className="w-4 h-4" />,
        };
      case 'pending':
        return {
          label: 'Pendente',
          color: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
          icon: <AlertCircle className="w-4 h-4" />,
        };
      default:
        return {
          label: status,
          color: 'bg-white/10 text-white/60',
          icon: null,
        };
    }
  };

  const stats = {
    total: appointments.length,
    completed: appointments.filter((a) => a.status === 'completed').length,
    cancelled: appointments.filter((a) => a.status === 'cancelled').length,
    pending: appointments.filter((a) => a.status === 'pending').length,
  };

  return (
    <div className="flex min-h-screen bg-[#050508]">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl text-white mb-2">Histórico de Agendamentos</h1>
            <p className="text-white/60">Visualize todos os seus agendamentos anteriores e futuros</p>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="cursor-pointer hover:border-white/20 transition-colors" onClick={() => setFilter('all')}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <p className="text-2xl text-white">{stats.total}</p>
                  <p className="text-sm text-white/60">Total</p>
                </div>
              </div>
            </Card>

            <Card className="cursor-pointer hover:border-white/20 transition-colors" onClick={() => setFilter('completed')}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl text-white">{stats.completed}</p>
                  <p className="text-sm text-white/60">Concluídos</p>
                </div>
              </div>
            </Card>

            <Card className="cursor-pointer hover:border-white/20 transition-colors" onClick={() => setFilter('pending')}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <p className="text-2xl text-white">{stats.pending}</p>
                  <p className="text-sm text-white/60">Pendentes</p>
                </div>
              </div>
            </Card>

            <Card className="cursor-pointer hover:border-white/20 transition-colors" onClick={() => setFilter('cancelled')}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <p className="text-2xl text-white">{stats.cancelled}</p>
                  <p className="text-sm text-white/60">Cancelados</p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-white/60" />
                <span className="text-white/60">Filtro:</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filter === 'all' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setFilter('all')}
                >
                  Todos
                </Button>
                <Button
                  variant={filter === 'completed' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setFilter('completed')}
                >
                  Concluídos
                </Button>
                <Button
                  variant={filter === 'pending' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setFilter('pending')}
                >
                  Pendentes
                </Button>
                <Button
                  variant={filter === 'cancelled' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setFilter('cancelled')}
                >
                  Cancelados
                </Button>
              </div>
            </div>
          </Card>

          <div className="space-y-3">
            {filteredAppointments.map((appointment) => {
              const statusConfig = getStatusConfig(appointment.status);

              return (
                <Card
                  key={appointment.id}
                  className="hover:border-white/20 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                        <Calendar className="w-7 h-7 text-white" />
                      </div>

                      <div className="flex-1">
                        <h3 className="text-lg text-white mb-1">{appointment.service}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(appointment.date).toLocaleDateString('pt-BR')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {appointment.time}
                          </span>
                          {appointment.professional && (
                            <span>{appointment.professional}</span>
                          )}
                          <span className="text-white">{appointment.price}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-4 py-2 rounded-lg text-sm flex items-center gap-2 ${statusConfig.color}`}>
                        {statusConfig.icon}
                        {statusConfig.label}
                      </span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {filteredAppointments.length === 0 && (
            <Card className="text-center py-12">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white/40" />
              </div>
              <h3 className="text-xl text-white mb-2">Nenhum agendamento encontrado</h3>
              <p className="text-white/60">Tente ajustar os filtros ou criar um novo agendamento</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
