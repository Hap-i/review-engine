export type StarRating = 1 | 2 | 3 | 4 | 5

/**
 * Generate a Google-style review for a business given the customer's star
 * rating. Called server-side with the DeepSeek API key.
 */

const RATING_PROMPT: Record<StarRating, string> = {
  1: "1 star. The customer had a very poor experience. First-person, disappointed, honest but constructive and not abusive.",
  2: "2 stars. The customer had a poor experience with clear problems. First-person, honest and specific about what went wrong.",
  3: "3 stars. Mixed or average experience. First-person, balanced but honest, note what was okay and what fell short.",
  4: "4 stars. A good experience with minor drawbacks. First-person, positive and encouraging, mention a small thing that could be improved.",
  5: "5 stars. An excellent experience. First-person, warm, enthusiastic, recommend the business to others.",
}

/** Hard upper bound on review length, in words. */
const MAX_REVIEW_WORDS = 15

/**
 * Different "real customer" voices. One is picked at random per review so that
 * consecutive reviews don't read as the same writer.
 */
const PROMPT_VARIANTS: string[] = [
  "Write like a regular everyday shopper who just had an ordinary, low-key experience. Nothing dramatic.",
  "Write like a busy parent multitasking, thoughts a little scattered, quick and to the point.",
  "Write like a teenager texting a friend. Casual slang is fine, grammar can slip.",
  "Write like a no-nonsense older customer. Plain words, no fluff, says what they mean.",
  "Write like a minimalist who likes clean simple things. Brief, quietly pleased or quietly let down.",
  "Write like a loyal regular who has been coming a while and mentions it casually.",
  "Write like a first time customer, a little unsure, keeping it simple and honest.",
  "Write like a bargain hunter who cares about value and is blunt about price.",
  "Write like an excited fan who can barely hold it in. Short excited bursts.",
  "Write like a tired office worker typing a quick note after a long day. Minimal effort.",
  "Write like a college student, totally chill. Starting sentences with and or but is fine.",
  "Write like a skeptical person who got surprised, in a good or a bad way.",
  "Write like someone who almost never writes reviews. A little awkward but honest.",
  "Write like a traveler passing through who compares it to other places in a word or two.",
  "Write like someone who really cares about quality and says so plainly.",
  "Write like a person talking to themselves in small half-finished thoughts.",
  "Write like a straightforward, practical person. Direct and unemotional.",
  "Write like a happy shopper sharing lots of tiny little reactions.",
  "Write like a quiet introvert. Few words but genuine.",
  "Write like a person out for a walk who stops to leave a quick thought.",
  "Write like a polite complainer. Disappointed but still civil about it.",
  "Write like someone recommending it to a friend, casual and warm.",
  "Write like a customer who had one small issue but is mostly happy. Mention it, then move on.",
  "Write like someone in a hurry who still wants to help others decide. Very brief.",
  "Write like someone torn about whether to recommend it. Honest middle ground.",
  "Write like a calm, measured person with a slightly dry sense of humor.",
  "Write like an upbeat neighbor. Friendly and encouraging.",
  "Write like a fussy customer with high standards who spots small flaws fast.",
  "Write like someone comparing what they got to what they expected. Keep it short.",
  "Write like a visitor who is not fully fluent in English. Simple short words, a grammar slip or two.",
  "Write like a person so happy words sort of fail them, so they keep it very short.",
  "Write like a person who is annoyed but not angry. Matter of fact about the problem.",
  "Write like a reviewer who rambles a little, then trails off without a clean ending.",
  "Write like a person whose phone autocorrect fights them the whole time.",
  "Write like an efficient reviewer. Fewest words possible while still making the point.",
  "Write like a cheerful person who ends a sentence with an exclamation mark now and then.",
  "Write like a laid back person who is not too bothered either way. Chilled tone.",
  "Write like a cautious buyer warning others but staying fair.",
  "Write like a person who describes how a place or product feels more than listing facts.",
  "Write like a local who knows the area and talks about it like a neighbor.",
  "Write like a person who had high hopes and says plainly what let them down.",
  "Write like a happy customer leaving a positive note with one small honest gripe.",
  "Write like a person glad they gave it a shot. Unpretentious.",
  "Write like a fast typer who skips punctuation sometimes and leaves sentence fragments.",
  "Write like a nostalgic customer remembering an earlier good visit in few words.",
  "Write like a fair person giving a balanced take without overthinking it.",
  "Write like a person who almost did not try it and wants to share the surprise.",
  "Write like a straightforward reviewer. Short verdict, no comparisons.",
  "Write like a talkative texter who throws in filler words like honestly and anyway.",
  "Write like a one sentence reviewer who still gets the point across.",
  "Write like a person who is running late but still leaves a two line review out of spite for a slow day.",
  "Write like a mom whose kid just fell asleep, typing very carefully and quietly.",
  "Write like a person who is hangry and it comes through in a short grumpy note.",
  "Write like a night shift nurse on a break, tired but still fair.",
  "Write like a person who just finished a workout, a bit breathless and keyed up.",
  "Write like someone celebrating a small win today, so the review reads extra cheerful.",
  "Write like someone who had a rough morning but this place cheered them up a bit.",
  "Write like a mood-swing reviewer who starts annoyed, softens by the end, and admits it was okay after all.",
  "Write like a person who flips from loving it to doubting it within the same short review.",
  "Write like someone who was grumpy the whole time and then surprised themselves by liking it.",
  "Write like a very sleepy person writing a few hazy words before bed.",
  "Write like a person with a headache who just wants it over with, brief and flat.",
  "Write like someone recovering from a cold, a bit stuffy and out of sorts.",
  "Write like a person typing one handed while holding their groceries.",
  "Write like a voice-to-text user, so there are odd phrase turns and run-on messes.",
  "Write like a person dictating to their phone while driving, short and to the point.",
  "Write like a gamer who writes reviews like game chat, super casual.",
  "Write like a programmer who is allergic to fluff and appends a plain verdict.",
  "Write like a teacher who is clear and kind but keeps it brief.",
  "Write like a librarian who is precise and a little formal but still human.",
  "Write like a small business owner who understands how hard it is and is generous.",
  "Write like a barista comparing coffee to what they would serve.",
  "Write like a hairstylist who notices details other people miss.",
  "Write like a dog owner who brings their dog everywhere and mentions it.",
  "Write like a cat person who is hard to impress.",
  "Write like a contractor who judges workmanship and says so in few words.",
  "Write like a gardener talking about plants like old friends.",
  "Write like a fisherman who exaggerates a little, in a charming way.",
  "Write like a backpacker used to rough conditions, easily pleased or easily annoyed.",
  "Write like an expat who has lived here long enough to sound local.",
  "Write like a grandparent who is delighted but old-fashioned in wording.",
  "Write like a teenager who writes in lowercase and short fragments.",
  "Write like a tween full of superlatives, everything is the best ever.",
  "Write like a person with low literacy who writes honest, simple, sometimes misspelled words.",
  "Write like a semi-literate person who spells some words phonetically.",
  "Write like a person whose first language is not English but who writes longer than they should.",
  "Write like a bookish person who knows big words but keeps this note casual.",
  "Write like someone who uses fancy words slightly wrong, confidently.",
  "Write like a person who reads every review before buying and now writes their own short one.",
  "Write like a person who never trusts reviews but trusted this one and wants to confirm.",
  "Write like someone comparing this to two other places they tried, very briefly.",
  "Write like a person who almost returned it but changed their mind.",
  "Write like someone who bought on impulse and is reporting back how it went.",
  "Write like a cautious person who waited a while before reviewing to be sure.",
  "Write like a person reviewing right after unboxing, first impressions only.",
  "Write like a person reviewing weeks later, memory a little fuzzy but warm.",
  "Write like a regular who has been disappointed lately and is happy this visit went well.",
  "Write like a lapsed customer coming back after a long time and noticing changes.",
  "Write like a person whose expectations were low and who got pleasantly knocked out.",
  "Write like a person whose expectations were sky high and got a letdown.",
  "Write like a foodie reviewing with taste descriptions, not just likes.",
  "Write like a health-conscious person commenting on options and quality.",
  "Write like a person with allergies who is grateful for clear labeling.",
  "Write like a parent reviewing for kid friendliness and mess tolerance.",
  "Write like a cleanliness freak who notices one smudge and mentions it.",
  "Write like a packaging nerd who mentions how well things were packed.",
  "Write like a logistics-minded person focused on shipping speed and tracking.",
  "Write like a customer-service judge who mentions how issues were handled.",
  "Write like a returns-focused shopper who cares about easy refunds.",
  "Write like a person who rates value over everything and explains why.",
  "Write like a person who got exactly what the picture showed and is relieved.",
  "Write like a person who got something different from the listing and is annoyed.",
  "Write like a reviewer with a cold, dry wit, one deadpan line.",
  "Write like a person who uses understatement on purpose.",
  "Write like a hyperbolic person who exaggerates for fun but is honest underneath.",
  "Write like a minimalist who mentions clutter and overpackaging, briefly.",
  "Write like an eco-conscious person who notices sustainable touches.",
  "Write like a person allergic to hype who says what actually happened.",
  "Write like a hype-man who cannot help overselling a little.",
  "Write like a person who ends every review with an anyway or but yeah.",
  "Write like a person who rambles, circles back, and then stops abruptly.",
  "Write like a person who corrects themselves mid review, then keeps going.",
  "Write like a person who starts mid-thought, as if continuing an inner monologue.",
  "Write like a person who loves commas and never finishes a sentence, kind of, you know.",
  "Write like a person who writes in one long run-on sentence and barely breathes.",
  "Write like a person who skips capitals entirely.",
  "Write like a person who writes in ALL CAPS for emphasis but keeps it short.",
  "Write like a person whose punctuation is just periods, no commas anywhere.",
  "Write like a person using only exclamation marks to end every sentence.",
  "Write like a person who types out laughs like haha and lol but not too much.",
  "Write like a person who throws in ngl or tbh now and then.",
  "Write like a person who uses fr and tho a lot but otherwise normal.",
  "Write like a person who spells out words they are unsure about.",
  "Write like a person who abbreviates words to save time, like tho and pls.",
  "Write like a person who over explains a tiny detail that does not matter.",
  "Write like a person who gets sidetracked by something unrelated mid review.",
  "Write like a person who is reviewing mostly to warn people away or draw them in.",
  "Write like a helper-type person who always gives tips in reviews.",
  "Write like a person who adds a random disclaimer like im not an expert.",
  "Write like a person who suspects their experience was a one off and says so.",
  "Write like a person in a great mood who finds everything wonderful.",
  "Write like a person in a terrible mood who is trying not to take it out on the review.",
  "Write like a person who is sick of the weather and it colors the whole review.",
  "Write like a person who is waiting in line while writing this, impatient.",
  "Write like a person killing time on a bus, unhurried and chatty.",
  "Write like a person on their lunch break, quick and practical.",
  "Write like a person at a party sneaking away to write this, a bit distracted.",
  "Write like a person half watching TV while typing, so it trails.",
  "Write like a person who is about to board a flight and rushing.",
  "Write like a person who just landed and is testing their phone.",
  "Write like a nostalgic person comparing now to how it used to be.",
  "Write like a person who moved recently and is scoping out new spots.",
  "Write like a tourist who found a hidden gem and wants to share it.",
  "Write like a local who is protective about their favorite place and keeps it vague on purpose.",
  "Write like a person who works nearby and drops by often, casual shorthand.",
  "Write like a gig driver reviewing from the passenger seat experience.",
  "Write like a person who mostly orders delivery and rarely goes in person.",
  "Write like a person who went with a big group and is reporting the group verdict.",
  "Write like a solo diner who enjoys quiet corners.",
  "Write like a person who goes there alone with a book.",
  "Write like a person who is watching their budget this month and it shows.",
  "Write like a splurge-happy person who does not mind paying for good.",
  "Write like a person who compares the price to a competitor and is blunt.",
  "Write like a person who feels the price is fair for what you get.",
  "Write like a person who thinks it is overpriced and cannot get past it.",
  "Write like a person who thinks it is a steal and says so.",
  "Write like a penny-pincher who still admits it was worth it.",
  "Write like a person who bought the premium version and wonders if it mattered.",
  "Write like a person who chose the cheap option and got what they paid for.",
  "Write like a person who is glad they read reviews before choosing the better option.",
  "Write like a person reviewing with their partner in the room, occasionally quoting them.",
  "Write like a person whose friend recommended it and now owes the friend a thanks.",
  "Write like a person who recommended it to someone and feels responsible for the outcome.",
  "Write like a person who found it through a social media ad and is surprised it was real.",
  "Write like a person who saw it in a video and finally tried it.",
  "Write like a person who heard about it from family and went along.",
  "Write like a person who was dragged there by a friend and ended up liking it.",
  "Write like a person who talked a friend into it and is now reporting back.",
  "Write like a person who goes there for the ritual of it more than anything.",
  "Write like a person for whom this is a special occasion treat.",
  "Write like a person on a routine errand who found the visit above average.",
  "Write like a person comparing it to a memory of somewhere better.",
  "Write like a person comparing it to a memory of somewhere worse.",
  "Write like a person who keeps coming back despite a recurring small flaw.",
  "Write like a person who will not come back and gives the reason plainly.",
  "Write like a person who is undecided about returning and says maybe.",
  "Write like a person who is a creature of habit and does not like change.",
  "Write like a person who is easily pleased and happy to say so.",
  "Write like a person who is easily annoyed and owns it.",
  "Write like a person who laughs about bad experiences instead of fuming.",
  "Write like a person writing in their car before driving off.",
  "Write like a person who wrote and deleted this review three times.",
  "Write like a person who is shy about reviewing and keeps it very short.",
  "Write like a person who feels obliged to review because they always do.",
  "Write like a person who reviews only when something is very good or very bad.",
  "Write like a person who reviews everything they buy out of habit.",
  "Write like a person who found this by accident and is pleasantly reporting.",
  "Write like a person who had been putting off writing this for days.",
  "Write like a person whose expectations were neutral and the experience was also just fine.",
  "Write like a person who does not remember the details but remembers the feeling.",
]

