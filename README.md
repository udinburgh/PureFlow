# 🌊 PureFlow - Backend API

Proyek sistem monitoring air bersih "PureFlow". Dokumentasi ini dibuat khusus untuk memandu tim **Front-End (FE)** dalam melakukan integrasi data dari Backend ke UI.

## 🛠 Setup & Instalasi (Lokal)

Jika ingin menjalankan server backend di komputer sendiri:

1. **Clone repository:**
   ```bash
   git clone [link-repo-kamu]

Install dependencies:

Bash
npm install

Konfigurasi Environment:
Pastikan koneksi MongoDB dan API Key Weather sudah terpasang (cek file .env).

Running Server:

Bash
npm start
Server akan berjalan di: http://localhost:3000

🚀 API Documentation
Base URL: http://localhost:3000

1. Modul: Debit Air
Grup API untuk perhitungan dan penyimpanan data debit.

Hitung & Simpan Debit
Endpoint: /debit
Method: POST

Ambil Statistik & History
Endpoint: /debit/statistik
Method: GET

2. Modul: Estimasi Konsumsi
Grup API untuk fitur kalkulator penggunaan air.

Hitung Estimasi
Endpoint: debit/estimasi
Method: POST

3. Modul: Cuaca (Weather)
Grup API untuk integrasi data cuaca eksternal.

Ambil Data Cuaca
Endpoint: debit/weather
Method: GET
Query Param: ?lokasi=Jakarta

Notes API Documentation : Jika ingin check di Postman impor saja file openapi.yaml di folder server

📝 Catatan untuk Front-End (FE)

Format Data: Semua request dan response menggunakan format JSON.
Case Sensitivity: Perhatikan penulisan variabel (misal: jenisAlat, bukan jenisalat).