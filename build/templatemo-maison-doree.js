/*
   Maison Dorée — Collection & Product Detail
   script.js

   Handles:
   - Shared header / mobile nav / smooth scroll behavior
   - Collection page: fetch all products from the API, render cards,
     category filtering
   - Product detail page: read ?id= from the URL, fetch that single
     product from the API, render its details, Add to Cart
*/

const API_BASE = 'https://fakestoreapi.com';

/* ==========================================================
   SHARED: header scroll effect, mobile nav, smooth scroll
   ========================================================== */
(function initChrome() {
   const header = document.getElementById('header');
   if (header) {
      window.addEventListener('scroll', () => {
         header.classList.toggle('scrolled', window.scrollY > 60);
      });
      if (window.scrollY > 60) header.classList.add('scrolled');
   }

   const menuToggle = document.getElementById('menuToggle');
   const mobileNav = document.getElementById('mobileNav');
   const mobileOverlay = document.getElementById('mobileOverlay');
   const mobileNavClose = document.getElementById('mobileNavClose');
   const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

   function openMobileNav() {
      mobileNav.classList.add('active');
      mobileOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
   }

   function closeMobileNav() {
      mobileNav.classList.remove('active');
      mobileOverlay.classList.remove('active');
      document.body.style.overflow = '';
   }

   if (menuToggle && mobileNav && mobileOverlay && mobileNavClose) {
      menuToggle.addEventListener('click', openMobileNav);
      mobileNavClose.addEventListener('click', closeMobileNav);
      mobileOverlay.addEventListener('click', closeMobileNav);
      mobileNavLinks.forEach(link => link.addEventListener('click', closeMobileNav));
   }

   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
         const href = this.getAttribute('href');
         if (href.length < 2) return;
         const target = document.querySelector(href);
         if (target) {
            e.preventDefault();
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
         }
      });
   });
})();

/* ==========================================================
   Small helpers
   ========================================================== */
function formatPrice(value) {
   const num = Number(value);
   return Number.isFinite(num) ? `$${num.toFixed(2)}` : '—';
}

function toTitleCase(str) {
   if (!str) return '';
   return str.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1));
}

function escapeHtml(str) {
   const div = document.createElement('div');
   div.textContent = str ?? '';
   return div.innerHTML;
}

function showToast(message) {
   let toast = document.getElementById('toast');
   if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast';
      toast.className = 'toast';
      document.body.appendChild(toast);
   }
   toast.textContent = message;
   toast.classList.add('show');
   clearTimeout(showToast._timer);
   showToast._timer = setTimeout(() => toast.classList.remove('show'), 2600);
}

/* ==========================================================
   CART (persisted in localStorage so it survives navigation
   between index.html and product.html)
   ========================================================== */
const Cart = {
   KEY: 'maison-doree-cart',
   read() {
      try {
         return JSON.parse(localStorage.getItem(this.KEY)) || [];
      } catch {
         return [];
      }
   },
   add(product, qty) {
      const items = this.read();
      const existing = items.find(i => i.id === product.id);
      if (existing) {
         existing.qty += qty;
      } else {
         items.push({ id: product.id, title: product.title, price: product.price, image: product.image, qty });
      }
      localStorage.setItem(this.KEY, JSON.stringify(items));
      this.updateBadge();
   },
   count() {
      return this.read().reduce((sum, i) => sum + i.qty, 0);
   },
   updateBadge() {
      const badge = document.getElementById('cartCount');
      if (badge) badge.textContent = this.count();
   }
};
document.addEventListener('DOMContentLoaded', () => Cart.updateBadge());

/* ==========================================================
   COLLECTION PAGE (index.html)
   ========================================================== */
const productGrid = document.getElementById('productGrid');

if (productGrid) {
   const filterList = document.getElementById('filterList');
   const resultCount = document.getElementById('resultCount');
   const productError = document.getElementById('productError');

   let allProducts = [];
   let activeCategory = 'all';

   function renderSkeletons(count = 8) {
      productGrid.innerHTML = Array.from({ length: count }).map(() => `
         <div class="skeleton-card">
            <div class="skeleton-block skeleton-img"></div>
            <div class="skeleton-block skeleton-line skeleton-line--wide"></div>
            <div class="skeleton-block skeleton-line skeleton-line--narrow"></div>
         </div>
      `).join('');
   }

   function buildFilters(products) {
      if (!filterList) return;
      const categories = Array.from(new Set(products.map(p => p.category)));
      const buttons = [
         `<li><button type="button" class="filter-btn active" data-category="all">All</button></li>`,
         ...categories.map(cat => `<li><button type="button" class="filter-btn" data-category="${escapeHtml(cat)}">${escapeHtml(toTitleCase(cat))}</button></li>`)
      ];
      filterList.innerHTML = buttons.join('');

      filterList.querySelectorAll('.filter-btn').forEach(btn => {
         btn.addEventListener('click', () => {
            filterList.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.dataset.category;
            renderProducts();
         });
      });
   }

   function renderProducts() {
      const list = activeCategory === 'all'
         ? allProducts
         : allProducts.filter(p => p.category === activeCategory);

      if (resultCount) {
         resultCount.textContent = `${list.length} piece${list.length === 1 ? '' : 's'}`;
      }

      if (list.length === 0) {
         productGrid.innerHTML = `<div class="product-state"><p>No pieces found in this category.</p></div>`;
         return;
      }

      productGrid.innerHTML = list.map((product, i) => `
         <button type="button" class="product-card" style="animation-delay:${Math.min(i, 8) * 0.06}s" data-id="${product.id}" aria-label="View details for ${escapeHtml(product.title)}">
            <div class="product-card-image">
               <span class="product-card-category">${escapeHtml(toTitleCase(product.category))}</span>
               <img src="${product.image}" alt="${escapeHtml(product.title)}" loading="lazy">
            </div>
            <div class="product-card-body">
               <h3 class="product-card-name">${escapeHtml(product.title)}</h3>
               <span class="product-card-price">${formatPrice(product.price)}</span>
               <span class="product-card-cta">View Details</span>
            </div>
         </button>
      `).join('');

      productGrid.querySelectorAll('.product-card').forEach(card => {
         card.addEventListener('click', () => {
            const id = card.dataset.id;
            window.location.href = `product.html?id=${encodeURIComponent(id)}`;
         });
      });
   }

   async function loadProducts() {
      renderSkeletons();
      if (productError) productError.hidden = true;

      try {
         const res = await fetch(`${API_BASE}/products`);
         if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
         const data = await res.json();

         allProducts = Array.isArray(data) ? data : [];
         buildFilters(allProducts);
         renderProducts();
      } catch (err) {
         console.error('Failed to load products:', err);
         productGrid.innerHTML = '';
         if (productError) {
            productError.hidden = false;
         }
      }
   }

   const retryBtn = document.getElementById('retryBtn');
   if (retryBtn) retryBtn.addEventListener('click', loadProducts);

   loadProducts();
}

