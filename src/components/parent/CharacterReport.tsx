import React from 'react';
import { Student, DhuhaLog } from '../../types';
import { generateParentCharacterReport } from '../../utils/scoreCalculator';
import { ShieldCheck, Heart, Sparkles, BookOpen, Compass, Award, Lightbulb, CheckCircle2, Calendar, TrendingUp } from 'lucide-react';

export const CharacterReport: React.FC<{ student: Student; logs: DhuhaLog[] }> = ({
  student,
  logs
}) => {
  const report = generateParentCharacterReport(student, logs, 24);

  // Simulasi 28 hari kalender bulan ini untuk Heatmap Konsistensi Ortu
  const monthlyDays = Array.from({ length: 28 }, (_, i) => {
    const dayNum = i + 1;
    // Logika mapping riwayat sholat siswa
    if (student.id === 'std-1') {
      // Ahmad: Sangat konsisten (24 hari sholat, 4 hari weekend/libur)
      const isWeekend = dayNum % 7 === 0 || dayNum % 7 === 6;
      return { day: dayNum, status: isWeekend ? 'Libur' : 'Sholat', rakaat: 4 };
    } else if (student.id === 'std-2') {
      // Fatimah: Ada 3 hari Udzur haid
      if (dayNum >= 12 && dayNum <= 14) return { day: dayNum, status: 'Udzur', reason: 'Haid' };
      const isWeekend = dayNum % 7 === 0 || dayNum % 7 === 6;
      return { day: dayNum, status: isWeekend ? 'Libur' : 'Sholat', rakaat: 4 };
    } else if (student.id === 'std-3') {
      // Rayhan: Berkembang (ada bolong 3 hari)
      if (dayNum === 5 || dayNum === 11 || dayNum === 18) return { day: dayNum, status: 'Tidak' };
      const isWeekend = dayNum % 7 === 0 || dayNum % 7 === 6;
      return { day: dayNum, status: isWeekend ? 'Libur' : 'Sholat', rakaat: 2 };
    } else {
      // Bilal / lainnya
      if (dayNum % 4 === 0) return { day: dayNum, status: 'Tidak' };
      const isWeekend = dayNum % 7 === 0 || dayNum % 7 === 6;
      return { day: dayNum, status: isWeekend ? 'Libur' : 'Sholat', rakaat: 2 };
    }
  });

  const totalSholat = monthlyDays.filter(d => d.status === 'Sholat').length;
  const totalUdzur = monthlyDays.filter(d => d.status === 'Udzur').length;
  const totalTidak = monthlyDays.filter(d => d.status === 'Tidak').length;

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-6">
      {/* Header Rapor Karakter */}
      <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-800 text-base">
              Rapor Karakter Islami Ananda
            </h3>
            <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-0.5 rounded-full">
              {report.periodName} (November 2026)
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Fokus pada pembentukan akhlak, kedisiplinan, dan kesadaran ruhaniyah (bukan sekadar angka)
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Target Karakter:</span>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
            Mandiri & Istiqomah
          </span>
        </div>
      </div>

      {/* 4 Pilar Karakter Utama (Cards dengan Visual Bar) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. KEDISIPLINAN */}
        <div className="p-4 rounded-xl border border-emerald-200/80 bg-emerald-50/20 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-emerald-600" /> Kedisiplinan
              </span>
              <span className="text-sm font-black text-emerald-800">{report.disciplineScore}%</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Konsistensi streak & ketepatan sholat di awal waktu.
            </p>
          </div>
          <div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${report.disciplineScore}%` }}
              />
            </div>
            <span className="text-[10px] font-bold text-emerald-700 mt-1.5 inline-block">
              {report.disciplineScore >= 80 ? '🌟 Sangat Disiplin' : '🌱 Berkembang'}
            </span>
          </div>
        </div>

        {/* 2. KEMANDIRIAN */}
        <div className="p-4 rounded-xl border border-blue-200/80 bg-blue-50/20 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" /> Kemandirian
              </span>
              <span className="text-sm font-black text-blue-800">{report.independenceScore}%</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Sholat tanpa disuruh & kesadaran sholat di rumah.
            </p>
          </div>
          <div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-blue-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${report.independenceScore}%` }}
              />
            </div>
            <span className="text-[10px] font-bold text-blue-700 mt-1.5 inline-block">
              Badge: <strong>{report.independenceBadge}</strong>
            </span>
          </div>
        </div>

        {/* 3. KETEKUNAN */}
        <div className="p-4 rounded-xl border border-amber-200/80 bg-amber-50/20 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-600" /> Ketekunan
              </span>
              <span className="text-sm font-black text-amber-800">{report.perseveranceScore}%</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Kelengkapan bacaan surat, doa, & kesediaan belajar kuis.
            </p>
          </div>
          <div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${report.perseveranceScore}%` }}
              />
            </div>
            <span className="text-[10px] font-bold text-amber-700 mt-1.5 inline-block">
              Badge: <strong>{report.perseveranceBadge}</strong>
            </span>
          </div>
        </div>

        {/* 4. PEMAHAMAN */}
        <div className="p-4 rounded-xl border border-purple-200/80 bg-purple-50/20 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-600" /> Pemahaman
              </span>
              <span className="text-sm font-black text-purple-800">{report.understandingScore}/100</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Wawasan tentang fiqih, tafsir surat, & hikmah dhuha.
            </p>
          </div>
          <div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-purple-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${report.understandingScore}%` }}
              />
            </div>
            <span className="text-[10px] font-bold text-purple-700 mt-1.5 inline-block">
              Kuat di: {report.strongTopic}
            </span>
          </div>
        </div>
      </div>

      {/* Heatmap Kalender Konsistensi Sebulan untuk Orang Tua */}
      <div className="p-4 bg-slate-50/70 border border-slate-200 rounded-2xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <h4 className="text-xs font-bold text-slate-800">
              Peta Konsistensi Sebulan (Heatmap Kalender Karakter)
            </h4>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-[11px]">
            <span className="flex items-center gap-1 font-semibold text-emerald-700">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" /> {totalSholat} Sholat
            </span>
            {totalUdzur > 0 && (
              <span className="flex items-center gap-1 font-semibold text-amber-700">
                <span className="w-2.5 h-2.5 rounded-sm bg-amber-400 inline-block" /> {totalUdzur} Udzur
              </span>
            )}
            {totalTidak > 0 && (
              <span className="flex items-center gap-1 font-semibold text-rose-700">
                <span className="w-2.5 h-2.5 rounded-sm bg-rose-400 inline-block" /> {totalTidak} Alpa
              </span>
            )}
            <span className="flex items-center gap-1 text-slate-400">
              <span className="w-2.5 h-2.5 rounded-sm bg-slate-200 inline-block" /> Libur
            </span>
          </div>
        </div>

        {/* Header Hari Kalender */}
        <div className="grid grid-cols-7 gap-1 sm:gap-1.5 text-center text-[9px] font-bold text-slate-400 uppercase tracking-wider pt-1">
          <span>Sen</span>
          <span>Sel</span>
          <span>Rab</span>
          <span>Kam</span>
          <span>Jum</span>
          <span>Sab</span>
          <span>Ahd</span>
        </div>

        {/* 28 Kotak Hari Kalender */}
        <div className="grid grid-cols-7 gap-1 sm:gap-1.5">
          {monthlyDays.map(d => {
            let bg = 'bg-slate-200 text-slate-400';
            let title = `Tgl ${d.day}: Hari Libur`;
            if (d.status === 'Sholat') {
              bg = 'bg-emerald-500 text-white font-bold hover:bg-emerald-600 shadow-xs';
              title = `Tgl ${d.day}: Sholat Dhuha (${d.rakaat} Rakaat)`;
            } else if (d.status === 'Udzur') {
              bg = 'bg-amber-400 text-amber-950 font-bold hover:bg-amber-500 shadow-xs';
              title = `Tgl ${d.day}: Berhalangan (${d.reason || 'Syar\'i'})`;
            } else if (d.status === 'Tidak') {
              bg = 'bg-rose-400 text-white font-bold hover:bg-rose-500 shadow-xs';
              title = `Tgl ${d.day}: Terlewat`;
            }

            return (
              <div
                key={d.day}
                title={title}
                className={`h-8 rounded-lg flex flex-col items-center justify-center text-[10px] transition cursor-default ${bg}`}
              >
                <span>{d.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ringkasan Minat Bacaan & Topik Kuis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3.5 bg-teal-50/50 rounded-xl border border-teal-200/80 flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-teal-600 text-white flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-teal-800 uppercase tracking-wider block">
              Surat Paling Sering Dibaca
            </span>
            <div className="text-sm font-bold text-teal-950 mt-0.5">
              Surat {report.topSurah}
            </div>
            <p className="text-[11px] text-teal-700 mt-0.5">
              Ananda menunjukkan kecintaan khusus pada surat ini saat sholat Dhuha.
            </p>
          </div>
        </div>

        <div className="p-3.5 bg-indigo-50/50 rounded-xl border border-indigo-200/80 flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center flex-shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold text-indigo-800 uppercase tracking-wider block">
              Analisis Materi Kuis
            </span>
            <div className="text-xs text-indigo-950 font-medium mt-0.5">
              Kuasai: <strong className="text-emerald-700">{report.strongTopic}</strong>
            </div>
            <div className="text-[11px] text-slate-600 mt-0.5">
              Perlu Penguatan: <strong className="text-amber-800">{report.weakTopic}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Narasi Otomatis Rapor Bulanan */}
      <div className="p-5 bg-gradient-to-br from-emerald-50 via-slate-50 to-amber-50/30 rounded-2xl border border-emerald-200/70 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
            <Heart className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Catatan Perkembangan Karakter Ananda (Otomatis & Tervalidasi)
            </h4>
            <p className="text-[11px] text-slate-500">
              Disintesis dari data harian yang telah disetujui pihak sekolah
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-700 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200/70 shadow-2xs">
          "{report.narrativeText}"
        </p>

        {/* Rekomendasi Nyata untuk Ayah Bunda di Rumah */}
        <div className="pt-2 flex items-start gap-2.5 bg-amber-50/70 p-3.5 rounded-xl border border-amber-200 text-xs text-amber-950">
          <Lightbulb className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-900 block mb-0.5">
              💡 Saran Pendampingan di Rumah untuk Ayah/Bunda:
            </span>
            <span>{report.recommendationForHome}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
