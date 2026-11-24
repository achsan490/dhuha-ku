import React, { useState, useMemo, useEffect } from 'react';
import { QUESTION_BANK_A, REFLECTIVE_QUESTIONS } from '../../data/questionBank';
import { QuizQuestion, ReflectiveQuestion, StudentReflectiveEntry, QuizTopic } from '../../types';
import { Brain, CheckCircle, AlertCircle, HelpCircle, HeartHandshake, Sparkles, RefreshCw, Trophy } from 'lucide-react';

interface DailyQuizSectionProps {
  quizTaken: boolean;
  quizScore?: number;
  quizAttempts?: number;
  reflectiveAnswer?: StudentReflectiveEntry;
  onQuizCompleted: (data: {
    quizTaken: boolean;
    quizScore: number;
    quizTopic: QuizTopic;
    quizAttempts: number;
    quizDurationSeconds: number;
    isQuickAnswer: boolean;
    reflectiveAnswer: StudentReflectiveEntry;
  }) => void;
  surahTag?: string;
}

export const DailyQuizSection: React.FC<DailyQuizSectionProps> = ({
  quizTaken,
  quizScore: initialQuizScore,
  quizAttempts: initialQuizAttempts,
  reflectiveAnswer: initialReflectiveAnswer,
  onQuizCompleted,
  surahTag
}) => {
  const [seed, setSeed] = useState<number>(1);
  const [startTime] = useState<number>(Date.now());

  // Siapkan 3 Soal PG Medium + 1 Soal Reflektif
  const { pgQuestions, reflectiveQuestion } = useMemo(() => {
    let pool = [...QUESTION_BANK_A];
    let selectedPG: QuizQuestion[] = [];

    if (surahTag) {
      const related = pool.filter(q => q.surahTag === surahTag);
      const others = pool.filter(q => q.surahTag !== surahTag).sort(() => 0.5 - Math.random());
      selectedPG = [...related, ...others].slice(0, 3);
    } else {
      selectedPG = pool.sort(() => 0.5 - Math.random()).slice(0, 3);
    }

    const refPool = [...REFLECTIVE_QUESTIONS].sort(() => 0.5 - Math.random());
    return {
      pgQuestions: selectedPG,
      reflectiveQuestion: refPool[0]
    };
  }, [surahTag, seed]);

  // State jawaban user
  const [pgAnswers, setPgAnswers] = useState<Record<number, number>>({});
  const [selectedReflective, setSelectedReflective] = useState<string>(
    initialReflectiveAnswer?.answer || ''
  );
  const [customReflectiveText, setCustomReflectiveText] = useState<string>('');
  const [attempts, setAttempts] = useState<number>(initialQuizAttempts || 1);

  const answeredPGCount = Object.keys(pgAnswers).length;
  const isAllAnswered = answeredPGCount === pgQuestions.length && !!selectedReflective;

  // Hitung skor PG
  const correctCount = pgQuestions.reduce((acc, q, idx) => {
    return pgAnswers[idx] === q.correctIndex ? acc + 1 : acc;
  }, 0);
  const currentScore = Math.round((correctCount / pgQuestions.length) * 100);

  // Kirim data ke parent saat semua terjawab
  useEffect(() => {
    if (isAllAnswered) {
      const elapsedSeconds = Math.max(10, Math.round((Date.now() - startTime) / 1000));
      const isQuick = elapsedSeconds < 15;

      const finalRefText = customReflectiveText.trim()
        ? `${selectedReflective}: ${customReflectiveText.trim()}`
        : selectedReflective;

      const needsApproach =
        finalRefText.toLowerCase().includes('terpaksa') ||
        finalRefText.toLowerCase().includes('disuruh') ||
        finalRefText.toLowerCase().includes('takut dinilai');

      const isMentorCandidate =
        finalRefText.toLowerCase().includes('dan ia ikut') ||
        finalRefText.toLowerCase().includes('mengajak');

      const refEntry: StudentReflectiveEntry = {
        questionId: reflectiveQuestion.id,
        question: reflectiveQuestion.question,
        indicator: reflectiveQuestion.indicator,
        answer: finalRefText,
        needsApproach,
        isMentorCandidate
      };

      onQuizCompleted({
        quizTaken: true,
        quizScore: currentScore,
        quizTopic: pgQuestions[0]?.topic || 'Fiqih Dhuha',
        quizAttempts: attempts,
        quizDurationSeconds: elapsedSeconds,
        isQuickAnswer: isQuick,
        reflectiveAnswer: refEntry
      });
    }
  }, [pgAnswers, selectedReflective, customReflectiveText, isAllAnswered]);

  const handleSelectPG = (qIdx: number, optIdx: number) => {
    setPgAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleResetQuestions = () => {
    setPgAnswers({});
    setSelectedReflective('');
    setCustomReflectiveText('');
    setSeed(prev => prev + 1);
    setAttempts(prev => prev + 1);
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-5">
      {/* Header Bagian Kuis */}
      <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-600" />
              <span>3. Kuis Pemahaman & Refleksi Harian</span>
            </h3>
            <span className="bg-cyan-100 text-cyan-900 text-xs font-bold px-2.5 py-0.5 rounded-full">
              Wajib Diisi
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Jawablah 3 butir soal fiqih/hikmah dan 1 butir refleksi kejujuran hati berikut ini.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isAllAnswered ? (
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-900 border border-emerald-200 px-3 py-1 rounded-xl text-xs font-bold">
              <Trophy className="w-4 h-4 text-emerald-600" />
              <span>Skor: {currentScore}/100</span>
            </div>
          ) : (
            <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2.5 py-1 rounded-lg">
              Terjawab {answeredPGCount}/3 PG
            </span>
          )}

          <button
            type="button"
            onClick={handleResetQuestions}
            title="Ganti kombinasi soal dari bank soal"
            className="text-xs text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 px-2.5 py-1 rounded-lg flex items-center gap-1 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Acak Soal</span>
          </button>
        </div>
      </div>

      {/* DAFTAR 3 SOAL PILIHAN GANDA */}
      <div className="space-y-4">
        {pgQuestions.map((q, qIdx) => {
          const userAnswer = pgAnswers[qIdx];
          const isAnswered = userAnswer !== undefined;

          return (
            <div
              key={q.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/30 hover:border-slate-300 transition"
            >
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="font-bold text-slate-700">
                  Soal {qIdx + 1} dari 3 • Topik: {q.topic}
                </span>
                {q.surahTag && (
                  <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full text-[10px] font-medium">
                    Terkait {q.surahTag}
                  </span>
                )}
              </div>

              {/* Pertanyaan */}
              <h4 className="text-sm font-semibold text-slate-800 leading-snug mb-3">
                {q.question}
              </h4>

              {/* Pilihan A/B/C/D */}
              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  const isChosen = userAnswer === optIdx;
                  const isCorrect = optIdx === q.correctIndex;

                  let style = 'border-slate-200 bg-white hover:border-cyan-400 hover:bg-cyan-50/30 text-slate-700';

                  if (isAnswered) {
                    if (isCorrect) {
                      style = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold ring-1 ring-emerald-400';
                    } else if (isChosen && !isCorrect) {
                      style = 'border-rose-400 bg-rose-50 text-rose-900 ring-1 ring-rose-300';
                    } else {
                      style = 'border-slate-200 bg-slate-100 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectPG(qIdx, optIdx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 transition-all ${style}`}
                    >
                      <span className="w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center text-[10px] font-bold mt-0.5">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="flex-1 leading-relaxed">{opt}</span>
                      {isAnswered && isCorrect && (
                        <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      )}
                      {isAnswered && isChosen && !isCorrect && (
                        <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Pembahasan Otomatis setelah dijawab */}
              {isAnswered && (
                <div className="mt-3 p-3 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 leading-relaxed animate-fadeIn">
                  <div className="font-semibold text-slate-800 flex items-center gap-1.5 mb-0.5">
                    <HelpCircle className="w-4 h-4 text-cyan-600" />
                    <span>Hikmah & Pembahasan:</span>
                  </div>
                  <p className="text-[11px] text-slate-600">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* SOAL KE-4: REFLEKSI KEJUJURAN KARAKTER */}
      <div className="p-4 rounded-xl border border-amber-300/80 bg-amber-50/30 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-lg bg-amber-500 text-amber-950 font-black text-xs flex items-center justify-center">
              🪞
            </span>
            <span className="font-bold text-amber-950">
              Pertanyaan Refleksi Diri (Kejujuran Karakter)
            </span>
          </div>
          <span className="text-[10px] bg-amber-100 text-amber-900 border border-amber-300 font-semibold px-2 py-0.5 rounded-full">
            {reflectiveQuestion.indicator}
          </span>
        </div>

        <p className="text-xs text-amber-900 font-medium">
          {reflectiveQuestion.question}
        </p>

        <p className="text-[11px] text-amber-800/80 italic">
          💡 Jawablah dengan jujur sesuai apa yang kamu rasakan. Jawaban ini <strong>tidak mengurangi skor nilaimu</strong>.
        </p>

        {/* Pilihan Opsi Reflektif */}
        <div className="space-y-2 pt-1">
          {reflectiveQuestion.options?.map((opt, idx) => {
            const isChosen = selectedReflective === opt;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedReflective(opt)}
                className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm flex items-center justify-between transition-all ${
                  isChosen
                    ? 'border-amber-500 bg-white text-amber-950 font-bold ring-2 ring-amber-400/40 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-amber-300 text-slate-700'
                }`}
              >
                <span>{opt}</span>
                {isChosen && <CheckCircle className="w-4 h-4 text-amber-600" />}
              </button>
            );
          })}
        </div>

        {/* Jika open-ended */}
        {reflectiveQuestion.isOpenEnded && selectedReflective && (
          <div className="pt-2">
            <label className="text-[11px] font-semibold text-slate-700 mb-1 block">
              Alasan atau refleksi singkatmu (opsional):
            </label>
            <input
              type="text"
              value={customReflectiveText}
              onChange={e => setCustomReflectiveText(e.target.value)}
              placeholder="Tuliskan di sini..."
              className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        )}

        {/* Feedback Apresiasi Kejujuran */}
        {selectedReflective && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-start gap-2 animate-fadeIn">
            <HeartHandshake className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-emerald-950">Terima kasih atas kejujuranmu! 😊</div>
              <p className="text-[11px] text-emerald-800 mt-0.5">
                Kejujuran adalah pondasi utama pembentukan akhlak mulia dan sangat dicintai Allah SWT.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