/* ==========================================================
   PRODUCT DETAIL PAGE (product.html)
   ========================================================== */
const productDetail = document.getElementById('productDetail');

if (productDetail) {
   const detailError = document.getElementById('detailError');
   let currentProduct = null;
   let qty = 1;

   function getProductId() {
      const params = new URLSearchParams(window.location.search);
      return params.get('id');
   }

   function renderStars(rating = 0) {
      const rounded = Math.round(rating);
      return '★'.repeat(rounded) + '☆'.repeat(Math.max(0, 5 - rounded));
   }

   function renderSkeleton() {
      productDetail.innerHTML = `
         <div class="skeleton-block skeleton-img" style="aspect-ratio:1/1;"></div>
         <div>
            <div class="skeleton-block skeleton-line skeleton-line--narrow" style="width:30%;"></div>
            <div class="skeleton-block skeleton-line skeleton-line--wide" style="height:34px; width:90%;"></div>
            <div class="skeleton-block skeleton-line skeleton-line--narrow" style="width:25%;"></div>
            <div class="skeleton-block skeleton-line skeleton-line--wide"></div>
            <div class="skeleton-block skeleton-line skeleton-line--wide"></div>
            <div class="skeleton-block skeleton-line skeleton-line--narrow" style="width:50%;"></div>
         </div>
      `;
   }

   function renderProduct(product) {
      currentProduct = product;
      qty = 1;

      document.title = `${product.title} — Maison Dorée`;

      productDetail.innerHTML = `
         <div class="product-detail-image">
            <img src="${product.image}" alt="${escapeHtml(product.title)}">
         </div>
         <div class="product-detail-info">
            <span class="text-label detail-category">${escapeHtml(toTitleCase(product.category))}</span>
            <h1 class="heading-display detail-title">${escapeHtml(product.title)}</h1>
            <div class="detail-rating">
               <span class="stars">${renderStars(product.rating?.rate)}</span>
               <span>${product.rating?.rate ?? '—'} (${product.rating?.count ?? 0} reviews)</span>
            </div>
            <p class="detail-price">${formatPrice(product.price)}</p>
            <p class="text-body detail-description">${escapeHtml(product.description)}</p>

            <div class="detail-meta">
               <div class="detail-meta-item">
                  <span class="text-label">Product ID</span>
                  <span>#${escapeHtml(String(product.id))}</span>
               </div>
               <div class="detail-meta-item">
                  <span class="text-label">Category</span>
                  <span>${escapeHtml(toTitleCase(product.category))}</span>
               </div>
            </div>

            <div class="qty-row">
               <span class="text-label">Quantity</span>
               <div class="qty-control">
                  <button type="button" id="qtyMinus" aria-label="Decrease quantity">−</button>
                  <span id="qtyValue">1</span>
                  <button type="button" id="qtyPlus" aria-label="Increase quantity">+</button>
               </div>
            </div>

            <button type="button" id="addToCartBtn" class="btn-primary btn-add-cart">Add to Cart</button>
         </div>
      `;

      const qtyValue = document.getElementById('qtyValue');
      document.getElementById('qtyMinus').addEventListener('click', () => {
         qty = Math.max(1, qty - 1);
         qtyValue.textContent = qty;
      });
      document.getElementById('qtyPlus').addEventListener('click', () => {
         qty = Math.min(99, qty + 1);
         qtyValue.textContent = qty;
      });
      document.getElementById('addToCartBtn').addEventListener('click', () => {
         Cart.add(currentProduct, qty);
         showToast(`Added ${qty} × ${currentProduct.title} to your cart`);
      });
   }

   async function loadProduct() {
      const id = getProductId();
      if (detailError) detailError.hidden = true;

      if (!id) {
         productDetail.innerHTML = '';
         if (detailError) {
            detailError.hidden = false;
            detailError.querySelector('p').textContent = 'No product was specified.';
         }
         return;
      }

      renderSkeleton();

      try {
         const res = await fetch(`${API_BASE}/products/${encodeURIComponent(id)}`);
         if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
         const product = await res.json();

         if (!product || !product.id) throw new Error('Product not found');

         renderProduct(product);
      } catch (err) {
         console.error('Failed to load product:', err);
         productDetail.innerHTML = '';
         if (detailError) {
            detailError.hidden = false;
            detailError.querySelector('p').textContent = "We couldn't find that piece. It may no longer be available.";
         }
      }
   }

   const detailRetryBtn = document.getElementById('detailRetryBtn');
   if (detailRetryBtn) detailRetryBtn.addEventListener('click', loadProduct);

   loadProduct();
}