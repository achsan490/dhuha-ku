import { QuizQuestion, ReflectiveQuestion } from '../types';

/**
 * BANK SOAL LENGKAP — Aplikasi Monitoring Sholat Dhuha
 * Total: 48 Soal (20 PG Medium + 20 PG HOTS + 8 Reflektif)
 */

// ==========================================
// BAGIAN A — 20 SOAL PILIHAN GANDA MEDIUM
// ==========================================
export const QUESTION_BANK_A: QuizQuestion[] = [
  // A1. Fiqih Dhuha (1–7)
  {
    id: 'q-1',
    topic: 'Fiqih Dhuha',
    difficulty: 'medium',
    question: 'Hukum melaksanakan sholat Dhuha adalah…',
    options: [
      'Wajib bagi setiap muslim',
      'Sunnah muakkadah (sunnah yang ditekankan)',
      'Mubah tanpa keutamaan',
      'Sunnah hanya di bulan Ramadhan'
    ],
    correctIndex: 1,
    explanation: 'Sholat Dhuha adalah sunnah muakkadah yang sangat dianjurkan, terutama bagi yang ingin mendekatkan diri kepada Allah dan memohon rezeki.'
  },
  {
    id: 'q-2',
    topic: 'Fiqih Dhuha',
    difficulty: 'medium',
    question: 'Waktu terbaik untuk melaksanakan sholat Dhuha adalah…',
    options: [
      'Setelah subuh sebelum matahari terbit',
      'Saat matahari tepat di atas kepala (zawal)',
      'Setelah matahari naik sekitar satu tombak hingga sebelum zawal',
      'Setelah sholat Ashar'
    ],
    correctIndex: 2,
    explanation: 'Waktu Dhuha dimulai ±15–20 menit setelah matahari terbit hingga sebelum matahari tergelincir (zawal). Waktu paling utama adalah saat matahari sudah tinggi dan panas mulai menyengat.'
  },
  {
    id: 'q-3',
    topic: 'Fiqih Dhuha',
    difficulty: 'medium',
    question: 'Batas minimal dan maksimal rakaat sholat Dhuha adalah…',
    options: [
      '1 rakaat minimal, 5 rakaat maksimal',
      '2 rakaat minimal, 12 rakaat maksimal',
      '3 rakaat minimal, 10 rakaat maksimal',
      '2 rakaat minimal, 8 rakaat maksimal'
    ],
    correctIndex: 1,
    explanation: 'Minimal 2 rakaat dan maksimal 12 rakaat. Jumlah yang paling sering dicontohkan Rasulullah adalah 2, 4, 8, atau 12 rakaat.'
  },
  {
    id: 'q-4',
    topic: 'Fiqih Dhuha',
    difficulty: 'medium',
    question: 'Sholat Dhuha dikerjakan dengan cara…',
    options: [
      'Berjamaah wajib',
      'Munfarid (sendiri), boleh berjamaah',
      'Hanya boleh berjamaah di masjid',
      'Hanya boleh sendiri di rumah'
    ],
    correctIndex: 1,
    explanation: 'Sholat Dhuha dikerjakan sendiri (munfarid). Tidak ada tuntunan khusus untuk berjamaah, meskipun boleh dilakukan bersama-sama tanpa niat berjamaah.'
  },
  {
    id: 'q-5',
    topic: 'Fiqih Dhuha',
    difficulty: 'medium',
    question: 'Jika seseorang sedang haid, maka kewajiban sholat Dhuha baginya adalah…',
    options: [
      'Tetap wajib dikerjakan',
      'Diganti dengan sholat lain',
      'Tidak wajib dan tidak perlu diganti (udzur syar\'i)',
      'Harus membayar fidyah'
    ],
    correctIndex: 2,
    explanation: 'Wanita haid termasuk udzur syar\'i — tidak wajib sholat dan tidak perlu menggantinya. Aplikasi harus menyediakan status "Udzur" agar skor tidak turun.'
  },
  {
    id: 'q-6',
    topic: 'Fiqih Dhuha',
    difficulty: 'medium',
    question: 'Sholat Dhuha termasuk sholat yang…',
    options: [
      'Tidak boleh dilakukan di rumah',
      'Lebih utama dilakukan di masjid bagi laki-laki',
      'Hanya sah jika dilakukan di sekolah',
      'Tidak boleh dilakukan sendirian'
    ],
    correctIndex: 1,
    explanation: 'Sholat sunnah seperti Dhuha lebih utama di masjid bagi laki-laki, namun tetap sah dan boleh di rumah. Bagi perempuan, di rumah lebih utama.'
  },
  {
    id: 'q-7',
    topic: 'Fiqih Dhuha',
    difficulty: 'medium',
    question: 'Jumlah rakaat sholat Dhuha yang paling banyak dicontohkan Rasulullah SAW adalah…',
    options: [
      '2 rakaat',
      '4 rakaat',
      '8 rakaat',
      '12 rakaat'
    ],
    correctIndex: 3,
    explanation: 'Meskipun minimal 2 rakaat, Rasulullah SAW disebutkan pernah mengerjakan hingga 12 rakaat. Ini menjadi batas maksimal yang dianjurkan.'
  },

  // A2. Bacaan & Doa (8–13)
  {
    id: 'q-8',
    topic: 'Bacaan & Doa',
    difficulty: 'medium',
    surahTag: 'Ad-Dhuha',
    question: 'Surat yang paling dianjurkan dibaca setelah Al-Fatihah pada sholat Dhuha adalah…',
    options: [
      'Al-Kafirun dan Al-Ikhlas',
      'Asy-Syams dan Ad-Dhuha',
      'Al-Falaq dan An-Nas',
      'Al-Fil dan Quraisy'
    ],
    correctIndex: 1,
    explanation: 'Pada rakaat pertama dianjurkan membaca Asy-Syams, dan pada rakaat kedua Ad-Dhuha.'
  },
  {
    id: 'q-9',
    topic: 'Bacaan & Doa',
    difficulty: 'medium',
    surahTag: 'Doa Dhuha',
    question: 'Doa setelah sholat Dhuha yang terkenal berisi permohonan…',
    options: [
      'Rezeki dan ampunan',
      'Kesehatan dan umur panjang',
      'Rezeki yang halal dan berkah, serta ampunan dosa',
      'Perlindungan dari api neraka'
    ],
    correctIndex: 2,
    explanation: 'Doa setelah Dhuha antara lain memohon rezeki yang halal, berkah, dan ampunan. Doa ini menunjukkan Dhuha sebagai sarana memohon rezeki.'
  },
  {
    id: 'q-10',
    topic: 'Bacaan & Doa',
    difficulty: 'medium',
    surahTag: 'Doa Dhuha',
    question: 'Lafal "Allahumma innad-duhaa\'a duhaa\'uka…" merupakan bagian dari…',
    options: [
      'Doa sebelum wudhu',
      'Doa setelah sholat Dhuha',
      'Niat sholat Dhuha',
      'Bacaan sujud'
    ],
    correctIndex: 1,
    explanation: 'Lafal tersebut adalah pembuka doa setelah sholat Dhuha yang memuji Allah sebagai pemilik waktu Dhuha.'
  },
  {
    id: 'q-11',
    topic: 'Bacaan & Doa',
    difficulty: 'medium',
    question: 'Niat sholat Dhuha dilafalkan…',
    options: [
      'Sebelum wudhu',
      'Bersamaan dengan takbiratul ihram di dalam hati',
      'Setelah selesai sholat',
      'Saat sujud terakhir'
    ],
    correctIndex: 1,
    explanation: 'Niat dilakukan bersamaan dengan takbiratul ihram, cukup di dalam hati. Melafalkan niat bukan syarat sah, tetapi boleh untuk membantu kekhusyukan.'
  },
  {
    id: 'q-12',
    topic: 'Bacaan & Doa',
    difficulty: 'medium',
    surahTag: 'Ad-Dhuha',
    question: 'Surat Ad-Dhuha terdiri dari…',
    options: [
      '8 ayat',
      '9 ayat',
      '10 ayat',
      '11 ayat'
    ],
    correctIndex: 3,
    explanation: 'Surat Ad-Dhuha terdiri dari 11 ayat. Surat ini sering dibaca pada rakaat kedua sholat Dhuha.'
  },
  {
    id: 'q-13',
    topic: 'Bacaan & Doa',
    difficulty: 'medium',
    question: 'Bacaan tasbih yang dianjurkan diperbanyak saat sholat Dhuha adalah…',
    options: [
      'Subhanallah walhamdulillah wa laa ilaha illallah wallahu akbar',
      'Laa ilaha illallah',
      'Astaghfirullah',
      'Hasbunallah'
    ],
    correctIndex: 0,
    explanation: 'Memperbanyak tasbih, tahmid, tahlil, dan takbir setelah sholat Dhuha dianjurkan sebagai bentuk dzikir dan syukur.'
  },

  // A3. Adab (14–17)
  {
    id: 'q-14',
    topic: 'Adab',
    difficulty: 'medium',
    question: 'Sebelum melaksanakan sholat Dhuha, hal pertama yang harus dilakukan adalah…',
    options: [
      'Langsung sholat tanpa persiapan',
      'Berwudhu dan memastikan suci dari hadas',
      'Membaca doa Dhuha',
      'Mengucapkan salam'
    ],
    correctIndex: 1,
    explanation: 'Wudhu adalah syarat sah sholat. Aplikasi sebaiknya menyertakan checklist "Wudhu → Niat → Gerakan → Bacaan → Doa" untuk memastikan kelengkapan.'
  },
  {
    id: 'q-15',
    topic: 'Adab',
    difficulty: 'medium',
    question: 'Sikap yang tepat saat mendengar adzan sholat wajib ketika sedang sholat Dhuha adalah…',
    options: [
      'Tetap melanjutkan Dhuha sampai selesai',
      'Mempercepat sholat Dhuha lalu sholat wajib',
      'Menghentikan Dhuha dan sholat wajib berjamaah',
      'Mengabaikan adzan'
    ],
    correctIndex: 2,
    explanation: 'Sholat wajib berjamaah lebih utama. Jika adzan berkumandang, hentikan sholat sunnah dan ikuti sholat wajib.'
  },
  {
    id: 'q-16',
    topic: 'Adab',
    difficulty: 'medium',
    question: 'Tempat yang paling utama untuk sholat Dhuha bagi seorang laki-laki adalah…',
    options: [
      'Di rumah',
      'Di masjid',
      'Di sekolah',
      'Di mana saja sama'
    ],
    correctIndex: 1,
    explanation: 'Bagi laki-laki, sholat sunnah lebih utama di masjid, kecuali sholat sunnah rawatib yang lebih utama di rumah. Dhuha termasuk yang utama di masjid.'
  },
  {
    id: 'q-17',
    topic: 'Adab',
    difficulty: 'medium',
    question: 'Ketika sholat Dhuha, sebaiknya kita…',
    options: [
      'Mempercepat gerakan agar cepat selesai',
      'Melakukan dengan khusyuk dan tenang',
      'Berbicara dengan teman',
      'Melihat HP'
    ],
    correctIndex: 1,
    explanation: 'Khusyuk adalah inti sholat. Aplikasi bisa menambahkan indikator kualitatif "dilakukan dengan tenang" untuk mendorong adab ini.'
  },

  // A4. Kisah Inspiratif (18–20)
  {
    id: 'q-18',
    topic: 'Kisah Inspiratif',
    difficulty: 'medium',
    question: 'Dalam sebuah hadis, Rasulullah SAW menyebutkan bahwa sholat Dhuha dapat menjadi…',
    options: [
      'Pengganti sholat wajib',
      'Sedekah bagi setiap persendian tubuh',
      'Penghapus dosa besar',
      'Syarat masuk surga'
    ],
    correctIndex: 1,
    explanation: 'Hadis menyebutkan bahwa setiap persendian memiliki kewajiban sedekah, dan sholat Dhuha dapat mencukupi sedekah tersebut.'
  },
  {
    id: 'q-19',
    topic: 'Kisah Inspiratif',
    difficulty: 'medium',
    question: 'Kisah yang menginspirasi tentang sholat Dhuha berkaitan dengan…',
    options: [
      'Nabi Musa AS membelah laut',
      'Nabi Sulaiman AS dan semut',
      'Rasulullah SAW yang rutin mengerjakan Dhuha dan menganjurkannya kepada umat',
      'Nabi Nuh AS dan bahteranya'
    ],
    correctIndex: 2,
    explanation: 'Rasulullah SAW adalah teladan utama dalam rutinitas Dhuha. Kisah ini bisa menjadi motivasi bahwa Dhuha adalah amalan yang dicintai Allah.'
  },
  {
    id: 'q-20',
    topic: 'Kisah Inspiratif',
    difficulty: 'medium',
    question: 'Salah satu keutamaan sholat Dhuha yang disebutkan dalam hadis adalah…',
    options: [
      'Menjamin masuk surga tanpa hisab',
      'Dicukupkan rezekinya oleh Allah pada hari itu',
      'Menghapus seluruh dosa seumur hidup',
      'Menggantikan puasa Ramadhan'
    ],
    correctIndex: 1,
    explanation: 'Hadis menyebutkan bahwa Allah akan mencukupkan kebutuhan orang yang sholat Dhuha. Ini menjadi motivasi spiritual, bukan jaminan mutlak.'
  }
];

