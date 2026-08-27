import React, { useState, useMemo } from "react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { useCart } from "react-use-cart";
import { useNavigate } from "react-router-dom";
import Products from "../products/Products";

// ⬇️ السطر ده كان ناقص، وهو سبب إن الصفحة كانت من غير أي تنسيق خالص.
// عدّل المسار لو حطيت ملف الـCSS في مكان مختلف عن مجلد الكومبوننت.

import {
  Gem,
  Sparkles,
  CircleDot,
  Star,
  Link2,
  Watch,
  ShoppingBag,
} from "lucide-react";

/* ============================================================
   CATEGORY DATA
   ============================================================ */

const CATEGORIES = [
  {
    id: "All",
    label: "All",
    icon: Sparkles,
  },
  {
    id: "Rings",
    label: "Rings",
    icon: Gem,
  },
  {
    id: "Necklaces",
    label: "Necklaces",
    icon: Sparkles,
  },
  {
    id: "Bracelets",
    label: "Bracelets",
    icon: CircleDot,
  },
  {
    id: "Earrings",
    label: "Earrings",
    icon: Star,
  },
  {
    id: "Chains",
    label: "Chains",
    icon: Link2,
  },
  {
    id: "Watches",
    label: "Watches",
    icon: Watch,
  },
];

/* ============================================================
   FOOTER
   ============================================================ */

function PlaceholderFooter() {
  return (
    <footer className="lux-footer">
      <div className="lux-footer-inner">

        {/* BRAND */}
        <div className="lux-footer-col lux-footer-brand">

          <div className="lux-logo lux-logo-footer">
            MAISON&nbsp;&amp;&nbsp;LUXE
          </div>

          <p>
            Fine accessories, crafted with intention.
            Timeless pieces for every story.
          </p>

          <div className="lux-footer-social">

            <a
              href="#"
              aria-label="Instagram"
              onClick={(e) => e.preventDefault()}
            >
              <FaInstagram size={16} />
            </a>

            <a
              href="#"
              aria-label="Facebook"
              onClick={(e) => e.preventDefault()}
            >
              <FaFacebookF size={16} />
            </a>

            <a
              href="#"
              aria-label="Twitter"
              onClick={(e) => e.preventDefault()}
            >
              <FaTwitter size={16} />
            </a>

          </div>

        </div>

        {/* SHOP */}
        <div className="lux-footer-col">

          <h4>Shop</h4>

          <a
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            Rings
          </a>

          <a
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            Necklaces
          </a>

          <a
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            Watches
          </a>

        </div>

        {/* SUPPORT */}
        <div className="lux-footer-col">

          <h4>Support</h4>

          <a
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            Shipping
          </a>

          <a
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            Returns
          </a>

          <a
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            Contact Us
          </a>

        </div>

        {/* NEWSLETTER */}
        <div className="lux-footer-col">

          <h4>Newsletter</h4>

          <p>
            Be first to know about new arrivals.
          </p>

          <div className="lux-footer-form">

            <input
              type="email"
              placeholder="Your email"
            />

            <button type="button">
              Join
            </button>

          </div>

        </div>

      </div>

      <div className="lux-footer-bottom">
        © {new Date().getFullYear()} Maison &amp; Luxe.
        All rights reserved.
      </div>

    </footer>
  );
}

/* ============================================================
   PRODUCT CARD
   ============================================================ */

