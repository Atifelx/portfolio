"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { BOOKING_URL } from "@/lib/profile";

// Listed in page order: the scroll-spy relies on it
const navLinks = [
  { name: "Work", href: "#work" },
  { name: "Experience", href: "#experience" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function NavBar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setIsScrolled(window.scrollY > 24);
      let current = "home";
      for (const { href } of navLinks) {
        const section = document.getElementById(href.substring(1));
        if (section && window.scrollY >= section.offsetTop - 120) current = href.substring(1);
      }
      setActiveSection(current);
    };
    // Coalesce scroll events to one update per frame
    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const linkClass = (href: string) =>
    clsx(
      "transition-colors",
      activeSection === href.substring(1) ? "text-ink" : "text-ink-3 hover:text-ink"
    );

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 bg-paper/95 transition-shadow",
        isScrolled && "shadow-[0_1px_0_var(--color-rule)]"
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6" aria-label="Main">
        <a href="#home" className="text-lg font-semibold tracking-tight text-ink">
          Atif Shaikh
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              aria-current={activeSection === link.href.substring(1) ? "location" : undefined}
              className={linkClass(link.href)}
            >
              {link.name}
            </a>
          ))}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-cobalt px-4 py-2 font-medium text-white transition-colors hover:bg-cobalt-deep"
          >
            Book a call
          </a>
        </div>

        <button
          type="button"
          className="-mr-2 p-2 text-ink md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {isMenuOpen && (
        <div id="mobile-menu" className="border-t border-rule bg-paper px-6 pb-6 pt-2 md:hidden">
          <ul className="divide-y divide-rule">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={activeSection === link.href.substring(1) ? "location" : undefined}
                  className={clsx("block py-3 text-lg", linkClass(link.href))}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
            className="mt-4 block rounded-lg bg-cobalt px-4 py-3 text-center font-medium text-white"
          >
            Book a call
          </a>
        </div>
      )}
    </header>
  );
}
