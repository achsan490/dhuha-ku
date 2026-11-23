import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { QUIZ_QUESTIONS } from '../../data/mockData';
import { QuizQuestion, QuizTopic } from '../../types';
import { X, CheckCircle, AlertCircle, HelpCircle, Trophy, RotateCcw, Clock } from 'lucide-react';

export const QuizModal: React.FC = () => {
  const { activeQuizModal, closeQuizModal, recordQuizResult, quizSurahTag } = useApp();

  // Filter 3 soal yang relevan atau acak
  const questionsToUse = React.useMemo(() => {
    let pool = [...QUIZ_QUESTIONS];
    if (quizSurahTag) {
      const related = pool.filter(q => q.surahTag === quizSurahTag);
      const others = pool.filter(q => q.surahTag !== quizSurahTag);
      return [...related, ...others].slice(0, 3);
    }
    return pool.slice(0, 3);
  }, [quizSurahTag]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [attempts, setAttempts] = useState(1);
  const [startTime] = useState<number>(Date.now());

  if (!activeQuizModal) return null;

  const currentQ = questionsToUse[currentIndex];
  const isSelected = selectedAnswers[currentIndex] !== undefined;

  const handleSelectOption = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIndex]: index }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIndex < questionsToUse.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  // Hitung Skor
  const correctCount = questionsToUse.reduce((acc, q, idx) => {
    return selectedAnswers[idx] === q.correctIndex ? acc + 1 : acc;
  }, 0);
  const finalScore = Math.round((correctCount / questionsToUse.length) * 100);

  const handleRetry = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setShowExplanation(false);
    setIsFinished(false);
    setAttempts(prev => prev + 1);
  };

  const handleSaveAndClose = () => {
    const elapsedSeconds = Math.max(15, Math.round((Date.now() - startTime) / 1000));
    recordQuizResult(finalScore, currentQ?.topic || 'Fiqih Dhuha', attempts, elapsedSeconds);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 flex items-center justify-between">
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
            <h3 className="font-bold text-lg">Uji Pemahaman & Hikmah</h3>
          </div>
          <button
            onClick={closeQuizModal}
            className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {!isFinished ? (
            <div>
              {/* Progress Indicator */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2 font-medium">
                <span>
                  Pertanyaan {currentIndex + 1} dari {questionsToUse.length}
                </span>
                <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                  Topik: {currentQ.topic}
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-5">
                <div
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / questionsToUse.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <h4 className="text-base font-semibold text-slate-800 leading-snug mb-4">
                {currentQ.question}
              </h4>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, idx) => {
                  const isUserChosen = selectedAnswers[currentIndex] === idx;
                  const isCorrect = idx === currentQ.correctIndex;

                  let btnStyle = 'border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50 text-slate-700';

                  if (showExplanation) {
                    if (isCorrect) {
                      btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-medium';
                    } else if (isUserChosen && !isCorrect) {
                      btnStyle = 'border-rose-400 bg-rose-50 text-rose-900';
                    } else {
                      btnStyle = 'border-slate-200 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={showExplanation}
                      className={`w-full text-left p-3.5 rounded-xl border text-sm flex items-start gap-3 transition-all ${btnStyle}`}
                    >
                      <span className="w-6 h-6 rounded-full border flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="flex-1">{opt}</span>
                      {showExplanation && isCorrect && (
                        <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      )}
                      {showExplanation && isUserChosen && !isCorrect && (
                        <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Card */}
              {showExplanation && (
                <div className="mt-4 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 leading-relaxed animate-fadeIn">
                  <div className="font-semibold text-slate-800 flex items-center gap-1.5 mb-1">
                    <HelpCircle className="w-4 h-4 text-emerald-600" />
                    <span>Hikmah & Pembahasan:</span>
                  </div>
                  <p>{currentQ.explanation}</p>
                </div>
              )}
            </div>
          ) : (
            /* Result Screen */
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <Trophy className="w-8 h-8 text-emerald-600" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-slate-800">Alhamdulillah Selesai!</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Kuis ini melatih kesadaran agar sholat Dhuha semakin penuh makna.
                </p>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 p-4 rounded-2xl max-w-xs mx-auto">
                <div className="text-xs text-emerald-700 font-medium">Skor Pemahaman</div>
                <div className="text-4xl font-extrabold text-emerald-800 my-1">{finalScore}</div>
                <div className="text-xs text-emerald-600">
                  Benar {correctCount} dari {questionsToUse.length} pertanyaan
                </div>
                {attempts > 1 && (
                  <div className="mt-2 text-[11px] text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded font-medium">
                    ✨ Mencoba {attempts}x (Menunjukkan Ketekunan!)
                  </div>
                )}
              </div>

              <p className="text-xs text-slate-600 px-4">
                {finalScore >= 80
                  ? '🌟 MasyaAllah! Pemahamanmu tentang ibadah Dhuha sangat baik.'
                  : '🌱 Tetap semangat! Mempelajari hikmah ibadah akan membuat hati semakin ikhlas.'}
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
          {!isFinished ? (
            <>
              <button
                onClick={closeQuizModal}
                className="text-xs text-slate-500 hover:text-slate-700 font-medium px-3 py-2"
              >
                Tutup Sementara
              </button>
              {showExplanation && (
                <button
                  onClick={handleNext}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-sm transition"
                >
                  {currentIndex < questionsToUse.length - 1 ? 'Soal Berikutnya →' : 'Lihat Hasil Akhir'}
                </button>
              )}
            </>
          ) : (
            <>
              <button
                onClick={handleRetry}
                className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-800 border border-slate-300 px-3.5 py-2 rounded-xl bg-white font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ulangi Kuis</span>
              </button>
              <button
                onClick={handleSaveAndClose}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl shadow-sm transition"
              >
                Simpan & Teruskan ke Jurnal
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

