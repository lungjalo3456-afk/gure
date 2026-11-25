import React, { useState, useEffect } from 'react';
import {
  Camera, Film, Sparkles, CheckCircle2, AlertTriangle, Upload, Trash2,
  Copy, Check, Download, RefreshCw, ChevronRight, ChevronLeft, Layers,
  Mic, Sliders, ShieldCheck, Image as ImageIcon, Wand2, Info, Lock,
  Zap, Clapperboard, Aperture, Eye, Home, Play, ArrowRight, Cpu,
  Plus, FolderOpen, FileText, UserCheck, Volume2, MessageSquare,
  Edit3, Share2, X, ShoppingBag, Smartphone, Baby, Footprints, Briefcase, Key
} from 'lucide-react';

// ============================================================================
// DATA KATALOG RESMI GUREE.ID V1.0.7 (7 KATEGORI & 22 SUBKATEGORI + PRESET APC)
// ============================================================================
const CATALOG = [
  {
    id: 'ad-commercial',
    name: 'Ad Commercial',
    shortName: 'Ad Commercial',
    tagline: 'Iklan Terstabil & Fokus Produk',
    icon: ShoppingBag,
    desc: 'Iklan komersial terstabil (slider/gimbal/dolly), fokus produk atau demonstrasi.',
    subcategories: [
      { id: 'product-hero', name: 'Product Hero', needsCharacter: false, characterNote: 'Tanpa model wajah (fokus penuh pada produk & pencahayaan studio)', desc: 'Produk jadi pusat, pantulan & bayangan konsisten, bertumpu nyata, lock produk ketat.' },
      { id: 'cinematic-commercial', name: 'Cinematic Commercial', needsCharacter: false, characterNote: 'Opsional (umumnya fokus lintasan kamera fisik & makro produk)', desc: 'Lintasan kamera fisik (dolly/orbit), cahaya bermotif logis, partikel/cairan patuh gravitasi.' },
      { id: 'demo-produk', name: 'Demo Produk', needsCharacter: false, characterNote: 'Hanya butuh tangan demonstrator (opsional foto referensi tangan)', desc: 'Urutan langkah cara pakai asli seller, sebab-akibat jelas (tekan pump baru keluar).' },
      { id: 'tvc-pro', name: 'Iklan Televisi Profesional', needsCharacter: true, characterNote: 'Disarankan unggah foto talent/model utama', desc: 'Multi-shot dramatis terkontrol, klaim aman ketat, lock produk identik di semua shot.' }
    ],
    hasPresetAPC: true
  },
  {
    id: 'ugc-pov',
    name: 'UGC Produk',
    shortName: 'UGC Produk',
    tagline: 'Organik Smartphone Handheld',
    icon: Smartphone,
    desc: 'Gaya organik smartphone handheld natural dengan goyangan tangan halus.',
    subcategories: [
      { id: 'pov-hand-faceless', name: 'POV Hand Faceless', needsCharacter: false, characterNote: 'Tanpa wajah (sudut pandang mata kreator, hanya tangan & produk)', desc: 'Sudut pandang mata kreator, hanya tangan & produk, push-in fisik, tangan konsisten.' },
      { id: 'mirror-faceless', name: 'Mirror Faceless', needsCharacter: false, characterNote: 'Tanpa wajah (pantulan cermin leher ke bawah / tertutup ponsel)', desc: 'Pantulan cermin leher ke bawah/tertutup ponsel. Teks/logo di cermin terbalik kiri-kanan.' },
      { id: 'pov-selfie', name: 'POV Selfie', needsCharacter: true, characterNote: 'Wajib unggah foto karakter/kreator selfie', desc: 'Kamera depan sejauh lengan (40-60 cm), tatapan sesekali ke lensa, satu tangan pegang produk.' },
      { id: 'mini-vlog', name: 'Mini Vlog', needsCharacter: true, characterNote: 'Wajib unggah foto karakter utama vlog', desc: 'Aktivitas natural, jeda napas, kamera mengikuti langkah (1,2-1,4 m/s), dialog santai.' },
      { id: 'off-camera-conv', name: 'Off-Camera Conversation', needsCharacter: true, characterNote: 'Unggah foto model utama yang merespons', desc: 'Operator tak terlihat di luar frame, model menatap sedikit ke samping lensa merespons natural.' }
    ]
  },
  {
    id: 'ai-virtual-creator',
    name: 'Virtual Creator',
    shortName: 'Virtual Creator',
    tagline: 'Presenter Realistis & Lip-Sync',
    icon: UserCheck,
    desc: 'Presenter AI realistis dengan lip-sync akurat dan gestur natural.',
    subcategories: [
      { id: 'talking-commercial', name: 'Talking Commercial', needsCharacter: true, characterNote: 'Wajib unggah foto presenter AI untuk lip-sync', desc: 'Wajah jelas, lip-sync presisi, handheld halus, gestur menunjuk produk saat disebut.' },
      { id: 'product-review', name: 'Product Review', needsCharacter: true, characterNote: 'Wajib unggah foto presenter reviewer', desc: 'Talking commercial + demonstrasi memegang & memutar sisi produk sesuai poin ulasan.' }
    ]
  },
  {
    id: 'fashion-anak',
    name: 'Fashion Anak',
    shortName: 'Fashion Anak',
    tagline: 'Ramah Usia & Proporsi Natural',
    icon: Baby,
    desc: 'Konten ramah usia, fokus pada pakaian, proporsi anak sesuai usia, tanpa data pribadi.',
    subcategories: [
      { id: 'natural-mom-cam', name: 'Natural Mom Cam', needsCharacter: true, characterNote: 'Unggah foto model anak (proporsi usia realistis)', desc: 'Kamera dipegang orang tua, framing spontan, anak aktif natural, VO oleh orang tua.' },
      { id: 'fashion-try-on-anak', name: 'Fashion Try-On', needsCharacter: true, characterNote: 'Unggah foto model anak untuk try-on pakaian', desc: 'Pakaian pas ukuran anak, gerak aman natural, ganti baju via hard cut (bukan magic).' }
    ]
  },
  {
    id: 'fashion-dewasa',
    name: 'Fashion Wanita/Pria',
    shortName: 'Fashion Wanita/Pria',
    tagline: 'Lookbook, Fit & Drape Kain',
    icon: Layers,
    desc: 'Detail potongan, motif, jahitan, dan jatuhnya kain mengikuti gravitasi.',
    subcategories: [
      { id: 'ootd', name: 'OOTD', needsCharacter: true, characterNote: 'Wajib unggah foto model OOTD', desc: 'Framing bergantian head-to-toe, medium, & detail; kain bergerak tertinggal natural.' },
      { id: 'try-on-dewasa', name: 'Try-On', needsCharacter: true, characterNote: 'Wajib unggah foto model untuk konsistensi wajah & rambut', desc: 'Perpindahan busana via hard cut/keluar-masuk frame, fit realistis, rambut/aksesori tetap.' },
      { id: 'mirror-fashion', name: 'Mirror Fashion', needsCharacter: true, characterNote: 'Unggah foto model mirror selfie', desc: 'Wajah & busana terlihat di cermin, teks di baju terbalik di pantulan, pose natural.' }
    ]
  },
  {
    id: 'sepatu-sandal',
    name: 'Sepatu & Sandal',
    shortName: 'Sepatu & Sandal',
    tagline: 'Pasangan Kiri-Kanan & Makro Sol',
    icon: Footprints,
    desc: 'Fokus pasangan kiri-kanan identik, anatomi tangan/kaki, serta tekstur sol & jahitan.',
    subcategories: [
      { id: 'pov-hand-sepatu', name: 'POV Hand Product', needsCharacter: false, characterNote: 'Tanpa wajah (fokus tangan memegang sepatu/sandal)', desc: 'Tangan memegang sepatu/sandal sudut POV, dolly-in fisik, pasangan tetap ada.' },
      { id: 'try-on-sepatu', name: 'Try-On', needsCharacter: false, characterNote: 'Opsional (fokus kaki & langkah rendah tumit-telapak-ujung kaki)', desc: 'Kaki kiri-kanan benar, langkah tumit-telapak-ujung kaki, sol menekuk di depan, sudut rendah.' },
      { id: 'detail-produk-sepatu', name: 'Detail Produk', needsCharacter: false, characterNote: 'Tanpa karakter (makro sol, jahitan & tekstur bahan)', desc: 'Makro lensa ponsel, DoF tipis, fokus jahitan/sol/tekstur, cahaya samping.' }
    ]
  },
  {
    id: 'bapak-ai',
    name: 'Bapak AI & Lifestyle',
    shortName: 'Bapak AI',
    tagline: 'Karakter Lokal & Humor Hangat',
    icon: Briefcase,
    desc: 'Karakter bapak-bapak khas Indonesia dengan energi, usia, dan logat sesuai referensi.',
    subcategories: [
      { id: 'talking-bapak', name: 'Talking Bapak AI', needsCharacter: true, characterNote: 'Wajib unggah foto karakter Bapak AI', desc: 'Lip-sync natural, ekspresi hangat & berwibawa santai, gerak tenang sesuai usia.' },
      { id: 'ootd-bapak', name: 'OOTD Bapak AI', needsCharacter: true, characterNote: 'Wajib unggah foto karakter Bapak AI', desc: 'Pakaian pria dewasa/tua, pose khas bapak-bapak, humor ringan, kain jatuh natural.' },
      { id: 'komedi-bapak', name: 'Komedi Bapak AI', needsCharacter: true, characterNote: 'Wajib unggah foto karakter Bapak AI', desc: 'Struktur setup -> jeda singkat -> punchline, ekspresi ekspresif namun fisika tetap wajar.' }
    ]
  }
];

// ATURAN PRODUKSI SPESIFIK PER SUB-KATEGORI (DIKUNCI SEJAK KONSEP HINGGA PROMPT FINAL)
const SUBCATEGORY_DIRECTIVES = {
  'product-hero': 'ATURAN SUBKATEGORI PRODUCT HERO: Fokus penuh pada produk sebagai bintang utama di atas permukaan nyata dengan pantulan & bayangan konsisten. Tanpa model manusia. Kamera terstabil (slider/tripod) dengan pencahayaan studio terarah.',
  'cinematic-commercial': 'ATURAN SUBKATEGORI CINEMATIC COMMERCIAL: Gunakan lintasan kamera fisik bermotif jelas (dolly-in/orbit lembut 15-30 derajat), pencahayaan dramatis berlapis, dan gerakan elemen fisik (tetesan/tekstur) yang tunduk pada gravitasi nyata 1x.',
  'demo-produk': 'ATURAN SUBKATEGORI DEMO PRODUK: Wajib menampilkan urutan sebab-akibat cara pakai asli seller secara bertahap (misal buka tutup -> tekan pump/oles -> hasil tekstur nyata). Fokus tangan demonstrator & produk.',
  'tvc-pro': 'ATURAN SUBKATEGORI TVC PROFESIONAL: Struktur iklan multi-shot dramatis dengan talent utama yang berinteraksi natural dengan produk, transisi antar shot rapi, dan penguncian visual produk identik di setiap adegan.',
  'pov-hand-faceless': 'ATURAN SUBKATEGORI POV HAND FACELESS: Sudut pandang orang pertama (mata kreator). DILARANG menampilkan wajah atau kepala. Hanya tangan kreator yang memegang, memutar, atau mengaplikasikan produk dengan push-in fisik ponsel.',
  'mirror-faceless': 'ATURAN SUBKATEGORI MIRROR FACELESS: Pengambilan gambar wajib melalui pantulan cermin (framing leher ke bawah atau wajah tertutup ponsel). Seluruh teks/logo produk dan baju di dalam pantulan cermin WAJIB terbalik kiri-kanan (mirrored).',
  'pov-selfie': 'ATURAN SUBKATEGORI POV SELFIE: Kamera depan ponsel sejauh lengan (40-60 cm), kreator menatap lensa dengan micro-shake tangan natural, satu tangan memegang/menunjukkan produk di dekat wajah.',
  'mini-vlog': 'ATURAN SUBKATEGORI MINI VLOG: Alur keseharian natural (bangun pagi/bersiap/aktivitas), ada jeda napas alami, kamera mengikuti langkah kreator secara organik saat menggunakan produk.',
  'off-camera-conv': 'ATURAN SUBKATEGORI OFF-CAMERA CONVERSATION: Ada penanya di luar frame (operator tak terlihat), talent menatap sedikit ke samping lensa (bukan menatap kamera langsung) sambil menjawab santai dan menunjukkan produk.',
  'talking-commercial': 'ATURAN SUBKATEGORI TALKING COMMERCIAL: Presenter menghadap kamera dengan lip-sync akurat mengikuti naskah verbatim, gestur tangan menunjuk/memperlihatkan kemasan produk tepat saat manfaat disebut.',
  'product-review': 'ATURAN SUBKATEGORI PRODUCT REVIEW: Format ulasan jujur menghadap kamera sambil memutar sisi kemasan produk, memperlihatkan tekstur/detail isi produk secara langsung kepada penonton.',
  'natural-mom-cam': 'ATURAN SUBKATEGORI NATURAL MOM CAM (FASHION ANAK): Kamera dipegang orang tua (sudut sedikit dari atas/sejajar anak), anak bergerak aktif & ceria secara natural. Naskah VO WAJIB sudut pandang orang tua yang menceritakan pakaian anaknya.',
  'fashion-try-on-anak': 'ATURAN SUBKATEGORI FASHION TRY-ON ANAK: Fokus pada potongan, kenyamanan, dan jatuhnya pakaian di tubuh anak sesuai proporsi usia. Perpindahan baju wajib via hard cut (tanpa transisi sulap).',
  'ootd': 'ATURAN SUBKATEGORI OOTD DEWASA: Pergantian framing dari head-to-toe (seluruh badan), medium shot, hingga close-up serat/jahitan kain. Kain bergerak tertinggal mengikuti gravitasi saat model berputar/melangkah.',
  'try-on-dewasa': 'ATURAN SUBKATEGORI TRY-ON DEWASA: Fokus pada fit pakaian di badan, kerah, lengan, dan jatuh bahan. Ganti outfit wajib menggunakan hard cut atau keluar-masuk frame dengan wajah & rambut tetap konsisten.',
  'mirror-fashion': 'ATURAN SUBKATEGORI MIRROR FASHION: Model berdiri di depan cermin penuh/setengah badan memegang ponsel untuk merekam OOTD. Wajah & busana terlihat di cermin, teks/logo di pakaian terbalik kiri-kanan di pantulan.',
  'pov-hand-sepatu': 'ATURAN SUBKATEGORI POV HAND SEPATU/SANDAL: Tangan kreator memegang dan memutar sepatu/sandal dari sudut pandang mata, memperlihatkan bagian atas, samping, dan sol bawah dengan pasangan kiri-kanan tetap konsisten.',
  'try-on-sepatu': 'ATURAN SUBKATEGORI TRY-ON SEPATU/SANDAL: Sudut kamera rendah (low-angle) fokus pada kaki kiri dan kanan yang memakai sepatu/sandal, langkah kaki realistis (tumit -> telapak -> ujung kaki) dengan sol depan menekuk wajar.',
  'detail-produk-sepatu': 'ATURAN SUBKATEGORI DETAIL PRODUK SEPATU/SANDAL: Pengambilan gambar makro jarak dekat (5-15 cm) dengan pencahayaan samping untuk menonjolkan tekstur bahan, kerapian jahitan, logo, dan pola tapak sol tanpa model.',
  'talking-bapak': 'ATURAN SUBKATEGORI TALKING BAPAK AI: Karakter bapak-bapak khas Indonesia berbicara santai menghadap kamera dengan lip-sync akurat, gestur tangan tenang & berwibawa santai sesuai usia.',
  'ootd-bapak': 'ATURAN SUBKATEGORI OOTD BAPAK AI: Menampilkan gaya berpakaian pria dewasa/bapak-bapak Indonesia dengan pose khas yang natural, lipatan kain realistis, dan pembawaan hangat.',
  'komedi-bapak': 'ATURAN SUBKATEGORI KOMEDI BAPAK AI: Wajib mengikuti struktur komedi 3 babak: Setup situasi sehari-hari -> Jeda reaksi singkat -> Punchline ringan khas bapak-bapak, sambil tetap menjaga fisika dan produk asli.'
};

const EDITING_MODES = [
  { id: 'none', name: 'Tanpa Editing', desc: 'Video murni tanpa teks/stiker tambahan; hormati teks kemasan asli.' },
  { id: 'auto', name: 'Kreatif Otomatis', desc: 'Rekomendasi stiker, tipografi, grafik & CTA selaras dengan konsep & VO.' },
  { id: 'custom', name: 'Editing Custom', desc: 'Pilih modul editing & pustaka style visual secara spesifik.' }
];

const EDITING_MODULES = [
  { id: 'text-overlay', name: 'Text Overlay & Kinetic Typography' },
  { id: 'stickers', name: 'Stiker Animasi (Sparkle / Keranjang)' },
  { id: 'graphic-overlay', name: 'Graphic Overlay & Callout Spesifikasi' },
  { id: 'cta-overlay', name: 'CTA Overlay & End Card' },
  { id: 'vfx', name: 'Visual Effects Pop-in / Slide' }
];

const STYLE_LIBRARY = [
  { id: 'soft-beauty', name: 'Native TikTok / Soft Beauty' },
  { id: 'comic-sticker', name: 'Playful Comic Sticker-Cut' },
  { id: 'hand-drawn', name: 'Hand-Drawn Fashion' },
  { id: 'clean-commercial', name: 'Clean Premium Commercial' },
  { id: 'minimal', name: 'Minimal / No Decor' }
];

