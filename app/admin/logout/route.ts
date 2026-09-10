import { NextResponse } from "next/server"

/**
 * Sign-out endpoint for the Basic Auth gate in proxy.ts.
 *
 * Browsers cache HTTP Basic credentials until the tab closes and expose no API
 * to clear them, so the only way to sign out is to answer with a 401 for the
 * same realm. The browser then drops the cached credentials and prompts again.
 *
 * Must stay in sync with the realm string in proxy.ts (`Basic realm="admin"`).
 */
export const dynamic = "force-dynamic"

const PAGE = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Signed out — Onloz Admin</title>
    <style>
      :root {
        --bg: #faf9f6; --fg: #1b1918; --muted: #6b6560; --border: #e2ded6;
      }
      @media (prefers-color-scheme: dark) {
        :root { --bg: #1b1918; --fg: #f4f1ea; --muted: #9b9490; --border: #332f2c; }
      }
      * { box-sizing: border-box; }
      body {
        margin: 0; min-height: 100svh; display: flex; align-items: center;
        justify-content: center; padding: 24px;
        background: var(--bg); color: var(--fg);
        font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      }
      .card { width: 100%; max-width: 420px; border: 1px solid var(--border); padding: 32px; }
      .brand {
        margin: 0 0 20px; font-family: Georgia, "Times New Roman", serif;
        font-size: 22px; font-weight: 600; letter-spacing: -0.02em;
      }
      .star { color: #fbbf24; font-size: 13px; }
      h1 {
        margin: 0 0 12px; font-size: 12px; font-weight: 600;
        letter-spacing: 0.2em; text-transform: uppercase;
      }
      p { margin: 0; font-size: 13px; line-height: 1.6; color: var(--muted); }
      strong { color: var(--fg); font-weight: 600; }
    </style>
  </head>
  <body>
    <div class="card">
      <p class="brand">Onloz <span class="star">&#9733;</span></p>
      <h1>Signed out</h1>
      <p>
        Your admin credentials have been cleared. Reload <strong>/admin</strong>
        to sign in again.
      </p>
    </div>
  </body>
</html>`

export function GET() {
  return new NextResponse(PAGE, {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="admin"',
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  })
}
