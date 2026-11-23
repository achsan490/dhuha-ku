import React from 'react';
import { useApp } from '../../context/AppContext';
import { calculateAwarenessMetrics } from '../../utils/scoreCalculator';
import { Award, Flame, TrendingUp, AlertTriangle, HelpCircle, BookOpen, Home } from 'lucide-react';

export const AwarenessRadar: React.FC = () => {
  const { students, logs } = useApp();

  // Hitung metrik kesadaran setiap siswa
  const studentMetrics = students.map(s => {
    const metrics = calculateAwarenessMetrics(s.id, logs, 24);
    return {
      student: s,
      ...metrics
    };
  });

  // Urutkan berdasarkan Skor Kesadaran tertinggi
  const sortedMetrics = [...studentMetrics].sort((a, b) => b.awarenessScore - a.awarenessScore);

  // Rata-rata kelas
  const avgClassAwareness = Math.round(
    sortedMetrics.reduce((acc, curr) => acc + curr.awarenessScore, 0) / sortedMetrics.length
  );

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-5">
      {/* Header & Formula Explanation */}
      <div className="border-b border-slate-100 pb-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-800 text-base">
              Rekap Skor Kesadaran Siswa (Indikator Guru)
            </h3>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded-full">
              Rata-rata Kelas: {avgClassAwareness}/100
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Mendeteksi siswa yang benar-benar sadar vs sekadar ikut-ikutan
          </p>
        </div>

        {/* Formula Tooltip Pill */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-[11px] text-slate-600 flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
          <span>
            Formula: <strong>(Konsistensi × 40%)</strong> + <strong>(Kelengkapan Bacaan × 30%)</strong> + <strong>(Kuis × 30%)</strong>
          </span>
        </div>
      </div>

      {/* Table of Awareness Metrics */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px] bg-slate-50/50">
              <th className="py-2.5 px-3 font-semibold">Nama Siswa</th>
              <th className="py-2.5 px-3 font-semibold text-center">Konsistensi (40%)</th>
              <th className="py-2.5 px-3 font-semibold text-center">Bacaan & Doa (30%)</th>
              <th className="py-2.5 px-3 font-semibold text-center">Skor Kuis (30%)</th>
              <th className="py-2.5 px-3 font-semibold text-center">Skor Kesadaran</th>
              <th className="py-2.5 px-3 font-semibold text-center">Kategori</th>
              <th className="py-2.5 px-3 font-semibold text-center">Inisiatif Mandiri</th>
              <th className="py-2.5 px-3 font-semibold text-center">Di Rumah</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sortedMetrics.map(({ student, consistencyScore, readingCompletenessScore, quizAvgScore, awarenessScore, category, streak, initiativeRatio, homeRatio }) => {
              let badgeColor = 'bg-emerald-100 text-emerald-800 border-emerald-200';
              if (category === 'Berkembang') {
                badgeColor = 'bg-amber-100 text-amber-800 border-amber-200';
              } else if (category === 'Perlu Pendampingan') {
                badgeColor = 'bg-rose-100 text-rose-800 border-rose-200';
              }

              return (
                <tr key={student.id} className="hover:bg-slate-50/70 transition">
                  {/* Nama */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <div className="font-bold text-slate-900">{student.name}</div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-1">
                          <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                          <span>Streak {streak} Hari</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Konsistensi */}
                  <td className="py-3 px-3 text-center">
                    <span className="font-bold text-slate-800">{consistencyScore}%</span>
                  </td>

                  {/* Kelengkapan Bacaan */}
                  <td className="py-3 px-3 text-center">
                    <span className="font-bold text-slate-800">{readingCompletenessScore}%</span>
                  </td>

                  {/* Skor Kuis */}
                  <td className="py-3 px-3 text-center">
                    <span className="font-bold text-slate-800">{quizAvgScore}</span>
                  </td>

                  {/* Skor Kesadaran */}
                  <td className="py-3 px-3 text-center">
                    <div className="inline-block px-2.5 py-1 rounded-lg font-black text-sm bg-slate-900 text-white">
                      {awarenessScore}
                    </div>
                  </td>

                  {/* Kategori */}
                  <td className="py-3 px-3 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${badgeColor}`}>
                      {category}
                    </span>
                  </td>

                  {/* Inisiatif */}
                  <td className="py-3 px-3 text-center">
                    <span className="font-semibold text-emerald-700">{initiativeRatio}%</span>
                  </td>

                  {/* Kemandirian di Rumah */}
                  <td className="py-3 px-3 text-center">
                    <span className="font-semibold text-blue-700">{homeRatio}%</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Evaluation Insights for Class */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
        <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200/80">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 mb-1">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>Kekuatan Utama Kelas</span>
          </div>
          <p className="text-[11px] text-emerald-800 leading-relaxed">
            Tingkat inisiatif sholat awal waktu mencapai <strong>84%</strong>. Siswa sangat antusias dengan bacaan Surat Ad-Dhuha dan Al-Insyirah.
          </p>
        </div>

        <div className="p-3.5 bg-amber-50/60 rounded-xl border border-amber-200/80">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-1">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Fokus Perbaikan (Topik Lemah)</span>
          </div>
          <p className="text-[11px] text-amber-800 leading-relaxed">
            Topik kuis tentang <strong>Makna Doa Dhuha & Adab Khusyuk</strong> rata-rata masih di angka 68. Perlu review singkat saat kultum dhuha.
          </p>
        </div>

        <div className="p-3.5 bg-blue-50/60 rounded-xl border border-blue-200/80">
          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900 mb-1">
            <Home className="w-4 h-4 text-blue-600" />
            <span>Kemandirian di Rumah</span>
          </div>
          <p className="text-[11px] text-blue-800 leading-relaxed">
            <strong>62%</strong> pelaksanaan ibadah dhuha berhasil dilakukan di rumah, membuktikan kebiasaan mulai terbawa di luar jam sekolah.
          </p>
        </div>
      </div>
    </div>
  );
};

