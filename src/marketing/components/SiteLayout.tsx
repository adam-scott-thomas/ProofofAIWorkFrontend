import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { APP_URL, PRIMARY_CTA } from "../lib/constants";

const navItems = [
  { href: "/scores", label: "Scores" },
  { href: "/examples", label: "Examples" },
  { href: "/employers", label: "Employers" },
  { href: "/job-seekers", label: "Job seekers" },
  { href: "/quizzes", label: "Quizzes" },
  { href: "/blog", label: "Blog" },
];

export default function SiteLayout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="site-shell">
      <header className="site-header">
        <Link to="/" className="brand" aria-label="ProofOfAIWork home" onClick={() => setOpen(false)}>
          <span className="brand-mark">P</span>
          <span>ProofOfAIWork</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink key={item.href} to={item.href}>
              {item.label}
            </NavLink>
          ))}
        </nav>
        <a className="nav-cta" href={APP_URL}>
          {PRIMARY_CTA}
        </a>
        <button
          className="icon-button mobile-menu-button"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {open ? (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <NavLink key={item.href} to={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </NavLink>
          ))}
          <a href={APP_URL} onClick={() => setOpen(false)}>
            {PRIMARY_CTA}
          </a>
        </nav>
      ) : null}

      <main>
        <Outlet />
      </main>

      <footer className="site-footer">
        <div>
          <Link to="/" className="brand footer-brand">
            <span className="brand-mark">P</span>
            <span>ProofOfAIWork</span>
          </Link>
          <p>Structured proof for people who do serious work with AI.</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link to="/about">About</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <a href={APP_URL}>App</a>
        </nav>
      </footer>
    </div>
  );
}
