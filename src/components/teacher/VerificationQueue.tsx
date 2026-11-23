import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Check, CheckCheck, Clock, BookOpen, Brain, Sparkles, MessageSquare, AlertCircle } from 'lucide-react';

export const VerificationQueue: React.FC = () => {
  const { students, logs, todayStr, verifyLog, verifyAllTodayLogs } = useApp();

  // Filter logs yang tanggal hari ini dan status = Menunggu
  const pendingLogs = logs.filter(
    l => l.date === todayStr && l.verificationStatus === 'Menunggu'
  );

  const [notesMap, setNotesMap] = useState<Record<string, string>>({});

  const handleQuickNote = (logId: string, noteText: string) => {
    setNotesMap(prev => ({ ...prev, [logId]: noteText }));
  };

  const handleApprove = (logId: string) => {
    const note = notesMap[logId] || 'Alhamdulillah, sholat dan bacaan terverifikasi baik.';
    verifyLog(logId, 'Disetujui', note);
  };

  const QUICK_TEMPLATES = [
    'MasyaAllah, sangat istiqomah!',
    'Pertahankan sholat awal waktu di rumah ya.',
    'Bagus sekali bacaan surat tambahannya.',
    'Tingkatkan hafalan dan doa setelah sholat.'
  ];

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-800 text-base">
              Antrean Verifikasi Jurnal Hari Ini
            </h3>
            <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">
              {pendingLogs.length} Menunggu
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Guru cukup klik Approve tanpa perlu menginput data ulang.
          </p>
        </div>

        {pendingLogs.length > 0 && (
          <button
            onClick={verifyAllTodayLogs}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm transition flex items-center justify-center gap-2"
          >
            <CheckCheck className="w-4 h-4" />
            <span>⚡ Setujui Semua ({pendingLogs.length} Siswa)</span>
          </button>
        )}
      </div>

      {pendingLogs.length === 0 ? (
        <div className="text-center py-8 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
          <CheckCheck className="w-8 h-8 mx-auto text-emerald-500 mb-2 opacity-80" />
          <p className="text-xs font-semibold text-slate-700">
            Semua pengisian siswa hari ini telah selesai diverifikasi!
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Data yang telah disetujui otomatis tampil di dashboard orang tua.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {pendingLogs.map(log => {
            const student = students.find(s => s.id === log.studentId);
            if (!student) return null;

            return (
              <div
                key={log.id}
                className="p-4 rounded-xl border border-amber-200/80 bg-amber-50/20 hover:bg-amber-50/40 transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                {/* Student Info & Prayer Details */}
                <div className="flex items-start gap-3 flex-1">
                  <img
                    src={student.avatar}
                    alt={student.name}
                    className="w-11 h-11 rounded-full object-cover border border-slate-200 flex-shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{student.name}</span>
                      <span className="text-[10px] text-slate-500 font-mono">NIS {student.nis}</span>
                      {log.isIndependent && (
                        <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                          ⚡ Mandiri
                        </span>
                      )}
                    </div>

                    {/* Summary row */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                      <span className="bg-white px-2 py-0.5 rounded border border-slate-200 font-medium">
                        🕌 {log.status === 'Ya' ? `${log.rakaat} Rakaat` : 'Berhalangan (Udzur)'}
                      </span>
                      <span className="bg-white px-2 py-0.5 rounded border border-slate-200">
                        📍 {log.location} {log.isJamaah ? '(Berjamaah)' : ''}
                      </span>
                      <span className="bg-white px-2 py-0.5 rounded border border-slate-200">
                        ⏰ {log.timeString} WIB ({log.timeSlot})
                      </span>
                    </div>

                    {/* Surah & Quiz Row */}
                    <div className="flex flex-wrap items-center gap-3 text-xs pt-1">
                      {log.surahList.length > 0 && (
                        <div className="flex items-center gap-1 text-slate-700">
                          <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                          <span>
                            Surat: <strong>{log.surahList.join(', ')}</strong>
                          </span>
                        </div>
                      )}

                      {log.quizTaken && (
                        <div className="flex items-center gap-1 text-slate-700">
                          <Brain className="w-3.5 h-3.5 text-emerald-600" />
                          <span>
                            Kuis: <strong>{log.quizScore}/100</strong>
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Quick Note & Approve Action */}
                <div className="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-shrink-0">
                  <div className="flex flex-col gap-1 w-full sm:w-64">
                    <input
                      type="text"
                      placeholder="Catatan guru untuk ananda & ortu..."
                      value={notesMap[log.id] || ''}
                      onChange={e => handleQuickNote(log.id, e.target.value)}
                      className="text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                    <div className="flex items-center gap-1 overflow-x-auto pb-0.5">
                      {QUICK_TEMPLATES.map((tmpl, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleQuickNote(log.id, tmpl)}
                          className="text-[9px] whitespace-nowrap bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 px-1.5 py-0.5 rounded"
                        >
                          +{tmpl.slice(0, 16)}...
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleApprove(log.id)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Approve</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

