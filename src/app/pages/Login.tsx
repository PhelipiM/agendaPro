import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Calendar, ArrowLeft } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // debug log removed

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const usuariosExistentesTexto = localStorage.getItem('usuarios_cadastrados') || '[]';
      const listaDeUsuarios = JSON.parse(usuariosExistentesTexto);

      const usuarioEncontrado = listaDeUsuarios.find(
        (u: { email?: string; password?: string; id?: string; name?: string }) =>
          u.email === formData.email
      );

      if (!usuarioEncontrado) {
        setErrors({ email: 'Este e-mail não está cadastrado.' });
        return;
      }

      if (usuarioEncontrado.password !== formData.password) {
        setErrors({ password: 'Senha incorreta.' });
        return;
      }

      const sessãoUsuario = {
        id: usuarioEncontrado.id,
        name: usuarioEncontrado.name,
        email: usuarioEncontrado.email,
      };

      localStorage.setItem('usuario_logado', JSON.stringify(sessãoUsuario));

      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao autenticar:', error);
      setErrors({ api: 'Erro no navegador ao tentar fazer login.' });
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-950/20 via-transparent to-purple-950/20" />

      <div className="w-full max-w-md relative z-10">
        <button
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </button>

        <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl text-white">AgendaPro</span>
          </div>

          <h1 className="text-3xl text-white mb-2">Bem-vindo de volta</h1>
          <p className="text-white/60 mb-8">Entre na sua conta para continuar</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-white/80 mb-2">Email</label>
              <Input
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={e => {
                  setFormData({ ...formData, email: e.target.value });
                  setErrors({ ...errors, email: '' });
                }}
                error={errors.email}
              />
            </div>

            <div>
              <label className="block text-sm text-white/80 mb-2">Senha</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={e => {
                  setFormData({ ...formData, password: e.target.value });
                  setErrors({ ...errors, password: '' });
                }}
                error={errors.password}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-white/60">
                <input type="checkbox" className="rounded" />
                Lembrar-me
              </label>
              <a href="#" className="text-violet-400 hover:text-violet-300">
                Esqueceu a senha?
              </a>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Entrar
            </Button>

            <div className="text-center text-sm text-white/60">
              Não tem uma conta?{' '}
              <Link to="/register" className="text-violet-400 hover:text-violet-300">
                Cadastre-se
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
