import React, { useState, useMemo } from 'react';
import { QUESTION_BANK_A, QUESTION_BANK_B, REFLECTIVE_QUESTIONS } from '../../data/questionBank';
import { QuizQuestion, ReflectiveQuestion } from '../../types';
import { BookOpen, Search, CheckCircle, HelpCircle, HeartHandshake, Sparkles, Filter } from 'lucide-react';

export const QuestionBankViewer: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'medium' | 'hots' | 'reflective'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Gabungkan semua data dengan penanda jenis
  const allItems = useMemo(() => {
    const listA = QUESTION_BANK_A.map((q, idx) => ({
      ...q,
      number: idx + 1,
      part: 'Bagian A (Medium)',
      kind: 'pg' as const
    }));

    const listB = QUESTION_BANK_B.map((q, idx) => ({
      ...q,
      number: 20 + idx + 1,
      part: 'Bagian B (HOTS)',
      kind: 'pg' as const
    }));

    const listC = REFLECTIVE_QUESTIONS.map((r, idx) => ({
      ...r,
      number: `R${idx + 1}`,
      part: 'Bagian C (Reflektif Karakter)',
      kind: 'reflective' as const
    }));

    return { listA, listB, listC };
  }, []);

  const filteredItems = useMemo(() => {
    let items: Array<any> = [];

    if (activeFilter === 'all') {
      items = [...allItems.listA, ...allItems.listB, ...allItems.listC];
    } else if (activeFilter === 'medium') {
      items = allItems.listA;
    } else if (activeFilter === 'hots') {
      items = allItems.listB;
    } else if (activeFilter === 'reflective') {
      items = allItems.listC;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter(item =>
        item.question.toLowerCase().includes(q) ||
        (item.topic && item.topic.toLowerCase().includes(q)) ||
        (item.indicator && item.indicator.toLowerCase().includes(q)) ||
        (item.explanation && item.explanation.toLowerCase().includes(q))
      );
    }

    return items;
  }, [activeFilter, searchQuery, allItems]);

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-5">
      {/* Header Katalog Bank Soal */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span>Katalog Bank Soal & Refleksi Lengkap (48 Butir)</span>
            </h3>
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
              Terintegrasi
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Digunakan otomatis oleh sistem kuis harian, tematik bacaan surat, dan evaluasi karakter siswa.
          </p>
        </div>

        {/* Counter Ringkas */}
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
          <span className="bg-slate-100 px-2 py-1 rounded-lg border border-slate-200">
            20 Medium
          </span>
          <span className="bg-slate-100 px-2 py-1 rounded-lg border border-slate-200">
            20 HOTS
          </span>
          <span className="bg-amber-100 text-amber-900 px-2 py-1 rounded-lg border border-amber-200">
            8 Reflektif
          </span>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Semua (48)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('medium')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition cursor-pointer ${
              activeFilter === 'medium'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Bagian A: PG Medium (20)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('hots')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition cursor-pointer ${
              activeFilter === 'hots'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Bagian B: PG HOTS (20)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('reflective')}
            className={`px-3 py-1.5 text-xs font-bold rounded-xl whitespace-nowrap transition cursor-pointer flex items-center gap-1 ${
              activeFilter === 'reflective'
                ? 'bg-amber-500 text-amber-950 shadow-xs'
                : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Bagian C: Reflektif (8)</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari soal / topik..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* List Kartu Soal */}
      <div className="space-y-3.5 pt-1">
        {filteredItems.length === 0 ? (
          <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-400 text-xs">
            Tidak ada butir soal yang sesuai dengan pencarian "{searchQuery}"
          </div>
        ) : (
          filteredItems.map(item => {
            const isReflective = item.kind === 'reflective';

            return (
              <div
                key={item.id}
                className={`p-4 rounded-xl border transition-all ${
                  isReflective
                    ? 'border-amber-200/90 bg-amber-50/20'
                    : 'border-slate-200/90 bg-white hover:border-slate-300'
                }`}
              >
                {/* Meta Header Soal */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-slate-800 text-white font-black text-xs flex items-center justify-center">
                      {item.number}
                    </span>
                    <span className="text-xs font-bold text-slate-700">
                      {item.part}
                    </span>
                    {item.topic && (
                      <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full border border-slate-200 font-medium">
                        Topik: {item.topic}
                      </span>
                    )}
                    {item.indicator && (
                      <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300 font-semibold flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        <span>Indikator: {item.indicator}</span>
                      </span>
                    )}
                    {item.surahTag && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                        Surat: {item.surahTag}
                      </span>
                    )}
                  </div>

                  <span className="text-[10px] font-mono text-slate-400">
                    ID: {item.id}
                  </span>
                </div>

                {/* Question Text */}
                <h4 className="text-sm font-semibold text-slate-900 leading-snug mb-3">
                  {item.question}
                </h4>

                {/* Options List */}
                <div className="space-y-1.5 mb-3">
                  {item.options?.map((opt: string, optIdx: number) => {
                    const isCorrect = !isReflective && optIdx === item.correctIndex;

                    return (
                      <div
                        key={optIdx}
                        className={`text-xs p-2.5 rounded-lg border flex items-center gap-2.5 ${
                          isCorrect
                            ? 'border-emerald-500 bg-emerald-50/80 text-emerald-950 font-semibold'
                            : 'border-slate-200/80 bg-slate-50/60 text-slate-700'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isCorrect ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white text-slate-600'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="flex-1">{opt}</span>
                        {isCorrect && (
                          <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle className="w-3 h-3 text-emerald-700" />
                            <span>Kunci Jawaban</span>
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation or Reflective Rule */}
                {!isReflective ? (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-700 leading-relaxed flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-800 block mb-0.5">
                        Pembahasan & Hikmah:
                      </span>
                      <span>{item.explanation}</span>
                    </div>
                  </div>
                ) : (
                  <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 text-xs text-amber-950 leading-relaxed flex items-start gap-2">
                    <HeartHandshake className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-amber-900 block mb-0.5">
                        Aturan Penilaian Karakter Reflektif:
                      </span>
                      <p className="text-[11px] text-amber-800">
                        Tidak ada benar/salah dan 0% memotong skor numerik. Jawaban jujur "terpaksa/disuruh" memicu rekomendasi pendekatan personal bagi guru; jawaban aktif mengajak teman memicu tanda kandidat mentor sebaya.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
