import Image from "next/image";
import Link from "next/link";

const company = [
  { label: "About Us",              href: "/about"          },
  { label: "Buy My Next Home",      href: "/buy"            },
  { label: "Get My Home Value",     href: "/sell" },
  { label: "Invest in Real Estate", href: "/investment"     },
];

const customerCare = [
  { label: "Properties We Sold", href: "/portfolio" },
  { label: "Contact Us",         href: "/contact"   },
];

const socials = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/mikenjrealestate",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/gruossogroup/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17.5" cy="6.5" r="1.5" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@thegruossogroup",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@the_gruosso_group",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
        />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/103392069",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#161f2d" }}>
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="relative w-[130px] h-[80px] mb-6">
              <Image
                src="/new-logo.png"
                alt="The Gruosso Group"
                fill
                className="object-contain brightness-0 invert"
              />
            </div>
            <p className="text-white/90 text-sm leading-relaxed mb-6">
              Your trusted real estate team along the Jersey Shore specializing in residential, commercial, and investment properties in Monmouth &amp; Ocean County.
            </p>
            {/* Address */}
            <div className="flex items-start gap-2.5 mb-3">
              <svg className="w-4 h-4 text-[#3aaacf] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-white/90 text-sm leading-relaxed">
                236 Norwood Ave, Oakhurst, NJ 07755
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <svg className="w-4 h-4 text-[#3aaacf] flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <a href="tel:+17327044033" className="text-white/90 text-sm hover:text-white transition-colors">
                (732) 704-4033 ext. 126
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[#3aaacf] font-semibold text-sm tracking-wide mb-5">Company</h4>
            <ul className="flex flex-col gap-3">
              {company.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-white/90 text-sm hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-[#3aaacf] font-semibold text-sm tracking-wide mb-5">Customer Care</h4>
            <ul className="flex flex-col gap-3">
              {customerCare.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-white/90 text-sm hover:text-white transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-[#3aaacf] font-semibold text-sm tracking-wide mb-5">Follow Us</h4>
            <div className="flex flex-wrap gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-[#3aaacf] bg-white/[0.12] hover:bg-[#3aaacf]/20 transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/75 text-xs text-center sm:text-left leading-relaxed">
            © {new Date().getFullYear()} The Gruosso Group. All rights reserved.
          </p>
          <p className="text-white/75 text-xs leading-relaxed text-center sm:text-right">
            Powered by Keller Williams Realty East Monmouth
          </p>
        </div>
      </div>
    </footer>
  );
}
