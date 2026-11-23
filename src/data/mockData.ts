import { Student, DhuhaLog, QuizQuestion } from '../types';
import { ALL_QUIZ_QUESTIONS } from './questionBank';

export const SURAH_OPTIONS = [
  { id: 'Ad-Dhuha', name: 'Ad-Dhuha', ayat: '11 Ayat', desc: 'Waktu Dhuha & Hiburan bagi Rasulullah' },
  { id: 'Asy-Syams', name: 'Asy-Syams', ayat: '15 Ayat', desc: 'Matahari & Penyucian Jiwa' },
  { id: 'Al-Lail', name: 'Al-Lail', ayat: '21 Ayat', desc: 'Malam & Perbuatan Dermawan' },
  { id: 'Al-Insyirah', name: 'Al-Insyirah', ayat: '8 Ayat', desc: 'Kelapangan Dada & Kemudahan' },
  { id: 'Al-Kafirun', name: 'Al-Kafirun', ayat: '6 Ayat', desc: 'Kemurnian Akidah & Toleransi' },
  { id: 'Al-Ikhlas', name: 'Al-Ikhlas', ayat: '4 Ayat', desc: 'Keesaan Allah yang Maha Esa' },
  { id: 'Ayat Kursi', name: 'Ayat Kursi', ayat: 'Al-Baqarah: 255', desc: 'Keagungan Tahta & Penjagaan Allah' },
  { id: 'Doa Dhuha', name: 'Doa Dhuha', ayat: 'Doa Ma\'tsur', desc: 'Pengakuan keagungan & permohonan keberkahan rezeki' },
];

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'std-1',
    name: 'Ahmad Fauzan',
    nis: '20240101',
    gender: 'L',
    className: 'Kelas 5-A',
    studentPin: '1234',
    parentName: 'Pak Hendra Fauzan',
    parentPhone: '0812-3456-7890',
    parentUsername: '081234567890',
    parentPin: '1234',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
    streakCount: 14,
    badges: [
      {
        id: 'b-1',
        name: 'Fajar Istiqomah',
        icon: '☀️',
        description: 'Sholat Dhuha di awal waktu 7 hari berturut-turut',
        unlockedAt: '2024-11-10',
        category: 'Disiplin'
      },
      {
        id: 'b-2',
        name: 'Ksatria Mandiri',
        icon: '🛡️',
        description: 'Mengisi Dhuha sebelum jam 08.00 tanpa diingatkan',
        unlockedAt: '2024-11-12',
        category: 'Kemandirian'
      },
      {
        id: 'b-3',
        name: 'Pecinta Al-Qur\'an',
        icon: '📖',
        description: 'Membaca lebih dari 5 macam surat pilihan Dhuha',
        unlockedAt: '2024-11-14',
        category: 'Ketekunan'
      }
    ]
  },
  {
    id: 'std-2',
    name: 'Fatimah Az-Zahra',
    nis: '20240102',
    gender: 'P',
    className: 'Kelas 5-A',
    studentPin: '1234',
    parentName: 'Ibu Ratna Dewi',
    parentPhone: '0813-8899-7711',
    parentUsername: '081388997711',
    parentPin: '1234',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    streakCount: 12,
    badges: [
      {
        id: 'b-4',
        name: 'Bintang Al-Insyirah',
        icon: '🌟',
        description: 'Rutin mengamalkan doa setelah Dhuha dengan khusyuk',
        unlockedAt: '2024-11-09',
        category: 'Ketekunan'
      },
      {
        id: 'b-5',
        name: 'Jujur & Amanah',
        icon: '💎',
        description: 'Mencatat status ibadah dan udzur dengan penuh kejujuran',
        unlockedAt: '2024-11-13',
        category: 'Disiplin'
      }
    ]
  },
  {
    id: 'std-3',
    name: 'Rayhan Pratama',
    nis: '20240103',
    gender: 'L',
    className: 'Kelas 5-A',
    studentPin: '1234',
    parentName: 'Pak Agus Pratama',
    parentPhone: '0817-2233-4455',
    parentUsername: '081722334455',
    parentPin: '1234',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    streakCount: 6,
    badges: [
      {
        id: 'b-6',
        name: 'Langkah Awal',
        icon: '🌱',
        description: 'Menjaga Dhuha 5 hari berturut-turut di sekolah',
        unlockedAt: '2024-11-11',
        category: 'Disiplin'
      }
    ]
  },
  {
    id: 'std-4',
    name: 'Muhammad Bilal',
    nis: '20240104',
    gender: 'L',
    className: 'Kelas 5-A',
    studentPin: '1234',
    parentName: 'Ibu Siti Maryam',
    parentPhone: '0819-0011-2233',
    parentUsername: '081900112233',
    parentPin: '1234',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    streakCount: 2,
    badges: [
      {
        id: 'b-7',
        name: 'Semangat Baru',
        icon: '🔥',
        description: 'Menuntaskan kuis Fiqih Dhuha pertama dengan skor baik',
        unlockedAt: '2024-11-08',
        category: 'Pemahaman'
      }
    ]
  },
  {
    id: 'std-5',
    name: 'Aisyah Humaira',
    nis: '20240105',
    gender: 'P',
    className: 'Kelas 5-A',
    studentPin: '1234',
    parentName: 'Pak Dedi Sulaiman',
    parentPhone: '0812-7766-5544',
    parentUsername: '081277665544',
    parentPin: '1234',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    streakCount: 16,
    badges: [
      {
        id: 'b-8',
        name: 'Hafizhah Cilik',
        icon: '📿',
        description: 'Hafalan surat Ad-Dhuha & Asy-Syams sangat lancar',
        unlockedAt: '2024-11-13',
        category: 'Ketekunan'
      }
    ]
  }
];

