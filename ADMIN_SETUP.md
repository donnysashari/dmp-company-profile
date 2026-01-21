# Setup dan Akses Admin Payload CMS

## 📋 Prerequisites

1. **MongoDB Database**
   Pastikan MongoDB sudah terinstall dan running di sistem Anda, atau gunakan MongoDB Atlas.

2. **Environment Variables**
   Pastikan file `.env.local` sudah dikonfigurasi dengan benar:
   ```env
   DATABASE_URI=mongodb://localhost:27017/dmp-compro
   PAYLOAD_SECRET=your-very-secure-secret-key
   PAYLOAD_CONFIG_PATH=src/payload.config.ts
   NEXT_PUBLIC_SERVER_URL=http://localhost:3000
   ```

## 🚀 Cara Menjalankan Project

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Generate Payload Types**
   ```bash
   npm run payload generate:types
   ```

3. **Jalankan Development Server**
   ```bash
   npm run dev
   ```

## 🔐 Cara Mengakses Admin Payload CMS

### Method 1: Direct URL
1. Buka browser dan navigasi ke: `http://localhost:3000/admin`
2. Jika belum ada user admin, Anda akan diminta untuk membuat akun admin pertama
3. Isi form pendaftaran dengan:
   - **Name**: Nama lengkap Anda
   - **Email**: Email admin (akan digunakan untuk login)
   - **Password**: Password yang aman
   - **Role**: Pilih "Admin"

### Method 2: Payload CLI (Alternative)
```bash
# Jika ingin menggunakan Payload CLI
npx payload init
```

## 👤 Membuat User Admin Pertama

Saat pertama kali mengakses `/admin`, sistem akan otomatis meminta Anda membuat user admin:

```
Name: Admin DMP
Email: admin@digitalmahadata.com
Password: [password-yang-aman]
Role: Admin
```

## 📊 Collections yang Tersedia

Setelah login ke admin panel, Anda akan memiliki akses ke collections berikut:

### 1. **Users**
   - Mengelola akun admin dan editor
   - Mengatur role dan permissions

### 2. **Portfolio**
   - Mengelola project portfolio
   - Upload gambar project
   - Mengatur kategori dan teknologi

### 3. **Services**
   - Mengelola layanan perusahaan
   - Mengatur fitur dan deskripsi

### 4. **Team**
   - Mengelola profil tim
   - Upload foto dan bio anggota tim

### 5. **Pages**
   - Mengelola konten halaman statis
   - Rich text editor untuk konten detail

### 6. **Media**
   - Upload dan kelola file media
   - Otomatis resize untuk thumbnail dan responsive images

## 🛠️ Fitur Admin Panel

- **Rich Text Editor**: Editor Lexical untuk konten
- **Media Library**: Upload dan kelola gambar
- **User Management**: Sistem role admin/editor
- **Auto-generated API**: REST API endpoints otomatis
- **Type-safe**: TypeScript types otomatis generate

## 🔗 API Endpoints

Setelah setup, API endpoints berikut akan tersedia:

```
GET /api/portfolio          # Daftar portfolio
GET /api/portfolio/[id]     # Detail portfolio
GET /api/services           # Daftar layanan
GET /api/team              # Daftar tim
GET /api/pages             # Daftar halaman
GET /api/media             # Daftar media
```

## 🚨 Troubleshooting

### Database Connection Error
```bash
# Pastikan MongoDB running
mongod

# Atau check status
brew services list | grep mongo
```

### Port Already in Use
```bash
# Kill process di port 3000
lsof -ti :3000 | xargs kill -9

# Atau gunakan port lain
PORT=3001 npm run dev
```

### Environment Variables Not Found
```bash
# Copy example file
cp .env.example .env.local

# Edit dengan konfigurasi Anda
nano .env.local
```

## 📝 Next Steps

1. **Login ke Admin**: Akses `http://localhost:3000/admin`
2. **Buat Content**: Tambahkan portfolio, layanan, dan tim
3. **Test API**: Coba endpoints API yang tersedia
4. **Customize**: Sesuaikan collection fields sesuai kebutuhan

## 🔒 Security Notes

- Gunakan password yang kuat untuk admin
- Jangan expose `PAYLOAD_SECRET` ke public
- Setup SSL certificate untuk production
- Backup database secara berkala
