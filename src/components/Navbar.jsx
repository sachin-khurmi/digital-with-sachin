import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { ACADEMY } from '../seo'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/contact', label: 'Contact Us' },
  { to: '/about', label: 'About Us' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <img src="/img/logo.png" alt="Digital With Sachin" />
        </Link>

        <nav className={`nav-links ${open ? 'open' : ''}`}>
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}

          {/* The course store lives on its own subdomain, so this is a plain
              anchor rather than a router link. */}
          <a href={ACADEMY} onClick={() => setOpen(false)}>
            Courses
          </a>
        </nav>

        <div className="nav-cta">
          <Link className="btn btn-white" to="/contact">
            Download Brochure
          </Link>
          <button
            className="burger"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  )
}