export async function generateReview(input: {
  businessName: string
  businessDescription: string
  rating: StarRating
  /** Tags the customer picked (what stood out for 4-5, what to fix for 1-3). */
  tags?: string[]
  /** Optional one-line note in the customer's own words. */
  note?: string
}): Promise<string> {
  const { businessDescription, rating, tags, note } = input

  // Vary every call so consecutive reviews don't read as one writer.
  const wordTarget = randomInt(3, 15)

  const aspects = tags?.length
    ? rating >= 4
      ? `What the customer wants to highlight: ${tags.join(", ")}`
      : `What the customer wants to mention as problems: ${tags.join(", ")}`
    : null

  const user =
    `Business description: ${businessDescription}\n` +
    `Star rating: ${RATING_PROMPT[rating]}` +
    (aspects ? `\n${aspects}` : "") +
    (note ? `\nCustomer's own words to weave in naturally: ${note}` : "") +
    (aspects
      ? "\nCover the chosen aspects naturally and briefly, without listing them."
      : "")

  const temperature = Math.round((1.0 + Math.random() * 0.6) * 100) / 100
  const raw = await complete(buildSystemPrompt(wordTarget), user, temperature)
  const review = tidyReview(raw)
  if (!review) {
    throw new Error("DeepSeek returned an empty review")
  }

  // Enforce the per-call word budget: if the model rambled over its target, drop
  // whole sentences from the end (never chop mid-thought) so short targets
  // actually come out short instead of every review landing the same length.
  return trimToWordTarget(review, wordTarget)
}

