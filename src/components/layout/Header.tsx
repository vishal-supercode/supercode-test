"use client";

import "./header.css";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const links = ["About", "Work", "Services", "Insights", "Impact"];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header" id="top">
      <div className="container header-container">
        <Link className="brand-link" href="/" aria-label="Supercode home">
          <Image
            className="brand-logo"
            src="/images/logo.png"
            alt="Supercode"
            width={169}
            height={26}
            priority
          />
        </Link>
        <div className="header-actions">
          <nav
            id="main-navigation"
            aria-label="Main navigation"
            className={`desktop-nav${menuOpen ? " is-open" : ""}`}
          >
            {links.map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
            <a
              className="mobile-contact"
              href="mailto:hello@supercode.com"
              onClick={() => setMenuOpen(false)}
            >
              <Image src="/images/arrow.png" alt="" width={51} height={18} />
              <span>Contact us</span>
            </a>
          </nav>
          <a className="header-cta" href="mailto:hello@supercode.com">
            <Image
              className="header-cta-arrow"
              src="/images/arrow.png"
              alt=""
              width={51}
              height={18}
            />
            <span>Contact us</span>
          </a>
          <button
            className={`mobile-menu${menuOpen ? " is-open" : ""}`}
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
