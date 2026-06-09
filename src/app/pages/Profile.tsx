import { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { User, Mail, Phone, MapPin, Camera, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

export function Profile() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
  });

  const [appointmentCount, setAppointmentCount] = useState(0);

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    let mounted = true;

    const loadProfile = async () => {
      try {
        const [user, history] = await Promise.all([api.me(), api.history()]);

        if (!mounted) {
          return;
        }

        setFormData({
          name: user.name || '',
          email: user.email || '',
          phone: user.phone || '(00) 00000-0000',
          address: user.address || 'Não informado',
          bio: user.bio || 'Cliente AgendaPro desde 2026',
        });
        setAppointmentCount(history.counts.total);
      } catch {
        navigate('/login');
      }
    };

    void loadProfile();

    return () => {
      mounted = false;
    };
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name) {
      newErrors.name = 'Nome é obrigatório';
    }
    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const updatedUser = await api.updateProfile(formData);
      setFormData({
        name: updatedUser.name || '',
        email: updatedUser.email || '',
        phone: updatedUser.phone || '(00) 00000-0000',
        address: updatedUser.address || 'Não informado',
        bio: updatedUser.bio || 'Cliente AgendaPro desde 2026',
      });
      setIsEditing(false);
    } catch (error) {
      setErrors({ api: error instanceof Error ? error.message : 'Não foi possível salvar as alterações.' });
    }
  };

  return (
    <div className="flex min-h-screen bg-[#050508]">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl text-white mb-2">Meu Perfil</h1>
              <p className="text-white/60">Gerencie suas informações pessoais</p>
            </div>
            {!isEditing && <Button onClick={() => setIsEditing(true)}>Editar Perfil</Button>}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <div className="text-center">
                <div className="relative inline-block mb-6">
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                    <User className="w-16 h-16 text-white" />
                  </div>
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center hover:bg-white/90 transition-colors">
                      <Camera className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <h2 className="text-xl text-white mb-1">{formData.name || 'Carregando...'}</h2>
                <p className="text-sm text-white/60">{formData.email}</p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-white/60 mb-1">Membro desde</p>
                    <p className="text-white">Janeiro 2026</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/60 mb-1">Total de agendamentos</p>
                    <p className="text-white">{appointmentCount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-white/60 mb-1">Status</p>
                    <span className="inline-flex items-center px-3 py-1 rounded-lg bg-green-500/10 text-green-400 text-sm border border-green-500/20">
                      Ativo
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="md:col-span-2">
              <h3 className="text-xl text-white mb-6">Informações Pessoais</h3>

              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm text-white/80 mb-2">Nome completo</label>
                    <Input
                      type="text"
                      value={formData.name}
                      onChange={e => {
                        setFormData({ ...formData, name: e.target.value });
                        setErrors({ ...errors, name: '' });
                      }}
                      error={errors.name}
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/80 mb-2">Email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={e => {
                        setFormData({ ...formData, email: e.target.value });
                        setErrors({ ...errors, email: '' });
                      }}
                      error={errors.email}
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/80 mb-2">Telefone</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/80 mb-2">Endereço</label>
                    <Input
                      type="text"
                      value={formData.address}
                      onChange={e => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-white/80 mb-2">Bio</label>
                    <textarea
                      value={formData.bio}
                      onChange={e => setFormData({ ...formData, bio: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 focus:bg-white/[0.07] transition-all duration-200 min-h-24 resize-none"
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button type="submit" className="flex-1 gap-2">
                      <Save className="w-5 h-5" />
                      Salvar Alterações
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setIsEditing(false)}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                  </div>

                  {errors.api && <p className="text-sm text-red-400">{errors.api}</p>}
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5">
                    <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60 mb-1">Nome completo</p>
                      <p className="text-white">{formData.name || 'Não informado'}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60 mb-1">Email</p>
                      <p className="text-white">{formData.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5">
                    <div className="w-10 h-10 rounded-lg bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-pink-400" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60 mb-1">Telefone</p>
                      <p className="text-white">{formData.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60 mb-1">Endereço</p>
                      <p className="text-white">{formData.address}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5">
                    <p className="text-sm text-white/60 mb-2">Bio</p>
                    <p className="text-white">{formData.bio}</p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