function ProductCard({ product }) {

  const Icon =
    product.category === "Rings"
      ? Gem
      : product.category === "Necklaces"
      ? Sparkles
      : product.category === "Bracelets"
      ? CircleDot
      : product.category === "Earrings"
      ? Star
      : product.category === "Chains"
      ? Link2
      : Watch;

  const [imgFailed, setImgFailed] = useState(false);

  const { addItem } = useCart();

  const navigate = useNavigate();

  /* ----------------------------------------------------------
     IMAGE
     ---------------------------------------------------------- */

  const showImage =
    product.thumbnail &&
    !imgFailed;

  /* ----------------------------------------------------------
     ADD TO CART
     ---------------------------------------------------------- */

  const handleAddToCart = () => {
    addItem(product);
  };

  /* ----------------------------------------------------------
     VIEW DETAILS
     ---------------------------------------------------------- */

  const handleViewDetails = () => {
    navigate(`/AllSingleProduct/${product.id}`);
  };

  return (
    <article className="lux-card">

      {/* IMAGE */}
      <div className="lux-card-media">

        {showImage ? (

          <img
            src={product.thumbnail}
            alt={product.title}
            className="lux-card-img"
            loading="lazy"
            onError={() => setImgFailed(true)}
          />

        ) : (

          <div className="lux-card-media-icon">

            <Icon
              size={40}
              strokeWidth={1}
            />

          </div>

        )}

        {/* BADGE */}
        {product.badge && (
          <span className="lux-card-badge">
            {product.badge}
          </span>
        )}

        {/* QUICK ADD */}
        <button
          type="button"
          className="lux-card-quickadd"
          aria-label={`Add ${product.title} to cart`}
          onClick={handleAddToCart}
        >

          <ShoppingBag
            size={16}
            strokeWidth={1.5}
          />

        </button>

      </div>

      {/* CARD BODY */}
      <div className="lux-card-body">

        {/* CATEGORY */}
        <span className="lux-card-eyebrow">
          {product.category}
        </span>

        {/* TITLE */}
        <h3 className="lux-card-name">
          {product.title}
        </h3>

        {/* PRICE */}
        <div className="lux-card-price">
          ${Number(product.price).toFixed(2)}
        </div>

        {/* ACTIONS */}
        <div className="lux-card-actions">

          {/* VIEW DETAILS */}
          <button
            type="button"
            className="lux-btn lux-btn-outline"
            onClick={handleViewDetails}
          >
            View Details
          </button>

          {/* ADD TO CART */}
          <button
            type="button"
            className="lux-btn lux-btn-solid"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>

        </div>

      </div>

    </article>
  );
}

/* ============================================================
   MAIN PAGE
   ============================================================ */

export default function CollectionsPage() {

  const [activeCategory, setActiveCategory] =
    useState("All");

  /* ----------------------------------------------------------
     FILTER PRODUCTS
     ---------------------------------------------------------- */

  const filteredProducts = useMemo(() => {

    if (activeCategory === "All") {
      return Products;
    }

    return Products.filter(
      (product) =>
        product.category === activeCategory
    );

  }, [activeCategory]);

  return (

    <div className="lux-root">

      {/* ======================================================
          HERO
          ====================================================== */}

      <section className="lux-hero">

        <div className="lux-hero-eyebrow">
          The Full Edit
        </div>

        <h1>
          Our Collections
        </h1>

        <div className="lux-hero-divider">

          <span className="line" />

          <span className="diamond" />

          <span className="line" />

        </div>

        <p>
          Discover pieces designed to last a lifetime —
          rings, necklaces, bracelets, earrings, chains
          and watches, each finished by hand.
        </p>

      </section>

      {/* ======================================================
          FILTERS
          ====================================================== */}

      <nav
        className="lux-filters"
        aria-label="Product categories"
      >

        {CATEGORIES.map(
          ({ id, label, icon: Icon }) => (

            <button
              key={id}
              type="button"
              className={`lux-filter-btn ${
                activeCategory === id
                  ? "is-active"
                  : ""
              }`}
              onClick={() =>
                setActiveCategory(id)
              }
            >

              <Icon
                size={14}
                strokeWidth={1.5}
              />

              {label}

            </button>

          )
        )}

      </nav>

      {/* ======================================================
          PRODUCTS
          ====================================================== */}

      <section className="lux-grid-section">

        <div className="lux-grid-meta">

          <span>

            Showing{" "}

            <strong>
              {filteredProducts.length}
            </strong>{" "}

            {filteredProducts.length === 1
              ? "piece"
              : "pieces"}

          </span>

          <span>

            {activeCategory === "All"
              ? "All Collections"
              : activeCategory}

          </span>

        </div>

        {filteredProducts.length > 0 ? (

          <div className="lux-grid">

            {filteredProducts.map(
              (product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                />

              )
            )}

          </div>

        ) : (

          <div className="lux-empty">
            No pieces found in this collection yet.
          </div>

        )}

      </section>

      {/* ======================================================
          FOOTER
          ====================================================== */}

      <PlaceholderFooter />

    </div>
  );
}