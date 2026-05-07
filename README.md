# ✦ Portfolio Project — Setup Guide

## What's Included
- **Full Node.js + Express + EJS + MySQL** portfolio website
- **Public portfolio page** — animated, professional dark design
- **Admin panel** — manage profile, skills, projects, education, messages
- **Contact form** — messages saved to database
- **Custom cursor, scroll animations, skill bar animations**

---

## Setup Instructions

### 1. Database
Open **phpMyAdmin** (or MySQL CLI) and run `database_setup.sql`:
```sql
source database_setup.sql
```
Or import the file via phpMyAdmin → Import.

### 2. Configure Database Connection
Edit `conn.js` and update your credentials:
```js
host: "localhost",
user: "root",
password: "",       // your MySQL password
database: "my_portfolio"
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run the App
```bash
node index.js
```

### 5. Open in Browser
- **Portfolio:** http://localhost:1000
- **Admin Panel:** http://localhost:1000/admin/login

---

## Admin Login
| Field    | Value      |
|----------|------------|
| Username | `admin`    |
| Password | `admin123` |

> ⚠️ **Change the password** in `routes/admin.js` line 22 before deployment.

---

## Project Structure
```
portfolio project/
├── index.js              ← App entry point
├── conn.js               ← MySQL connection
├── database_setup.sql    ← Run this first!
├── package.json
├── routes/
│   ├── user.js           ← Public portfolio routes
│   └── admin.js          ← Admin panel routes
├── views/
│   ├── user/
│   │   └── index.ejs     ← Public portfolio page
│   └── admin/
│       ├── login.ejs     ← Admin login
│       └── dashboard.ejs ← Admin dashboard
└── public/               ← Static assets (images)
```

---

## Features Completed
- ✅ Hero section with animated entrance
- ✅ About section with stats
- ✅ Skills with animated progress bars
- ✅ Projects gallery with links
- ✅ Education timeline
- ✅ Contact form (saves to DB)
- ✅ Admin login with session auth
- ✅ Admin: manage profile, photo upload
- ✅ Admin: add/delete skills with icons
- ✅ Admin: add/delete projects with screenshots
- ✅ Admin: add/delete education records
- ✅ Admin: view & delete contact messages
- ✅ Custom animated cursor
- ✅ Scroll-triggered reveal animations
- ✅ Responsive design
