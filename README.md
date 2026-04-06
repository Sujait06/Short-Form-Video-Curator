# 🎬 ReelTech — Short-Form Video Curator

> Curated YouTube Shorts + Instagram Reels for tech learners — AI, Python, Cybersecurity, and more in one feed.

![ReelTech](https://img.shields.io/badge/YouTube-Shorts-red?logo=youtube) ![](https://img.shields.io/badge/Instagram-Reels-E1306C?logo=instagram) ![](https://img.shields.io/badge/React-18-61dafb?logo=react) ![](https://img.shields.io/badge/Node.js-Express-green?logo=nodedotjs)

---

## 📁 Project Structure

```
short-video-curator/
├── frontend/          # React app (Instagram-style dark UI)
│   ├── public/
│   └── src/
│       ├── components/   # Navbar, VideoCard, TagBar, PlatformFilter
│       ├── pages/        # Home, Feed
│       └── utils/        # Axios API helper
│
├── backend/           # Node.js + Express API server
│   ├── routes/           # /api/videos/*
│   ├── controllers/      # YouTube + Instagram logic
│   └── server.js
│
└── README.md
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js ≥ 18
- npm ≥ 9
- A **YouTube Data API v3** key (free from Google Cloud Console)
- *(Optional)* A **RapidAPI** key for live Instagram Reels (falls back to demo data)

---

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/short-video-curator.git
cd short-video-curator
```

---

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:

```env
YOUTUBE_API_KEY=AIza...your_key_here...
RAPIDAPI_KEY=your_rapidapi_key_here     # optional
PORT=5000
FRONTEND_URL=http://localhost:3000
```

#### 🔑 Get YouTube API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project → Enable **YouTube Data API v3**
3. Create credentials → API Key → copy it into `.env`

#### 🔑 Get Instagram Reels via RapidAPI (optional)
1. Sign up at [RapidAPI](https://rapidapi.com)
2. Search **"Instagram Scraper"** → subscribe to a free tier
3. Copy your `X-RapidAPI-Key` into `.env`
> Without this key, the app automatically serves demo/mock Instagram Reels so you can still develop.

Start the backend:
```bash
npm run dev       # development (nodemon)
# or
npm start         # production
```
Backend runs at: `http://localhost:5000`

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
cp .env.example .env
```

`.env` contents:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_NAME=ReelTech
```

Start the frontend:
```bash
npm start
```
Frontend runs at: `http://localhost:3000`

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |
| GET | `/api/videos/tags` | Get popular tag list |
| GET | `/api/videos/youtube?tag=AI&maxResults=12` | YouTube Shorts |
| GET | `/api/videos/instagram?tag=python&count=9` | Instagram Reels |
| GET | `/api/videos/all?tag=AI&maxResults=12` | Combined (interleaved) |

---

## 🚀 Deployment

### Deploy Backend to Render (free)

1. Push your code to GitHub
2. Go to [render.com](https://render.com) → New → Web Service
3. Connect your GitHub repo → select the `backend/` root directory
4. Set:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add environment variables (`YOUTUBE_API_KEY`, etc.) in Render dashboard
6. Deploy — copy the live URL (e.g. `https://reeltech-api.onrender.com`)

### Deploy Frontend to Vercel (free)

1. Go to [vercel.com](https://vercel.com) → New Project → Import GitHub repo
2. Set **Root Directory** to `frontend`
3. Add environment variable:
   - `REACT_APP_API_URL` = `https://reeltech-api.onrender.com/api`
4. Deploy — Vercel auto-builds on every push to `main`

---

## 📤 Push to GitHub

```bash
# Initialize git (from project root)
git init
git add .
git commit -m "🎬 Initial commit — ReelTech Short-Form Video Curator"

# Create a new repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/short-video-curator.git
git branch -M main
git push -u origin main
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router v6, CSS3 |
| Backend | Node.js, Express.js |
| Video APIs | YouTube Data API v3, RapidAPI (Instagram) |
| Caching | node-cache (10 min TTL) |
| Security | helmet, cors, express-rate-limit |
| Deploy | Vercel (frontend) + Render (backend) |

---

## 📄 License

MIT © 2025 — Built as part of the Short-Form Video Curator project.
