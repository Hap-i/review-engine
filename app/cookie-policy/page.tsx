import type { Metadata } from "next"
import { RiArrowRightLine, RiMailLine } from "@remixicon/react"

import {
  Bullets,
  ContactRow,
  LegalPage,
  P,
  Strong,
  type LegalSection,
} from "@/components/marketing/legal"
import {
  CONTACT_EMAIL,
  LEGAL_ENTITY_ADDRESS,
  LEGAL_ENTITY_JURISDICTION,
  LEGAL_ENTITY_NAME,
} from "@/lib/site"

export const metadata: Metadata = {
  title: "Cookie Policy — Onloz",
  description:
    "What cookies and similar technologies Onloz uses, why we use them, and how you can control them — including authentication, security, hosting and planned analytics.",
}

const LAST_UPDATED = "September 10, 2026"

const SECTIONS: LegalSection[] = [
  {
    id: "what-are-cookies",
    title: "What Are Cookies?",
    body: (
      <>
        <P>
          Cookies are small text files that websites may place on your device
          when you visit them.
        </P>
        <P>Cookies can help websites:</P>
        <Bullets
          items={[
            "remember information;",
            "maintain login sessions;",
            "provide security;",
            "understand how visitors use the website; and",
            "provide certain functionality.",
          ]}
        />
        <P>
          We may also use technologies similar to cookies, including local
          storage, session storage, pixels, tags, and other identifiers.
        </P>
        <P>
          For simplicity, we refer to these technologies collectively as
          “cookies” in this Policy.
        </P>
      </>
    ),
  },
  {
    id: "how-onloz-uses-cookies",
    title: "How Onloz Currently Uses Cookies",
    body: (
      <>
        <P>
          <Strong>{LEGAL_ENTITY_NAME}</Strong> is currently in a pilot phase.
        </P>
        <P>
          At this time, Onloz primarily uses cookies and similar technologies
          that are necessary for the operation, security, and functionality of
          the Service.
        </P>
        <P>
          We do not currently operate a dedicated advertising-cookie program on
          the Onloz website.
        </P>
        <P>
          We may introduce analytics or other non-essential technologies as the
          Service develops. If we do so, we will update this Cookie Policy and
          implement appropriate consent mechanisms where required by applicable
          law.
        </P>
      </>
    ),
  },
  {
    id: "strictly-necessary-cookies",
    title: "Strictly Necessary Cookies",
    body: (
      <>
        <P>
          Strictly necessary cookies may be used to provide functionality that
          you request or that is necessary for the operation and security of
          the Service.
        </P>
        <P>
          These may include cookies or similar technologies used for:
        </P>
        <Bullets
          items={[
            "authentication;",
            "maintaining login sessions;",
            "security;",
            "preventing abuse;",
            "maintaining application state;",
            "remembering cookie preferences;",
            "load balancing;",
            "protecting against malicious activity; and",
            "other essential Service functionality.",
          ]}
        />
        <P>
          Because these technologies may be necessary for the Service to
          operate, they may not be available for opt-out through a
          cookie-consent mechanism.
        </P>
      </>
    ),
  },
  {
    id: "authentication-and-session",
    title: "Authentication and Session Technologies",
    body: (
      <>
        <P>
          When you log in to Onloz, we may use cookies or similar technologies
          to maintain your authenticated session.
        </P>
        <P>These technologies may allow us to:</P>
        <Bullets
          items={[
            "recognize your active session;",
            "keep you logged in;",
            "protect your account;",
            "prevent unauthorized access; and",
            "maintain application functionality.",
          ]}
        />
        <P>
          Without these technologies, certain parts of the Onloz application
          may not function correctly.
        </P>
      </>
    ),
  },
  {
    id: "security-technologies",
    title: "Security Technologies",
    body: (
      <>
        <P>
          Onloz and our infrastructure providers may use cookies or similar
          technologies to help:
        </P>
        <Bullets
          items={[
            "identify suspicious activity;",
            "prevent automated abuse;",
            "protect accounts;",
            "detect fraud;",
            "maintain platform security; and",
            "protect our infrastructure.",
          ]}
        />
        <P>
          These technologies may operate as part of the security systems used
          to deliver Onloz.
        </P>
      </>
    ),
  },
  {
    id: "hosting-and-infrastructure",
    title: "Hosting and Infrastructure",
    body: (
      <>
        <P>
          Onloz uses <Strong>Vercel</Strong> for hosting and infrastructure.
        </P>
        <P>
          Vercel may process technical information and use cookies or similar
          technologies as necessary to provide, secure, and operate its
          services.
        </P>
        <P>The technologies used by Vercel may change over time.</P>
        <P>
          For information about Vercel’s own privacy and cookie practices,
          please refer to Vercel’s applicable privacy documentation.
        </P>
      </>
    ),
  },
  {
    id: "analytics",
    title: "Analytics",
    body: (
      <>
        <P>Onloz expects to introduce product analytics during its development.</P>
        <P>
          We currently plan to use <Strong>PostHog</Strong> for this purpose,
          but PostHog analytics is <Strong>not currently enabled</Strong> on the
          Onloz website or application as of the date of this Policy.
        </P>
        <P>
          When analytics are introduced, we will update this Policy to
          describe:
        </P>
        <Bullets
          items={[
            "the analytics technologies used;",
            "the information collected;",
            "the purposes of collection;",
            "relevant third-party providers;",
            "applicable retention periods; and",
            "available consent and opt-out mechanisms.",
          ]}
        />
        <P>
          Where applicable law requires consent before analytics technologies
          are used, Onloz will obtain the required consent before enabling
          those technologies.
        </P>
      </>
    ),
  },
  {
    id: "marketing-and-advertising",
    title: "Marketing and Advertising Cookies",
    body: (
      <>
        <P>
          At the time of this Policy, Onloz does not operate a dedicated
          advertising-cookie program.
        </P>
        <P>
          If we introduce advertising, remarketing, or other marketing
          technologies that require consent under applicable law, we will
          provide appropriate notice and obtain consent where required.
        </P>
      </>
    ),
  },
  {
    id: "payment-providers",
    title: "Payment Providers",
    body: (
      <>
        <P>
          Onloz is currently in a pilot phase and does not currently process
          subscription payments through Stripe, Dodo, or another payment
          provider.
        </P>
        <P>We may introduce payment functionality in the future.</P>
        <P>
          When payment functionality is introduced, payment providers may use
          cookies or similar technologies in connection with payment
          processing, fraud prevention, authentication, or other services.
        </P>
        <P>
          We will update our Privacy Policy and Cookie Policy as appropriate
          when payment functionality is introduced.
        </P>
      </>
    ),
  },
  {
    id: "email-and-communications",
    title: "Email and Communications",
    body: (
      <>
        <P>
          Onloz may use <Strong>Resend</Strong> to deliver transactional or
          service-related emails.
        </P>
        <P>Examples may include:</P>
        <Bullets
          items={[
            "account verification;",
            "password or authentication emails;",
            "service notifications;",
            "support communications;",
            "subscription-related communications when applicable; and",
            "other messages necessary to provide the Service.",
          ]}
        />
        <P>
          Email delivery itself may involve technologies such as tracking
          pixels or similar mechanisms depending on how the email service is
          configured.
        </P>
        <P>
          Where applicable, we will provide appropriate information regarding
          such technologies.
        </P>
      </>
    ),
  },
  {
    id: "customer-feedback-pages",
    title: "Customer Feedback Pages",
    body: (
      <>
        <P>
          Businesses using Onloz may provide customers with links or QR codes
          that lead to Onloz-powered feedback pages.
        </P>
        <P>
          These pages may use strictly necessary cookies or similar
          technologies to:
        </P>
        <Bullets
          items={[
            "maintain a session;",
            "provide requested functionality;",
            "protect against abuse;",
            "maintain security; and",
            "remember relevant settings.",
          ]}
        />
        <P>
          The information collected through these pages is also subject to the
          Onloz Privacy Policy.
        </P>
        <P>
          Businesses using Onloz may have additional privacy responsibilities
          regarding information collected from their customers.
        </P>
      </>
    ),
  },
  {
    id: "local-storage",
    title: "Local Storage and Similar Technologies",
    body: (
      <>
        <P>Onloz may use browser technologies such as:</P>
        <Bullets
          items={[
            "local storage;",
            "session storage;",
            "indexed storage; and",
            "similar browser-based technologies.",
          ]}
        />
        <P>These technologies may be used for purposes such as:</P>
        <Bullets
          items={[
            "maintaining application state;",
            "remembering preferences;",
            "improving performance;",
            "authentication;",
            "security; and",
            "providing requested functionality.",
          ]}
        />
        <P>
          Where applicable laws treat these technologies similarly to cookies,
          we will apply the relevant legal requirements.
        </P>
      </>
    ),
  },
  {
    id: "information-collected",
    title: "Information That May Be Collected",
    body: (
      <>
        <P>Depending on the technology used, information may include:</P>
        <Bullets
          items={[
            "IP address;",
            "device type;",
            "browser type;",
            "operating system;",
            "language;",
            "approximate location;",
            "session identifiers;",
            "pages viewed;",
            "application events;",
            "timestamps;",
            "referring URLs;",
            "security information; and",
            "other technical information.",
          ]}
        />
        <P>
          Some information may be associated with your Onloz account when you
          are logged in.
        </P>
        <P>
          Please see our <Strong>Privacy Policy</Strong> for additional
          information about personal information processing.
        </P>
      </>
    ),
  },
  {
    id: "cookie-consent",
    title: "Cookie Consent",
    body: (
      <>
        <P>
          At present, Onloz does not use a dedicated third-party cookie-consent
          management platform.
        </P>
        <P>
          Because the current Onloz website is primarily using necessary
          technologies, a separate consent mechanism may not be required for
          those technologies in jurisdictions where strictly necessary cookies
          are exempt from consent requirements.
        </P>
        <P>
          If Onloz introduces non-essential cookies or similar technologies for
          which consent is required, we will implement an appropriate consent
          mechanism before deploying those technologies where required by
          applicable law.
        </P>
      </>
    ),
  },
  {
    id: "browser-controls",
    title: "Your Browser Controls",
    body: (
      <>
        <P>Most browsers allow you to control cookies.</P>
        <P>Depending on your browser, you may be able to:</P>
        <Bullets
          items={[
            "block cookies;",
            "delete cookies;",
            "block third-party cookies;",
            "allow cookies only for specific websites; or",
            "receive notifications when cookies are being used.",
          ]}
        />
        <P>
          If you disable necessary cookies, parts of Onloz may not function
          properly.
        </P>
      </>
    ),
  },
  {
    id: "international-users",
    title: "International Users",
    body: (
      <>
        <P>Onloz is intended for users around the world.</P>
        <P>
          Our technology providers may process information in countries other
          than the country in which you live.
        </P>
        <P>
          Where applicable law requires safeguards for international transfers
          of personal information, we will use appropriate legally recognized
          transfer mechanisms.
        </P>
        <P>
          Additional information is provided in our Privacy Policy.
        </P>
      </>
    ),
  },
  {
    id: "childrens-privacy",
    title: "Children’s Privacy",
    body: (
      <>
        <P>
          Onloz is designed for businesses and their customers and is not
          directed toward children.
        </P>
        <P>
          We do not knowingly use cookies or similar technologies to
          intentionally collect personal information from children in
          circumstances where such collection is prohibited by applicable law.
        </P>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to This Cookie Policy",
    body: (
      <>
        <P>
          We may update this Cookie Policy as our technology, Service, or legal
          obligations change.
        </P>
        <P>For example, we may update this Policy when we:</P>
        <Bullets
          items={[
            "introduce analytics;",
            "introduce advertising technologies;",
            "introduce payment functionality;",
            "introduce new third-party providers;",
            "change our hosting infrastructure; or",
            "change how cookies are used.",
          ]}
        />
        <P>
          The “Last Updated” date at the beginning of this Policy indicates
          when the Policy was most recently updated.
        </P>
        <P>
          Where required, we will provide additional notice or obtain consent
          before introducing new categories of cookies.
        </P>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact Us",
    body: (
      <>
        <P>
          If you have questions about our use of cookies or similar
          technologies, contact us:
        </P>
        <div className="mt-1 flex flex-col gap-3">
          <ContactRow label="Website">
            <a
              href="https://onloz.com"
              className="inline-flex items-center gap-1.5 underline underline-offset-4 hover:text-foreground/70"
            >
              onloz.com
              <RiArrowRightLine aria-hidden className="size-3.5" />
            </a>
          </ContactRow>
          <ContactRow label="Privacy email">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-1.5 underline underline-offset-4 hover:text-foreground/70"
            >
              <RiMailLine aria-hidden className="size-3.5" />
              {CONTACT_EMAIL}
            </a>
          </ContactRow>
          <ContactRow label="Legal entity">{LEGAL_ENTITY_NAME}</ContactRow>
          {LEGAL_ENTITY_ADDRESS && (
            <ContactRow label="Registered address">
              {LEGAL_ENTITY_ADDRESS}
            </ContactRow>
          )}
          {LEGAL_ENTITY_JURISDICTION && (
            <ContactRow label="Incorporated in">
              {LEGAL_ENTITY_JURISDICTION}
            </ContactRow>
          )}
        </div>
      </>
    ),
  },
]

export default function CookiePolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal · Cookie Policy"
      title="Cookie Policy"
      lastUpdated={LAST_UPDATED}
      intro={
        <>
          <P>
            This Cookie Policy explains how <Strong>{LEGAL_ENTITY_NAME}</Strong>{" "}
            (“Onloz”, “we”, “us”, or “our”) uses cookies and similar
            technologies when you visit <Strong>https://onloz.com</Strong> or
            use our websites, applications, and services (collectively, the
            “Service”).
          </P>
          <P>
            This Cookie Policy should be read together with our{" "}
            <Strong>Privacy Policy</Strong> and{" "}
            <Strong>Terms of Service</Strong>.
          </P>
        </>
      }
      sections={SECTIONS}
      noticeLabel="Quick summary"
      notice={
        <>
          <P>
            At the current pilot stage, Onloz primarily uses technologies
            necessary to:
          </P>
          <P>
            <Strong>
              Operate the Service → Maintain sessions → Protect accounts →
              Prevent abuse → Provide requested functionality
            </Strong>
          </P>
          <P>
            We may introduce analytics and other technologies as Onloz
            develops. When we do, we will update this Cookie Policy and
            implement appropriate consent mechanisms where required by
            applicable law.
          </P>
        </>
      }
    />
  )
}