const MASTER_SYSTEM_RULES = `
Kamu adalah GUREE.ID Creative Director (V1.0.7) khusus pembuatan video realistis produk TikTok Shop untuk Google Flow Omni Flash.
Bahasa: Indonesia santai profesional dan hangat.
ATURAN MUTLAK (ADDENDUM BERBASIS ILMU):
1. FOTO SELLER ASLI = OTORITAS TERTINGGI. Dilarang mengarang dimensi, berat, bahan, warna, logo, atau fitur yang tidak ada di data/foto seller.
2. KAMERA FISIK: Tidak ada gerak kamera tanpa pemicu (aksi atau kata kunci VO). Push-in/push-out adalah gerak kamera fisik yang menghasilkan paralaks, DILARANG digital zoom, scaling, atau Ken Burns. Jarak close-up ponsel 15-25 cm (kecuali makro sepatu/sandal). Default handheld dengan micro-shake natural (kecuali Ad Commercial yang terstabil gimbal/slider). Operator & ponsel tidak terlihat (kecuali Mirror Faceless/Fashion, di mana teks di cermin terbalik kiri-kanan).
3. FISIKA & ANGGARAN WAKTU: Gravitasi nyata, benda bertumpu, real-time 1x (DILARANG slow motion / kata "slowly"). Rumus waktu per adegan: total durasi aksi + jeda napas 0,5 detik <= durasi adegan - 1 detik cadangan. Maksimal 1 aksi utama per adegan.
4. SKALA NYATA: Selalu bandingkan dimensi produk (cm) dengan telapak tangan dewasa (panjang 17-19 cm, lebar 8-9 cm) atau kaki dewasa (25-28 cm).
5. PAKAIAN & TRANSISI: Kain jatuh mengikuti gravitasi. Ganti baju wajib via hard cut atau keluar-masuk frame, tidak ada transformasi ajaib.
6. AUDIO ENGINE V1.2: Kecepatan bicara normal 2,5-3 kata/detik, bisik 2-2,5 kata/detik. Target dominansi persepsi VO : (Musik + SFX) = 2 : 1. Tiga lapisan eksplisit: Musik, SFX, VO verbatim.
7. ANTI SALAH TAFSIR PROMPT: Satu nama tetap per benda/orang, tanpa rujukan silang ("seperti tadi"), nilai konkret (cm, derajat), kalimat positif di adegan & larangan hanya di NEGATIVE CONSTRAINTS, TANPA timestamp di adegan.
8. PENGECEKAN INTERNAL DIAM-DIAM: Jangan tampilkan tabel hitung-hitungan atau label internal ke user, tampilkan hasil jadinya saja yang sudah lolos audit.
`;

// ============================================================================
// PERSISTENCE HELPER: INDEXEDDB (AMAN UNTUK CAPACITOR 7 & DATA BESAR)
// ============================================================================
const IDB_NAME = 'guree_studio_db_v1';
const IDB_STORE = 'kv_store';

function openGureeDB() {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB unavailable'));
      return;
    }
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) {
        db.createObjectStore(IDB_STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function idbGet(key, fallbackValue = null) {
  try {
    const db = await openGureeDB();
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, 'readonly');
      const req = tx.objectStore(IDB_STORE).get(key);
      req.onsuccess = () => resolve(req.result !== undefined ? req.result : fallbackValue);
      req.onerror = () => reject(req.error);
    });
  } catch {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallbackValue;
    } catch {
      return fallbackValue;
    }
  }
}

async function idbSet(key, value) {
  try {
    const db = await openGureeDB();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(IDB_STORE, 'readwrite');
      tx.objectStore(IDB_STORE).put(value, key);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore storage quota errors
    }
  }
}

// ============================================================================
// HELPER API CALLS: MULTI-KEY ROTATION + COOLDOWN + MODEL FALLBACK (ANTI-LIMIT)
// ============================================================================
const API_KEYS_STORAGE_KEY = 'guree_api_keys_v1';

const TEXT_MODEL_FALLBACK_CHAIN = [
  'gemini-3-flash-preview',
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite'
];

const IMAGE_MODEL_FALLBACK_CHAIN = [
  'gemini-3.1-flash-image',
  'gemini-2.5-flash-image'
];

const keyCooldowns = new Map();
const COOLDOWN_MS = 65 * 1000; // 65 detik istirahat saat kena 429/503

async function getActiveApiKeys() {
  const keys = await idbGet(API_KEYS_STORAGE_KEY, []);
  if (Array.isArray(keys) && keys.length > 0) {
    return keys.map((k) => String(k).trim()).filter(Boolean);
  }
  try {
    const lsRaw = localStorage.getItem(API_KEYS_STORAGE_KEY);
    if (lsRaw) {
      const parsed = JSON.parse(lsRaw);
      if (Array.isArray(parsed)) return parsed.map((k) => String(k).trim()).filter(Boolean);
    }
  } catch {
    // ignore
  }
  return [];
}

function maskApiKey(key) {
  if (!key || key.length < 10) return '••••••••';
  return `${key.slice(0, 6)}••••••${key.slice(-4)}`;
}

async function callGeminiWithFallback({ modelChain, payloadBuilder }) {
  const apiKeys = await getActiveApiKeys();
  if (apiKeys.length === 0) {
    throw new Error(
      'API Key Gemini belum diatur. Tap tombol "API Key" di Dashboard untuk memasukkan API Key dari Google AI Studio.'
    );
  }

  let lastError = null;

  for (const model of modelChain) {
    let modelNotFound = false;

    for (const apiKey of apiKeys) {
      const slotId = `${apiKey}_${model}`;
      const now = Date.now();
      const cooldownUntil = keyCooldowns.get(slotId) || 0;

      if (now < cooldownUntil) continue;

      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey)}`;
      const payload = payloadBuilder(model);

      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          const data = await response.json();
          return { data, usedModel: model };
        }

        const errText = await response.text().catch(() => '');

        // 429 Rate Limit atau 503 Server Sibuk -> cooldown key+model ini, rotasi ke jalur berikutnya
        if (response.status === 429 || response.status === 503) {
          keyCooldowns.set(slotId, Date.now() + COOLDOWN_MS);
          lastError = new Error(`Limit/Sibuk (HTTP ${response.status}) pada ${model}`);
          continue;
        }

        // 404 Model tidak tersedia -> langsung pindah ke model fallback berikutnya
        if (response.status === 404) {
          modelNotFound = true;
          lastError = new Error(`Model ${model} tidak tersedia (HTTP 404)`);
          break;
        }

        // 400/403 API Key bermasalah -> skip key ini untuk sesi ini
        if (response.status === 400 || response.status === 403) {
          if (errText.toLowerCase().includes('api key') || errText.toLowerCase().includes('permission')) {
            keyCooldowns.set(slotId, Date.now() + 24 * 60 * 60 * 1000);
            lastError = new Error(`API Key tidak valid atau dibatasi (HTTP ${response.status})`);
            continue;
          }
          // Jika model tertentu menolak parameter tertentu (misal thinkingConfig), coba fallback model
          if (errText.toLowerCase().includes('thinking') || errText.toLowerCase().includes('unsupported')) {
            modelNotFound = true;
            lastError = new Error(`Model ${model} menolak konfigurasi (${response.status})`);
            break;
          }
          throw new Error(`HTTP ${response.status}: ${errText.slice(0, 180)}`);
        }

        if (response.status >= 500) {
          keyCooldowns.set(slotId, Date.now() + COOLDOWN_MS);
          lastError = new Error(`Server Error HTTP ${response.status} pada ${model}`);
          continue;
        }

        throw new Error(`HTTP ${response.status}: ${errText.slice(0, 180)}`);
      } catch (err) {
        if (err?.name === 'TypeError' && String(err.message).toLowerCase().includes('fetch')) {
          throw new Error('Koneksi internet bermasalah. Cek jaringan HP kamu.');
        }
        lastError = err;
        // Jika error fatal selain limit/network, lempar langsung
        if (!String(err.message).includes('HTTP')) throw err;
      }
    }

    if (modelNotFound) continue;
  }

  throw new Error(
    `Semua API Key & model cadangan sedang kena limit. Tunggu ±1 menit lalu coba lagi. (${lastError?.message || 'Rate Limit'})`
  );
}

function safeParseJsonText(rawText) {
  if (!rawText) throw new Error("Respons teks dari Gemini kosong.");
  const cleaned = rawText
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();
  return JSON.parse(cleaned);
}

async function generateGeminiText({ userPrompt, systemInstruction = MASTER_SYSTEM_RULES, images = [], responseSchema = null }) {
  const parts = [{ text: userPrompt }];
  images.forEach((img) => {
    if (img?.base64 && img?.mimeType) {
      parts.push({
        inlineData: {
          mimeType: img.mimeType,
          data: img.base64
        }
      });
    }
  });

  const { data: result } = await callGeminiWithFallback({
    modelChain: TEXT_MODEL_FALLBACK_CHAIN,
    payloadBuilder: (model) => {
      const payload = {
        contents: [{ role: 'user', parts }],
        systemInstruction: {
          parts: [{ text: systemInstruction }]
        },
        generationConfig: {
          temperature: 0.85
        }
      };

      // Hanya kirim thinkingConfig untuk model yang mendukungnya
      if (model.includes('gemini-3') || model.includes('gemini-2.5')) {
        payload.generationConfig.thinkingConfig = { thinkingBudget: 0 };
      }

      if (responseSchema) {
        payload.generationConfig.responseMimeType = "application/json";
        payload.generationConfig.responseSchema = responseSchema;
      }
      return payload;
    }
  });

  const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Respons teks dari Gemini kosong.");
  return responseSchema ? safeParseJsonText(text) : text;
}

async function generateGeminiImage({ prompt, referenceImages = [], aspectRatio = "9:16" }) {
  const parts = [{ text: prompt }];
  referenceImages.forEach((img) => {
    if (img?.base64 && img?.mimeType) {
      parts.push({
        inlineData: {
          mimeType: img.mimeType,
          data: img.base64
        }
      });
    }
  });

  const validRatios = ["1:1", "3:4", "4:3", "9:16", "16:9"];
  const safeRatio = validRatios.includes(aspectRatio) ? aspectRatio : "9:16";

  const { data: result } = await callGeminiWithFallback({
    modelChain: IMAGE_MODEL_FALLBACK_CHAIN,
    payloadBuilder: () => ({
      contents: [{ role: 'user', parts }],
      generationConfig: {
        responseModalities: ['IMAGE'],
        imageConfig: { aspectRatio: safeRatio }
      }
    })
  });

  const imagePart = result?.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
  if (!imagePart?.inlineData?.data) {
    throw new Error("Gagal merender gambar referensi. Coba ulangi atau sesuaikan prompt.");
  }
  return `data:${imagePart.inlineData.mimeType || 'image/png'};base64,${imagePart.inlineData.data}`;
}

// ============================================================================
// KOMPONEN DEKORASI DAUN BOTANICAL & HEADER HALAMAN (WARM EDITORIAL THEME)
// ============================================================================
function BotanicalAccent({ className = "" }) {
  return (
    <svg
      viewBox="0 0 80 80"
      className={`pointer-events-none select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 68C22 44 42 26 68 14C56 40 38 58 12 68Z"
        fill="#7C9A6D"
        fillOpacity="0.28"
      />
      <path
        d="M12 68C32 48 50 32 68 14"
        stroke="#5D7B52"
        strokeOpacity="0.45"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M34 72C42 56 54 44 74 36C66 54 54 66 34 72Z"
        fill="#A3B994"
        fillOpacity="0.32"
      />
    </svg>
  );
}

