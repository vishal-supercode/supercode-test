"use client";

import "./intro-section.css";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function IntroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const context = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: "#intro-title",
            start: "top 90%",
            end: "top 60%",
            scrub: 1.25,
          },
        })
        .to(section, {
          backgroundColor: "#050505",
          color: "#fff",
          duration: 1,
          ease: "none",
        })
        .to(
          ".intro-description",
          { color: "#b8b8b8", duration: 1, ease: "none" },
          "<",
        )
        .to("#intro-title", { color: "#fff", duration: 1, ease: "none" }, "<");
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="intro-section"
      aria-labelledby="intro-title"
    >
      <div className="container intro-container">
        <div className="intro-content">
          <h2 id="intro-title">
            Technical depth presented
            <br />
            with strategic context
          </h2>
          <Image
            className="intro-logo intro-company-logo-space"
            src="/images/company-logo.png"
            alt=""
            width={445}
            height={411}
          />
        </div>
        <div className="intro-side">
          <p className="intro-description">
            DEVELOPMENT orem ipsum dolor sit amet consectetur. Augue at nisl
            phasellus nisl
            <br />
            ullamcorper at felis. Ut suscipit sit morbi semper lacus lorem urna
            eu. Semper et
            <br />
            eleifend sit gravida euismod turpis. Pellentesque
          </p>
          <a className="intro-link" href="#work">
            <Image
              src="/images/intro-arrow.png"
              alt="See work"
              width={183}
              height={48}
            />
          </a>
          <div className="intro-media">
            <Image
              src="/images/intro-banner.png"
              alt="A lighthouse surrounded by floating white blocks"
              width={576}
              height={384}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
