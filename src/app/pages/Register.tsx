import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Calendar, ArrowLeft, CheckCircle2 } from 'lucide-react';

export function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.name) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Nome deve ter pelo menos 3 caracteres';
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirme sua senha';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const usuariosExistentesTexto = localStorage.getItem("usuarios_cadastrados") || "[]";

      const listaDeUsuarios = JSON.parse(usuariosExistentesTexto);

      const emailJaExiste = listaDeUsuarios.some(
        (u: any) => u.email === formData.email,
      );
      if (emailJaExiste) {
        setErrors({ email: "Este email já está cadastrado!" });
        return;
      }

      const novoUsuario = {
        id: crypto.randomUUID(),
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };

      listaDeUsuarios.push(novoUsuario);

      localStorage.setItem("usuarios_cadastrados", JSON.stringify(listaDeUsuarios));

      localStorage.setItem("usuario_logado", JSON.stringify(novoUsuario));

      alert("Conta criada com sucesso!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
      alert("Houve um erro técnico ao salvar seu cadastro no navegador.");
    }
    navigate("/dashboard");
  };

  const passwordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, label: '' };

    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 10) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    const labels = ['Muito fraca', 'Fraca', 'Média', 'Forte', 'Muito forte'];
    return { strength: Math.min(strength, 4), label: labels[Math.min(strength, 4)] };
  };

  const { strength, label } = passwordStrength();

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

          <h1 className="text-3xl text-white mb-2">Criar conta</h1>
          <p className="text-white/60 mb-8">Comece gratuitamente hoje mesmo</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-white/80 mb-2">Nome completo</label>
              <Input
                type="text"
                placeholder="João Silva"
                value={formData.name}
                onChange={(e) => {
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
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => {
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
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  setErrors({ ...errors, password: '' });
                }}
                error={errors.password}
              />
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          i <= strength
                            ? strength <= 1
                              ? 'bg-red-500'
                              : strength === 2
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                            : 'bg-white/10'
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs ${
                    strength <= 1 ? 'text-red-400' : strength === 2 ? 'text-yellow-400' : 'text-green-400'
                  }`}>
                    {label}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm text-white/80 mb-2">Confirmar senha</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => {
                  setFormData({ ...formData, confirmPassword: e.target.value });
                  setErrors({ ...errors, confirmPassword: '' });
                }}
                error={errors.confirmPassword}
              />
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <div className="mt-2 flex items-center gap-2 text-green-400 text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  As senhas coincidem
                </div>
              )}
            </div>

            <Button type="submit" className="w-full" size="lg">
              Criar Conta
            </Button>

            <div className="text-center text-sm text-white/60">
              Já tem uma conta?{' '}
              <Link to="/login" className="text-violet-400 hover:text-violet-300">
                Entrar
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
