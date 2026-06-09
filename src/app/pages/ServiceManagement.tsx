import { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Plus, Edit2, Trash2, Clock, DollarSign } from 'lucide-react';
import { useEffect } from 'react';
import { api, type ServiceItem } from '../lib/api';

export function ServiceManagement() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    price: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [services, setServices] = useState<ServiceItem[]>([]);

  useEffect(() => {
    const loadServices = async () => {
      const items = await api.services();
      setServices(items);
    };

    void loadServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name) {
      newErrors.name = 'Nome do serviço é obrigatório';
    }
    if (!formData.duration) {
      newErrors.duration = 'Duração é obrigatória';
    }
    if (!formData.price) {
      newErrors.price = 'Preço é obrigatório';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newService = await api.createService(formData);
    setServices(previous => [...previous, newService]);
    setFormData({ name: '', duration: '', price: '' });
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    await api.deleteService(id);
    setServices(previous => previous.filter(service => service.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-[#050508]">
      <Sidebar isAdmin />

      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl text-white mb-2">Gestão de Serviços</h1>
              <p className="text-white/60">Gerencie todos os serviços oferecidos</p>
            </div>
            <Button onClick={() => setShowForm(!showForm)} className="gap-2">
              <Plus className="w-5 h-5" />
              Novo Serviço
            </Button>
          </div>

          {showForm && (
            <Card className="mb-8">
              <h2 className="text-xl text-white mb-6">Adicionar Novo Serviço</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-white/80 mb-2">Nome do Serviço</label>
                    <Input
                      type="text"
                      placeholder="Ex: Corte de Cabelo"
                      value={formData.name}
                      onChange={e => {
                        setFormData({ ...formData, name: e.target.value });
                        setErrors({ ...errors, name: '' });
                      }}
                      error={errors.name}
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/80 mb-2">Duração</label>
                    <Input
                      type="text"
                      placeholder="Ex: 30 min"
                      value={formData.duration}
                      onChange={e => {
                        setFormData({ ...formData, duration: e.target.value });
                        setErrors({ ...errors, duration: '' });
                      }}
                      error={errors.duration}
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/80 mb-2">Preço</label>
                    <Input
                      type="text"
                      placeholder="Ex: R$ 50,00"
                      value={formData.price}
                      onChange={e => {
                        setFormData({ ...formData, price: e.target.value });
                        setErrors({ ...errors, price: '' });
                      }}
                      error={errors.price}
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button type="submit" className="flex-1">
                    Salvar Serviço
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      setShowForm(false);
                      setFormData({ name: '', duration: '', price: '' });
                      setErrors({});
                    }}
                    className="flex-1"
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </Card>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map(service => (
              <Card key={service.id} className="hover:border-white/20 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex gap-1">
                    <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4 text-white/60 hover:text-white" />
                    </button>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-white/60 hover:text-red-400" />
                    </button>
                  </div>
                </div>

                <h3 className="text-lg text-white mb-3">{service.name}</h3>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <Clock className="w-4 h-4" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <DollarSign className="w-4 h-4" />
                    <span>{service.price}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
