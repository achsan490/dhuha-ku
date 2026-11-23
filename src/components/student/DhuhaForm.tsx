import React from 'react';
import { DhuhaStatus, TimeSlot, LocationType } from '../../types';
import { Check, X, ShieldAlert, Home, School, Landmark, Clock, Users, Camera, Info } from 'lucide-react';

interface DhuhaFormProps {
  status: DhuhaStatus;
  setStatus: (s: DhuhaStatus) => void;
  udzurReason: 'Haid' | 'Sakit' | 'Musafir' | 'Lainnya';
  setUdzurReason: (r: 'Haid' | 'Sakit' | 'Musafir' | 'Lainnya') => void;
  rakaat: number;
  setRakaat: (r: number) => void;
  timeSlot: TimeSlot;
  setTimeSlot: (t: TimeSlot) => void;
  location: LocationType;
  setLocation: (l: LocationType) => void;
  isJamaah: boolean;
  setIsJamaah: (j: boolean) => void;
  isIndependent: boolean;
  setIsIndependent: (i: boolean) => void;
  hasPhoto: boolean;
  setHasPhoto: (p: boolean) => void;
  gender: 'L' | 'P';
}

export const DhuhaForm: React.FC<DhuhaFormProps> = ({
  status,
  setStatus,
  udzurReason,
  setUdzurReason,
  rakaat,
  setRakaat,
  timeSlot,
  setTimeSlot,
  location,
  setLocation,
  isJamaah,
  setIsJamaah,
  isIndependent,
  setIsIndependent,
  hasPhoto,
  setHasPhoto,
  gender
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-6">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            1. Form Sholat Dhuha Harian
          </h3>
          <p className="text-xs text-slate-500">
            Diisi dengan jujur setiap pagi untuk melatih kesadaran & istiqomah
          </p>
        </div>
      </div>

      {/* A. Status Sholat */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Status Dhuha Hari Ini
        </label>
        <div className="grid grid-cols-3 gap-2">
          {/* YA */}
          <button
            type="button"
            onClick={() => setStatus('Ya')}
            className={`p-2.5 sm:p-3.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
              status === 'Ya'
                ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold ring-2 ring-emerald-500/20'
                : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-slate-50/50'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                status === 'Ya' ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
              }`}
            >
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
            <span className="text-[11px] sm:text-xs font-bold leading-tight">Sholat</span>
          </button>

          {/* UDZUR */}
          <button
            type="button"
            onClick={() => setStatus('Udzur')}
            className={`p-2.5 sm:p-3.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
              status === 'Udzur'
                ? 'border-amber-500 bg-amber-50 text-amber-900 font-bold ring-2 ring-amber-500/20'
                : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-slate-50/50'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                status === 'Udzur' ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-500'
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
            </div>
            <span className="text-[11px] sm:text-xs font-bold leading-tight">Udzur</span>
          </button>

          {/* TIDAK */}
          <button
            type="button"
            onClick={() => setStatus('Tidak')}
            className={`p-2.5 sm:p-3.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
              status === 'Tidak'
                ? 'border-rose-500 bg-rose-50 text-rose-900 font-bold ring-2 ring-rose-500/20'
                : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-slate-50/50'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center ${
                status === 'Tidak' ? 'bg-rose-500 text-white' : 'bg-slate-200 text-slate-500'
              }`}
            >
              <X className="w-4 h-4 stroke-[3]" />
            </div>
            <span className="text-[11px] sm:text-xs font-bold leading-tight">Terlewat</span>
          </button>
        </div>

        {/* Udzur Note & Reason Selector */}
        {status === 'Udzur' && (
          <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-2 animate-fadeIn">
            <div className="flex items-start gap-2 text-xs text-amber-800">
              <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Prinsip Syar'i:</strong> Status Udzur tidak menurunkan skor kesadaran ananda. Sistem secara adil menormalkan hari aktif.
              </span>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs font-semibold text-amber-900">Alasan Udzur:</span>
              <select
                value={udzurReason}
                onChange={e => setUdzurReason(e.target.value as any)}
                className="text-xs bg-white border border-amber-300 rounded-lg px-2.5 py-1 text-slate-700 font-medium focus:outline-none"
              >
                {gender === 'P' && <option value="Haid">Sedang Haid / Berhalangan</option>}
                <option value="Sakit">Sakit / Istirahat Medis</option>
                <option value="Musafir">Dalam Perjalanan Jauh (Musafir)</option>
                <option value="Lainnya">Keperluan Mendesak Lainnya</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Jika Sholat = Ya, Tampilkan Detail Indikator */}
      {status === 'Ya' && (
        <div className="space-y-5 animate-fadeIn">
          {/* Jumlah Rakaat */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Jumlah Rakaat
              </label>
              <span className="text-[11px] text-slate-500">Minimal 2, Sunnah hingga 12</span>
            </div>
            <div className="grid grid-cols-6 gap-1.5 sm:gap-2">
              {[2, 4, 6, 8, 10, 12].map(r => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRakaat(r)}
                  className={`py-2 sm:py-2.5 rounded-xl border flex flex-col items-center justify-center transition-all cursor-pointer ${
                    rakaat === r
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300'
                  }`}
                >
                  <span className="text-sm font-black leading-none">{r}</span>
                  <span className="text-[9px] opacity-75 mt-0.5">Rakaat</span>
                </button>
              ))}
            </div>
          </div>

          {/* Waktu Pelaksanaan */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Waktu Pelaksanaan (Disiplin Waktu)
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'Awal', label: 'Awal Dhuha', range: '07.00 - 08.30 (Isyraq)' },
                { id: 'Pertengahan', label: 'Pertengahan', range: '08.30 - 10.00' },
                { id: 'Akhir', label: 'Akhir Dhuha', range: '10.00 - 11.30' },
              ].map(w => (
                <button
                  key={w.id}
                  type="button"
                  onClick={() => setTimeSlot(w.id as TimeSlot)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    timeSlot === w.id
                      ? 'border-emerald-600 bg-emerald-50/60 ring-1 ring-emerald-500'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{w.label}</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{w.range}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Tempat & Berjamaah */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tempat */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Tempat Sholat
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'Rumah', icon: Home, label: 'Rumah' },
                  { id: 'Masjid', icon: Landmark, label: 'Masjid' },
                  { id: 'Sekolah', icon: School, label: 'Sekolah' },
                ].map(loc => {
                  const Icon = loc.icon;
                  return (
                    <button
                      key={loc.id}
                      type="button"
                      onClick={() => setLocation(loc.id as LocationType)}
                      className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 text-xs transition-all ${
                        location === loc.id
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                          : 'border-slate-200 hover:border-slate-300 text-slate-600 bg-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{loc.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Berjamaah & Inisiatif */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Kondisi Sholat
              </label>
              <div className="flex flex-col gap-2">
                {/* Berjamaah toggle */}
                <label className="flex items-center justify-between p-2.5 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-medium text-slate-700">Dikerjakan Berjamaah</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={isJamaah}
                    onChange={e => setIsJamaah(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                </label>

                {/* Inisiatif mandiri toggle */}
                <label className="flex items-center justify-between p-2.5 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-700">
                      ⚡ Inisiatif Mandiri (Tanpa Diingatkan)
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={isIndependent}
                    onChange={e => setIsIndependent(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Bukti Foto (Opsional) */}
          <div className="p-3.5 bg-slate-50 border border-dashed border-slate-300 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-800">
                  Bukti Foto di Masjid / Sajadah (Opsional)
                </div>
                <div className="text-[11px] text-slate-500">
                  {hasPhoto ? '✅ Foto selfie ibadah berhasil dilampirkan' : 'Untuk validasi ekstra jika dipersyaratkan sekolah'}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setHasPhoto(!hasPhoto)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition ${
                hasPhoto
                  ? 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {hasPhoto ? 'Hapus Foto' : '+ Lampirkan'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

