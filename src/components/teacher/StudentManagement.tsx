import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Student, NewStudentInput } from '../../types';
import { UserPlus, Trash2, KeyRound, Phone, User, Users, Shield, Check, X, Search } from 'lucide-react';

export const StudentManagement: React.FC = () => {
  const { students, addStudent, deleteStudent } = useApp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Form State
  const [name, setName] = useState('');
  const [nis, setNis] = useState('');
  const [gender, setGender] = useState<'L' | 'P'>('L');
  const [className, setClassName] = useState('Kelas 5-A');
  const [studentPin, setStudentPin] = useState('1234');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [parentUsername, setParentUsername] = useState('');
  const [parentPin, setParentPin] = useState('1234');
  const [formError, setFormError] = useState<string | null>(null);

  const resetForm = () => {
    setName('');
    setNis('');
    setGender('L');
    setClassName('Kelas 5-A');
    setStudentPin('1234');
    setParentName('');
    setParentPhone('');
    setParentUsername('');
    setParentPin('1234');
    setFormError(null);
  };

  const handleOpenModal = () => {
    resetForm();
    // Auto-generate NIS saran
    const maxNis = students.reduce((max, s) => {
      const num = parseInt(s.nis, 10);
      return !isNaN(num) && num > max ? num : max;
    }, 20240100);
    setNis(String(maxNis + 1));
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!name.trim()) {
      setFormError('Nama lengkap santri wajib diisi.');
      return;
    }
    if (!nis.trim()) {
      setFormError('NIS santri wajib diisi (untuk username login).');
      return;
    }
    if (students.some(s => s.nis.toLowerCase() === nis.trim().toLowerCase())) {
      setFormError(`NIS ${nis} sudah digunakan oleh santri lain.`);
      return;
    }
    if (!parentName.trim()) {
      setFormError('Nama orang tua / wali santri wajib diisi.');
      return;
    }

    const inputData: NewStudentInput = {
      name: name.trim(),
      nis: nis.trim(),
      gender,
      className,
      studentPin: studentPin.trim() || '1234',
      parentName: parentName.trim(),
      parentPhone: parentPhone.trim() || '0812-0000-0000',
      parentUsername: parentUsername.trim() || parentPhone.replace(/\D/g, '') || `ortu-${nis.trim()}`,
      parentPin: parentPin.trim() || '1234'
    };

    addStudent(inputData);
    setIsModalOpen(false);
    resetForm();
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.nis.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.parentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-4">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-slate-800 text-base">
              Manajemen Data Santri & Akun Login
            </h3>
            <span className="bg-blue-100 text-blue-900 text-xs font-bold px-2 py-0.5 rounded-full">
              {students.length} Santri Terdaftar
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Daftarkan santri baru beserta akun login untuk siswa dan orang tua.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenModal}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>+ Tambah Santri & Akun Baru</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-2 max-w-sm">
        <div className="relative w-full">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama santri, NIS, atau nama ortu..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:bg-white"
          />
        </div>
      </div>

      {/* Students Table with Credentials for Teacher */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px] bg-slate-50/50">
              <th className="py-2.5 px-3 font-semibold">Nama Santri</th>
              <th className="py-2.5 px-3 font-semibold">Login Santri (NIS & PIN)</th>
              <th className="py-2.5 px-3 font-semibold">Nama Orang Tua</th>
              <th className="py-2.5 px-3 font-semibold">Login Ortu (User / WA & PIN)</th>
              <th className="py-2.5 px-3 font-semibold text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredStudents.map(student => (
              <tr key={student.id} className="hover:bg-slate-50/70 transition">
                {/* Santri Info */}
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-9 h-9 rounded-full object-cover border border-slate-200 flex-shrink-0"
                    />
                    <div>
                      <div className="font-bold text-slate-900">{student.name}</div>
                      <div className="text-[10px] text-slate-500">
                        {student.className} • {student.gender === 'P' ? 'Putri' : 'Putra'}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Login Santri */}
                <td className="py-3 px-3">
                  <div className="space-y-0.5">
                    <div className="font-mono text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block text-[11px]">
                      NIS: {student.nis}
                    </div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-1">
                      <KeyRound className="w-2.5 h-2.5 text-slate-400" />
                      <span>PIN: <strong>{student.studentPin || '1234'}</strong></span>
                    </div>
                  </div>
                </td>

                {/* Orang Tua */}
                <td className="py-3 px-3">
                  <div className="font-semibold text-slate-800">{student.parentName}</div>
                  <div className="text-[10px] text-slate-500">{student.parentPhone}</div>
                </td>

                {/* Login Ortu */}
                <td className="py-3 px-3">
                  <div className="space-y-0.5">
                    <div className="font-mono text-amber-800 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-200 inline-block text-[11px]">
                      {student.parentUsername || student.parentPhone.replace(/\D/g, '')}
                    </div>
                    <div className="text-[10px] text-slate-500 flex items-center gap-1">
                      <KeyRound className="w-2.5 h-2.5 text-slate-400" />
                      <span>PIN: <strong>{student.parentPin || '1234'}</strong></span>
                    </div>
                  </div>
                </td>

                {/* Aksi */}
                <td className="py-3 px-3 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Yakin ingin menghapus santri "${student.name}" beserta akunnya?`)) {
                        deleteStudent(student.id);
                      }
                    }}
                    title="Hapus Santri"
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Tambah Santri Baru */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-5 flex items-center justify-between">
              <div>
                <div className="text-xs text-blue-200 font-semibold uppercase tracking-wider">
                  Panel Guru / Admin
                </div>
                <h3 className="font-bold text-lg mt-0.5">Tambah Santri & Akun Login Baru</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-4">
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800">
                  {formError}
                </div>
              )}

              {/* Data Santri */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-blue-900 uppercase tracking-wider border-b border-blue-100 pb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  <span>1. Informasi Santri</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Lengkap Santri *
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Contoh: Zaidan Al-Farisi"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      NIS (Username Login Santri) *
                    </label>
                    <input
                      type="text"
                      value={nis}
                      onChange={e => setNis(e.target.value)}
                      placeholder="20240106"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      PIN Login Santri
                    </label>
                    <input
                      type="text"
                      value={studentPin}
                      onChange={e => setStudentPin(e.target.value)}
                      placeholder="1234"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Jenis Kelamin
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setGender('L')}
                        className={`py-1.5 rounded-lg text-xs font-bold border transition ${
                          gender === 'L'
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        Putra
                      </button>
                      <button
                        type="button"
                        onClick={() => setGender('P')}
                        className={`py-1.5 rounded-lg text-xs font-bold border transition ${
                          gender === 'P'
                            ? 'bg-rose-600 text-white border-rose-600'
                            : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        Putri
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Kelas
                    </label>
                    <input
                      type="text"
                      value={className}
                      onChange={e => setClassName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Data Orang Tua */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold text-amber-900 uppercase tracking-wider border-b border-amber-100 pb-1 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" />
                  <span>2. Informasi Orang Tua / Wali</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Ayah / Bunda *
                  </label>
                  <input
                    type="text"
                    value={parentName}
                    onChange={e => setParentName(e.target.value)}
                    placeholder="Contoh: Pak Ridwan Al-Farisi"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      No. WhatsApp (Username Ortu)
                    </label>
                    <input
                      type="text"
                      value={parentPhone}
                      onChange={e => {
                        setParentPhone(e.target.value);
                        setParentUsername(e.target.value.replace(/\D/g, ''));
                      }}
                      placeholder="081234567890"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      PIN Login Orang Tua
                    </label>
                    <input
                      type="text"
                      value={parentPin}
                      onChange={e => setParentPin(e.target.value)}
                      placeholder="1234"
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl border border-slate-300 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Simpan & Buat Akun</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

