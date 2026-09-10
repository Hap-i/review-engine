import Link from "next/link"
import {
  RiAddLine,
  RiCloseLine,
  RiSearchLine,
  RiTeamLine,
} from "@remixicon/react"
import { getSupabaseAdmin } from "@/lib/supabase"
import { cn } from "@/lib/utils"
import { formatDate } from "@/lib/format"
import { homeHref } from "@/lib/site"
import { baseUrl } from "@/lib/url"
import { AddClientForm } from "@/components/add-client-form"
import { ClientRow } from "@/components/client-row"
import { ClientModalScope } from "@/components/client-modal-scope"
import { CreateUserForm } from "@/components/create-user-form"
import { DeleteUserButton } from "@/components/delete-user-button"
import { BrandMark } from "@/components/marketing/primitives"
import type { Client, OwnerProfile } from "@/lib/types"

export const dynamic = "force-dynamic"

const PER_PAGE = 20
const CLIENT_SELECT =
  "id, slug, business_name, business_description, google_review_url, created_at, owner_id, owner:profiles(email, name)"

type ClientWithOwner = Client & {
  owner?: { email: string; name: string } | null
}

type UserRow = {
  id: string
  email: string
  name: string
  max_clients: number
  created_at: string
  used: number
}

const tabClass = {
  base: "-mb-px inline-flex items-center gap-1.5 border-b-2 px-1 pb-2.5 text-xs font-semibold uppercase tracking-widest transition-colors",
  idle: "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
  active: "border-foreground text-foreground",
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string; tab?: string }>
}) {
  const { q, page, tab } = await searchParams
  const query = (typeof q === "string" ? q : "").trim()
  const requestedPage = Math.max(1, parseInt(page ?? "1", 10) || 1)
  const isAddTab = tab === "add"
  const isUsersTab = tab === "users"

  let clients: ClientWithOwner[] = []
  let reviewCounts: Record<string, number> = {}
  let tagsByClient: Record<string, string[]> = {}
  let users: UserRow[] = []
  let owners: OwnerProfile[] = []
  let listTotal = 0
  let loadError: string | null = null

  // Clients, Add-client, and Users tabs all surface owner info. The two loads
  // are independent, so they run together — awaiting one after the other cost
  // a full extra round trip on every admin navigation.
  const [usersSettled, clientsSettled] = await Promise.allSettled([
    loadUsers(),
    !isUsersTab && !isAddTab
      ? loadClients(query, requestedPage)
      : Promise.resolve(null),
  ])

  if (usersSettled.status === "fulfilled") {
    users = usersSettled.value
  } else {
    console.error("Failed to load users", usersSettled.reason)
    if (isUsersTab) {
      loadError = `Loading users failed: ${describeError(usersSettled.reason)}`
    }
  }
  owners = users.map(({ id, name, email }) => ({ id, name, email }))

  if (isUsersTab) {
    listTotal = users.length
  } else if (clientsSettled.status === "fulfilled" && clientsSettled.value) {
    const result = clientsSettled.value
    clients = result.clients
    reviewCounts = result.reviewCounts
    tagsByClient = result.tagsByClient
    listTotal = result.total
  } else if (clientsSettled.status === "rejected") {
    loadError =
      clientsSettled.reason instanceof Error
        ? clientsSettled.reason.message
        : String(clientsSettled.reason)
  }

  const totalPages = Math.max(1, Math.ceil(listTotal / PER_PAGE))
  const currentPage = Math.min(requestedPage, totalPages)
  const start = listTotal === 0 ? 0 : (currentPage - 1) * PER_PAGE + 1
  const end = Math.min(currentPage * PER_PAGE, listTotal)
  const searchTerm = sanitizeSearchTerm(query)
  const pager =
    totalPages > 1 ? (
      <Pager
        currentPage={currentPage}
        totalPages={totalPages}
        query={query}
        tab={isUsersTab ? "users" : "clients"}
      />
    ) : null

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-5xl flex-col gap-8 px-6 py-10">
      <header className="flex flex-wrap items-start justify-between gap-x-6 gap-y-5">
        <div className="min-w-0">
          <BrandMark href={homeHref()} className="mb-4" />
          <h1 className="text-2xl font-bold tracking-tight">Admin</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Invite business owners, assign clients, and manage everything from
            one place.
          </p>
        </div>

        {/*
          A plain <a>, not <Link>: signing out depends on the browser seeing a
          real 401 document response, which client-side routing would swallow.
        */}
        <a
          href="/admin/logout"
          className="inline-flex h-9 shrink-0 items-center justify-center border border-border bg-card px-3 font-mono text-[11px] font-semibold tracking-widest text-muted-foreground uppercase transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          Log out
        </a>
      </header>

      <nav
        className="flex gap-6 border-b border-border"
        aria-label="Admin sections"
      >
        <TabLink
          href="/admin"
          active={!isAddTab && !isUsersTab}
          icon={<RiSearchLine className="size-4" />}
          label="Clients"
        />
        <TabLink
          href="/admin?tab=users"
          active={isUsersTab}
          icon={<RiTeamLine className="size-4" />}
          label="Users"
        />
        <TabLink
          href="/admin?tab=add"
          active={isAddTab}
          icon={<RiAddLine className="size-4" />}
          label="Add client"
        />
      </nav>

      {isAddTab ? (
        <section className="w-full max-w-xl border border-border bg-card p-5">
          <h2 className="mb-4 text-xs tracking-widest text-muted-foreground uppercase">
            Add a client
          </h2>
          <AddClientForm owners={owners} />
        </section>
      ) : isUsersTab ? (
        <UsersTab users={users} loadError={loadError} />
      ) : (
        <>
          {loadError && <LoadError message={loadError} />}

          <section className="flex flex-col gap-4">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold">All clients</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Search by business name or slug. Expand a row for its link, QR
                  code, reviews and owner.
                </p>
              </div>
              <p className="text-xs tracking-widest text-muted-foreground uppercase">
                {listTotal} client{listTotal === 1 ? "" : "s"}
              </p>
            </div>

            <form method="get" className="flex items-stretch gap-2">
              <label className="relative flex-1" htmlFor="search">
                <RiSearchLine className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="search"
                  name="q"
                  defaultValue={query}
                  placeholder="Search by business name or slug…"
                  className="h-10 w-full rounded-none border border-border bg-card pr-3 pl-9 text-sm outline-none focus:border-ring focus:ring-1 focus:ring-ring/50"
                />
              </label>
              <button
                type="submit"
                className="inline-flex h-10 items-center justify-center border border-transparent bg-primary px-4 text-xs font-semibold tracking-widest text-primary-foreground uppercase hover:bg-primary/80"
              >
                Search
              </button>
              {query && (
                <Link
                  href="/admin"
                  className="inline-flex h-10 items-center justify-center gap-1.5 border border-border bg-card px-3 text-xs tracking-widest text-muted-foreground uppercase hover:bg-muted hover:text-foreground"
                >
                  <RiCloseLine className="size-4" />
                  Clear
                </Link>
              )}
            </form>

            {clients.length === 0 ? (
              <p className="border border-dashed border-border bg-card p-6 text-sm text-muted-foreground">
                {searchTerm
                  ? `No clients match “${query}”.`
                  : "No clients yet. Add one from the Add client tab, or let an owner onboard their own."}
              </p>
            ) : (
              <ClientModalScope>
                <div className="overflow-x-auto border border-border bg-card">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="text-xs tracking-widest text-muted-foreground uppercase">
                      <th className="px-4 py-3 font-medium">Client</th>
                      <th className="px-4 py-3 text-right font-medium">
                        Reviews
                      </th>
                      <th className="px-4 py-3 text-right font-medium">
                        Added
                      </th>
                      <th className="w-24 px-2 py-3" aria-hidden="true" />
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((client) => (
                      <ClientRow
                        key={client.id}
                        client={client}
                        reviewCount={reviewCounts[client.id] ?? 0}
                        publicUrl={`${baseUrl()}/r/${client.slug}`}
                        ownerLabel={client.owner?.email ?? "Unassigned"}
                        owners={owners}
                        tags={tagsByClient[client.id] ?? []}
                      />
                    ))}
                  </tbody>
                </table>

                {pager && (
                  <div className="flex items-center justify-between gap-4 border-t border-border px-4 py-3 text-xs">
                    <p className="text-muted-foreground">
                      Showing{" "}
                      <span className="text-foreground tabular-nums">
                        {start}–{end}
                      </span>{" "}
                      of{" "}
                      <span className="text-foreground tabular-nums">
                        {listTotal}
                      </span>
                    </p>
                    {pager}
                  </div>
                )}
                </div>
              </ClientModalScope>
            )}
          </section>
        </>
      )}
    </main>
  )
}

