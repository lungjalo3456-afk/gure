# GUREE.ID Creative Studio V1.0.7 (APK-Ready)

Project siap build untuk Android APK menggunakan **Vite + React + Tailwind v4 + Capacitor 7** dan **GitHub Actions**.

## Fitur Perbaikan APK-Ready
- **Multi-API Key Pool (Maks. 5 Key)** tersimpan lokal di IndexedDB dengan rotasi otomatis & cooldown 65 detik saat kena limit (HTTP 429/503).
- **Model Fallback Otomatis:**
  - Teks & Vision: `gemini-3-flash-preview` -> `gemini-2.5-flash` -> `gemini-2.5-flash-lite`
  - Gambar: `gemini-3.1-flash-image` -> `gemini-2.5-flash-image`
- **Dashboard Hero Statis Konsisten** (tanpa auto-render gambar saat aplikasi dibuka).
- **Fix Gemini Vision Analysis** (`handleAnalyzePhotosWithGemini`).
- **Capacitor 7 Native Support:** IndexedDB persistence, safe-area inset layar HP, dan download/share PNG via `@capacitor/filesystem` + `@capacitor/share`.

## Cara Build APK Otomatis di GitHub Actions
1. Ekstrak file `.zip` ini dan push seluruh isinya (termasuk folder tersembunyi `.github/workflows/build-apk.yml`) ke repository GitHub `tiji76959-glitch/guree-id-creative-studio` (bisa di branch baru).
2. Buka tab **Actions** di repository GitHub kamu.
3. Tunggu workflow **Build GUREE.ID Creative Studio APK** selesai (sekitar 3-5 menit).
4. Klik hasil build yang bercentang hijau -> unduh file di bagian **Artifacts** (`GUREE-ID-Creative-Studio-v1.0.7-APK`).
5. Ekstrak dan install `app-debug.apk` di HP Android, lalu tap tombol **Atur API Key** di pojok kanan atas Dashboard.
