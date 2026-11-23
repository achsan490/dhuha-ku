import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DailyFeed } from './DailyFeed';
import { CharacterReport } from './CharacterReport';
import { Heart, Users, Sparkles, Check, CheckCircle2 } from 'lucide-react';

export const ParentView: React.FC = () => {
  const { activeStudentId, students, logs, todayStr, showToast } = useApp();
  const student = students.find(s => s.id === activeStudentId) || students[0];
  const todayLog = logs.find(l => l.studentId === student.id && l.date === todayStr);

  const [hasConfirmedHome, setHasConfirmedHome] = useState<boolean>(false);

  const handleConfirmHome = () => {
    setHasConfirmedHome(true);
    showToast('Terima kasih Ayah/Bunda! Konfirmasi pendampingan di rumah berhasil dicatat untuk guru.');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Parent */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-slate-900 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/30 border border-amber-300/40 flex items-center justify-center text-white flex-shrink-0">
              <Users className="w-7 h-7 text-amber-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-amber-500/40 text-amber-100 px-2.5 py-0.5 rounded-full font-semibold border border-amber-400/30">
                  Ruang Orang Tua
                </span>
                <span className="text-xs text-slate-300">Wali Santri</span>
              </div>
              <h2 className="text-2xl font-black tracking-tight mt-1">
                Assalamu'alaikum, {student.parentName}
              </h2>
              <p className="text-xs text-amber-100 mt-0.5">
                Memantau tumbuh kembang karakter & pembiasaan ibadah ananda <strong>{student.name}</strong> ({student.className})
              </p>
            </div>
          </div>

          {/* Quick Confirmation Button from Parent */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/20 text-right w-full sm:w-auto">
            <div className="text-[10px] text-amber-200 font-semibold uppercase tracking-wider mb-1">
              Konfirmasi Orang Tua di Rumah
            </div>
            {hasConfirmedHome ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-400 text-emerald-950 px-3 py-1.5 rounded-xl shadow-sm">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Telah Terkonfirmasi
              </span>
            ) : (
              <button
                onClick={handleConfirmHome}
                className="bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold text-xs px-3.5 py-1.5 rounded-xl transition flex items-center justify-end gap-1.5 ml-auto"
              >
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Konfirmasi Dampingi Hari Ini</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 1. Kabar Harian Tervalidasi */}
      <DailyFeed student={student} todayLog={todayLog} />

      {/* 2. Rapor Karakter Islami (Bukan Angka Ibadah Semata) */}
      <CharacterReport student={student} logs={logs} />
    </div>
  );
};

