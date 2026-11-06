# MufradatKu

Media pembelajaran kosakata Bahasa Arab untuk siswa kelas 4 SD/MI. Proyek ini merupakan **website statis** berbasis React + TypeScript + Vite. Tidak menggunakan backend, akun, maupun database.

## Fitur

- Dashboard berisi ringkasan materi dan progres.
- Enam tema kosakata: buah-buahan, hewan, anggota tubuh, benda di kelas, warna, dan keluarga.
- 48 kosakata dengan tulisan Arab berharakat, transliterasi Latin, arti Indonesia, dan ilustrasi lokal.
- Tombol audio pelafalan melalui Web Speech API (suara Arab bergantung pada dukungan browser/perangkat).
- Halaman belajar per tema dan tombol penanda kata yang sudah dipelajari.
- Flashcard interaktif yang dapat dibalik.
- Kuis pilihan ganda tebak arti, skor, umpan balik, dan nilai terbaik.
- Permainan menjodohkan tulisan Arab dengan arti Bahasa Indonesia.
- Halaman progres per tema.
- LocalStorage untuk menyimpan progres secara lokal di browser.
- Responsif untuk HP, tablet, dan laptop.

## Teknologi

- React 18
- TypeScript
- Vite
- React Router
- Lucide React
- CSS responsif
- Web Speech API
- LocalStorage

## Persyaratan

- Node.js versi 18 atau lebih baru (disarankan versi LTS).
- npm.
- Visual Studio Code (opsional, disarankan).

## Menjalankan di laptop

1. Ekstrak ZIP proyek.
2. Buka folder `mufradatku` di Visual Studio Code.
3. Buka terminal pada folder proyek.
4. Jalankan:

```bash
npm install
npm run dev
```

5. Buka alamat lokal yang muncul di terminal, biasanya `http://localhost:5173`.

## Memeriksa build produksi

```bash
npm run build
npm run preview
```

Hasil build berada di folder `dist`.

## Upload ke GitHub

Buat repository baru di GitHub, lalu jalankan perintah berikut dari terminal folder proyek:

```bash
git init
git add .
git commit -m "Initial commit - MufradatKu"
git branch -M main
git remote add origin https://github.com/USERNAME/mufradatku.git
git push -u origin main
```

Ganti `USERNAME` dengan username GitHub milikmu dan sesuaikan URL repository.

## Deploy ke Vercel

1. Masuk ke https://vercel.com dan login menggunakan GitHub.
2. Pilih **Add New → Project**.
3. Import repository `mufradatku`.
4. Gunakan pengaturan berikut:
   - Framework Preset: **Vite**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. Klik **Deploy**.

File `vercel.json` sudah disertakan untuk mengarahkan route aplikasi ke `index.html`, sehingga halaman seperti `/materi`, `/kuis`, dan `/progres` dapat dibuka langsung.

Setiap push baru ke branch yang terhubung akan memicu deployment baru secara otomatis.

## Struktur folder

```text
mufradatku/
├── public/
│   ├── favicon.svg
│   └── images/
│       └── vocabulary/       # Ilustrasi SVG lokal untuk setiap kosakata
├── src/
│   ├── components/           # Komponen navigasi, kartu, audio, dan statistik
│   ├── context/              # State progres dan penyimpanan LocalStorage
│   ├── data/                 # Data kategori dan kosakata
│   ├── pages/                # Halaman aplikasi
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── styles.css
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── vite.config.ts
└── vercel.json
```

## Mengubah atau menambah kosakata

Edit `src/data/vocabulary.ts`. Setiap kosakata memiliki:
- `id`: identitas unik.
- `categoryId`: id kategori.
- `arabic`: tulisan Arab.
- `latin`: transliterasi.
- `meaning`: arti Bahasa Indonesia.
- `emoji`: simbol visual.
- `image`: lokasi file ilustrasi.

Letakkan ilustrasi baru di `public/images/vocabulary/`, lalu isi properti `image` dengan path yang diawali `/images/...`.

Kategori diatur di `src/data/categories.ts`.

## Catatan audio

Audio menggunakan `window.speechSynthesis` dengan bahasa `ar-SA`. Ketersediaan suara Arab tidak sama pada semua perangkat dan browser. Jika suara Arab tidak tersedia, pasang/aktifkan voice Bahasa Arab pada sistem operasi atau gunakan rekaman MP3 guru sebagai pengembangan berikutnya. Aplikasi tetap dapat digunakan tanpa audio.

## Catatan penyimpanan

Progres tersimpan di LocalStorage browser dengan key `mufradatku-progress-v1`. Data hanya tersedia pada browser dan perangkat yang sama. Menghapus data situs/browser dapat menghapus progres. Tidak ada sinkronisasi antarperangkat karena aplikasi ini memang tidak memakai server/database.

## Catatan materi

Kosakata dan transliterasi dalam proyek merupakan materi awal. Sebelum digunakan secara resmi di kelas, sebaiknya guru Bahasa Arab memeriksa kembali harakat, transliterasi, dan kesesuaian istilah dengan buku ajar yang digunakan sekolah.
