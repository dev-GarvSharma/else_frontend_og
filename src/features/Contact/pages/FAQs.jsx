import { Link } from "react-router-dom";
import { ArrowRight, CircleHelp, PackageCheck, RotateCcw, ShoppingBag } from "lucide-react";

const faqGroups = [
  {
    title: "Orders & delivery",
    icon: PackageCheck,
    questions: [
      {
        question: "How long does delivery take?",
        answer: "We deliver across India. Most orders arrive within 3–7 business days after confirmation. Deliveries are scheduled between 9:00 AM and 8:00 PM, Monday to Sunday, and a signature is required at the door.",
      },
      {
        question: "What are the shipping charges?",
        answer: "Orders above ₹399 ship free. Orders below ₹399 have a ₹99 shipping fee. Any applicable shipping or handling charges are shown at checkout before you pay.",
      },
      {
        question: "Can someone else receive my parcel?",
        answer: "Yes. If you’re unavailable, a family member, colleague, or neighbour can sign for the delivery on your behalf. Once they accept and sign for the parcel, responsibility for it passes to the recipient.",
      },
      {
        question: "My order is marked delivered, but I can’t find it. What should I do?",
        answer: "Please check with people at your address or nearby who may have accepted it, then contact us as soon as possible. For orders marked delivered but not received, our policy asks you to get in touch within 3 days of the delivery update.",
      },
    ],
  },
  {
    title: "Returns & refunds",
    icon: RotateCcw,
    questions: [
      {
        question: "Can I return a product I’ve opened or used?",
        answer: "We’re unable to accept returns of opened or used products. If an item arrives damaged, leaking, broken, missing, or incorrect, contact our team within 48 hours of delivery so we can review it.",
      },
      {
        question: "What should I send if my order is damaged or incomplete?",
        answer: "Please share your order number, clear photos or videos of the parcel and product, and an unboxing video showing the original packaging. If the package looks tampered with or damaged when it arrives, refuse it with the delivery partner and let us know.",
      },
      {
        question: "How long does a refund take?",
        answer: "Once approved, a prepaid refund may take up to 10 days to reach the original payment method. Cash-on-delivery refunds are sent to the bank account you provide and are usually initiated within 4–7 working days. Delivery charges are non-refundable.",
      },
      {
        question: "Can I cancel my order?",
        answer: "Orders can be cancelled only before dispatch. If you placed the order by mistake, check the order confirmation page within the first few hours to see whether cancellation is still available. For accepted cancellations, prepaid refunds go to the original payment method within 10 days.",
      },
    ],
  },
  {
    title: "Products & account",
    icon: ShoppingBag,
    questions: [
      {
        question: "How should I check whether a fragrance is right for me?",
        answer: "Take a look at the product details and ingredients before ordering, especially if you have known sensitivities. Follow any patch-test and usage guidance provided with the product. Reactions related to personal sensitivities aren’t covered by the refund policy.",
      },
      {
        question: "How do I sign in to my account?",
        answer: "Choose the account or sign-in option and enter your phone number. We’ll send a verification code to confirm it’s you. Keep your account details current so you can see your orders and manage your saved addresses.",
      },
      {
        question: "How can I get help with an order?",
        answer: "Write to hello@else.in or call +91 98765 43210. Include your order number and, if you’re reporting a delivery issue, the photos or video that help explain what happened.",
      },
    ],
  },
];

function FAQs() {
  return (
    <main className="bg-[radial-gradient(ellipse_at_50%_0%,rgba(220,202,174,.16),transparent_44%),#faf9f6] px-5 py-5 pb-[88px] text-[#292521] sm:px-6">
      <div className="mx-auto w-full max-w-[1040px]">
        <nav aria-label="Breadcrumb" className="flex items-center gap-[11px] text-[12px] text-[#948b81]">
          <Link to="/" className="text-[#5e574f] no-underline">Home</Link><span>/</span><span>FAQs</span>
        </nav>

        <header className="mx-auto mt-[47px] max-w-[720px] text-center sm:mt-[61px]">
          <p className="m-0 flex items-center justify-center gap-[10px] text-[10px] font-bold tracking-[.19em] text-[#997b58]"><span className="h-px w-[19px] bg-[#b99d7a]" />HERE TO HELP<span className="h-px w-[19px] bg-[#b99d7a]" /></p>
          <h1 className="mt-[17px] font-serif text-[clamp(2.55rem,6vw,4.6rem)] font-normal leading-[1.03] tracking-[-.055em] text-[#25211e]">Frequently asked questions</h1>
          <p className="mx-auto mt-[18px] max-w-[590px] text-[15px] leading-[1.75] text-[#6c655e]">A few helpful answers about shopping ELSE, receiving your order, and what to do if something isn’t quite right.</p>
        </header>

        <div className="mx-auto mt-8 w-full max-w-[800px] space-y-9 sm:mt-[47px]">
          {faqGroups.map(({ title, icon: Icon, questions }) => (
            <section key={title} aria-labelledby={`faq-${title.toLowerCase().replaceAll(" ", "-")}`}>
              <div className="mb-4 flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-full border border-[#d7c9b6] text-[#896d4d]"><Icon size={18} strokeWidth={1.5} /></span>
                <h2 id={`faq-${title.toLowerCase().replaceAll(" ", "-")}`} className="m-0 font-serif text-[25px] font-medium text-[#292521]">{title}</h2>
              </div>
              <div className="divide-y divide-[#e8e1d8] border-y border-[#e8e1d8]">
                {questions.map(({ question, answer }) => (
                  <details key={question} className="group py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[14px] font-semibold text-[#38332e] marker:content-none [&::-webkit-details-marker]:hidden">
                      {question}
                      <span aria-hidden="true" className="grid h-6 w-6 flex-none place-items-center rounded-full border border-[#d8d0c7] text-[17px] font-normal text-[#8c7356] transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mb-0 mt-3 pr-8 text-[13px] leading-[1.8] text-[#756e66]">{answer}</p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mx-auto mt-10 flex max-w-[800px] flex-wrap items-center justify-between gap-4 border border-[#e7ded1] bg-gradient-to-r from-[#f3eee5] to-[#f8f5ef] px-5 py-5 sm:px-7">
          <div>
            <p className="mb-1 text-[9px] font-bold uppercase tracking-[.16em] text-[#997b58]">Still need a hand?</p>
            <h2 className="font-serif text-[21px] font-medium text-[#302923]">We’re happy to help.</h2>
            <p className="mt-1 text-[13px] text-[#756e66]">Get in touch and include your order number if you have one.</p>
          </div>
          <Link to="/contact" className="inline-flex min-h-[42px] items-center justify-center gap-3 bg-[#292521] px-4 text-[12px] text-white no-underline transition-colors hover:bg-[#8e2330]">Contact ELSE <ArrowRight size={15} /></Link>
        </section>

        <p className="mx-auto mt-5 text-center text-[11px] text-[#837b72]">For full details, see our <Link to="/shipping-policy" className="text-[#5e574f] underline-offset-4">shipping</Link> and <Link to="/refund-policy" className="text-[#5e574f] underline-offset-4">returns &amp; refunds</Link> policies.</p>
      </div>
    </main>
  );
}

export default FAQs;
