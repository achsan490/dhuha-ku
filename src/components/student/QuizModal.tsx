import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { QUESTION_BANK_A, REFLECTIVE_QUESTIONS } from '../../data/questionBank';
import { QuizQuestion, ReflectiveQuestion, StudentReflectiveEntry } from '../../types';
import { X, CheckCircle, AlertCircle, HelpCircle, Trophy, RotateCcw, Clock, Sparkles, HeartHandshake } from 'lucide-react';

export const QuizModal: React.FC = () => {
  const { activeQuizModal, closeQuizModal, recordQuizResult, quizSurahTag } = useApp();

  // Acak & siapkan 3 Soal PG Medium + 1 Soal Reflektif
  const [sessionSeed, setSessionSeed] = useState<number>(() => Date.now());

  const { pgQuestions, reflectiveQuestion } = useMemo(() => {
    // 1. Pilih soal PG terkait surah atau acak dari Bagian A
    let pool = [...QUESTION_BANK_A];
    let selectedPG: QuizQuestion[] = [];

    if (quizSurahTag) {
      const related = pool.filter(q => q.surahTag === quizSurahTag);
      const others = pool.filter(q => q.surahTag !== quizSurahTag).sort(() => 0.5 - Math.random());
      selectedPG = [...related, ...others].slice(0, 3);
    } else {
      selectedPG = pool.sort(() => 0.5 - Math.random()).slice(0, 3);
    }

    // 2. Pilih 1 soal Reflektif dari Bagian C
    const refPool = [...REFLECTIVE_QUESTIONS].sort(() => 0.5 - Math.random());
    const selectedRef: ReflectiveQuestion = refPool[0];

    return {
      pgQuestions: selectedPG,
      reflectiveQuestion: selectedRef
    };
  }, [quizSurahTag, sessionSeed]);

  const totalSteps = pgQuestions.length + 1; // 3 PG + 1 Reflektif = 4

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPGAnswers, setSelectedPGAnswers] = useState<Record<number, number>>({});
  const [selectedReflectiveAnswer, setSelectedReflectiveAnswer] = useState<string>('');
  const [customReflectiveText, setCustomReflectiveText] = useState<string>('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [attempts, setAttempts] = useState(1);
  const [startTime] = useState<number>(Date.now());

  if (!activeQuizModal) return null;

  const isReflectiveStep = currentIndex === pgQuestions.length;
  const currentPG = !isReflectiveStep ? pgQuestions[currentIndex] : null;

  // Handler Pilihan PG
  const handleSelectPGOption = (index: number) => {
    if (showExplanation) return;
    setSelectedPGAnswers(prev => ({ ...prev, [currentIndex]: index }));
    setShowExplanation(true);
  };

  // Handler Pilihan Reflektif
  const handleSelectReflectiveOption = (option: string) => {
    setSelectedReflectiveAnswer(option);
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIndex < totalSteps - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  // Hitung Skor Pilihan Ganda (Passing Score: 60)
  const correctCount = pgQuestions.reduce((acc, q, idx) => {
    return selectedPGAnswers[idx] === q.correctIndex ? acc + 1 : acc;
  }, 0);
  const finalScore = Math.round((correctCount / pgQuestions.length) * 100);
  const isPassed = finalScore >= 60;

  // Analisis Jawaban Reflektif untuk insight karakter
  const finalReflectiveText = customReflectiveText.trim()
    ? `${selectedReflectiveAnswer}: ${customReflectiveText.trim()}`
    : selectedReflectiveAnswer || 'Sadar & Tenang';

  const needsApproach =
    finalReflectiveText.toLowerCase().includes('terpaksa') ||
    finalReflectiveText.toLowerCase().includes('disuruh') ||
    finalReflectiveText.toLowerCase().includes('takut dinilai');

  const isMentorCandidate =
    finalReflectiveText.toLowerCase().includes('dan ia ikut') ||
    finalReflectiveText.toLowerCase().includes('mengajak');

  const reflectiveEntry: StudentReflectiveEntry = {
    questionId: reflectiveQuestion.id,
    question: reflectiveQuestion.question,
    indicator: reflectiveQuestion.indicator,
    answer: finalReflectiveText,
    needsApproach,
    isMentorCandidate
  };

  const handleRetry = () => {
    if (attempts >= 2) return; // Maksimal 2x attempt
    setSelectedPGAnswers({});
    setSelectedReflectiveAnswer('');
    setCustomReflectiveText('');
    setCurrentIndex(0);
    setShowExplanation(false);
    setIsFinished(false);
    setAttempts(prev => prev + 1);
    setSessionSeed(Date.now());
  };

  const handleSaveAndClose = () => {
    const elapsedSeconds = Math.max(10, Math.round((Date.now() - startTime) / 1000));
    // Deteksi jika pengerjaan < 15 detik (indikasi terburu-buru / asal jawab)
    const isQuickAnswer = elapsedSeconds < 15;

    recordQuizResult(
      finalScore,
      currentPG?.topic || 'Fiqih Dhuha',
      attempts,
      elapsedSeconds,
      reflectiveEntry,
      isQuickAnswer
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white p-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-emerald-100 font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>Kuis Penguat Kesadaran Dhuha</span>
              {quizSurahTag && (
                <span className="bg-emerald-500/50 px-2 py-0.5 rounded text-[10px]">
                  Terkait: {quizSurahTag}
                </span>
              )}
            </div>
            <h3 className="font-bold text-base sm:text-lg flex items-center gap-1.5">
              <span>Uji Pemahaman & Refleksi</span>
              <Sparkles className="w-4 h-4 text-amber-300" />
            </h3>
          </div>
          <button
            onClick={closeQuizModal}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition"
            aria-label="Tutup kuis"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {!isFinished ? (
            <div>
              {/* Progress Indicator */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
                <span>
                  Pertanyaan {currentIndex + 1} dari {totalSteps}
                </span>
                {!isReflectiveStep ? (
                  <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                    {currentPG?.topic} (PG)
                  </span>
                ) : (
                  <span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200 flex items-center gap-1 font-semibold">
                    <HeartHandshake className="w-3 h-3 text-amber-600" />
                    <span>Refleksi Karakter</span>
                  </span>
                )}
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-4">
                <div
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / totalSteps) * 100}%` }}
                />
              </div>

              {/* TAMPILAN SOAL PG (Soal 1–3) */}
              {!isReflectiveStep && currentPG && (
                <div>
                  <h4 className="text-sm sm:text-base font-semibold text-slate-800 leading-snug mb-3">
                    {currentPG.question}
                  </h4>

                  {/* Options PG */}
                  <div className="space-y-2">
                    {currentPG.options.map((opt, idx) => {
                      const isUserChosen = selectedPGAnswers[currentIndex] === idx;
                      const isCorrect = idx === currentPG.correctIndex;

                      let btnStyle = 'border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 text-slate-700';

                      if (showExplanation) {
                        if (isCorrect) {
                          btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-medium ring-1 ring-emerald-400';
                        } else if (isUserChosen && !isCorrect) {
                          btnStyle = 'border-rose-400 bg-rose-50 text-rose-900 ring-1 ring-rose-300';
                        } else {
                          btnStyle = 'border-slate-200 text-slate-400 opacity-60';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectPGOption(idx)}
                          disabled={showExplanation}
                          className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 transition-all ${btnStyle}`}
                        >
                          <span className="w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center text-[11px] font-bold mt-0.5">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span className="flex-1 leading-relaxed">{opt}</span>
                          {showExplanation && isCorrect && (
                            <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          )}
                          {showExplanation && isUserChosen && !isCorrect && (
                            <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Pembahasan Otomatis PG */}
                  {showExplanation && (
                    <div className="mt-3.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 leading-relaxed animate-fadeIn">
                      <div className="font-semibold text-slate-800 flex items-center gap-1.5 mb-1">
                        <HelpCircle className="w-4 h-4 text-emerald-600" />
                        <span>Hikmah & Pembahasan:</span>
                      </div>
                      <p>{currentPG.explanation}</p>
                    </div>
                  )}
                </div>
              )}

              {/* TAMPILAN SOAL REFLEKTIF (Soal 4) */}
              {isReflectiveStep && (
                <div className="animate-fadeIn">
                  <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 mb-3 text-xs text-amber-900">
                    <div className="font-bold flex items-center gap-1.5 mb-0.5">
                      <span>🪞 Refleksi Kejujuran Hati</span>
                    </div>
                    <p className="text-amber-800 text-[11px] leading-relaxed">
                      Pertanyaan ini <strong>tidak ada jawaban salah</strong> dan tidak mengurangi skor nilaimu. Jawablah dengan jujur sesuai apa yang kamu rasakan hari ini.
                    </p>
                  </div>

                  <h4 className="text-sm sm:text-base font-semibold text-slate-800 leading-snug mb-3">
                    {reflectiveQuestion.question}
                  </h4>

                  <div className="space-y-2">
                    {reflectiveQuestion.options?.map((opt, idx) => {
                      const isChosen = selectedReflectiveAnswer === opt;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectReflectiveOption(opt)}
                          className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm flex items-center justify-between transition-all ${
                            isChosen
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium ring-1 ring-emerald-400'
                              : 'border-slate-200 hover:border-amber-300 hover:bg-amber-50/40 text-slate-700'
                          }`}
                        >
                          <span>{opt}</span>
                          {isChosen && <CheckCircle className="w-4 h-4 text-emerald-600" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Input opsional jika open-ended atau ingin menambah catatan */}
                  {reflectiveQuestion.isOpenEnded && selectedReflectiveAnswer && (
                    <div className="mt-3">
                      <label className="text-[11px] font-medium text-slate-600 mb-1 block">
                        Catatan atau alasan singkatmu (opsional):
                      </label>
                      <input
                        type="text"
                        value={customReflectiveText}
                        onChange={e => setCustomReflectiveText(e.target.value)}
                        placeholder="Contoh: Karena maknanya mengingatkan untuk selalu bersyukur..."
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  )}

                  {/* Feedback Hangat untuk Jawaban Reflektif */}
                  {showExplanation && (
                    <div className="mt-3.5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 leading-relaxed animate-fadeIn flex items-start gap-2">
                      <HeartHandshake className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-emerald-950">Terima kasih atas kejujuranmu! 😊</div>
                        <p className="text-[11px] text-emerald-800 mt-0.5">
                          Kejujuran adalah pondasi utama pembentukan akhlak mulia dan sangat dicintai Allah SWT.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* HALAMAN HASIL (RESULT SCREEN) */
            <div className="text-center py-2 sm:py-3 space-y-3.5 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <Trophy className="w-7 h-7 text-emerald-600" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-slate-800">Alhamdulillah Selesai!</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Kuis pemahaman dan refleksi harianmu telah tuntas.
                </p>
              </div>

              {/* Card Skor Kuis */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 p-3.5 rounded-2xl max-w-xs mx-auto">
                <div className="text-[11px] text-emerald-700 font-medium">Skor Pemahaman Fiqih & Hikmah</div>
                <div className="text-3xl font-extrabold text-emerald-800 my-1">{finalScore}</div>
                <div className="text-xs text-emerald-700">
                  Benar {correctCount} dari {pgQuestions.length} pertanyaan ({isPassed ? '✅ Lulus' : '⚠️ Perlu Penguatan'})
                </div>
                {attempts > 1 && (
                  <div className="mt-2 text-[10px] text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded font-medium inline-block">
                    ✨ Percobaan ke-{attempts}
                  </div>
                )}
              </div>

              {/* Card Refleksi Diri */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-left max-w-sm mx-auto text-xs">
                <div className="font-semibold text-slate-700 flex items-center gap-1.5 mb-1 text-[11px]">
                  <span>🪞 Refleksi Karaktermu Hari Ini:</span>
                </div>
                <p className="text-slate-800 font-medium italic text-xs">
                  "{finalReflectiveText}"
                </p>
                <div className="mt-1 text-[10px] text-slate-500">
                  Indikator: {reflectiveQuestion.indicator}
                </div>
              </div>

              <p className="text-[11px] text-slate-500 px-4">
                Hasil ini akan diteruskan ke jurnal Dhuha dan dirangkum secara naratif pada rapor karakter orang tua.
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
          {!isFinished ? (
            <>
              <button
                onClick={closeQuizModal}
                className="text-xs text-slate-500 hover:text-slate-700 font-medium px-2 py-1.5"
              >
                Tutup
              </button>
              {showExplanation && (
                <button
                  onClick={handleNext}
                  className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition"
                >
                  {currentIndex < totalSteps - 1 ? 'Soal Berikutnya →' : 'Lihat Hasil Akhir'}
                </button>
              )}
            </>
          ) : (
            <div className="w-full flex items-center justify-between gap-2">
              {!isPassed && attempts < 2 ? (
                <button
                  onClick={handleRetry}
                  className="flex items-center gap-1.5 text-xs text-slate-700 hover:text-slate-900 border border-slate-300 px-3 py-2 rounded-xl bg-white font-medium active:scale-95 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Coba Lagi (2/2)</span>
                </button>
              ) : (
                <div className="text-[11px] text-slate-400">
                  {attempts >= 2 ? 'Maksimal 2x percobaan tercapai' : ''}
                </div>
              )}
              <button
                onClick={handleSaveAndClose}
                className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition ml-auto"
              >
                Simpan & Teruskan ke Jurnal
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