function TabLink({
  href,
  active,
  icon,
  label,
}: {
  href: string
  active: boolean
  icon: React.ReactNode
  label: string
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(tabClass.base, active ? tabClass.active : tabClass.idle)}
    >
      {icon}
      {label}
    </Link>
  )
}

function UsersTab({
  users,
  loadError,
}: {
  users: UserRow[]
  loadError: string | null
}) {
  return (
    <section className="flex flex-col gap-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,360px)_1fr] lg:items-start">
        <div className="border border-border bg-card p-5 lg:sticky lg:top-6">
          <h2 className="mb-1 text-base font-semibold">
            Create a business owner
          </h2>
          <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
            The owner logs in at /portal with this email and password. Share the
            password once.
          </p>
          <CreateUserForm />
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-xs tracking-widest text-muted-foreground uppercase">
            Owners ({users.length})
          </h2>

          {loadError ? (
            <LoadError message={loadError} />
          ) : users.length === 0 ? (
            <p className="border border-dashed border-border bg-card p-6 text-sm text-muted-foreground">
              No owners yet. Create the first business owner on the left.
            </p>
          ) : (
            <div className="overflow-x-auto border border-border bg-card">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="text-xs tracking-widest text-muted-foreground uppercase">
                    <th className="px-4 py-3 font-medium">Owner</th>
                    <th className="px-4 py-3 text-right font-medium">
                      Clients
                    </th>
                    <th className="px-4 py-3 text-right font-medium">Joined</th>
                    <th className="w-14 px-2 py-3" aria-hidden="true" />
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="border-t border-border">
                      <td className="px-4 py-3 align-middle">
                        <div className="leading-tight font-medium">
                          {user.name}
                        </div>
                        <div className="mt-0.5 text-[11px] tracking-wider text-muted-foreground uppercase">
                          {user.email}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right align-middle">
                        <span className="text-sm tabular-nums">
                          {user.used}
                          <span className="text-muted-foreground">
                            {" "}
                            / {user.max_clients}
                          </span>
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right align-middle">
                        <span className="text-xs whitespace-nowrap text-muted-foreground">
                          {formatDate(user.created_at)}
                        </span>
                      </td>
                      <td className="px-2 py-2 text-right align-middle">
                        <DeleteUserButton userId={user.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function LoadError({ message }: { message: string }) {
  return (
    <section className="border border-destructive/50 bg-destructive/10 p-5 text-sm">
      <h2 className="mb-1 text-xs font-semibold tracking-widest text-destructive uppercase">
        Could not load data
      </h2>
      <p className="text-foreground">{message}</p>
      <p className="mt-2 text-xs text-muted-foreground">
        Check that you&apos;ve applied <code>supabase/schema.sql</code> in the
        Supabase SQL editor and that the keys in <code>.env.local</code> are
        correct.
      </p>
    </section>
  )
}

function Pager({
  currentPage,
  totalPages,
  query,
  tab,
}: {
  currentPage: number
  totalPages: number
  query: string
  tab: string
}) {
  const disabledCls =
    "inline-flex h-7 cursor-not-allowed items-center border border-border px-2.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/40"
  const linkCls =
    "inline-flex h-7 items-center border border-border bg-background px-2.5 text-[11px] font-semibold uppercase tracking-widest text-foreground hover:bg-muted"

  return (
    <nav className="flex items-center gap-1" aria-label="Pagination">
      {currentPage > 1 ? (
        <Link href={pageHref(currentPage - 1, query, tab)} className={linkCls}>
          Previous
        </Link>
      ) : (
        <span className={disabledCls}>Previous</span>
      )}
      <span className="px-3 text-muted-foreground">
        Page <span className="text-foreground tabular-nums">{currentPage}</span>{" "}
        of <span className="text-foreground tabular-nums">{totalPages}</span>
      </span>
      {currentPage < totalPages ? (
        <Link href={pageHref(currentPage + 1, query, tab)} className={linkCls}>
          Next
        </Link>
      ) : (
        <span className={disabledCls}>Next</span>
      )}
    </nav>
  )
}

async function loadUsers(): Promise<UserRow[]> {
  const supabase = getSupabaseAdmin()
  const { data: rows, error } = await supabase
    .from("profiles")
    .select("id, email, name, max_clients, created_at")
    .order("created_at", { ascending: false })
  if (error) {
    console.error("Failed to load users", error)
    throw new Error(`Loading users failed: ${describeError(error)}`)
  }

  const users = (rows ?? []) as Omit<UserRow, "used">[]
  const usedById: Record<string, number> = {}
  if (users.length > 0) {
    const { data: counts } = await supabase
      .from("clients")
      .select("owner_id")
      .in(
        "owner_id",
        users.map((u) => u.id)
      )
    for (const row of counts ?? []) {
      usedById[row.owner_id] = (usedById[row.owner_id] ?? 0) + 1
    }
  }

  return users.map((u) => ({ ...u, used: usedById[u.id] ?? 0 }))
}

async function loadClients(
  query: string,
  requestedPage: number
): Promise<{
  clients: ClientWithOwner[]
  reviewCounts: Record<string, number>
  tagsByClient: Record<string, string[]>
  total: number
}> {
  const supabase = getSupabaseAdmin()
  const filter = buildFilter(query)

  let countQuery = supabase
    .from("clients")
    .select("id", { count: "exact", head: true })
  if (filter) countQuery = countQuery.or(filter)
  const { count, error: countError } = await countQuery
  if (countError) {
    console.error("Failed to count clients", countError)
    throw new Error(`Loading clients failed: ${describeError(countError)}`)
  }

  const total = count ?? 0
  const totalPages = Math.max(1, Math.ceil(total / PER_PAGE))
  const page = Math.min(requestedPage, totalPages)
  const from = (page - 1) * PER_PAGE
  const to = page * PER_PAGE - 1

  let pageQuery = supabase.from("clients").select(CLIENT_SELECT)
  if (filter) pageQuery = pageQuery.or(filter)
  const { data: clients, error: pageError } = await pageQuery
    .order("created_at", { ascending: false })
    .range(from, to)
  if (pageError) {
    console.error("Failed to load clients", pageError)
    throw new Error(`Loading clients failed: ${describeError(pageError)}`)
  }

  const reviewCounts: Record<string, number> = {}
  const tagsByClient: Record<string, string[]> = {}
  const ids = (clients ?? []).map((c) => c.id)
  if (ids.length > 0) {
    const [{ data: rows, error: reviewError }, { data: tagRows, error: tagError }] =
      await Promise.all([
        supabase.from("reviews").select("client_id").in("client_id", ids),
        supabase
          .from("client_tags")
          .select("client_id, label")
          .in("client_id", ids)
          .order("position", { ascending: true }),
      ])
    if (reviewError) {
      console.error("Failed to count reviews", reviewError)
      throw new Error(`Loading reviews failed: ${describeError(reviewError)}`)
    }
    if (tagError) {
      console.error("Failed to load tags", tagError)
      throw new Error(`Loading tags failed: ${describeError(tagError)}`)
    }
    for (const row of rows ?? []) {
      reviewCounts[row.client_id] = (reviewCounts[row.client_id] ?? 0) + 1
    }
    for (const row of tagRows ?? []) {
      const list = tagsByClient[row.client_id] ?? []
      list.push(row.label)
      tagsByClient[row.client_id] = list
    }
  }

  return {
    clients: (clients ?? []) as unknown as ClientWithOwner[],
    reviewCounts,
    tagsByClient,
    total,
  }
}

/** PostgREST `or` filter matching name or slug, or null when there's no term. */
function buildFilter(query: string): string | null {
  const term = sanitizeSearchTerm(query)
  if (!term) return null
  return `business_name.ilike.%${term}%,slug.ilike.%${term}%`
}

/** Strip characters that would break the PostgREST filter or act as wildcards. */
function sanitizeSearchTerm(value: string): string {
  return value
    .replace(/[%_,'"(),]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

/** Supabase errors can be sparse objects; pull out any human-readable fields. */
function describeError(error: unknown): string {
  if (typeof error === "object" && error !== null) {
    const record = error as Record<string, unknown>
    const parts = [
      record.message,
      record.details,
      record.hint,
      record.code,
    ].filter((v): v is string => typeof v === "string" && v.length > 0)
    if (parts.length > 0) return parts.join(" — ")
    if (record.name) return String(record.name)
  }
  return String(error)
}

function pageHref(page: number, query: string, tab: string): string {
  const params = new URLSearchParams()
  if (query) params.set("q", query)
  params.set("page", String(page))
  if (tab && tab !== "clients") params.set("tab", tab)
  return `?${params.toString()}`
}
