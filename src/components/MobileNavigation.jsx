import React from 'react'

function MobileNavigation() {
  return (
    <div>
        <>
  <div className="mobile-overlay" id="mobileOverlay" />
  <nav className="mobile-nav" id="mobileNav">
    <button className="mobile-nav-close" id="mobileNavClose">
      ×
    </button>
    <ul className="mobile-nav-links">
      <li>
        <a href="#collections">Collections</a>
      </li>
      <li>
        <a href="#story">Our Story</a>
      </li>
      <li>
        <a href="#craftsmanship">Craftsmanship</a>
      </li>
      <li>
        <a href="#contact">Visit Us</a>
      </li>
    </ul>
    <div className="mobile-nav-cta">
      <a href="#contact" className="btn-primary">
        Book Appointment
      </a>
    </div>
  </nav>
</>

    </div>
  )
}

export default MobileNavigation