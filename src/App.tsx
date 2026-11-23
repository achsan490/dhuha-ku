import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { LoginPage } from './components/auth/LoginPage';
import { StudentView } from './components/student/StudentView';
import { TeacherView } from './components/teacher/TeacherView';
import { ParentView } from './components/parent/ParentView';
import { CheckCircle2, Heart } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentUser, currentRole, toastMessage } = useApp();

  // Jika belum login, tampilkan Portal Masuk (Universal Login)
  if (!currentUser) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-800">
      {/* Top Application Navbar */}
      <Navbar />

      {/* Main Dynamic Content - Terisolasi 100% Sesuai Akun Login */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 pb-16">
        {currentRole === 'siswa' && <StudentView />}
        {currentRole === 'guru' && <TeacherView />}
        {currentRole === 'ortu' && <ParentView />}
      </main>

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white text-xs px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2.5 max-w-md animate-bounce">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Footer Bersih */}
      <footer className="bg-white border-t border-slate-200/80 py-5 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-slate-700">DhuhaKu</span>
            <span>• SDIT Nurul Iman (Sistem Terisolasi Peran)</span>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-slate-400">
            <span>Dirancang dengan</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>untuk Pembentukan Karakter Islami</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
