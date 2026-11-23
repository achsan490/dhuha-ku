import React, { createContext, useContext, useState, useEffect } from 'react';
import { Role, Student, DhuhaLog, QuizTopic, VerificationStatus, UserSession, NewStudentInput, StudentReflectiveEntry } from '../types';
import { INITIAL_STUDENTS, INITIAL_LOGS } from '../data/mockData';

interface AppContextType {
  currentUser: UserSession | null;
  universalLogin: (identifier: string, pin: string) => { success: boolean; message: string; role?: Role };
  login: (user: UserSession) => void;
  logout: () => void;
  currentRole: Role;
  setCurrentRole: (role: Role) => void;
  activeStudentId: string;
  setActiveStudentId: (id: string) => void;
  students: Student[];
  addStudent: (data: NewStudentInput) => void;
  deleteStudent: (studentId: string) => void;
  logs: DhuhaLog[];
  todayStr: string;
  submitDhuhaLog: (logData: Partial<DhuhaLog>) => void;
  verifyLog: (logId: string, status: VerificationStatus, notes?: string) => void;
  verifyAllTodayLogs: () => void;
  getTodayLog: (studentId: string) => DhuhaLog | undefined;
  activeQuizModal: boolean;
  quizSurahTag?: string;
  openQuizModal: (surahTag?: string) => void;
  closeQuizModal: () => void;
  recordQuizResult: (
    score: number,
    topic: QuizTopic,
    attempts: number,
    durationSeconds: number,
    reflectiveAnswer?: StudentReflectiveEntry,
    isQuickAnswer?: boolean
  ) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Session User State (null jika belum login)
  const [currentUser, setCurrentUser] = useState<UserSession | null>(() => {
    const saved = localStorage.getItem('dhuhaku_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [currentRole, setCurrentRole] = useState<Role>(currentUser?.role || 'siswa');
  const [activeStudentId, setActiveStudentId] = useState<string>(currentUser?.studentId || 'std-1');

  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem('dhuhaku_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [logs, setLogs] = useState<DhuhaLog[]>(() => {
    const saved = localStorage.getItem('dhuhaku_logs');
    return saved ? JSON.parse(saved) : INITIAL_LOGS;
  });

  const todayStr = '2026-11-15'; // Tanggal hari ini sesuai metadata sistem
  const [activeQuizModal, setActiveQuizModal] = useState<boolean>(false);
  const [quizSurahTag, setQuizSurahTag] = useState<string | undefined>(undefined);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    localStorage.removeItem('dhuhaku_demo_mode');
    if (currentUser) {
      localStorage.setItem('dhuhaku_user', JSON.stringify(currentUser));
      setCurrentRole(currentUser.role);
      if (currentUser.studentId) {
        setActiveStudentId(currentUser.studentId);
      }
    } else {
      localStorage.removeItem('dhuhaku_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('dhuhaku_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('dhuhaku_logs', JSON.stringify(logs));
  }, [logs]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  /**
   * Universal Login: 1 Form untuk Semua Peran
   * Otomatis memetakan apakah identifier adalah Guru, Siswa, atau Orang Tua
   */
  const universalLogin = (identifier: string, pin: string): { success: boolean; message: string; role?: Role } => {
    const cleanId = identifier.trim().toLowerCase();
    const cleanPin = pin.trim();

    // 1. Cek Akun Guru / Admin
    const isGuruIdentifier = cleanId === 'guru' || cleanId === 'ust.mansur' || cleanId === 'admin' || cleanId.includes('guru@') || cleanId.includes('mansur@');
    if (isGuruIdentifier) {
      if (cleanPin === 'guru123' || cleanPin === '1234' || cleanPin === 'admin') {
        const session: UserSession = {
          id: 'teacher-1',
          name: 'Ustadz Mansur, S.Pd.I',
          role: 'guru',
          className: 'Kelas 5-A',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
          username: cleanId
        };
        setCurrentUser(session);
        setCurrentRole('guru');
        showToast('Ahlan wa Sahlan, Ustadz Mansur! Berhasil masuk ke Portal Guru.');
        return { success: true, message: 'Berhasil login sebagai Guru', role: 'guru' };
      } else {
        return { success: false, message: 'Password/PIN Guru salah. (Default demo: guru123 / 1234)' };
      }
    }

    // 2. Cek Akun Siswa (Berdasarkan NIS atau Nama Depan)
    const matchedStudent = students.find(s => 
      s.nis.toLowerCase() === cleanId || 
      s.name.toLowerCase().startsWith(cleanId)
    );

    if (matchedStudent) {
      const expectedPin = matchedStudent.studentPin || '1234';
      if (cleanPin === expectedPin || cleanPin === '1234') {
        const session: UserSession = {
          id: matchedStudent.id,
          name: matchedStudent.name,
          role: 'siswa',
          studentId: matchedStudent.id,
          className: matchedStudent.className,
          avatar: matchedStudent.avatar,
          nis: matchedStudent.nis,
          username: matchedStudent.nis
        };
        setCurrentUser(session);
        setCurrentRole('siswa');
        setActiveStudentId(matchedStudent.id);
        showToast(`Ahlan wa Sahlan, ${matchedStudent.name}! Berhasil masuk ke Ruang Siswa.`);
        return { success: true, message: 'Berhasil login sebagai Siswa', role: 'siswa' };
      } else {
        return { success: false, message: `PIN Santri salah. (Default demo: 1234)` };
      }
    }

    // 3. Cek Akun Orang Tua (Berdasarkan No HP atau parentUsername)
    const cleanNumbersOnly = cleanId.replace(/\D/g, '');
    const matchedParentStudent = students.find(s => {
      const phoneDigits = s.parentPhone.replace(/\D/g, '');
      const parentUser = (s.parentUsername || '').toLowerCase();
      return (
        cleanId === parentUser ||
        (cleanNumbersOnly.length >= 6 && phoneDigits.includes(cleanNumbersOnly)) ||
        cleanId === `ortu-${s.nis}` ||
        cleanId === `ortu.${s.name.toLowerCase().split(' ')[0]}`
      );
    });

    if (matchedParentStudent) {
      const expectedPin = matchedParentStudent.parentPin || '1234';
      if (cleanPin === expectedPin || cleanPin === '1234') {
        const session: UserSession = {
          id: `parent-${matchedParentStudent.id}`,
          name: matchedParentStudent.parentName,
          role: 'ortu',
          studentId: matchedParentStudent.id,
          className: matchedParentStudent.className,
          username: cleanId
        };
        setCurrentUser(session);
        setCurrentRole('ortu');
        setActiveStudentId(matchedParentStudent.id);
        showToast(`Assalamu'alaikum, ${matchedParentStudent.parentName}! Berhasil masuk ke Rapor Karakter.`);
        return { success: true, message: 'Berhasil login sebagai Orang Tua', role: 'ortu' };
      } else {
        return { success: false, message: 'PIN Orang Tua salah. (Default demo: 1234)' };
      }
    }

    return { 
      success: false, 
      message: 'Akun tidak ditemukan. Masukkan NIS siswa, nomor WA ortu, atau "guru" untuk wali kelas.' 
    };
  };

  const login = (user: UserSession) => {
    setCurrentUser(user);
    setCurrentRole(user.role);
    if (user.studentId) {
      setActiveStudentId(user.studentId);
    }
    showToast(`Ahlan wa Sahlan, ${user.name}!`);
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Anda telah keluar dari aplikasi.');
  };

  /**
   * Tambah Santri Baru & Akun Ortu (Oleh Guru/Admin)
   */
  const addStudent = (input: NewStudentInput) => {
    const newId = `std-${Date.now()}`;
    const defaultAvatar = input.gender === 'P'
      ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      : 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80';

    const newStudent: Student = {
      id: newId,
      name: input.name,
      nis: input.nis,
      gender: input.gender,
      className: input.className || 'Kelas 5-A',
      studentPin: input.studentPin || '1234',
      parentName: input.parentName,
      parentPhone: input.parentPhone,
      parentUsername: input.parentUsername || input.parentPhone.replace(/\D/g, '') || `ortu-${input.nis}`,
      parentPin: input.parentPin || '1234',
      avatar: defaultAvatar,
      streakCount: 0,
      badges: []
    };

    setStudents(prev => [newStudent, ...prev]);
    showToast(`Alhamdulillah! Santri baru "${input.name}" & akun orang tua berhasil ditambahkan.`);
  };

  /**
   * Hapus Santri (Oleh Guru/Admin)
   */
  const deleteStudent = (studentId: string) => {
    setStudents(prev => prev.filter(s => s.id !== studentId));
    setLogs(prev => prev.filter(l => l.studentId !== studentId));
    showToast('Santri berhasil dihapus dari sistem kelas.');
  };

  const getTodayLog = (studentId: string): DhuhaLog | undefined => {
    return logs.find(l => l.studentId === studentId && l.date === todayStr);
  };

  const submitDhuhaLog = (logData: Partial<DhuhaLog>) => {
    const student = students.find(s => s.id === activeStudentId);
    const existingIndex = logs.findIndex(
      l => l.studentId === activeStudentId && l.date === todayStr
    );

    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeStr = `${hours}:${minutes}`;

    const newLog: DhuhaLog = {
      id: existingIndex >= 0 ? logs[existingIndex].id : `log-${Date.now()}`,
      studentId: activeStudentId,
      date: todayStr,
      status: logData.status || 'Ya',
      udzurReason: logData.udzurReason,
      rakaat: logData.rakaat ?? 2,
      timeSlot: logData.timeSlot || 'Awal',
      timeString: logData.timeString || timeStr,
      location: logData.location || 'Rumah',
      isJamaah: logData.isJamaah ?? false,
      photoUrl: logData.photoUrl,
      isIndependent: logData.isIndependent ?? true,
      surahList: logData.surahList || [],
      favoriteSurah: logData.favoriteSurah,
      hasDoaAfterDhuha: logData.hasDoaAfterDhuha ?? false,
      hafalanSurah: logData.hafalanSurah,
      hafalanStatus: logData.hafalanStatus,
      quizTaken: logData.quizTaken ?? false,
      quizScore: logData.quizScore,
      quizAttempts: logData.quizAttempts ?? 0,
      quizDurationSeconds: logData.quizDurationSeconds,
      isQuickAnswer: logData.isQuickAnswer ?? false,
      quizTopic: logData.quizTopic,
      reflectiveAnswer: logData.reflectiveAnswer,
      verificationStatus: 'Menunggu',
      teacherNotes: ''
    };

    let updatedLogs: DhuhaLog[];
    if (existingIndex >= 0) {
      updatedLogs = [...logs];
      updatedLogs[existingIndex] = {
        ...updatedLogs[existingIndex],
        ...newLog,
        teacherNotes: updatedLogs[existingIndex].teacherNotes
      };
    } else {
      updatedLogs = [newLog, ...logs];
    }

    setLogs(updatedLogs);

    if (newLog.status === 'Ya') {
      setStudents(prev =>
        prev.map(s => (s.id === activeStudentId ? { ...s, streakCount: s.streakCount + 1 } : s))
      );
    }

    showToast(`Alhamdulillah! Jurnal Dhuha ananda ${student?.name} tersimpan & menunggu verifikasi guru.`);
  };

  const verifyLog = (logId: string, status: VerificationStatus, notes?: string) => {
    setLogs(prev =>
      prev.map(l => {
        if (l.id === logId) {
          return {
            ...l,
            verificationStatus: status,
            verifiedAt: `${todayStr} 08:45`,
            verifiedBy: 'Ustadz Mansur, S.Pd.I',
            teacherNotes: notes !== undefined ? notes : l.teacherNotes
          };
        }
        return l;
      })
    );
    showToast(`Status pengisian berhasil di-${status.toLowerCase()}`);
  };

  const verifyAllTodayLogs = () => {
    setLogs(prev =>
      prev.map(l => {
        if (l.date === todayStr && l.verificationStatus === 'Menunggu') {
          return {
            ...l,
            verificationStatus: 'Disetujui',
            verifiedAt: `${todayStr} 08:45`,
            verifiedBy: 'Ustadz Mansur, S.Pd.I',
            teacherNotes: l.teacherNotes || 'Alhamdulillah, pembiasaan Dhuha terverifikasi baik.'
          };
        }
        return l;
      })
    );
    showToast('Semua pengisian hari ini berhasil disetujui (1-Click Batch Approve)!');
  };

  const openQuizModal = (surahTag?: string) => {
    setQuizSurahTag(surahTag);
    setActiveQuizModal(true);
  };

  const closeQuizModal = () => {
    setActiveQuizModal(false);
    setQuizSurahTag(undefined);
  };

  const recordQuizResult = (
    score: number,
    topic: QuizTopic,
    attempts: number,
    durationSeconds: number,
    reflectiveAnswer?: StudentReflectiveEntry,
    isQuickAnswer?: boolean
  ) => {
    setLogs(prev =>
      prev.map(l => {
        if (l.studentId === activeStudentId && l.date === todayStr) {
          return {
            ...l,
            quizTaken: true,
            quizScore: score,
            quizTopic: topic,
            quizAttempts: attempts,
            quizDurationSeconds: durationSeconds,
            reflectiveAnswer: reflectiveAnswer ?? l.reflectiveAnswer,
            isQuickAnswer: isQuickAnswer ?? l.isQuickAnswer
          };
        }
        return l;
      })
    );
    closeQuizModal();
    showToast(`MasyaAllah! Skor kuis kesadaran ananda: ${score}/100.`);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        universalLogin,
        login,
        logout,
        currentRole,
        setCurrentRole,
        activeStudentId,
        setActiveStudentId,
        students,
        addStudent,
        deleteStudent,
        logs,
        todayStr,
        submitDhuhaLog,
        verifyLog,
        verifyAllTodayLogs,
        getTodayLog,
        activeQuizModal,
        quizSurahTag,
        openQuizModal,
        closeQuizModal,
        recordQuizResult,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
