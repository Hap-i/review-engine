import { RiArrowRightLine, RiMailLine } from "@remixicon/react"

import {
  Bullets,
  ContactRow,
  Example,
  LegalPage,
  P,
  Steps,
  Strong,
  type LegalSection,
} from "@/components/marketing/legal"
import { CONTACT_EMAIL } from "@/lib/site"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Acceptable Use Policy",
  description:
    "What’s allowed on Onloz — and what isn’t. Genuine experiences, honest ratings, no fake or incentivized reviews, and the technical and legal limits on using the Service.",
  path: "/acceptable-use",
})

const LAST_UPDATED = "September 10, 2026"

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

/** Inline mailto link used for abuse, security and general contact points. */
function ContactLink() {
  return (
    <a
      href={`mailto:${CONTACT_EMAIL}`}
      className="text-foreground underline underline-offset-4 hover:text-foreground/70"
    >
      {CONTACT_EMAIL}
    </a>
  )
}

const SECTIONS: LegalSection[] = [
  {
    id: "permitted-use",
    title: "What You Can Use Onloz For",
    body: (
      <>
        <P>You may use Onloz to:</P>
        <Bullets
          items={[
            "collect genuine customer feedback;",
            "ask customers to share their experiences;",
            "collect customer ratings;",
            "collect feedback about products or services;",
            "create customer feedback forms;",
            "create QR codes or links for feedback experiences;",
            "help customers turn their own feedback into draft review text;",
            "allow customers to review and edit AI-generated drafts;",
            "direct customers to appropriate third-party review platforms;",
            "understand common themes in customer feedback;",
            "improve your products or services based on customer feedback; and",
            "manage legitimate customer-review and feedback campaigns.",
          ]}
        />
        <P>
          You may use AI-assisted features to help customers express their
          experiences in clearer, more natural language.
        </P>
      </>
    ),
  },
  {
    id: "genuine-experiences",
    title: "Genuine Customer Experiences",
    body: (
      <>
        <P>
          Reviews and feedback generated using Onloz must be based on genuine
          customer experiences.
        </P>
        <P>You must not use Onloz to create content for someone who:</P>
        <Bullets
          items={[
            "did not purchase from or interact with the business;",
            "did not use the relevant product or service;",
            "has no genuine experience to describe; or",
            "has been instructed to pretend to be a customer.",
          ]}
        />
        <P>Examples of prohibited activity include creating a review for:</P>
        <Bullets
          items={[
            "a fictional customer;",
            "a friend who has never used the business;",
            "an employee pretending to be an independent customer;",
            "a business owner pretending to be a customer; or",
            "a person who has never interacted with the business.",
          ]}
        />
      </>
    ),
  },
  {
    id: "honest-ratings",
    title: "Honest Ratings",
    body: (
      <>
        <P>
          Customers should be free to provide the rating that honestly reflects
          their experience.
        </P>
        <P>
          Businesses must not use Onloz to pressure customers into providing a
          particular rating.
        </P>
        <P>You must not:</P>
        <Bullets
          items={[
            "instruct customers to give five stars;",
            "require a minimum rating;",
            "ask customers to change their rating;",
            "tell customers that only positive ratings are acceptable; or",
            "otherwise manipulate the rating process.",
          ]}
        />
      </>
    ),
  },
  {
    id: "no-fake-reviews",
    title: "No Fake Reviews",
    body: (
      <>
        <P>
          You must not use Onloz to create, purchase, facilitate, or distribute
          fake reviews.
        </P>
        <P>Prohibited activities include:</P>
        <Bullets
          items={[
            "generating reviews for non-customers;",
            "creating fictional customer identities;",
            "buying reviews;",
            "selling reviews;",
            "creating reviews in bulk without genuine customer experiences;",
            "impersonating customers;",
            "submitting reviews on behalf of customers without authorization;",
            "creating multiple identities to manipulate ratings; or",
            "coordinating artificial review activity.",
          ]}
        />
      </>
    ),
  },
  {
    id: "no-review-manipulation",
    title: "No Review Manipulation",
    body: (
      <>
        <P>
          You must not use Onloz to manipulate the perceived reputation of a
          business, product, service, person, or organization.
        </P>
        <P>This includes:</P>
        <Bullets
          items={[
            "artificially increasing ratings;",
            "artificially increasing review volume;",
            "coordinating reviews;",
            "suppressing legitimate criticism;",
            "selectively publishing only positive customer feedback;",
            "encouraging customers to change legitimate negative reviews;",
            "misleading customers about how their feedback will be used; or",
            "otherwise attempting to create a misleading impression of customer sentiment.",
          ]}
        />
      </>
    ),
  },
  {
    id: "no-review-gating",
    title: "No Review Gating",
    body: (
      <>
        <P>
          You must not use Onloz to selectively direct customers based on their
          rating for the purpose of preventing negative reviews from reaching a
          third-party review platform.
        </P>
        <P>For example, you must not create a workflow such as:</P>
        <Example label="Not permitted" tone="avoid">
          <P>4–5 stars → Google review</P>
          <Or />
          <P>1–3 stars → private feedback only</P>
        </Example>
        <P>
          if the purpose is to prevent customers with negative experiences from
          leaving reviews.
        </P>
        <P>
          Businesses should give customers a fair opportunity to provide honest
          feedback.
        </P>
      </>
    ),
  },
  {
    id: "no-incentivized-reviews",
    title: "No Incentivized Reviews",
    body: (
      <>
        <P>
          You must not use Onloz to offer or facilitate incentives in exchange
          for reviews or ratings where prohibited by applicable law or
          third-party platform rules.
        </P>
        <P>Examples include:</P>
        <Bullets
          items={[
            "cash;",
            "discounts;",
            "coupons;",
            "refunds;",
            "free products;",
            "free services;",
            "loyalty points;",
            "gifts;",
            "competition entries; or",
            "other benefits.",
          ]}
        />
        <P>You must not make a benefit conditional on a customer:</P>
        <Bullets
          items={[
            "leaving a review;",
            "giving a positive rating;",
            "changing a review; or",
            "removing a negative review.",
          ]}
        />
        <P>
          Businesses remain responsible for understanding the rules applicable
          to their jurisdiction, industry, and review platform.
        </P>
      </>
    ),
  },
  {
    id: "ai-generated-content",
    title: "AI-Generated Content",
    body: (
      <>
        <P>
          Onloz may use artificial intelligence to help transform
          customer-provided information into natural-language content.
        </P>
        <P>You may use AI features to:</P>
        <Bullets
          items={[
            "improve grammar;",
            "improve readability;",
            "organize customer feedback;",
            "summarize customer comments;",
            "turn selected feedback into natural language; and",
            "generate a draft based on information supplied by the customer.",
          ]}
        />
        <P>
          You must not use Onloz’s AI features to intentionally create false or
          misleading experiences.
        </P>
        <P>
          Do not provide false inputs to the AI system for the purpose of
          generating fabricated reviews.
        </P>
        <P>For example, if a customer only states:</P>
        <Example label="Customer input">
          <P>“Good service.”</P>
        </Example>
        <P>you must not intentionally add false information such as:</P>
        <Example label="Fabricated" tone="avoid">
          <P>
            “The staff were exceptionally friendly and our order arrived in ten
            minutes.”
          </P>
        </Example>
        <P>
          unless those statements genuinely reflect the customer’s experience
          and have been provided appropriately.
        </P>
      </>
    ),
  },
  {
    id: "review-and-approval",
    title: "Customer Review and Approval",
    body: (
      <>
        <P>
          Where Onloz generates review text, customers should be given an
          appropriate opportunity to review the generated content before
          publishing it.
        </P>
        <P>Customers should be able to:</P>
        <Bullets
          items={[
            "read the draft;",
            "correct inaccuracies;",
            "edit the wording;",
            "remove statements they do not agree with; and",
            "decide whether to publish it.",
          ]}
        />
        <P>
          Businesses must not knowingly publish AI-generated content that they
          know is false or misleading.
        </P>
      </>
    ),
  },
  {
    id: "third-party-platforms",
    title: "Third-Party Review Platforms",
    body: (
      <>
        <P>
          Onloz may allow businesses to direct customers to third-party review
          platforms.
        </P>
        <P>Examples may include:</P>
        <Bullets
          items={[
            "Google;",
            "Google Maps;",
            "Yelp;",
            "TripAdvisor;",
            "Trustpilot;",
            "Facebook; and",
            "industry-specific review services.",
          ]}
        />
        <P>Each platform has its own rules.</P>
        <P>
          You are responsible for complying with the policies and terms of the
          platform where you ask customers to publish content.
        </P>
        <P>Onloz does not guarantee that a third-party platform will:</P>
        <Bullets
          items={[
            "publish a review;",
            "retain a review;",
            "display a review;",
            "accept a review;",
            "maintain a reviewer’s account;",
            "maintain an integration; or",
            "rank a review or business in any particular way.",
          ]}
        />
      </>
    ),
  },
  {
    id: "no-misrepresentation",
    title: "No Misrepresentation of Onloz",
    body: (
      <>
        <P>You must not represent Onloz as being:</P>
        <Bullets
          items={[
            "endorsed by Google;",
            "approved by Google;",
            "certified by Google;",
            "operated by Google;",
            "an official Google service;",
            "affiliated with Google; or",
            "affiliated with another third-party platform,",
          ]}
        />
        <P>
          unless you have explicit authorization to make such a representation.
        </P>
        <P>
          You must not use third-party trademarks in a way that creates a
          misleading impression of affiliation or endorsement.
        </P>
      </>
    ),
  },
  {
    id: "spam",
    title: "Spam",
    body: (
      <>
        <P>You must not use Onloz to distribute spam.</P>
        <P>This includes:</P>
        <Bullets
          items={[
            "unsolicited bulk messages;",
            "deceptive communications;",
            "repetitive automated submissions;",
            "mass-generated content;",
            "unwanted marketing;",
            "phishing messages;",
            "malicious links; or",
            "communications intended to deceive recipients.",
          ]}
        />
        <P>
          If you use Onloz with email, SMS, WhatsApp, or other communication
          channels, you are responsible for complying with applicable
          communications and marketing laws and the policies of those platforms.
        </P>
      </>
    ),
  },
  {
    id: "fraud-and-deception",
    title: "Fraud and Deception",
    body: (
      <>
        <P>
          You must not use Onloz for fraudulent, deceptive, or dishonest
          activities.
        </P>
        <P>This includes:</P>
        <Bullets
          items={[
            "impersonation;",
            "identity fraud;",
            "payment fraud;",
            "phishing;",
            "scams;",
            "deceptive advertising;",
            "misleading claims;",
            "fraudulent transactions;",
            "artificially manufactured customer activity; or",
            "attempts to conceal unlawful activity.",
          ]}
        />
      </>
    ),
  },
  {
    id: "illegal-activity",
    title: "Illegal Activity",
    body: (
      <>
        <P>You must not use Onloz to:</P>
        <Bullets
          items={[
            "violate applicable laws;",
            "facilitate criminal activity;",
            "facilitate fraud;",
            "facilitate money laundering;",
            "facilitate identity theft;",
            "distribute unlawful content;",
            "violate intellectual-property rights;",
            "violate privacy rights;",
            "evade legal obligations; or",
            "assist another person in unlawful activity.",
          ]}
        />
      </>
    ),
  },
  {
    id: "privacy",
    title: "Privacy and Personal Information",
    body: (
      <>
        <P>
          You must not use Onloz to collect, process, disclose, or publish
          personal information unlawfully.
        </P>
        <P>You must not ask customers to provide unnecessary sensitive information.</P>
        <P>Do not use Onloz to collect information such as:</P>
        <Bullets
          items={[
            "passwords;",
            "authentication codes;",
            "payment-card numbers;",
            "government identification numbers;",
            "another person’s private contact information;",
            "confidential business information; or",
            "other sensitive information unless there is a lawful and legitimate reason and appropriate safeguards are in place.",
          ]}
        />
        <P>
          Businesses are responsible for ensuring that information they collect
          through Onloz is collected and processed in accordance with applicable
          privacy laws.
        </P>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    body: (
      <>
        <P>
          You must not upload or submit content to Onloz unless you have the
          necessary rights or permissions to use that content.
        </P>
        <P>You must not use Onloz to:</P>
        <Bullets
          items={[
            "infringe copyrights;",
            "infringe trademarks;",
            "misappropriate trade secrets;",
            "violate publicity rights;",
            "violate privacy rights; or",
            "distribute content without the required authorization.",
          ]}
        />
      </>
    ),
  },
  {
    id: "security",
    title: "Security and Technical Restrictions",
    body: (
      <>
        <P>You must not:</P>
        <Bullets
          items={[
            "attempt to gain unauthorized access to Onloz;",
            "bypass authentication;",
            "circumvent usage limits;",
            "probe or scan our systems for vulnerabilities without authorization;",
            "introduce malware;",
            "distribute malicious code;",
            "interfere with Service availability;",
            "conduct denial-of-service attacks;",
            "reverse engineer the Service except where permitted by law;",
            "scrape the Service through unauthorized automated methods;",
            "access another user’s account;",
            "attempt to obtain credentials;",
            "exploit security vulnerabilities; or",
            "use Onloz to attack or compromise another system.",
          ]}
        />
        <P>
          If you discover a potential security vulnerability, please report it
          responsibly to <ContactLink />.
        </P>
      </>
    ),
  },
  {
    id: "automated-access",
    title: "Automated Access",
    body: (
      <>
        <P>
          You must not use bots, crawlers, scripts, agents, or other automated
          systems to access or interact with Onloz except:
        </P>
        <Bullets
          items={[
            "through functionality expressly provided by Onloz;",
            "through an authorized API;",
            "with our written permission; or",
            "where otherwise permitted by applicable law.",
          ]}
        />
        <P>
          You must not use automated access to circumvent technical restrictions
          or usage limits.
        </P>
      </>
    ),
  },
  {
    id: "competitive-use",
    title: "Competitive Use",
    body: (
      <>
        <P>
          You may not use automated or systematic access to Onloz for the
          purpose of:
        </P>
        <Bullets
          items={[
            "copying substantial portions of the Service;",
            "extracting proprietary information;",
            "benchmarking for competitive purposes without authorization;",
            "developing a competing product using non-public information; or",
            "reproducing substantial portions of Onloz’s functionality or content.",
          ]}
        />
        <P>
          Nothing in this section restricts lawful competitive analysis based on
          publicly available information.
        </P>
      </>
    ),
  },
  {
    id: "content-standards",
    title: "Content Standards",
    body: (
      <>
        <P>Content submitted through Onloz must not:</P>
        <Bullets
          items={[
            "contain unlawful threats;",
            "promote violence;",
            "facilitate criminal activity;",
            "contain malware;",
            "contain fraudulent material;",
            "intentionally deceive users;",
            "expose another person’s private information;",
            "infringe intellectual-property rights; or",
            "otherwise violate applicable law.",
          ]}
        />
        <P>
          Businesses are responsible for configuring their customer-facing
          questions and feedback categories appropriately.
        </P>
      </>
    ),
  },
  {
    id: "industry-specific",
    title: "Industry-Specific Responsibilities",
    body: (
      <>
        <P>
          Certain industries may be subject to additional legal or regulatory
          requirements.
        </P>
        <P>These may include:</P>
        <Bullets
          items={[
            "healthcare;",
            "financial services;",
            "legal services;",
            "education;",
            "insurance;",
            "telecommunications;",
            "hospitality;",
            "food services; and",
            "other regulated industries.",
          ]}
        />
        <P>
          Onloz does not determine whether your particular use of the Service
          satisfies industry-specific requirements.
        </P>
        <P>
          You are responsible for obtaining appropriate legal or professional
          advice where necessary.
        </P>
      </>
    ),
  },
  {
    id: "childrens-data",
    title: "Children’s Data",
    body: (
      <>
        <P>Onloz is not designed as a service for children.</P>
        <P>
          Businesses must not knowingly use Onloz to collect children’s personal
          information in violation of applicable law.
        </P>
        <P>
          Businesses are responsible for complying with applicable age-related
          privacy requirements when collecting customer feedback.
        </P>
      </>
    ),
  },
  {
    id: "account-responsibility",
    title: "Account Responsibility",
    body: (
      <>
        <P>
          You are responsible for activity conducted through your Onloz account.
        </P>
        <P>
          If you allow employees, contractors, agencies, or other people to use
          your account, you remain responsible for ensuring that they comply
          with:
        </P>
        <Steps
          items={[
            "these Guidelines;",
            "the Onloz Terms of Service;",
            "applicable law; and",
            "relevant third-party platform policies.",
          ]}
        />
      </>
    ),
  },
  {
    id: "reporting-violations",
    title: "Reporting Violations",
    body: (
      <>
        <P>
          If you believe that Onloz is being used in violation of this Policy,
          you may report the activity to <ContactLink />.
        </P>
        <P>Please include sufficient information for us to investigate the concern.</P>
        <P>We may request additional information before taking action.</P>
      </>
    ),
  },
  {
    id: "enforcement",
    title: "Enforcement",
    body: (
      <>
        <P>
          If we reasonably believe that an account or activity violates this
          Policy, our Terms of Service, applicable law, or creates a significant
          risk to Onloz or others, we may take appropriate action.
        </P>
        <P>Depending on the circumstances, this may include:</P>
        <Bullets
          items={[
            "contacting the account owner;",
            "requesting additional information;",
            "removing or restricting content;",
            "disabling a campaign;",
            "limiting certain functionality;",
            "suspending an account;",
            "terminating an account;",
            "preventing further access; or",
            "cooperating with lawful requests from authorities or third parties.",
          ]}
        />
        <P>
          We may take immediate action where necessary to address security,
          fraud, legal, or safety risks.
        </P>
        <P>
          We do not guarantee that we will identify every violation or prevent
          every misuse of the Service.
        </P>
      </>
    ),
  },
  {
    id: "third-party-outcomes",
    title: "No Guarantee of Third-Party Platform Outcomes",
    body: (
      <>
        <P>
          Onloz cannot control the policies, algorithms, moderation systems, or
          decisions of third-party platforms.
        </P>
        <P>A review generated using Onloz may be:</P>
        <Bullets
          items={[
            "accepted;",
            "rejected;",
            "filtered;",
            "hidden;",
            "removed;",
            "modified; or",
            "otherwise restricted",
          ]}
        />
        <P>by a third-party platform.</P>
        <P>
          These actions do not necessarily indicate that Onloz itself violated a
          policy.
        </P>
        <P>
          Businesses remain responsible for their own use of third-party
          platforms.
        </P>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    body: (
      <>
        <P>We may update this Acceptable Use Policy from time to time.</P>
        <P>We may update the Policy to reflect:</P>
        <Bullets
          items={[
            "changes to Onloz;",
            "new features;",
            "changes to applicable laws;",
            "changes to third-party platform policies;",
            "security developments; or",
            "new forms of misuse.",
          ]}
        />
        <P>
          The “Last Updated” date indicates when the Policy was most recently
          updated.
        </P>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <>
        <P>Questions about this Policy can be sent to:</P>
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
          <ContactRow label="Support, abuse & security">
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

export default function AcceptableUsePage() {
  return (
    <LegalPage
      eyebrow="Legal · Acceptable Use Policy"
      title="Acceptable Use Policy"
      lastUpdated={LAST_UPDATED}
      intro={
        <>
          <P>
            This Acceptable Use Policy (“Policy”) explains how customers,
            businesses, users, and other people accessing Onloz (“you” or
            “your”) may use the Onloz platform.
          </P>
          <P>
            It forms part of the <Strong>Onloz Terms of Service</Strong>.
          </P>
          <P>Our goal is simple:</P>
          <P>
            <Strong>
              Onloz helps businesses make it easier for real customers to share
              their genuine experiences.
            </Strong>
          </P>
          <P>
            Using Onloz means you agree to use the Service honestly, lawfully,
            and responsibly.
          </P>
        </>
      }
      sections={SECTIONS}
      noticeLabel="Our rule of thumb"
      notice={
        <>
          <P>If you’re unsure whether something is allowed, ask:</P>
          <P>
            <Strong>
              Is this helping a real customer honestly express a real
              experience?
            </Strong>
          </P>
          <P>
            If the answer is yes, you’re generally using Onloz for its intended
            purpose.
          </P>
          <P>
            If the goal is to manufacture, manipulate, hide, or misrepresent
            customer sentiment, don’t use Onloz for it.
          </P>
        </>
      }
    />
  )
}