function buildSystemPrompt(wordTarget: number): string {
  const voice = PROMPT_VARIANTS[randomInt(0, PROMPT_VARIANTS.length - 1)]
  return (
    `${voice}\n` +
    `Write like a real person, not an AI or a copywriter. Keep it conversational and a ` +
    `little loose, not smooth, polished essay writing.\n` +
    `Speak in the first person about your own experience. Keep it short: aim for about ` +
    `${wordTarget} words and never go over ${wordTarget}. A one-liner is a great outcome; ` +
    `one or two short sentences is plenty.\n` +
    `Never mention the brand or business name, even if it appears in the description. Do ` +
    `not use dashes, em dashes, "--", asterisks, or any markdown. Do not invent specific ` +
    `facts that are not in the description. Match the given star rating in tone. Output ` +
    `only the review text.`
  )
}

/** Single DeepSeek completion call; returns the trimmed raw reply text. */
async function complete(system: string, user: string, temperature: number): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY
  if (!apiKey) {
    throw new Error("Missing env var: DEEPSEEK_API_KEY")
  }

  const res = await fetch("https://api.deepseek.com/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      temperature,
      max_tokens: 200,
    }),
  })

  if (!res.ok) {
    const detail = await res.text()
    throw new Error(`DeepSeek request failed (${res.status}): ${detail}`)
  }

  const data: unknown = await res.json()
  const raw = extractReviewText(data)
  if (!raw) {
    throw new Error("DeepSeek returned an empty review")
  }
  return raw
}

function wordCount(text: string): number {
  const trimmed = text.trim()
  return trimmed ? trimmed.split(/\s+/).length : 0
}

/** Cut to the first `max` words at a word boundary (never mid-word). */
function clipToWords(text: string, max: number): string {
  const words = text.trim().split(/\s+/)
  return words.length <= max ? text : words.slice(0, max).join(" ")
}

/**
 * Enforce the per-review word budget without butchering prose: drop whole
 * sentences from the end until the draft fits `wordTarget`, always keeping at
 * least one sentence. MAX_REVIEW_WORDS stays a hard safety net for the rare
 * single run-on sentence.
 */
function trimToWordTarget(text: string, wordTarget: number): string {
  if (wordCount(text) <= wordTarget) return text
  const parts = splitSentences(text)
  const kept: string[] = []
  for (const sentence of parts) {
    if (kept.length > 0 && wordCount([...kept, sentence].join(" ")) > wordTarget) break
    kept.push(sentence)
  }
  const out = kept.length ? kept.join(" ").trim() : text
  return wordCount(out) > MAX_REVIEW_WORDS ? clipToWords(out, MAX_REVIEW_WORDS) : out
}

function splitSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
}

/** Random integer in [min, max], both inclusive. */
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Real reviewers rarely reach for dashes or formatting, so strip the tell-tale
 * "--"/em-dash/asterisk artifacts the model still sneaks in despite the prompt.
 */
function tidyReview(text: string): string {
  return text
    .replace(/\s*[—–]\s*/g, ", ")
    .replace(/\s*--\s*/g, ", ")
    .replace(/\*/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

/** Minimal, defensive parser for the OpenAI-compatible chat completion shape. */
function extractReviewText(data: unknown): string | undefined {
  if (typeof data !== "object" || data === null) return undefined
  const record = data as Record<string, unknown>
  const choices = record.choices
  if (!Array.isArray(choices)) return undefined
  const first = choices[0]
  if (typeof first !== "object" || first === null) return undefined
  const message = (first as Record<string, unknown>).message
  if (typeof message !== "object" || message === null) return undefined
  const content = (message as Record<string, unknown>).content
  return typeof content === "string" ? content.trim() : undefined
}

/**
 * Fallback used only if the DeepSeek call fails, so the reviewer flow never
 * dead-ends. Deterministic, plain-language review.
 */
export function fallbackReview(input: {
  businessName: string
  businessDescription: string
  rating: StarRating
  tags?: string[]
}): string {
  const { businessName, businessDescription, rating, tags } = input
  const description = businessDescription.trim()
  const lead = description
    ? ` I especially appreciate that ${firstCharLower(description)}`
    : ""
  const tag = tags?.length ? tags[0] : null

  if (rating >= 4) {
    const mention = tag
      ? ` The ${tag.toLowerCase()} really stood out.`
      : " The service was friendly and the whole visit went smoothly."
    return (
      `I had a great experience at ${businessName}.` +
      `${mention}${lead} I would definitely recommend ${businessName} to others.`
    )
  }
  if (rating === 3) {
    return (
      `My experience at ${businessName} was okay overall. The basics were handled, ` +
      `though a few things could have gone more smoothly.${lead} I'd give them another chance.`
    )
  }
  const problem = tag
    ? ` The ${tag.toLowerCase()} fell short of what I expected.`
    : ""
  return (
    `I was disappointed with my recent visit to ${businessName}. The experience did not ` +
    `meet my expectations.${problem}${lead} I hope they can improve in the future.`
  )
}

function firstCharLower(text: string): string {
  const lower = text.charAt(0).toLowerCase() + text.slice(1)
  return lower.endsWith(".") ? lower : `${lower}.`
}
