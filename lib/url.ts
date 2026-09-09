/** Public base URL used to build absolute links / QR content. */
export function baseUrl(): string {
  return (process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000").replace(
    /\/$/,
    ""
  )
}
