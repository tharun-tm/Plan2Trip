# TripWise ✈️📱
> **AI-powered Smart Mobility Travel Planner grounded in real-world travel data.**

TripWise helps travelers generate realistic, budget-verified personalized travel plans. Unlike generic AI chatbots, TripWise combines external travel APIs (for verified hotels, transport options, restaurants, and attraction costs) with AI for personalized ranking, day-by-day scheduling, cost optimization, and explanations.

---

## 🏗️ Project Architecture & Tech Stack

```
TripWise/
├── frontend/                 # React 18 + Vite + Tailwind CSS Frontend
│   ├── src/
│   │   ├── components/       # Reusable travel UI components
│   │   ├── pages/            # Home, PlanTrip, Planning, TripOverview, Explore, SavedTrips
│   │   ├── data/             # Central mock mobility dataset (mockTripData.js)
│   │   ├── context/          # TripContext state management
│   │   ├── App.jsx           # React Router entry
│   │   └── index.css         # Tailwind styling & warm off-white theme
│   ├── package.json
│   ├── vite.config.js
│   └── .env.example
│
├── backend/                  # Node.js + Express Backend API
│   ├── src/
│   │   ├── routes/           # Express API endpoints
│   │   ├── controllers/      # Health & business logic controllers
│   │   ├── services/         # API integration services (Amadeus, Maps, Gemini)
│   │   ├── models/           # Database models (Supabase PostgreSQL)
│   │   ├── middleware/       # Express error & auth middleware
│   │   └── index.js          # Express app entry
│   ├── package.json
│   └── .env.example
│
├── README.md                 # Complete documentation
└── package.json              # Root workspace scripts
```

### Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, React Router
- **Backend**: Node.js, Express.js, CORS, dotenv
- **Database (Planned)**: Supabase PostgreSQL
- **APIs & AI (Planned)**: Gemini API, Google Maps Platform, Amadeus Travel APIs

---

## 🚀 Quick Start & How to Run

### Prerequisites
- Node.js (v18+ recommended)
- npm

### 1. Install Dependencies
Run from the project root:
```bash
npm install
npm run install:all
```

### 2. Configure Environment Variables
Copy `.env.example` files to `.env`:
```bash
# Backend
cp backend/.env.example backend/.env

# Frontend
cp frontend/.env.example frontend/.env
```

### 3. Run Both Frontend and Backend Concurrently
```bash
npm run dev
```
- **Frontend**: http://localhost:5173
- **Backend Health Check**: http://localhost:5000/api/health

### 4. Run Services Independently

**Backend Only:**
```bash
cd backend
npm run dev
# Starts backend at http://localhost:5000
```

**Frontend Only:**
```bash
cd frontend
npm run dev
# Starts Vite frontend at http://localhost:5173
```
