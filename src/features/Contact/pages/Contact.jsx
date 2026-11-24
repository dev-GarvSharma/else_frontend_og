import { useState } from "react";
import { ArrowUpRight, Clock3, Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { sendContactMessage } from "../api";

const initialForm = { name: "", email: "", phone: "", subject: "", message: "" };
const fieldClass = "w-full border-0 border-b border-[#d9d3ca] bg-transparent px-0 py-3 text-[14px] text-[#292521] outline-none transition-colors placeholder:text-[#999189] focus:border-[#8e2330]";
const labelClass = "grid flex-1 basis-[180px] gap-[3px] text-[12px] font-semibold text-[#524b44]";
const detailClass = "flex min-h-[62px] items-center gap-[13px] border-b border-[#e8e1d8] text-[#292521] no-underline";
const iconClass = "grid h-[30px] w-[30px] flex-[0_0_30px] place-items-center text-[#8c7356]";
const detailTextClass = "grid gap-[5px]";
const detailLabelClass = "text-[9px] font-bold tracking-[.13em] text-[#91877d]";
const detailValueClass = "text-[13px] font-medium text-[#38332e]";

function Contact() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSending, setIsSending] = useState(false);

  const updateField = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    if (status.message) setStatus({ type: "", message: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSending(true);
    setStatus({ type: "", message: "" });
    try {
      const result = await sendContactMessage(form);
      if (!result?.success) throw new Error(result?.message || "Your message could not be sent. Please try again.");
      setForm(initialForm);
      setStatus({ type: "success", message: "Thank you for getting in touch. Our team will be with you shortly." });
    } catch (error) {
      setStatus({ type: "error", message: error.message || "Something went wrong. Please try again." });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="bg-[#faf9f6] px-5 py-[18px] pb-[72px] text-[#292521] sm:px-6">
      <div className="mx-auto w-full max-w-[1040px]">
        <nav aria-label="Breadcrumb" className="flex items-center gap-[11px] text-[12px] text-[#948b81]">
          <Link to="/" className="text-[#5e574f] no-underline">Home</Link><span>/</span><span>Contact</span>
        </nav>

        <div className="mt-6 flex flex-wrap items-start gap-[clamp(32px,6vw,72px)]">
          <section aria-labelledby="contact-details-heading" className="flex-[0.8_1_300px] py-[14px]">
            <header className="mb-[22px] max-w-[520px]">
              <h1 id="contact-details-heading" className="m-0 font-serif text-[clamp(2rem,3.5vw,2.7rem)] leading-[1.12] tracking-[-.035em] text-[#25211e]">We’d love to hear from you</h1>
              <p className="mt-[13px] text-[14px] leading-[1.65] text-[#6c655e]">Questions about a fragrance, an order, or finding your next signature scent? Our team is here to help.</p>
            </header>

            <div className="border-t border-[#e8e1d8]">
              <a href="mailto:hello@else.in" className={detailClass}>
                <span className={iconClass}><Mail size={18} strokeWidth={1.5} /></span>
                <span className={detailTextClass}><small className={detailLabelClass}>EMAIL</small><strong className={detailValueClass}>hello@else.in</strong></span>
                <ArrowUpRight size={16} strokeWidth={1.5} className="ml-auto text-[#968c81]" />
              </a>
              <a href="tel:+919876543210" className={detailClass}>
                <span className={iconClass}><Phone size={18} strokeWidth={1.5} /></span>
                <span className={detailTextClass}><small className={detailLabelClass}>CALL US</small><strong className={detailValueClass}>+91 98765 43210</strong></span>
                <ArrowUpRight size={16} strokeWidth={1.5} className="ml-auto text-[#968c81]" />
              </a>
              <div className={detailClass}>
                <span className={iconClass}><Clock3 size={18} strokeWidth={1.5} /></span>
                <span className={detailTextClass}><small className={detailLabelClass}>WHEN WE’RE HERE</small><strong className={detailValueClass}>Mon–Sat, 10 am–6 pm IST</strong></span>
              </div>
              <div className="flex min-h-[62px] items-center gap-[13px] text-[#292521]">
                <span className={iconClass}><MapPin size={18} strokeWidth={1.5} /></span>
                <span className={detailTextClass}><small className={detailLabelClass}>FIND US</small><strong className={detailValueClass}>Delhi, Paharganj</strong></span>
              </div>
            </div>
            <p className="mt-[15px] text-[11px] leading-[1.6] text-[#877f75]">For order enquiries, include your order number so we can help you faster.</p>
          </section>

          <section aria-labelledby="contact-form-heading" className="box-border flex-[1.2_1_380px] rounded-[14px] bg-[#f2f2f1] p-[clamp(24px,3.5vw,38px)]">
            <div className="mb-5">
              <h2 id="contact-form-heading" className="m-0 font-serif text-[23px] tracking-[-.025em]">Send us a message</h2>
              <p className="mt-2 max-w-[380px] text-[13px] leading-[1.6] text-[#6c655e]">Share a few details and we’ll get back to you as soon as possible.</p>
            </div>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="flex flex-wrap gap-x-[18px] gap-y-3">
                <label className={labelClass}>Name<input className={fieldClass} name="name" autoComplete="name" placeholder="Your name" value={form.name} onChange={updateField} required /></label>
                <label className={labelClass}>Email address<input className={fieldClass} name="email" type="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={updateField} required /></label>
              </div>
              <div className="flex flex-wrap gap-x-[18px] gap-y-3">
                <label className={labelClass}>Phone number<input className={fieldClass} name="phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" value={form.phone} onChange={updateField} /></label>
                <label className={labelClass}>What’s this about?
                  <select className={`${fieldClass} cursor-pointer`} name="subject" value={form.subject} onChange={updateField} required>
                    <option value="" disabled>Select a topic</option>
                    <option value="Order enquiry">An order</option>
                    <option value="Fragrance advice">Fragrance advice</option>
                    <option value="Returns and exchanges">Returns &amp; exchanges</option>
                    <option value="Other">Something else</option>
                  </select>
                </label>
              </div>
              <label className={labelClass}>Your message<textarea className={`${fieldClass} min-h-[94px] resize-y`} name="message" placeholder="Tell us a little more…" rows="4" value={form.message} onChange={updateField} required /></label>
              {status.message && <p role="status" className={`m-0 text-[12px] leading-[1.6] ${status.type === "success" ? "text-[#366b47]" : "text-[#a43232]"}`}>{status.message}</p>}
              <div className="mt-[2px] flex flex-wrap items-center justify-between gap-[14px]">
                <p className="m-0 text-[11px] leading-[1.6] text-[#898177]">We usually reply within one business day.</p>
                <button type="submit" disabled={isSending} className="inline-flex min-h-[42px] items-center justify-center gap-[18px] border-0 bg-[#292521] px-4 text-[12px] text-white transition-colors hover:bg-[#8e2330] disabled:cursor-wait disabled:opacity-65">{isSending ? "Sending…" : "Send message"}<ArrowUpRight size={16} strokeWidth={1.7} /></button>
              </div>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Contact;
