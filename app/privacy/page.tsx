import { RiArrowRightLine, RiMailLine } from "@remixicon/react"

import {
  Bullets,
  ContactRow,
  Lead,
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
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Onloz collects, uses, discloses, stores, and protects personal information — for businesses using Onloz, their customers, and website visitors.",
  path: "/privacy",
})

const LAST_UPDATED = "September 10, 2026"

/** Third-party provider used for AI-assisted review drafting. */
const AI_PROVIDER = "DeepSeek"

const SECTIONS: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who We Are",
    body: (
      <>
        <P>
          Onloz is a software platform that helps businesses collect customer
          feedback and helps customers turn their genuine experiences into
          polished review text.
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
        <P>
          The identity of the legal entity responsible for your personal
          information may depend on the service you use and the relationship
          between you, Onloz, and the business using Onloz.
        </P>
      </>
    ),
  },
  {
    id: "who-we-process",
    title: "The Different People Whose Information We Process",
    body: (
      <>
        <P>
          Because Onloz is a business-to-business software platform, we may
          process information relating to different categories of people.
        </P>
        <Lead>Business users</Lead>
        <P>
          These are business owners, employees, administrators, and other people
          who create or use an Onloz account.
        </P>
        <P>
          For these users, Onloz generally acts as a controller or equivalent
          responsible party for account, billing, support, security, and
          service-management information.
        </P>
        <Lead>Customers of businesses using Onloz</Lead>
        <P>
          These are people who interact with an Onloz-powered feedback or review
          experience after visiting, purchasing from, or interacting with a
          business.
        </P>
        <P>
          Depending on the arrangement, the business may determine why and how
          that customer’s information is collected, while Onloz may process the
          information on the business’s behalf.
        </P>
        <P>
          In those circumstances, the business may be responsible for providing
          the appropriate privacy notice to its customers.
        </P>
        <Lead>Website visitors</Lead>
        <P>
          These are people who visit our website without creating an account.
        </P>
        <P>
          We may process limited technical and analytics information about these
          visitors as described below.
        </P>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    body: (
      <>
        <P>
          The information we collect depends on how you interact with Onloz.
        </P>
        <Lead>Account information</Lead>
        <P>When you create an Onloz account, we may collect:</P>
        <Bullets
          items={[
            "name;",
            "email address;",
            "phone number, if provided;",
            "password or authentication information;",
            "business name;",
            "business address;",
            "business category;",
            "website;",
            "account preferences;",
            "branding information;",
            "profile information; and",
            "other information you choose to provide.",
          ]}
        />
      </>
    ),
  },
  {
    id: "customer-feedback",
    title: "Customer Feedback Information",
    body: (
      <>
        <P>
          When you interact with an Onloz-powered customer feedback experience,
          we may process information such as:
        </P>
        <Bullets
          items={[
            "star rating;",
            "selected feedback categories;",
            "answers to feedback questions;",
            "written comments;",
            "review drafts;",
            "generated review text;",
            "edits made to generated text;",
            "feedback about the review-generation experience;",
            "business or location associated with the interaction;",
            "campaign or QR-code identifier;",
            "date and time of the interaction; and",
            "limited technical information associated with the session.",
          ]}
        />
        <P>
          A customer may be able to use an Onloz feedback experience without
          creating an Onloz account.
        </P>
        <P>
          We do not require a customer’s name, email address, or phone number
          unless a particular feature or business configuration requires it.
        </P>
      </>
    ),
  },
  {
    id: "information-you-provide",
    title: "Information You Provide to Us",
    body: (
      <>
        <P>We may collect information when you:</P>
        <Bullets
          items={[
            "create an account;",
            "purchase a subscription;",
            "contact customer support;",
            "submit a support request;",
            "respond to a survey;",
            "communicate with us;",
            "submit feedback;",
            "configure your business profile;",
            "customize your Onloz experience;",
            "participate in promotional activities; or",
            "otherwise voluntarily provide information.",
          ]}
        />
      </>
    ),
  },
  {
    id: "payment-information",
    title: "Payment Information",
    body: (
      <>
        <P>
          If you purchase a paid Onloz subscription, payment information may be
          processed by our third-party payment provider.
        </P>
        <P>
          Depending on the payment method, Onloz may receive limited information
          such as:
        </P>
        <Bullets
          items={[
            "billing name;",
            "billing address;",
            "transaction identifier;",
            "subscription information;",
            "payment status;",
            "payment method type;",
            "last four digits of a payment card, where provided by the payment processor; and",
            "transaction dates and amounts.",
          ]}
        />
        <P>
          We generally do not store complete payment-card numbers on our own
          systems.
        </P>
        <P>
          Payments are subject to the privacy policy and terms of the applicable
          payment provider.
        </P>
      </>
    ),
  },
  {
    id: "technical-usage",
    title: "Technical and Usage Information",
    body: (
      <>
        <P>
          When you access the Service, we may automatically collect information
          such as:
        </P>
        <Bullets
          items={[
            "IP address;",
            "browser type;",
            "operating system;",
            "device type;",
            "device identifiers;",
            "approximate geographic information derived from IP address;",
            "pages or screens viewed;",
            "referring URLs;",
            "session information;",
            "timestamps;",
            "interactions with the Service;",
            "features used;",
            "error logs;",
            "performance information; and",
            "security-related information.",
          ]}
        />
        <P>
          We use this information to operate, secure, troubleshoot, analyze, and
          improve the Service.
        </P>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and Similar Technologies",
    body: (
      <>
        <P>
          Onloz may use cookies, local storage, pixels, SDKs, and similar
          technologies.
        </P>
        <P>We may use these technologies for:</P>
        <Bullets
          items={[
            "essential website functionality;",
            "authentication;",
            "security;",
            "remembering preferences;",
            "analytics;",
            "understanding how visitors use the Service;",
            "improving the Service; and",
            "marketing, where permitted by applicable law.",
          ]}
        />
        <P>
          Where applicable law requires consent for non-essential cookies or
          similar technologies, we will request consent before using them.
        </P>
        <P>
          Where required, we will provide a cookie-consent mechanism allowing
          users to manage non-essential cookies.
        </P>
        <P>
          You may be able to control cookies through your browser or our
          cookie-consent mechanism.
        </P>
        <P>
          Blocking certain cookies may affect the functionality of the Service.
        </P>
        <P>Our cookie practices may change as we introduce new technologies.</P>
      </>
    ),
  },
  {
    id: "how-we-use",
    title: "How We Use Personal Information",
    body: (
      <>
        <P>We may use personal information for the following purposes.</P>
        <Lead>Providing the Service</Lead>
        <P>To:</P>
        <Bullets
          items={[
            "create and maintain accounts;",
            "provide customer-feedback experiences;",
            "generate AI-assisted content;",
            "provide dashboards and analytics;",
            "provide integrations;",
            "process subscriptions;",
            "provide customer support; and",
            "otherwise provide features requested by you.",
          ]}
        />
        <Lead>Security and fraud prevention</Lead>
        <P>To:</P>
        <Bullets
          items={[
            "authenticate users;",
            "detect unauthorized activity;",
            "prevent fraud;",
            "investigate abuse;",
            "protect accounts;",
            "protect our infrastructure; and",
            "maintain the security of the Service.",
          ]}
        />
        <Lead>Service improvement</Lead>
        <P>To:</P>
        <Bullets
          items={[
            "understand how customers use the Service;",
            "identify bugs;",
            "improve performance;",
            "develop features;",
            "analyze aggregate usage;",
            "improve customer experience; and",
            "conduct internal research and analytics.",
          ]}
        />
        <P>
          Where we use information for product improvement, we seek to use
          appropriate safeguards and minimize the use of directly identifying
          information where reasonably practical.
        </P>
        <Lead>Communications</Lead>
        <P>We may use contact information to:</P>
        <Bullets
          items={[
            "respond to support requests;",
            "provide service notifications;",
            "send transactional messages;",
            "communicate about subscriptions;",
            "provide security notifications;",
            "communicate important changes; and",
            "send marketing communications where permitted by applicable law and your preferences.",
          ]}
        />
        <P>
          You can opt out of non-essential marketing communications at any time.
        </P>
        <Lead>Legal compliance</Lead>
        <P>We may process information when necessary to:</P>
        <Bullets
          items={[
            "comply with applicable laws;",
            "respond to lawful requests;",
            "enforce our agreements;",
            "protect our rights;",
            "investigate fraud or abuse;",
            "resolve disputes; or",
            "protect the safety and security of people and systems.",
          ]}
        />
      </>
    ),
  },
  {
    id: "ai-processing",
    title: "AI and Automated Processing",
    body: (
      <>
        <P>
          Onloz may use artificial intelligence and machine-learning
          technologies to assist with review drafting and other Service
          functionality.
        </P>
        <P>For example, a customer may provide:</P>
        <Bullets
          items={[
            "a star rating;",
            "selected feedback categories; and/or",
            "written feedback.",
          ]}
        />
        <P>
          Onloz may process that information to generate suggested review
          language.
        </P>
        <P>
          The purpose of this processing is to help express the customer’s own
          experience in natural language.
        </P>
        <P>
          AI-generated content may be inaccurate or contain errors. Customers
          and businesses remain responsible for reviewing generated content
          before publishing it.
        </P>
        <P>
          Onloz does not use AI to independently determine whether a customer
          had a genuine experience.
        </P>
        <P>
          We do not intentionally use AI-generated review text to create
          fabricated customer experiences.
        </P>
        <P>
          Where third-party AI providers are used, relevant information may be
          transmitted to those providers as necessary to provide the requested
          feature, subject to applicable agreements and safeguards. Our current
          third-party AI provider is <Strong>{AI_PROVIDER}</Strong>.
        </P>
      </>
    ),
  },
  {
    id: "lawful-bases",
    title: "Lawful Bases for Processing",
    body: (
      <>
        <P>
          Where laws such as the UK GDPR or EU GDPR apply, we rely on one or
          more lawful bases depending on the circumstances. These may include
          the following.
        </P>
        <Lead>Performance of a contract</Lead>
        <P>Where processing is necessary to:</P>
        <Bullets
          items={[
            "create an account;",
            "provide the Service;",
            "process a subscription;",
            "provide requested functionality; or",
            "provide customer support.",
          ]}
        />
        <Lead>Legitimate interests</Lead>
        <P>
          Where processing is necessary for legitimate business interests, such
          as:
        </P>
        <Bullets
          items={[
            "securing our systems;",
            "preventing fraud;",
            "improving the Service;",
            "understanding Service usage;",
            "maintaining business operations;",
            "communicating with business customers; or",
            "defending legal claims.",
          ]}
        />
        <P>
          When relying on legitimate interests, we consider the impact on
          individuals and applicable legal requirements.
        </P>
        <Lead>Consent</Lead>
        <P>Where applicable law requires consent, we will request it.</P>
        <P>For example, consent may be required for certain:</P>
        <Bullets
          items={[
            "non-essential cookies;",
            "marketing communications;",
            "optional processing activities; or",
            "other activities where consent is the appropriate legal basis.",
          ]}
        />
        <P>You may withdraw consent where applicable.</P>
        <P>
          Withdrawal of consent does not affect processing that occurred before
          withdrawal.
        </P>
        <Lead>Legal obligations</Lead>
        <P>
          We may process information where necessary to comply with applicable
          legal obligations.
        </P>
      </>
    ),
  },
  {
    id: "business-customer-data",
    title: "Business Customer Data",
    body: (
      <>
        <P>
          If you use Onloz as a business, you may provide us with personal
          information belonging to your customers, employees, or other
          individuals.
        </P>
        <P>
          Depending on the nature of the processing, you may be the controller
          or equivalent responsible party and Onloz may act as your processor or
          service provider.
        </P>
        <P>You are responsible for ensuring that:</P>
        <Bullets
          items={[
            "you have a lawful basis for collecting and providing the information;",
            "you provide appropriate privacy information;",
            "you obtain required consents;",
            "your instructions to Onloz are lawful;",
            "your use of Onloz complies with applicable privacy laws; and",
            "you have the necessary rights to provide the information to us.",
          ]}
        />
        <P>
          Where required, Onloz may enter into a Data Processing Agreement with
          a business customer.
        </P>
      </>
    ),
  },
  {
    id: "sharing",
    title: "How We Share Information",
    body: (
      <>
        <P>
          We may share personal information with trusted third parties where
          necessary to operate the Service.
        </P>
        <P>These may include the following.</P>
        <Lead>Infrastructure and hosting providers</Lead>
        <P>
          Providers that host databases, applications, files, and
          infrastructure.
        </P>
        <Lead>AI providers</Lead>
        <P>Providers used to generate or process AI-assisted content.</P>
        <Lead>Payment providers</Lead>
        <P>Providers that process subscription payments.</P>
        <Lead>Analytics providers</Lead>
        <P>Providers that help us understand Service usage and performance.</P>
        <Lead>Communications providers</Lead>
        <P>
          Providers that deliver email, SMS, authentication, or other
          communications.
        </P>
        <Lead>Customer support providers</Lead>
        <P>
          Providers that help us manage support requests and communications.
        </P>
        <Lead>Security providers</Lead>
        <P>
          Providers that help detect fraud, abuse, malicious traffic, and
          security threats.
        </P>
        <Lead>Professional advisers</Lead>
        <P>
          Lawyers, accountants, auditors, insurers, consultants, and other
          professional advisers where necessary.
        </P>
        <Lead>Government and legal authorities</Lead>
        <P>
          We may disclose information where required by law or where reasonably
          necessary to:
        </P>
        <Bullets
          items={[
            "comply with legal obligations;",
            "respond to lawful requests;",
            "enforce agreements;",
            "protect our rights;",
            "investigate fraud or abuse; or",
            "protect the safety of individuals or the public.",
          ]}
        />
        <P>
          We do not sell customer personal information as a data-broker
          business.
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
          Onloz may direct customers to third-party review platforms such as
          Google or other services selected by a business.
        </P>
        <P>
          If you choose to submit information to a third-party platform, that
          platform may independently collect and process your information.
        </P>
        <P>
          Once you leave Onloz and interact directly with a third-party service,
          that service’s privacy policy and terms apply.
        </P>
        <P>Onloz does not control:</P>
        <Bullets
          items={[
            "third-party privacy practices;",
            "third-party review moderation;",
            "third-party data retention;",
            "third-party account policies; or",
            "third-party data processing.",
          ]}
        />
        <P>
          You should review the privacy policy of the relevant third-party
          service before submitting information to it.
        </P>
      </>
    ),
  },
  {
    id: "international-transfers",
    title: "International Data Transfers",
    body: (
      <>
        <P>
          Because Onloz is intended to operate globally, your information may be
          processed in countries other than the country where you live.
        </P>
        <P>
          For example, our service providers may operate infrastructure or
          personnel in different countries.
        </P>
        <P>
          Where applicable law restricts international transfers of personal
          information, we will use appropriate mechanisms and safeguards
          required by that law.
        </P>
        <P>Depending on the circumstances, these may include:</P>
        <Bullets
          items={[
            "adequacy decisions;",
            "standard contractual clauses;",
            "UK International Data Transfer Agreements or Addendums;",
            "contractual protections;",
            "technical safeguards; and",
            "other legally recognized transfer mechanisms.",
          ]}
        />
      </>
    ),
  },
  {
    id: "retention",
    title: "Data Retention",
    body: (
      <>
        <P>
          We retain personal information only for as long as reasonably
          necessary for the purposes described in this Privacy Policy, unless a
          longer period is required or permitted by law.
        </P>
        <P>Retention periods may depend on:</P>
        <Bullets
          items={[
            "the type of information;",
            "why it was collected;",
            "whether your account remains active;",
            "contractual requirements;",
            "legal obligations;",
            "dispute resolution;",
            "security requirements; and",
            "legitimate business needs.",
          ]}
        />
        <P>For example:</P>
        <Lead>Account information</Lead>
        <P>
          Generally retained while your account is active and for a reasonable
          period after termination where necessary for legal, accounting,
          security, or dispute-resolution purposes.
        </P>
        <Lead>Customer feedback</Lead>
        <P>
          Retained according to the configuration of the relevant business and
          our contractual requirements.
        </P>
        <Lead>Billing information</Lead>
        <P>
          Retained for periods necessary to comply with applicable accounting,
          tax, and financial obligations.
        </P>
        <Lead>Security logs</Lead>
        <P>
          May be retained for a limited period necessary for security
          monitoring, fraud prevention, and investigation.
        </P>
        <P>
          When information is no longer required, we may delete it, anonymize
          it, or securely dispose of it.
        </P>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your Privacy Rights",
    body: (
      <>
        <P>
          Depending on where you live and applicable law, you may have rights
          regarding your personal information.
        </P>
        <P>These may include the right to:</P>
        <Bullets
          items={[
            "access personal information;",
            "correct inaccurate information;",
            "request deletion;",
            "request restriction of processing;",
            "object to certain processing;",
            "request data portability;",
            "withdraw consent;",
            "request information about how your data is used;",
            "object to certain direct marketing;",
            "lodge a complaint with a relevant supervisory authority; and",
            "exercise other rights provided by applicable law.",
          ]}
        />
        <P>
          These rights are subject to applicable legal exceptions and
          limitations.
        </P>
        <P>
          For example, we may be permitted or required to retain certain
          information for legal, security, fraud-prevention, or accounting
          purposes.
        </P>
      </>
    ),
  },
  {
    id: "exercising-rights",
    title: "How to Exercise Your Rights",
    body: (
      <>
        <P>To exercise a privacy right, contact us at:</P>
        <div className="flex flex-col gap-3 border border-border bg-card/60 p-6">
          <ContactRow label="Privacy email">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-1.5 underline underline-offset-4 hover:text-foreground/70"
            >
              <RiMailLine aria-hidden className="size-3.5" />
              {CONTACT_EMAIL}
            </a>
          </ContactRow>
        </div>
        <P>
          Please provide enough information for us to understand your request
          and verify your identity where reasonably necessary.
        </P>
        <P>
          If you use Onloz through a business, some requests relating to
          information collected by that business may need to be directed to the
          business itself.
        </P>
        <P>
          For example, if a restaurant uses Onloz to collect customer feedback,
          the restaurant may be responsible for determining the purposes of that
          processing.
        </P>
        <P>
          Where appropriate, Onloz may assist the business in responding to your
          request.
        </P>
      </>
    ),
  },
  {
    id: "verification",
    title: "Verification of Requests",
    body: (
      <>
        <P>
          For security reasons, we may need to verify your identity before
          completing certain privacy requests.
        </P>
        <P>
          We will try to avoid requesting information beyond what is reasonably
          necessary to verify your identity.
        </P>
        <P>
          If we cannot verify your identity, we may be unable to fulfill the
          request.
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
          Onloz is intended for businesses and their customers and is not
          directed at children.
        </P>
        <P>
          We do not knowingly design the Service to collect personal information
          from children where prohibited by applicable law.
        </P>
        <P>
          If you believe that a child has provided personal information to Onloz
          in circumstances where such collection was not appropriate, please
          contact us so that we can investigate and take appropriate action.
        </P>
        <P>
          Businesses using Onloz are responsible for configuring and using the
          Service in accordance with applicable age-related privacy
          requirements.
        </P>
      </>
    ),
  },
  {
    id: "security",
    title: "Data Security",
    body: (
      <>
        <P>
          We use reasonable technical and organizational measures designed to
          protect personal information against:
        </P>
        <Bullets
          items={[
            "unauthorized access;",
            "accidental loss;",
            "misuse;",
            "alteration;",
            "disclosure; and",
            "destruction.",
          ]}
        />
        <P>Security measures may include:</P>
        <Bullets
          items={[
            "encryption in transit;",
            "access controls;",
            "authentication mechanisms;",
            "monitoring;",
            "logging;",
            "backups;",
            "infrastructure security;",
            "least-privilege access; and",
            "security reviews.",
          ]}
        />
        <P>
          However, no internet service or security system can guarantee absolute
          security.
        </P>
        <P>
          You should use appropriate security practices when using the Service.
        </P>
      </>
    ),
  },
  {
    id: "data-breaches",
    title: "Data Breaches",
    body: (
      <>
        <P>
          If we become aware of a security incident involving personal
          information, we will assess the incident and take steps required by
          applicable law.
        </P>
        <P>
          Where legally required, we may notify affected customers, businesses,
          regulators, or other relevant parties.
        </P>
        <P>
          If you use Onloz as a business customer and a security incident
          affects information processed on your behalf, we will provide
          notifications and assistance as required by applicable law and any
          applicable Data Processing Agreement.
        </P>
      </>
    ),
  },
  {
    id: "marketing",
    title: "Marketing Communications",
    body: (
      <>
        <P>
          We may send transactional communications necessary to provide the
          Service.
        </P>
        <P>Examples include:</P>
        <Bullets
          items={[
            "account verification;",
            "password resets;",
            "subscription confirmations;",
            "billing notifications;",
            "security alerts;",
            "service announcements; and",
            "important legal notices.",
          ]}
        />
        <P>
          These communications cannot generally be opted out of while
          maintaining an account where they are necessary to operate the
          Service.
        </P>
        <P>
          We may also send marketing communications where permitted by
          applicable law.
        </P>
        <P>
          You can unsubscribe from marketing communications using the
          unsubscribe mechanism included in the message or by contacting us.
        </P>
      </>
    ),
  },
  {
    id: "analytics",
    title: "Analytics",
    body: (
      <>
        <P>We may use analytics technologies to understand:</P>
        <Bullets
          items={[
            "website traffic;",
            "feature usage;",
            "conversion rates;",
            "errors;",
            "performance;",
            "customer journeys; and",
            "overall Service usage.",
          ]}
        />
        <P>
          Where required by applicable law, we will obtain consent before using
          non-essential analytics technologies.
        </P>
        <P>
          Analytics data may be aggregated or de-identified for product and
          business analysis.
        </P>
      </>
    ),
  },
  {
    id: "do-not-track",
    title: "Do Not Track",
    body: (
      <>
        <P>Some browsers provide a “Do Not Track” signal.</P>
        <P>
          Because there is currently no universally accepted technical standard
          for responding to all such signals, Onloz may not respond to every
          browser-level Do Not Track setting.
        </P>
        <P>
          Where applicable law requires a particular response to such signals,
          we will comply with the applicable requirement.
        </P>
      </>
    ),
  },
  {
    id: "data-deletion",
    title: "Data Deletion",
    body: (
      <>
        <P>
          You may request deletion of personal information by contacting us.
        </P>
        <P>
          If you have an Onloz account, you may also be able to delete
          information through available account controls.
        </P>
        <P>
          Deletion may be subject to legal, security, contractual, or
          operational requirements.
        </P>
        <P>
          For example, we may retain limited information where necessary to:
        </P>
        <Bullets
          items={[
            "comply with law;",
            "establish or defend legal claims;",
            "prevent fraud;",
            "maintain security;",
            "complete financial records; or",
            "enforce our agreements.",
          ]}
        />
        <P>
          Where complete deletion is not possible, we may instead restrict
          access or anonymize the information.
        </P>
      </>
    ),
  },
  {
    id: "aggregated",
    title: "Aggregated and De-Identified Information",
    body: (
      <>
        <P>
          We may create aggregated, statistical, or de-identified information
          from information collected through the Service.
        </P>
        <P>
          Where permitted by law, we may use such information for purposes
          including:
        </P>
        <Bullets
          items={[
            "analytics;",
            "product development;",
            "benchmarking;",
            "research;",
            "security;",
            "business planning; and",
            "improving the Service.",
          ]}
        />
        <P>
          We will not attempt to re-identify information that has been properly
          de-identified except where necessary for permitted purposes such as
          security or legal compliance.
        </P>
      </>
    ),
  },
  {
    id: "business-transfers",
    title: "Business Transfers",
    body: (
      <>
        <P>
          If Onloz is involved in a merger, acquisition, financing,
          restructuring, bankruptcy, sale of assets, or similar transaction,
          personal information may be transferred as part of that transaction.
        </P>
        <P>Where required by law, we will provide appropriate notice.</P>
      </>
    ),
  },
  {
    id: "external-links",
    title: "Links to Other Websites",
    body: (
      <>
        <P>The Service may contain links to third-party websites.</P>
        <P>
          We are not responsible for the privacy practices, security, or content
          of third-party websites.
        </P>
        <P>
          You should review the privacy policy of each third-party website you
          visit.
        </P>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to This Privacy Policy",
    body: (
      <>
        <P>We may update this Privacy Policy from time to time.</P>
        <P>When we make material changes, we may provide notice through:</P>
        <Bullets
          items={[
            "the Service;",
            "our website;",
            "email; or",
            "another appropriate communication method.",
          ]}
        />
        <P>
          The “Last Updated” date at the top of this Privacy Policy indicates
          when it was most recently updated.
        </P>
        <P>
          If we introduce a new use of personal information that requires
          additional notice or consent under applicable law, we will provide the
          required notice or obtain the required consent before commencing that
          processing.
        </P>
      </>
    ),
  },
  {
    id: "complaints",
    title: "Complaints",
    body: (
      <>
        <P>
          If you have a concern about how we handle your personal information,
          please contact us first:
        </P>
        <div className="flex flex-col gap-3 border border-border bg-card/60 p-6">
          <ContactRow label="Privacy email">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex items-center gap-1.5 underline underline-offset-4 hover:text-foreground/70"
            >
              <RiMailLine aria-hidden className="size-3.5" />
              {CONTACT_EMAIL}
            </a>
          </ContactRow>
        </div>
        <P>
          You may also have the right to lodge a complaint with the relevant
          data-protection authority in your country.
        </P>
        <P>
          For individuals in the UK, the relevant supervisory authority is the
          Information Commissioner’s Office (ICO).
        </P>
        <P>
          For individuals in the European Economic Area, complaints may
          generally be made to the data-protection supervisory authority in the
          country where you live, work, or where you believe a violation
          occurred.
        </P>
        <P>
          For individuals in other jurisdictions, the applicable local privacy
          regulator may provide a similar complaint mechanism.
        </P>
      </>
    ),
  },
  {
    id: "uk-eea",
    title: "UK and European Economic Area Privacy",
    body: (
      <>
        <P>
          Where applicable, Onloz processes personal information in accordance
          with applicable data-protection requirements, including the UK GDPR
          and EU GDPR.
        </P>
        <P>
          Where these laws apply, individuals may have rights including access,
          rectification, erasure, restriction, objection, portability, and
          rights relating to automated decision-making, subject to applicable
          legal requirements and exceptions.
        </P>
        <P>
          Where Onloz processes personal information on behalf of a business
          customer, the business may remain responsible for determining the
          purposes and means of processing.
        </P>
      </>
    ),
  },
  {
    id: "india",
    title: "India Privacy",
    body: (
      <>
        <P>
          Where applicable, Onloz will process personal information in
          accordance with applicable Indian data-protection and privacy laws,
          including the Digital Personal Data Protection Act, 2023 and
          applicable rules and regulations as they come into force.
        </P>
        <P>
          India’s Digital Personal Data Protection Rules, 2025 were notified by
          the Ministry of Electronics and Information Technology and provide for
          phased commencement of different provisions.
        </P>
        <P>
          Where applicable, individuals may exercise rights available under
          Indian law by contacting us through the details provided in this
          Privacy Policy.
        </P>
      </>
    ),
  },
  {
    id: "us-state-privacy",
    title: "California and Other U.S. State Privacy Laws",
    body: (
      <>
        <P>
          Depending on the nature of our business and the laws applicable to
          you, residents of certain U.S. states may have additional privacy
          rights.
        </P>
        <P>These may include rights relating to:</P>
        <Bullets
          items={[
            "access;",
            "deletion;",
            "correction;",
            "portability;",
            "opting out of certain forms of processing;",
            "targeted advertising;",
            "sale of personal information;",
            "profiling; and",
            "other rights established by applicable state law.",
          ]}
        />
        <P>
          Onloz does not operate as a data broker and does not sell personal
          information as a data-broker business.
        </P>
        <P>
          Where a specific U.S. state privacy law applies to Onloz, we will
          comply with applicable requirements and provide additional disclosures
          or mechanisms where required.
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
          For privacy questions, requests, complaints, or data-protection
          matters, contact:
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

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal · Privacy Policy"
      title="Privacy Policy"
      lastUpdated={LAST_UPDATED}
      intro={
        <>
          <P>
            <Strong>{LEGAL_ENTITY_NAME}</Strong> (“Onloz”, “we”, “us”, or “our”)
            respects your privacy and is committed to protecting personal
            information.
          </P>
          <P>
            This Privacy Policy explains how we collect, use, disclose, store,
            and protect personal information when you:
          </P>
          <Bullets
            items={[
              <>
                visit <Strong>https://onloz.com</Strong>;
              </>,
              "create or use an Onloz account;",
              "use our software and services;",
              "interact with a business using Onloz;",
              "submit feedback through an Onloz-powered experience;",
              "contact us; or",
              "otherwise interact with Onloz.",
            ]}
          />
          <P>
            This Privacy Policy applies to information processed by Onloz
            through our websites, applications, software, and related services
            (collectively, the “Service”).
          </P>
          <P>Please read this Privacy Policy carefully.</P>
        </>
      }
      sections={SECTIONS}
      noticeLabel="In summary"
      notice={
        <>
          <P>
            Onloz is designed around a simple principle: we use personal
            information to provide and improve the Service, protect our users,
            and help businesses and their customers use Onloz as intended.
          </P>
          <P>
            We aim to collect only the information reasonably necessary for
            those purposes, explain how information is used, provide applicable
            privacy rights, and use appropriate safeguards to protect
            information.
          </P>
          <P>
            Nothing in this Privacy Policy limits privacy rights that cannot
            legally be limited.
          </P>
        </>
      }
    />
  )
}
