"use client"

import { useState } from "react"
import {
  RiArrowDownSLine,
  RiArrowRightSLine,
  RiEditLine,
  RiStarFill,
} from "@remixicon/react"
import {
  deleteClient,
  getClientReviews,
  updateClient,
} from "@/app/admin/actions"
import { formatDate, formatDateTime } from "@/lib/format"
import { cn } from "@/lib/utils"
import { QrCode } from "@/components/qr-code"
import { CopyLinkButton } from "@/components/copy-link-button"
import { EditClientModal } from "@/components/edit-client-modal"
import { DeleteClientButton } from "@/components/delete-client-button"
import { TagEditor } from "@/components/tag-editor"
import { TagInsightList } from "@/components/tag-insight"
import { computeTagInsight } from "@/lib/tag-insight"
import type {
  Client,
  ClientFormAction,
  ClientReview,
  DeleteAction,
  OwnerProfile,
  ReviewFetchAction,
  TagSaveAction,
} from "@/lib/types"

type ClientRowProps = {
  client: Client
  reviewCount: number
  publicUrl: string
  /** Optional label (owner email or "Unassigned") shown under the name — admin only. */
  ownerLabel?: string | null
  /** Admin-only: pass profiles to enable reassigning ownership in the edit modal. */
  owners?: OwnerProfile[]
  /** Overrides below let the owner portal use its own scoped server actions. */
  getReviews?: ReviewFetchAction
  editAction?: ClientFormAction
  deleteAction?: DeleteAction
  /** Owner portal only: this business's tags and the action that saves them. */
  tags?: string[]
  saveTags?: TagSaveAction
}

const actionLinkClass =
  "inline-flex h-7 items-center justify-center border border-border bg-background px-2.5 text-[11px] font-semibold uppercase tracking-widest text-foreground hover:bg-muted"

