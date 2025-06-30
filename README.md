# 📱 Spam Checker REST API

A production-ready REST API built with Node.js, Express.js, PostgreSQL & Prisma ORM.  
Lets users mark phone numbers as spam, add personal contacts, and search numbers or names with spam likelihood.

---

## 🚀 Features
- ✅ User registration & login (JWT auth)
- ✅ Add personal contacts
- ✅ Mark any phone number as spam
- ✅ Search by name or phone in the global database
- ✅ Spam likelihood calculation
- ✅ Secure & production-ready code structure

---

## 🛠 Tech Stack
- Node.js + Express.js
- PostgreSQL
- Prisma ORM
- bcryptjs & jsonwebtoken
- express-validator for validations

---

## ⚙️ Installation & Running

```bash
git clone https://github.com/Rahul-Sandeep03/spam-checker-api.git
cd spam-checker-api
npm install
npx prisma generate
npm run dev
