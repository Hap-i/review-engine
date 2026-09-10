import { RiArrowRightLine, RiMailLine } from "@remixicon/react"

import {
  Bullets,
  ContactRow,
  LegalPage,
  P,
  Steps,
  Strong,
  type LegalSection,
} from "@/components/marketing/legal"
import {
  CONTACT_EMAIL,
  GOVERNING_LAW,
  LEGAL_ENTITY_ADDRESS,
  LEGAL_ENTITY_JURISDICTION,
  LEGAL_ENTITY_NAME,
} from "@/lib/site"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "The agreement that governs how businesses and their customers use Onloz — including acceptable use, AI-assisted content, subscriptions, third-party platforms and liability.",
  path: "/terms",
})

const LAST_UPDATED = "September 10, 2026"

const SECTIONS: LegalSection[] = [
  {
    id: "about-onloz",
    title: "About Onloz",
    body: (
      <>
        <P>
          Onloz is a software platform designed to help businesses collect
          customer feedback and assist customers in turning their own
          experiences and feedback into draft review text.
        </P>
        <P>The Service may include:</P>
        <Bullets
          items={[
            "customer feedback collection;",
            "rating and feedback forms;",
            "AI-assisted review drafting;",
            "QR codes and links;",
            "review-destination links;",
            "customer feedback analytics;",
            "business dashboards;",
            "customization and branding;",
            "integrations with third-party services; and",
            "other features that we may introduce or discontinue from time to time.",
          ]}
        />
        <P>
          Onloz is a technology provider. We are not a review platform, search
          engine, social network, or representative of Google or any other
          third-party review platform.
        </P>
      </>
    ),
  },
  {
    id: "eligibility",
    title: "Eligibility",
    body: (
      <>
        <P>
          You must be legally capable of entering into a binding contract in
          your jurisdiction to use the Service.
        </P>
        <P>
          If you use the Service on behalf of a Business, you represent that:
        </P>
        <Steps
          items={[
            "you have authority to accept these Terms on its behalf;",
            "the Business will comply with these Terms;",
            "the Business will comply with applicable laws and regulations; and",
            "the Business will comply with the rules and policies of any third-party platform to which it directs customers.",
          ]}
        />
        <P>
          You may not use the Service if doing so would violate applicable law
          or regulation.
        </P>
      </>
    ),
  },
  {
    id: "accounts",
    title: "Accounts",
    body: (
      <>
        <P>Certain features require an account.</P>
        <P>
          You agree to provide accurate and current information when creating
          and maintaining your account.
        </P>
        <P>You are responsible for:</P>
        <Bullets
          items={[
            "maintaining the confidentiality of your account credentials;",
            "all activity occurring through your account;",
            "maintaining appropriate security controls;",
            "promptly notifying us of unauthorized access; and",
            "ensuring that users you authorize to access your account comply with these Terms.",
          ]}
        />
        <P>
          You must not share account credentials in a manner that compromises
          the security of the Service.
        </P>
        <P>
          We may suspend or restrict an account where reasonably necessary to
          protect the Service, our users, third parties, or to address suspected
          violations of these Terms or applicable law.
        </P>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable Use",
    body: (
      <>
        <P>
          You agree to use the Service only for lawful purposes and in
          accordance with these Terms.
        </P>
        <P>You must not use Onloz to:</P>
        <Bullets
          items={[
            "create, commission, facilitate, or publish fake reviews;",
            "create reviews for people who did not have a genuine experience with the relevant business;",
            "fabricate customer experiences, facts, events, products, services, employees, prices, waiting times, or other details;",
            "manipulate ratings or review scores;",
            "selectively solicit positive reviews while suppressing or discouraging negative reviews;",
            "offer money, discounts, free products, free services, gifts, or other incentives in exchange for reviews, ratings, revisions, or removal of negative reviews where prohibited by applicable law or platform rules;",
            "impersonate a customer or another person;",
            "create multiple accounts or identities for the purpose of manipulating reviews or engagement;",
            "submit reviews on behalf of customers without their authorization;",
            "use automated or deceptive methods to create artificial engagement;",
            "misrepresent the identity, relationship, or independence of a reviewer;",
            "use the Service to harass, threaten, defame, or deceive customers;",
            "violate the policies of Google, Google Maps, or another third-party platform;",
            "violate applicable consumer-protection, advertising, privacy, data-protection, intellectual-property, or other laws;",
            "upload content that you do not have the right to use;",
            "introduce malware, malicious code, or other harmful material;",
            "interfere with or attempt to compromise the security or operation of the Service;",
            "reverse engineer, decompile, or attempt to derive source code from the Service except where expressly permitted by applicable law;",
            "scrape or systematically extract data from the Service except through an authorized interface;",
            "use the Service to build a substantially competing service through unauthorized automated access; or",
            "use the Service for any purpose that could reasonably expose Onloz or another person to legal or regulatory liability.",
          ]}
        />
        <P>
          We reserve the right to investigate suspected misuse and to suspend or
          terminate accounts where we reasonably believe these Terms, applicable
          law, or third-party platform policies have been violated.
        </P>
      </>
    ),
  },
  {
    id: "customer-reviews",
    title: "Customer Reviews and Genuine Experiences",
    body: (
      <>
        <P>
          Onloz is designed to help customers express their own genuine
          experiences.
        </P>
        <P>
          A Business using Onloz is responsible for ensuring that customers are
          given a genuine opportunity to provide feedback and that any review
          resulting from the Service accurately reflects the customer’s actual
          experience.
        </P>
        <P>A Business must not:</P>
        <Bullets
          items={[
            "instruct a customer to give a particular rating;",
            "require a positive rating;",
            "discourage a customer from giving a negative rating;",
            "offer a benefit in exchange for a positive review;",
            "prevent a customer from expressing a genuine negative experience;",
            "create or submit a review that the customer did not actually authorize;",
            "provide fabricated information for inclusion in a review; or",
            "otherwise manipulate the review process.",
          ]}
        />
        <P>
          Businesses must comply with the policies of the review platform to
          which they direct customers.
        </P>
        <P>
          For example, Google states that reviews on Google Maps should
          represent genuine experiences and prohibits fake engagement,
          incentivized reviews, and rating manipulation.
        </P>
        <P>
          Onloz does not guarantee that any third-party platform will publish,
          retain, rank, display, or recommend any review.
        </P>
      </>
    ),
  },
  {
    id: "ai-assisted-content",
    title: "AI-Assisted Content",
    body: (
      <>
        <P>
          The Service may use artificial intelligence and machine-learning
          technologies to generate, transform, summarize, or assist with
          customer feedback and review text (“AI Content”).
        </P>
        <P>
          AI Content is generated based on information supplied through the
          Service and may contain errors or inaccuracies.
        </P>
        <P>
          Onloz is intended to assist a customer in expressing their own
          experience. AI Content should not be treated as an independent factual
          account of an event.
        </P>
        <P>
          Businesses and customers are responsible for reviewing AI Content
          before publishing it.
        </P>
        <P>
          You must not knowingly publish AI Content containing false,
          fabricated, misleading, or unsupported claims.
        </P>
        <P>
          Where the Service generates review text, the customer should be given
          an appropriate opportunity to review and edit the text before
          publishing it to a third-party platform.
        </P>
        <P>
          Onloz does not guarantee that AI Content will be accurate, complete,
          suitable, accepted by a third-party platform, or appropriate for any
          particular purpose.
        </P>
      </>
    ),
  },
  {
    id: "published-content",
    title: "Customer Responsibility for Published Content",
    body: (
      <>
        <P>
          If you or your customers use the Service to create content that is
          subsequently published to Google, social media, review platforms,
          websites, or other third-party services, the person submitting or
          publishing that content remains responsible for the content.
        </P>
        <P>
          Onloz does not become the author of a customer’s review merely because
          the Service assisted in drafting or formatting it.
        </P>
        <P>
          You are responsible for ensuring that content submitted through your
          account:
        </P>
        <Bullets
          items={[
            "is truthful and not misleading;",
            "reflects a genuine experience where required;",
            "complies with applicable law;",
            "complies with the rules of the destination platform; and",
            "does not infringe the rights of another person.",
          ]}
        />
      </>
    ),
  },
  {
    id: "third-party-platforms",
    title: "Third-Party Platforms",
    body: (
      <>
        <P>
          The Service may link to or integrate with third-party services,
          including review platforms, search engines, social networks, payment
          processors, analytics providers, AI providers, hosting providers, and
          other external services (“Third-Party Services”).
        </P>
        <P>
          Third-Party Services are controlled by their respective providers and
          are subject to their own terms and policies.
        </P>
        <P>
          Onloz does not control Third-Party Services and is not responsible
          for:
        </P>
        <Bullets
          items={[
            "their availability;",
            "their policies;",
            "their moderation decisions;",
            "removal or rejection of content;",
            "changes to their APIs;",
            "account restrictions;",
            "suspension or termination of accounts;",
            "changes to ranking or visibility;",
            "changes to review policies;",
            "data practices; or",
            "any loss caused by the acts or omissions of a Third-Party Service.",
          ]}
        />
        <P>
          Your use of a Third-Party Service is governed by that provider’s terms
          and policies.
        </P>
        <P>
          You acknowledge that a third-party platform may remove, hide, filter,
          restrict, or otherwise modify content submitted by you or your
          customers.
        </P>
      </>
    ),
  },
  {
    id: "no-guarantee",
    title: "No Guarantee of Reviews, Ratings, Rankings, or Business Results",
    body: (
      <>
        <P>Onloz does not guarantee:</P>
        <Bullets
          items={[
            "any particular number of reviews;",
            "any particular review conversion rate;",
            "any particular rating;",
            "an increase in a business’s average rating;",
            "improved search rankings;",
            "improved local SEO performance;",
            "increased sales or revenue;",
            "increased customer retention;",
            "publication or retention of reviews by a third party;",
            "continued availability of any third-party review platform;",
            "continued operation of any third-party integration; or",
            "any particular commercial result.",
          ]}
        />
        <P>
          Any examples, estimates, case studies, statistics, or performance
          claims displayed by Onloz are illustrative unless expressly stated
          otherwise.
        </P>
        <P>Past performance does not guarantee future results.</P>
      </>
    ),
  },
  {
    id: "subscriptions",
    title: "Subscriptions and Fees",
    body: (
      <>
        <P>Certain features may require a paid subscription.</P>
        <P>
          Prices, billing intervals, included usage, and available features will
          be presented at the time of purchase or within the Service.
        </P>
        <P>Unless otherwise stated:</P>
        <Bullets
          items={[
            "subscriptions automatically renew for the applicable billing period;",
            "you authorize the applicable payment provider to charge the subscription fee;",
            "you are responsible for applicable taxes, duties, or similar charges;",
            "subscription prices may change upon reasonable notice;",
            "cancellation will generally prevent future renewal but will not automatically refund previously paid amounts; and",
            "unused subscription periods, credits, or usage may not be refundable unless required by applicable law or expressly stated by us.",
          ]}
        />
        <P>
          Where applicable law gives you mandatory cancellation, refund, or
          withdrawal rights, those rights are not excluded by these Terms.
        </P>
      </>
    ),
  },
  {
    id: "free-trials",
    title: "Free Trials and Promotional Offers",
    body: (
      <>
        <P>
          We may offer free trials, promotional pricing, credits, or other
          introductory offers.
        </P>
        <P>Unless otherwise stated:</P>
        <Bullets
          items={[
            "only one promotional offer may be used per customer;",
            "we may restrict eligibility;",
            "promotional offers may not be combined;",
            "we may discontinue a promotional offer at any time where permitted by law; and",
            "a free trial may automatically convert into a paid subscription if clearly disclosed at signup and you do not cancel before the trial ends.",
          ]}
        />
        <P>
          We will provide any legally required information regarding renewal and
          charges.
        </P>
      </>
    ),
  },
  {
    id: "cancellation",
    title: "Cancellation",
    body: (
      <>
        <P>
          You may cancel your subscription through the cancellation
          functionality provided within the Service or by contacting us through
          the support channel specified on our website.
        </P>
        <P>
          Cancellation generally takes effect at the end of the current paid
          billing period unless otherwise stated.
        </P>
        <P>
          We may suspend or terminate access if you materially violate these
          Terms, fail to pay applicable fees, misuse the Service, or create a
          material legal, security, or operational risk.
        </P>
        <P>
          Where reasonably practicable, we may provide notice and an opportunity
          to remedy a violation before termination, except where immediate
          action is reasonably necessary.
        </P>
      </>
    ),
  },
  {
    id: "refunds",
    title: "Refunds",
    body: (
      <>
        <P>
          Refunds are subject to the refund terms presented when you purchase
          the Service and to any mandatory consumer rights applicable to you.
        </P>
        <P>
          Nothing in these Terms excludes or limits a refund, cancellation,
          withdrawal, or other right that cannot legally be excluded.
        </P>
        <P>
          For business customers purchasing the Service for commercial purposes,
          refunds may be limited to the circumstances expressly stated in your
          order or subscription terms.
        </P>
      </>
    ),
  },
  {
    id: "your-content",
    title: "Your Content",
    body: (
      <>
        <P>
          You retain ownership of content that you submit to Onloz, including
          business information, branding, questions, feedback, and other
          materials (“Your Content”).
        </P>
        <P>
          You grant Onloz a limited, worldwide, non-exclusive license to host,
          store, reproduce, process, transmit, modify, and otherwise use Your
          Content solely as reasonably necessary to:
        </P>
        <Bullets
          items={[
            "provide the Service;",
            "generate AI-assisted content at your direction;",
            "maintain and secure the Service;",
            "provide customer support;",
            "prevent abuse and fraud;",
            "comply with legal obligations; and",
            "improve the Service where permitted by our Privacy Policy and applicable law.",
          ]}
        />
        <P>
          We will not sell your customer-submitted content as a standalone
          product.
        </P>
        <P>
          Additional rights and processing activities are described in our
          Privacy Policy.
        </P>
      </>
    ),
  },
  {
    id: "service-providers",
    title: "AI Providers and Service Providers",
    body: (
      <>
        <P>
          To provide certain features, Onloz may use third-party infrastructure
          and technology providers, including cloud hosting providers, analytics
          providers, payment processors, communications providers, and
          artificial-intelligence providers.
        </P>
        <P>
          Information may be processed by these providers as necessary to
          provide the Service, subject to applicable contractual, technical, and
          legal safeguards.
        </P>
        <P>
          Our Privacy Policy provides additional information regarding personal
          data processing and relevant service providers.
        </P>
      </>
    ),
  },
  {
    id: "business-data",
    title: "Business Data and Personal Data",
    body: (
      <>
        <P>
          If you use Onloz to collect information from your customers, you are
          responsible for ensuring that your collection and use of that
          information is lawful.
        </P>
        <P>
          Depending on the circumstances, the Business may act as the controller
          or equivalent responsible party for personal information collected
          from its customers, while Onloz may process such information on the
          Business’s behalf.
        </P>
        <P>You must:</P>
        <Bullets
          items={[
            "provide appropriate privacy notices;",
            "obtain required consents where applicable;",
            "have a lawful basis for processing personal data;",
            "comply with applicable privacy and data-protection laws;",
            "respond appropriately to data-subject requests where required; and",
            "ensure that information supplied to Onloz may lawfully be processed.",
          ]}
        />
        <P>
          Our Privacy Policy describes how Onloz processes personal information.
        </P>
        <P>
          Where a separate Data Processing Agreement (“DPA”) is offered or
          required, the DPA forms part of the agreement between the parties.
        </P>
      </>
    ),
  },
  {
    id: "data-security",
    title: "Data Security",
    body: (
      <>
        <P>
          We implement reasonable technical and organizational measures designed
          to protect information processed through the Service.
        </P>
        <P>
          However, no internet service, transmission method, storage system, or
          security measure can be guaranteed to be completely secure.
        </P>
        <P>
          You acknowledge that you use the Service at your own risk and should
          maintain appropriate backups of information that is important to your
          business.
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
          The Service, including its software, design, interfaces, trademarks,
          logos, documentation, visual elements, and underlying technology, is
          owned by or licensed to Onloz and is protected by applicable
          intellectual-property laws.
        </P>
        <P>
          Except for the limited rights expressly granted under these Terms, no
          rights are granted to you.
        </P>
        <P>You may not:</P>
        <Bullets
          items={[
            "copy or reproduce the Service except as permitted;",
            "modify or create derivative works of the Service;",
            "resell access without authorization;",
            "remove proprietary notices;",
            "use Onloz trademarks without permission;",
            "reverse engineer the Service except where legally permitted; or",
            "attempt to obtain source code or non-public technical information.",
          ]}
        />
      </>
    ),
  },
  {
    id: "feedback",
    title: "Feedback",
    body: (
      <P>
        If you provide suggestions, ideas, feature requests, or other feedback
        regarding Onloz, you grant us the right to use that feedback without
        restriction or compensation, provided that we do not disclose
        confidential information belonging to you.
      </P>
    ),
  },
  {
    id: "availability",
    title: "Service Availability and Changes",
    body: (
      <>
        <P>
          We may modify, update, improve, suspend, or discontinue features of
          the Service from time to time.
        </P>
        <P>We do not guarantee that:</P>
        <Bullets
          items={[
            "the Service will always be available;",
            "the Service will be uninterrupted;",
            "the Service will be error-free;",
            "every feature will remain available;",
            "integrations will continue to operate;",
            "the Service will work with every device or browser; or",
            "the Service will satisfy every business requirement.",
          ]}
        />
        <P>
          We may perform maintenance or make changes that temporarily affect
          availability.
        </P>
        <P>
          Where reasonably practicable, we will provide notice of material
          changes that significantly affect paid functionality.
        </P>
      </>
    ),
  },
  {
    id: "beta-features",
    title: "Beta Features",
    body: (
      <>
        <P>
          From time to time, Onloz may provide experimental, beta, preview, or
          early-access features.
        </P>
        <P>Such features may:</P>
        <Bullets
          items={[
            "contain errors;",
            "change substantially;",
            "be discontinued;",
            "have limited support; or",
            "differ from the final version.",
          ]}
        />
        <P>
          Beta features are provided on an “as available” basis unless otherwise
          stated.
        </P>
      </>
    ),
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    body: (
      <>
        <P>
          Each party may receive non-public information belonging to the other
          party.
        </P>
        <P>
          The receiving party agrees to use reasonable care to protect
          confidential information and to use it only for purposes related to
          the relationship between the parties.
        </P>
        <P>Confidential information does not include information that:</P>
        <Bullets
          items={[
            "is publicly available without breach;",
            "was already lawfully known;",
            "is independently developed without use of confidential information; or",
            "is lawfully obtained from a third party without confidentiality restrictions.",
          ]}
        />
        <P>
          A party may disclose confidential information where required by law,
          provided that, where legally permitted, it gives reasonable notice to
          the other party.
        </P>
      </>
    ),
  },
  {
    id: "suspension",
    title: "Suspension and Termination",
    body: (
      <>
        <P>We may suspend or terminate your access to the Service if:</P>
        <Bullets
          items={[
            "you materially breach these Terms;",
            "you use the Service for unlawful activity;",
            "you engage in fake, deceptive, manipulated, or fraudulent review activity;",
            "you violate a third-party platform’s policies in connection with the Service;",
            "your use creates a security or legal risk;",
            "you fail to pay applicable fees;",
            "you attempt to circumvent usage limits or access controls; or",
            "suspension is reasonably necessary to protect Onloz, users, or third parties.",
          ]}
        />
        <P>Upon termination, your right to use the Service ends.</P>
        <P>
          Unless required by law or otherwise agreed, we may delete account data
          after termination in accordance with our retention practices and
          Privacy Policy.
        </P>
      </>
    ),
  },
  {
    id: "indemnification",
    title: "Indemnification",
    body: (
      <>
        <P>
          To the extent permitted by applicable law, if you use the Service for
          business purposes, you agree to defend, indemnify, and hold harmless
          Onloz and its officers, directors, employees, contractors, and service
          providers from claims, losses, liabilities, damages, costs, and
          expenses (including reasonable legal fees) arising from or related to:
        </P>
        <Bullets
          items={[
            "Your Content;",
            "your use or misuse of the Service;",
            "your customers’ use of the Service through your account;",
            "your review-solicitation practices;",
            "fake, misleading, manipulated, or incentivized reviews associated with your use of the Service;",
            "your violation of these Terms;",
            "your violation of applicable law;",
            "your violation of a third-party platform’s terms or policies; or",
            "your infringement of another person’s rights.",
          ]}
        />
        <P>
          This section does not apply to the extent that a claim results from
          Onloz’s own gross negligence, willful misconduct, or other conduct for
          which liability cannot lawfully be excluded.
        </P>
      </>
    ),
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    body: (
      <>
        <P>
          To the maximum extent permitted by applicable law, the Service is
          provided on an “as is” and “as available” basis.
        </P>
        <P>
          We disclaim warranties that cannot lawfully be excluded, and otherwise
          disclaim warranties including implied warranties of:
        </P>
        <Bullets
          items={[
            "merchantability;",
            "fitness for a particular purpose;",
            "non-infringement;",
            "uninterrupted availability;",
            "accuracy;",
            "reliability; and",
            "suitability for a particular business outcome.",
          ]}
        />
        <P>
          We do not warrant that AI-generated content will be accurate,
          complete, original, appropriate, or accepted by any third-party
          platform.
        </P>
        <P>
          We do not warrant that use of Onloz will prevent a review from being
          removed, filtered, hidden, or restricted by Google or another
          platform.
        </P>
      </>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    body: (
      <>
        <P>
          To the maximum extent permitted by applicable law, Onloz and its
          officers, directors, employees, contractors, affiliates, and service
          providers will not be liable for:
        </P>
        <Bullets
          items={[
            "indirect damages;",
            "incidental damages;",
            "consequential damages;",
            "special damages;",
            "exemplary or punitive damages;",
            "loss of profits;",
            "loss of revenue;",
            "loss of business;",
            "loss of goodwill;",
            "loss of anticipated savings;",
            "loss of data;",
            "loss of customers;",
            "loss of rankings;",
            "loss of reviews;",
            "loss of ratings;",
            "removal of reviews;",
            "suspension of a third-party account;",
            "changes to third-party platform policies or algorithms; or",
            "inability to use a third-party service.",
          ]}
        />
        <P>
          To the maximum extent permitted by law, our aggregate liability
          arising out of or relating to the Service or these Terms will not
          exceed the greater of:
        </P>
        <Steps
          items={[
            "the amount you paid to Onloz for the Service during the twelve (12) months immediately preceding the event giving rise to the claim; or",
            "one hundred US dollars (USD $100).",
          ]}
        />
        <P>
          Nothing in these Terms excludes or limits liability that cannot
          legally be excluded or limited under applicable law.
        </P>
        <P>
          For consumers in jurisdictions where mandatory consumer protections
          apply, nothing in these Terms is intended to remove or restrict those
          rights.
        </P>
      </>
    ),
  },
  {
    id: "consumer-rights",
    title: "Consumer Rights",
    body: (
      <>
        <P>
          If you are a consumer rather than a business customer, you may have
          statutory rights under the laws of your jurisdiction.
        </P>
        <P>
          Nothing in these Terms is intended to exclude, restrict, or waive
          rights that cannot legally be excluded, restricted, or waived.
        </P>
        <P>
          Where mandatory consumer law conflicts with these Terms, the mandatory
          law will prevail to the extent of the conflict.
        </P>
      </>
    ),
  },
  {
    id: "international-use",
    title: "International Use",
    body: (
      <>
        <P>
          Onloz is a global software service and may be accessed from multiple
          countries.
        </P>
        <P>
          You are responsible for ensuring that your use of the Service complies
          with laws applicable to you, your Business, and your customers.
        </P>
        <P>
          We make no representation that the Service is appropriate or available
          for use in every jurisdiction.
        </P>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "Governing Law and Dispute Resolution",
    body: (
      <>
        <P>
          These Terms will be governed by the laws of {GOVERNING_LAW}, without
          regard to conflict-of-law principles.
        </P>
        <P>
          Any dispute arising from or relating to these Terms or the Service
          will be subject to the exclusive jurisdiction of the courts of{" "}
          {GOVERNING_LAW}, unless applicable law requires otherwise.
        </P>
        <P>
          Nothing in this section limits mandatory consumer rights or a party’s
          right to seek urgent injunctive or equitable relief where legally
          available.
        </P>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to These Terms",
    body: (
      <>
        <P>We may update these Terms from time to time.</P>
        <P>
          When we make material changes, we may provide notice through the
          Service, by email, or by other reasonable means.
        </P>
        <P>
          The updated Terms will become effective on the date stated in the
          updated Terms.
        </P>
        <P>
          Your continued use of the Service after the effective date constitutes
          acceptance of the updated Terms to the extent permitted by law.
        </P>
      </>
    ),
  },
  {
    id: "electronic-communications",
    title: "Electronic Communications",
    body: (
      <>
        <P>
          By using the Service, you consent to receive electronic communications
          from us relating to:
        </P>
        <Bullets
          items={[
            "your account;",
            "subscriptions;",
            "transactions;",
            "security;",
            "service changes;",
            "legal notices; and",
            "customer support.",
          ]}
        />
        <P>
          Marketing communications are subject to applicable consent and opt-out
          requirements.
        </P>
      </>
    ),
  },
  {
    id: "assignment",
    title: "Assignment",
    body: (
      <>
        <P>
          You may not assign or transfer your rights or obligations under these
          Terms without our prior written consent, except where such restriction
          is prohibited by law.
        </P>
        <P>
          We may assign or transfer these Terms in connection with a merger,
          acquisition, corporate reorganization, sale of assets, or similar
          transaction.
        </P>
      </>
    ),
  },
  {
    id: "severability",
    title: "Severability",
    body: (
      <P>
        If any provision of these Terms is determined to be invalid, unlawful,
        or unenforceable, that provision will be enforced to the maximum extent
        permitted by law and the remaining provisions will remain in effect.
      </P>
    ),
  },
  {
    id: "no-waiver",
    title: "No Waiver",
    body: (
      <P>
        Our failure to enforce any provision of these Terms does not constitute
        a waiver of our right to enforce that provision later.
      </P>
    ),
  },
  {
    id: "entire-agreement",
    title: "Entire Agreement",
    body: (
      <P>
        These Terms, together with any applicable order forms, subscription
        terms, Privacy Policy, Data Processing Agreement, and other policies
        expressly incorporated by reference, constitute the agreement between
        you and Onloz regarding the Service.
      </P>
    ),
  },
  {
    id: "contact",
    title: "Contact",
    body: (
      <>
        <P>If you have questions about these Terms, contact us at:</P>
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

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal · Terms of Service"
      title="Terms of Service"
      lastUpdated={LAST_UPDATED}
      intro={
        <>
          <P>
            These Terms of Service (“Terms”) govern your access to and use of
            the Onloz website, platform, software, applications, tools and
            related services (collectively, the “Service”) provided by{" "}
            <Strong>{LEGAL_ENTITY_NAME}</Strong> (“Onloz”, “we”, “us”, or
            “our”).
          </P>
          <P>
            By creating an account, accessing the Service, purchasing a
            subscription, or otherwise using the Service, you agree to these
            Terms.
          </P>
          <P>
            If you are using the Service on behalf of a company, organization,
            business, or other legal entity (“Business”), you represent and
            warrant that you have authority to bind that entity to these Terms.
            In that case, “you” includes both you and the entity you represent.
          </P>
          <P>
            <Strong>
              If you do not agree to these Terms, you must not use the Service.
            </Strong>
          </P>
        </>
      }
      sections={SECTIONS}
      notice={
        <>
          <P>
            Onloz provides software designed to help customers express their own
            genuine experiences. Onloz does not endorse or permit fake,
            fabricated, misleading, manipulated, incentivized, or otherwise
            prohibited reviews.
          </P>
          <P>
            Businesses are responsible for how they use the Service and for
            ensuring that their review-collection practices comply with
            applicable law and the policies of the review platforms they use.
          </P>
          <P>
            Onloz does not guarantee that any review will be published,
            retained, displayed, or positively affect a business’s reputation,
            ranking, visibility, or revenue.
          </P>
        </>
      }
    />
  )
}