export function ClientRow({
  client,
  reviewCount,
  publicUrl,
  ownerLabel,
  owners,
  getReviews = getClientReviews,
  editAction = updateClient,
  deleteAction = deleteClient,
  tags,
  saveTags,
}: ClientRowProps) {
  const [expanded, setExpanded] = useState(false)
  const [reviews, setReviews] = useState<ClientReview[] | null>(null)
  const [loadingReviews, setLoadingReviews] = useState(false)
  const [editing, setEditing] = useState(false)
  const [managingTags, setManagingTags] = useState(false)

  async function handleToggle() {
    const next = !expanded
    setExpanded(next)
    if (next && reviews === null && !loadingReviews) {
      setLoadingReviews(true)
      const rows = await getReviews(client.id)
      setReviews(rows)
      setLoadingReviews(false)
    }
  }

  const average =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : null

  const tagInsight = reviews ? computeTagInsight(reviews) : null

  return (
    <>
      <tr className="border-t border-border">
        <td className="px-4 py-3 align-middle">
          <div className="leading-tight font-medium">
            {client.business_name}
          </div>
          <div className="mt-0.5 font-mono text-[11px] tracking-wider text-muted-foreground uppercase">
            /r/{client.slug}
          </div>
          {ownerLabel != null && ownerLabel !== "" && (
            <div className="mt-0.5 text-[11px] tracking-wider text-muted-foreground/80 uppercase">
              Owner · {ownerLabel}
            </div>
          )}
        </td>
        <td className="px-4 py-3 text-right align-middle">
          <span
            className={cn(
              "text-sm tabular-nums",
              reviewCount === 0 && "text-muted-foreground"
            )}
          >
            {reviewCount}
          </span>
        </td>
        <td className="px-4 py-3 text-right align-middle">
          <span className="text-xs whitespace-nowrap text-muted-foreground">
            {formatDate(client.created_at)}
          </span>
        </td>
        <td className="px-2 py-1 text-right align-middle">
          <div className="flex justify-end gap-1">
            <button
              type="button"
              onClick={() => setEditing(true)}
              aria-label={`Edit ${client.business_name}`}
              title="Edit"
              className="inline-flex size-8 items-center justify-center rounded-none border border-border bg-background text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
            >
              <RiEditLine className="size-4" />
            </button>
            <button
              type="button"
              onClick={handleToggle}
              aria-expanded={expanded}
              aria-label={expanded ? "Hide details" : "Show details"}
              className={cn(
                "inline-flex size-8 items-center justify-center rounded-none border border-border bg-background text-muted-foreground transition-all hover:bg-muted hover:text-foreground",
                expanded && "bg-muted text-foreground"
              )}
            >
              {expanded ? (
                <RiArrowDownSLine className="size-4" />
              ) : (
                <RiArrowRightSLine className="size-4" />
              )}
            </button>
          </div>
        </td>
      </tr>

      {expanded && (
        <tr className="border-t border-border">
          <td colSpan={4} className="bg-card p-0">
            <div className="grid gap-8 border-l-2 border-primary/40 p-6 md:grid-cols-[minmax(0,1fr)_auto]">
              {/* Details + reviews */}
              <div className="flex min-w-0 flex-col gap-6">
                {client.business_description && (
                  <div>
                    <h3 className="text-xs tracking-widest text-muted-foreground uppercase">
                      About
                    </h3>
                    <p className="mt-2 max-w-prose text-sm leading-relaxed text-foreground/90">
                      {client.business_description}
                    </p>
                  </div>
                )}

                <div>
                  <h3 className="text-xs tracking-widest text-muted-foreground uppercase">
                    Google review link
                  </h3>
                  <a
                    href={client.google_review_url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block max-w-full text-xs break-all text-foreground underline underline-offset-4 hover:text-primary"
                  >
                    {client.google_review_url}
                  </a>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-xs tracking-widest text-muted-foreground uppercase">
                      Recent reviews
                    </h3>
                    {average !== null && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <span
                          className="flex gap-0.5"
                          aria-label={`${average.toFixed(1)} average`}
                        >
                          {[1, 2, 3, 4, 5].map((value) => (
                            <RiStarFill
                              key={value}
                              className={
                                value <= Math.round(average)
                                  ? "size-3.5 text-amber-400"
                                  : "size-3.5 text-muted-foreground/30"
                              }
                            />
                          ))}
                        </span>
                        {average.toFixed(1)}
                      </span>
                    )}
                  </div>

                  {loadingReviews ? (
                    <p className="mt-3 text-xs text-muted-foreground">
                      Loading reviews…
                    </p>
                  ) : reviews && reviews.length === 0 ? (
                    <p className="mt-3 text-xs text-muted-foreground">
                      No reviews recorded yet.
                    </p>
                  ) : (
                    <ul className="mt-3 flex flex-col divide-y divide-border border border-border bg-background">
                      {reviews?.slice(0, 20).map((review) => (
                        <li key={review.id} className="px-3 py-3">
                          <div className="flex items-center justify-between gap-3">
                            <span
                              className="flex gap-0.5"
                              aria-label={`${review.rating} stars`}
                            >
                              {[1, 2, 3, 4, 5].map((value) => (
                                <RiStarFill
                                  key={value}
                                  className={
                                    value <= review.rating
                                      ? "size-3.5 text-amber-400"
                                      : "size-3.5 text-muted-foreground/30"
                                  }
                                />
                              ))}
                            </span>
                            <span className="shrink-0 text-[11px] tracking-wider text-muted-foreground uppercase">
                              {formatDateTime(review.created_at)}
                            </span>
                          </div>
                          <p className="mt-1.5 text-sm leading-relaxed whitespace-pre-wrap">
                            {review.review_text}
                          </p>
                          {review.tags && review.tags.length > 0 && (
                            <ul className="mt-1.5 flex flex-wrap gap-1.5">
                              {review.tags.map((tag) => (
                                <li
                                  key={tag}
                                  className="border border-foreground/25 bg-muted px-1.5 py-0.5 text-[10px] tracking-wide text-muted-foreground uppercase"
                                >
                                  {tag}
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}

                  {tagInsight && <TagInsightList items={tagInsight} />}

                  {saveTags && (
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-xs tracking-widest text-muted-foreground uppercase">
                          Review tags
                        </h3>
                        <button
                          type="button"
                          onClick={() => setManagingTags(true)}
                          className={actionLinkClass}
                        >
                          Manage
                        </button>
                      </div>
                      {tags && tags.length > 0 ? (
                        <ul className="mt-2 flex flex-wrap gap-1.5">
                          {tags.map((tag) => (
                            <li
                              key={tag}
                              className="border border-foreground/25 bg-muted px-2 py-0.5 text-xs"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-2 text-xs text-muted-foreground">
                          No tags yet. Add some so reviewers can say what stood
                          out or needed work.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* QR + actions */}
              <div className="flex flex-col items-center gap-4 md:items-stretch">
                <QrCode value={publicUrl} filename={client.slug} />

                <div className="flex max-w-[220px] flex-col items-center gap-2">
                  <span className="w-full text-center text-[11px] leading-snug break-all text-muted-foreground">
                    {publicUrl}
                  </span>
                  <div className="flex gap-2">
                    <CopyLinkButton text={publicUrl} label="Copy link" />
                    <a
                      href={publicUrl}
                      target="_blank"
                      rel="noreferrer"
                      className={actionLinkClass}
                    >
                      Open
                    </a>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 md:justify-end">
                  <button
                    type="button"
                    onClick={() => setEditing(true)}
                    className={actionLinkClass}
                  >
                    Edit
                  </button>
                  <DeleteClientButton
                    clientId={client.id}
                    deleteAction={deleteAction}
                  />
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}

      {editing && (
        <EditClientModal
          client={{
            id: client.id,
            slug: client.slug,
            business_name: client.business_name,
            business_description: client.business_description,
            google_review_url: client.google_review_url,
            owner_id: client.owner_id,
          }}
          action={editAction}
          owners={owners}
          tags={tags ?? []}
          onClose={() => setEditing(false)}
        />
      )}

      {managingTags && saveTags && (
        <TagEditor
          clientId={client.id}
          clientName={client.business_name}
          initialTags={tags ?? []}
          saveAction={saveTags}
          onClose={() => setManagingTags(false)}
        />
      )}
    </>
  )
}
