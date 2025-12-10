"use client";
import { StickyScroll } from "@/components/ui/sticky-scroll";


const content = [
  {
    title: "Product design",
    description:
      "Full product development lifecycle service where we go from market research to MVP.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
        <img src="/photos/Gemini_Generated_Image_o1pz0xo1pz0xo1pz.webp" alt="Product design" className="h-full w-full object-cover" />
      </div>
        ),
      },
      {
        title: "Design Systems",
        description:
      "A well-defined design system is the backbone of any successful product. I help you create a cohesive design language that enhances collaboration and ensures consistency across all touchpoints. I do everything from branding to tokens, UI components and documentation.",
        content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
        <img
          src="/photos/Gemini_Generated_Image_veamiiveamiiveam.webp"
          alt="Design Systems"
          className="h-full w-full object-cover"
        />
      </div>
        ),
      },
      {
        title: "Web Development",
        description:
      "A website developed to captivate and convert can elevate your brand to new heights. My custom-coded sites are meticulously crafted to reflect your unique identity, delivering seamless experiences with a focus on animation—keeping your audience engaged and returning.",
        content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white">
        <img src="/photos/Gemini_Generated_Image_1chfk91chfk91chf.webp" alt="Web Development" className="h-full w-full object-cover" />
      </div>
    ),
  },
  {
    title: "SEO & Analytics",
    description:
      "Unlock the full potential of your website with our SEO and analytics services. I help you optimize your content for search engines, ensuring that your target audience can easily find you. My analytics tools provide valuable insights into user behavior, allowing you to make data-driven decisions.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
        <img src="/photos/Gemini_Generated_Image_7uzn507uzn507uzn.webp" alt="SEO & Analytics" className="h-full w-full object-cover" />
      </div>
    ),
  },
];
export function StickyScrollRevealDemo() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <h3 className="text-left text-5xl font-black tracking-tight text-neutral-400  dark: md:text-6xl lg:text-7xl/14 dark:text-neutral-100">How I can help you</h3>
      <div className="mt-6 w-full">
        <StickyScroll content={content} />
      </div>
    </div>
  );
}
