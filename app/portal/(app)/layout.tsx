import { requireOwner } from "@/lib/portal"
import { PortalNav } from "@/components/portal-nav"

export default async function PortalAppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const owner = await requireOwner()

  return (
    <main className="flex min-h-svh flex-col bg-background">
      <PortalNav name={owner.name} email={owner.email} />
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-8">
        {children}
      </div>
    </main>
  )
}
