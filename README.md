# 📚 AKTU Buddy

> Your friendly guide to AKTU success — Notes, PYQs and Quantum Booklets, all free.

## 🌐 Live Demo
Coming soon — aktu.help

## 🚀 Features
- Browse study materials by Branch → Year → Semester
- Notes, Previous Year Papers, Quantum Booklets
- Admin dashboard to upload PDFs
- Search subjects by name or code
- Fully free, no signup required

## 🛠 Tech Stack
| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas + Mongoose |
| Auth | JWT (Admin only) |
| Deployment | Vercel (Frontend) + Render (Backend) |

## 📁 Project Structure
\`\`\`
aktu-buddy/
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── utils/
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── services/
\`\`\`

## ⚙️ Local Setup

### Backend
\`\`\`bash
cd backend
cp .env.example .env
npm install
npm run dev
\`\`\`

### Frontend
\`\`\`bash
cd frontend
cp .env.example .env
npm install
npm run dev
\`\`\`

### Seed Data
\`\`\`bash
cd backend
node utils/seedData.js
\`\`\`

## 🔐 Environment Variables

### Backend (.env)
\`\`\`
MONGODB_URI=your_mongodb_atlas_uri
PORT=5001
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
\`\`\`

### Frontend (.env)
\`\`\`
VITE_API_URL=http://localhost:5001/api
\`\`\`

## 👤 Admin Access
Admin panel is at /admin (not linked publicly).

## 🙋 Author
Dipanshu Kashyap — Lucknow, Uttar Pradesh, India

