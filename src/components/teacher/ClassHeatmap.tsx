import React from 'react';
import { useApp } from '../../context/AppContext';
import { Student, DhuhaLog } from '../../types';
import { CheckCircle2, ShieldAlert, XCircle, Clock, AlertCircle } from 'lucide-react';

export const ClassHeatmap: React.FC = () => {
  const { students, logs, todayStr, setActiveStudentId } = useApp();

  const getStudentStatus = (studentId: string): { label: string; color: string; log?: DhuhaLog } => {
    const log = logs.find(l => l.studentId === studentId && l.date === todayStr);
    if (!log) {
      return { label: 'Belum Mengisi', color: 'bg-slate-100 text-slate-500 border-slate-200' };
    }
    if (log.status === 'Ya') {
      return {
        label: `${log.rakaat} Rakaat (${log.location})`,
        color: 'bg-emerald-50 text-emerald-800 border-emerald-300 font-medium',
        log
      };
    }
    if (log.status === 'Udzur') {
      return {
        label: `Udzur (${log.udzurReason || 'Syar\'i'})`,
        color: 'bg-amber-50 text-amber-800 border-amber-300 font-medium',
        log
      };
    }
    return {
      label: 'Tidak Sholat',
      color: 'bg-rose-50 text-rose-800 border-rose-300 font-medium',
      log
    };
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <h3 className="font-bold text-slate-800 text-base">
            Peta Status Kelas Hari Ini (Heatmap Siswa)
          </h3>
          <p className="text-xs text-slate-500">
            Pemantauan visual cepat kehadiran dan kondisi ibadah Dhuha seluruh santri
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-slate-600">Sholat</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span className="text-slate-600">Udzur</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="text-slate-600">Tidak</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
            <span className="text-slate-600">Belum Mengisi</span>
          </div>
        </div>
      </div>

      {/* Grid of Student Cards (Mobile 2-Cols) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
        {students.map(s => {
          const { label, color, log } = getStudentStatus(s.id);
          const isPending = log?.verificationStatus === 'Menunggu';

          return (
            <div
              key={s.id}
              onClick={() => setActiveStudentId(s.id)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer hover:shadow-md flex flex-col justify-between ${color}`}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <img
                  src={s.avatar}
                  alt={s.name}
                  className="w-9 h-9 rounded-full object-cover border border-white shadow-xs"
                />
                <div className="overflow-hidden">
                  <div className="font-bold text-xs truncate text-slate-900">{s.name}</div>
                  <div className="text-[10px] text-slate-500">NIS {s.nis}</div>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="text-[11px] font-semibold flex items-center justify-between">
                  <span>{label}</span>
                  {log?.status === 'Ya' && (
                    <span className="text-[10px] font-mono text-emerald-700 bg-white/70 px-1 rounded">
                      {log.timeString}
                    </span>
                  )}
                </div>

                {isPending && (
                  <span className="inline-flex items-center gap-1 text-[9px] bg-amber-200/80 text-amber-900 px-1.5 py-0.5 rounded font-bold">
                    <Clock className="w-2.5 h-2.5" /> Perlu Approval
                  </span>
                )}
                {log?.verificationStatus === 'Disetujui' && (
                  <span className="inline-flex items-center gap-1 text-[9px] bg-emerald-200/80 text-emerald-950 px-1.5 py-0.5 rounded font-bold">
                    <CheckCircle2 className="w-2.5 h-2.5" /> Approved
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

