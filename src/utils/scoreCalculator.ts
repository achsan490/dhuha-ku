import { DhuhaLog, AwarenessMetrics, ParentCharacterReport, Student } from '../types';

/**
 * Menghitung Metrik Kesadaran Siswa untuk Guru
 * Memperhitungkan Udzur secara adil syar'i (tidak memotong persentase)
 */
export function calculateAwarenessMetrics(
  studentId: string,
  logs: DhuhaLog[],
  totalEffectiveSchoolDays: number = 24
): AwarenessMetrics {
  const studentLogs = logs.filter(l => l.studentId === studentId);

  // Hitung jumlah hari berstatus
  const prayerLogs = studentLogs.filter(l => l.status === 'Ya');
  const udzurLogs = studentLogs.filter(l => l.status === 'Udzur');
  const prayerDays = prayerLogs.length;
  const udzurDays = udzurLogs.length;

  // Normalisasi Udzur: Hari efektif siswa dikurangi hari udzur
  const effectiveDaysForStudent = Math.max(1, totalEffectiveSchoolDays - udzurDays);
  
  // 1. Konsistensi (0-100)
  const consistencyScore = Math.min(100, Math.round((prayerDays / effectiveDaysForStudent) * 100));

  // 2. Kelengkapan Bacaan (0-100): Surat dibaca >= 1 DAN doa setelah dhuha = true
  const completeReadingDays = prayerLogs.filter(
    l => l.surahList.length > 0 && l.hasDoaAfterDhuha
  ).length;
  const readingCompletenessScore = prayerDays > 0 
    ? Math.round((completeReadingDays / prayerDays) * 100) 
    : 0;

  // 3. Skor Kuis Rata-rata (0-100)
  const quizLogs = studentLogs.filter(l => l.quizTaken && typeof l.quizScore === 'number');
  const quizAvgScore = quizLogs.length > 0
    ? Math.round(quizLogs.reduce((acc, curr) => acc + (curr.quizScore || 0), 0) / quizLogs.length)
    : 75; // default netral jika belum kuis

  // Formula Pokok: 40% Konsistensi + 30% Kelengkapan Bacaan + 30% Kuis
  const awarenessScore = Math.round(
    (consistencyScore * 0.4) + (readingCompletenessScore * 0.3) + (quizAvgScore * 0.3)
  );

  // Kategori Kesadaran
  let category: 'Sadar & Konsisten' | 'Berkembang' | 'Perlu Pendampingan' = 'Berkembang';
  if (awarenessScore >= 80) {
    category = 'Sadar & Konsisten';
  } else if (awarenessScore < 60) {
    category = 'Perlu Pendampingan';
  }

  // Rasio Inisiatif (% diisi sebelum diingatkan)
  const initiativeLogs = prayerLogs.filter(l => l.isIndependent).length;
  const initiativeRatio = prayerDays > 0 ? Math.round((initiativeLogs / prayerDays) * 100) : 0;

  // Rasio Kemandirian di Rumah (% sholat di rumah)
  const homeLogs = prayerLogs.filter(l => l.location === 'Rumah').length;
  const homeRatio = prayerDays > 0 ? Math.round((homeLogs / prayerDays) * 100) : 0;

  // Hitung streak berurutan terkini
  let currentStreak = 0;
  const sortedLogs = [...studentLogs].sort((a, b) => b.date.localeCompare(a.date));
  for (const log of sortedLogs) {
    if (log.status === 'Ya') {
      currentStreak++;
    } else if (log.status === 'Udzur') {
      // Udzur tidak memutus rantai streak
      continue;
    } else {
      break;
    }
  }

  return {
    studentId,
    effectiveDays: effectiveDaysForStudent,
    prayerDays,
    udzurDays,
    consistencyScore,
    readingCompletenessScore,
    quizAvgScore,
    awarenessScore,
    category,
    streak: Math.max(currentStreak, prayerDays > 0 ? currentStreak : 0),
    initiativeRatio,
    homeRatio
  };
}

/**
 * Menghasilkan Laporan Karakter untuk Orang Tua (Naratif & Bermakna)
 */
