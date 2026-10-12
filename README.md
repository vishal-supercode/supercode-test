# Supercode Homepage

Live website: [https://supercode-test-taupe.vercel.app/](https://supercode-test-taupe.vercel.app/)

## Project structure

This is a Next.js application organized with the App Router. The source code is separated by responsibility so the layout, homepage sections, animations, assets, and data remain maintainable.


### `src/app/`

Contains application routes and global application setup.

- `layout.tsx` contains the root layout shared by all pages. It renders the header, page content, footer, and motion provider.
- `page.tsx` is the homepage entry point. It combines the logo journey animation, hero section, and intro section.
- `globals.css` contains site-wide styles, theme variables, browser resets, and reusable classes such as `.container`.
- `favicon.ico` is the browser tab icon.

#### `src/components/layout/`

Global layout components used across the application.

- `Header.tsx` contains the navbar, logo, navigation links, contact button, and mobile menu.
- `header.css` contains header-specific styles.
- `Footer.tsx` contains the footer logo, links, divider, and copyright area.
- `footer.css` contains footer-specific styles.
- `MotionProvider.tsx` initializes Lenis smooth scrolling and GSAP-based animations.

#### `src/components/home/`

Homepage-specific sections and animation logic.

- `HeroSection.tsx` contains the main hero heading, supporting copy, and logo placeholder.
- `hero-section.css` contains hero layout, typography, responsive rules, and entrance-state styles.
- `IntroSection.tsx` contains the intro heading, description, CTA, banner, and logo placeholder.
- `intro-section.css` contains intro layout, colors, spacing, typography, and responsive behavior.
- `CompanyLogoJourney.tsx` loads the Three.js model and controls its GSAP and ScrollTrigger movement between the hero and intro sections. It also supports click-and-drag rotation.
- `company-logo-journey.css` contains styles for the floating 3D model container and canvas.


## `public/`

Contains static files served directly by the browser.

- `public/images/` contains logos, arrows, banner images, and navbar/footer assets.
- `public/models/` contains the `supercode-model.glb` 3D model.
- `public/draco/` contains the Draco decoder files required to load the compressed GLB model in the browser.
- `public/fonts/` contains font files and font licensing information.
- The starter SVG files are leftover template assets and are not part of the Supercode homepage.
