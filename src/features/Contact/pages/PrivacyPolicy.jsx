import { Link } from "react-router-dom";
import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";

const sections = [
  {
    number: "01",
    title: "The information we collect",
    paragraphs: [
      "We collect the details we need to run the store and help you with your orders. This may include your name, email address, phone number, delivery address, account details, order history, and the products you browse or buy.",
      "When you visit the website, we may also receive technical details such as your IP address, browser and device type, language, the page that referred you to us, and the pages you visit. We use this information in aggregate to understand how the site is used and improve it.",
    ],
  },
  {
    number: "02",
    title: "Payments and account security",
    paragraphs: [
      "Online payments are handled by our payment provider. Your card or banking details are transmitted directly to the payment provider and payment network; ELSE does not collect or store your full card or bank details.",
      "If you create an account, we use the information you provide to set it up and support your use of the site. Please keep your password private and contact us promptly if you think someone else has accessed your account.",
    ],
  },
  {
    number: "03",
    title: "Cookies and similar technology",
    paragraphs: [
      "Our site and its service providers may use cookies, pixels, tracking links, and similar tools to keep the website working, remember preferences, understand visits, measure promotions, and improve the shopping experience. Some tools may help us or our advertising partners show relevant ads.",
      "You can manage cookies through your browser settings. Blocking them may affect features such as keeping you signed in or remembering your preferences.",
    ],
  },
  {
    number: "04",
    title: "How we use information",
    paragraphs: [
      "We use your information to process orders and payments, arrange delivery, manage your account, respond to questions, issue refunds, prevent fraud, resolve problems, and keep our services safe. We may also use it to understand shopping trends, improve our products and website, and meet legal requirements.",
      "If you choose to hear from us, we may send product news, fragrance tips, surveys, or offers by email, text message, or phone. You can opt out of promotional messages using the unsubscribe option where available or by contacting us. We may still send messages needed to complete an order or respond to a request.",
    ],
  },
  {
    number: "05",
    title: "When information is shared",
    paragraphs: [
      "We do not sell or rent your personal information. We may share the information needed to do a job with trusted service providers, such as payment processors, couriers, order and website operators, hosting providers, analytics services, and customer support teams. They may use it only to provide their services to us and must handle it appropriately.",
      "We may share information with ELSE affiliates to operate our services, prevent fraud or misuse, or provide a service you request. If you choose to join a promotion run with another organisation, your information may also be handled under that organisation’s own privacy notice.",
      "We may disclose information when required by law or legal process, or when reasonably necessary to protect our customers, the public, our rights, or our property. If ELSE or its assets are part of a merger, acquisition, or business transfer, information may transfer as part of that transaction, subject to applicable protections.",
    ],
  },
  {
    number: "06",
    title: "Where information is processed",
    paragraphs: [
      "Some of our service providers may process or store information outside India. Where information is transferred, we expect the relevant providers to protect it in line with their obligations and applicable law.",
    ],
  },
  {
    number: "07",
    title: "Your choices and account details",
    paragraphs: [
      "You can ask us to access, correct, or delete personal information associated with you, subject to information we need to keep for orders, legal obligations, or legitimate business records. You can also opt out of promotional communication at any time.",
      "If something in your account or contact details is out of date, get in touch and we’ll help update it. To protect your account, we may need to verify your identity before acting on a request.",
    ],
  },
  {
    number: "08",
    title: "Children’s privacy",
    paragraphs: [
      "ELSE’s website and account services are intended for adults. We do not knowingly collect personal information from anyone under 18. If you believe a child has shared personal information with us, please contact us so we can review and address it.",
    ],
  },
  {
    number: "09",
    title: "Links to other websites",
    paragraphs: [
      "Our website may link to third-party sites. Those sites are outside our control and have their own content and privacy practices. Please review their policies before sharing information with them.",
    ],
  },
  {
    number: "10",
    title: "Changes to this policy",
    paragraphs: [
      "We may update this policy as our services or practices change. The latest version will be posted here. If a change significantly affects how we handle information, we’ll take additional steps to bring it to your attention where appropriate.",
    ],
  },
];

function PrivacyPolicy() {
  return (
    <main className="bg-[radial-gradient(ellipse_at_50%_0%,rgba(220,202,174,.16),transparent_44%),#faf9f6] px-5 py-5 pb-[88px] text-[#292521] sm:px-6">
      <div className="mx-auto w-full max-w-[980px]">
        <nav aria-label="Breadcrumb" className="flex items-center gap-[11px] text-[12px] text-[#948b81]">
          <Link to="/" className="text-[#5e574f] no-underline">Home</Link><span>/</span><span>Privacy policy</span>
        </nav>

        <header className="mx-auto mt-[47px] max-w-[720px] text-center sm:mt-[61px]">
          <p className="m-0 flex items-center justify-center gap-[10px] text-[10px] font-bold tracking-[.19em] text-[#997b58]"><span className="h-px w-[19px] bg-[#b99d7a]" />YOUR PRIVACY, TREATED WITH CARE<span className="h-px w-[19px] bg-[#b99d7a]" /></p>
          <h1 className="mt-[17px] font-serif text-[clamp(2.55rem,6vw,4.6rem)] font-normal leading-[1.03] tracking-[-.055em] text-[#25211e]">Privacy policy</h1>
          <p className="mx-auto mt-[18px] max-w-[590px] text-[15px] leading-[1.75] text-[#6c655e]">Your information helps us get your order to you and make your experience with ELSE a little better. This page explains what we collect, how we use it, and the choices you have.</p>
        </header>

        <section aria-label="Privacy overview" className="mx-auto mt-[34px] flex max-w-[840px] flex-wrap border border-[#e8e1d8] bg-white/40 sm:mt-[47px]">
          <div className="flex min-h-[82px] flex-[1_1_240px] items-center gap-3 px-5 py-4">
            <span className="grid h-9 w-9 flex-none place-items-center text-[#8c7356]"><ShieldCheck size={19} strokeWidth={1.5} /></span>
            <span className="grid gap-1"><small className="text-[9px] font-bold uppercase tracking-[.11em] text-[#91877d]">Our approach</small><strong className="text-[13px] font-medium text-[#38332e]">Use only what helps serve you</strong></span>
          </div>
          <div className="flex min-h-[82px] flex-[1_1_240px] items-center gap-3 border-t border-[#e8e1d8] px-5 py-4 sm:border-l sm:border-t-0">
            <span className="grid h-9 w-9 flex-none place-items-center text-[#8c7356]"><LockKeyhole size={19} strokeWidth={1.5} /></span>
            <span className="grid gap-1"><small className="text-[9px] font-bold uppercase tracking-[.11em] text-[#91877d]">Your choices</small><strong className="text-[13px] font-medium text-[#38332e]">Access, update, or ask us to delete</strong></span>
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

        <section className="mx-auto mt-7 max-w-[740px] border-t border-[#e8e1d8] pt-6 text-center">
          <p className="text-[13px] leading-[1.7] text-[#756e66]">For privacy questions, information requests, or to update your details, write to <a href="mailto:hello@else.in" className="text-[#8e2330] underline-offset-4">hello@else.in</a> or call <a href="tel:+919876543210" className="text-[#8e2330] underline-offset-4">+91 98765 43210</a>.</p>
          <Link to="/contact" className="mt-2 inline-flex items-center gap-1 text-[12px] text-[#8e2330] underline-offset-4">Contact ELSE <ArrowRight size={14} /></Link>
        </section>
      </div>
    </main>
  );
}

export default PrivacyPolicy;
