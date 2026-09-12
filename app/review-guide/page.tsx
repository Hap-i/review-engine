import {
  Bullets,
  Example,
  Lead,
  LegalPage,
  P,
  Steps,
  Strong,
  type LegalSection,
} from "@/components/marketing/legal"
import { pageMetadata } from "@/lib/seo"

export const metadata = pageMetadata({
  title: "Review Guide",
  description:
    "How to ask for reviews the right way — and turn more happy customers into written feedback.",
  path: "/review-guide",
})

const LAST_UPDATED = "September 10, 2026"

const SECTIONS: LegalSection[] = [
  {
    id: "ask-every-customer",
    title: "Ask Every Customer",
    body: (
      <>
        <P>
          The best approach is simple: give customers an equal opportunity to
          share their experience.
        </P>
        <P>
          You can ask customers for a review after they have purchased from you,
          used your service, completed an appointment, or otherwise had a
          genuine interaction with your business.
        </P>
        <P>
          Avoid selectively asking only customers you believe will leave a
          positive review.
        </P>
        <Example label="Good">
          <P>
            “We’d love to hear about your experience. If you have a moment,
            please leave us an honest review.”
          </P>
        </Example>
        <Example label="Avoid" tone="avoid">
          <P>“If you were happy with us, please leave a review.”</P>
        </Example>
        <P>
          The goal is to invite honest feedback — not to filter for positive
          feedback.
        </P>
      </>
    ),
  },
  {
    id: "right-time",
    title: "Ask at the Right Time",
    body: (
      <>
        <P>Timing can make a big difference.</P>
        <P>Good moments to request a review include:</P>
        <Bullets
          items={[
            "shortly after a purchase or service is completed;",
            "after a successful delivery;",
            "when a customer has had time to use your product;",
            "after resolving a customer’s issue; or",
            "when a customer voluntarily expresses satisfaction.",
          ]}
        />
        <P>
          Avoid repeatedly asking the same customer for a review within a short
          period.
        </P>
      </>
    ),
  },
  {
    id: "honest-review",
    title: "Ask for an Honest Review",
    body: (
      <>
        <P>Customers should be free to share their genuine experience.</P>
        <P>
          Your request should not tell customers what rating to give or what
          they should write.
        </P>
        <Example label="Good">
          <P>
            “How was your experience with us? We’d appreciate an honest review.”
          </P>
        </Example>
        <Example label="Avoid" tone="avoid">
          <P>“Please give us 5 stars and mention our excellent service.”</P>
        </Example>
      </>
    ),
  },
  {
    id: "no-rewards",
    title: "Don’t Offer Rewards for Positive Reviews",
    body: (
      <>
        <P>
          Do not offer discounts, refunds, gifts, cash, loyalty points, or other
          incentives in exchange for a positive review.
        </P>
        <P>
          If you choose to offer an incentive for feedback where permitted, it
          should not depend on the review being positive, negative, or
          containing particular content.
        </P>
        <P>For example:</P>
        <Example label="Not appropriate" tone="avoid">
          <P>“Leave us a 5-star review and get 10% off.”</P>
        </Example>
        <Example label="Better">
          <P>
            “Share your honest feedback and receive [incentive], regardless of
            whether your experience was positive or negative.”
          </P>
        </Example>
        <P>
          Always make sure any incentive program complies with the rules of the
          review platform you are using.
        </P>
      </>
    ),
  },
  {
    id: "no-pressure",
    title: "Don’t Pressure Customers",
    body: (
      <>
        <P>A review request should be an invitation, not an obligation.</P>
        <P>Avoid:</P>
        <Bullets
          items={[
            "repeatedly messaging customers who have declined;",
            "making customers feel guilty for not leaving a review;",
            "suggesting that a customer owes you a positive review;",
            "making a review a condition of receiving normal customer support; or",
            "asking customers to change or remove an honest negative review.",
          ]}
        />
        <P>A customer should be able to say no.</P>
      </>
    ),
  },
  {
    id: "no-written-reviews",
    title: "Don’t Write Reviews for Customers",
    body: (
      <>
        <P>
          Reviews should represent the customer’s own experience and opinions.
        </P>
        <P>Do not:</P>
        <Bullets
          items={[
            "create fake customer accounts;",
            "write reviews and publish them as if they came from customers;",
            "ask employees to pose as customers;",
            "submit reviews on behalf of customers without their involvement; or",
            "copy and reuse the same review across multiple customers.",
          ]}
        />
        <P>
          You can help a customer understand how to leave a review, but the
          final review should be their own.
        </P>
      </>
    ),
  },
  {
    id: "no-manipulation",
    title: "Don’t Manipulate Reviews",
    body: (
      <>
        <P>
          Avoid practices designed to artificially improve your rating or hide
          legitimate negative feedback.
        </P>
        <P>This includes:</P>
        <Bullets
          items={[
            "buying or selling reviews;",
            "posting fake reviews;",
            "removing or suppressing genuine negative feedback;",
            "asking only selected customers for reviews;",
            "coordinating groups to leave reviews;",
            "using multiple accounts to influence ratings; or",
            "editing customer feedback to change its meaning.",
          ]}
        />
        <P>Authentic negative feedback is part of having a real business.</P>
      </>
    ),
  },
  {
    id: "keep-it-simple",
    title: "Keep Review Requests Simple",
    body: (
      <>
        <P>
          Customers are more likely to respond when the request is clear and
          easy.
        </P>
        <P>A good review request can be as simple as:</P>
        <Example>
          <P>
            “Thanks for choosing us! We’d love to hear about your experience. If
            you have a moment, please share an honest review.”
          </P>
        </Example>
        <P>
          You can include a direct link to the appropriate review page to make
          the process easier.
        </P>
      </>
    ),
  },
  {
    id: "respond-professionally",
    title: "Respond to Reviews Professionally",
    body: (
      <>
        <P>
          Reviews are also an opportunity to demonstrate how you treat
          customers.
        </P>

        <Lead>For positive reviews</Lead>
        <P>Thank the customer and acknowledge their feedback.</P>
        <Example label="Good">
          <P>
            “Thank you for taking the time to share your experience. We’re glad
            we could help!”
          </P>
        </Example>

        <Lead>For negative reviews</Lead>
        <P>Stay professional and avoid arguments.</P>
        <P>A useful response can:</P>
        <Steps
          items={[
            "acknowledge the customer’s experience;",
            "apologize where appropriate;",
            "avoid sharing private customer information;",
            "explain what you can do to help; and",
            "move the conversation to a private channel when necessary.",
          ]}
        />
        <P>For example:</P>
        <Example label="Good">
          <P>
            “We’re sorry to hear that your experience wasn’t what you expected.
            We’d like to understand what happened and see how we can help.
            Please contact our support team with your order details.”
          </P>
        </Example>
        <P>
          Never threaten, insult, or retaliate against a customer for leaving a
          negative review.
        </P>
      </>
    ),
  },
  {
    id: "customer-privacy",
    title: "Protect Customer Privacy",
    body: (
      <>
        <P>
          Do not publicly disclose private customer information when responding
          to reviews.
        </P>
        <P>Avoid sharing:</P>
        <Bullets
          items={[
            "phone numbers;",
            "email addresses;",
            "order details;",
            "payment information;",
            "private conversations;",
            "personal circumstances; or",
            "other information that the customer has not made public.",
          ]}
        />
        <P>
          Even when responding to a legitimate complaint, keep your public
          response appropriately general.
        </P>
      </>
    ),
  },
  {
    id: "use-onloz-responsibly",
    title: "Use Onloz Responsibly",
    body: (
      <>
        <P>
          Onloz can help businesses make review collection easier, but the
          responsibility for how review requests are used remains with the
          business.
        </P>
        <P>When using Onloz:</P>
        <Bullets
          items={[
            "request reviews from genuine customers;",
            "give customers the opportunity to provide honest feedback;",
            "avoid deceptive or manipulative review practices;",
            "follow the policies of the review platform where the review will be published;",
            "respect customer privacy and applicable laws; and",
            "do not use Onloz to create or distribute fake reviews.",
          ]}
        />
      </>
    ),
  },
]

export default function ReviewGuidePage() {
  return (
    <LegalPage
      eyebrow="Resources · Review Guide"
      title="Review Guide"
      lastUpdated={LAST_UPDATED}
      intro={
        <>
          <P>
            Reviews help businesses build trust and help customers make better
            decisions. Onloz makes it easier to collect genuine feedback, but
            the way you ask for a review matters.
          </P>
          <P>
            This guide explains how to request reviews fairly, transparently,
            and without pressuring customers.
          </P>
        </>
      }
      sections={SECTIONS}
      noticeLabel="A simple rule to remember"
      notice={
        <>
          <P>
            <Strong>
              Ask everyone. Ask honestly. Ask at the right time. Don’t pressure.
            </Strong>
          </P>
          <P>
            The best review strategy isn’t about getting only positive reviews.
            It’s about making it easy for real customers to share real
            experiences.
          </P>
        </>
      }
    />
  )
}
