import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ClassHeatmap } from './ClassHeatmap';
import { VerificationQueue } from './VerificationQueue';
import { AwarenessRadar } from './AwarenessRadar';
import { StudentManagement } from './StudentManagement';
import { QuestionBankViewer } from './QuestionBankViewer';
import { Users, CheckCircle2, Clock, AlertCircle, Sparkles, Send, LayoutDashboard, UserCheck, BookOpen } from 'lucide-react';

export const TeacherView: React.FC = () => {
  const { students, logs, todayStr, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'rekap' | 'santri' | 'bank_soal'>('rekap');

  const totalStudents = students.length;
  const todayLogs = logs.filter(l => l.date === todayStr);
  const prayerCount = todayLogs.filter(l => l.status === 'Ya').length;
  const udzurCount = todayLogs.filter(l => l.status === 'Udzur').length;
  const pendingCount = todayLogs.filter(l => l.verificationStatus === 'Menunggu').length;
  const unsubmittedCount = totalStudents - todayLogs.length;

  const prayerPercentage = Math.round((prayerCount / (totalStudents - udzurCount || 1)) * 100);

  const handleBroadcastReminder = () => {
    showToast('📢 Notifikasi pengingat Dhuha berhasil dikirim ke siswa yang belum mengisi!');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Quick Metrics */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-blue-500/30 text-blue-200 px-2.5 py-0.5 rounded-full font-semibold border border-blue-400/30">
                Pusat Kontrol Wali Kelas 5-A (Admin)
              </span>
              <span className="text-xs text-slate-300">Ustadz Mansur, S.Pd.I</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight mt-1">
              Rekapitulasi Kesadaran Dhuha & Manajemen Kelas
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Kelola santri, verifikasi jurnal harian 1-klik, dan pantau peta kesadaran kelas.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {unsubmittedCount > 0 && (
              <button
                type="button"
                onClick={handleBroadcastReminder}
                className="bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs px-3.5 py-2.5 rounded-xl shadow-md transition flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Ingatkan {unsubmittedCount} Siswa</span>
              </button>
            )}
          </div>
        </div>

        {/* 4 Stats Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <div className="text-[10px] text-blue-200 font-medium">Partisipasi Sholat Hari Ini</div>
            <div className="text-2xl font-black text-white mt-0.5">{prayerPercentage}%</div>
            <div className="text-[10px] text-emerald-300">
              {prayerCount} dari {totalStudents} santri
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <div className="text-[10px] text-amber-200 font-medium">Menunggu Verifikasi</div>
            <div className="text-2xl font-black text-amber-300 mt-0.5">{pendingCount}</div>
            <div className="text-[10px] text-slate-300">Butuh approval guru</div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <div className="text-[10px] text-purple-200 font-medium">Berhalangan (Udzur)</div>
            <div className="text-2xl font-black text-purple-300 mt-0.5">{udzurCount}</div>
            <div className="text-[10px] text-slate-300">Normalisasi syar'i aktif</div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10">
            <div className="text-[10px] text-rose-200 font-medium">Belum Mengisi</div>
            <div className="text-2xl font-black text-rose-300 mt-0.5">{unsubmittedCount}</div>
            <div className="text-[10px] text-slate-300">Perlu ditindaklanjuti</div>
          </div>
        </div>
      </div>

      {/* Navigasi Tab Guru: Rekap vs Kelola Santri vs Bank Soal */}
      <div className="flex flex-wrap border-b border-slate-200 bg-white rounded-2xl p-1 shadow-xs gap-1">
        <button
          type="button"
          onClick={() => setActiveTab('rekap')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition cursor-pointer ${
            activeTab === 'rekap'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>Rekap & Verifikasi Jurnal</span>
          {pendingCount > 0 && (
            <span className="bg-amber-400 text-amber-950 text-[10px] px-1.5 py-0.2 rounded-full font-black">
              {pendingCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('santri')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition cursor-pointer ${
            activeTab === 'santri'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Kelola Santri & Ortu ({totalStudents})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('bank_soal')}
          className={`flex-1 min-w-[140px] py-2.5 px-3 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition cursor-pointer ${
            activeTab === 'bank_soal'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Bank Soal Lengkap (48 Butir)</span>
        </button>
      </div>

      {/* Konten Berdasarkan Tab Aktif */}
      {activeTab === 'rekap' && (
        <div className="space-y-6">
          {/* Antrean Verifikasi (Paling Penting untuk Guru) */}
          <VerificationQueue />

          {/* Heatmap Kelas */}
          <ClassHeatmap />

          {/* Rekap Skor Kesadaran (Indikator Guru) */}
          <AwarenessRadar />
        </div>
      )}

      {activeTab === 'santri' && (
        <div className="space-y-6">
          <StudentManagement />
        </div>
      )}

      {activeTab === 'bank_soal' && (
        <div className="space-y-6">
          <QuestionBankViewer />
        </div>
      )}
    </div>
  );
};
