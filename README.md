# 🔐 Login System with Google Sheets Database

Sistem login terintegrasi dengan Google Sheets sebagai database. Dihosting di GitHub Pages.

## ✨ Fitur

- ✅ Login dengan username & password dari Google Sheets
- ✅ 3 halaman berbeda dengan akses terpisah
- ✅ Validasi akses per halaman
- ✅ Session management dengan sessionStorage
- ✅ Desain modern dan responsive
- ✅ Tanpa backend server (serverless)

## 📋 Struktur Halaman

| Halaman | Username | Password | Deskripsi |
|---------|----------|----------|-----------|
| page1.html | user1 | pass1 | Dashboard Utama |
| page2.html | user2 | pass2 | Data Analisis |
| page3.html | user3 | pass3 | Pengaturan Akun |

## 🚀 Cara Setup

### 1. Google Sheets
Buat Google Sheet dengan struktur:

| A (Username) | B (Password) | C (Page File) | D (Page Name) | E (Role) |
|--------------|--------------|---------------|---------------|----------|
| user1 | pass1 | page1.html | Dashboard | Admin |
| user2 | pass2 | page2.html | Analisis | Analyst |
| user3 | pass3 | page3.html | Pengaturan | User |

### 2. Google Apps Script
1. Buka Google Sheet > Extensions > Apps Script
2. Paste kode Apps Script yang sudah disediakan
3. Ganti `YOUR_SHEET_ID` dengan ID Sheet Anda
4. Deploy sebagai Web App dengan akses "Anyone"
5. Copy URL Apps Script

### 3. Update HTML Files
Ganti `SCRIPT_URL` di semua file HTML dengan URL Apps Script Anda

### 4. Upload ke GitHub
1. Upload semua file HTML ke repository GitHub
2. Enable GitHub Pages di Settings > Pages

## 🛠️ Teknologi

- HTML5
- CSS3 (Flexbox, Grid, Animations)
- JavaScript (ES6+)
- Google Sheets API
- Google Apps Script

## 📁 File Structure
