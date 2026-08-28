import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <div>
      <header
        className={`site-header${scrolled ? ' scrolled' : ''}`}
        id="header"
      >
        <div className="container">
          <div className="header-inner">
            <Link to="/" className="logo">
              Bidaya <span>Accessories</span>
            </Link>

            <nav className={`nav-main${menuOpen ? ' is-open' : ''}`}>
              <NavLink to="/" end>
                Home
              </NavLink>
              <NavLink to="/Collections">Collections</NavLink>
              <NavLink to="/AllDetails">Our Story</NavLink>
              <NavLink to="/Craftsmanship">Craftsmanship</NavLink>
              <NavLink to="/Cart" className="nav-cta">
                Cart
              </NavLink>
            </nav>

            <button
              type="button"
              className={`menu-toggle${menuOpen ? ' is-active' : ''}`}
              id="menuToggle"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar
