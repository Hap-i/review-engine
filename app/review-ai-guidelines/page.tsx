import { RiArrowRightLine, RiMailLine } from "@remixicon/react"

import {
  Bullets,
  ContactRow,
  Example,
  Lead,
  LegalPage,
  P,
  Steps,
  Strong,
  type LegalSection,
} from "@/components/marketing/legal"
import { Stars } from "@/components/marketing/primitives"
import { CONTACT_EMAIL } from "@/lib/site"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Review & AI Usage Guidelines",
  description:
    "How businesses and customers may use Onloz responsibly — the rules around genuine experiences, AI-assisted drafting, ratings, incentives and third-party review platforms.",
  path: "/review-ai-guidelines",
})

const LAST_UPDATED = "September 10, 2026"

/** The feedback categories shown in the recommended flow example. */
const FEEDBACK_TAGS = [
  "Food",
  "Service",
  "Quality",
  "Delivery",
  "Value",
  "Staff",
  "Atmosphere",
]

/** Muted “or” separating two counter-examples inside one <Example>. */
function Or() {
  return (
    <P>
      <span className="font-mono text-[10px] tracking-[0.2em] uppercase not-italic">
        or
      </span>
    </P>
  )
}

const SECTIONS: LegalSection[] = [
  {
    id: "core-principle",
    title: "The Core Principle",
    body: (
      <>
        <Lead>
          The customer provides the experience. Onloz helps with the words.
        </Lead>
        <P>
          A review generated with Onloz should be based on the customer’s
          genuine experience with the relevant business.
        </P>
        <P>For example, if a customer selects:</P>
        <Example label="Customer input">
          <Stars value={5} size="size-3.5" />
          <span className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
            Food · Service
          </span>
        </Example>
        <P>Onloz may help turn that feedback into natural language such as:</P>
        <Example label="Onloz draft">
          <P>
            “Really enjoyed the food and the service. Overall, a great
            experience.”
          </P>
        </Example>
        <P>
          Onloz should not introduce specific facts that the customer did not
          provide.
        </P>
        <P>
          For example, if the customer never mentioned a waiting time, Onloz
          should not invent:
        </P>
        <Example label="Fabricated" tone="avoid">
          <P>“Our food arrived within 10 minutes.”</P>
        </Example>
        <P>
          The purpose of AI assistance is to improve expression, not create
          facts.
        </P>
      </>
    ),
  },
  {
    id: "rating-manipulation",
    title: "Businesses Must Not Manipulate Ratings",
    body: (
      <>
        <P>
          Businesses using Onloz must allow customers to provide the rating that
          genuinely reflects their experience.
        </P>
        <P>Businesses must not instruct or pressure customers to:</P>
        <Bullets
          items={[
            "give five stars;",
            "give a particular rating;",
            "change a rating;",
            "remove a negative review;",
            "submit a positive review;",
            "describe the business in a particular way; or",
            "omit genuine negative aspects of their experience.",
          ]}
        />
        <P>For example, a business should not tell a customer:</P>
        <Example label="Not permitted" tone="avoid">
          <P>“Please give us five stars.”</P>
          <Or />
          <P>“Only leave a Google review if you were happy with us.”</P>
        </Example>
        <P>The customer should be free to provide an honest rating.</P>
      </>
    ),
  },
  {
    id: "no-fake-reviews",
    title: "No Fake Reviews",
    body: (
      <>
        <P>
          Onloz must not be used to create or facilitate reviews from people who
          did not have a genuine experience with the business.
        </P>
        <P>Examples of prohibited activity include:</P>
        <Bullets
          items={[
            "employees reviewing their own business where prohibited by the applicable platform;",
            "business owners creating reviews pretending to be customers;",
            "friends or family members creating reviews without a genuine customer experience;",
            "purchasing reviews;",
            "creating reviews for fictional customers;",
            "creating multiple identities to submit reviews;",
            "generating reviews for customers who never interacted with the business; or",
            "submitting AI-generated experiences that did not occur.",
          ]}
        />
      </>
    ),
  },
  {
    id: "no-invented-experiences",
    title: "No Invented Customer Experiences",
    body: (
      <>
        <P>AI-generated content must not contain fabricated claims.</P>
        <P>
          Businesses must not intentionally provide false information to Onloz
          for the purpose of generating a review.
        </P>
        <P>For example, if a customer only says:</P>
        <Example label="Customer input">
          <P>“Good service.”</P>
        </Example>
        <P>the business should not manipulate the input to generate:</P>
        <Example label="Fabricated" tone="avoid">
          <P>
            “The staff were extremely professional, the food arrived in 15
            minutes, and the manager personally checked on our table.”
          </P>
        </Example>
        <P>
          unless those statements genuinely came from the customer’s experience
          and were appropriately provided by the customer.
        </P>
      </>
    ),
  },
  {
    id: "ai-assisted-reviews",
    title: "AI-Assisted Reviews",
    body: (
      <>
        <P>Onloz may use AI to:</P>
        <Bullets
          items={[
            "improve grammar;",
            "organize feedback;",
            "turn selections into natural language;",
            "summarize customer feedback;",
            "adjust wording;",
            "improve readability; and",
            "create a draft based on customer-provided information.",
          ]}
        />
        <P>AI should not be used to fabricate:</P>
        <Bullets
          items={[
            "events;",
            "products;",
            "services;",
            "employee interactions;",
            "prices;",
            "waiting times;",
            "delivery times;",
            "product characteristics;",
            "customer relationships;",
            "outcomes; or",
            "other material facts.",
          ]}
        />
        <P>
          Businesses and customers should review AI-generated text before
          publishing it.
        </P>
      </>
    ),
  },
  {
    id: "customer-control",
    title: "Customer Control",
    body: (
      <>
        <P>
          Where Onloz generates review text, customers should be given an
          appropriate opportunity to:
        </P>
        <Steps
          items={[
            "see the generated content;",
            "review it;",
            "edit it if necessary; and",
            "decide whether to publish it.",
          ]}
        />
        <P>
          The customer remains responsible for the content they choose to
          publish.
        </P>
        <P>
          Onloz does not automatically guarantee or require publication of
          generated content to any third-party platform.
        </P>
      </>
    ),
  },
  {
    id: "honest-feedback",
    title: "Honest Feedback Is Welcome",
    body: (
      <>
        <P>A genuine negative experience is still genuine feedback.</P>
        <P>
          Businesses must not use Onloz to suppress legitimate criticism.
        </P>
        <P>
          A customer who gives a lower rating should not be prevented from
          expressing their experience simply because the business prefers
          positive reviews.
        </P>
        <P>
          For example, businesses should not configure or operate their Onloz
          experience for the purpose of:
        </P>
        <Example label="Not permitted" tone="avoid">
          <P>
            “Send happy customers to Google and send unhappy customers somewhere
            else.”
          </P>
        </Example>
        <P>
          Businesses should provide customers with a fair opportunity to provide
          honest feedback.
        </P>
      </>
    ),
  },
  {
    id: "no-incentives",
    title: "No Incentives for Reviews",
    body: (
      <>
        <P>
          Businesses must not use Onloz to offer customers an incentive in
          exchange for a review or rating where prohibited by applicable law or
          the relevant review platform’s policies.
        </P>
        <P>Examples include:</P>
        <Bullets
          items={[
            "discounts;",
            "coupons;",
            "refunds;",
            "free products;",
            "free services;",
            "loyalty points;",
            "gifts;",
            "cash;",
            "competitions; or",
            "other benefits.",
          ]}
        />
        <P>Businesses should not make a benefit conditional on:</P>
        <Bullets
          items={[
            "leaving a review;",
            "giving a positive rating;",
            "changing a review; or",
            "removing a negative review.",
          ]}
        />
        <P>
          Businesses are responsible for understanding the rules applicable to
          their industry, jurisdiction, and review platform.
        </P>
      </>
    ),
  },
  {
    id: "platform-policies",
    title: "Review Platform Policies",
    body: (
      <>
        <P>Onloz does not control third-party review platforms.</P>
        <P>
          Businesses using Onloz must comply with the policies of the platform
          where they ask customers to publish reviews.
        </P>
        <P>This may include platforms such as:</P>
        <Bullets
          items={[
            "Google;",
            "TripAdvisor;",
            "Yelp;",
            "Trustpilot;",
            "Facebook;",
            "industry-specific review platforms; and",
            "other third-party services.",
          ]}
        />
        <P>Third-party policies may change over time.</P>
        <P>
          Businesses are responsible for reviewing and complying with the
          current rules of the platform they use.
        </P>
      </>
    ),
  },
  {
    id: "google-reviews",
    title: "Google Reviews",
    body: (
      <>
        <P>
          Where a business uses Onloz to facilitate customer reviews on Google,
          the business must comply with Google’s applicable policies.
        </P>
        <P>
          Google’s policies require reviews to represent genuine experiences and
          prohibit practices including fake engagement, manipulated ratings, and
          certain forms of incentivized or selectively solicited reviews.
        </P>
        <P>
          Onloz does not represent that it is affiliated with, endorsed by, or
          approved by Google.
        </P>
        <P>
          <Strong>Google is a trademark of Google LLC.</Strong>
        </P>
        <P>
          Google independently determines whether content is published,
          filtered, restricted, or removed.
        </P>
        <P>
          A review generated with Onloz may be removed by Google or another
          platform even when the business believes the review is genuine.
        </P>
        <P>
          Onloz cannot guarantee publication, retention, visibility, ranking, or
          continued availability of any review.
        </P>
      </>
    ),
  },
  {
    id: "no-google-approval-claims",
    title: "Do Not Claim Google Approval",
    body: (
      <>
        <P>Businesses must not advertise or represent Onloz as:</P>
        <Bullets
          items={[
            "“Google approved”;",
            "“Google certified”;",
            "“Google endorsed”;",
            "“Google partner”;",
            "“official Google review software”; or",
            "any similar statement suggesting an affiliation or endorsement that does not exist.",
          ]}
        />
        <P>
          Businesses must also not make claims about Onloz that are false or
          misleading.
        </P>
      </>
    ),
  },
  {
    id: "truthful-requests",
    title: "Review Requests Must Be Truthful",
    body: (
      <>
        <P>
          Businesses may tell customers that they can share feedback about their
          experience.
        </P>
        <P>For example:</P>
        <Example label="Appropriate">
          <P>“We’d love to hear about your experience.”</P>
        </Example>
        <P>
          Businesses should avoid wording that attempts to manipulate the
          customer’s rating, such as:
        </P>
        <Example label="Not permitted" tone="avoid">
          <P>“Give us five stars.”</P>
          <Or />
          <P>“Leave us a positive review.”</P>
        </Example>
        <P>
          The objective should be to encourage <Strong>honest feedback</Strong>,
          not a predetermined result.
        </P>
      </>
    ),
  },
  {
    id: "no-guarantees",
    title: "Onloz Does Not Guarantee More Positive Reviews",
    body: (
      <>
        <P>
          Onloz is designed to reduce the effort required to write a review.
        </P>
        <P>It does not guarantee:</P>
        <Bullets
          items={[
            "more five-star reviews;",
            "higher ratings;",
            "more Google reviews;",
            "improved Google rankings;",
            "improved SEO;",
            "increased sales;",
            "increased revenue;",
            "improved reputation; or",
            "any particular business outcome.",
          ]}
        />
        <P>Businesses should evaluate the Service based on their own results.</P>
      </>
    ),
  },
  {
    id: "customer-privacy",
    title: "Customer Privacy",
    body: (
      <>
        <P>
          Businesses must use Onloz in accordance with applicable privacy and
          data-protection laws.
        </P>
        <P>
          Businesses should not provide Onloz with personal information that
          they do not have the right to collect or process.
        </P>
        <P>
          Businesses are responsible for providing customers with appropriate
          privacy information where required.
        </P>
        <P>
          Depending on the arrangement, the business may be responsible for
          determining:
        </P>
        <Bullets
          items={[
            "why customer information is collected;",
            "what information is collected;",
            "how long it is retained;",
            "who it is shared with; and",
            "the lawful basis for processing it.",
          ]}
        />
        <P>
          Additional information is available in the Onloz Privacy Policy and,
          where applicable, a Data Processing Agreement.
        </P>
      </>
    ),
  },
  {
    id: "sensitive-information",
    title: "Sensitive Information",
    body: (
      <>
        <P>
          Businesses should avoid requesting unnecessary sensitive personal
          information through Onloz.
        </P>
        <P>This may include information relating to:</P>
        <Bullets
          items={[
            "health;",
            "financial information;",
            "government identification;",
            "precise location;",
            "passwords;",
            "authentication credentials;",
            "sexual life or orientation;",
            "racial or ethnic origin;",
            "religious beliefs;",
            "political opinions; or",
            "other categories of sensitive or specially protected information.",
          ]}
        />
        <P>
          Where a business operates in a regulated industry, it is responsible
          for configuring its feedback experience appropriately.
        </P>
      </>
    ),
  },
  {
    id: "customer-confidentiality",
    title: "Customer Confidentiality",
    body: (
      <>
        <P>
          Businesses should not ask customers to include confidential
          information in a public review.
        </P>
        <P>
          For example, customers should not be encouraged to disclose:
        </P>
        <Bullets
          items={[
            "private employee information;",
            "another customer’s personal information;",
            "confidential business information;",
            "passwords;",
            "payment information; or",
            "other information that should not be publicly disclosed.",
          ]}
        />
        <P>
          Businesses should review their questions and feedback categories to
          avoid unnecessarily collecting such information.
        </P>
      </>
    ),
  },
  {
    id: "business-responsibility",
    title: "Businesses Are Responsible for Their Campaigns",
    body: (
      <>
        <P>Businesses are responsible for how they deploy Onloz.</P>
        <P>This includes:</P>
        <Bullets
          items={[
            "where QR codes are displayed;",
            "how review requests are communicated;",
            "what customers are told;",
            "what questions are asked;",
            "what incentives, if any, are offered;",
            "how feedback is handled; and",
            "where customers are directed after completing the experience.",
          ]}
        />
        <P>
          Onloz provides the technology but does not control how a business uses
          it.
        </P>
      </>
    ),
  },
  {
    id: "recommended-experience",
    title: "Recommended Onloz Experience",
    body: (
      <>
        <P>We recommend the following approach:</P>

        <Lead>Step 1 — Ask for an honest rating</Lead>
        <Example>
          <P>
            <Strong>How was your experience?</Strong>
          </P>
          <Stars value={5} size="size-3.5" />
        </Example>
        <P>
          Customers should choose the rating that genuinely represents their
          experience.
        </P>

        <Lead>Step 2 — Ask what stood out</Lead>
        <P>For example:</P>
        <Example>
          <P>
            <Strong>What stood out about your experience?</Strong>
          </P>
          <span className="flex flex-wrap gap-1.5">
            {FEEDBACK_TAGS.map((tag) => (
              <span
                key={tag}
                className="border border-border px-2 py-0.5 font-mono text-[10px] tracking-[0.14em] uppercase"
              >
                {tag}
              </span>
            ))}
          </span>
        </Example>

        <Lead>Step 3 — Optional additional feedback</Lead>
        <Example>
          <P>
            <Strong>Anything else you’d like to mention?</Strong>
          </P>
        </Example>
        <P>
          Customers may provide additional details in their own words.
        </P>

        <Lead>Step 4 — Generate a draft</Lead>
        <P>Onloz uses the customer’s input to create a review draft.</P>

        <Lead>Step 5 — Customer reviews the draft</Lead>
        <P>The customer can review and edit the content.</P>

        <Lead>Step 6 — Customer decides whether to publish</Lead>
        <P>
          The customer chooses whether to continue to the relevant review
          platform.
        </P>

        <P>
          This flow is intended to reduce writing friction while keeping the
          customer’s experience and decision-making at the center of the
          process.
        </P>
      </>
    ),
  },
  {
    id: "prohibited-practices",
    title: "Prohibited Business Practices",
    body: (
      <>
        <P>Businesses must not use Onloz to:</P>
        <Bullets
          items={[
            "generate fake reviews;",
            "generate reviews for non-customers;",
            "manipulate ratings;",
            "purchase reviews;",
            "exchange benefits for reviews where prohibited;",
            "suppress legitimate negative feedback;",
            "selectively solicit only positive reviews;",
            "impersonate customers;",
            "create fictional customer identities;",
            "submit reviews without customer authorization;",
            "fabricate customer experiences;",
            "provide false information to generate review content;",
            "use AI to manufacture unsupported claims;",
            "violate third-party review platform policies; or",
            "violate applicable consumer-protection or privacy laws.",
          ]}
        />
      </>
    ),
  },
  {
    id: "reporting-misuse",
    title: "Reporting Misuse",
    body: (
      <>
        <P>
          If you believe a business or user is using Onloz for prohibited
          activity, you may report it to{" "}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-foreground underline underline-offset-4 hover:text-foreground/70"
          >
            {CONTACT_EMAIL}
          </a>
          .
        </P>
        <P>
          Please provide enough information for us to investigate the reported
          activity.
        </P>
        <P>
          We may investigate reports and may suspend or terminate accounts that
          violate our Terms of Service or these Guidelines.
        </P>
      </>
    ),
  },
  {
    id: "enforcement",
    title: "Enforcement",
    body: (
      <>
        <P>
          Onloz may take reasonable action when we identify or receive credible
          reports of misuse.
        </P>
        <P>Depending on the circumstances, this may include:</P>
        <Bullets
          items={[
            "requesting additional information;",
            "warning the account holder;",
            "restricting particular functionality;",
            "disabling a campaign;",
            "suspending an account;",
            "terminating an account;",
            "deleting prohibited content; or",
            "cooperating with lawful requests from authorities or third-party platforms.",
          ]}
        />
        <P>
          We do not guarantee that we will identify every violation or prevent
          every misuse of the Service.
        </P>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to These Guidelines",
    body: (
      <>
        <P>We may update these Guidelines from time to time as:</P>
        <Bullets
          items={[
            "our Service changes;",
            "applicable laws change;",
            "third-party platform policies change; or",
            "we develop additional safeguards.",
          ]}
        />
        <P>
          The “Last Updated” date at the beginning of these Guidelines indicates
          when they were most recently updated.
        </P>
      </>
    ),
  },
  {
    id: "questions",
    title: "Questions",
    body: (
      <>
        <P>
          If you have questions about these Guidelines or how to use Onloz
          responsibly, contact:
        </P>
        <div className="flex flex-col gap-3 border border-border bg-card/60 p-6">
          <ContactRow label="Website">
            <a
              href="https://onloz.com"
              className="inline-flex items-center gap-1.5 underline underline-offset-4 hover:text-foreground/70"
            >
              onloz.com
              <RiArrowRightLine aria-hidden className="size-3.5" />
            </a>
          </ContactRow>
          <ContactRow label="Email">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-1.5 underline underline-offset-4 hover:text-foreground/70"
            >
              <RiMailLine aria-hidden className="size-3.5" />
              {CONTACT_EMAIL}
            </a>
          </ContactRow>
        </div>
      </>
    ),
  },
]

export default function ReviewAiGuidelinesPage() {
  return (
    <LegalPage
      eyebrow="Legal · Review & AI Usage Guidelines"
      title="Review & AI Usage Guidelines"
      lastUpdated={LAST_UPDATED}
      intro={
        <>
          <P>At Onloz, our goal is simple:</P>
          <P>
            <Strong>
              Make it easier for customers to share their genuine experiences.
            </Strong>
          </P>
          <P>
            Onloz uses technology and artificial intelligence to reduce the
            effort involved in writing customer feedback and reviews. Our tools
            are designed to help customers express what they actually
            experienced — not to manufacture experiences, manipulate ratings, or
            create misleading reviews.
          </P>
          <P>
            These Guidelines explain how businesses and customers may use Onloz
            responsibly.
          </P>
          <P>
            They supplement the Onloz Terms of Service and Privacy Policy.
          </P>
        </>
      }
      sections={SECTIONS}
      noticeLabel="Our commitment"
      notice={
        <>
          <P>
            Onloz exists to make it easier for customers to share what they
            genuinely experienced.
          </P>
          <div className="flex flex-col gap-1 font-medium text-foreground">
            <span>We provide the technology.</span>
            <span>The customer provides the experience.</span>
            <span>The customer decides what to publish.</span>
          </div>
          <P>
            We believe better reviews should come from better customer
            experiences — and from making it easier for customers to talk about
            them.
          </P>
        </>
      }
    />
  )
}
