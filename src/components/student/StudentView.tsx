import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { DhuhaForm } from './DhuhaForm';
import { ReadingChecklist } from './ReadingChecklist';
import { BadgesCard } from './BadgesCard';
import { QuizModal } from './QuizModal';
import { DhuhaStatus, TimeSlot, LocationType, HafalanStatus } from '../../types';
import { Send, CheckCircle2, AlertCircle, Clock, ShieldCheck, Sparkles } from 'lucide-react';

export const StudentView: React.FC = () => {
  const { activeStudentId, students, getTodayLog, submitDhuhaLog, openQuizModal } = useApp();
  const student = students.find(s => s.id === activeStudentId) || students[0];
  const todayLog = getTodayLog(student.id);

  // Local Form State
  const [status, setStatus] = useState<DhuhaStatus>(todayLog?.status || 'Ya');
  const [udzurReason, setUdzurReason] = useState<'Haid' | 'Sakit' | 'Musafir' | 'Lainnya'>(
    todayLog?.udzurReason || (student.gender === 'P' ? 'Haid' : 'Sakit')
  );
  const [rakaat, setRakaat] = useState<number>(todayLog?.rakaat || 4);
  const [timeSlot, setTimeSlot] = useState<TimeSlot>(todayLog?.timeSlot || 'Awal');
  const [location, setLocation] = useState<LocationType>(todayLog?.location || 'Rumah');
  const [isJamaah, setIsJamaah] = useState<boolean>(todayLog?.isJamaah ?? false);
  const [isIndependent, setIsIndependent] = useState<boolean>(todayLog?.isIndependent ?? true);
  const [hasPhoto, setHasPhoto] = useState<boolean>(!!todayLog?.photoUrl);

  const [surahList, setSurahList] = useState<string[]>(
    todayLog?.surahList || ['Ad-Dhuha', 'Al-Insyirah']
  );
  const [favoriteSurah, setFavoriteSurah] = useState<string>(
    todayLog?.favoriteSurah || 'Ad-Dhuha'
  );
  const [hasDoaAfterDhuha, setHasDoaAfterDhuha] = useState<boolean>(
    todayLog?.hasDoaAfterDhuha ?? true
  );
  const [hafalanSurah, setHafalanSurah] = useState<string>(
    todayLog?.hafalanSurah || 'Ad-Dhuha'
  );
  const [hafalanStatus, setHafalanStatus] = useState<HafalanStatus>(
    todayLog?.hafalanStatus || 'Lancar'
  );

  // Sync state when active student changes
  useEffect(() => {
    if (todayLog) {
      setStatus(todayLog.status);
      if (todayLog.udzurReason) setUdzurReason(todayLog.udzurReason);
      setRakaat(todayLog.rakaat);
      setTimeSlot(todayLog.timeSlot);
      setLocation(todayLog.location);
      setIsJamaah(todayLog.isJamaah);
      setIsIndependent(todayLog.isIndependent);
      setSurahList(todayLog.surahList);
      setFavoriteSurah(todayLog.favoriteSurah || 'Ad-Dhuha');
      setHasDoaAfterDhuha(todayLog.hasDoaAfterDhuha);
      setHafalanSurah(todayLog.hafalanSurah || '');
      setHafalanStatus(todayLog.hafalanStatus || 'Lancar');
    } else {
      setStatus('Ya');
      setRakaat(4);
      setTimeSlot('Awal');
      setLocation('Rumah');
      setIsJamaah(false);
      setIsIndependent(true);
      setSurahList(['Ad-Dhuha']);
      setFavoriteSurah('Ad-Dhuha');
      setHasDoaAfterDhuha(true);
    }
  }, [student.id, todayLog]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitDhuhaLog({
      status,
      udzurReason: status === 'Udzur' ? udzurReason : undefined,
      rakaat: status === 'Ya' ? rakaat : 0,
      timeSlot,
      location,
      isJamaah,
      isIndependent,
      photoUrl: hasPhoto ? 'https://example.com/photo-sample.jpg' : undefined,
      surahList: status === 'Ya' ? surahList : [],
      favoriteSurah: status === 'Ya' ? favoriteSurah : undefined,
      hasDoaAfterDhuha: status === 'Ya' ? hasDoaAfterDhuha : false,
      hafalanSurah: status === 'Ya' ? hafalanSurah : undefined,
      hafalanStatus: status === 'Ya' ? hafalanStatus : undefined,
      quizTaken: todayLog?.quizTaken,
      quizScore: todayLog?.quizScore,
      quizAttempts: todayLog?.quizAttempts,
      quizDurationSeconds: todayLog?.quizDurationSeconds,
      isQuickAnswer: todayLog?.isQuickAnswer,
      quizTopic: todayLog?.quizTopic,
      reflectiveAnswer: todayLog?.reflectiveAnswer
    });
  };

  return (
    <div className="space-y-6">
      {/* Student Greeting Banner (Mobile Optimized) */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 opacity-10 pointer-events-none flex items-center pr-6">
          <Sparkles className="w-48 h-48" />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 relative z-10">
          <div className="flex items-center gap-3 sm:gap-4">
            <img
              src={student.avatar}
              alt={student.name}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl object-cover border-2 border-white/50 shadow-sm flex-shrink-0"
            />
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-[11px] sm:text-xs bg-white/20 text-emerald-100 px-2 py-0.5 rounded-full font-medium">
                  {student.className} • NIS {student.nis}
                </span>
                <span className="text-[10px] sm:text-xs bg-amber-400 text-amber-950 px-2 py-0.5 rounded-full font-bold">
                  Siswa
                </span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black tracking-tight mt-0.5 sm:mt-1">
                Ahlan wa Sahlan, {student.name}!
              </h2>
              <p className="text-[11px] sm:text-xs text-emerald-100 mt-0.5 hidden sm:block">
                "Sholat Dhuha adalah pembuka pintu rezeki dan sedekah bagi seluruh persendian kita."
              </p>
            </div>
          </div>

          {/* Status Hari Ini Banner */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl p-2.5 sm:p-3.5 text-left sm:text-right w-full sm:w-auto">
            <div className="text-[9px] sm:text-[10px] text-emerald-200 uppercase tracking-wider font-semibold">
              Status Jurnal Hari Ini
            </div>
            {todayLog ? (
              <div className="mt-1 flex items-center justify-start sm:justify-end gap-1.5">
                {todayLog.verificationStatus === 'Disetujui' ? (
                  <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold bg-emerald-400 text-emerald-950 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg sm:rounded-xl shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Terverifikasi Guru
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold bg-amber-300 text-amber-950 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg sm:rounded-xl shadow-xs">
                    <Clock className="w-3.5 h-3.5" />
                    Menunggu Verifikasi
                  </span>
                )}
              </div>
            ) : (
              <div className="mt-1 text-xs font-bold text-amber-200 flex items-center justify-start sm:justify-end gap-1">
                <AlertCircle className="w-3.5 h-3.5 text-amber-300" />
                Belum Mengisi Hari Ini
              </div>
            )}
          </div>
        </div>

        {/* Teacher Note Display if verified */}
        {todayLog?.teacherNotes && (
          <div className="mt-4 pt-3 border-t border-white/20 flex items-start gap-2 text-xs text-emerald-50 bg-white/5 p-3 rounded-xl">
            <span className="font-bold text-amber-300 flex-shrink-0">
              💬 Catatan Guru ({todayLog.verifiedBy || 'Wali Kelas'}):
            </span>
            <span className="italic">"{todayLog.teacherNotes}"</span>
          </div>
        )}
      </div>

      {/* Main Input Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Sholat Dhuha */}
        <DhuhaForm
          status={status}
          setStatus={setStatus}
          udzurReason={udzurReason}
          setUdzurReason={setUdzurReason}
          rakaat={rakaat}
          setRakaat={setRakaat}
          timeSlot={timeSlot}
          setTimeSlot={setTimeSlot}
          location={location}
          setLocation={setLocation}
          isJamaah={isJamaah}
          setIsJamaah={setIsJamaah}
          isIndependent={isIndependent}
          setIsIndependent={setIsIndependent}
          hasPhoto={hasPhoto}
          setHasPhoto={setHasPhoto}
          gender={student.gender}
        />

        {/* Section 2: Bacaan & Kuis (Hanya aktif jika status = Ya atau Udzur) */}
        {status !== 'Tidak' && (
          <ReadingChecklist
            surahList={surahList}
            setSurahList={setSurahList}
            favoriteSurah={favoriteSurah}
            setFavoriteSurah={setFavoriteSurah}
            hasDoaAfterDhuha={hasDoaAfterDhuha}
            setHasDoaAfterDhuha={setHasDoaAfterDhuha}
            hafalanSurah={hafalanSurah}
            setHafalanSurah={setHafalanSurah}
            hafalanStatus={hafalanStatus}
            setHafalanStatus={setHafalanStatus}
            onOpenQuiz={openQuizModal}
            quizTaken={todayLog?.quizTaken ?? false}
            quizScore={todayLog?.quizScore}
          />
        )}

        {/* Submit Action Button */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            {todayLog ? (
              <span>
                Pengisian terakhir dicatat pukul <strong>{todayLog.timeString} WIB</strong>. Anda dapat memperbarui jika ada bacaan tambahan.
              </span>
            ) : (
              <span>
                Data yang dikirim akan langsung masuk ke antrean verifikasi <strong>Ustadz Mansur</strong>.
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>{todayLog ? 'Perbarui Jurnal Dhuha' : 'Kirim & Simpan Jurnal Dhuha'}</span>
          </button>
        </div>
      </form>

      {/* Badges Collection */}
      <BadgesCard student={student} />

      {/* Quiz Modal */}
      <QuizModal />
    </div>
  );
};

