# 🕌 DhuhaKu — Rekap Kesadaran Guru & Pantau Karakter Orang Tua

Aplikasi instrumen pembiasaan Sholat Dhuha berbasis **Kesadaran (*Mindful Worship*) & Karakter Islami**, menghubungkan ekosistem **Siswa (pengisi utama)**, **Guru (verifikator & rekap kesadaran)**, dan **Orang Tua (pemantau karakter Islami naratif)**.

---

## 🎯 1. Filosofi & Alur Kerja Data

```
[ Siswa Mengisi ]  ➡️  [ Guru Memverifikasi ]  ➡️  [ Orang Tua Memantau ]
 (Self-Report Jujur)     (1-Click Approval)        (Data Valid & Naratif)
```

1. **Siswa**: Menjadi subjek utama pembiasaan dengan mengisi form sholat Dhuha harian, mencentang surat yang dibaca, dan mengerjakan kuis hikmah singkat (2 menit).
2. **Guru**: Tidak perlu menginput manual satu-satu. Cukup memverifikasi (*approve*) antrean pengisian siswa secara individual maupun massal (*1-Click Batch Approve*), serta membaca peta kesadaran kelas.
3. **Orang Tua**: Menerima data yang sudah divalidasi pihak sekolah (bukan klaim mentah anak), melihat perkembangan 4 pilar karakter Islami, narasi otomatis bulanan, serta tips pendampingan konkret di rumah.

---

## 📊 2. Indikator & Formula Perhitungan

### A. Indikator Input Harian (Diisi Siswa)
* **Sholat Dhuha**: Status (`Ya` / `Udzur` / `Tidak`), Rakaat (2, 4, 6, 8, 10, 12), Waktu (`Awal` / `Pertengahan` / `Akhir`), Tempat (`Rumah` / `Masjid` / `Sekolah`), Berjamaah (`Ya` / `Tidak`), Inisiatif Mandiri (`Ya` / `Tidak`), dan Bukti Foto (Opsional).
* **Bacaan Surat & Doa**: Checklist multi-pilih (Ad-Dhuha, Asy-Syams, Al-Lail, Al-Insyirah, Al-Kafirun, Al-Ikhlas, Ayat Kursi), Surat Favorit Hari Ini, Doa Setelah Dhuha (`Sudah` / `Belum`), serta Setoran Hafalan Tahfidz (`Lancar` / `Terbata-bata` / `Belum`).
* **Kuis Pendukung**: 3 soal singkat pilihan ganda bertopik *Fiqih Dhuha, Bacaan & Doa, Adab, atau Kisah Inspiratif*. Skor 0–100 otomatis, deteksi jumlah percobaan (*effort/ketekunan*).

### B. Formula Skor Kesadaran (Untuk Guru)
$$\text{Skor Kesadaran} = (\text{Konsistensi} \times 40\%) + (\text{Kelengkapan Bacaan} \times 30\%) + (\text{Skor Kuis} \times 30\%)$$

* **Keadilan Syar'i (Normalisasi Udzur)**: Hari berhalangan karena haid/sakit dikurangkan dari total hari efektif siswa, sehingga siswi yang berhalangan tetap berhak atas skor konsistensi **100%**.
* **Klasifikasi Kategori**:
  * `80 – 100`: **Sadar & Konsisten** (Hijau)
  * `60 – 79`: **Berkembang** (Kuning)
  * `< 60`: **Perlu Pendampingan** (Merah)

### C. 4 Pilar Karakter Islami (Untuk Orang Tua)
1. **Kedisiplinan**: Mengukur konsistensi streak berturut-turut dan ketepatan sholat di awal waktu Dhuha.
2. **Kemandirian**: Mengukur persentase sholat atas inisiatif sendiri dan pembiasaan sholat di rumah (Badge: *Mandiri* / *Berkembang* / *Perlu Pendampingan*).
3. **Ketekunan**: Mengukur kelengkapan membaca surat pilihan, doa setelah sholat, dan kemauan mengulang kuis (Badge: *Sangat Tekun* / *Tekun* / *Cukup Tekun*).
4. **Pemahaman**: Mengukur tren wawasan fiqih dan hikmah ibadah.
5. **Narasi Otomatis & Rekomendasi**: Menghasilkan kalimat rapor bulanan yang ramah dan aksi nyata untuk Ayah/Bunda di rumah.

---

## 💻 3. Menjalankan Aplikasi Secara Lokal

### Prasyarat
* Node.js v18+ dan npm

### Perintah
```bash
# 1. Jalankan development server
npm run dev

# 2. Atau build untuk production
npm run build
npm run preview
```

Buka URL: `http://localhost:5173/` di browser.

Gunakan **Simulation Role Switcher Bar** di bagian atas untuk berpindah peran (*Siswa: Ahmad/Fatimah*, *Guru: Ustadz Mansur*, *Orang Tua: Pak Hendra*) dalam 1 kali klik.

