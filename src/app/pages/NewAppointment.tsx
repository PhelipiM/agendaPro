import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Calendar, Clock, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';

export function NewAppointment() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const services = [
    { id: '1', name: 'Corte de Cabelo', duration: '30 min', price: 'R$ 50,00' },
    { id: '2', name: 'Massagem Relaxante', duration: '60 min', price: 'R$ 120,00' },
    { id: '3', name: 'Consulta Nutricional', duration: '45 min', price: 'R$ 150,00' },
    { id: '4', name: 'Limpeza de Pele', duration: '90 min', price: 'R$ 200,00' },
    { id: '5', name: 'Manicure', duration: '40 min', price: 'R$ 40,00' },
    { id: '6', name: 'Pedicure', duration: '40 min', price: 'R$ 45,00' },
  ];

  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 4, 1));

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const availableTimes = [
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
  ];

  const handleConfirm = () => {
    //função para enviar os dados para o backend (a ser implementada)
    const serviceData = {
      serviceId: selectedService,
      date: selectedDate,
      time: selectedTime,
    };
    // debug log removed

    navigate('/dashboard');
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  return (
    <div className="flex min-h-screen bg-[#050508]">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl text-white mb-2">Novo Agendamento</h1>
            <p className="text-white/60">Agende seu horário em poucos passos</p>
          </div>

          <div className="flex items-center gap-4 mb-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= i
                      ? 'bg-gradient-to-br from-violet-500 to-purple-600 text-white'
                      : 'bg-white/10 text-white/40'
                  }`}
                >
                  {step > i ? <CheckCircle2 className="w-6 h-6" /> : i}
                </div>
                <span className={`text-sm ${step >= i ? 'text-white' : 'text-white/40'}`}>
                  {i === 1 ? 'Serviço' : i === 2 ? 'Data e Hora' : 'Confirmar'}
                </span>
                {i < 3 && (
                  <div className={`w-12 h-0.5 ${step > i ? 'bg-violet-500' : 'bg-white/10'}`} />
                )}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div>
              <h2 className="text-xl text-white mb-4">Selecione o serviço</h2>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {services.map(service => (
                  <Card
                    key={service.id}
                    className={`cursor-pointer transition-all ${
                      selectedService === service.id
                        ? 'border-violet-500 bg-violet-500/10'
                        : 'hover:border-white/20'
                    }`}
                    onClick={() => setSelectedService(service.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg text-white mb-2">{service.name}</h3>
                        <div className="flex items-center gap-3 text-sm text-white/60">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {service.duration}
                          </span>
                          <span>{service.price}</span>
                        </div>
                      </div>
                      {selectedService === service.id && (
                        <CheckCircle2 className="w-6 h-6 text-violet-400" />
                      )}
                    </div>
                  </Card>
                ))}
              </div>
              <Button onClick={() => setStep(2)} disabled={!selectedService} className="w-full">
                Continuar
              </Button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl text-white mb-4">Selecione a data e hora</h2>

              <Card className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <button onClick={prevMonth} className="p-2 hover:bg-white/5 rounded-lg">
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <h3 className="text-lg text-white">
                    {currentMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                  </h3>
                  <button onClick={nextMonth} className="p-2 hover:bg-white/5 rounded-lg">
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-2 mb-2">
                  {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
                    <div key={day} className="text-center text-sm text-white/60 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {getDaysInMonth(currentMonth).map((day, index) => (
                    <button
                      key={index}
                      onClick={() => day && setSelectedDate(day.toISOString().split('T')[0])}
                      disabled={!day || day < new Date()}
                      className={`aspect-square rounded-lg flex items-center justify-center text-sm transition-all ${
                        day && selectedDate === day.toISOString().split('T')[0]
                          ? 'bg-violet-500 text-white'
                          : day
                          ? 'text-white hover:bg-white/10'
                          : 'text-transparent'
                      } ${!day || day < new Date() ? 'opacity-30 cursor-not-allowed' : ''}`}
                    >
                      {day?.getDate()}
                    </button>
                  ))}
                </div>
              </Card>

              {selectedDate && (
                <Card className="mb-6">
                  <h3 className="text-lg text-white mb-4">Horários disponíveis</h3>
                  <div className="grid grid-cols-4 gap-3">
                    {availableTimes.map(time => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 px-4 rounded-lg text-sm transition-all ${
                          selectedTime === time
                            ? 'bg-violet-500 text-white'
                            : 'bg-white/5 text-white hover:bg-white/10'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </Card>
              )}

              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setStep(1)} className="flex-1">
                  Voltar
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  disabled={!selectedDate || !selectedTime}
                  className="flex-1"
                >
                  Continuar
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-xl text-white mb-6">Confirmar agendamento</h2>

              <Card className="mb-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <span className="text-white/60">Serviço</span>
                    <span className="text-white">
                      {services.find(s => s.id === selectedService)?.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <span className="text-white/60">Data</span>
                    <span className="text-white">
                      {new Date(selectedDate).toLocaleDateString('pt-BR', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <span className="text-white/60">Horário</span>
                    <span className="text-white">{selectedTime}</span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <span className="text-white/60">Duração</span>
                    <span className="text-white">
                      {services.find(s => s.id === selectedService)?.duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/60">Valor</span>
                    <span className="text-white text-xl">
                      {services.find(s => s.id === selectedService)?.price}
                    </span>
                  </div>
                </div>
              </Card>

              <div className="flex gap-3">
                <Button variant="secondary" onClick={() => setStep(2)} className="flex-1">
                  Voltar
                </Button>
                <Button onClick={handleConfirm} className="flex-1 gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Confirmar Agendamento
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
