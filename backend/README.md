# Solomon's Backend

ID: 22012447

Minimal Express + MongoDB backend for the Crypto-clone frontend.

Setup

1. Copy `.env.example` to `.env` and update values (Mongo URI, JWT secret).

2. Install dependencies:

```bash
npm install
```

3. Run in development:

```bash
npm run dev
```

API Endpoints

- `POST /api/auth/register` — body: `{ name, email, password }`
- `POST /api/auth/login` — body: `{ email, password }` (returns cookie `token`)
- `GET /api/auth/profile` — protected, returns user info

- `GET /api/crypto` — list all cryptos
- `GET /api/crypto/gainers` — top gainers sorted by `change24h`
- `GET /api/crypto/new` — newest listings
- `POST /api/crypto` — protected, add new crypto

Integration notes

- Frontend should send credentials so cookies are accepted (use `fetch` with `credentials: 'include'`).
- For local development set CORS origin appropriately in `app.js`.
