// Shared domain types for clients + owner profiles + server-action shapes.

export type ClientFormFields = {
  businessName?: string
  businessDescription?: string
  googleReviewUrl?: string
}

export type ClientFormState = {
  success?: boolean
  error?: string
  fields?: ClientFormFields
}

export type DeleteResult = {
  success?: boolean
  error?: string
}

export type ClientReview = {
  id: string
  client_id: string
  rating: number
  review_text: string
  created_at: string
  /** Tags the customer selected when writing this review (reporting). */
  tags?: string[] | null
}

export type OwnerProfile = {
  id: string
  email: string
  name: string
}

export type Client = {
  id: string
  slug: string
  business_name: string
  business_description: string
  google_review_url: string
  created_at: string
  owner_id: string | null
}

// Prop types used by client components so one set of components serves both the
// admin and the business-owner portal (each supplies its own server actions).
export type ClientFormAction = (
  prev: ClientFormState,
  formData: FormData
) => Promise<ClientFormState>

export type DeleteAction = (clientId: string) => Promise<DeleteResult>

/** Rating + tags only (no review text) — light enough to load for the whole history. */
export type ClientReviewStats = {
  rating: number
  tags?: string[] | null
}

/**
 * One page of a client's review history. `reviews` is a slice (newest first);
 * `ratings` covers the entire history but carries no text, so the client can
 * compute an accurate average and tag insight without loading every message.
 */
export type ReviewPage = {
  reviews: ClientReview[]
  ratings: ClientReviewStats[]
  hasMore: boolean
}

export type ReviewFetchAction = (
  clientId: string,
  offset?: number
) => Promise<ReviewPage>

/** Save the full ordered tag list for a client (owner portal). */
export type TagSaveAction = (clientId: string, tags: string[]) => Promise<DeleteResult>
