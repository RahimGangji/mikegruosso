import Image from "next/image";
import Link from "next/link";
import { BLUR_PLACEHOLDER } from "@/app/lib/placeholder";

type ProcessImage = {
  src: string;
  alt: string;
};

type HomeBuyingProcessProps = {
  title: string;
  subtitle: string;
  paragraphs: string[];
  titleClassName?: string;
  images?: {
    primary: ProcessImage;
    secondary: ProcessImage;
  };
  cta?: {
    label: string;
    href: string;
  } | null;
  /** Use <h1> (default) for the page hero, or <h2> when this section isn't the page lede. */
  headingTag?: "h1" | "h2";
};

const defaultImages = {
  primary: {
    src: "/happyfamily.avif",
    alt: "Family touring a house",
  },
  secondary: {
    src: "/happyfamily2.avif",
    alt: "Couple on green couch",
  },
};

export default function HomeBuyingProcess({
  title,
  subtitle,
  paragraphs,
  titleClassName = "text-[28px] sm:text-[36px]",
  images = defaultImages,
  cta = null,
  headingTag = "h1",
}: HomeBuyingProcessProps) {
  const HeadingTag = headingTag;
  return (
    <section className="w-full bg-white pt-36 sm:pt-40 pb-24 sm:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid min-w-0 grid-cols-1 lg:grid-cols-[35%_65%] gap-12 lg:gap-36 items-center">
          <div className="flex flex-col justify-center">
            <HeadingTag className={`${titleClassName} font-normal leading-tight tracking-wide text-gray-900 mb-6 font-[family-name:var(--font-cormorant-garamond)]`}>
              {title}
            </HeadingTag>

            <p
              className="text-[16px] font-semibold uppercase tracking-[0.2em] text-[#3aaacf] mb-8 font-[family-name:var(--font-manrope)]"
              style={{ fontWeight: 400 }}
            >
              {subtitle}
            </p>

            <div
              className="flex flex-col gap-5 text-[14px] leading-relaxed font-[family-name:var(--font-karla)]"
              style={{ color: "#000000" }}
            >
              {paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            {cta ? (
              <div className="mt-8">
                <Link
                  href={cta.href}
                  className="inline-flex items-center justify-center rounded bg-[#3aaacf] hover:bg-[#2f95b6] transition-colors px-8 py-3.5 text-sm font-semibold text-white tracking-wide font-[family-name:var(--font-manrope)]"
                >
                  {cta.label}
                </Link>
              </div>
            ) : null}
          </div>

          <div
            className="relative w-full min-w-0 max-lg:overflow-x-clip lg:w-[70%] h-[320px] sm:h-[380px] lg:h-[420px]"
            style={{ height: 320 }}
          >
            <div className="absolute top-0 left-0 w-[88%] max-w-full h-[90%] overflow-hidden">
              <Image
                src={images.primary.src}
                alt={images.primary.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 75vw, 40vw"
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
                priority
              />
            </div>

            <div className="absolute bottom-0 right-0 w-[55%] sm:w-[58%] lg:-right-18 lg:w-[60%] h-[52%] overflow-hidden shadow-xl">
              <Image
                src={images.secondary.src}
                alt={images.secondary.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 55vw, 30vw"
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
