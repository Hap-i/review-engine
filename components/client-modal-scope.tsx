"use client"

import { createContext, useCallback, useContext, useState } from "react"
import type { ReactNode } from "react"

export type ClientModalKind = "edit" | "tags"

type ClientModalState = { kind: ClientModalKind; clientId: string } | null

type ModalScopeValue = {
  /** The modal currently open across the whole table, if any. */
  active: ClientModalState
  openModal: (kind: ClientModalKind, clientId: string) => void
  closeModal: () => void
}

const ModalScopeContext = createContext<ModalScopeValue | null>(null)

/**
 * Owns the single "which row has a dialog open" state for a client table.
 * Each ClientRow renders its Edit / Manage-tags dialog only when it is the
 * active row, so opening one dialog closes any other — no stacked modals.
 * ClientRow throws if used without a provider, so wiring mistakes surface.
 */
export function ClientModalScope({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<ClientModalState>(null)

  const openModal = useCallback(
    (kind: ClientModalKind, clientId: string) => setActive({ kind, clientId }),
    []
  )
  const closeModal = useCallback(() => setActive(null), [])

  return (
    <ModalScopeContext.Provider value={{ active, openModal, closeModal }}>
      {children}
    </ModalScopeContext.Provider>
  )
}

export function useClientModalScope() {
  const value = useContext(ModalScopeContext)
  if (!value) {
    throw new Error(
      "useClientModalScope must be used within a <ClientModalScope> — " +
        "wrap the client table in <ClientModalScope> (see /portal/clients and /admin)."
    )
  }
  return value
}
