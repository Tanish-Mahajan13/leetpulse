# LeetPulse

A full-stack MERN app that applies spaced repetition to DSA practice. Log a LeetCode problem after solving it, and LeetPulse schedules when you should revisit it — the interval grows the more consistently you can re-solve it, and resets if you can't.

## Why

Most people solve a problem once and never look at it again, so it doesn't stick. LeetPulse treats DSA problems the way tools like Anki treat flashcards: track difficulty and past recall success, and use that to decide when a problem is due for review again.

## Features

- Email/password authentication (JWT, `httpOnly` cookies)
- Add, view, edit, and delete solved problems (title, URL, code, difficulty, notes)
- Automatic revision scheduling based on difficulty — see [`intervals.md`](./intervals.md)
- A "Due for Revision" view, with success/failure feedback that reschedules the problem
- Flagging system for problems the user wants to mark as important, separate from the revision schedule
- Profile page with solve-count statistics and a difficulty breakdown
- Sort and filter problem lists by date and difficulty

## Tech Stack

**Backend:** Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs
**Frontend:** React (Vite), React Router, Axios, plain CSS

## Project Structure

```
backend/
  controller/   route handlers
  model/        Mongoose schemas
  routes/       Express route definitions
  middleware/   auth middleware
  utils/        revision interval calculation
frontend/
  src/api/          axios instance
  src/components/   shared UI (navbar, route guard)
  src/pages/        route-level pages
  src/utils/        client-side sort/filter helpers
```

## Running Locally

**Backend**
```
cd backend
npm install
# create a .env with MONGO_URI, JWT_SECRET, PORT
npm start
```

**Frontend**
```
cd frontend
npm install
npm run dev
```

The frontend expects the backend running on `http://localhost:4444` (see `frontend/src/api/axios.js`), and the backend expects the frontend origin `http://localhost:5173` in its CORS config (see `backend/index.js`).

## Docs

- [`models.md`](./models.md) — database schema reference
- [`flow.md`](./flow.md) — high-level architecture/user flow
- [`intervals.md`](./intervals.md) — the revision interval logic

## Roadmap

The current scope is a manual-entry MVP. A planned follow-up is a browser extension (similar to LeetSync) that auto-detects a LeetCode submission and pre-fills the "add problem" form — the schema and API were kept simple deliberately so this can be layered on without a rework.
