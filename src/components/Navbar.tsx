import React from 'react';
import { useApp } from '../context/AppContext';
import { Sun, Flame, LogOut } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentUser, currentRole, activeStudentId, students, logout } = useApp();
  const activeStudent = students.find(s => s.id === activeStudentId) || students[0];

  return (
    <header className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-200">
            <Sun className="w-6 h-6 text-amber-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl text-slate-800 tracking-tight">DhuhaKu</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                SDIT Nurul Iman
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Instrumen Kesadaran Dhuha & Pembentukan Karakter Islami
            </p>
          </div>
        </div>

        {/* Right Info & Actions */}
        <div className="flex items-center gap-3">
          {/* Active Period / Time */}
          <div className="hidden lg:flex flex-col text-right">
            <span className="text-xs font-semibold text-slate-700">Ahad, 15 November 2026</span>
            <span className="text-[11px] text-emerald-600 font-medium flex items-center justify-end gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              Waktu Dhuha: 07.00 - 11.00 WIB
            </span>
          </div>

          {/* User Status Display (HANYA menampilkan info akun yang sedang login) */}
          {currentRole === 'siswa' && (
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl">
              <Flame className="w-5 h-5 text-amber-500 fill-amber-500 animate-bounce" />
              <div className="text-left">
                <div className="text-[10px] text-amber-700 font-medium leading-none">Streak Dhuha</div>
                <div className="text-sm font-bold text-amber-900">{activeStudent.streakCount} Hari</div>
              </div>
            </div>
          )}

          {currentRole === 'guru' && (
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-xl">
              <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                UM
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold text-blue-900 leading-tight">Ust. Mansur, S.Pd.I</div>
                <div className="text-[10px] text-blue-700">Wali Kelas 5-A</div>
              </div>
            </div>
          )}

          {currentRole === 'ortu' && (
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl">
              <div className="w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs">
                OT
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-amber-900 leading-tight">{activeStudent.parentName}</div>
                <div className="text-[10px] text-amber-700">Orang Tua {activeStudent.name}</div>
              </div>
            </div>
          )}

          {/* Logout Button */}
          {currentUser && (
            <button
              type="button"
              onClick={logout}
              title="Keluar dari akun saat ini"
              className="flex items-center gap-1.5 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 border border-slate-200 hover:border-rose-200 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
