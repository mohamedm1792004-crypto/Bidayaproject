import React from 'react'

function Hero() {
  return (
    <div>
        <section className="hero">
  <div className="hero-content">
    <p className="text-label hero-tagline">Artisan Gold Jewelry Since 1987</p>
    <h1 className="heading-display hero-title">
      Where Gold
      <br />
      Becomes <em>Art</em>
    </h1>
    <p className="text-body hero-description">
      Each piece in our collection is handcrafted by master artisans,
      transforming the finest gold into wearable works of art that tell your
      unique story.
    </p>
    <div className="hero-actions">
      <a href="#collections" className="btn-primary">
        Explore Collections
      </a>
      <a href="#story" className="btn-text">
        Our Heritage
      </a>
    </div>
  </div>
  <div className="hero-visual" id="heroVisual">
    <div className="hero-main-image">
      <div className="hero-main-image-clip">
        <div className="hero-main-image-inner">
          <div
            className="hero-slide active"
            data-title="Serpentine Collection"
            data-price="From $2,400"
          >
            <img
              src="img/chians.jpeg"
              alt="Serpentine gold jewelry collection"
            />
          </div>
          <div
            className="hero-slide"
            data-title="Aurora Pendant"
            data-price="From $4,850"
          >
            <img src="img/rings.png" alt="Aurora gold pendant necklace" />
          </div>
          <div
            className="hero-slide"
            data-title="Heritage Rings"
            data-price="From $3,200"
          >
            <img src="img/claws.jpeg" alt="Heritage gold ring collection" />
          </div>
        </div>
      </div>
    </div>
    <div className="hero-float hero-float-1" aria-hidden="true">
      <div className="hero-float-entrance">
        <div className="hero-float-loop">
          <img src="img/small 1.png" alt="" />
        </div>
      </div>
    </div>
    <div className="hero-float hero-float-2" aria-hidden="true">
      <div className="hero-float-entrance">
        <div className="hero-float-loop">
          <img src="img/small 2.jpeg" alt="" />
        </div>
      </div>
    </div>
    <div className="hero-float hero-float-3" aria-hidden="true">
      <div className="hero-float-entrance">
        <div className="hero-float-loop">
          <img src="img/small 3.jpeg" alt="" />
        </div>
      </div>
    </div>
    <div className="hero-float hero-float-4" aria-hidden="true">
      <div className="hero-float-entrance">
        <div className="hero-float-loop">
          <img src="img/small 4.jpeg" alt="" />
        </div>
      </div>
    </div>
    <div className="hero-visual-glow" aria-hidden="true" />
  </div>
</section>

    </div>
  )
}

export default Hero