# Review Engine

A review-generation engine. Each client (business) gets a public link + QR code. A customer
opens it on their phone, taps a 1–5 star rating, and a review is drafted (from the business
description + rating) that they can paste straight into Google. Every generated review is
stored for a full audit trail.

Built with Next.js 16 (App Router), Supabase (Postgres), and the DeepSeek API.

## Flow

1. Admin adds a client (business name, description, Google review link) under **/admin**.
2. The client gets a public link `/r/{slug}` and a scannable QR code.
3. A customer scans/clicks it → a mobile page shows five stars.
4. They tap a rating → a review is generated and shown in an editable box.
5. **Next** copies the review to the clipboard and redirects to the client's Google review page.
6. Every review (rating + text + client + timestamp) is saved to the `reviews` table.

## Setup

### 1. Database

Create a Supabase project, then run `supabase/schema.sql` in the **SQL editor**. This creates
`clients` and `reviews` with row-level security (public read of clients, public insert of
reviews; admin reads go through the service-role key).

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill it in:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon key (public) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service-role key (**secret**) |
| `DEEPSEEK_API_KEY` | DeepSeek key for review generation (**secret**) |
| `ADMIN_TOKEN` | Password for the /admin basic-auth gate (**secret**) |
| `NEXT_PUBLIC_BASE_URL` | Public origin, e.g. `http://localhost:3000` |

> ⚠️ Never prefix secret vars with `NEXT_PUBLIC_` — anything with that prefix ships to the
> browser.

### 3. Run

```bash
npm install
npm run dev
```

Visit `http://localhost:3000/admin` (basic auth — username `admin`, password = `ADMIN_TOKEN`)
to add a client.

## Scripts

```bash
npm run dev       # start dev server
npm run build     # production build
npm run start     # run the production build
npm run lint      # eslint
npm run typecheck # tsc --noEmit
```
