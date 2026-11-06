import React from "react";

const footerLinks = {
  Menu: ["Home", "Shop", "Our story", "Contact us"],
  "Quick links": [
    "Search",
    "FAQs",
    "Privacy policy",
    "Shipping policy",
    "Returns & refunds",
    "Terms & conditions",
  ],
};

function Footer() {
  return (
    <footer className="w-full bg-transparent text-white">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-10 px-6 pb-12 pt-12 sm:grid-cols-2 sm:px-10 lg:grid-cols-[1.5fr_.8fr_1fr_1.05fr] lg:gap-12 lg:px-12 lg:pb-24 lg:pt-14">
        <section>
          <h2 className="mb-5 text-[17px] font-medium">Join the club</h2>
          <p className="max-w-[280px] text-[14px] leading-7">
            Stay ahead of the curve with our offers and scent updates.
          </p>
          <form
            onSubmit={(event) => event.preventDefault()}
            className="mt-6 flex max-w-[320px] border-b border-white/70"
          >
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email address"
              className="min-w-0 flex-1 bg-transparent py-3 text-[13px] text-white outline-none placeholder:text-white/60"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="px-1 text-[22px] transition-transform hover:translate-x-1"
            >
              →
            </button>
          </form>
          <div className="mt-7 inline-flex items-center overflow-hidden text-[9px] font-bold text-white">
            <span className="bg-[#83bf3f] px-1.5 py-1">ELSE</span>
            <span className="bg-[#252525] px-1.5 py-1">MADE WITH CARE</span>
          </div>
        </section>

        {Object.entries(footerLinks).map(([heading, links]) => (
          <section key={heading}>
            <h2 className="mb-5 text-[17px] font-medium">{heading}</h2>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link}>
                  <a
                    href={
                      link === "Home" ? "/" : link === "Shop" ? "/shop" : "#"
                    }
                    className="text-[14px] text-white/75 transition-colors hover:text-white"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section>
          <h2 className="mb-5 text-[17px] font-medium">Our store</h2>
          <address className="space-y-1 text-[14px] not-italic leading-6 text-white/75">
            <p>ELSE Fragrance Studio</p>
            <p>New Delhi, India</p>
            <p>Zip Code: 110001</p>
            <p>Phone: +91 98765 43210</p>
            <p>
              Email:{" "}
              <a href="mailto:hello@else.in" className="hover:text-white">
                hello@else.in
              </a>
            </p>
          </address>
        </section>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/30 pt-5 text-[11px] text-white/75 sm:col-span-2 lg:col-span-4">
          <span>© ELSE Fragrance Co. 2026</span>
          <div
            className="flex items-center gap-4 text-[13px]"
            aria-label="Social media links"
          >
            <a
              href="https://devgarv.in"
              aria-label="Instagram"
              className="hover:text-white"
            >
              Designed & Developed by GARV
            </a>
          </div>
          <div className="flex flex-wrap gap-1.5 text-[9px] font-semibold">
            <span className="border border-white/40 px-2 py-1 text-white">
              VISA
            </span>
            <span className="border border-white/40 px-2 py-1 text-white">
              MASTER CARD
            </span>
            <span className="border border-white/40 px-2 py-1 text-white">
              UPI
            </span>
            <span className="border border-white/40 px-2 py-1 text-white">
              RUPAY
            </span>
          </div>
        </div>
      </div>

      <div
        aria-label="ELSE"
        className="overflow-hidden bg-transparent px-[3.4vw] pt-[1.5vw]"
      >
        <p className="select-none whitespace-nowrap text-center text-[12vw] font-medium leading-[.78] tracking-[.075em] text-white">
          ELSE
        </p>
      </div>
    </footer>
  );
}

export default Footer;
