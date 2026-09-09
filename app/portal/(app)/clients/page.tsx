import { getOwnedClients, requireOwner } from "@/lib/portal"
import { baseUrl } from "@/lib/url"
import { ClientRow } from "@/components/client-row"
import { ClientModalScope } from "@/components/client-modal-scope"
import { AddClientForm } from "@/components/add-client-form"
import {
  deleteOwnClient,
  getOwnClientReviews,
  onboardClient,
  setOwnClientTags,
  updateOwnClient,
} from "@/app/portal/actions"

export default async function PortalClientsPage() {
  const owner = await requireOwner()
  const { clients, reviewCounts, tagsByClient } = await getOwnedClients(
    owner.id
  )

  return (
    <ClientModalScope>
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My clients</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Onboard a business, then share its QR code or review link with
            customers.
          </p>
        </div>
        <p className="text-xs tracking-widest text-muted-foreground uppercase">
          {clients.length} of {owner.max_clients} clients used
        </p>
      </header>

      <section className="w-full max-w-xl border border-border bg-card p-5">
        <h2 className="mb-4 text-xs tracking-widest text-muted-foreground uppercase">
          Onboard a client
        </h2>
        <AddClientForm
          action={onboardClient}
          submitLabel="Onboard client"
          successMessage="Client onboarded — it appears in the list below."
        />
      </section>

      {clients.length === 0 ? (
        <p className="border border-dashed border-border bg-card p-6 text-sm text-muted-foreground">
          No clients yet. Onboard your first business above, then open its link
          or QR code to share with customers.
        </p>
      ) : (
        <div className="overflow-x-auto border border-border bg-card">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="text-xs tracking-widest text-muted-foreground uppercase">
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 text-right font-medium">Reviews</th>
                <th className="px-4 py-3 text-right font-medium">Added</th>
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
                  getReviews={getOwnClientReviews}
                  editAction={updateOwnClient}
                  deleteAction={deleteOwnClient}
                  tags={tagsByClient[client.id] ?? []}
                  saveTags={setOwnClientTags}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {clients.length >= owner.max_clients && (
        <p className="text-xs text-muted-foreground">
          You&apos;ve reached your quota of {owner.max_clients} clients. Contact
          your admin to raise it.
        </p>
      )}
    </ClientModalScope>
  )
}
