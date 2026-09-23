# TripWise ✈️📱
> **Mobile-first AI travel planning web application grounded in real-world travel data.**

TripWise helps travelers generate realistic, budget-verified personalized travel plans. Unlike generic AI chatbots, TripWise combines external travel APIs (for verified hotels, transport options, restaurants, and attraction costs) with AI for personalized ranking, day-by-day scheduling, cost optimization, and explanations.

---

## 🏗️ Project Architecture & Tech Stack

```
tripwise/
├── client/              # React + Vite Mobile-First Frontend (Port 5173)
│   ├── src/
│   │   ├── components/  # Mobile UI components (TripForm, HealthStatus, Navbar)
│   │   ├── App.jsx      # Mobile Shell container & module layout
│   │   ├── main.jsx     # Vite entry point
│   │   └── index.css    # Tailwind CSS & glassmorphism utilities
│   ├── vite.config.js   # Vite config with API proxy to server
│   ├── tailwind.config.js
│   ├── .env.example
│   └── package.json
│
├── server/              # Node.js + Express Backend API (Port 5000)
│   ├── src/
│   │   ├── routes/
│   │   │   └── health.js # Basic API health check endpoint (/api/health)
│   │   └── index.js     # Express server entry point & middleware setup
│   ├── .env.example
│   └── package.json
│
├── README.md            # Documentation & setup instructions
└── package.json         # Workspace scripts for concurrent execution
```

### Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons (Mobile-First Layout)
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
# Server
cp server/.env.example server/.env

# Client
cp client/.env.example client/.env
```

### 3. Run Both Frontend and Backend Concurrently
```bash
npm run dev
```
- **Frontend**: http://localhost:5173
- **Backend Health Check**: http://localhost:5000/api/health

### 4. Run Services Independently
If you prefer running frontend and backend in separate terminals:

**Backend Only:**
```bash
cd server
npm run dev
# Starts backend at http://localhost:5000
```

**Frontend Only:**
```bash
cd client
npm run dev
# Starts Vite frontend at http://localhost:5173
```

---

## 📱 Mobile-First Features & User Input Schema

TripWise collects 7 core trip parameters:
1. **Starting location** (Origin city/airport)
2. **Destination** (Target city/country)
3. **Start date** & **End date** (Trip duration)
4. **Total travel budget** (Max total spend limit)
5. **Number of travelers** (Group size calculation)
6. **Travel preference** (Budget, Balanced, Luxury, Adventure, Cultural, Foodie)

---

## 🏥 Verification Endpoints

- **Root API response**: `GET http://localhost:5000/`
- **Health Check response**: `GET http://localhost:5000/api/health`
  ```json
  {
    "status": "ok",
    "message": "TripWise API Service is healthy",
    "timestamp": "2026-09-23T10:35:00.000Z",
    "service": "tripwise-backend",
    "version": "1.0.0",
    "environment": "development"
  }
  ```
