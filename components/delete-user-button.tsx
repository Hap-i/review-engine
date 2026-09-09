"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { deleteUser } from "@/app/admin/actions"
import { cn } from "@/lib/utils"

/** Two-step confirm delete for a business-owner user. */
export function DeleteUserButton({ userId }: { userId: string }) {
  const router = useRouter()
  const [armed, setArmed] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleClick() {
    if (!armed) {
      setArmed(true)
      setTimeout(() => setArmed(false), 3000)
      return
    }
    if (busy) return

    setBusy(true)
    setError(null)
    const result = await deleteUser(userId)
    setBusy(false)

    if (result.error) {
      setError(result.error)
      setArmed(false)
      return
    }
    router.refresh()
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={handleClick}
        disabled={busy}
        className={cn(
          "inline-flex h-7 items-center justify-center border px-2.5 text-[11px] font-semibold tracking-widest uppercase transition-all",
          busy
            ? "cursor-wait border-border bg-muted text-muted-foreground/50"
            : armed
              ? "border-transparent bg-destructive text-white hover:bg-destructive/80"
              : "border-destructive/50 bg-background text-destructive hover:bg-destructive/10"
        )}
      >
        {busy ? "Deleting…" : armed ? "Click to confirm" : "Delete"}
      </button>
      {error && <p className="text-[11px] text-destructive">{error}</p>}
    </div>
  )
}
