import { Link } from "react-router-dom";
import { ArrowRight, CircleHelp, RotateCcw, Wallet } from "lucide-react";

const sections = [
  {
    number: "01",
    title: "A note about returns",
    paragraphs: [
      "We want you to feel good about every ELSE order. Because our fragrances are personal care products, we can’t accept returns of items that have been opened or used. If something arrives damaged, leaking, broken, missing, or different from what you ordered, please contact us so we can review it.",
      "Damage caused after delivery, careless storage, or use that doesn’t follow the product directions isn’t covered. Everyone’s skin and sensitivities are different, so please follow any patch-test guidance on the product. Reactions related to an individual sensitivity aren’t eligible for a refund.",
    ],
  },
  {
    number: "02",
    title: "If your order arrives with an issue",
    paragraphs: [
      "Please contact our customer care team within 48 hours of delivery if an item is missing, leaking, broken, or incorrect. To help us assess the issue, an unboxing video showing the original packaging is required, along with clear photos or videos of the item and parcel.",
      "If the parcel looks tampered with, damaged, or defective when the delivery partner hands it over, please refuse the delivery and let us know.",
      "If your order is marked delivered but hasn’t reached you, contact us within 3 days of the delivery notification. We’re unable to review non-receipt claims reported after that period.",
    ],
  },
  {
    number: "03",
    title: "How refunds work",
    paragraphs: [
      "Email hello@else.in or call +91 98765 43210 with your order number and the photos or videos that support your claim. Use the subject line “Refund for [order number]”. Our team will review the details and let you know if the claim is approved.",
      "If approved, refunds for prepaid orders are sent to the original payment method and may take up to 10 days from approval to appear. Cash-on-delivery refunds are sent to the bank account you share with our team and are usually initiated within 4–7 working days.",
      "Delivery charges aren’t refundable. Once your refund has been initiated, we’ll share the transaction details with you.",
    ],
  },
  {
    number: "04",
    title: "Cancelling an order",
    paragraphs: [
      "Orders can be cancelled only before they leave our warehouse. If you’ve placed an order by mistake, you can cancel it from the order confirmation page within the first few hours, while cancellation is still available.",
      "For an accepted cancellation, prepaid orders are refunded to the original payment method within 10 days. For cash-on-delivery orders, we’ll send the refund to the bank account you share with customer care, usually within 4–7 working days.",
    ],
  },
];

const faqs = [
  {
    question: "How long does a refund take after it’s approved?",
    answer: "Prepaid refunds can take up to 10 days to reach the original payment method. Cash-on-delivery refunds are usually initiated within 4–7 working days after acceptance. We’ll share the transaction details once the refund has been initiated.",
  },
  {
    question: "Can I return a fragrance I’ve opened or used?",
    answer: "Opened or used products can’t be returned. If your order arrived leaking, broken, missing an item, or with the wrong product, contact us within 48 hours with the required unboxing video and supporting images so we can review it.",
  },
  {
    question: "I ordered by mistake. Can I cancel it?",
    answer: "You can cancel from the order confirmation page within the first few hours, as long as the order hasn’t been dispatched. For help, contact us at hello@else.in.",
  },
];

