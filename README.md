# StyleSync – Website Design Token Extraction Tool

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)](https://www.prisma.io/)
[![Puppeteer](https://img.shields.io/badge/Puppeteer-Scraping-40B5A4?logo=puppeteer)](https://pptr.dev/)

**StyleSync** is a powerful utility designed to bridge the gap between inspiration and implementation. It analyzes any website URL and instantly converts its visual styles into a structured, editable design system dashboard.

## 🚀 Live Demo
[Link to Deployed Application (e.g., Vercel)]

---

## 💡 Problem Statement
Manually extracting design tokens (colors, typography, spacing) from existing websites for research or competitive analysis is tedious and prone to error. StyleSync automates this process, providing a developer-friendly interface to capture, refine, and export design systems in seconds.

---

## ✨ Features
- **Instant Website Scraping**: Comprehensive analysis of styles using a Puppeteer-based backend extractor.
- **Structured Token Management**: Automatically categorizes colors, typography, and layout tokens.
- **Live Preview Dashboard**: Visualize tokens in real-time and edit them directly.
- **Token Locking**: Preserve manual refinements across re-scans with a persistent locking system.
- **Version History & Snapshots**: Save, browse, and restore previous versions of your design tokens.
- **Multi-Format Export**: One-click export to **JSON, CSS Variables, Tailwind Config, or SCSS**.

---

## 🛠 Tech Stack
- **Frontend**: Next.js 16 (React 19), TypeScript, Tailwind CSS 4.0
- **Backend**: Node.js API Routes, Puppeteer (Headless Browser)
- **Database**: PostgreSQL with Prisma ORM
- **State Management**: Zustand (Client-side persistence)
- **Animation**: Framer Motion for smooth UI transitions

---

## 📂 Folder Structure
```text
src/
├── app/              # Next.js App Router (Pages & API Routes)
├── components/       # Reusable UI Components
│   ├── dashboard/    # Specialized dashboard modules
│   └── ui/           # Base design system components
├── lib/              # Shared libraries (Prisma, Validators)
├── services/         # Core logic (Scraper, Token Extractor)
├── store/            # Zustand state management
├── types/            # TypeScript interfaces
└── utils/            # Helper functions
```

---

## 🏁 Setup Instructions

### 1. Clone & Install
```bash
git clone https://github.com/your-username/stylesync.git
cd stylesync
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL="your_postgresql_connection_string"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Optional: For serverless environments (like Vercel)
PUPPETEER_EXECUTABLE_PATH="/path/to/chrome" 
```

### 3. Database Sync
```bash
npx prisma db push
```

### 4. Run Development Server
```bash
npm run dev
```

---

## 🔌 API Documentation

### `POST /api/analyze`
Scrapes a target URL and extracts design tokens.
- **Body**: `{ "url": "https://example.com" }`
- **Response**: Returns site metadata and structured tokens.

### `GET /api/history`
Fetches the version history for a specific site.
- **Query Params**: `?url=...`

### `POST /api/history`
Saves a new snapshot of modified design tokens.
- **Body**: `{ "siteUrl": "...", "tokens": {...}, "changes": "..." }`

---

## 🏗 Architecture Approach
- **Zustand for State**: Used Zustand for its low overhead and efficient re-renders, enabling immediate UI feedback during token edits.
- **CSS Variable Injection**: Extracted styles are normalized into standard CSS variables to ensure consistency across different source websites.
- **Puppeteer for Accuracy**: Unlike static HTML parsers, Puppeteer allows us to capturecomputed styles, ensuring the extracted tokens match what the user actually sees on screen.
- **Version Snapshots**: Implementing a JSON-based snapshot strategy in PostgreSQL allows for lightweight versioning and instant restoration.

---

## 🛠 Troubleshooting

### 1. `Found lockfile missing swc dependencies` (Vercel)
If you see this error on Vercel, it means the `package-lock.json` doesn't have the required Linux binaries.
**Solution**: Run `npx next build` locally; Next.js will automatically patch the lockfile. Commit and push the changes.

### 2. Prisma Database Errors
If database operations fail, ensure you've pushed the schema:
```bash
npx prisma db push
```

### 3. Puppeteer in Serverless
Puppeteer requires a specific setup for some serverless environments. If scraping fails in production, ensure you are using `puppeteer-core` with a compatible chrome package or set the `PUPPETEER_EXECUTABLE_PATH`.

---

## 🧠 Challenges & Solutions
**Challenge**: Normalizing inconsistent CSS values (e.g., `hex` vs `rgb` vs `hsl`) from various websites.
**Solution**: Implemented a normalization service that converts all captured colors to a unified format and uses frequency-based heuristics to identify the primary brand colors.

---



## 📄 License
MIT
