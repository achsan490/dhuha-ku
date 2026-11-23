export type Role = 'siswa' | 'guru' | 'ortu';

export type DhuhaStatus = 'Ya' | 'Tidak' | 'Udzur';
export type TimeSlot = 'Awal' | 'Pertengahan' | 'Akhir';
export type LocationType = 'Rumah' | 'Masjid' | 'Sekolah';
export type HafalanStatus = 'Lancar' | 'Terbata-bata' | 'Belum';
export type VerificationStatus = 'Menunggu' | 'Disetujui' | 'Perlu Perbaikan';
export type QuizTopic = 'Fiqih Dhuha' | 'Bacaan & Doa' | 'Adab' | 'Kisah Inspiratif';

export interface UserSession {
  id: string;
  name: string;
  role: Role;
  studentId?: string;
  className?: string;
  avatar?: string;
  nis?: string;
  username?: string;
}

export interface Student {
  id: string;
  name: string;
  nis: string;
  gender: 'L' | 'P';
  className: string;
  studentPin?: string; // Default '1234'
  parentName: string;
  parentPhone: string;
  parentUsername?: string; // Default parentPhone or 'ortu-...'
  parentPin?: string; // Default '1234'
  avatar: string;
  streakCount: number;
  badges: StudentBadge[];
}

export interface NewStudentInput {
  name: string;
  nis: string;
  gender: 'L' | 'P';
  className: string;
  studentPin: string;
  parentName: string;
  parentPhone: string;
  parentUsername: string;
  parentPin: string;
}

export interface StudentBadge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlockedAt: string;
  category: 'Disiplin' | 'Kemandirian' | 'Ketekunan' | 'Pemahaman';
}

export interface DhuhaLog {
  id: string;
  studentId: string;
  date: string; // YYYY-MM-DD
  status: DhuhaStatus;
  udzurReason?: 'Haid' | 'Sakit' | 'Musafir' | 'Lainnya';
  rakaat: number; // 2, 4, 6, 8, 10, 12
  timeSlot: TimeSlot;
  timeString: string; // misal "07:15"
  location: LocationType;
  isJamaah: boolean;
  photoUrl?: string;
  isIndependent: boolean; // diisi inisiatif mandiri sebelum diingatkan

  // Indikator Bacaan
  surahList: string[]; // ['Ad-Dhuha', 'Al-Insyirah', dll]
  favoriteSurah?: string;
  hasDoaAfterDhuha: boolean;
  hafalanSurah?: string;
  hafalanStatus?: HafalanStatus;

  // Indikator Kuis & Reflektif
  quizTaken: boolean;
  quizScore?: number; // 0-100
  quizAttempts?: number;
  quizDurationSeconds?: number;
  isQuickAnswer?: boolean; // flag deteksi waktu terlalu cepat (< 50% estimasi)
  quizTopic?: QuizTopic;
  reflectiveAnswer?: StudentReflectiveEntry;

  // Verifikasi Guru
  verificationStatus: VerificationStatus;
  verifiedAt?: string;
  verifiedBy?: string;
  teacherNotes?: string;
}

export type QuizDifficulty = 'medium' | 'hots';

export interface QuizQuestion {
  id: string;
  topic: QuizTopic;
  difficulty?: QuizDifficulty;
  surahTag?: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ReflectiveQuestion {
  id: string;
  category: 'Perasaan & Keikhlasan' | 'Kesadaran & Motivasi' | 'Kemandirian' | 'Bacaan & Pemahaman' | 'Sosial & Adab';
  indicator: string;
  question: string;
  options?: string[];
  isOpenEnded?: boolean;
}

export interface StudentReflectiveEntry {
  questionId: string;
  question: string;
  indicator: string;
  answer: string;
  needsApproach?: boolean; // misal jika menjawab "terpaksa" atau "karena disuruh"
  isMentorCandidate?: boolean; // misal aktif mengajak teman
}

export interface AwarenessMetrics {
  studentId: string;
  effectiveDays: number;
  prayerDays: number;
  udzurDays: number;
  consistencyScore: number; // (hari sholat / hari efektif) * 100
  readingCompletenessScore: number; // (% hari bacaan lengkap + doa)
  quizAvgScore: number;
  awarenessScore: number; // 40% + 30% + 30%
  category: 'Sadar & Konsisten' | 'Berkembang' | 'Perlu Pendampingan';
  streak: number;
  initiativeRatio: number; // % pengisian inisiatif
  homeRatio: number; // % tempat = Rumah
}

export interface ParentCharacterReport {
  studentId: string;
  periodName: string; // misal "Bulan Ini"
  disciplineScore: number;
  independenceScore: number;
  independenceBadge: 'Mandiri' | 'Berkembang' | 'Perlu Pendampingan';
  perseveranceScore: number;
  perseveranceBadge: 'Sangat Tekun' | 'Tekun' | 'Cukup Tekun';
  understandingScore: number;
  topSurah: string;
  weakTopic: string;
  strongTopic: string;
  narrativeText: string;
  recommendationForHome: string;
}
