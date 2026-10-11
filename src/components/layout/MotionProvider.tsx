"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function MotionProvider() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    let frame = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const context = gsap.context(() => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      const hero = document.querySelector<HTMLElement>("[data-hero-entrance]");

      if (reduceMotion) {
        hero?.removeAttribute("data-hero-entrance");
        gsap.set(".scrolling-company-logo", { opacity: 1, scale: 1 });
      } else {
        gsap.delayedCall(0.35, () => {
          hero?.removeAttribute("data-hero-entrance");
          gsap
            .timeline()
            .fromTo(
              ".hero-title",
              { x: -72, opacity: 0 },
              { x: 0, opacity: 1, duration: 1.35, ease: "power3.out" },
            )
            .fromTo(
              ".scrolling-company-logo",
              { scale: 3.4, opacity: 0 },
              { scale: 1, opacity: 1, duration: 1.35, ease: "power3.out" },
              0,
            )
            .fromTo(
              ".hero-copy",
              { x: 72, opacity: 0 },
              { x: 0, opacity: 1, duration: 1.35, ease: "power3.out" },
              "<0.12",
            );
        });
      }

      gsap.from(".site-header > *", {
        y: -10,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: "power2.out",
      });
      gsap.from(".footer-top > *, .footer-brand, .footer-bottom > *", {
        y: 18,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".site-footer",
          start: "top 85%",
        },
      });
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      context.revert();
    };
  }, []);

  return null;
}
