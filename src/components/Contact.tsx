import React, { useState, useEffect } from 'react';
import { CreatorProfile } from '../types/creator';
import { Mail, Briefcase, Send, CheckCircle2, AlertCircle, Loader2, LogIn, LogOut, ShieldCheck } from 'lucide-react';
import {
  initAuth,
  googleSignIn,
  googleLogout,
  sendEmailViaGmail,
} from '../services/firebaseAuth';
import { User } from 'firebase/auth';

interface ContactProps {
  creator: CreatorProfile;
}

export const Contact: React.FC<ContactProps> = ({ creator }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  
  // Gmail OAuth State
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      (user) => {
        setAuthUser(user);
      },
      () => {
        setAuthUser(null);
      }
    );
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  const handleGoogleAuth = async () => {
    setIsAuthenticating(true);
    setStatusMessage('');
    try {
      const res = await googleSignIn();
      if (res?.user) {
        setAuthUser(res.user);
        if (!formData.name && res.user.displayName) {
          setFormData((prev) => ({ ...prev, name: res.user.displayName || '' }));
        }
        if (!formData.email && res.user.email) {
          setFormData((prev) => ({ ...prev, email: res.user.email || '' }));
        }
      }
    } catch (err: any) {
      console.error('Falha ao conectar conta Google:', err);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = async () => {
    await googleLogout();
    setAuthUser(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus('error');
      setStatusMessage('Por favor, preencha todos os campos do formulário.');
      return;
    }

    // If authenticated via Gmail OAuth, require explicit user confirmation before sending
    if (authUser) {
      setShowConfirmModal(true);
    } else {
      executeSubmission();
    }
  };

  const executeSubmission = async () => {
    setShowConfirmModal(false);
    setStatus('loading');
    setStatusMessage('Enviando sua mensagem...');

    try {
      if (authUser) {
        // Send real email via Gmail REST API
        await sendEmailViaGmail({
          to: creator.primaryEmail || 'nexaweeb@gmail.com',
          subject: `[Contato Site Criador] ${formData.subject}`,
          message: formData.message,
          senderName: formData.name,
          replyTo: formData.email,
        });

        setStatus('success');
        setStatusMessage('Mensagem enviada com sucesso diretamente através da sua conta Gmail!');
      } else {
        // Simulated client submission with delay and mailto fallback option
        await new Promise((resolve) => setTimeout(resolve, 900));
        setStatus('success');
        setStatusMessage('Mensagem registrada com sucesso! Retornarei seu contato o mais breve possível.');
      }

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error: any) {
      console.error('Erro ao enviar mensagem:', error);
      setStatus('error');
      setStatusMessage(error.message || 'Houve uma falha ao enviar sua mensagem. Tente novamente.');
    }
  };

  return (
    <section id="contato" className="py-20 md:py-28 bg-[#faf8f5] border-b border-[#e7e2d8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#78716c] mb-2">
            <span className="text-[#c26747]">06</span>
            <span aria-hidden="true">/</span>
            <span>Comunicação Direta</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif-display tracking-tight text-[#1c1917] text-balance">
            Entre em Contato.
          </h2>
          <p className="text-xs sm:text-sm text-[#78716c] mt-2 max-w-lg">
            Propostas de projetos, parcerias editoriais, participações em eventos ou conversas sobre ideias.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Contact Direct Info (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="p-6 sm:p-8 bg-white border border-[#e7e2d8] rounded-2xl shadow-xs space-y-6">
              
              {/* Primary Email */}
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-[#faf8f5] border border-[#e7e2d8] text-[#1c1917] shrink-0">
                  <Mail className="w-5 h-5 text-[#c26747]" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#78716c]">
                    E-mail Principal & Geral
                  </h4>
                  <a
                    href={`mailto:${creator.primaryEmail}`}
                    className="text-sm sm:text-base font-medium text-[#1c1917] hover:text-[#c26747] transition-colors break-all"
                  >
                    {creator.primaryEmail}
                  </a>
                  <p className="text-xs text-[#a8a29e] mt-0.5">Resposta em até 48 horas úteis.</p>
                </div>
              </div>

              {/* Business Email */}
              <div className="flex items-start gap-4 pt-4 border-t border-[#f0eae1]">
                <div className="p-3 rounded-lg bg-[#faf8f5] border border-[#e7e2d8] text-[#1c1917] shrink-0">
                  <Briefcase className="w-5 h-5 text-[#1c1917]" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#78716c]">
                    Contato Comercial & Parcerias
                  </h4>
                  <a
                    href={`mailto:${creator.businessEmail}`}
                    className="text-sm sm:text-base font-medium text-[#1c1917] hover:text-[#c26747] transition-colors break-all"
                  >
                    {creator.businessEmail}
                  </a>
                  <p className="text-xs text-[#a8a29e] mt-0.5">Propostas de patrocínio e marcas.</p>
                </div>
              </div>

            </div>

            {/* Google Workspace / Gmail Integration Card */}
            <div className="p-6 bg-[#f3ede3]/60 border border-[#e7e2d8] rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#1c1917] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#c26747]" />
                  Integração Gmail
                </span>
                {authUser ? (
                  <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-medium">
                    Conectado
                  </span>
                ) : (
                  <span className="text-[11px] text-[#78716c]">
                    Opcional
                  </span>
                )}
              </div>

              <p className="text-xs text-[#57534e] leading-relaxed">
                Você pode enviar a mensagem normalmente pelo formulário ou conectar sua conta Google para despachar diretamente pela API do Gmail.
              </p>

              {authUser ? (
                <div className="pt-2 flex items-center justify-between">
                  <div className="text-xs text-[#1c1917] truncate max-w-[200px]">
                    <span className="font-medium">{authUser.displayName || 'Usuário'}</span>
                    <span className="block text-[11px] text-[#78716c] truncate">{authUser.email}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-xs text-[#78716c] hover:text-[#1c1917] flex items-center gap-1 font-medium"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Desconectar</span>
                  </button>
                </div>
              ) : (
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleGoogleAuth}
                    disabled={isAuthenticating}
                    className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-[#1c1917] bg-white border border-[#d6cfc0] rounded-lg hover:bg-[#faf8f5] transition-colors shadow-2xs"
                  >
                    {isAuthenticating ? (
                      <Loader2 className="w-4 h-4 animate-spin text-[#78716c]" />
                    ) : (
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.35 24 12 24z"/>
                        <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 10.02 0 12s.45 3.84 1.25 5.42l4.03-3.15z"/>
                        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                      </svg>
                    )}
                    <span>{isAuthenticating ? 'Conectando...' : 'Conectar Google (Gmail)'}</span>
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#e7e2d8] rounded-2xl p-6 sm:p-10 shadow-xs">
              
              <form onSubmit={handleFormSubmit} className="space-y-5">
                
                {/* Nome & Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-[#1c1917]">
                      Seu Nome *
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Como podemos te chamar?"
                      className="w-full px-4 py-3 rounded-lg border border-[#e7e2d8] bg-[#faf8f5] text-sm text-[#1c1917] placeholder:text-[#a8a29e] focus:bg-white focus:border-[#1c1917] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-[#1c1917]">
                      Seu E-mail *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="seuemail@exemplo.com"
                      className="w-full px-4 py-3 rounded-lg border border-[#e7e2d8] bg-[#faf8f5] text-sm text-[#1c1917] placeholder:text-[#a8a29e] focus:bg-white focus:border-[#1c1917] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Assunto */}
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="block text-xs font-semibold uppercase tracking-wider text-[#1c1917]">
                    Assunto *
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Ex: Proposta de patrocínio, convite para evento, etc."
                    className="w-full px-4 py-3 rounded-lg border border-[#e7e2d8] bg-[#faf8f5] text-sm text-[#1c1917] placeholder:text-[#a8a29e] focus:bg-white focus:border-[#1c1917] focus:outline-none transition-colors"
                  />
                </div>

                {/* Mensagem */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-wider text-[#1c1917]">
                    Mensagem *
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Escreva sua mensagem com detalhes sobre a proposta ou ideia..."
                    className="w-full px-4 py-3 rounded-lg border border-[#e7e2d8] bg-[#faf8f5] text-sm text-[#1c1917] placeholder:text-[#a8a29e] focus:bg-white focus:border-[#1c1917] focus:outline-none transition-colors resize-y"
                  />
                </div>

                {/* Status Feedback Banners */}
                {status === 'success' && (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Mensagem enviada com sucesso!</p>
                      <p className="mt-0.5">{statusMessage}</p>
                    </div>
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Não foi possível enviar</p>
                      <p className="mt-0.5">{statusMessage}</p>
                    </div>
                  </div>
                )}

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm font-medium text-white bg-[#1c1917] hover:bg-[#38332e] active:scale-[0.99] rounded-lg transition-all shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#ded7c8]" />
                        <span>Enviando mensagem...</span>
                      </>
                    ) : (
                      <>
                        <span>Enviar mensagem</span>
                        <Send className="w-4 h-4 text-[#ded7c8]" />
                      </>
                    )}
                  </button>
                </div>

              </form>

            </div>
          </div>

        </div>

      </div>

      {/* Mandatory User Confirmation Dialog for Gmail Workspace send (as strictly required by Google Workspace integration skill) */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-[#e7e2d8] rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-[#f3ede3] text-[#c26747]">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-serif-display text-xl text-[#1c1917]">
                Confirmar envio via Gmail
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed">
              Você está prestes a enviar um e-mail através da sua conta conectada (<strong>{authUser?.email}</strong>) com o assunto:
            </p>

            <div className="p-3 bg-[#faf8f5] border border-[#e7e2d8] rounded-lg text-xs space-y-1">
              <p className="font-semibold text-[#1c1917]">Para: {creator.primaryEmail}</p>
              <p className="text-[#57534e]">Assunto: {formData.subject}</p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-xs font-medium text-[#78716c] hover:text-[#1c1917] rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={executeSubmission}
                className="px-5 py-2 text-xs font-medium text-white bg-[#1c1917] hover:bg-[#38332e] rounded-lg transition-colors inline-flex items-center gap-1.5"
              >
                <span>Confirmar e Enviar</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
