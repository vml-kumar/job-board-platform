# Freelancer Job Board Platform

A full-stack web application where recruiters can post jobs and freelancers can apply. Built using:

- **Frontend**: Next.js, React.js, TypeScript, TailwindCSS, Redux
- **Backend**: Node.js, Express.js, MySQL, JWT Authentication

## 🔍 Features

### For Freelancers
- 📝 Register/Login
- 🔎 Browse and search jobs
- 📤 Apply to jobs with cover letters
- 📄 View status of applications (Pending / Approved / Rejected)

### For Recruiters
- 📌 Post, edit, delete jobs
- 📬 Manage job applications
- ✅ Approve / ❌ Reject applications

### Admin Panel & Dashboard
- 🔐 JWT-based authentication and protected routes
- 📊 Dashboard layout with sidebar navigation
- 🔄 Pagination, search/filter functionality

## 🛠️ Tech Stack

| Layer      | Tech Used                           |
|------------|--------------------------------------|
| Frontend   | Next.js, React.js, Redux, TailwindCSS|
| Backend    | Node.js, Express.js, MySQL           |
| Auth       | JWT (access token based auth)        |
| Dev Tools  | VSCode, Postman, GitHub              |

## 📁 Project Structure
client/
  └── pages/           → Next.js Pages
  └── components/      → Reusable Components
  └── store/           → Redux State
server/
  └── controllers/     → Route Handlers (logic)
  └── models/          → Database Queries
  └── routes/          → API Endpoints
