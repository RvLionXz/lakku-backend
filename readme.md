# 💸 Lakku Backend — Expense Tracker API

> Backend sederhana berbasis Node.js + MySQL  
> Untuk aplikasi pengelolaan **pengeluaran bulanan** berdasarkan **user, kategori, dan pengeluaran**.

---

## 📂 Struktur Folder

lakku-backend/ ├── app.js # Entry point server Express ├── db.js # Koneksi database MySQL (SSL) ├── controllers/ # Logic pengolahan data ├── routes/ # Endpoint router └── README.md # Dokumentasi project

yaml
Copy
Edit

---

## 💡 Database Structure

### users
| Field    | Type           | Keterangan               |
|----------|----------------|---------------------------|
| id_user  | int            | Primary Key, Auto Increment |
| username | varchar(100)   | Nama pengguna            |
| email    | varchar(100)   | Email user                |
| password | varchar(255)   | Password user             |

### categories
| Field       | Type           | Keterangan               |
|-------------|----------------|---------------------------|
| id_category | int            | Primary Key, Auto Increment |
| name        | varchar(100)   | Nama kategori            |

### expenses
| Field       | Type              | Keterangan               |
|-------------|--------------------|---------------------------|
| id_expenses | int                | Primary Key, Auto Increment |
| id_user     | int                | Foreign Key ke `users`     |
| id_category | int                | Foreign Key ke `categories`|
| description | varchar(255)       | Deskripsi pengeluaran      |
| amount      | decimal(10,2)      | Nominal pengeluaran        |
| date        | date               | Tanggal transaksi          |

---

## 🔌 API Endpoint

### 🧑 User

| Method | URL              | Body JSON                                 | Keterangan              |
|--------|-------------------|-------------------------------------------|--------------------------|
| POST   | `/users/register` | `{ "username": "", "email": "", "password": "" }` | Registrasi user baru     |
| POST   | `/users/login`    | `{ "email": "", "password": "" }`         | Login user               |
| GET    | `/users`          | -                                         | Ambil semua data user    |

---

### 📁 Category

| Method | URL             | Body JSON                          | Keterangan           |
|--------|------------------|------------------------------------|-----------------------|
| GET    | `/categories`    | -                                  | Ambil semua kategori  |
| POST   | `/categories`    | `{ "name": "" }`                   | Tambah kategori baru  |

---

### 💵 Expense

| Method | URL            | Body JSON                                                                | Keterangan               |
|--------|-----------------|--------------------------------------------------------------------------|---------------------------|
| GET    | `/expenses`     | -                                                                        | Ambil semua pengeluaran   |
| POST   | `/expenses`     | `{ "id_user":1, "id_category":1, "description":"", "amount":10000, "date":"2025-04-14" }` | Tambah pengeluaran baru |

---

## ⚙️ Cara Menjalankan

1. Clone project:
```bash
git clone <repository-url>
Install dependency:

bash
Copy
Edit
npm install
Pastikan file ca.pem SSL dari Aiven MySQL ada di root folder.

Jalankan server:

bash
Copy
Edit
node app.js
Server berjalan di:

arduino
Copy
Edit
http://localhost:3000
🔐 Catatan
Login tanpa JWT, hanya verifikasi email dan password.

Database terhubung dengan SSL Aiven MySQL.

Cocok untuk dipakai aplikasi mobile (Flutter) atau frontend web (React/Vue).

❤️ Credit
Dibuat oleh:

Backend: GPT-40

Frontend: RvLionXz

