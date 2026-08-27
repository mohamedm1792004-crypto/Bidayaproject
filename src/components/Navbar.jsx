import React from 'react'

function Navbar() {
  return (
    <div>
       <header class="site-header" id="header">
        <div class="container">
            <div class="header-inner">
                <a href="#" class="logo">Bidaya <span>Accessories</span></a>
                
                <nav class="nav-main">
                    <a href="#">Home</a>
                    <a href="/Collections">Collections</a>
                    <a href="/AllDetails">Our Story</a>
                    <a href="/Craftsmanship">Craftsmanship</a>
                    <a href="/Cart" class="nav-cta">Cart</a>
                </nav>
                
                <button class="menu-toggle" id="menuToggle" aria-label="Toggle menu">
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