function RefundPolicy() {
  return (
    <main className="bg-[radial-gradient(ellipse_at_50%_0%,rgba(220,202,174,.16),transparent_44%),#faf9f6] px-5 py-5 pb-[88px] text-[#292521] sm:px-6">
      <div className="mx-auto w-full max-w-[980px]">
        <nav aria-label="Breadcrumb" className="flex items-center gap-[11px] text-[12px] text-[#948b81]">
          <Link to="/" className="text-[#5e574f] no-underline">Home</Link><span>/</span><span>Returns &amp; refunds</span>
        </nav>

        <header className="mx-auto mt-[47px] max-w-[700px] text-center sm:mt-[61px]">
          <p className="m-0 flex items-center justify-center gap-[10px] text-[10px] font-bold tracking-[.19em] text-[#997b58]"><span className="h-px w-[19px] bg-[#b99d7a]" />A LITTLE CLARITY, BEFORE YOU ORDER<span className="h-px w-[19px] bg-[#b99d7a]" /></p>
          <h1 className="mt-[17px] font-serif text-[clamp(2.55rem,6vw,4.6rem)] font-normal leading-[1.03] tracking-[-.055em] text-[#25211e]">Returns &amp; refunds</h1>
          <p className="mx-auto mt-[18px] max-w-[580px] text-[15px] leading-[1.75] text-[#6c655e]">We want every ELSE order to arrive just as it should. Here’s how we handle returns, refunds, and cancellations if something goes wrong.</p>
        </header>

        <section aria-label="Policy highlights" className="mx-auto mt-[34px] flex max-w-[840px] flex-wrap border border-[#e8e1d8] bg-white/40 sm:mt-[47px]">
          <div className="flex min-h-[82px] flex-[1_1_220px] items-center gap-3 px-5 py-4">
            <span className="grid h-9 w-9 flex-none place-items-center text-[#8c7356]"><RotateCcw size={19} strokeWidth={1.5} /></span>
            <span className="grid gap-1"><small className="text-[9px] font-bold uppercase tracking-[.11em] text-[#91877d]">Report an order issue</small><strong className="text-[13px] font-medium text-[#38332e]">Within 48 hours</strong></span>
          </div>
          <div className="flex min-h-[82px] flex-[1_1_220px] items-center gap-3 border-t border-[#e8e1d8] px-5 py-4 sm:border-l sm:border-t-0">
            <span className="grid h-9 w-9 flex-none place-items-center text-[#8c7356]"><Wallet size={19} strokeWidth={1.5} /></span>
            <span className="grid gap-1"><small className="text-[9px] font-bold uppercase tracking-[.11em] text-[#91877d]">Prepaid refunds</small><strong className="text-[13px] font-medium text-[#38332e]">Up to 10 days after approval</strong></span>
          </div>
        </section>

        <div className="mx-auto mt-8 w-full max-w-[740px] sm:mt-[47px]">
          {sections.map(({ number, title, paragraphs }) => (
            <section key={number} className="grid grid-cols-[40px_minmax(0,1fr)] gap-[17px] border-t border-[#e8e1d8] py-[23px] pb-[25px] max-sm:grid-cols-[27px_minmax(0,1fr)] max-sm:gap-[10px] max-sm:py-5">
              <p className="mt-1 font-serif text-[15px] text-[#a78b68]">{number}</p>
              <div>
                <h2 className="m-0 font-serif text-[23px] font-medium tracking-[-.02em] text-[#292521] max-sm:text-[21px]">{title}</h2>
                {paragraphs.map((paragraph) => <p key={paragraph} className="mt-[9px] text-[14px] leading-[1.8] text-[#756e66] max-sm:text-[13px]">{paragraph}</p>)}
              </div>
            </section>
          ))}
        </div>

        <section aria-labelledby="refund-faq-heading" className="mx-auto mt-8 w-full max-w-[740px] border-t border-[#e8e1d8] pt-8 sm:mt-10">
          <div className="mb-5 flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-[#d7c9b6] text-[#896d4d]"><CircleHelp size={18} strokeWidth={1.5} /></span>
            <h2 id="refund-faq-heading" className="m-0 font-serif text-[26px] font-medium text-[#292521]">A few common questions</h2>
          </div>
          <div className="divide-y divide-[#e8e1d8] border-y border-[#e8e1d8]">
            {faqs.map(({ question, answer }) => (
              <article key={question} className="py-5">
                <h3 className="m-0 text-[14px] font-semibold text-[#38332e]">{question}</h3>
                <p className="mb-0 mt-2 text-[13px] leading-[1.75] text-[#756e66]">{answer}</p>
              </article>
            ))}
          </div>
        </section>

        <p className="mx-auto mt-7 flex flex-wrap items-center justify-center gap-2 text-center text-[12px] text-[#837b72]">Need help with an order? <Link to="/contact" className="inline-flex items-center gap-1 text-[#8e2330] underline-offset-4">Talk to our team <ArrowRight size={14} /></Link></p>
      </div>
    </main>
  );
}

export default RefundPolicy;
