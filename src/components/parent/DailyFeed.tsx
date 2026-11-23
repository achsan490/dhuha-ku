import React from 'react';
import { useApp } from '../../context/AppContext';
import { Student, DhuhaLog } from '../../types';
import { CheckCircle2, ShieldCheck, Clock, BookOpen, Brain, Heart, Home, AlertCircle } from 'lucide-react';

export const DailyFeed: React.FC<{ student: Student; todayLog?: DhuhaLog }> = ({
  student,
  todayLog
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-bold text-slate-800 text-base">
            Kabar Ibadah Harian Ananda Hari Ini
          </h3>
          <p className="text-xs text-slate-500">
            Ahad, 15 November 2026 • SDIT Nurul Iman
          </p>
        </div>

        {todayLog && (
          <div>
            {todayLog.verificationStatus === 'Disetujui' ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-300">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Diverifikasi oleh {todayLog.verifiedBy || 'Wali Kelas'}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-amber-100 text-amber-800 px-3 py-1 rounded-full border border-amber-300">
                <Clock className="w-4 h-4 text-amber-600" />
                Data Baru Masuk (Menunggu Verifikasi Guru)
              </span>
            )}
          </div>
        )}
      </div>

      {!todayLog ? (
        <div className="text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-200">
          <AlertCircle className="w-8 h-8 text-amber-500 mx-auto mb-2 opacity-80" />
          <p className="text-xs font-semibold text-slate-700">
            Ananda belum mengisi jurnal Dhuha untuk hari ini.
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Ayah/Bunda dapat mengingatkan dengan penuh kelembutan sebelum jam 11.00 WIB.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Status Utama */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 via-teal-50 to-white border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-bold text-emerald-900">
                  {todayLog.status === 'Ya'
                    ? `Sholat Dhuha ${todayLog.rakaat} Rakaat`
                    : todayLog.status === 'Udzur'
                    ? `Berhalangan Syar'i (${todayLog.udzurReason})`
                    : 'Tidak Melaksanakan Dhuha'}
                </div>
                <div className="text-xs text-slate-600 mt-0.5 flex items-center gap-2">
                  <span>📍 Tempat: <strong>{todayLog.location}</strong></span>
                  <span>•</span>
                  <span>⏰ Pukul: <strong>{todayLog.timeString} WIB</strong> ({todayLog.timeSlot})</span>
                </div>
              </div>
            </div>

            {todayLog.isIndependent && (
              <span className="text-xs bg-emerald-200/80 text-emerald-900 font-bold px-2.5 py-1 rounded-lg">
                ⚡ Inisiatif Sendiri
              </span>
            )}
          </div>

          {/* Rincian Bacaan & Kuis */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Surat yang dibaca */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-1.5">
                <BookOpen className="w-4 h-4 text-teal-600" />
                <span>Bacaan Al-Qur'an & Doa</span>
              </div>
              {todayLog.surahList.length > 0 ? (
                <div className="space-y-1">
                  <div className="text-xs text-slate-700">
                    Surat: <strong>{todayLog.surahList.join(', ')}</strong>
                  </div>
                  {todayLog.favoriteSurah && (
                    <div className="text-[11px] text-amber-700">
                      ⭐ Surat Favorit: <strong>{todayLog.favoriteSurah}</strong>
                    </div>
                  )}
                  <div className="text-[11px] text-emerald-700 font-medium">
                    {todayLog.hasDoaAfterDhuha ? '✅ Melengkapi doa setelah Dhuha' : 'Belum membaca doa'}
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-500">Tidak ada bacaan tambahan yang dicatat</div>
              )}
            </div>

            {/* Kuis Kesadaran */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 mb-1.5">
                <Brain className="w-4 h-4 text-emerald-600" />
                <span>Kuis Pemahaman Hari Ini</span>
              </div>
              {todayLog.quizTaken ? (
                <div className="space-y-1">
                  <div className="text-xs text-slate-700 flex items-center justify-between">
                    <span>Topik: <strong>{todayLog.quizTopic || 'Fiqih Dhuha'}</strong></span>
                    <span className="text-sm font-black text-emerald-700">{todayLog.quizScore}/100</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {todayLog.quizAttempts && todayLog.quizAttempts > 1
                      ? `Mencoba ${todayLog.quizAttempts}x (menunjukkan kemauan belajar)`
                      : 'Menjawab dengan baik pada percobaan pertama'}
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-500">Belum mengerjakan kuis singkat hari ini</div>
              )}
            </div>
          </div>

          {/* Refleksi Hati Ananda (Kejujuran Karakter) */}
          {todayLog.reflectiveAnswer && (
            <div className="p-3.5 bg-gradient-to-r from-emerald-50 to-teal-50/50 border border-emerald-200/80 rounded-xl text-xs flex items-start gap-2.5">
              <span className="text-base">🪞</span>
              <div className="flex-1">
                <span className="text-[11px] font-bold text-emerald-950 block">
                  Refleksi Kejujuran Hati Ananda Hari Ini:
                </span>
                <p className="text-xs text-emerald-900 italic mt-0.5">
                  "{todayLog.reflectiveAnswer.answer}"
                </p>
                <span className="text-[10px] text-emerald-700 mt-1 block">
                  Indikator: {todayLog.reflectiveAnswer.indicator} • Dituangkan secara jujur tanpa tekanan nilai
                </span>
              </div>
            </div>
          )}

          {/* Catatan Khusus dari Guru untuk Orang Tua */}
          {todayLog.teacherNotes && (
            <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl flex items-start gap-3">
              <Heart className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-bold text-amber-900">
                  Pesan dari {todayLog.verifiedBy || 'Wali Kelas'}:
                </div>
                <p className="text-xs text-amber-950 italic mt-0.5 leading-relaxed">
                  "{todayLog.teacherNotes}"
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