function StudioBackgroundPattern() {
  return (
    <div
      className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden"
      style={{
        backgroundImage:
          'radial-gradient(#C8BEA8 1px, transparent 1px), radial-gradient(#DED5C0 0.75px, #FAF6EE 0.75px)',
        backgroundSize: '24px 24px',
        backgroundPosition: '0 0, 12px 12px'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6EE]/65 via-transparent to-[#F2EAD8]/75" />
      <BotanicalAccent className="w-36 h-36 absolute -top-6 -left-6 rotate-90 opacity-60" />
      <BotanicalAccent className="w-40 h-40 absolute top-1/3 -right-10 -rotate-12 opacity-50" />
      <BotanicalAccent className="w-36 h-36 absolute bottom-8 -left-8 rotate-45 opacity-55" />
      <svg
        viewBox="0 0 120 120"
        className="w-28 h-28 absolute bottom-20 right-4 opacity-[0.12] text-[#5D7B52]"
        fill="none"
      >
        <rect x="18" y="28" width="84" height="64" rx="12" stroke="currentColor" strokeWidth="3" />
        <path d="M18 46H102" stroke="currentColor" strokeWidth="3" />
        <path d="M34 28L46 46M58 28L70 46M82 28L94 46" stroke="currentColor" strokeWidth="3" />
        <circle cx="60" cy="69" r="10" stroke="currentColor" strokeWidth="3" />
      </svg>
    </div>
  );
}

function ChatBubbleCard({ sender = "Sutradara GUREE", roleTag, tone = "studio", children, className = "" }) {
  const isSage = tone === "sage";
  const isDark = tone === "dark";
  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center gap-2 mb-1.5 px-1">
        <span
          className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black shadow-xs ${
            isSage
              ? 'bg-[#5D7B52] text-white'
              : isDark
              ? 'bg-[#2C2A25] text-[#FAF6EE]'
              : 'bg-[#D97336] text-white'
          }`}
        >
          🗨️
        </span>
        <span className="text-[11px] font-extrabold text-[#3E3B33] tracking-tight">
          {sender}
        </span>
        {roleTag && (
          <span className="px-2 py-0.5 rounded-full bg-white/90 border border-[#E2D9C5] text-[10px] font-bold text-[#5D7B52]">
            {roleTag}
          </span>
        )}
      </div>
      <div
        className={`relative rounded-3xl rounded-tl-md p-4 sm:p-5 border shadow-sm transition ${
          isSage
            ? 'bg-[#EEF3EC]/95 border-[#C7D6BE]'
            : isDark
            ? 'bg-[#3D5934] border-[#2E4627] text-white'
            : 'bg-white/95 border-[#E5DEC9]'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function EditorialTopHeader({ stepNum, title, subtitle, onBack, rightBadge }) {
  return (
    <div className="relative pt-4 pb-3 px-4 sm:px-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between gap-2 mb-2">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/90 hover:bg-white border border-[#E5DEC9] shadow-sm flex items-center justify-center text-[#2C2A25] active:scale-95 transition"
          aria-label="Kembali"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {rightBadge && (
          <span className="px-3 py-1 rounded-full bg-[#E9EFE4] border border-[#C8D6BE] text-[#4A683F] text-xs font-bold">
            {rightBadge}
          </span>
        )}
      </div>

      <div className="pr-8">
        <h1 className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-[#2C2A25] leading-tight">
          {stepNum && <span className="text-[#D97336] mr-1.5">{stepNum}</span>}
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs sm:text-sm text-[#6E6A5F] mt-1 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      <BotanicalAccent className="w-14 h-14 absolute top-2 right-2 opacity-80" />
    </div>
  );
}

function AutoGrowTextarea({ value, onChange, placeholder, className = "", minRows = 1 }) {
  const ref = React.useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={ref}
      rows={minRows}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`resize-none overflow-hidden break-words whitespace-pre-wrap ${className}`}
    />
  );
}

function StepNavigatorBar({ currentPage, maxUnlockedPage, onNavigate }) {
  const steps = [
    { page: 1, label: 'Setup' },
    { page: 2, label: '01 Produk' },
    { page: 3, label: '02 Konsep' },
    { page: 4, label: '03 Audio' },
    { page: 5, label: '04 Board' },
    { page: 6, label: '05 Visual' },
    { page: 7, label: '06 Prompt' }
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-3">
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar">
        {steps.map((st) => {
          const isCurrent = currentPage === st.page;
          const isUnlocked = st.page <= maxUnlockedPage;
          return (
            <button
              key={st.page}
              onClick={() => isUnlocked && onNavigate(st.page)}
              disabled={!isUnlocked}
              className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold whitespace-nowrap border transition ${
                isCurrent
                  ? 'bg-[#D97336] text-white border-[#D97336] shadow-xs'
                  : isUnlocked
                  ? 'bg-white text-[#2C2A25] border-[#E5DEC9] hover:border-[#5D7B52]'
                  : 'bg-[#F3EDE0]/60 text-[#ACA596] border-transparent cursor-not-allowed'
              }`}
            >
              {st.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================================
// KOMPONEN UTAMA APLIKASI (GUREE.ID CREATIVE STUDIO — WARM EDITORIAL UI)
// ============================================================================
export default function App() {
  // Multi-screen flow:
  // 0: Dashboard Utama ('GUREE.ID Creative Studio')
  // 1: Buat Proyek Baru (Nama Proyek, Preset Brand, Kategori, Sub-kategori, Durasi, Rasio, Editing)
  // 2: 01. Data Produk (4 Kartu Aset, Upload Foto, Analisa Gemini Vision, Kartu Produk Utama)
  // 3: 02. Konsep Kreatif (5 Konsep AI + Pilihan Kartu)
  // 4: 03. Naskah & Audio (Mode VO/Dialog/ASMR/Silent, Alternatif 01/02/03, Quote Card, ACC & Kunci)
  // 5: 04. Storyboard (Tab Video 01/02/..., Shot Cards Kamera & Ekspresi, Audit Fisika, ACC Storyboard)
  // 6: 05. Referensi Visual (Master Visual Reference + Product DNA Direct Image Generator + Galeri)
  // 7: 06. Prompt Studio (01 Prompt Gambar Visual, 02 Product DNA, 03 Prompt Video Final + Salin Semua & Ekspor)
  const [page, setPage] = useState(0);

  // Modals on Dashboard
  const [showGeminiModal, setShowGeminiModal] = useState(false);
  const [showProjectsModal, setShowProjectsModal] = useState(false);

  // Saved Projects & Multi-API Keys (IndexedDB)
  const [savedProjects, setSavedProjects] = useState([]);
  const [apiKeys, setApiKeys] = useState([]);
  const [newApiKeyInput, setNewApiKeyInput] = useState('');

  // Project Identity & Setup (Page 1)
  const [projectName, setProjectName] = useState('');
  const [presetBrand, setPresetBrand] = useState('GUREE.ID');
  const [selectedCategory, setSelectedCategory] = useState(CATALOG[1]); // Default UGC Produk
  const [selectedSubcategory, setSelectedSubcategory] = useState(CATALOG[1].subcategories[0]);
  const [usePresetAPC, setUsePresetAPC] = useState(false);

  const [videoSpecs, setVideoSpecs] = useState({
    clipCount: 1,
    durationPerClip: 10,
    aspectRatio: '9:16',
    editingMode: 'auto',
    customModules: ['text-overlay', 'cta-overlay'],
    styleLibrary: 'soft-beauty'
  });

  const totalVideoDuration = videoSpecs.clipCount * videoSpecs.durationPerClip;

  // Page 2: Asset Ingest & Factual Product Data
  const [activeAssetTab, setActiveAssetTab] = useState('produk'); // 'produk' | 'karakter' | 'lingkungan' | 'referensi'
  const [productPhotos, setProductPhotos] = useState([]);
  const [characterPhotos, setCharacterPhotos] = useState([]);
  const [environmentPhotos, setEnvironmentPhotos] = useState([]);
  const [extraVisualRefs, setExtraVisualRefs] = useState([]);
  const [loadingVisionAnalysis, setLoadingVisionAnalysis] = useState(false);

  const [productData, setProductData] = useState({
    brandName: '',
    productTitle: '',
    sizeVariant: '',
    materialTexture: '',
    colorLighting: '',
    logoVerbatim: '',
    hardwareMechanism: '',
    validClaims: '',
    characterProfile: '',
    environmentProfile: ''
  });

  // Page 3: 02. Konsep Kreatif
  const [concepts, setConcepts] = useState([]);
  const [selectedConceptId, setSelectedConceptId] = useState(null);
  const [conceptRevisionNote, setConceptRevisionNote] = useState('');
  const [loadingConcepts, setLoadingConcepts] = useState(false);

  // Page 4: 03. Naskah & Audio (3 Alternatif)
  const [audioConfig, setAudioConfig] = useState({
    mode: 'VO', // 'VO' | 'Dialog' | 'ASMR' | 'Silent'
    activeAltIndex: 0,
    alternatives: ['', '', ''],
    isEditingScript: false,
    musicMood: 'Instrumental upbeat ringan kontinu (rasio dominansi VO : Musik+SFX = 2:1)',
    sfxNotes: 'Suara buka kemasan, sentuhan tangan natural, dan bunyi mekanisme produk'
  });
  const [loadingScript, setLoadingScript] = useState(false);

  // Page 5: 04. Storyboard
  const [activeVideoTab, setActiveVideoTab] = useState(0);
  const [storyboard, setStoryboard] = useState(null);
  const [loadingStoryboard, setLoadingStoryboard] = useState(false);

  // Page 6: 05. Referensi Visual & Page 7: 06. Prompt Studio
  const [finalOutput, setFinalOutput] = useState(null);
  const [loadingFinal, setLoadingFinal] = useState(false);
  const [dnaImagePrompt, setDnaImagePrompt] = useState('');
  const [dnaImageUrl, setDnaImageUrl] = useState(null);
  const [loadingDnaImage, setLoadingDnaImage] = useState(false);
  const [masterImagePrompt, setMasterImagePrompt] = useState('');
  const [masterImageUrl, setMasterImageUrl] = useState(null);
  const [loadingMasterImage, setLoadingMasterImage] = useState(false);
  const [activeProjectId, setActiveProjectId] = useState(() => `${Date.now()}`);

  // Toast & Clipboard feedback
  const [notification, setNotification] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);

  const notify = (msg, type = 'info') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleCopy = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        document.execCommand('copy');
      } catch {
        // ignore fallback failure
      }
      document.body.removeChild(textarea);
    }
    setCopiedKey(key);
    notify('Teks berhasil disalin ke clipboard!', 'success');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Hitung halaman tertinggi yang sudah terbuka datanya
  const maxUnlockedPage = finalOutput
    ? 7
    : storyboard
    ? 5
    : audioConfig.alternatives.some(Boolean)
    ? 4
    : concepts.length > 0
    ? 3
    : 2;

  // Load saved projects & API keys from IndexedDB (with localStorage migration)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        let projects = await idbGet('guree_creative_studio_projects_v1', null);
        if (!projects) {
          const legacyRaw = localStorage.getItem('guree_creative_studio_projects_v1');
          if (legacyRaw) {
            projects = JSON.parse(legacyRaw);
            await idbSet('guree_creative_studio_projects_v1', projects);
          }
        }
        if (mounted && Array.isArray(projects)) {
          setSavedProjects(projects);
        }

        const storedKeys = await getActiveApiKeys();
        if (mounted) {
          setApiKeys(storedKeys);
        }
      } catch {
        // ignore storage errors
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleAddApiKey = async () => {
    const trimmed = newApiKeyInput.trim();
    if (!trimmed) {
      notify('Masukkan API Key Gemini terlebih dahulu.', 'warning');
      return;
    }
    if (apiKeys.includes(trimmed)) {
      notify('API Key tersebut sudah tersimpan.', 'warning');
      return;
    }
    if (apiKeys.length >= 5) {
      notify('Maksimal 5 API Key dalam pool rotasi.', 'warning');
      return;
    }
    const updated = [...apiKeys, trimmed];
    setApiKeys(updated);
    setNewApiKeyInput('');
    await idbSet(API_KEYS_STORAGE_KEY, updated);
    try {
      localStorage.setItem(API_KEYS_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
    notify(`API Key berhasil ditambahkan (${updated.length} key aktif).`, 'success');
  };

  const handleRemoveApiKey = async (keyToRemove) => {
    const updated = apiKeys.filter((k) => k !== keyToRemove);
    setApiKeys(updated);
    await idbSet(API_KEYS_STORAGE_KEY, updated);
    try {
      localStorage.setItem(API_KEYS_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
    notify('API Key dihapus dari daftar rotasi.', 'info');
  };
  // Save current project full state to localStorage
  const persistCurrentProjectToHistory = (stageLabel, targetPage = page) => {
    const titleToSave =
      projectName.trim() ||
      productData.productTitle.trim() ||
      `${selectedCategory.name} Project`;

    const summaryItem = {
      id: activeProjectId,
      name: titleToSave,
      stage: stageLabel,
      resumePage: targetPage,
      clipSpec: `${videoSpecs.clipCount} × ${videoSpecs.durationPerClip} detik`,
      category: selectedCategory.name,
      subcategory: selectedSubcategory.name,
      updatedAt: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      snapshot: {
        projectName: titleToSave,
        presetBrand,
        categoryId: selectedCategory.id,
        subcategoryId: selectedSubcategory.id,
        usePresetAPC,
        videoSpecs,
        productData,
        concepts,
        selectedConceptId,
        audioConfig,
        storyboard,
        finalOutput
      }
    };

    setSavedProjects((prev) => {
      const filtered = prev.filter((item) => item.id !== activeProjectId && item.name !== titleToSave);
      const updated = [summaryItem, ...filtered].slice(0, 8);
      idbSet('guree_creative_studio_projects_v1', updated);
      return updated;
    });
  };

  const handleLoadSavedProject = (proj) => {
    if (!proj?.snapshot) {
      setPage(2);
      return;
    }
    const s = proj.snapshot;
    setActiveProjectId(proj.id || `${Date.now()}`);
    setProjectName(s.projectName || proj.name || '');
    setPresetBrand(s.presetBrand || 'GUREE.ID');

    const foundCat = CATALOG.find((c) => c.id === s.categoryId) || CATALOG[1];
    const foundSub =
      foundCat.subcategories.find((sub) => sub.id === s.subcategoryId) || foundCat.subcategories[0];
    setSelectedCategory(foundCat);
    setSelectedSubcategory(foundSub);
    setUsePresetAPC(Boolean(s.usePresetAPC));
    if (s.videoSpecs) setVideoSpecs(s.videoSpecs);
    if (s.productData) setProductData(s.productData);
    setConcepts(Array.isArray(s.concepts) ? s.concepts : []);
    setSelectedConceptId(s.selectedConceptId || null);
    if (s.audioConfig) setAudioConfig(s.audioConfig);
    setStoryboard(s.storyboard || null);
    setFinalOutput(s.finalOutput || null);
    if (s.finalOutput?.masterImagePrompt) setMasterImagePrompt(s.finalOutput.masterImagePrompt);
    if (s.finalOutput?.productDnaImagePrompt) setDnaImagePrompt(s.finalOutput.productDnaImagePrompt);
    setDnaImageUrl(null);
    setMasterImageUrl(null);

    const target = proj.resumePage && proj.resumePage >= 1 ? proj.resumePage : 2;
    setPage(target);
    notify(`Proyek "${proj.name}" berhasil dimuat!`, 'success');
  };

  const handleDeleteSavedProject = (e, id) => {
    e.stopPropagation();
    setSavedProjects((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      idbSet('guree_creative_studio_projects_v1', updated);
      return updated;
    });
    notify('Proyek dihapus dari riwayat.', 'info');
  };

  const handleDownloadDataUrlImage = async (dataUrl, filename) => {
    if (!dataUrl) return;
    try {
      const [header, base64Data] = dataUrl.split(',');
      const mimeMatch = header.match(/:(.*?);/);
      const mime = mimeMatch ? mimeMatch[1] : 'image/png';

      // Jalur Native Android Capacitor 7 (jika plugin Filesystem & Share terpasang)
      const capPlugins = window?.Capacitor?.Plugins;
      if (window?.Capacitor?.isNativePlatform?.() && capPlugins?.Filesystem) {
        const saved = await capPlugins.Filesystem.writeFile({
          path: filename,
          data: base64Data,
          directory: 'CACHE'
        });
        if (capPlugins.Share) {
          await capPlugins.Share.share({
            title: filename,
            url: saved.uri,
            dialogTitle: 'Simpan atau Bagikan Gambar'
          });
          notify(`Gambar ${filename} siap disimpan/dibagikan!`, 'success');
          return;
        }
      }

      // Fallback Browser / WebView standar
      const byteString = atob(base64Data);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mime });
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1500);
      notify(`Gambar ${filename} berhasil diunduh!`, 'success');
    } catch {
      notify('Gagal mengunduh gambar. Coba tekan lama gambar untuk menyimpan.', 'warning');
    }
  };

  const resetForNewProject = () => {
    setActiveProjectId(`${Date.now()}`);
    setProjectName('');
    setProductPhotos([]);
    setCharacterPhotos([]);
    setEnvironmentPhotos([]);
    setExtraVisualRefs([]);
    setProductData({
      brandName: '',
      productTitle: '',
      sizeVariant: '',
      materialTexture: '',
      colorLighting: '',
      logoVerbatim: '',
      hardwareMechanism: '',
      validClaims: '',
      characterProfile: '',
      environmentProfile: ''
    });
    setConcepts([]);
    setSelectedConceptId(null);
    setAudioConfig({
      mode: 'VO',
      activeAltIndex: 0,
      alternatives: ['', '', ''],
      isEditingScript: false,
      musicMood: 'Instrumental upbeat ringan kontinu (rasio dominansi VO : Musik+SFX = 2:1)',
      sfxNotes: 'Suara buka kemasan, sentuhan tangan natural, dan bunyi mekanisme produk'
    });
    setStoryboard(null);
    setFinalOutput(null);
    setDnaImageUrl(null);
    setMasterImageUrl(null);
    setPage(1);
  };

  // ==========================================================================
  // FILE UPLOAD HELPERS
  // ==========================================================================
  const processFileUpload = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const dataUrl = reader.result;
        const base64 = dataUrl.split(',')[1];
        resolve({
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          url: dataUrl,
          base64,
          mimeType: file.type || 'image/png'
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleUploadAsset = async (e, bucket) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (bucket === 'produk') {
      const rem = 3 - productPhotos.length;
      if (rem <= 0) return notify('Maksimal 3 foto produk seller bre.', 'warning');
      const items = await Promise.all(files.slice(0, rem).map(processFileUpload));
      const labels = ['Depan (Logo Utama)', 'Samping / Detail', 'Belakang / Kemasan'];
      setProductPhotos((prev) => [
        ...prev,
        ...items.map((it, idx) => ({ ...it, label: labels[prev.length + idx] || `Sisi ${prev.length + idx + 1}` }))
      ]);
    } else if (bucket === 'karakter') {
      const rem = 3 - characterPhotos.length;
      if (rem <= 0) return notify('Maksimal 3 foto karakter.', 'warning');
      const items = await Promise.all(files.slice(0, rem).map(processFileUpload));
      setCharacterPhotos((prev) => [
        ...prev,
        ...items.map((it, idx) => ({ ...it, label: `Karakter ${prev.length + idx + 1}` }))
      ]);
    } else if (bucket === 'lingkungan') {
      const rem = 2 - environmentPhotos.length;
      if (rem <= 0) return notify('Maksimal 2 foto lingkungan.', 'warning');
      const items = await Promise.all(files.slice(0, rem).map(processFileUpload));
      setEnvironmentPhotos((prev) => [
        ...prev,
        ...items.map((it, idx) => ({ ...it, label: `Lingkungan ${prev.length + idx + 1}` }))
      ]);
    } else {
      const rem = 3 - extraVisualRefs.length;
      if (rem <= 0) return notify('Maksimal 3 referensi visual tambahan.', 'warning');
      const items = await Promise.all(files.slice(0, rem).map(processFileUpload));
      setExtraVisualRefs((prev) => [
        ...prev,
        ...items.map((it, idx) => ({ ...it, label: `Ref Visual ${prev.length + idx + 1}` }))
      ]);
    }
  };

  // ==========================================================================
  // PAGE 2: ANALISA SEMUA FOTO DENGAN GEMINI VISION
  // ==========================================================================
  const handleAnalyzePhotosWithGemini = async () => {
    const allImages = [
      ...productPhotos,
      ...characterPhotos,
      ...environmentPhotos,
      ...extraVisualRefs
    ];
    if (allImages.length === 0) {
      notify('Unggah minimal 1 foto produk, karakter, atau lingkungan dulu ya!', 'warning');
      return;
    }

    setLoadingVisionAnalysis(true);
    try {
      const inventory = [];
      let counter = 1;
      productPhotos.forEach((p) => inventory.push(`Gambar ${counter++}: Foto Produk (${p.label})`));
      characterPhotos.forEach((c) => inventory.push(`Gambar ${counter++}: Foto Karakter (${c.label})`));
      environmentPhotos.forEach((ev) => inventory.push(`Gambar ${counter++}: Foto Lingkungan (${ev.label})`));
      extraVisualRefs.forEach((r) => inventory.push(`Gambar ${counter++}: Referensi Visual (${r.label})`));

      const prompt = `
Lakukan EKSTRAKSI DATA FAKTUAL VISUAL (Gemini Multimodal Vision) secara ketat dari seluruh foto yang dilampirkan berikut:
${inventory.join('\n')}

Konteks Produksi:
- Kategori: ${selectedCategory.name}
- Sub-Kategori: ${selectedSubcategory.name}

ATURAN MUTLAK EKSTRAKSI:
1. FOTO SELLER ASLI = OTORITAS TERTINGGI. Catat hanya fakta visual yang benar-benar terlihat di foto (merek, nama produk, ukuran/varian pada kemasan, bahan/tekstur, warna & pantulan cahaya, teks logo verbatim persis seperti tercetak, mekanisme tutup/pump/sol/jahitan, serta klaim resmi yang tertulis di kemasan).
2. DILARANG MENGARANG spesifikasi, ukuran cm, berat, atau klaim yang tidak tampak di foto. Jika tidak terlihat, tulis "Sesuai foto referensi" atau kosongkan dengan singkat.
3. Jika ada foto Karakter, deskripsikan secara objektif usia visual, gaya rambut/hijab, pakaian, dan ciri khas wajah pada "characterProfile". Jika tidak ada foto karakter, isi string kosong "".
4. Jika ada foto Lingkungan, deskripsikan tata ruang, pencahayaan, dan permukaan meja/lantai pada "environmentProfile". Jika tidak ada foto lingkungan, isi string kosong "".
5. Gunakan Bahasa Indonesia yang ringkas, faktual, dan siap pakai untuk Product DNA Lock.
`;

      const schema = {
        type: "OBJECT",
        properties: {
          brandName: { type: "STRING" },
          productTitle: { type: "STRING" },
          sizeVariant: { type: "STRING" },
          materialTexture: { type: "STRING" },
          colorLighting: { type: "STRING" },
          logoVerbatim: { type: "STRING" },
          hardwareMechanism: { type: "STRING" },
          validClaims: { type: "STRING" },
          characterProfile: { type: "STRING" },
          environmentProfile: { type: "STRING" }
        },
        required: [
          "brandName",
          "productTitle",
          "sizeVariant",
          "materialTexture",
          "colorLighting",
          "logoVerbatim",
          "hardwareMechanism",
          "validClaims",
          "characterProfile",
          "environmentProfile"
        ]
      };

      const data = await generateGeminiText({
        userPrompt: prompt,
        images: allImages,
        responseSchema: schema
      });

      setProductData((prev) => ({
        brandName: data.brandName || prev.brandName,
        productTitle: data.productTitle || prev.productTitle,
        sizeVariant: data.sizeVariant || prev.sizeVariant,
        materialTexture: data.materialTexture || prev.materialTexture,
        colorLighting: data.colorLighting || prev.colorLighting,
        logoVerbatim: data.logoVerbatim || prev.logoVerbatim,
        hardwareMechanism: data.hardwareMechanism || prev.hardwareMechanism,
        validClaims: data.validClaims || prev.validClaims,
        characterProfile: characterPhotos.length > 0 ? (data.characterProfile || prev.characterProfile) : prev.characterProfile,
        environmentProfile: environmentPhotos.length > 0 ? (data.environmentProfile || prev.environmentProfile) : prev.environmentProfile
      }));

      if (!projectName.trim() && data.productTitle) {
        setProjectName(`Review ${data.productTitle}`);
      }

      persistCurrentProjectToHistory('Data Produk');
      notify('Analisa Gemini Vision berhasil! Data produk & karakter terisi otomatis.', 'success');
    } catch (err) {
      notify(`Gagal menganalisa foto: ${err.message}`, 'error');
    } finally {
      setLoadingVisionAnalysis(false);
    }
  };

  // ==========================================================================
  // PAGE 2 -> PAGE 3: GENERATE 5 KONSEP KREATIF (GEMINI AI)
  // ==========================================================================
  const handleGenerateConcepts = async (revisionNote = '') => {
    const fullProductName = `${productData.brandName} ${productData.productTitle}`.trim();
    if (!fullProductName) {
      notify('Isi minimal Merek atau Nama Produk (atau klik Analisa Foto AI) dulu ya!', 'warning');
      return;
    }

    setLoadingConcepts(true);
    try {
      const prompt = `
Buatkan 5 IDE KONSEP KREATIF BERBEDA untuk produk TikTok Shop berikut:
- Kategori Produksi: ${selectedCategory.name}
- Sub-Kategori Terkunci: ${selectedSubcategory.name} (${selectedSubcategory.desc})
- MANDAT TEKNIS SUB-KATEGORI (WAJIB DIPATUHI DI SEMUA 5 KONSEP): ${SUBCATEGORY_DIRECTIVES[selectedSubcategory.id] || selectedSubcategory.desc}
- Preset Active Product Commercial: ${usePresetAPC ? 'AKTIF (ACTION FIRST, CAMERA SECOND)' : 'Tidak'}
- Merek & Produk: ${fullProductName}
- Ukuran / Varian: ${productData.sizeVariant || 'Sesuai foto referensi'}
- Bahan & Tekstur: ${productData.materialTexture || 'Sesuai foto referensi'}
- Warna: ${productData.colorLighting || 'Sesuai foto referensi'}
- Teks Kemasan Verbatim: ${productData.logoVerbatim || 'Sesuai foto referensi'}
- Mekanisme Produk: ${productData.hardwareMechanism || 'Tidak ada mekanisme khusus'}
- Klaim Valid: ${productData.validClaims || 'Fokus pada visual fisik nyata'}
- Profil Karakter: ${productData.characterProfile || 'Kreator natural Indonesia sesuai sub-kategori'}
- Profil Lingkungan: ${productData.environmentProfile || 'Latar rumah/studio natural Indonesia'}
- Struktur Video: ${videoSpecs.clipCount} klip × ${videoSpecs.durationPerClip} detik (Total ${totalVideoDuration} detik), Rasio ${videoSpecs.aspectRatio}
${revisionNote ? `- CATATAN REVISI OWNER: ${revisionNote}` : ''}

Hasilkan tepat 5 konsep yang ringkas, segar, realistis secara fisika, dan memiliki pemicu gerak kamera fisik (tanpa zoom digital).
`;

      const schema = {
        type: "ARRAY",
        items: {
          type: "OBJECT",
          properties: {
            id: { type: "STRING" },
            title: { type: "STRING" },
            subtitle: { type: "STRING" },
            hook: { type: "STRING" },
            mainAction: { type: "STRING" },
            cameraTrigger: { type: "STRING" },
            recommendedAudioMode: {
              type: "STRING",
              enum: ["VO", "Dialog", "ASMR", "Silent"]
            }
          },
          required: ["id", "title", "subtitle", "hook", "mainAction", "cameraTrigger", "recommendedAudioMode"]
        }
      };

      const list = await generateGeminiText({
        userPrompt: prompt,
        images: [...productPhotos, ...characterPhotos, ...environmentPhotos],
        responseSchema: schema
      });

      setConcepts(list);
      if (list.length > 0) {
        setSelectedConceptId(list[0].id);
      }
      persistCurrentProjectToHistory('Konsep Kreatif', 3);
      setPage(3);
      notify('5 Konsep Kreatif siap dipilih!', 'success');
    } catch (err) {
      notify(`Gagal membuat konsep: ${err.message}`, 'error');
    } finally {
      setLoadingConcepts(false);
    }
  };

  // ==========================================================================
  // PAGE 3 -> PAGE 4: GENERATE 3 ALTERNATIF NASKAH & AUDIO ENGINE V1.2
  // ==========================================================================
  const handleProceedToAudio = async () => {
    const chosen = concepts.find((c) => c.id === selectedConceptId);
    if (!chosen) {
      notify('Pilih salah satu dari 5 konsep dulu ya.', 'warning');
      return;
    }
    const mode = chosen.recommendedAudioMode || 'VO';
    setAudioConfig((prev) => ({ ...prev, mode, activeAltIndex: 0 }));
    setPage(4);
    await handleGenerateThreeScriptAlternatives(chosen, mode);
  };

  const handleGenerateThreeScriptAlternatives = async (conceptOverride = null, modeOverride = null) => {
    const chosen = conceptOverride || concepts.find((c) => c.id === selectedConceptId);
    const activeMode = modeOverride || audioConfig.mode;
    if (!chosen) return;

    if (activeMode === 'Silent') {
      setAudioConfig((prev) => ({
        ...prev,
        mode: 'Silent',
        alternatives: [
          '[SILENT / NO-VO — Fokus penuh pada SFX fisik nyata produk & musik latar ritmis tanpa suara bicara.]',
          '[SILENT ASMR AMBIENCE — Suara natural sentuhan produk dan lingkungan tanpa narasi.]',
          '[SILENT COMMERCIAL BEAT — Musik upbeat sinkron dengan tiap potongan adegan produk.]'
        ]
      }));
      return;
    }

    setLoadingScript(true);
    try {
      const isWhisper = activeMode === 'ASMR';
      const maxWords = isWhisper
        ? Math.floor(totalVideoDuration * 2.4)
        : Math.floor(totalVideoDuration * 2.9);
      const minWords = Math.max(6, Math.floor(maxWords * 0.72));

      const prompt = `
Buat 3 ALTERNATIF NASKAH VERBATIM (${activeMode}) dalam Bahasa Indonesia santai natural untuk TikTok Shop:
- Kategori & Sub-Kategori Terkunci: ${selectedCategory.name} -> ${selectedSubcategory.name}
- MANDAT GAYA SUB-KATEGORI: ${SUBCATEGORY_DIRECTIVES[selectedSubcategory.id] || selectedSubcategory.desc}
- Konsep Terpilih: ${chosen.title} (${chosen.subtitle})
- Hook: ${chosen.hook}
- Aksi Utama: ${chosen.mainAction}
- Merek & Produk: ${productData.brandName} ${productData.productTitle}
- Klaim Valid: ${productData.validClaims || 'Deskripsi fisik nyata'}
- Total Durasi Video: ${totalVideoDuration} detik (${videoSpecs.clipCount} klip × ${videoSpecs.durationPerClip} detik)
- Batas Kata Wajib: ${minWords} hingga ${maxWords} kata per alternatif (${isWhisper ? 'tempo bisik 2-2,5 kata/detik' : 'tempo normal 2,5-3 kata/detik'})

ATURAN KETAT:
1. Dilarang klaim superlatif ("paling", "terbaik", "100%", "nomor 1"), klaim medis, atau diskon fiktif.
2. Cantumkan nama produk "${productData.brandName} ${productData.productTitle}" dengan ejaan jelas.
3. Setiap alternatif harus punya gaya penyampaian yang berbeda (Alternatif 01: Hook Masalah-Solusi, Alternatif 02: Review Jujur Santai, Alternatif 03: Storytelling Singkat).
4. Tulis murni teks naskahnya saja tanpa tanda kutip pembuka/penutup.
`;

      const schema = {
        type: "OBJECT",
        properties: {
          alt1: { type: "STRING" },
          alt2: { type: "STRING" },
          alt3: { type: "STRING" }
        },
        required: ["alt1", "alt2", "alt3"]
      };

      const resObj = await generateGeminiText({ userPrompt: prompt, responseSchema: schema });
      const padded = [
        resObj.alt1 || 'Alternatif 1 siap diedit.',
        resObj.alt2 || resObj.alt1 || 'Alternatif 2 siap diedit.',
        resObj.alt3 || resObj.alt1 || 'Alternatif 3 siap diedit.'
      ];
      setAudioConfig((prev) => ({
        ...prev,
        alternatives: padded,
        activeAltIndex: 0
      }));
      persistCurrentProjectToHistory('Naskah & Audio', 4);
      notify('3 Alternatif naskah verbatim siap dipilih!', 'success');
    } catch (err) {
      notify(`Gagal membuat alternatif naskah: ${err.message}`, 'error');
    } finally {
      setLoadingScript(false);
    }
  };

  // ==========================================================================
  // PAGE 4 -> PAGE 5: BUILD STORYBOARD & PHYSICS AUDIT
  // ==========================================================================
  const handleAccAudioAndBuildStoryboard = async () => {
    setPage(5);
    setActiveVideoTab(0);
    setLoadingStoryboard(true);

    const chosen = concepts.find((c) => c.id === selectedConceptId);
    const lockedScript = audioConfig.alternatives[audioConfig.activeAltIndex] || '';
    const activeEditingModulesNames = EDITING_MODULES
      .filter((m) => videoSpecs.customModules.includes(m.id))
      .map((m) => m.name)
      .join(', ');
    const activeStyleName =
      STYLE_LIBRARY.find((s) => s.id === videoSpecs.styleLibrary)?.name || videoSpecs.styleLibrary;
    const editingSummaryInstruction =
      videoSpecs.editingMode === 'none'
        ? 'Tanpa Editing (video murni tanpa teks/stiker overlay tambahan)'
        : videoSpecs.editingMode === 'auto'
        ? 'Kreatif Otomatis (rekomendasi tipografi, stiker halus, & CTA selaras dengan naskah)'
        : `EDITING CUSTOM WAJIB DITERAPKAN — Modul Aktif: [${activeEditingModulesNames || 'Minimal'}] | Pustaka Style Visual: [${activeStyleName}]`;

    try {
      const prompt = `
Susun STORYBOARD TERSTRUKTUR untuk ${videoSpecs.clipCount} Video / Klip (masing-masing ${videoSpecs.durationPerClip} detik, Rasio ${videoSpecs.aspectRatio}):
- Kategori / Sub-Kategori Terkunci: ${selectedCategory.name} -> ${selectedSubcategory.name} ${usePresetAPC ? '(Preset APC Multi-Shot)' : ''}
- MANDAT VISUAL & KAMERA SUB-KATEGORI (WAJIB TERLIHAT DI SETIAP SHOT): ${SUBCATEGORY_DIRECTIVES[selectedSubcategory.id] || selectedSubcategory.desc}
- Konsep ACC: ${chosen?.title} | Hook: ${chosen?.hook} | Aksi: ${chosen?.mainAction} | Kamera: ${chosen?.cameraTrigger}
- Produk: ${productData.brandName} ${productData.productTitle} | Varian: ${productData.sizeVariant} | Bahan: ${productData.materialTexture} | Warna: ${productData.colorLighting} | Logo: ${productData.logoVerbatim}
- Profil Karakter: ${productData.characterProfile || 'Sesuai sub-kategori'}
- Profil Lingkungan: ${productData.environmentProfile || 'Latar rumah/studio Indonesia'}
- Mode Audio: ${audioConfig.mode} | Naskah Verbatim Terkunci: "${lockedScript}"
- ARAHAN EDITING VISUAL: ${editingSummaryInstruction}

ATURAN WAJIB:
1. Buat daftar klip ("videos") sejumlah tepat ${videoSpecs.clipCount} klip (Video 01, Video 02, dst.).
2. Di dalam setiap klip, bagi menjadi 2-3 Shot detail yang menjelaskan:
   - shotLabel: misalnya "Shot 01", "Shot 02", "Shot 03" (TANPA timestamp detik di deskripsi aksi)
   - visualAction: deskripsi aksi fisik nyata, posisi tangan & produk, rotasi derajat, gravitasi nyata, tanpa slow motion${videoSpecs.editingMode === 'custom' ? `, serta integrasikan penempatan elemen editing [${activeEditingModulesNames}] bergaya [${activeStyleName}] di area aman layar (safe zone)` : ''}
   - camera: framing & gerak kamera fisik ber-paralaks (misal "Medium frontal, smartphone statis" atau "Push-in fisik 15 cm saat produk diangkat")
   - expression: peta ekspresi konkret (misal "Kesal ringan -> penasaran & senyum natural")
3. Pastikan seluruh shot lolos audit fisika, gravitasi, skala telapak tangan dewasa (17-19 cm), dan aturan cermin.
`;

      const schema = {
        type: "OBJECT",
        properties: {
          auditSummary: { type: "STRING" },
          videos: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                videoNumber: { type: "INTEGER" },
                durationSec: { type: "INTEGER" },
                shots: {
                  type: "ARRAY",
                  items: {
                    type: "OBJECT",
                    properties: {
                      shotLabel: { type: "STRING" },
                      visualAction: { type: "STRING" },
                      camera: { type: "STRING" },
                      expression: { type: "STRING" }
                    },
                    required: ["shotLabel", "visualAction", "camera", "expression"]
                  }
                }
              },
              required: ["videoNumber", "durationSec", "shots"]
            }
          }
        },
        required: ["auditSummary", "videos"]
      };

      const sb = await generateGeminiText({
        userPrompt: prompt,
        images: [...productPhotos, ...characterPhotos, ...environmentPhotos],
        responseSchema: schema
      });

      setStoryboard(sb);
      persistCurrentProjectToHistory('Storyboard', 5);
      notify('Storyboard & audit fisika selesai disusun!', 'success');
    } catch (err) {
      notify(`Gagal menyusun storyboard: ${err.message}`, 'error');
    } finally {
      setLoadingStoryboard(false);
    }
  };

  // ==========================================================================
  // PAGE 5 -> PAGE 6 & 7: BUILD VISUAL REFERENCE & 3-PART PROMPT STUDIO
  // ==========================================================================
  const handleAccStoryboardAndBuildPrompts = async () => {
    setPage(6);
    setLoadingFinal(true);

    const chosen = concepts.find((c) => c.id === selectedConceptId);
    const lockedScript = audioConfig.alternatives[audioConfig.activeAltIndex] || '';
    const activeEditingModulesNames = EDITING_MODULES
      .filter((m) => videoSpecs.customModules.includes(m.id))
      .map((m) => m.name)
      .join(', ');
    const activeStyleName =
      STYLE_LIBRARY.find((s) => s.id === videoSpecs.styleLibrary)?.name || videoSpecs.styleLibrary;
    const detailedEditingDirective =
      videoSpecs.editingMode === 'none'
        ? 'Tanpa Editing (video murni bersih tanpa tambahan teks, stiker, atau grafik overlay; pertahankan 100% teks kemasan asli)'
        : videoSpecs.editingMode === 'auto'
        ? 'Kreatif Otomatis (tipografi headline hook, badge poin manfaat singkat, & CTA keranjang kuning di safe area bawah/samping tanpa menutupi produk)'
        : `EDITING CUSTOM TERKUNCI — Wajib mengeksekusi secara spesifik modul berikut: [${activeEditingModulesNames || 'Tidak ada modul dipilih'}] dengan gaya visual [${activeStyleName}] di safe zone layar`;

    const attachments = [];
    productPhotos.forEach((p) => attachments.push(`Gambar ${attachments.length + 1} = Product DNA (${p.label})`));
    characterPhotos.forEach((c) => attachments.push(`Gambar ${attachments.length + 1} = Master Karakter (${c.label})`));
    environmentPhotos.forEach((e) => attachments.push(`Gambar ${attachments.length + 1} = Environment (${e.label})`));
    attachments.push(`Gambar ${attachments.length + 1} = Master Visual Reference (Render Studio)`);

    try {
      const prompt = `
Hasilkan paket lengkap untuk TAHAP 05 (Referensi Visual) & TAHAP 06 (Prompt Studio Google Flow Omni Flash) sesuai standar GUREE.ID V1.0.7:

DATA TERKUNCI (WAJIB DIPATUHI 100%):
- Proyek: ${projectName || productData.productTitle}
- Kategori Terkunci: ${selectedCategory.name}
- Sub-Kategori Terkunci: ${selectedSubcategory.name} (${selectedSubcategory.desc})
- MANDAT TEKNIS SUB-KATEGORI: ${SUBCATEGORY_DIRECTIVES[selectedSubcategory.id] || selectedSubcategory.desc}
- Kebutuhan Karakter Sub-Kategori: ${selectedSubcategory.needsCharacter ? 'Membutuhkan Karakter/Talent Utama' : `TIDAK MEMBUTUHKAN WAJAH KARAKTER (${selectedSubcategory.characterNote})`}
- Merek & Produk: ${productData.brandName} ${productData.productTitle} | Ukuran/Varian: ${productData.sizeVariant}
- Bahan & Warna: ${productData.materialTexture} | ${productData.colorLighting}
- Teks Logo Verbatim: ${productData.logoVerbatim} | Mekanisme: ${productData.hardwareMechanism}
- Karakter Referensi: ${selectedSubcategory.needsCharacter ? (productData.characterProfile || 'Kreator natural Indonesia sesuai sub-kategori') : 'Tidak ada wajah karakter penuh (hanya tangan/produk sesuai aturan sub-kategori)'}
- Lingkungan Referensi: ${productData.environmentProfile || 'Latar rumah/studio natural Indonesia'}
- Struktur: ${videoSpecs.clipCount} klip × ${videoSpecs.durationPerClip} detik (Total ${totalVideoDuration} detik) | Rasio ${videoSpecs.aspectRatio}
- Konsep Terkunci: ${chosen?.title} (${chosen?.subtitle})
- Audio Mode: ${audioConfig.mode} | Naskah Verbatim: "${lockedScript}" | Musik: ${audioConfig.musicMood} | SFX: ${audioConfig.sfxNotes}
- ARAHAN EDITING WAJIB: ${detailedEditingDirective}
- Storyboard ACC (${storyboard?.videos?.length || 1} klip): ${JSON.stringify(storyboard?.videos || [])}
- Daftar Lampiran: ${attachments.join(' | ')}

KELUARKAN JSON DENGAN 5 FIELD:
1. "masterVisualDescription": Deskripsi 02 Master Visual Reference berupa layout MULTI-PANEL STORYBOARD VISUAL yang memvisualisasikan seluruh urutan shot dari Storyboard ACC (${storyboard?.videos?.[0]?.shots?.length || 3} panel berurutan) dengan konsistensi produk, pencahayaan, dan aturan sub-kategori "${selectedSubcategory.name}".
2. "masterImagePrompt": Prompt Bahasa Inggris fotorealistis untuk men-generate SATU GAMBAR MULTI-PANEL GRID (split-panel storyboard reference sheet, rasio ${videoSpecs.aspectRatio}) yang menampilkan panel-panel visual sesuai urutan shot di Storyboard ACC secara berurutan dari kiri/atas ke kanan/bawah. ${selectedSubcategory.needsCharacter ? 'Pertahankan wajah, hijab/rambut, dan outfit karakter referensi di setiap panel.' : 'STRICTLY NO FULL HUMAN FACE (tampilkan hanya produk / tangan sesuai aturan sub-kategori ' + selectedSubcategory.name + ').'} Pertahankan 100% bentuk, warna, dan teks logo verbatim produk. Tanpa watermark atau teks tambahan.
3. "productDnaText": Teks 02 Product DNA lengkap (spesifikasi teknis datar & akurat dari foto seller: siluet, ukuran, warna, teks logo verbatim, bahan/tekstur, detail mekanisme tutup/pump/sol/jahitan).
4. "productDnaImagePrompt": Prompt Bahasa Inggris studio clean multi-panel orthographic product reference sheet dalam SATU GAMBAR (rasio 1:1, latar krem/abu studio netral) yang terbagi menjadi 4 panel terstruktur: (Panel 1: Front Hero View menampilkan bentuk utuh & logo utama; Panel 2: Macro Close-Up pada desain logo & tipografi kemasan verbatim; Panel 3: 90-Degree Side Profile menampilkan ketebalan & siluet samping; Panel 4: Top-Down / Detail Mekanisme Khusus menyesuaikan kategori produk seperti tutup botol/pump/pipet untuk skincare, tekstur sol & jahitan untuk sepatu, atau detail kerah/kancing/serat kain untuk fashion).
5. "videoFinalPrompt": Teks lengkap 03 Prompt Video Final siap tempel ke Google Flow Omni Flash yang mencantumkan Kategori "${selectedCategory.name}" & Sub-Kategori "${selectedSubcategory.name}" secara eksplisit, memuat:
   - HEADER & DAFTAR LAMPIRAN
   - REFERENCE MAP (hierarki: Product DNA > ${selectedSubcategory.needsCharacter ? 'Master Karakter > ' : ''}Environment > Master Visual > Teks)
   - PRODUCT LOCK (identitas produk terkunci & peta foto acuan per shot)
   - SCENES (Adegan 01 dst. TANPA timestamp, nama tetap per subjek/objek, jarak cm & derajat konkret, kalimat positif, pose awal & akhir eksplisit)
   - EDITING (jabarkan secara eksplisit penerapan: ${detailedEditingDirective}, lengkap dengan posisi safe area, timing muncul per adegan tanpa timestamp, dan detail gaya visualnya)
   - AUDIO (3 lapisan eksplisit: Musik, SFX, VO verbatim dalam satu blok, rasio VO : Musik+SFX = 2:1)
   - NEGATIVE CONSTRAINTS (no morphing, no magic, no extra objects, no product mutation, no digital zoom, no impossible anatomy${!selectedSubcategory.needsCharacter ? ', no unintended human face' : ''})
`;

      const schema = {
        type: "OBJECT",
        properties: {
          masterVisualDescription: { type: "STRING" },
          masterImagePrompt: { type: "STRING" },
          productDnaText: { type: "STRING" },
          productDnaImagePrompt: { type: "STRING" },
          videoFinalPrompt: { type: "STRING" }
        },
        required: [
          "masterVisualDescription",
          "masterImagePrompt",
          "productDnaText",
          "productDnaImagePrompt",
          "videoFinalPrompt"
        ]
      };

      const output = await generateGeminiText({
        userPrompt: prompt,
        images: [...productPhotos, ...characterPhotos, ...environmentPhotos],
        responseSchema: schema
      });

      const mergedOutput = { ...output, attachments };
      setFinalOutput(mergedOutput);
      setMasterImagePrompt(output.masterImagePrompt || '');
      setDnaImagePrompt(output.productDnaImagePrompt || '');
      persistCurrentProjectToHistory('Prompt Studio', 6);
      notify('Referensi Visual & 3 Prompt Final siap digunakan!', 'success');
    } catch (err) {
      notify(`Gagal menyusun prompt final: ${err.message}`, 'error');
    } finally {
      setLoadingFinal(false);
    }
  };

  // ==========================================================================
  // DIRECT IMAGE GENERATION IN CANVAS (MASTER VISUAL & PRODUCT DNA)
  // ==========================================================================
  const handleRenderMasterVisual = async () => {
    if (!masterImagePrompt.trim()) return;
    setLoadingMasterImage(true);
    try {
      const refs = [...productPhotos, ...characterPhotos, ...environmentPhotos];
      const finalPrompt = refs.length > 0
        ? `Keep 100% visual fidelity to the attached reference photos for the product packaging, verbatim logo, character face/outfit, and environment. ${masterImagePrompt}`
        : masterImagePrompt;

      const url = await generateGeminiImage({
        prompt: finalPrompt,
        referenceImages: refs,
        aspectRatio: videoSpecs.aspectRatio
      });
      setMasterImageUrl(url);
      notify('Master Visual Reference berhasil di-generate!', 'success');
    } catch (err) {
      notify(`Gagal generate Master Visual: ${err.message}`, 'error');
    } finally {
      setLoadingMasterImage(false);
    }
  };

  const handleRenderProductDna = async () => {
    if (!dnaImagePrompt.trim()) return;
    setLoadingDnaImage(true);
    try {
      const finalPrompt = productPhotos.length > 0
        ? `Keep the exact product shape, color, packaging, hardware, and verbatim logo text from the attached seller product photo(s). ${dnaImagePrompt}`
        : dnaImagePrompt;

      const url = await generateGeminiImage({
        prompt: finalPrompt,
        referenceImages: productPhotos,
        aspectRatio: '1:1'
      });
      setDnaImageUrl(url);
      notify('Gambar Product DNA berhasil di-generate!', 'success');
    } catch (err) {
      notify(`Gagal generate Product DNA: ${err.message}`, 'error');
    } finally {
      setLoadingDnaImage(false);
    }
  };

  // ==========================================================================
  // WORD METER HELPERS (PAGE 4)
  // ==========================================================================
  const currentScript = audioConfig.alternatives[audioConfig.activeAltIndex] || '';
  const isSilentMode = audioConfig.mode === 'Silent';
  const scriptWordCount = isSilentMode
    ? 0
    : currentScript.trim().split(/\s+/).filter(Boolean).length;
  const targetRate = audioConfig.mode === 'ASMR' ? 2.25 : 2.75;
  const maxWordsAllowed = audioConfig.mode === 'ASMR'
    ? Math.floor(totalVideoDuration * 2.5)
    : Math.floor(totalVideoDuration * 3.0);
  const estDurationSec = isSilentMode ? 0 : Math.round(scriptWordCount / targetRate);
  const isWordCountHealthy = isSilentMode || scriptWordCount <= maxWordsAllowed;

  const combinedGallery = [
    ...productPhotos,
    ...characterPhotos,
    ...environmentPhotos,
    ...extraVisualRefs
  ];

  // ==========================================================================
  // RENDER WARM EDITORIAL MOBILE-FIRST APPLICATION
  // ==========================================================================
  return (
    <div
      className="min-h-screen w-full bg-[#FAF6EE] text-[#2C2A25] font-sans selection:bg-[#D97336]/20 selection:text-[#2C2A25] flex flex-col relative"
      style={{
        paddingTop: 'env(safe-area-inset-top)',
        paddingBottom: 'env(safe-area-inset-bottom)'
      }}
    >
      <StudioBackgroundPattern />

      {/* TOAST NOTIFICATION */}
      {notification && (
        <div className="fixed bottom-5 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 sm:max-w-md z-50">
          <div
            className={`px-4 py-3 rounded-2xl border shadow-xl flex items-center gap-3 text-xs sm:text-sm font-medium ${
              notification.type === 'error'
                ? 'bg-[#FDF2F2] border-red-300 text-red-800'
                : notification.type === 'warning'
                ? 'bg-[#FEF9EC] border-amber-300 text-amber-900'
                : 'bg-[#EFF5EB] border-[#B6C9AA] text-[#2F4726]'
            }`}
          >
            {notification.type === 'error' || notification.type === 'warning' ? (
              <AlertTriangle className="w-4 h-4 shrink-0 text-[#D97336]" />
            ) : (
              <Sparkles className="w-4 h-4 shrink-0 text-[#5D7B52]" />
            )}
            <span>{notification.msg}</span>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SCREEN 0: DASHBOARD UTAMA ('GUREE.ID Creative Studio')               */}
      {/* ==================================================================== */}
      {page === 0 && (
        <div className="min-h-screen w-full max-w-md mx-auto px-4 py-3 flex flex-col justify-between gap-3 relative z-10">
          <div className="space-y-3">
            {/* UNIFIED STATIC STUDIO HERO BANNER (KONSISTEN TANPA AUTO-RENDER) */}
            <div className="relative rounded-[28px] bg-gradient-to-br from-[#FAF3E6] via-[#EFE0C5] to-[#DFC79E] border border-[#DFCCA9] shadow-[0_14px_30px_-12px_rgba(68,54,32,0.22)] overflow-hidden min-h-[240px] flex flex-col justify-between">
              {/* Dekorasi Statis Botanical & Studio Motif (Konsisten di Setiap Sesi) */}
              <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full bg-[#D97336]/12 blur-2xl pointer-events-none" />
              <div className="absolute right-3 bottom-3 opacity-[0.16] pointer-events-none select-none text-[#5D7B52]">
                <svg viewBox="0 0 140 140" className="w-32 h-32" fill="none">
                  <rect x="20" y="34" width="96" height="72" rx="14" stroke="currentColor" strokeWidth="3.5" />
                  <path d="M20 54H116" stroke="currentColor" strokeWidth="3.5" />
                  <path d="M38 34L50 54M64 34L76 54M90 34L102 54" stroke="currentColor" strokeWidth="3.5" />
                  <circle cx="68" cy="80" r="13" stroke="currentColor" strokeWidth="3.5" />
                  <path d="M64 74L75 80L64 86V74Z" fill="currentColor" />
                </svg>
              </div>
              <BotanicalAccent className="w-28 h-28 absolute -top-4 right-2 opacity-65 rotate-12" />

              {/* Top Bar: Tombol Manajemen Multi-API Key (Anti-Limit) */}
              <div className="relative z-20 flex items-center justify-end p-3">
                <button
                  type="button"
                  onClick={() => setShowGeminiModal(true)}
                  className={`px-3 py-1.5 rounded-full backdrop-blur-xs border text-[11px] font-extrabold flex items-center gap-1.5 shadow-xs transition active:scale-95 ${
                    apiKeys.length > 0
                      ? 'bg-[#EEF3EC]/95 border-[#B8CBB0] text-[#3B5731]'
                      : 'bg-[#FEF3C7]/95 border-[#F59E0B] text-[#92400E]'
                  }`}
                >
                  <Key className="w-3.5 h-3.5" />
                  {apiKeys.length > 0 ? `API Key (${apiKeys.length} Aktif)` : 'Atur API Key'}
                </button>
              </div>

              {/* Unified Foreground Title (Dark Orange to Black Gradient) + Gemini AI Edition Pill + Subtitle */}
              <div className="relative z-10 px-5 pb-5 pt-1 flex flex-col justify-end">
                <div className="max-w-[86%] space-y-2">
                  <h1
                    className="text-[32px] font-black tracking-tight leading-[1.02] bg-clip-text text-transparent"
                    style={{
                      backgroundImage: 'linear-gradient(135deg, #9A3412 0%, #7C2D12 38%, #1C1917 85%, #09090B 100%)'
                    }}
                  >
                    GUREE.ID
                    <span className="block text-[27px] font-extrabold mt-0.5">
                      Creative Studio
                    </span>
                  </h1>

                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-[#1D8FE1] via-[#3B66D4] to-[#5B4BC4] text-white text-xs font-extrabold shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 text-[#BAE6FD]" />
                      Gemini AI Edition
                    </span>
                  </div>

                  <p className="text-[11px] font-bold text-[#292524] leading-tight">
                    AI Creative Production Studio • Alur terarah dari aset hingga prompt siap pakai.
                  </p>
                </div>
              </div>
            </div>

            {/* Single Primary CTA Button: + Proyek Baru */}
            <button
              onClick={resetForNewProject}
              className="w-full py-3.5 px-5 rounded-2xl bg-[#D97336] hover:bg-[#c86428] active:scale-[0.99] text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-[0_8px_18px_-4px_rgba(217,115,54,0.45)] transition"
            >
              <Plus className="w-5 h-5 stroke-[2.75]" />
              Proyek Baru
            </button>

            {/* Proyek Terbaru List */}
            <div className="space-y-2 pt-0.5">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-xs font-extrabold text-[#2C2A25]">Proyek Terbaru</h2>
                <button
                  onClick={() => setShowProjectsModal(true)}
                  className="text-[11px] font-bold text-[#9A3412] hover:underline"
                >
                  {savedProjects.length > 0 ? `Lihat Semua (${savedProjects.length})` : 'Riwayat Proyek'}
                </button>
              </div>

              {savedProjects.length === 0 ? (
                <div
                  onClick={resetForNewProject}
                  className="cursor-pointer p-3 rounded-2xl bg-white/90 border border-[#E5DEC9] hover:border-[#5D7B52] flex items-center justify-between gap-2.5 shadow-xs transition"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-[#EEF3EC] text-[#5D7B52] flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#2C2A25] truncate">
                        Mulai Proyek Pertama Kamu
                      </div>
                      <div className="text-[10px] text-[#6E6A5F] truncate">
                        Pilih kategori &amp; unggah foto seller
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#5D7B52] shrink-0" />
                </div>
              ) : (
                <div className="space-y-1.5">
                  {savedProjects.slice(0, 2).map((proj) => (
                    <div
                      key={proj.id}
                      onClick={() => handleLoadSavedProject(proj)}
                      className="cursor-pointer p-3 rounded-2xl bg-white/90 border border-[#E5DEC9] hover:border-[#5D7B52] flex items-center justify-between gap-2.5 shadow-xs transition"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-[#F3EAD8] text-[#9A3412] flex items-center justify-center shrink-0 font-extrabold text-[10px]">
                          {proj.category.slice(0, 3).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-[#2C2A25] truncate">
                            {proj.name}
                          </div>
                          <div className="text-[10px] text-[#6E6A5F] truncate">
                            {proj.stage} • {proj.clipSpec}
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#5D7B52] shrink-0" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <footer className="text-center text-[10px] text-[#8A8477] pt-1">
            GUREE.ID Creative Studio • Gemini AI Edition V1.0.7
          </footer>
        </div>
      )}

      {/* MODAL MANAJEMEN MULTI-API KEY & ANTI-LIMIT (APK READY) */}
      {showGeminiModal && (
        <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-[#FAF6EE] border border-[#E5DEC9] p-5 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#EEF3EC] text-[#5D7B52] flex items-center justify-center">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#2C2A25]">Pengaturan Gemini API Key</h3>
                  <p className={`text-[11px] font-bold ${apiKeys.length > 0 ? 'text-[#5D7B52]' : 'text-[#D97336]'}`}>
                    {apiKeys.length > 0
                      ? `● ${apiKeys.length} API Key Siap (Rotasi & Fallback Aktif)`
                      : '● Belum Ada API Key Tersimpan'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowGeminiModal(false)}
                className="w-8 h-8 rounded-full bg-white border border-[#E5DEC9] flex items-center justify-center text-[#2C2A25]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form Tambah API Key */}
            <div className="space-y-2">
              <label className="block text-[11px] font-extrabold text-[#2C2A25]">
                Tambah API Key (Google AI Studio — Maks. 5 Key)
              </label>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={newApiKeyInput}
                  onChange={(e) => setNewApiKeyInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddApiKey()}
                  placeholder="AIzaSy..."
                  className="flex-1 rounded-xl bg-white border border-[#E2D9C5] focus:border-[#5D7B52] px-3 py-2.5 text-xs text-[#2C2A25] outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddApiKey}
                  className="px-4 py-2.5 rounded-xl bg-[#D97336] hover:bg-[#c86428] text-white font-extrabold text-xs shrink-0"
                >
                  + Tambah
                </button>
              </div>
              <p className="text-[10px] text-[#6E6A5F] leading-relaxed">
                Disimpan lokal di perangkat (IndexedDB). Jika 1 key kena limit (429), aplikasi otomatis pindah ke key berikutnya atau turun ke model cadangan.
              </p>
            </div>

            {/* Daftar API Key Tersimpan */}
            <div className="space-y-1.5">
              {apiKeys.length === 0 ? (
                <div className="p-3 rounded-2xl bg-[#FEF9EC] border border-amber-300 text-[11px] text-amber-900">
                  Masukkan minimal 1 Gemini API Key agar analisa foto, konsep, naskah, storyboard, dan render gambar berjalan mandiri di APK.
                </div>
              ) : (
                apiKeys.map((k, idx) => (
                  <div
                    key={k}
                    className="px-3 py-2.5 rounded-2xl bg-white border border-[#E5DEC9] flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="px-2 py-0.5 rounded-md bg-[#EEF3EC] text-[#46633C] text-[10px] font-extrabold">
                        Key #{idx + 1}
                      </span>
                      <span className="text-xs font-mono text-[#2C2A25] truncate">
                        {maskApiKey(k)}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveApiKey(k)}
                      className="w-7 h-7 rounded-lg bg-[#FDF2F2] text-red-600 flex items-center justify-center hover:bg-red-100 shrink-0"
                      title="Hapus Key"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Info Jalur Fallback Anti-Limit */}
            <div className="p-3 rounded-2xl bg-white border border-[#E5DEC9] text-[11px] text-[#4E4A40] space-y-1">
              <strong className="text-[#2C2A25] block">Jalur Fallback Otomatis (Anti-429):</strong>
              <div>• <strong>Teks/Vision:</strong> gemini-3-flash-preview → gemini-2.5-flash → gemini-2.5-flash-lite</div>
              <div>• <strong>Gambar:</strong> gemini-3.1-flash-image → gemini-2.5-flash-image</div>
              <div>• <strong>Cooldown:</strong> 65 detik per slot key+model yang kena limit.</div>
            </div>

            <button
              onClick={() => setShowGeminiModal(false)}
              className="w-full py-3 rounded-2xl bg-[#5D7B52] text-white font-extrabold text-xs"
            >
              Selesai
            </button>
          </div>
        </div>
      )}

      {/* MODAL PROYEKKU */}
      {showProjectsModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl bg-[#FAF6EE] border border-[#E5DEC9] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-[#2C2A25]">Riwayat Proyekku</h3>
              <button
                onClick={() => setShowProjectsModal(false)}
                className="w-8 h-8 rounded-full bg-white border border-[#E5DEC9] flex items-center justify-center text-[#2C2A25]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            {savedProjects.length === 0 ? (
              <p className="text-xs text-[#6E6A5F] py-6 text-center">
                Belum ada proyek tersimpan. Tekan <strong>+ Proyek Baru</strong> untuk mulai!
              </p>
            ) : (
              <div className="space-y-2 max-h-72 overflow-y-auto">
                {savedProjects.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setShowProjectsModal(false);
                      handleLoadSavedProject(p);
                    }}
                    className="cursor-pointer p-3 rounded-2xl bg-white border border-[#E5DEC9] hover:border-[#5D7B52] flex items-center justify-between gap-2"
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#2C2A25] truncate">{p.name}</div>
                      <div className="text-[11px] text-[#6E6A5F]">
                        {p.category} • {p.clipSpec} • {p.updatedAt}
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={(e) => handleDeleteSavedProject(e, p.id)}
                        className="w-7 h-7 rounded-lg bg-[#FDF2F2] text-red-600 flex items-center justify-center hover:bg-red-100"
                        title="Hapus Proyek"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                      <ChevronRight className="w-4 h-4 text-[#5D7B52]" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SCREEN 1: BUAT PROYEK BARU (KATEGORI & SETUP VIDEO)                  */}
      {/* ==================================================================== */}
      {page === 1 && (
        <div className="flex-1 w-full pb-10 relative z-10">
          <StepNavigatorBar currentPage={page} maxUnlockedPage={maxUnlockedPage} onNavigate={setPage} />
          <EditorialTopHeader
            title="Buat Proyek Baru ✨"
            subtitle="Atur identitas proyek, kategori produksi, dan durasi klip video."
            onBack={() => setPage(0)}
          />

          <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-5 mt-2">
            {/* Nama Proyek & Preset Brand */}
            <ChatBubbleCard sender="Sutradara GUREE" roleTag="Setup Proyek">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#2C2A25] mb-1.5">
                    Nama proyek
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Contoh: Review Sunscreen / OOTD Cardigan"
                    className="w-full rounded-2xl bg-[#FAF6EE] border border-[#E2D9C5] focus:border-[#5D7B52] px-4 py-3 text-sm text-[#2C2A25] placeholder:text-[#9A9486] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#2C2A25] mb-1.5">
                    Preset Brand
                  </label>
                  <select
                    value={presetBrand}
                    onChange={(e) => setPresetBrand(e.target.value)}
                    className="w-full rounded-2xl bg-[#FAF6EE] border border-[#E2D9C5] focus:border-[#5D7B52] px-4 py-3 text-sm font-bold text-[#2C2A25] outline-none"
                  >
                    <option value="GUREE.ID">GUREE.ID — Creative Director V1.0.7</option>
                    <option value="GUREE-UGC">GUREE.ID — Natural TikTok Affiliate</option>
                    <option value="GUREE-TVC">GUREE.ID — Studio Commercial Pro</option>
                  </select>
                </div>
              </div>
            </ChatBubbleCard>

            {/* Kategori Produksi (Grid Kartu Seperti Referensi) */}
            <ChatBubbleCard sender="Asisten Produksi" roleTag="Pilih Kategori" tone="sage">
              <div className="space-y-2.5">
                <label className="block text-xs font-extrabold text-[#2C2A25]">
                  Kategori Produksi
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {CATALOG.map((cat) => {
                    const IconComp = cat.icon;
                    const active = selectedCategory.id === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat);
                          setSelectedSubcategory(cat.subcategories[0]);
                          if (!cat.hasPresetAPC) setUsePresetAPC(false);
                        }}
                        className={`relative p-3 rounded-2xl border-2 text-center flex flex-col items-center justify-center gap-2 transition active:scale-[0.98] ${
                          active
                            ? 'bg-white border-[#5D7B52] shadow-sm'
                            : 'bg-white/80 border-[#E5DEC9] hover:border-[#C5BCAA]'
                        }`}
                      >
                        {active && (
                          <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#D97336] text-white flex items-center justify-center shadow">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                        )}
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            active
                              ? 'bg-[#EEF3EC] text-[#5D7B52]'
                              : 'bg-[#FAF6EE] text-[#D97336]'
                          }`}
                        >
                          <IconComp className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] sm:text-xs font-extrabold text-[#2C2A25] leading-tight">
                          {cat.shortName}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </ChatBubbleCard>

            {/* Sub-Kategori */}
            <ChatBubbleCard sender="Sutradara GUREE" roleTag={selectedCategory.name}>
              <div className="space-y-3">
                <label className="block text-xs font-extrabold text-[#2C2A25]">
                  Sub-Kategori ({selectedCategory.name})
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedCategory.subcategories.map((sub) => {
                    const active = selectedSubcategory.id === sub.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => setSelectedSubcategory(sub)}
                        className={`p-3 rounded-2xl border text-left transition ${
                          active
                            ? 'bg-[#EEF3EC] border-[#5D7B52]'
                            : 'bg-[#FAF6EE] border-[#E5DEC9]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-[#2C2A25]">{sub.name}</span>
                          {active && <CheckCircle2 className="w-4 h-4 text-[#5D7B52]" />}
                        </div>
                        <p className="text-[11px] text-[#6E6A5F] mt-0.5">{sub.desc}</p>
                      </button>
                    );
                  })}
                </div>

                {selectedCategory.hasPresetAPC && (
                  <div className="p-3.5 rounded-2xl bg-[#FDF5E8] border border-[#E7CFA2] flex items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-extrabold text-[#B5591F]">
                        Preset Active Product Commercial — Multi-Shot
                      </div>
                      <p className="text-[11px] text-[#6E6A5F]">
                        ACTION FIRST, CAMERA SECOND. Aksi tangan/produk memimpin tiap shot.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={usePresetAPC}
                      onChange={(e) => setUsePresetAPC(e.target.checked)}
                      className="w-5 h-5 accent-[#D97336] rounded cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </ChatBubbleCard>

            {/* Durasi per Video, Jumlah Klip, Rasio & Editing */}
            <ChatBubbleCard sender="Editor & Kamera" roleTag={`${totalVideoDuration} Detik`}>
              <div className="space-y-4">
                {/* Durasi per video */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-extrabold text-[#2C2A25]">
                      Durasi per video
                    </label>
                    <span className="text-[11px] font-bold text-[#5D7B52]">
                      Total: {totalVideoDuration} detik
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[6, 8, 10, 15].map((sec) => {
                      const active = videoSpecs.durationPerClip === sec;
                      return (
                        <button
                          key={sec}
                          onClick={() => setVideoSpecs({ ...videoSpecs, durationPerClip: sec })}
                          className={`py-2.5 rounded-full text-xs font-extrabold border transition ${
                            active
                              ? 'bg-[#5D7B52] text-white border-[#5D7B52] shadow-sm'
                              : 'bg-[#FAF6EE] text-[#2C2A25] border-[#E2D9C5]'
                          }`}
                        >
                          {sec} dtk
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Jumlah Klip & Rasio */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-xs font-extrabold text-[#2C2A25] mb-1.5">
                      Jumlah Klip
                    </label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {[1, 2, 3, 4].map((cnt) => (
                        <button
                          key={cnt}
                          onClick={() => setVideoSpecs({ ...videoSpecs, clipCount: cnt })}
                          className={`py-2 rounded-xl text-xs font-extrabold border ${
                            videoSpecs.clipCount === cnt
                              ? 'bg-[#D97336] text-white border-[#D97336]'
                              : 'bg-[#FAF6EE] text-[#2C2A25] border-[#E2D9C5]'
                          }`}
                        >
                          {cnt}x
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-[#2C2A25] mb-1.5">
                      Rasio Aspek
                    </label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {['9:16', '16:9', '1:1'].map((r) => (
                        <button
                          key={r}
                          onClick={() => setVideoSpecs({ ...videoSpecs, aspectRatio: r })}
                          className={`py-2 rounded-xl text-xs font-extrabold border ${
                            videoSpecs.aspectRatio === r
                              ? 'bg-[#5D7B52] text-white border-[#5D7B52]'
                              : 'bg-[#FAF6EE] text-[#2C2A25] border-[#E2D9C5]'
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mode Editing Video */}
                <div className="pt-2 border-t border-[#EFE8D8] space-y-2.5">
                  <label className="block text-xs font-extrabold text-[#2C2A25]">
                    Mode Editing Video
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {EDITING_MODES.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setVideoSpecs({ ...videoSpecs, editingMode: m.id })}
                        className={`p-2.5 rounded-2xl border text-center transition ${
                          videoSpecs.editingMode === m.id
                            ? 'bg-[#EEF3EC] border-[#5D7B52] text-[#2C2A25]'
                            : 'bg-[#FAF6EE] border-[#E2D9C5] text-[#6E6A5F]'
                        }`}
                      >
                        <div className="text-[11px] font-extrabold">{m.name}</div>
                      </button>
                    ))}
                  </div>

                  {/* Panel Custom Editing: 5 Modul & 5 Pustaka Style */}
                  {videoSpecs.editingMode === 'custom' && (
                    <div className="p-3.5 rounded-2xl bg-[#FAF6EE] border border-[#E2D9C5] space-y-3 mt-2">
                      <div>
                        <div className="text-[11px] font-extrabold text-[#2C2A25] mb-1.5">
                          Pilih Modul Editing Aktif:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {EDITING_MODULES.map((mod) => {
                            const checked = videoSpecs.customModules.includes(mod.id);
                            return (
                              <button
                                key={mod.id}
                                type="button"
                                onClick={() => {
                                  setVideoSpecs((prev) => ({
                                    ...prev,
                                    customModules: checked
                                      ? prev.customModules.filter((id) => id !== mod.id)
                                      : [...prev.customModules, mod.id]
                                  }));
                                }}
                                className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold border transition ${
                                  checked
                                    ? 'bg-[#5D7B52] text-white border-[#5D7B52]'
                                    : 'bg-white text-[#4E4A40] border-[#E2D9C5]'
                                }`}
                              >
                                {checked ? '✓ ' : '+ '}
                                {mod.name}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <div className="text-[11px] font-extrabold text-[#2C2A25] mb-1.5">
                          Pustaka Style Visual:
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {STYLE_LIBRARY.map((st) => {
                            const activeStyle = videoSpecs.styleLibrary === st.id;
                            return (
                              <button
                                key={st.id}
                                type="button"
                                onClick={() =>
                                  setVideoSpecs((prev) => ({ ...prev, styleLibrary: st.id }))
                                }
                                className={`px-3 py-2 rounded-xl text-[11px] font-bold border text-left transition ${
                                  activeStyle
                                    ? 'bg-[#FDF1E8] border-[#D97336] text-[#2C2A25]'
                                    : 'bg-white border-[#E2D9C5] text-[#6E6A5F]'
                                }`}
                              >
                                {activeStyle ? '● ' : '○ '}
                                {st.name}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ChatBubbleCard>

            {/* Bottom Sage Green CTA Button */}
            <button
              onClick={() => {
                persistCurrentProjectToHistory('Data Produk', 2);
                setPage(2);
              }}
              className="w-full py-4 px-6 rounded-full bg-[#5D7B52] hover:bg-[#4F6B45] active:scale-[0.99] text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-lg shadow-[#5D7B52]/25 transition"
            >
              Buat Proyek ✨
            </button>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SCREEN 2: 01. DATA PRODUK (ASSET INGEST & GEMINI VISION ANALYSIS)    */}
      {/* ==================================================================== */}
      {page === 2 && (
        <div className="flex-1 w-full pb-10 relative z-10">
          <StepNavigatorBar currentPage={page} maxUnlockedPage={maxUnlockedPage} onNavigate={setPage} />
          <EditorialTopHeader
            stepNum="01."
            title="Data Produk"
            subtitle={`Terkunci pada: ${selectedCategory.name} → ${selectedSubcategory.name}`}
            onBack={() => setPage(1)}
            rightBadge={`${selectedSubcategory.name} • ${totalVideoDuration} dtk`}
          />

          <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-4 mt-2">
            {/* Info Banner Kebutuhan Karakter Sesuai Sub-Kategori */}
            <ChatBubbleCard
              sender="Gemini Vision AI"
              roleTag={selectedSubcategory.name}
              tone={selectedSubcategory.needsCharacter ? 'studio' : 'sage'}
            >
              <div className="text-xs flex items-start gap-2.5">
                <Info className="w-4 h-4 shrink-0 mt-0.5 text-[#D97336]" />
                <div>
                  <strong className="block text-[#2C2A25]">
                    Panduan Aset Sub-Kategori: {selectedSubcategory.name}
                  </strong>
                  <span className="text-[#4E4A40]">{selectedSubcategory.characterNote}</span>
                </div>
              </div>
            </ChatBubbleCard>

            {/* 4 Asset Category Cards (Produk, Karakter, Lingkungan, Referensi Visual) */}
            <div className="grid grid-cols-2 gap-2.5">
              {[
                {
                  id: 'produk',
                  label: 'Produk',
                  badge: 'Wajib',
                  count: productPhotos.length,
                  max: 3,
                  color: 'bg-[#E9EFE4] border-[#5D7B52]'
                },
                {
                  id: 'karakter',
                  label: selectedSubcategory.needsCharacter ? 'Karakter' : 'Karakter / Tangan',
                  badge: selectedSubcategory.needsCharacter ? 'Disarankan' : 'Opsional',
                  count: characterPhotos.length,
                  max: 3,
                  color: 'bg-[#FDF1E8] border-[#D97336]'
                },
                {
                  id: 'lingkungan',
                  label: 'Lingkungan',
                  badge: 'Opsional',
                  count: environmentPhotos.length,
                  max: 2,
                  color: 'bg-[#E9EFE4] border-[#5D7B52]'
                },
                {
                  id: 'referensi',
                  label: 'Referensi Visual',
                  badge: 'Opsional',
                  count: extraVisualRefs.length,
                  max: 3,
                  color: 'bg-[#F2EEF8] border-[#9B87C4]'
                }
              ].map((tab) => {
                const isSelected = activeAssetTab === tab.id;
                const isMutedOptional = tab.id === 'karakter' && !selectedSubcategory.needsCharacter;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveAssetTab(tab.id)}
                    className={`p-3.5 rounded-2xl border-2 text-left flex items-center justify-between transition ${
                      isSelected
                        ? `${tab.color} shadow-xs`
                        : isMutedOptional
                        ? 'bg-[#F6F1E6] border-[#E5DEC9] opacity-80 hover:opacity-100'
                        : 'bg-white border-[#E5DEC9] hover:border-[#C7BEA9]'
                    }`}
                  >
                    <div>
                      <div className="text-xs sm:text-sm font-extrabold text-[#2C2A25]">
                        {tab.label} ({tab.count})
                      </div>
                      <div className="text-[10px] text-[#6E6A5F]">
                        {tab.badge} • Maks. {tab.max} foto
                      </div>
                    </div>
                    <span className="px-2 py-1 rounded-lg bg-white/80 text-[10px] font-bold text-[#2C2A25]">
                      {isSelected ? 'Aktif' : 'Pilih'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Upload Zone */}
            <ChatBubbleCard sender="Asisten Aset" roleTag={`Unggah ${activeAssetTab}`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-[#2C2A25] uppercase tracking-wide">
                    Unggah Foto {activeAssetTab}
                  </span>
                  <label className="cursor-pointer px-3.5 py-1.5 rounded-full bg-[#D97336] hover:bg-[#c86428] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs">
                    <Upload className="w-3.5 h-3.5" /> Pilih Foto
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleUploadAsset(e, activeAssetTab)}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Thumbnails for active bucket */}
                {(() => {
                  const list =
                    activeAssetTab === 'produk'
                      ? productPhotos
                      : activeAssetTab === 'karakter'
                      ? characterPhotos
                      : activeAssetTab === 'lingkungan'
                      ? environmentPhotos
                      : extraVisualRefs;

                  if (list.length === 0) {
                    return (
                      <label className="cursor-pointer h-24 rounded-2xl border-2 border-dashed border-[#DED5C0] bg-[#FAF6EE] flex flex-col items-center justify-center text-center p-3 hover:border-[#5D7B52] transition">
                        <Camera className="w-5 h-5 text-[#8A8477] mb-1" />
                        <span className="text-xs font-semibold text-[#6E6A5F]">
                          Tap untuk unggah foto {activeAssetTab}
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => handleUploadAsset(e, activeAssetTab)}
                          className="hidden"
                        />
                      </label>
                    );
                  }

                  return (
                    <div className="grid grid-cols-3 gap-2.5">
                      {list.map((item) => (
                        <div
                          key={item.id}
                          className="relative rounded-2xl overflow-hidden border border-[#E5DEC9] bg-[#FAF6EE]"
                        >
                          <img
                            src={item.url}
                            alt={item.label}
                            className="w-full h-24 object-cover"
                          />
                          <div className="p-1.5 bg-white/95 text-[10px] font-bold text-[#2C2A25] truncate">
                            {item.label}
                          </div>
                          <button
                            onClick={() => {
                              if (activeAssetTab === 'produk')
                                setProductPhotos((p) => p.filter((x) => x.id !== item.id));
                              else if (activeAssetTab === 'karakter')
                                setCharacterPhotos((p) => p.filter((x) => x.id !== item.id));
                              else if (activeAssetTab === 'lingkungan')
                                setEnvironmentPhotos((p) => p.filter((x) => x.id !== item.id));
                              else setExtraVisualRefs((p) => p.filter((x) => x.id !== item.id));
                            }}
                            className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/65 text-white flex items-center justify-center"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                })()}

                {/* Gemini Vision Auto-Analyze Button */}
                <button
                  onClick={handleAnalyzePhotosWithGemini}
                  disabled={loadingVisionAnalysis}
                  className="w-full py-3 px-4 rounded-2xl bg-[#EEF3EC] hover:bg-[#E1EBD9] border border-[#B8CBB0] text-[#3B5731] font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition disabled:opacity-60"
                >
                  {loadingVisionAnalysis ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Gemini Vision Sedang Menganalisa Foto...
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      Analisa Semua Foto dengan Gemini AI
                    </>
                  )}
                </button>
              </div>
            </ChatBubbleCard>

            {/* Kartu 'Produk Utama' dalam Gelembung Obrolan */}
            <ChatBubbleCard sender="Product DNA Lock" roleTag="Data Faktual">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Preview Thumbnail Produk */}
                  <div className="w-full sm:w-32 h-40 sm:h-auto rounded-2xl bg-[#FAF6EE] border border-[#E5DEC9] flex items-center justify-center overflow-hidden shrink-0">
                    {productPhotos[0] ? (
                      <img
                        src={productPhotos[0].url}
                        alt="Produk Utama"
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <div className="text-center p-3">
                        <ImageIcon className="w-7 h-7 text-[#B5AE9E] mx-auto mb-1" />
                        <span className="text-[10px] text-[#8A8477] block">Foto Produk</span>
                      </div>
                    )}
                  </div>

                  {/* Factual Fields */}
                  <div className="flex-1 space-y-3">
                    <div>
                      <span className="inline-block px-3 py-0.5 rounded-full bg-[#D97336] text-white text-[11px] font-extrabold">
                        Produk Utama
                      </span>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#6E6A5F]">Merek</label>
                      <AutoGrowTextarea
                        value={productData.brandName}
                        onChange={(e) =>
                          setProductData({ ...productData, brandName: e.target.value })
                        }
                        placeholder="Contoh: Implora"
                        className="w-full border-b border-[#E5DEC9] focus:border-[#5D7B52] py-1 text-sm font-extrabold text-[#2C2A25] bg-transparent outline-none leading-snug"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#6E6A5F]">Nama produk</label>
                      <AutoGrowTextarea
                        value={productData.productTitle}
                        onChange={(e) =>
                          setProductData({ ...productData, productTitle: e.target.value })
                        }
                        placeholder="Contoh: Perfect Shield Sunscreen"
                        className="w-full border-b border-[#E5DEC9] focus:border-[#5D7B52] py-1 text-sm font-extrabold text-[#2C2A25] bg-transparent outline-none leading-snug"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#6E6A5F]">
                        Ukuran / Varian
                      </label>
                      <AutoGrowTextarea
                        value={productData.sizeVariant}
                        onChange={(e) =>
                          setProductData({ ...productData, sizeVariant: e.target.value })
                        }
                        placeholder="Contoh: SPF 40 PA++++ (50 ml)"
                        className="w-full border-b border-[#E5DEC9] focus:border-[#5D7B52] py-1 text-sm font-bold text-[#2C2A25] bg-transparent outline-none leading-snug"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Factual Attributes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#EFE8D8]">
                  <div>
                    <label className="block text-[11px] font-bold text-[#6E6A5F] mb-1">
                      Bahan, Warna &amp; Tekstur
                    </label>
                    <AutoGrowTextarea
                      minRows={2}
                      value={`${productData.materialTexture}${productData.colorLighting ? ' • ' + productData.colorLighting : ''}`}
                      onChange={(e) =>
                        setProductData({ ...productData, materialTexture: e.target.value, colorLighting: '' })
                      }
                      placeholder="Tube matte putih-oranye, tutup flip"
                      className="w-full rounded-xl bg-[#FAF6EE] border border-[#E5DEC9] px-3 py-2 text-xs text-[#2C2A25] outline-none leading-relaxed"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-[#6E6A5F] mb-1">
                      Klaim Valid / Teks Kemasan
                    </label>
                    <AutoGrowTextarea
                      minRows={2}
                      value={productData.validClaims || productData.logoVerbatim}
                      onChange={(e) =>
                        setProductData({ ...productData, validClaims: e.target.value })
                      }
                      placeholder="Ringan, tidak lengket, tanpa white cast"
                      className="w-full rounded-xl bg-[#FAF6EE] border border-[#E5DEC9] px-3 py-2 text-xs text-[#2C2A25] outline-none leading-relaxed"
                    />
                  </div>
                </div>

                {(productData.characterProfile || productData.environmentProfile) && (
                  <div className="p-3 rounded-2xl bg-[#FAF6EE] border border-[#E5DEC9] space-y-1.5 text-xs">
                    {productData.characterProfile && (
                      <p className="text-[#4E4A40]">
                        <strong className="text-[#D97336]">Karakter:</strong> {productData.characterProfile}
                      </p>
                    )}
                    {productData.environmentProfile && (
                      <p className="text-[#4E4A40]">
                        <strong className="text-[#5D7B52]">Lingkungan:</strong> {productData.environmentProfile}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </ChatBubbleCard>

            {/* Bottom CTA */}
            <button
              onClick={() => handleGenerateConcepts()}
              disabled={loadingConcepts}
              className="w-full py-4 px-6 rounded-full bg-[#5D7B52] hover:bg-[#4F6B45] active:scale-[0.99] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#5D7B52]/25 transition disabled:opacity-60"
            >
              {loadingConcepts ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Meracik 5 Konsep Kreatif...
                </>
              ) : (
                <>
                  Lanjut ke 02. Konsep Kreatif
                  <ChevronRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SCREEN 3: 02. KONSEP KREATIF (5 IDE KARTU PILIHAN)                   */}
      {/* ==================================================================== */}
      {page === 3 && (
        <div className="flex-1 w-full pb-10 relative z-10">
          <StepNavigatorBar currentPage={page} maxUnlockedPage={maxUnlockedPage} onNavigate={setPage} />
          <EditorialTopHeader
            stepNum="02."
            title="Konsep Kreatif"
            subtitle="Pilih 1 dari 5 ide terbaik untuk dikembangkan."
            onBack={() => setPage(2)}
          />

          <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-3.5 mt-2">
            <ChatBubbleCard sender="Creative Director AI" roleTag="5 Rekomendasi Konsep" tone="sage">
              <div className="space-y-3">
                {concepts.map((c, idx) => {
                  const isSelected = selectedConceptId === c.id;
                  return (
                    <div
                      key={c.id}
                      onClick={() => setSelectedConceptId(c.id)}
                      className={`cursor-pointer p-4 rounded-2xl rounded-tl-md border-2 transition flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-white border-[#5D7B52] shadow-md'
                          : 'bg-white/90 border-[#E5DEC9] hover:border-[#C5BCAA]'
                      }`}
                    >
                      <div className="flex items-start gap-3.5 min-w-0">
                        <div
                          className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 ${
                            isSelected
                              ? 'bg-[#EEF3EC] text-[#5D7B52]'
                              : 'bg-[#FDF1E8] text-[#D97336]'
                          }`}
                        >
                          <Clapperboard className="w-5 h-5" />
                        </div>
                        <div className="min-w-0 space-y-1">
                          <div className="text-sm font-extrabold text-[#2C2A25]">
                            <span className="text-[#D97336] mr-1.5">0{idx + 1}</span>
                            {c.title}
                          </div>
                          <p className="text-xs text-[#6E6A5F] leading-snug">{c.subtitle}</p>
                          <p className="text-[11px] text-[#5D7B52] font-semibold">
                            Kamera: {c.cameraTrigger}
                          </p>
                        </div>
                      </div>

                      {/* Radio / Checkmark Circle */}
                      <div
                        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 transition ${
                          isSelected
                            ? 'bg-[#5D7B52] border-[#5D7B52] text-white'
                            : 'border-[#C8C0AE] bg-[#FAF6EE]'
                        }`}
                      >
                        {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </ChatBubbleCard>

            {/* Optional Revision Input */}
            <ChatBubbleCard sender="Arahan Sutradara" roleTag="Style Terkunci">
              <div className="space-y-2.5">
                <div className="p-2.5 rounded-xl bg-[#FAF6EE] border border-[#EFE8D8] text-[11px] text-[#4E4A40]">
                  <strong className="text-[#5D7B52] block mb-0.5">
                    Style Video Terkunci ({selectedCategory.name} — {selectedSubcategory.name}):
                  </strong>
                  <span>{SUBCATEGORY_DIRECTIVES[selectedSubcategory.id]}</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={conceptRevisionNote}
                    onChange={(e) => setConceptRevisionNote(e.target.value)}
                    placeholder="Catatan revisi ide konsep AI (opsional)..."
                    className="flex-1 text-xs bg-[#FAF6EE] border border-[#E2D9C5] rounded-xl px-3 py-2 outline-none"
                  />
                  <button
                    onClick={() => handleGenerateConcepts(conceptRevisionNote)}
                    disabled={loadingConcepts}
                    className="px-3.5 py-2 rounded-xl bg-[#FDF1E8] text-[#D97336] font-bold text-xs flex items-center gap-1 shrink-0"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loadingConcepts ? 'animate-spin' : ''}`} />
                    Ulangi
                  </button>
                </div>
              </div>
            </ChatBubbleCard>

            <div className="pt-2">
              <button
                onClick={handleProceedToAudio}
                disabled={!selectedConceptId}
                className="w-full py-4 px-6 rounded-full bg-[#5D7B52] hover:bg-[#4F6B45] active:scale-[0.99] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#5D7B52]/25 transition disabled:opacity-50"
              >
                Lanjut ke 03. Naskah &amp; Audio
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SCREEN 4: 03. NASKAH & AUDIO (VO/DIALOG/ASMR/SILENT + ALTERNATIF)    */}
      {/* ==================================================================== */}
      {page === 4 && (
        <div className="flex-1 w-full pb-10 relative z-10">
          <StepNavigatorBar currentPage={page} maxUnlockedPage={maxUnlockedPage} onNavigate={setPage} />
          <EditorialTopHeader
            stepNum="03."
            title="Naskah & Audio"
            subtitle="Pilih dan kunci naskah terbaik."
            onBack={() => setPage(3)}
          />

          <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-4 mt-2">
            {/* 4 Audio Mode Circles (VO, Dialog, ASMR, Silent) */}
            <div className="grid grid-cols-4 gap-2.5">
              {[
                { id: 'VO', label: 'VO', icon: Mic },
                { id: 'Dialog', label: 'Dialog', icon: MessageSquare },
                { id: 'ASMR', label: 'ASMR', icon: Volume2 },
                { id: 'Silent', label: 'Silent', icon: Film }
              ].map((m) => {
                const IconComp = m.icon;
                const active = audioConfig.mode === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      setAudioConfig((prev) => ({ ...prev, mode: m.id }));
                      handleGenerateThreeScriptAlternatives(null, m.id);
                    }}
                    className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1.5 transition ${
                      active
                        ? 'bg-[#E9EFE4] border-[#5D7B52] shadow-xs'
                        : 'bg-white border-[#E5DEC9]'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        active ? 'bg-[#5D7B52] text-white' : 'bg-[#FAF6EE] text-[#6E6A5F]'
                      }`}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-extrabold text-[#2C2A25]">{m.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Alternatif 01 / 02 / 03 Pills */}
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((idx) => {
                const active = audioConfig.activeAltIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() =>
                      setAudioConfig((prev) => ({ ...prev, activeAltIndex: idx, isEditingScript: false }))
                    }
                    className={`py-2.5 rounded-full text-xs font-extrabold border transition ${
                      active
                        ? 'bg-[#46633C] text-white border-[#46633C] shadow-xs'
                        : 'bg-white text-[#2C2A25] border-[#E5DEC9]'
                    }`}
                  >
                    {idx === 0 ? 'Alternatif 01' : `0${idx + 1}`}
                  </button>
                );
              })}
            </div>

            {/* Warm Sage-Cream Quote Card */}
            <ChatBubbleCard
              sender="Scriptwriter & Audio AI"
              roleTag={`Alternatif 0${audioConfig.activeAltIndex + 1} • ${audioConfig.mode}`}
              tone="sage"
            >
              <div className="space-y-4">
                {loadingScript ? (
                  <div className="py-10 text-center space-y-2">
                    <RefreshCw className="w-6 h-6 text-[#5D7B52] animate-spin mx-auto" />
                    <p className="text-xs font-bold text-[#46633C]">
                      Menulis 3 alternatif naskah sesuai batas kata...
                    </p>
                  </div>
                ) : audioConfig.isEditingScript ? (
                  <AutoGrowTextarea
                    minRows={4}
                    value={currentScript}
                    onChange={(e) => {
                      const val = e.target.value;
                      setAudioConfig((prev) => {
                        const copy = [...prev.alternatives];
                        copy[prev.activeAltIndex] = val;
                        return { ...prev, alternatives: copy };
                      });
                    }}
                    className="w-full rounded-2xl bg-white border border-[#5D7B52] p-3.5 text-sm text-[#2C2A25] leading-relaxed outline-none"
                  />
                ) : (
                  <div className="text-center px-2 py-2">
                    <p className="text-sm sm:text-base font-bold text-[#2C2A25] leading-relaxed">
                      <span className="text-2xl text-[#7C9A6D] font-serif mr-1">“</span>
                      {currentScript || 'Memuat naskah...'}
                      <span className="text-2xl text-[#7C9A6D] font-serif ml-1">”</span>
                    </p>
                  </div>
                )}

                {/* Estimasi Kata & Durasi */}
                <div className="pt-3 border-t border-[#D4E0CD] flex items-center justify-center gap-4 text-xs font-bold text-[#4E5A47]">
                  <span>
                    Estimasi: <strong className={isWordCountHealthy ? 'text-[#2C2A25]' : 'text-red-600'}>±{scriptWordCount} kata</strong>
                  </span>
                  <span>|</span>
                  <span>
                    Durasi: <strong className="text-[#2C2A25]">±{estDurationSec || totalVideoDuration} dtk</strong>
                  </span>
                </div>
              </div>
            </ChatBubbleCard>

            {/* Bottom Dual Buttons: Edit & ACC & Kunci */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={() =>
                  setAudioConfig((prev) => ({ ...prev, isEditingScript: !prev.isEditingScript }))
                }
                className="py-3.5 px-4 rounded-full bg-white hover:bg-[#F5EFE3] border border-[#D8CEB8] text-[#2C2A25] font-extrabold text-sm flex items-center justify-center gap-2 shadow-xs"
              >
                <Edit3 className="w-4 h-4 text-[#5D7B52]" />
                {audioConfig.isEditingScript ? 'Selesai Edit' : 'Edit'}
              </button>

              <button
                onClick={handleAccAudioAndBuildStoryboard}
                disabled={loadingStoryboard}
                className="py-3.5 px-4 rounded-full bg-[#5D7B52] hover:bg-[#4F6B45] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-md shadow-[#5D7B52]/25"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                ACC &amp; Kunci
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SCREEN 5: 04. STORYBOARD (VIDEO TABS + SHOT CARDS + AUDIT FISIKA)    */}
      {/* ==================================================================== */}
      {page === 5 && (
        <div className="flex-1 w-full pb-10 relative z-10">
          <StepNavigatorBar currentPage={page} maxUnlockedPage={maxUnlockedPage} onNavigate={setPage} />
          <EditorialTopHeader
            stepNum="04."
            title="Storyboard"
            subtitle="Susun adegan setiap video secara detail."
            onBack={() => setPage(4)}
          />

          <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-4 mt-2">
            {loadingStoryboard ? (
              <ChatBubbleCard sender="Sutradara & Fisika AI" roleTag="Memproses Adegan">
                <div className="py-10 text-center space-y-3">
                  <RefreshCw className="w-8 h-8 text-[#5D7B52] animate-spin mx-auto" />
                  <div className="text-sm font-extrabold text-[#2C2A25]">
                    Menyusun Adegan &amp; Audit Fisika/Kamera...
                  </div>
                  <p className="text-xs text-[#6E6A5F]">
                    Memastikan setiap shot bebas timestamp dan sesuai skala nyata.
                  </p>
                </div>
              </ChatBubbleCard>
            ) : storyboard ? (
              <>
                {/* Video Clip Tabs (Video 01, Video 02, ...) */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {storyboard.videos.map((v, idx) => {
                    const active = activeVideoTab === idx;
                    return (
                      <button
                        key={v.videoNumber}
                        onClick={() => setActiveVideoTab(idx)}
                        className={`px-4 py-2 rounded-full text-xs font-extrabold whitespace-nowrap border transition ${
                          active
                            ? 'bg-[#5D7B52] text-white border-[#5D7B52] shadow-xs'
                            : 'bg-white text-[#2C2A25] border-[#E5DEC9]'
                        }`}
                      >
                        Video 0{v.videoNumber} ({v.durationSec || videoSpecs.durationPerClip} dtk)
                      </button>
                    );
                  })}
                </div>

                {/* Active Video Shots */}
                {storyboard.videos[activeVideoTab] && (
                  <ChatBubbleCard
                    sender="Storyboard Director"
                    roleTag={`Video Independen 0${storyboard.videos[activeVideoTab].videoNumber}`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-[#EFE8D8] pb-2.5">
                        <span className="text-sm font-extrabold text-[#2C2A25]">
                          Video Independen 0{storyboard.videos[activeVideoTab].videoNumber}
                        </span>
                        <span className="text-xs font-bold text-[#5D7B52]">
                          ⏱ {storyboard.videos[activeVideoTab].durationSec || videoSpecs.durationPerClip} detik
                        </span>
                      </div>

                      <div className="space-y-3">
                        {storyboard.videos[activeVideoTab].shots.map((sh, sIdx) => (
                          <div
                            key={sIdx}
                            className="p-3.5 rounded-2xl rounded-tl-md bg-[#FAF6EE] border border-[#E5DEC9] space-y-2.5"
                          >
                            <div className="flex items-center justify-between">
                              <span className="px-2.5 py-0.5 rounded-full bg-[#EEF3EC] text-[#46633C] text-[11px] font-extrabold">
                                {sh.shotLabel}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-[#8A8477]">
                                  Audit Fisika ✓
                                </span>
                                {storyboard.videos[activeVideoTab].shots.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setStoryboard((prev) => ({
                                        ...prev,
                                        videos: prev.videos.map((vid, vIdx) =>
                                          vIdx === activeVideoTab
                                            ? {
                                                ...vid,
                                                shots: vid.shots
                                                  .filter((_, idx2) => idx2 !== sIdx)
                                                  .map((item, newIdx) => ({
                                                    ...item,
                                                    shotLabel: `Shot 0${newIdx + 1}`
                                                  }))
                                              }
                                            : vid
                                        )
                                      }));
                                    }}
                                    className="w-6 h-6 rounded-full bg-[#FDF2F2] text-red-600 flex items-center justify-center hover:bg-red-100"
                                    title="Hapus Shot"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                            </div>

                            <AutoGrowTextarea
                              minRows={2}
                              value={sh.visualAction}
                              onChange={(e) => {
                                const val = e.target.value;
                                setStoryboard((prev) => ({
                                  ...prev,
                                  videos: prev.videos.map((vid, vIdx) =>
                                    vIdx === activeVideoTab
                                      ? {
                                          ...vid,
                                          shots: vid.shots.map((item, idx2) =>
                                            idx2 === sIdx ? { ...item, visualAction: val } : item
                                          )
                                        }
                                      : vid
                                  )
                                }));
                              }}
                              className="w-full rounded-xl bg-white border border-[#E5DEC9] p-2.5 text-xs text-[#2C2A25] leading-relaxed outline-none"
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                              <div className="p-2 rounded-xl bg-white border border-[#E5DEC9] flex items-center gap-2">
                                <Camera className="w-3.5 h-3.5 text-[#5D7B52] shrink-0" />
                                <span className="text-[#2C2A25]">
                                  <strong>Kamera:</strong> {sh.camera}
                                </span>
                              </div>
                              <div className="p-2 rounded-xl bg-white border border-[#E5DEC9] flex items-center gap-2">
                                <Sparkles className="w-3.5 h-3.5 text-[#D97336] shrink-0" />
                                <span className="text-[#2C2A25]">
                                  <strong>Ekspresi:</strong> {sh.expression}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Dual Bottom Buttons: + Tambah Shot & + ACC Storyboard */}
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        <button
                          onClick={() => {
                            setStoryboard((prev) => ({
                              ...prev,
                              videos: prev.videos.map((vid, vIdx) =>
                                vIdx === activeVideoTab
                                  ? {
                                      ...vid,
                                      shots: [
                                        ...vid.shots,
                                        {
                                          shotLabel: `Shot 0${vid.shots.length + 1}`,
                                          visualAction: 'Close-up detail kemasan produk di tangan dengan pencahayaan natural.',
                                          camera: 'Close-up 20 cm, push-in fisik lembut',
                                          expression: 'Fokus & antusias natural'
                                        }
                                      ]
                                    }
                                  : vid
                              )
                            }));
                          }}
                          className="py-3.5 px-4 rounded-full bg-white hover:bg-[#FAF6EE] border border-[#D8CEB8] text-[#2C2A25] font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5"
                        >
                          <Plus className="w-4 h-4" /> Tambah Shot
                        </button>

                        <button
                          onClick={handleAccStoryboardAndBuildPrompts}
                          disabled={loadingFinal}
                          className="py-3.5 px-4 rounded-full bg-[#5D7B52] hover:bg-[#4F6B45] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-md shadow-[#5D7B52]/25"
                        >
                          <Sparkles className="w-4 h-4" /> ACC Storyboard
                        </button>
                      </div>
                    </div>
                  </ChatBubbleCard>
                )}
              </>
            ) : null}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SCREEN 6: 05. REFERENSI VISUAL (DIRECT IMAGE GENERATION IN CANVAS)   */}
      {/* ==================================================================== */}
      {page === 6 && (
        <div className="flex-1 w-full pb-10 relative z-10">
          <StepNavigatorBar currentPage={page} maxUnlockedPage={maxUnlockedPage} onNavigate={setPage} />
          <EditorialTopHeader
            stepNum="05."
            title="Referensi Visual"
            subtitle="Siapkan gambar acuan untuk menjaga konsistensi karakter, produk, dan adegan."
            onBack={() => setPage(5)}
          />

          <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-4 mt-2">
            {loadingFinal ? (
              <ChatBubbleCard sender="Gemini Image Studio" roleTag="Menyusun Visual">
                <div className="py-10 text-center space-y-3">
                  <RefreshCw className="w-8 h-8 text-[#D97336] animate-spin mx-auto" />
                  <div className="text-sm font-extrabold text-[#2C2A25]">
                    Menyiapkan Prompt Referensi Visual &amp; Product DNA...
                  </div>
                </div>
              </ChatBubbleCard>
            ) : (
              <>
                {/* 2 Featured Visual Generator Cards: Master Visual Reference & Product DNA */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Card 1: Master Visual Reference */}
                  <div className="p-4 rounded-3xl rounded-tl-md bg-[#EEF3EC] border-2 border-[#7C9A6D] shadow-sm flex flex-col justify-between space-y-3 relative">
                    <span className="absolute -top-2.5 -right-2 w-6 h-6 rounded-full bg-[#D97336] text-white flex items-center justify-center shadow">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>

                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-extrabold text-[#2C2A25]">
                          Master Visual Reference (Multi-Panel)
                        </span>
                      </div>
                      <p className="text-[11px] text-[#4E5A47]">
                        Grid multi-panel menyesuaikan adegan Storyboard ({selectedSubcategory.name}) rasio {videoSpecs.aspectRatio}.
                      </p>

                      {masterImageUrl ? (
                        <div className="rounded-2xl overflow-hidden border border-[#C3D3BA] bg-white">
                          <img
                            src={masterImageUrl}
                            alt="Master Visual Reference"
                            className="w-full h-auto object-contain mx-auto"
                          />
                          <div className="p-2 flex justify-between items-center bg-[#FAF6EE] border-t border-[#E5DEC9]">
                            <span className="text-[10px] font-bold text-[#46633C]">✓ Multi-Panel Siap</span>
                            <button
                              type="button"
                              onClick={() =>
                                handleDownloadDataUrlImage(
                                  masterImageUrl,
                                  '02_Master_Visual_MultiPanel.png'
                                )
                              }
                              className="px-2.5 py-1 rounded-lg bg-[#5D7B52] text-white text-[10px] font-bold flex items-center gap-1"
                            >
                              <Download className="w-3 h-3" /> Unduh PNG
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="h-36 rounded-2xl bg-white/80 border border-dashed border-[#A8BC9E] flex flex-col items-center justify-center text-center p-3">
                          <Sparkles className="w-6 h-6 text-[#5D7B52] mb-1" />
                          <span className="text-[11px] font-semibold text-[#4E5A47]">
                            Render gambar multi-panel sesuai alur Storyboard
                          </span>
                        </div>
                      )}

                      <div>
                        <label className="block text-[10px] font-bold text-[#4E5A47] mb-1">
                          Prompt Gambar Master Visual Multi-Panel (fleksibel):
                        </label>
                        <AutoGrowTextarea
                          minRows={3}
                          value={masterImagePrompt}
                          onChange={(e) => {
                            const val = e.target.value;
                            setMasterImagePrompt(val);
                            setFinalOutput((prev) =>
                              prev ? { ...prev, masterImagePrompt: val } : prev
                            );
                          }}
                          className="w-full rounded-xl bg-white border border-[#C3D3BA] p-2.5 text-[11px] text-[#2C2A25] leading-relaxed outline-none"
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleRenderMasterVisual}
                      disabled={loadingMasterImage}
                      className="w-full py-3 px-3 rounded-2xl bg-[#5D7B52] hover:bg-[#4F6B45] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-60"
                    >
                      {loadingMasterImage ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          Merender Multi-Panel Visual...
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-3.5 h-3.5" />
                          {masterImageUrl ? 'Generate Ulang Master Visual' : 'Generate Master Visual AI'}
                        </>
                      )}
                    </button>
                  </div>

                  {/* Card 2: Product DNA Multi-Panel Sheet */}
                  <div className="p-4 rounded-3xl rounded-tl-md bg-white border border-[#E5DEC9] shadow-sm flex flex-col justify-between space-y-3">
                    <div className="space-y-2.5">
                      <span className="text-sm font-extrabold text-[#2C2A25] block">
                        Product DNA (Multi-Panel Sheet)
                      </span>
                      <p className="text-[11px] text-[#6E6A5F]">
                        4 panel dalam 1 gambar: Depan, Makro Logo, Samping, &amp; Tutup/Detail Mekanisme.
                      </p>

                      {dnaImageUrl ? (
                        <div className="rounded-2xl overflow-hidden border border-[#E5DEC9] bg-[#FAF6EE]">
                          <img
                            src={dnaImageUrl}
                            alt="Product DNA Reference"
                            className="w-full h-auto object-contain mx-auto"
                          />
                          <div className="p-2 flex justify-between items-center bg-white border-t border-[#E5DEC9]">
                            <span className="text-[10px] font-bold text-[#D97336]">✓ 4-Panel DNA Siap</span>
                            <button
                              type="button"
                              onClick={() =>
                                handleDownloadDataUrlImage(dnaImageUrl, '01_Product_DNA_Sheet.png')
                              }
                              className="px-2.5 py-1 rounded-lg bg-[#D97336] text-white text-[10px] font-bold flex items-center gap-1"
                            >
                              <Download className="w-3 h-3" /> Unduh PNG
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="h-36 rounded-2xl bg-[#FAF6EE] border border-dashed border-[#DED5C0] flex flex-col items-center justify-center text-center p-3">
                          <ImageIcon className="w-6 h-6 text-[#D97336] mb-1" />
                          <span className="text-[11px] font-semibold text-[#6E6A5F]">
                            Render 4-panel Product DNA (Depan, Logo, Samping, Tutup/Detail)
                          </span>
                        </div>
                      )}

                      <div>
                        <label className="block text-[10px] font-bold text-[#6E6A5F] mb-1">
                          Prompt Gambar Product DNA Multi-Panel (fleksibel):
                        </label>
                        <AutoGrowTextarea
                          minRows={3}
                          value={dnaImagePrompt}
                          onChange={(e) => {
                            const val = e.target.value;
                            setDnaImagePrompt(val);
                            setFinalOutput((prev) =>
                              prev ? { ...prev, productDnaImagePrompt: val } : prev
                            );
                          }}
                          className="w-full rounded-xl bg-[#FAF6EE] border border-[#E5DEC9] p-2.5 text-[11px] text-[#2C2A25] leading-relaxed outline-none"
                        />
                      </div>
                    </div>

                    <button
                      onClick={handleRenderProductDna}
                      disabled={loadingDnaImage}
                      className="w-full py-3 px-3 rounded-2xl bg-[#D97336] hover:bg-[#c86428] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-60"
                    >
                      {loadingDnaImage ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          Merender 4-Panel DNA...
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-3.5 h-3.5" />
                          {dnaImageUrl ? 'Generate Ulang Product DNA' : 'Generate Product DNA AI'}
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Galeri Referensi Strip */}
                <ChatBubbleCard sender="Galeri Studio" roleTag={`${combinedGallery.length} Aset`}>
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-[#2C2A25]">
                        Galeri Referensi ({combinedGallery.length})
                      </span>
                      <button
                        onClick={() => setPage(2)}
                        className="text-[11px] font-bold text-[#D97336] flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Tambah Foto
                      </button>
                    </div>

                    <div className="grid grid-cols-4 gap-2">
                      {combinedGallery.map((item) => (
                        <div
                          key={item.id}
                          className="rounded-xl overflow-hidden border border-[#E5DEC9] aspect-square bg-[#FAF6EE]"
                        >
                          <img
                            src={item.url}
                            alt={item.label}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      <button
                        onClick={() => setPage(2)}
                        className="rounded-xl border-2 border-dashed border-[#DED5C0] bg-[#FAF6EE] aspect-square flex flex-col items-center justify-center text-[#6E6A5F] hover:border-[#5D7B52]"
                      >
                        <Plus className="w-5 h-5" />
                        <span className="text-[10px] font-bold mt-0.5">Tambah</span>
                      </button>
                    </div>
                  </div>
                </ChatBubbleCard>

                <button
                  onClick={() => setPage(7)}
                  className="w-full py-4 px-6 rounded-full bg-[#5D7B52] hover:bg-[#4F6B45] active:scale-[0.99] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#5D7B52]/25 transition"
                >
                  Lanjut ke 06. Prompt Studio
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* SCREEN 7: 06. PROMPT STUDIO (3 PROMPT CARDS + SALIN SEMUA & EKSPOR)  */}
      {/* ==================================================================== */}
      {page === 7 && (
        <div className="flex-1 w-full pb-12 relative z-10">
          <StepNavigatorBar currentPage={page} maxUnlockedPage={maxUnlockedPage} onNavigate={setPage} />
          <EditorialTopHeader
            stepNum="06."
            title="Prompt Studio"
            subtitle={`Terkunci: ${selectedCategory.name} (${selectedSubcategory.name}) • Siap untuk Google Flow Omni Flash.`}
            onBack={() => setPage(6)}
          />

          <div className="max-w-2xl mx-auto px-4 sm:px-6 space-y-4 mt-2">
            {finalOutput && (
              <>
                {/* Card 01: Prompt Gambar Visual (Multi-Panel Storyboard Grid) */}
                <ChatBubbleCard sender="Prompt Engine 01" roleTag="Multi-Panel Visual">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#EEF3EC] text-[#5D7B52] flex items-center justify-center shrink-0">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-extrabold text-[#2C2A25]">
                            <span className="text-[#D97336] mr-1.5">01</span>
                            Prompt Gambar Visual (Multi-Panel)
                          </div>
                          <p className="text-[11px] text-[#6E6A5F]">
                            Referensi multi-panel menyesuaikan tiap shot di Storyboard.
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCopy(finalOutput.masterImagePrompt, 'p1')}
                        className="w-9 h-9 rounded-xl bg-[#FAF6EE] hover:bg-[#EEF3EC] border border-[#E5DEC9] flex items-center justify-center text-[#2C2A25] shrink-0"
                        title="Salin Prompt Gambar Visual"
                      >
                        {copiedKey === 'p1' ? (
                          <Check className="w-4 h-4 text-[#5D7B52]" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#FAF6EE] border border-[#EFE8D8] text-xs text-[#3C3931] whitespace-pre-wrap leading-relaxed break-words">
                      {finalOutput.masterImagePrompt}
                    </div>
                  </div>
                </ChatBubbleCard>

                {/* Card 02: Product DNA (4-Panel Sheet: Depan, Logo, Samping, Tutup/Detail) */}
                <ChatBubbleCard sender="Prompt Engine 02" roleTag="4-Panel Product DNA">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#EEF3EC] text-[#5D7B52] flex items-center justify-center shrink-0">
                          <Layers className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-extrabold text-[#2C2A25]">
                            <span className="text-[#D97336] mr-1.5">02</span>
                            Product DNA (Multi-Panel Sheet)
                          </div>
                          <p className="text-[11px] text-[#6E6A5F]">
                            Detail produk &amp; prompt 4 panel (Depan, Logo, Samping, Tutup/Mekanisme).
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() =>
                          handleCopy(
                            `${finalOutput.productDnaText}\n\n[IMAGE PROMPT 4-PANEL PRODUCT DNA]:\n${finalOutput.productDnaImagePrompt}`,
                            'p2'
                          )
                        }
                        className="w-9 h-9 rounded-xl bg-[#FAF6EE] hover:bg-[#EEF3EC] border border-[#E5DEC9] flex items-center justify-center text-[#2C2A25] shrink-0"
                        title="Salin Product DNA"
                      >
                        {copiedKey === 'p2' ? (
                          <Check className="w-4 h-4 text-[#5D7B52]" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#FAF6EE] border border-[#EFE8D8] text-xs text-[#3C3931] whitespace-pre-wrap leading-relaxed break-words">
                      {finalOutput.productDnaText}
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#F4EFE4] border border-[#E5DEC9] text-xs text-[#3C3931] whitespace-pre-wrap leading-relaxed break-words">
                      <strong className="block text-[11px] text-[#D97336] mb-1">
                        Prompt Gambar 4-Panel Product DNA:
                      </strong>
                      {finalOutput.productDnaImagePrompt}
                    </div>
                  </div>
                </ChatBubbleCard>

                {/* Card 03: Prompt Video Final (Highlighted Dark Sage Olive Card - Flexible Height) */}
                <ChatBubbleCard sender="Google Flow Omni Flash" roleTag="Prompt Final 03" tone="dark">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/15 text-white flex items-center justify-center shrink-0">
                          <Play className="w-5 h-5 fill-current" />
                        </div>
                        <div>
                          <div className="text-sm font-extrabold text-white">
                            <span className="text-[#F5B57B] mr-1.5">03</span>
                            Prompt Video Final
                          </div>
                          <p className="text-[11px] text-[#DCE6D7]">
                            {selectedCategory.name} • {selectedSubcategory.name} ({totalVideoDuration} detik)
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleCopy(finalOutput.videoFinalPrompt, 'p3')}
                        className="w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center text-white shrink-0"
                        title="Salin Prompt Video Final"
                      >
                        {copiedKey === 'p3' ? (
                          <Check className="w-4 h-4 text-[#A7F3D0]" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Daftar Lampiran Baku */}
                    <div className="p-3.5 rounded-xl bg-black/20 border border-white/15 text-[11px] text-[#EBF2E8] space-y-1">
                      <div className="font-extrabold text-[#F5B57B]">
                        DAFTAR LAMPIRAN UPLOAD GOOGLE FLOW:
                      </div>
                      {(finalOutput.attachments || []).map((att, i) => (
                        <div key={i}>• {att}</div>
                      ))}
                    </div>

                    <div className="p-3.5 rounded-xl bg-black/25 border border-white/15 text-xs text-white/95 font-mono whitespace-pre-wrap leading-relaxed break-words">
                      {finalOutput.videoFinalPrompt}
                    </div>
                  </div>
                </ChatBubbleCard>

                {/* Bottom Action Bar: Salin Semua Prompt & Ekspor */}
                <div className="grid grid-cols-3 gap-2.5 pt-2">
                  <button
                    onClick={() => {
                      const allBundle = [
                        '=== 01 PRODUCT DNA ===',
                        finalOutput.productDnaText,
                        '\n=== 02 MASTER VISUAL REFERENCE ===',
                        finalOutput.masterVisualDescription,
                        `Image Prompt: ${finalOutput.masterImagePrompt}`,
                        '\n=== 03 VIDEO FINAL PROMPT (GOOGLE FLOW OMNI FLASH) ===',
                        finalOutput.videoFinalPrompt
                      ].join('\n');
                      handleCopy(allBundle, 'all');
                    }}
                    className="col-span-2 py-4 px-5 rounded-full bg-[#D97336] hover:bg-[#c86428] active:scale-[0.99] text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#D97336]/25 transition"
                  >
                    <Sparkles className="w-4 h-4" />
                    Salin Semua Prompt
                  </button>

                  <button
                    onClick={() => {
                      const allBundle = [
                        `GUREE.ID CREATIVE STUDIO V1.0.7 — ${projectName || productData.productTitle}`,
                        '==================================================',
                        '01 PRODUCT DNA:',
                        finalOutput.productDnaText,
                        '\n02 MASTER VISUAL REFERENCE:',
                        finalOutput.masterVisualDescription,
                        '\n03 VIDEO FINAL PROMPT:',
                        finalOutput.videoFinalPrompt
                      ].join('\n');
                      const blob = new Blob([allBundle], { type: 'text/plain;charset=utf-8' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `GUREE_Prompt_${(projectName || 'Studio').replace(/\s+/g, '_')}.txt`;
                      a.click();
                      URL.revokeObjectURL(url);
                      notify('File prompt (.txt) berhasil diekspor!', 'success');
                    }}
                    className="py-4 px-4 rounded-full bg-white hover:bg-[#F5EFE3] border border-[#D8CEB8] text-[#2C2A25] font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Download className="w-4 h-4 text-[#5D7B52]" />
                    Ekspor
                  </button>
                </div>

                <div className="pt-2 text-center">
                  <button
                    onClick={() => setPage(0)}
                    className="text-xs font-bold text-[#6E6A5F] hover:text-[#2C2A25] underline"
                  >
                    Kembali ke Dashboard Utama
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}