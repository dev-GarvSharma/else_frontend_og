import { Link } from "react-router-dom";
import { ArrowRight, FileText, Scale } from "lucide-react";

const termsSections = [
  {
    number: "01",
    title: "About these terms",
    paragraphs: [
      "These Terms of Service apply when you visit or shop through the ELSE website. Please read them before placing an order. By using the site or purchasing a product, you agree to these terms and the policies linked from our website.",
      "This page is an electronic record under the Information Technology Act, 2000 and the rules made under it. It is created electronically and does not need a physical or digital signature. We may update these terms by posting a revised version here. Changes take effect when posted, and continued use of the website means you accept the updated terms.",
    ],
  },
  {
    number: "02",
    title: "Who can use ELSE",
    paragraphs: [
      "You must be legally able to enter into a contract under the Indian Contract Act, 1872 to place an order. If you are under 18, you may use the website only with the involvement of a parent or legal guardian.",
    ],
  },
  {
    number: "03",
    title: "Your account and communications",
    paragraphs: [
      "Please keep your account details accurate and protect your sign-in information. You are responsible for activity carried out through your account. We may suspend or close an account if its details appear inaccurate or activity seems suspicious.",
      "By using the website, you agree that we may contact you electronically about your account, orders, and our services. Where we provide an option to opt out of non-essential communications, you can use it at any time.",
    ],
  },
  {
    number: "04",
    title: "Products, orders, and payment",
    paragraphs: [
      "Products sold through ELSE are for personal use. Reselling them is not permitted. Browsing the website is free; when you place an order, you are responsible for the product price, applicable taxes, and any delivery charges shown at checkout. Failure to pay amounts due may result in order or account restrictions and, where applicable, further action.",
      "If there is a problem with a delivery, please contact our customer care team promptly and follow the steps in our Returns & Refunds policy. That policy explains the reporting timeframes and information needed to review a claim.",
    ],
  },
  {
    number: "05",
    title: "Using the website responsibly",
    paragraphs: [
      "Please use the website lawfully and respectfully. You must not post unlawful material, violate anyone’s intellectual property rights, copy or misuse our content, misrepresent ELSE on social media, or use our name or branding in a misleading way.",
    ],
  },
  {
    number: "06",
    title: "Website information and third-party services",
    paragraphs: [
      "We work to keep website information useful and current, but we can’t promise that every piece of content will always be accurate, complete, or available without interruption. Our website may rely on third-party service providers, including providers that process or store information outside India. Their services are subject to their own systems and practices.",
      "We take reasonable care with our website, but cannot guarantee that online services will be free from every security threat or interruption. To the extent permitted by law, ELSE and its affiliates, service providers, and technology partners are not responsible for indirect or consequential losses, including loss of profit or data, arising from use of the website.",
    ],
  },
  {
    number: "07",
    title: "Product care and fragrance sensitivity",
    paragraphs: [
      "Please read the product information and ingredient list before use, especially if you have known sensitivities. Follow any usage and patch-test guidance provided with the product. Individual reactions can vary, and ELSE cannot take responsibility for reactions related to a personal sensitivity, or for harm caused by misuse or failure to follow product directions.",
    ],
  },
  {
    number: "08",
    title: "Your responsibility to ELSE",
    paragraphs: [
      "If your breach of these terms or misuse of the website results in a claim or loss for ELSE or its affiliates, you agree to be responsible for that claim or loss, to the extent permitted by law.",
    ],
  },
  {
    number: "09",
    title: "Questions, complaints, and intellectual property concerns",
    paragraphs: [
      "If you have a concern about an order or these terms, please contact us and we’ll try to resolve it with you. If you believe content on our website infringes your intellectual property rights, email hello@else.in with details of the material and your claim. We may take appropriate steps to review and address the report.",
    ],
  },
  {
    number: "10",
    title: "Governing law and other terms",
    paragraphs: [
      "These terms are governed by the laws of India. Courts in Gurgaon, India will have exclusive jurisdiction over disputes relating to this agreement.",
      "Nothing in these terms creates a partnership or agency between you and ELSE. If a court finds one part of these terms unenforceable, the remaining parts will continue to apply. These terms do not limit any rights you may have under applicable law.",
    ],
  },
];

