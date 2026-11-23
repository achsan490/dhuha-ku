import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Sun, Lock, User, KeyRound, ArrowRight, AlertCircle, Sparkles, ShieldCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { universalLogin } = useApp();

  const [identifier, setIdentifier] = useState('');
  const [pin, setPin] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!identifier.trim()) {
      setErrorMessage('Harap masukkan Username, NIS Siswa, atau No. WA');
      return;
    }
    if (!pin.trim()) {
      setErrorMessage('Harap masukkan Password atau PIN');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const result = universalLogin(identifier, pin);
      if (!result.success) {
        setErrorMessage(result.message);
      }
      setIsLoading(false);
    }, 250);
  };

  const handleQuickFill = (user: string, pass: string) => {
    setIdentifier(user);
    setPin(pass);
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
        {/* Header Branding */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 p-6 text-white text-center relative">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto mb-3 shadow-inner border border-white/20">
            <Sun className="w-8 h-8 text-amber-300" />
          </div>
          <h1 className="text-2xl font-black tracking-tight">DhuhaKu</h1>
          <p className="text-xs text-emerald-100 mt-0.5">
            SDIT Nurul Iman • Portal Pembiasaan Dhuha & Karakter Islami
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 bg-black/20 text-emerald-200 px-3 py-1 rounded-full text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>Satu Pintu Masuk Otomatis Sesuai Hak Akses</span>
          </div>
        </div>

        {/* Universal Login Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2 text-xs text-rose-800 animate-fadeIn">
                <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Username / NIS / No. WA
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={identifier}
                  onChange={e => setIdentifier(e.target.value)}
                  placeholder="Contoh: 20240101 (NIS) atau guru"
                  className="w-full pl-9 pr-3 py-3 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm sm:text-xs text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                  autoFocus
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Santri: masukkan NIS | Guru: masukkan "guru" | Ortu: masukkan No. WA
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Password / PIN Masuk
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  value={pin}
                  onChange={e => setPin(e.target.value)}
                  placeholder="Masukkan PIN (Default: 1234)"
                  className="w-full pl-9 pr-3 py-3 sm:py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm sm:text-xs text-slate-800 font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2 mt-2 cursor-pointer disabled:opacity-70"
            >
              <span>{isLoading ? 'Memverifikasi...' : 'Masuk ke DhuhaKu'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Credentials Helper */}
          <div className="mt-6 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Coba Masuk Cepat (Klik untuk Isi Otomatis):</span>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <button
                type="button"
                onClick={() => handleQuickFill('guru', '1234')}
                className="w-full p-2 bg-blue-50/70 hover:bg-blue-100 text-blue-900 rounded-xl border border-blue-200 text-left flex items-center justify-between transition cursor-pointer"
              >
                <div>
                  <span className="font-bold">👨‍🏫 Guru / Admin:</span>
                  <span className="text-slate-600 ml-1">Username: <code className="bg-white px-1 rounded">guru</code></span>
                </div>
                <span className="text-[10px] bg-blue-200/80 px-1.5 py-0.5 rounded font-mono font-bold">PIN: 1234</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('20240101', '1234')}
                className="w-full p-2 bg-emerald-50/70 hover:bg-emerald-100 text-emerald-900 rounded-xl border border-emerald-200 text-left flex items-center justify-between transition cursor-pointer"
              >
                <div>
                  <span className="font-bold">👦 Siswa (Ahmad):</span>
                  <span className="text-slate-600 ml-1">NIS: <code className="bg-white px-1 rounded">20240101</code></span>
                </div>
                <span className="text-[10px] bg-emerald-200/80 px-1.5 py-0.5 rounded font-mono font-bold">PIN: 1234</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuickFill('081234567890', '1234')}
                className="w-full p-2 bg-amber-50/70 hover:bg-amber-100 text-amber-900 rounded-xl border border-amber-200 text-left flex items-center justify-between transition cursor-pointer"
              >
                <div>
                  <span className="font-bold">👨‍👩‍👧 Orang Tua (Pak Hendra):</span>
                  <span className="text-slate-600 ml-1">WA: <code className="bg-white px-1 rounded">081234567890</code></span>
                </div>
                <span className="text-[10px] bg-amber-200/80 px-1.5 py-0.5 rounded font-mono font-bold">PIN: 1234</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