export const INITIAL_LOGS: DhuhaLog[] = [
  // Log Hari Ini (2026-11-15)
  {
    id: 'log-today-1',
    studentId: 'std-1', // Ahmad
    date: '2026-11-15',
    status: 'Ya',
    rakaat: 4,
    timeSlot: 'Awal',
    timeString: '07:20',
    location: 'Rumah',
    isJamaah: false,
    isIndependent: true,
    surahList: ['Ad-Dhuha', 'Al-Insyirah'],
    favoriteSurah: 'Ad-Dhuha',
    hasDoaAfterDhuha: true,
    hafalanSurah: 'Ad-Dhuha',
    hafalanStatus: 'Lancar',
    quizTaken: true,
    quizScore: 100,
    quizAttempts: 1,
    quizDurationSeconds: 45,
    isQuickAnswer: false,
    quizTopic: 'Fiqih Dhuha',
    reflectiveAnswer: {
      questionId: 'ref-3',
      question: 'Kenapa kamu sholat Dhuha hari ini?',
      indicator: 'Rasio Inisiatif & Motivasi Internal',
      answer: 'Karena ingin dekat dengan Allah SWT'
    },
    verificationStatus: 'Disetujui',
    verifiedAt: '2026-11-15 08:30',
    verifiedBy: 'Ustadz Mansur, S.Pd.I',
    teacherNotes: 'MasyaAllah Ahmad, sangat konsisten sholat awal waktu di rumah sebelum berangkat.'
  },
  {
    id: 'log-today-2',
    studentId: 'std-2', // Fatimah (Udzur)
    date: '2026-11-15',
    status: 'Udzur',
    udzurReason: 'Haid',
    rakaat: 2,
    timeSlot: 'Awal',
    timeString: '07:05',
    location: 'Rumah',
    isJamaah: false,
    isIndependent: true,
    surahList: ['Doa Dhuha'],
    hasDoaAfterDhuha: true,
    quizTaken: true,
    quizScore: 90,
    quizAttempts: 1,
    quizTopic: 'Adab',
    verificationStatus: 'Disetujui',
    verifiedAt: '2026-11-15 08:35',
    verifiedBy: 'Ustadz Mansur, S.Pd.I',
    teacherNotes: 'Semoga tetap berlimpah pahala dengan istighfar dan membaca dzikir pagi ya Ananda Fatimah.'
  },
  {
    id: 'log-today-3',
    studentId: 'std-3', // Rayhan (Menunggu Verifikasi)
    date: '2026-11-15',
    status: 'Ya',
    rakaat: 2,
    timeSlot: 'Pertengahan',
    timeString: '09:15',
    location: 'Sekolah',
    isJamaah: true,
    isIndependent: false,
    surahList: ['Al-Ikhlas', 'Al-Kafirun'],
    favoriteSurah: 'Al-Ikhlas',
    hasDoaAfterDhuha: true,
    quizTaken: true,
    quizScore: 70,
    quizAttempts: 2,
    quizDurationSeconds: 12,
    isQuickAnswer: true,
    quizTopic: 'Bacaan & Doa',
    reflectiveAnswer: {
      questionId: 'ref-1',
      question: 'Setelah sholat Dhuha hari ini, perasaanmu…',
      indicator: 'Keikhlasan Beribadah',
      answer: '😞 Terpaksa / tidak nyaman',
      needsApproach: true
    },
    verificationStatus: 'Menunggu',
    teacherNotes: ''
  },
  {
    id: 'log-today-5',
    studentId: 'std-5', // Aisyah (Menunggu Verifikasi)
    date: '2026-11-15',
    status: 'Ya',
    rakaat: 4,
    timeSlot: 'Awal',
    timeString: '07:45',
    location: 'Masjid',
    isJamaah: true,
    isIndependent: true,
    surahList: ['Asy-Syams', 'Al-Lail'],
    favoriteSurah: 'Asy-Syams',
    hasDoaAfterDhuha: true,
    hafalanSurah: 'Asy-Syams',
    hafalanStatus: 'Lancar',
    quizTaken: true,
    quizScore: 95,
    quizAttempts: 1,
    quizDurationSeconds: 52,
    isQuickAnswer: false,
    quizTopic: 'Fiqih Dhuha',
    reflectiveAnswer: {
      questionId: 'ref-8',
      question: 'Apakah kamu mengajak teman untuk sholat Dhuha hari ini?',
      indicator: 'Dampak Sosial Karakter (Kandidat Mentor)',
      answer: 'Ya, dan ia ikut sholat',
      isMentorCandidate: true
    },
    verificationStatus: 'Menunggu',
    teacherNotes: ''
  },
  // std-4 (Muhammad Bilal) BELUM MENGISI HARI INI -> agar guru bisa melihat "Belum Mengisi"

  // Log Historis Kemarin (2026-11-14)
  {
    id: 'log-hist-1',
    studentId: 'std-1',
    date: '2026-11-14',
    status: 'Ya',
    rakaat: 4,
    timeSlot: 'Awal',
    timeString: '07:15',
    location: 'Rumah',
    isJamaah: false,
    isIndependent: true,
    surahList: ['Ad-Dhuha', 'Ayat Kursi'],
    favoriteSurah: 'Ad-Dhuha',
    hasDoaAfterDhuha: true,
    quizTaken: true,
    quizScore: 100,
    verificationStatus: 'Disetujui',
    verifiedAt: '2026-11-14 08:20',
    verifiedBy: 'Ustadz Mansur, S.Pd.I',
    teacherNotes: 'Bagus sekali hafalannya.'
  },
  {
    id: 'log-hist-2',
    studentId: 'std-2',
    date: '2026-11-14',
    status: 'Udzur',
    udzurReason: 'Haid',
    rakaat: 2,
    timeSlot: 'Awal',
    timeString: '07:10',
    location: 'Rumah',
    isJamaah: false,
    isIndependent: true,
    surahList: [],
    hasDoaAfterDhuha: false,
    quizTaken: true,
    quizScore: 85,
    verificationStatus: 'Disetujui',
    verifiedAt: '2026-11-14 08:25',
    verifiedBy: 'Ustadz Mansur, S.Pd.I'
  },
  {
    id: 'log-hist-3',
    studentId: 'std-3',
    date: '2026-11-14',
    status: 'Ya',
    rakaat: 2,
    timeSlot: 'Pertengahan',
    timeString: '09:20',
    location: 'Sekolah',
    isJamaah: true,
    isIndependent: false,
    surahList: ['Al-Ikhlas'],
    hasDoaAfterDhuha: true,
    quizTaken: true,
    quizScore: 80,
    verificationStatus: 'Disetujui',
    verifiedAt: '2026-11-14 09:30',
    verifiedBy: 'Ustadz Mansur, S.Pd.I'
  },
  {
    id: 'log-hist-4',
    studentId: 'std-4',
    date: '2026-11-14',
    status: 'Tidak',
    rakaat: 0,
    timeSlot: 'Akhir',
    timeString: '11:00',
    location: 'Sekolah',
    isJamaah: false,
    isIndependent: false,
    surahList: [],
    hasDoaAfterDhuha: false,
    quizTaken: false,
    verificationStatus: 'Disetujui',
    verifiedAt: '2026-11-14 11:30',
    verifiedBy: 'Ustadz Mansur, S.Pd.I',
    teacherNotes: 'Perlu bimbingan agar tidak terlambat dan terlewat waktu Dhuha.'
  },
  {
    id: 'log-hist-5',
    studentId: 'std-5',
    date: '2026-11-14',
    status: 'Ya',
    rakaat: 4,
    timeSlot: 'Awal',
    timeString: '07:30',
    location: 'Rumah',
    isJamaah: true,
    isIndependent: true,
    surahList: ['Ad-Dhuha', 'Al-Insyirah'],
    hasDoaAfterDhuha: true,
    quizTaken: true,
    quizScore: 90,
    verificationStatus: 'Disetujui',
    verifiedAt: '2026-11-14 08:30',
    verifiedBy: 'Ustadz Mansur, S.Pd.I'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = ALL_QUIZ_QUESTIONS;