function TermsAndConditions() {
  return (
    <main className="bg-[radial-gradient(ellipse_at_50%_0%,rgba(220,202,174,.16),transparent_44%),#faf9f6] px-5 py-5 pb-[88px] text-[#292521] sm:px-6">
      <div className="mx-auto w-full max-w-[980px]">
        <nav aria-label="Breadcrumb" className="flex items-center gap-[11px] text-[12px] text-[#948b81]">
          <Link to="/" className="text-[#5e574f] no-underline">Home</Link><span>/</span><span>Terms &amp; conditions</span>
        </nav>

        <header className="mx-auto mt-[47px] max-w-[720px] text-center sm:mt-[61px]">
          <p className="m-0 flex items-center justify-center gap-[10px] text-[10px] font-bold tracking-[.19em] text-[#997b58]"><span className="h-px w-[19px] bg-[#b99d7a]" />A CLEAR WAY TO SHOP<span className="h-px w-[19px] bg-[#b99d7a]" /></p>
          <h1 className="mt-[17px] font-serif text-[clamp(2.55rem,6vw,4.6rem)] font-normal leading-[1.03] tracking-[-.055em] text-[#25211e]">Terms &amp; conditions</h1>
          <p className="mx-auto mt-[18px] max-w-[590px] text-[15px] leading-[1.75] text-[#6c655e]">These terms explain how you can use ELSE online and what to expect when you shop with us.</p>
        </header>

        <section aria-label="Terms overview" className="mx-auto mt-[34px] flex max-w-[840px] flex-wrap border border-[#e8e1d8] bg-white/40 sm:mt-[47px]">
          <div className="flex min-h-[82px] flex-[1_1_240px] items-center gap-3 px-5 py-4">
            <span className="grid h-9 w-9 flex-none place-items-center text-[#8c7356]"><FileText size={19} strokeWidth={1.5} /></span>
            <span className="grid gap-1"><small className="text-[9px] font-bold uppercase tracking-[.11em] text-[#91877d]">Applies to</small><strong className="text-[13px] font-medium text-[#38332e]">ELSE website and orders</strong></span>
          </div>
          <div className="flex min-h-[82px] flex-[1_1_240px] items-center gap-3 border-t border-[#e8e1d8] px-5 py-4 sm:border-l sm:border-t-0">
            <span className="grid h-9 w-9 flex-none place-items-center text-[#8c7356]"><Scale size={19} strokeWidth={1.5} /></span>
            <span className="grid gap-1"><small className="text-[9px] font-bold uppercase tracking-[.11em] text-[#91877d]">Governing law</small><strong className="text-[13px] font-medium text-[#38332e]">India</strong></span>
          </div>
        </section>

        <div className="mx-auto mt-8 w-full max-w-[740px] sm:mt-[47px]">
          {termsSections.map(({ number, title, paragraphs }) => (
            <section key={number} className="grid grid-cols-[40px_minmax(0,1fr)] gap-[17px] border-t border-[#e8e1d8] py-[23px] pb-[25px] max-sm:grid-cols-[27px_minmax(0,1fr)] max-sm:gap-[10px] max-sm:py-5">
              <p className="mt-1 font-serif text-[15px] text-[#a78b68]">{number}</p>
              <div>
                <h2 className="m-0 font-serif text-[23px] font-medium tracking-[-.02em] text-[#292521] max-sm:text-[21px]">{title}</h2>
                {paragraphs.map((paragraph) => <p key={paragraph} className="mt-[9px] text-[14px] leading-[1.8] text-[#756e66] max-sm:text-[13px]">{paragraph}</p>)}
              </div>
            </section>
          ))}
        </div>

        <p className="mx-auto mt-7 flex flex-wrap items-center justify-center gap-2 text-center text-[12px] text-[#837b72]">Need help? <Link to="/contact" className="inline-flex items-center gap-1 text-[#8e2330] underline-offset-4">Contact our team <ArrowRight size={14} /></Link></p>
      </div>
    </main>
  );
}

export default TermsAndConditions;