// ==========================================
// BAGIAN B — 20 SOAL PILIHAN GANDA HOTS / LANJUTAN
// ==========================================
export const QUESTION_BANK_B: QuizQuestion[] = [
  // B1. Fiqih Dhuha Analisis & Penerapan (21–27)
  {
    id: 'q-21',
    topic: 'Fiqih Dhuha',
    difficulty: 'hots',
    question: 'Rina bangun jam 06.00, sholat Subuh jam 06.15, lalu berangkat sekolah jam 06.45. Kapan waktu paling tepat ia bisa sholat Dhuha?',
    options: [
      'Jam 06.20, tepat setelah Subuh',
      'Jam 07.00, saat matahari sudah naik',
      'Jam 06.30, sebelum berangkat',
      'Jam 11.30, saat hampir zawal'
    ],
    correctIndex: 1,
    explanation: 'Waktu Dhuha dimulai ±15–20 menit setelah matahari terbit. Jam 06.20 terlalu awal (matahari belum naik). Jam 11.30 masih boleh tapi bukan waktu terbaik.'
  },
  {
    id: 'q-22',
    topic: 'Fiqih Dhuha',
    difficulty: 'hots',
    question: 'Andi ingin sholat Dhuha 8 rakaat, tetapi waktu tersisa hanya 15 menit sebelum bel sekolah. Sikap paling bijak adalah…',
    options: [
      'Memaksakan 8 rakaat meski tergesa-gesa',
      'Sholat 2 rakaat dengan tenang, sisanya nanti jika sempat',
      'Tidak sholat karena tidak cukup waktu',
      'Sholat 8 rakaat sambil melihat jam terus'
    ],
    correctIndex: 1,
    explanation: 'Kualitas (khusyuk) lebih utama dari jumlah. Sholat 2 rakaat tenang lebih baik daripada 8 rakaat tergesa-gesa.'
  },
  {
    id: 'q-23',
    topic: 'Fiqih Dhuha',
    difficulty: 'hots',
    question: 'Seorang siswa sedang sholat Dhuha, lalu adzan Dzuhur berkumandang. Yang sebaiknya dilakukan adalah…',
    options: [
      'Melanjutkan Dhuha sampai selesai',
      'Mempercepat sholat lalu ikut jamaah Dzuhur',
      'Menghentikan Dhuha dan ikut sholat Dzuhur berjamaah',
      'Mengabaikan adzan karena sedang ibadah'
    ],
    correctIndex: 2,
    explanation: 'Sholat wajib berjamaah lebih utama. Sholat sunnah boleh dihentikan untuk sholat wajib. Ini melatih prioritas dalam beribadah.'
  },
  {
    id: 'q-24',
    topic: 'Fiqih Dhuha',
    difficulty: 'hots',
    question: 'Seorang siswi sedang haid. Ia tetap membuka aplikasi dan mengisi status "Udzur". Apa dampak yang seharusnya pada Skor Kesadarannya?',
    options: [
      'Skor turun karena tidak sholat',
      'Skor tetap, karena udzur syar\'i tidak dihitung sebagai pelanggaran',
      'Skor naik karena jujur',
      'Skor tidak dihitung sama sekali'
    ],
    correctIndex: 1,
    explanation: 'Udzur syar\'i (haid, sakit) membuat kewajiban gugur, sehingga tidak boleh menurunkan skor. Ini mengajarkan keadilan dalam penilaian.'
  },
  {
    id: 'q-25',
    topic: 'Fiqih Dhuha',
    difficulty: 'hots',
    question: 'Manakah yang menunjukkan pemahaman paling benar tentang keutamaan sholat Dhuha?',
    options: [
      'Dhuha menjamin seseorang kaya raya',
      'Dhuha adalah sarana memohon rezeki dan syukur, hasilnya Allah yang menentukan',
      'Dhuha menggantikan sholat wajib',
      'Dhuha hanya untuk orang yang sudah kaya'
    ],
    correctIndex: 1,
    explanation: 'Keutamaan Dhuha adalah sarana, bukan jaminan mutlak. Ini melatih pemahaman yang seimbang antara ikhtiar dan tawakal.'
  },
  {
    id: 'q-26',
    topic: 'Fiqih Dhuha',
    difficulty: 'hots',
    question: 'Seorang siswa rutin sholat Dhuha tetapi selalu tergesa-gesa dan tidak membaca doa setelahnya. Berdasarkan indikator aplikasi, ia termasuk…',
    options: [
      'Sadar & Konsisten',
      'Berkembang (konsisten tapi kurang lengkap)',
      'Perlu Pendampingan (tidak konsisten)',
      'Tidak sholat'
    ],
    correctIndex: 1,
    explanation: 'Konsistensi tinggi tapi kelengkapan bacaan rendah → masuk kategori "Berkembang". Ini melatih siswa memahami bahwa kualitas juga penting.'
  },
  {
    id: 'q-27',
    topic: 'Fiqih Dhuha',
    difficulty: 'hots',
    question: 'Mengapa sholat Dhuha tidak dianjurkan dilakukan secara berjamaah seperti sholat wajib?',
    options: [
      'Karena Dhuha bukan ibadah',
      'Karena Dhuha adalah sholat sunnah yang tuntunannya munfarid, berbeda dengan sholat wajib',
      'Karena Dhuha hanya untuk anak-anak',
      'Karena Dhuha tidak ada dalam Islam'
    ],
    correctIndex: 1,
    explanation: 'Perbedaan tuntunan sholat wajib dan sunnah perlu dipahami, bukan sekadar dihafal.'
  },

  // B2. Bacaan & Doa Analisis (28–33)
  {
    id: 'q-28',
    topic: 'Bacaan & Doa',
    difficulty: 'hots',
    surahTag: 'Ad-Dhuha',
    question: 'Mengapa surat Asy-Syams dianjurkan dibaca pada rakaat pertama Dhuha, dan Ad-Dhuha pada rakaat kedua?',
    options: [
      'Karena suratnya pendek',
      'Karena kandungannya relevan dengan waktu dan nikmat Allah, serta sebagai tuntunan yang dicontohkan',
      'Karena tidak ada surat lain',
      'Karena surat itu wajib'
    ],
    correctIndex: 1,
    explanation: 'Asy-Syams menceritakan tentang matahari dan waktu, Ad-Dhuha tentang waktu dhuha dan nikmat. Relevansi makna inilah yang membuatnya dianjurkan.'
  },
  {
    id: 'q-29',
    topic: 'Bacaan & Doa',
    difficulty: 'hots',
    surahTag: 'Doa Dhuha',
    question: 'Seorang siswa membaca doa setelah Dhuha tetapi tidak memahami artinya. Apa yang sebaiknya ia lakukan?',
    options: [
      'Tidak perlu membaca doa lagi',
      'Mempelajari arti doa agar lebih khusyuk dan paham yang diminta',
      'Mengganti doa dengan yang lain',
      'Membaca doa dengan cepat agar selesai'
    ],
    correctIndex: 1,
    explanation: 'Memahami arti doa meningkatkan kekhusyukan. Ini melatih siswa untuk tidak sekadar menghafal.'
  },
  {
    id: 'q-30',
    topic: 'Bacaan & Doa',
    difficulty: 'hots',
    question: 'Manakah urutan yang paling tepat dalam melaksanakan sholat Dhuha?',
    options: [
      'Niat → Takbir → Wudhu → Sholat → Doa',
      'Wudhu → Niat & Takbiratul ihram → Sholat → Doa setelah Dhuha',
      'Doa → Wudhu → Sholat → Niat',
      'Takbir → Wudhu → Niat → Doa'
    ],
    correctIndex: 1,
    explanation: 'Wudhu adalah syarat sah, niat bersamaan takbir, doa setelah sholat. Urutan ini penting untuk kelengkapan ibadah.'
  },
  {
    id: 'q-31',
    topic: 'Bacaan & Doa',
    difficulty: 'hots',
    surahTag: 'Doa Dhuha',
    question: 'Jika seseorang lupa membaca doa setelah Dhuha, apa yang sebaiknya dilakukan?',
    options: [
      'Sholat Dhuha batal',
      'Tetap sah, dan boleh berdoa setelahnya karena doa tidak terikat waktu ketat',
      'Harus mengulang sholat',
      'Tidak boleh berdoa lagi'
    ],
    correctIndex: 1,
    explanation: 'Doa setelah Dhuha adalah sunnah, bukan syarat sah. Sholat tetap sah, dan berdoa bisa dilakukan kapan saja.'
  },
  {
    id: 'q-32',
    topic: 'Bacaan & Doa',
    difficulty: 'hots',
    question: 'Perhatikan pernyataan: "Membaca surat pendek lebih baik daripada surat panjang saat Dhuha." Apakah pernyataan ini benar?',
    options: [
      'Benar, karena surat pendek lebih cepat',
      'Salah, karena yang utama adalah yang dicontohkan (Asy-Syams & Ad-Dhuha) dan dilakukan dengan khusyuk',
      'Benar, karena surat panjang membatalkan sholat',
      'Salah, karena surat pendek tidak sah'
    ],
    correctIndex: 1,
    explanation: 'Yang utama adalah tuntunan dan kekhusyukan, bukan panjang-pendeknya. Ini melatih siswa berpikir kritis terhadap anggapan yang keliru.'
  },
  {
    id: 'q-33',
    topic: 'Bacaan & Doa',
    difficulty: 'hots',
    question: 'Mengapa aplikasi mencatat "surat yang dibaca" dan bukan hanya "sudah baca"?',
    options: [
      'Agar data lebih banyak',
      'Agar guru dan ortu bisa melihat pola minat dan konsistensi bacaan anak',
      'Agar anak dihukum',
      'Agar aplikasi terlihat canggih'
    ],
    correctIndex: 1,
    explanation: 'Data yang detail membantu pemantauan karakter, bukan sekadar formalitas. Ini melatih siswa memahami tujuan pencatatan.'
  },

  // B3. Adab (34–37)
  {
    id: 'q-34',
    topic: 'Adab',
    difficulty: 'hots',
    question: 'Seorang siswa sholat Dhuha di kelas saat guru belum datang, tetapi ia sambil bermain HP. Apa yang salah dari sikapnya?',
    options: [
      'Tidak ada yang salah',
      'Tempat dan sikapnya kurang tepat; sholat seharusnya dilakukan dengan khusyuk dan di tempat yang layak',
      'HP tidak masalah',
      'Sholatnya batal'
    ],
    correctIndex: 1,
    explanation: 'Khusyuk dan tempat yang layak adalah adab sholat. Ini melatih kesadaran adab, bukan hanya gerakan.'
  },
  {
    id: 'q-35',
    topic: 'Adab',
    difficulty: 'hots',
    question: 'Manakah yang mencerminkan adab terbaik saat sholat Dhuha di masjid sekolah?',
    options: [
      'Berbicara dengan teman sambil sholat',
      'Memakai pakaian rapi, berwudhu, dan sholat dengan tenang',
      'Sholat sambil melihat teman',
      'Sholat dengan cepat agar bisa bermain'
    ],
    correctIndex: 1,
    explanation: 'Adab sholat mencakup kebersihan, kerapian, dan ketenangan. Ini melatih siswa menghormati ibadah.'
  },
  {
    id: 'q-36',
    topic: 'Adab',
    difficulty: 'hots',
    question: 'Mengapa sholat Dhuha sebaiknya tidak dilakukan tepat setelah Subuh?',
    options: [
      'Karena dilarang agama',
      'Karena waktu itu masih waktu larangan sholat sunnah, dan Dhuha dimulai setelah matahari naik',
      'Karena tidak ada pahala',
      'Karena terlalu pagi'
    ],
    correctIndex: 1,
    explanation: 'Ada waktu larangan sholat sunnah (setelah Subuh hingga matahari naik). Ini melatih pemahaman fiqih waktu.'
  },
  {
    id: 'q-37',
    topic: 'Adab',
    difficulty: 'hots',
    question: 'Seorang siswa ingin sholat Dhuha, tetapi ia belum berwudhu dan air tidak tersedia. Apa yang sebaiknya dilakukan?',
    options: [
      'Sholat tanpa wudhu',
      'Bertayamum jika memenuhi syarat, atau menunda hingga ada air',
      'Membatalkan niat selamanya',
      'Sholat sambil duduk'
    ],
    correctIndex: 1,
    explanation: 'Tayamum adalah alternatif syar\'i. Ini melatih pemahaman solusi fiqih, bukan menyerah.'
  },

  // B4. Kisah Inspiratif (38–40)
  {
    id: 'q-38',
    topic: 'Kisah Inspiratif',
    difficulty: 'hots',
    question: 'Rasulullah SAW bersabda bahwa sholat Dhuha dapat mencukupi sedekah persendian. Apa makna yang bisa diambil?',
    options: [
      'Dhuha menggantikan sedekah uang',
      'Dhuha adalah bentuk syukur atas nikmat tubuh yang sehat',
      'Dhuha hanya untuk orang kaya',
      'Dhuha tidak ada kaitannya dengan sedekah'
    ],
    correctIndex: 1,
    explanation: 'Setiap persendian punya kewajiban sedekah, dan Dhuha mencukupinya. Ini melatih rasa syukur atas nikmat tubuh.'
  },
  {
    id: 'q-39',
    topic: 'Kisah Inspiratif',
    difficulty: 'hots',
    question: 'Seorang siswa melihat temannya tidak pernah sholat Dhuha. Sikap terbaik sesuai kisah dakwah Rasulullah adalah…',
    options: [
      'Menghina dan menyebarkan ke teman lain',
      'Mengajak dengan lemah lembut dan memberi contoh',
      'Membiarkan saja',
      'Melaporkan ke guru agar dihukum'
    ],
    correctIndex: 1,
    explanation: 'Dakwah Rasulullah selalu lemah lembut. Ini melatih adab mengajak kebaikan, bukan memaksa.'
  },
  {
    id: 'q-40',
    topic: 'Kisah Inspiratif',
    difficulty: 'hots',
    question: 'Apa pelajaran utama dari kisah Rasulullah SAW yang rutin sholat Dhuha meski sudah dijamin surga?',
    options: [
      'Ibadah hanya untuk mendapatkan surga',
      'Ibadah adalah bentuk syukur dan cinta kepada Allah, bukan sekadar transaksi',
      'Ibadah tidak perlu dilakukan jika sudah dijamin',
      'Ibadah hanya untuk nabi'
    ],
    correctIndex: 1,
    explanation: 'Ini inti kesadaran beribadah — bukan karena takut/harap imbalan semata, tapi karena cinta dan syukur. Sangat relevan dengan indikator karakter "keikhlasan".'
  }
];

