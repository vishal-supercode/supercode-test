import "./hero-section.css";

import Image from "next/image";

export function HeroSection() {
  return (
    <section
      className="hero-section"
      aria-labelledby="hero-title"
      data-hero-entrance="pending"
    >
      <div className="container hero-container">
        <h1 id="hero-title" className="hero-title">
          Bold websites for
          <br />
          B2B Enterprises
        </h1>
        <Image
          className="company-logo hero-company-logo-space"
          src="/images/company-logo.png"
          alt=""
          width={445}
          height={411}
          priority
        />
        <p className="hero-copy">
          We measure success in impact, not just statistics.
          <br />
          But here&apos;s what shapes our perspective.
        </p>
      </div>
    </section>
  );
}
