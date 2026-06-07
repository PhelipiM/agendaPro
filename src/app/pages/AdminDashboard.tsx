import { Sidebar } from '../components/Sidebar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Calendar, DollarSign, Users, TrendingUp, CheckCircle2, Clock, XCircle } from 'lucide-react';

export function AdminDashboard() {
  const appointments = [
    {
      id: 1,
      client: 'Maria Silva',
      service: 'Corte de Cabelo',
      date: '2026-05-12',
      time: '10:00',
      price: 'R$ 50,00',
      status: 'confirmed',
    },
    {
      id: 2,
      client: 'João Santos',
      service: 'Massagem Relaxante',
      date: '2026-05-12',
      time: '14:30',
      price: 'R$ 120,00',
      status: 'pending',
    },
    {
      id: 3,
      client: 'Ana Costa',
      service: 'Consulta Nutricional',
      date: '2026-05-13',
      time: '09:00',
      price: 'R$ 150,00',
      status: 'confirmed',
    },
    {
      id: 4,
      client: 'Pedro Lima',
      service: 'Limpeza de Pele',
      date: '2026-05-13',
      time: '15:00',
      price: 'R$ 200,00',
      status: 'confirmed',
    },
    {
      id: 5,
      client: 'Carla Mendes',
      service: 'Manicure',
      date: '2026-05-14',
      time: '11:30',
      price: 'R$ 40,00',
      status: 'pending',
    },
    {
      id: 6,
      client: 'Roberto Alves',
      service: 'Pedicure',
      date: '2026-05-14',
      time: '16:00',
      price: 'R$ 45,00',
      status: 'confirmed',
    },
  ];

  const metrics = {
    totalAppointments: 145,
    todayAppointments: 8,
    totalRevenue: 12450.0,
    activeClients: 67,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500/10 text-green-400';
      case 'pending':
        return 'bg-yellow-500/10 text-yellow-400';
      case 'cancelled':
        return 'bg-red-500/10 text-red-400';
      default:
        return 'bg-white/10 text-white/60';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmado';
      case 'pending':
        return 'Pendente';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#050508]">
      <Sidebar isAdmin />

      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl text-white mb-2">Dashboard Administrativo</h1>
            <p className="text-white/60">Visão geral do seu negócio</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-violet-400" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <p className="text-3xl text-white mb-1">{metrics.totalAppointments}</p>
              <p className="text-sm text-white/60">Total de Agendamentos</p>
            </Card>

            <Card>
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-400" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <p className="text-3xl text-white mb-1">{metrics.todayAppointments}</p>
              <p className="text-sm text-white/60">Hoje</p>
            </Card>

            <Card>
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-400" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <p className="text-3xl text-white mb-1">
                R$ {metrics.totalRevenue.toLocaleString('pt-BR')}
              </p>
              <p className="text-sm text-white/60">Faturamento Estimado</p>
            </Card>

            <Card>
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <p className="text-3xl text-white mb-1">{metrics.activeClients}</p>
              <p className="text-sm text-white/60">Clientes Ativos</p>
            </Card>
          </div>

          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl text-white">Agendamentos Recentes</h2>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm">
                  Filtrar
                </Button>
                <Button variant="secondary" size="sm">
                  Exportar
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-sm text-white/60">Cliente</th>
                    <th className="text-left py-3 px-4 text-sm text-white/60">Serviço</th>
                    <th className="text-left py-3 px-4 text-sm text-white/60">Data</th>
                    <th className="text-left py-3 px-4 text-sm text-white/60">Horário</th>
                    <th className="text-left py-3 px-4 text-sm text-white/60">Valor</th>
                    <th className="text-left py-3 px-4 text-sm text-white/60">Status</th>
                    <th className="text-left py-3 px-4 text-sm text-white/60">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr
                      key={appointment.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="py-4 px-4 text-white">{appointment.client}</td>
                      <td className="py-4 px-4 text-white/80">{appointment.service}</td>
                      <td className="py-4 px-4 text-white/80">
                        {new Date(appointment.date).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="py-4 px-4 text-white/80">{appointment.time}</td>
                      <td className="py-4 px-4 text-white">{appointment.price}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-sm ${getStatusColor(
                            appointment.status
                          )}`}
                        >
                          {getStatusIcon(appointment.status)}
                          {getStatusLabel(appointment.status)}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            Ver
                          </Button>
                          <Button variant="ghost" size="sm">
                            Editar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