export function generateParentCharacterReport(
  student: Student,
  logs: DhuhaLog[],
  totalEffectiveDays: number = 24
): ParentCharacterReport {
  const metrics = calculateAwarenessMetrics(student.id, logs, totalEffectiveDays);
  const studentLogs = logs.filter(l => l.studentId === student.id && l.status === 'Ya');

  // Skor Kedisiplinan: kombinasi streak dan ketepatan waktu
  let timeScoreTotal = 0;
  studentLogs.forEach(l => {
    if (l.timeSlot === 'Awal') timeScoreTotal += 100;
    else if (l.timeSlot === 'Pertengahan') timeScoreTotal += 85;
    else timeScoreTotal += 70;
  });
  const avgTimeScore = studentLogs.length > 0 ? timeScoreTotal / studentLogs.length : 80;
  const disciplineScore = Math.round((metrics.consistencyScore * 0.6) + (avgTimeScore * 0.4));

  // Skor Kemandirian: Inisiatif + Sholat di Rumah
  const independenceScore = Math.round((metrics.initiativeRatio * 0.6) + (metrics.homeRatio * 0.4));
  let independenceBadge: 'Mandiri' | 'Berkembang' | 'Perlu Pendampingan' = 'Berkembang';
  if (independenceScore >= 75) independenceBadge = 'Mandiri';
  else if (independenceScore < 50) independenceBadge = 'Perlu Pendampingan';

  // Skor Ketekunan: Kelengkapan Bacaan + Percobaan Kuis
  const perseveranceScore = Math.round((metrics.readingCompletenessScore * 0.7) + (metrics.quizAvgScore * 0.3));
  let perseveranceBadge: 'Sangat Tekun' | 'Tekun' | 'Cukup Tekun' = 'Tekun';
  if (perseveranceScore >= 85) perseveranceBadge = 'Sangat Tekun';
  else if (perseveranceScore < 65) perseveranceBadge = 'Cukup Tekun';

  const understandingScore = metrics.quizAvgScore;

  // Analisis Surat Terbanyak Dibaca
  const surahCountMap: Record<string, number> = {};
  studentLogs.forEach(l => {
    l.surahList.forEach(s => {
      surahCountMap[s] = (surahCountMap[s] || 0) + 1;
    });
  });
  let topSurah = 'Ad-Dhuha';
  let maxCount = 0;
  Object.entries(surahCountMap).forEach(([surah, count]) => {
    if (count > maxCount) {
      maxCount = count;
      topSurah = surah;
    }
  });

  // Topik Kuis
  const strongTopic = 'Fiqih Dhuha & Niat';
  const weakTopic = 'Kisah Inspiratif & Hikmah';

  // Generate Narasi Otomatis yang Positif & Menyentuh
  const outstandingTraits: string[] = [];
  if (disciplineScore >= 80) outstandingTraits.push('Kedisiplinan yang tinggi');
  if (independenceScore >= 70) outstandingTraits.push('Kemandirian beribadah');
  if (perseveranceScore >= 75) outstandingTraits.push('Ketekunan dalam membaca surat pilihan');

  const traitStr = outstandingTraits.length > 0 
    ? outstandingTraits.join(' serta ') 
    : 'semangat belajar yang terus bertumbuh';

  const narrativeText = `Alhamdulillah, sepanjang periode ini Ananda ${student.name} telah melaksanakan Sholat Dhuha sebanyak ${metrics.prayerDays} hari dari total ${metrics.effectiveDays} hari efektif${metrics.udzurDays > 0 ? ` (dengan ${metrics.udzurDays} hari udzur syar'i)` : ''}. Surat yang paling sering dibaca adalah ${topSurah}. Karakter yang paling menonjol pada Ananda adalah ${traitStr}. Rata-rata skor kuis pemahaman ananda mencapai ${understandingScore}/100.`;

  // Rekomendasi untuk Orang Tua di Rumah
  let recommendationForHome = `Ajak Ananda membaca surat ${topSurah} bersama Ayah/Bunda saat pagi hari di akhir pekan, serta berikan apresiasi atas konsistensi sholatnya.`;
  if (metrics.homeRatio < 50) {
    recommendationForHome = `Dukung pembiasaan mandiri di rumah saat hari libur (Sabtu/Minggu) dengan menyiapkan sajadah bersama sebelum waktu Dhuha tiba.`;
  } else if (metrics.readingCompletenessScore < 70) {
    recommendationForHome = `Dampingi Ananda saat berdoa setelah Dhuha dan kenalkan makna doa dhuha agar semakin meresap ke dalam hati.`;
  }

  return {
    studentId: student.id,
    periodName: 'Bulan Berjalan',
    disciplineScore,
    independenceScore,
    independenceBadge,
    perseveranceScore,
    perseveranceBadge,
    understandingScore,
    topSurah,
    weakTopic,
    strongTopic,
    narrativeText,
    recommendationForHome
  };
}

