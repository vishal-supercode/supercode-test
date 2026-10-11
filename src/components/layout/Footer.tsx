import "./footer.css";

import Image from "next/image";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-brand" aria-label="Supercode">
          <Image
            className="footer-logo"
            src="/images/footer-logo.png"
            alt="Supercode"
            width={1415}
            height={211}
          />
        </div>
        <div className="footer-rule" />
        <div className="footer-bottom">
          <span>© 2026 Supercode®Design</span>
          <nav aria-label="Footer navigation" className="footer-links">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#sitemap">Sitemap</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
