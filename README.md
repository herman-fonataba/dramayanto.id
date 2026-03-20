# Login System dengan Google Sheets Database

Sistem login dengan database menggunakan Google Sheets, dihosting di GitHub Pages.

## 🚀 Fitur

- Login dengan username dan password dari Google Sheets
- 3 halaman berbeda dengan akses terpisah
- Validasi akses per halaman
- Session management
- Desain responsive modern

## 📋 Setup

### 1. Google Sheets Setup
- Buat Google Sheet baru
- Buat sheet dengan nama "Users"
- Isi data sesuai template:
  - Kolom A: Username
  - Kolom B: Password
  - Kolom C: Page File (page1.html, page2.html, page3.html)
  - Kolom D: Page Name
  - Kolom E: Role

### 2. Google Apps Script
- Buka Google Sheet > Extensions > Apps Script
- Copy paste kode Apps Script
- Ganti `YOUR_GOOGLE_SHEET_ID` dengan ID Sheet Anda
- Deploy sebagai Web App
- Copy URL Apps Script

### 3. Update HTML Files
- Ganti `SCRIPT_URL` di semua file HTML dengan URL Apps Script Anda

### 4. Upload ke GitHub
- Upload semua file HTML ke repository GitHub
- Enable GitHub Pages di repository settings

## 🔐 Data Login Contoh

| Username | Password | Halaman |
|----------|----------|---------|
| user1    | pass1    | page1.html |
| user2    | pass2    | page2.html |
| user3    | pass3    | page3.html |

## 📁 Struktur File
