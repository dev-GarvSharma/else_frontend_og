import { Link } from "react-router-dom";
import { ArrowRight, Clock3, MapPin, PackageCheck, Truck } from "lucide-react";

const deliveryHighlights = [
  { icon: MapPin, label: "Where we deliver", value: "Across India" },
  { icon: Clock3, label: "Estimated delivery", value: "3–7 business days" },
  { icon: PackageCheck, label: "Ships from", value: "Gurgaon, Haryana" },
];
const sectionClass = "grid grid-cols-[40px_minmax(0,1fr)] gap-[17px] border-t border-[#e8e1d8] py-[23px] pb-[25px] max-sm:grid-cols-[27px_minmax(0,1fr)] max-sm:gap-[10px] max-sm:py-5";
const numberClass = "mt-1 font-serif text-[15px] text-[#a78b68]";
const sectionTitleClass = "m-0 font-serif text-[23px] font-medium tracking-[-.02em] text-[#292521] max-sm:text-[21px]";
const paragraphClass = "mt-[9px] text-[14px] leading-[1.8] text-[#756e66] max-sm:text-[13px]";

function ShippingPolicy() {
  return (
    <main className="bg-[radial-gradient(ellipse_at_50%_0%,rgba(220,202,174,.16),transparent_44%),#faf9f6] px-5 py-5 pb-[88px] text-[#292521] sm:px-6">
      <div className="mx-auto w-full max-w-[980px]">
        <nav aria-label="Breadcrumb" className="flex items-center gap-[11px] text-[12px] text-[#948b81]">
          <Link to="/" className="text-[#5e574f] no-underline">Home</Link><span>/</span><span>Shipping policy</span>
        </nav>

        <header className="mx-auto mt-[47px] max-w-[690px] text-center sm:mt-[61px]">
          <p className="m-0 flex items-center justify-center gap-[10px] text-[10px] font-bold tracking-[.19em] text-[#997b58]"><span className="h-px w-[19px] bg-[#b99d7a]" />THE JOURNEY TO YOUR DOOR<span className="h-px w-[19px] bg-[#b99d7a]" /></p>
          <h1 className="mt-[17px] text-[clamp(2.55rem,6vw,4.6rem)] font-normal leading-[1.03] tracking-[-.055em] text-[#25211e]">Shipping, made simple.</h1>
          <p className="mx-auto mt-[18px] max-w-[540px] text-[15px] leading-[1.75] text-[#6c655e]">From our fragrance studio to your doorstep, here’s what to expect when you order from ELSE.</p>
        </header>

        <section aria-label="Shipping offer" className="mx-auto mt-[34px] flex items-start gap-[14px] border border-[#e7ded1] bg-gradient-to-r from-[#f3eee5] to-[#f8f5ef] p-5 sm:mt-[47px] sm:items-center sm:gap-5 sm:px-[30px] sm:py-[25px]">
          <div className="grid h-10 w-10 flex-[0_0_40px] place-items-center rounded-full border border-[#d7c9b6] text-[#896d4d] sm:h-12 sm:w-12 sm:basis-12"><Truck size={23} strokeWidth={1.5} /></div>
          <div>
            <p className="mb-1 text-[9px] font-bold uppercase tracking-[.16em] text-[#997b58]">A little something on us</p>
            <h2 className="font-serif text-[clamp(20px,3vw,26px)] font-medium text-[#302923]">Free shipping on orders above ₹399</h2>
            <p className="mt-[5px] text-[13px] leading-[1.6] text-[#756e66]">For orders below ₹399, a flat ₹99 shipping fee applies.</p>
          </div>
        </section>

        <section aria-label="Delivery at a glance" className="mt-[17px] flex flex-wrap border border-[#e8e1d8] bg-white/40">
          {deliveryHighlights.map(({ icon: Icon, label, value }, index) => (
            <div key={label} className={`flex min-h-[76px] flex-[1_1_190px] items-center gap-3 px-4 py-3 sm:px-5 ${index ? "border-l border-[#e8e1d8]" : ""}`}>
              <span className="grid h-[34px] w-[34px] flex-[0_0_34px] place-items-center text-[#8c7356]"><Icon size={18} strokeWidth={1.5} /></span>
              <span className="grid gap-[5px]"><small className="text-[9px] font-bold uppercase tracking-[.11em] text-[#91877d]">{label}</small><strong className="text-[13px] font-medium text-[#38332e]">{value}</strong></span>
            </div>
          ))}
        </section>

        <div className="mx-auto mt-8 w-full max-w-[740px] sm:mt-[47px]">
          <section className={sectionClass}>
            <p className={numberClass}>01</p>
            <div><h2 className={sectionTitleClass}>When will my order arrive?</h2>
              <p className={paragraphClass}>We ship your order by courier from our warehouse in Gurgaon, Haryana. Once your order is confirmed, please allow 3–7 business days for delivery anywhere in India.</p>
            </div>
          </section>
          <section className={sectionClass}>
            <p className={numberClass}>02</p>
            <div><h2 className={sectionTitleClass}>Being there for delivery</h2>
              <p className={paragraphClass}>Deliveries are made between 9:00 AM and 8:00 PM, Monday through Sunday. We’ll need a signature when your parcel arrives. If you can’t be there, someone you trust—like a family member, colleague, or neighbour—can receive it for you.</p>
              <p className={paragraphClass}>Once an alternate recipient has signed for the parcel, ELSE can’t take responsibility for it. We’re also unable to cover damage that happens after delivery.</p>
            </div>
          </section>
          <section className={sectionClass}>
            <p className={numberClass}>03</p>
            <div><h2 className={sectionTitleClass}>Something missing or damaged?</h2>
              <p className={paragraphClass}>Please let our customer service team know on the day your order is delivered, so we can look into any shortage or damage promptly.</p>
              <Link to="/contact" className="mt-3 inline-flex items-center gap-2 text-[13px] text-[#8e2330] no-underline">Get in touch with us <ArrowRight size={15} /></Link>
            </div>
          </section>
          <section className={sectionClass}>
            <p className={numberClass}>04</p>
            <div><h2 className={sectionTitleClass}>Shipping charges</h2>
              <p className={paragraphClass}>Any applicable shipping and handling fees can depend on the item and its packaging, size, or other delivery requirements. You’ll always see the final charge at checkout before you pay.</p>
            </div>
          </section>
        </div>

        <p className="mx-auto mt-[18px] text-center text-[12px] text-[#837b72]">Have a question about an order? <Link to="/contact" className="text-[#5e574f] underline-offset-[3px]">We’re happy to help.</Link></p>
      </div>
    </main>
  );
}

export default ShippingPolicy;
