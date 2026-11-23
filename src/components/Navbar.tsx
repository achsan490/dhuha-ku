import React from 'react';
import { useApp } from '../context/AppContext';
import { Sun, Flame, LogOut } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentUser, currentRole, activeStudentId, students, logout } = useApp();
  const activeStudent = students.find(s => s.id === activeStudentId) || students[0];

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-2xs sticky top-0 z-30 pt-safe">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2">
        {/* Brand */}
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-sm flex-shrink-0">
            <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-amber-200" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg sm:text-xl text-slate-800 tracking-tight">DhuhaKu</span>
              <span className="bg-emerald-100 text-emerald-800 text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider">
                SDIT
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-400 hidden md:block">
              Instrumen Kesadaran Dhuha & Karakter Islami
            </p>
          </div>
        </div>

        {/* Right Info & Actions */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Active Period (Hidden on mobile) */}
          <div className="hidden lg:flex flex-col text-right">
            <span className="text-xs font-semibold text-slate-700">Ahad, 15 November 2026</span>
            <span className="text-[11px] text-emerald-600 font-medium flex items-center justify-end gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              07.00 - 11.00 WIB
            </span>
          </div>

          {/* User Status Display (Mobile Optimized) */}
          {currentRole === 'siswa' && (
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-2 sm:px-3 py-1 rounded-xl">
              <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 fill-amber-500" />
              <div className="text-left">
                <div className="text-[9px] text-amber-700 font-medium leading-none hidden sm:block">Streak</div>
                <div className="text-xs sm:text-sm font-black text-amber-900 leading-none">{activeStudent.streakCount} Hari</div>
              </div>
            </div>
          )}

          {currentRole === 'guru' && (
            <div className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 px-2 sm:px-3 py-1 rounded-xl">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                UM
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold text-blue-900 leading-tight">Ust. Mansur</div>
                <div className="text-[9px] text-blue-700">Wali Kelas 5-A</div>
              </div>
            </div>
          )}

          {currentRole === 'ortu' && (
            <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-2 sm:px-3 py-1 rounded-xl">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-xs">
                OT
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold text-amber-900 leading-tight truncate max-w-[120px]">
                  {activeStudent.parentName}
                </div>
                <div className="text-[9px] text-amber-700">Wali Santri</div>
              </div>
            </div>
          )}

          {/* Logout Button */}
          {currentUser && (
            <button
              type="button"
              onClick={logout}
              title="Keluar"
              className="flex items-center gap-1 bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-700 border border-slate-200 hover:border-rose-200 p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer active:scale-95"
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
