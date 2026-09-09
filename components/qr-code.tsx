"use client"

import { useRef, useState } from "react"
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react"
import { cn } from "@/lib/utils"

const DOWNLOAD_SIZE = 1024
const DOWNLOAD_MARGIN = 2

/**
 * A client's QR code with a "Download PNG" action. The on-screen preview is an
 * SVG; an off-screen, high-resolution canvas (invisible to layout) is rendered
 * purely so the browser can serialize it to a crisp PNG for download.
 */
export function QrCode({
  value,
  filename,
  size = 168,
}: {
  value: string
  filename: string
  size?: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [downloading, setDownloading] = useState(false)

  async function handleDownload() {
    const canvas = canvasRef.current
    if (!canvas || downloading) return
    setDownloading(true)
    try {
      const url = canvas.toDataURL("image/png")
      const anchor = document.createElement("a")
      anchor.href = url
      anchor.download = `${sanitizeFilename(filename)}-qr.png`
      document.body.appendChild(anchor)
      anchor.click()
      anchor.remove()
    } finally {
      // Give the browser a beat to start the download before re-enabling.
      setTimeout(() => setDownloading(false), 800)
    }
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="border border-border bg-white p-2">
        <QRCodeSVG
          value={value}
          size={size}
          marginSize={1}
          bgColor="#ffffff"
          fgColor="#000000"
        />
      </div>
      <button
        type="button"
        onClick={handleDownload}
        disabled={downloading}
        className={cn(
          "inline-flex h-7 items-center justify-center border px-2.5 text-[11px] font-semibold uppercase tracking-widest transition-all",
          downloading
            ? "cursor-wait border-border bg-muted text-muted-foreground/50"
            : "border-border bg-background text-foreground hover:bg-muted",
        )}
      >
        {downloading ? "Preparing…" : "Download PNG"}
      </button>

      {/* High-res source for the download; kept out of layout and out of the way of pointers. */}
      <div aria-hidden className="pointer-events-none fixed left-[-10000px] top-0">
        <QRCodeCanvas
          ref={canvasRef}
          value={value}
          size={DOWNLOAD_SIZE}
          marginSize={DOWNLOAD_MARGIN}
          bgColor="#ffffff"
          fgColor="#000000"
        />
      </div>
    </div>
  )
}

function sanitizeFilename(value: string): string {
  return value.replace(/[^a-z0-9-_]+/gi, "-").replace(/^-+|-+$/g, "").slice(0, 60) || "client"
}
