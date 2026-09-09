"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export function CopyLinkButton({ text, label = "Copy link" }: { text: string; label?: string }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Ignore — copying is a convenience, not critical.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={cn(
        "inline-flex h-6 items-center justify-center rounded-none border px-2 text-[11px] uppercase tracking-wider transition-all",
        copied
          ? "border-transparent bg-primary text-primary-foreground"
          : "border-border bg-background text-muted-foreground hover:text-foreground",
      )}
    >
      {copied ? "Copied" : label}
    </button>
  )
}