// ==========================================
// BAGIAN C — 8 SOAL REFLEKTIF KARAKTER (R1–R8)
// ==========================================
export const REFLECTIVE_QUESTIONS: ReflectiveQuestion[] = [
  // C1. Perasaan & Keikhlasan
  {
    id: 'ref-1',
    category: 'Perasaan & Keikhlasan',
    indicator: 'Keikhlasan Beribadah',
    question: 'Setelah sholat Dhuha hari ini, perasaanmu…',
    options: [
      '😊 Senang dan tenang',
      '😐 Biasa saja',
      '😞 Terpaksa / tidak nyaman'
    ]
  },
  {
    id: 'ref-2',
    category: 'Perasaan & Keikhlasan',
    indicator: 'Keterlibatan Emosional dengan Bacaan',
    question: 'Apa yang kamu rasakan saat membaca surat Ad-Dhuha?',
    options: [
      'Tenang dan damai',
      'Bingung artinya',
      'Ingin belajar lebih lanjut artinya',
      'Tidak ada rasa / biasa saja'
    ]
  },

  // C2. Kesadaran & Motivasi Internal
  {
    id: 'ref-3',
    category: 'Kesadaran & Motivasi',
    indicator: 'Rasio Inisiatif & Motivasi Internal',
    question: 'Kenapa kamu sholat Dhuha hari ini?',
    options: [
      'Karena ingin dekat dengan Allah SWT',
      'Karena disuruh guru / orang tua',
      'Karena takut dinilai jelek',
      'Karena ikut-ikutan teman'
    ]
  },
  {
    id: 'ref-4',
    category: 'Kesadaran & Motivasi',
    indicator: 'Kemandirian Beribadah',
    question: 'Jika besok tidak ada yang mengingatkan, apakah kamu tetap sholat Dhuha?',
    options: [
      'Ya, pasti tetap sholat',
      'Mungkin saja',
      'Tidak sholat'
    ]
  },

  // C3. Kemandirian di Rumah
  {
    id: 'ref-5',
    category: 'Kemandirian',
    indicator: 'Kemandirian di Rumah',
    question: 'Di rumah, siapa yang biasanya mengingatkanmu sholat Dhuha?',
    options: [
      'Saya sendiri atas kemauan sendiri',
      'Orang tua (Ayah / Ibu)',
      'Saudara / Kakak / Adik',
      'Tidak ada yang mengingatkan'
    ]
  },

  // C4. Bacaan & Pemahaman
  {
    id: 'ref-6',
    category: 'Bacaan & Pemahaman',
    indicator: 'Pola Minat Bacaan & Refleksi',
    question: 'Surat apa yang paling kamu sukai saat sholat Dhuha hari ini, dan mengapa?',
    isOpenEnded: true,
    options: [
      'Ad-Dhuha (maknanya menyejukkan hati)',
      'Asy-Syams (mengingatkan keagungan matahari)',
      'Al-Insyirah (memberi semangat saat hadapi kesulitan)',
      'Al-Ikhlas (meneguhkan tauhid)',
      'Lainnya (ketik refleksi singkat)'
    ]
  },
  {
    id: 'ref-7',
    category: 'Bacaan & Pemahaman',
    indicator: 'Efektivitas Kuis sebagai Pembelajaran',
    question: 'Apa satu hal baru yang kamu pelajari dari kuis atau ibadah hari ini?',
    isOpenEnded: true,
    options: [
      'Waktu terbaik dan fiqih Dhuha',
      'Makna sedekah 360 persendian tubuh',
      'Tuntunan doa setelah sholat Dhuha',
      'Pentingnya khusyuk dan tidak terburu-buru'
    ]
  },

  // C5. Sosial & Adab
  {
    id: 'ref-8',
    category: 'Sosial & Adab',
    indicator: 'Dampak Sosial Karakter (Kandidat Mentor)',
    question: 'Apakah kamu mengajak teman untuk sholat Dhuha hari ini?',
    options: [
      'Ya, dan ia ikut sholat',
      'Ya, tapi ia belum ikut',
      'Tidak mengajak siapa-siapa'
    ]
  }
];

// Gabungan seluruh soal pilihan ganda untuk backwards compatibility
export const ALL_QUIZ_QUESTIONS = [...QUESTION_BANK_A, ...QUESTION_BANK_B];

