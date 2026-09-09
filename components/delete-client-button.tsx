"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { deleteClient } from "@/app/admin/actions"
import type { DeleteAction } from "@/lib/types"
import { cn } from "@/lib/utils"

type DeleteClientButtonProps = {
  clientId: string
  /** Server action used to delete (admin by default; portal passes its own). */
  deleteAction?: DeleteAction
}

/**
 * Two-step destructive button: first click arms it ("Confirm delete?"), the
 * second click actually deletes. Reviews are removed by the DB cascade.
 */
export function DeleteClientButton({
  clientId,
  deleteAction = deleteClient,
}: DeleteClientButtonProps) {
  const router = useRouter()
  const [armed, setArmed] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleClick() {
    if (!armed) {
      setArmed(true)
      // Disarm again if the user walks away.
      setTimeout(() => setArmed(false), 3000)
      return
    }
    if (busy) return

    setBusy(true)
    setError(null)
    const result = await deleteAction(clientId)
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
