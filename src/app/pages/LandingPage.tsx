import { useNavigate } from 'react-router';
import { Button } from '../components/ui/Button';
import { Calendar, Clock, Users, TrendingUp, CheckCircle2, Sparkles } from 'lucide-react';

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050508]">
      <nav className="fixed top-0 w-full z-50 bg-[#050508]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl text-white">AgendaPro</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/login')}>
              Entrar
            </Button>
            <Button onClick={() => navigate('/register')}>Cadastrar-se</Button>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6">
            <Sparkles className="w-4 h-4 text-violet-400" />
            <span className="text-sm text-white/70">Plataforma SaaS Premium</span>
          </div>

          <h1 className="text-6xl md:text-7xl tracking-tight text-white mb-6">
            Agendamento Online
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-purple-600 bg-clip-text text-transparent">
              Simplificado
            </span>
          </h1>

          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-10">
            Gerencie seus agendamentos com uma plataforma moderna, intuitiva e profissional. Aumente
            sua produtividade e impressione seus clientes.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button size="lg" onClick={() => navigate('/register')}>
              Começar Agora
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-white mb-4">Por que AgendaPro?</h2>
            <p className="text-lg text-white/60">Tudo que você precisa em uma única plataforma</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="text-xl text-white mb-3">Agendamento Inteligente</h3>
              <p className="text-white/60">
                Sistema intuitivo que permite seus clientes agendarem horários de forma rápida e
                fácil.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl text-white mb-3">Gestão de Tempo</h3>
              <p className="text-white/60">
                Controle total sobre sua agenda com visualização clara de horários disponíveis.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="text-xl text-white mb-3">Gestão de Clientes</h3>
              <p className="text-white/60">
                Mantenha histórico completo de todos os agendamentos e informações dos clientes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-violet-950/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl text-white mb-4">Como Funciona</h2>
            <p className="text-lg text-white/60">Em apenas 3 passos simples</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">1</span>
              </div>
              <h3 className="text-xl text-white mb-3">Cadastre-se</h3>
              <p className="text-white/60">Crie sua conta gratuitamente em menos de 1 minuto</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">2</span>
              </div>
              <h3 className="text-xl text-white mb-3">Configure</h3>
              <p className="text-white/60">Adicione seus serviços, horários e preferências</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-red-600 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-white">3</span>
              </div>
              <h3 className="text-xl text-white mb-3">Gerencie</h3>
              <p className="text-white/60">Receba e gerencie seus agendamentos automaticamente</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-violet-600/20 to-purple-600/20 backdrop-blur-sm border border-white/10 text-center">
            <TrendingUp className="w-12 h-12 text-violet-400 mx-auto mb-6" />
            <h2 className="text-4xl text-white mb-4">Pronto para começar?</h2>
            <p className="text-lg text-white/60 mb-8">
              Junte-se a milhares de profissionais que já usam o AgendaPro
            </p>
            <Button size="lg" onClick={() => navigate('/register')}>
              Começar Agora - É Grátis
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl text-white">AgendaPro</span>
              </div>
              <p className="text-white/50 text-sm">Plataforma SaaS moderna de agendamento online</p>
            </div>

            <div>
              <h4 className="text-white mb-3">Produto</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li>Recursos</li>
                <li>Preços</li>
                <li>Casos de Uso</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white mb-3">Empresa</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li>Sobre</li>
                <li>Blog</li>
                <li>Contato</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-white/50">
                <li>Privacidade</li>
                <li>Termos</li>
                <li>Segurança</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 text-center text-sm text-white/40">
            © 2026 AgendaPro. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
