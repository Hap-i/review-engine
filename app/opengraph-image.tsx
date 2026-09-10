import { ImageResponse } from "next/og"

/**
 * The social card every page shares. Built with ImageResponse rather than
 * checked in as a PNG so the copy stays in one place and it re-renders at
 * build time when the tagline changes.
 *
 * Palette mirrored from app/icon.svg so the card matches the favicon.
 */

export const alt = "Onloz — Turn customer feedback into reviews"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const INK = "#1b1918"
const CREAM = "#f4f1ea"
const MUTED = "#a8a29e"
const FAINT = "#78716c"
const AMBER = "#fbbf24"

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: INK,
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Wordmark: the "O" ring from the favicon, amber star at its shoulder.
            The star is a rotated square — the default satori font has no glyph
            for ★, and ImageResponse fails the whole render trying to fetch one. */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", position: "relative", width: 54, height: 54 }}>
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: 999,
                border: `8px solid ${CREAM}`,
              }}
            />
            <div
              style={{
                display: "flex",
                position: "absolute",
                top: -7,
                right: -7,
                width: 20,
                height: 20,
                backgroundColor: AMBER,
                transform: "rotate(45deg)",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              marginLeft: 24,
              fontSize: 42,
              fontWeight: 700,
              color: CREAM,
              letterSpacing: "-0.02em",
            }}
          >
            Onloz
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 82,
              fontWeight: 700,
              lineHeight: 1.06,
              letterSpacing: "-0.03em",
              color: CREAM,
            }}
          >
            Turn customer feedback into reviews
          </div>
          <div style={{ display: "flex", marginTop: 26, fontSize: 32, color: MUTED }}>
            Less typing. More reviews. Less friction.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: "0.16em",
            color: FAINT,
          }}
        >
          ONLOZ.COM
        </div>
      </div>
    ),
    { ...size }
  )
}
