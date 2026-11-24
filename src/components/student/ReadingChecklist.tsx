import React from 'react';
import { SURAH_OPTIONS } from '../../data/mockData';
import { HafalanStatus } from '../../types';
import { BookOpen, Star, Sparkles, CheckSquare, Award } from 'lucide-react';

interface ReadingChecklistProps {
  surahList: string[];
  setSurahList: (list: string[]) => void;
  favoriteSurah: string;
  setFavoriteSurah: (s: string) => void;
  hasDoaAfterDhuha: boolean;
  setHasDoaAfterDhuha: (h: boolean) => void;
  hafalanSurah: string;
  setHafalanSurah: (s: string) => void;
  hafalanStatus: HafalanStatus;
  setHafalanStatus: (h: HafalanStatus) => void;
}

export const ReadingChecklist: React.FC<ReadingChecklistProps> = ({
  surahList,
  setSurahList,
  favoriteSurah,
  setFavoriteSurah,
  hasDoaAfterDhuha,
  setHasDoaAfterDhuha,
  hafalanSurah,
  setHafalanSurah,
  hafalanStatus,
  setHafalanStatus
}) => {
  const toggleSurah = (surahName: string) => {
    if (surahList.includes(surahName)) {
      const updated = surahList.filter(s => s !== surahName);
      setSurahList(updated);
      if (favoriteSurah === surahName) {
        setFavoriteSurah(updated[0] || '');
      }
    } else {
      const updated = [...surahList, surahName];
      setSurahList(updated);
      if (!favoriteSurah) {
        setFavoriteSurah(surahName);
      }
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-6">
      <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-teal-500" />
            2. Checklist Bacaan Surat & Doa
          </h3>
          <p className="text-xs text-slate-500">
            Mengukur kualitas dan kedalaman bacaan saat sholat Dhuha
          </p>
        </div>
        <span className="text-xs bg-teal-50 text-teal-700 font-bold px-2.5 py-1 rounded-full border border-teal-200">
          {surahList.length} Surat Dipilih
        </span>
      </div>

      {/* Checklist Surat */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Pilih Surat yang Dibaca Hari Ini (Bisa Lebih Dari Satu)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {SURAH_OPTIONS.map(s => {
            const isChecked = surahList.includes(s.name);
            return (
              <div
                key={s.id}
                onClick={() => toggleSurah(s.name)}
                className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                  isChecked
                    ? 'border-teal-600 bg-teal-50/60 ring-1 ring-teal-500'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center mt-0.5 transition ${
                    isChecked ? 'bg-teal-600 text-white' : 'border border-slate-300 bg-white'
                  }`}
                >
                  {isChecked && <CheckSquare className="w-3.5 h-3.5" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">{s.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{s.ayat}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{s.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Surat Favorit & Doa Setelah Dhuha */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        {/* Surat Favorit */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mb-1.5">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Surat Favorit Hari Ini:</span>
          </label>
          <select
            value={favoriteSurah}
            onChange={e => setFavoriteSurah(e.target.value)}
            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:ring-1 focus:ring-teal-500"
          >
            <option value="">-- Pilih Surat Favorit --</option>
            {SURAH_OPTIONS.map(s => (
              <option key={s.id} value={s.name}>
                Surat {s.name}
              </option>
            ))}
          </select>
          <p className="text-[11px] text-slate-500 mt-1">
            Membantu guru dan orang tua melihat minat tadabbur ananda.
          </p>
        </div>

        {/* Doa Setelah Dhuha */}
        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex flex-col justify-between">
          <div>
            <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" />
              <span>Doa Setelah Sholat Dhuha:</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              "Allahumma inna adh-dhuha'a dhuha-uk..."
            </p>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <button
              type="button"
              onClick={() => setHasDoaAfterDhuha(true)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition ${
                hasDoaAfterDhuha
                  ? 'bg-teal-600 text-white border-teal-600'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              ✅ Sudah Berdoa
            </button>
            <button
              type="button"
              onClick={() => setHasDoaAfterDhuha(false)}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition ${
                !hasDoaAfterDhuha
                  ? 'bg-slate-700 text-white border-slate-700'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              Belum
            </button>
          </div>
        </div>
      </div>

      {/* Hafalan (Tahfidz Sekolah - Opsional) */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-emerald-600" />
            <span className="text-xs font-bold text-slate-800">
              Setoran Hafalan Surat Dhuha (Opsional Tahfidz)
            </span>
          </div>
          <span className="text-[10px] text-slate-500 bg-white px-2 py-0.5 rounded border">
            Program Sekolah
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
              Surat yang Disetorkan:
            </label>
            <select
              value={hafalanSurah}
              onChange={e => setHafalanSurah(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium"
            >
              <option value="">-- Belum Ada Setoran --</option>
              <option value="Ad-Dhuha">Surat Ad-Dhuha (11 Ayat)</option>
              <option value="Asy-Syams">Surat Asy-Syams (15 Ayat)</option>
              <option value="Al-Lail">Surat Al-Lail (21 Ayat)</option>
              <option value="Al-Insyirah">Surat Al-Insyirah (8 Ayat)</option>
            </select>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
              Kualitas Hafalan:
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['Lancar', 'Terbata-bata', 'Belum'] as HafalanStatus[]).map(status => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setHafalanStatus(status)}
                  className={`py-1 rounded-lg text-[11px] font-bold border transition ${
                    hafalanStatus === status
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

