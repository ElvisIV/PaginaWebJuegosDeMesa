/* ==========================================================================
   SEBITAS TOYS - APP LOGIC & INTERACTION ENGINE
   Catálogo Dinámico, Carrito Persistente & Checkout WhatsApp
   ========================================================================== */

(function () {
  'use strict';

  // State Management
  const state = {
    category: 'all',          // 'all', 'anime', 'juegos', 'accesorios', 'preventas'
    subcategory: 'all',       // 'all', or specific subcategory name
    searchQuery: '',
    sortBy: 'relevance',      // 'relevance', 'price-asc', 'price-desc', 'name-asc', 'name-desc', 'newest'
    cart: [],                 // [{ id, product, qty }]
    currentModalProduct: null,
    modalQty: 1
  };

  // DOM Elements
  const DOM = {
    productsGrid: document.getElementById('productsGrid'),
    catalogStats: document.getElementById('catalogStats'),
    noResults: document.getElementById('noResults'),
    searchInput: document.getElementById('productSearch'),
    clearSearchBtn: document.getElementById('clearSearch'),
    sortSelect: document.getElementById('productSort'),
    mainCatButtons: document.querySelectorAll('.main-cat-btn'),
    subcategoriesBar: document.getElementById('subcategoriesBar'),
    
    // Cart Elements
    cartToggleBtns: document.querySelectorAll('.cart-toggle-btn'),
    cartCloseBtn: document.getElementById('cartCloseBtn'),
    cartDrawer: document.getElementById('cartDrawer'),
    cartOverlay: document.getElementById('cartOverlay'),
    cartItemsContainer: document.getElementById('cartItemsContainer'),
    cartEmptyState: document.getElementById('cartEmptyState'),
    cartFooter: document.getElementById('cartFooter'),
    cartTotalAmount: document.getElementById('cartTotalAmount'),
    cartBadgeCounts: document.querySelectorAll('.cart-count-badge'),
    checkoutBtn: document.getElementById('checkoutBtn'),
    clientNameInput: document.getElementById('clientName'),
    clientCityInput: document.getElementById('clientCity'),
    clientPaymentSelect: document.getElementById('clientPayment'),

    // Modal Elements
    productModal: document.getElementById('productModal'),
    modalCloseBtn: document.getElementById('modalCloseBtn'),
    modalMainImg: document.getElementById('modalMainImg'),
    modalThumbs: document.getElementById('modalThumbs'),
    modalCategory: document.getElementById('modalCategory'),
    modalTitle: document.getElementById('modalTitle'),
    modalPrice: document.getElementById('modalPrice'),
    modalOldPrice: document.getElementById('modalOldPrice'),
    modalStockBadge: document.getElementById('modalStockBadge'),
    modalSpecsGrid: document.getElementById('modalSpecsGrid'),
    modalDesc: document.getElementById('modalDesc'),
    modalQtyInput: document.getElementById('modalQtyInput'),
    modalQtyMinus: document.getElementById('modalQtyMinus'),
    modalQtyPlus: document.getElementById('modalQtyPlus'),
    modalAddToCartBtn: document.getElementById('modalAddToCartBtn'),
    modalWaBtn: document.getElementById('modalWaBtn'),

    // Mobile Navigation
    mobileMenuToggle: document.getElementById('mobileMenuToggle'),
    mobileNavDrawer: document.getElementById('mobileNavDrawer'),
    mobileNavClose: document.getElementById('mobileNavClose'),
    mobileNavOverlay: document.getElementById('mobileNavOverlay'),
    scrollTopBtn: document.getElementById('scrollTopBtn')
  };

  /* ================= INITIALIZATION ================= */
  function init() {
    loadCartFromStorage();
    setupUrlParams();
    renderSubcategories();
    renderProducts();
    updateCartUI();
    bindEvents();
  }

  /* Check if there are URL parameters like ?cat=anime or ?cat=juegos */
  function setupUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('cat');
    if (cat && ['anime', 'juegos', 'accesorios', 'preventas'].includes(cat.toLowerCase())) {
      state.category = cat.toLowerCase();
      DOM.mainCatButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.category === state.category);
      });
    }
  }

  /* ================= EVENT BINDINGS ================= */
  function bindEvents() {
    // Search input
    if (DOM.searchInput) {
      DOM.searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value.trim().toLowerCase();
        if (DOM.clearSearchBtn) {
          DOM.clearSearchBtn.style.display = state.searchQuery ? 'block' : 'none';
        }
        renderProducts();
      });
    }

    // Clear search
    if (DOM.clearSearchBtn) {
      DOM.clearSearchBtn.addEventListener('click', () => {
        DOM.searchInput.value = '';
        state.searchQuery = '';
        DOM.clearSearchBtn.style.display = 'none';
        renderProducts();
        DOM.searchInput.focus();
      });
    }

    // Sort select
    if (DOM.sortSelect) {
      DOM.sortSelect.addEventListener('change', (e) => {
        state.sortBy = e.target.value;
        renderProducts();
      });
    }

    // Main Category Tabs
    DOM.mainCatButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        DOM.mainCatButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.category = btn.dataset.category;
        state.subcategory = 'all';
        renderSubcategories();
        renderProducts();
      });
    });

    // Cart Drawer Open / Close
    DOM.cartToggleBtns.forEach(btn => {
      btn.addEventListener('click', openCart);
    });

    if (DOM.cartCloseBtn) DOM.cartCloseBtn.addEventListener('click', closeCart);
    if (DOM.cartOverlay) DOM.cartOverlay.addEventListener('click', closeCart);

    // Modal Close
    if (DOM.modalCloseBtn) DOM.modalCloseBtn.addEventListener('click', closeModal);
    if (DOM.productModal) {
      DOM.productModal.addEventListener('click', (e) => {
        if (e.target === DOM.productModal) closeModal();
      });
    }

    // Modal Quantity Controls
    if (DOM.modalQtyMinus) {
      DOM.modalQtyMinus.addEventListener('click', () => {
        if (state.modalQty > 1) {
          state.modalQty--;
          DOM.modalQtyInput.value = state.modalQty;
        }
      });
    }

    if (DOM.modalQtyPlus) {
      DOM.modalQtyPlus.addEventListener('click', () => {
        const maxStock = state.currentModalProduct ? state.currentModalProduct.stock : 10;
        if (state.modalQty < maxStock) {
          state.modalQty++;
          DOM.modalQtyInput.value = state.modalQty;
        } else {
          showToast(`Stock máximo disponible: ${maxStock} unidades`, 'info');
        }
      });
    }

    // Add to cart from Modal
    if (DOM.modalAddToCartBtn) {
      DOM.modalAddToCartBtn.addEventListener('click', () => {
        if (state.currentModalProduct) {
          addToCart(state.currentModalProduct.id, state.modalQty);
          closeModal();
          openCart();
        }
      });
    }

    // Modal WhatsApp Inquiry
    if (DOM.modalWaBtn) {
      DOM.modalWaBtn.addEventListener('click', () => {
        if (!state.currentModalProduct) return;
        const p = state.currentModalProduct;
        const msg = encodeURIComponent(
          `¡Hola Sebitas Toys! 👋 Me interesa este producto:\n\n` +
          `🔹 *${p.name}*\n` +
          `💰 *Precio:* ${STORE_CONFIG.currency} ${p.price.toFixed(2)}\n` +
          `📦 *Franquicia:* ${p.franchise}\n\n` +
          `¿Tienen disponibilidad para envío/entrega? ¡Gracias!`
        );
        window.open(`https://wa.me/${STORE_CONFIG.phoneRaw}?text=${msg}`, '_blank');
      });
    }

    // Checkout via WhatsApp
    if (DOM.checkoutBtn) {
      DOM.checkoutBtn.addEventListener('click', handleWhatsAppCheckout);
    }

    // Mobile Navigation Drawer
    if (DOM.mobileMenuToggle && DOM.mobileNavDrawer && DOM.mobileNavOverlay) {
      DOM.mobileMenuToggle.addEventListener('click', () => {
        DOM.mobileNavDrawer.classList.add('open');
        DOM.mobileNavOverlay.classList.add('active');
      });

      if (DOM.mobileNavClose) {
        DOM.mobileNavClose.addEventListener('click', closeMobileNav);
      }
      DOM.mobileNavOverlay.addEventListener('click', closeMobileNav);
    }

    // Scroll to Top
    if (DOM.scrollTopBtn) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
          DOM.scrollTopBtn.classList.add('visible');
        } else {
          DOM.scrollTopBtn.classList.remove('visible');
        }
      });

      DOM.scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Keyboard ESC to close modals/drawers
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
        closeCart();
        closeMobileNav();
      }
    });
  }

  function closeMobileNav() {
    if (DOM.mobileNavDrawer) DOM.mobileNavDrawer.classList.remove('open');
    if (DOM.mobileNavOverlay) DOM.mobileNavOverlay.classList.remove('active');
  }

  /* ================= SUBCATEGORIES RENDERING ================= */
  function renderSubcategories() {
    if (!DOM.subcategoriesBar) return;
    DOM.subcategoriesBar.innerHTML = '';

    // Filter products by currently active main category
    let subcats = new Set();
    PRODUCTS_DATA.forEach(p => {
      if (state.category === 'all' || p.category === state.category) {
        if (p.subcategory) subcats.add(p.subcategory);
        if (p.franchise) subcats.add(p.franchise);
      }
    });

    // Add 'Todas' pill
    const allPill = document.createElement('button');
    allPill.className = `subcat-pill ${state.subcategory === 'all' ? 'active' : ''}`;
    allPill.innerHTML = '<i class="fas fa-layer-group"></i> Todos';
    allPill.addEventListener('click', () => {
      state.subcategory = 'all';
      renderSubcategories();
      renderProducts();
    });
    DOM.subcategoriesBar.appendChild(allPill);

    // Add specific subcategories
    Array.from(subcats).sort().forEach(sub => {
      const pill = document.createElement('button');
      pill.className = `subcat-pill ${state.subcategory === sub ? 'active' : ''}`;
      pill.textContent = sub;
      pill.addEventListener('click', () => {
        state.subcategory = sub;
        renderSubcategories();
        renderProducts();
      });
      DOM.subcategoriesBar.appendChild(pill);
    });
  }

  /* ================= PRODUCTS FILTER & RENDER ================= */
  function getFilteredProducts() {
    return PRODUCTS_DATA.filter(p => {
      // Main category filter
      if (state.category !== 'all' && p.category !== state.category) {
        return false;
      }

      // Subcategory filter
      if (state.subcategory !== 'all') {
        if (p.subcategory !== state.subcategory && p.franchise !== state.subcategory) {
          return false;
        }
      }

      // Search query
      if (state.searchQuery) {
        const text = `${p.name} ${p.franchise} ${p.subcategory} ${p.manufacturer} ${p.description}`.toLowerCase();
        if (!text.includes(state.searchQuery)) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      switch (state.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'newest':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case 'relevance':
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });
  }

  function renderProducts() {
    if (!DOM.productsGrid) return;
    const filtered = getFilteredProducts();

    if (DOM.catalogStats) {
      DOM.catalogStats.innerHTML = `Mostrando <strong>${filtered.length}</strong> producto${filtered.length === 1 ? '' : 's'}`;
    }

    if (filtered.length === 0) {
      DOM.productsGrid.innerHTML = '';
      if (DOM.noResults) DOM.noResults.style.display = 'block';
      return;
    }

    if (DOM.noResults) DOM.noResults.style.display = 'none';

    DOM.productsGrid.innerHTML = filtered.map(p => createProductCardHTML(p)).join('');

    // Attach click events for cards and add-to-cart buttons
    DOM.productsGrid.querySelectorAll('.product-card').forEach(card => {
      const id = card.dataset.id;
      const product = PRODUCTS_DATA.find(x => x.id === id);

      // Open modal on click of media or title
      const media = card.querySelector('.card-media');
      const title = card.querySelector('.card-title');
      const quickView = card.querySelector('.quick-view-btn');

      [media, title, quickView].forEach(el => {
        if (el) {
          el.addEventListener('click', (e) => {
            e.stopPropagation();
            openProductModal(product);
          });
        }
      });

      // Add to cart button
      const addBtn = card.querySelector('.btn-add-cart');
      if (addBtn) {
        addBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          addToCart(id, 1);
        });
      }
    });
  }

  function createProductCardHTML(p) {
    const isAnime = p.category === 'anime';
    const isPreventa = p.category === 'preventas';

    // Specs chips preview
    let specsChips = '';
    if (p.specs.scale) {
      specsChips += `<span class="spec-chip"><i class="fas fa-ruler-vertical"></i> ${p.specs.scale}</span>`;
    }
    if (p.specs.players) {
      specsChips += `<span class="spec-chip"><i class="fas fa-users"></i> ${p.specs.players}</span>`;
    }
    if (p.specs.duration) {
      specsChips += `<span class="spec-chip"><i class="fas fa-clock"></i> ${p.specs.duration}</span>`;
    }
    if (p.specs.age) {
      specsChips += `<span class="spec-chip"><i class="fas fa-user-tag"></i> ${p.specs.age}</span>`;
    }

    const badgeClass = isPreventa ? 'preventa' : (isAnime ? 'anime' : 'boardgame');

    return `
      <article class="product-card" data-id="${p.id}">
        <div class="card-media">
          <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='img/hero-banner.jpg'">
          <div class="badge-tag-container">
            <span class="badge-tag ${badgeClass}">${p.badge || (isAnime ? 'Anime' : 'Juego')}</span>
            ${p.stock > 0 ? `<span class="badge-tag stock"><i class="fas fa-check"></i> Stock: ${p.stock}</span>` : ''}
          </div>
          <button class="quick-view-btn" aria-label="Ver detalles de ${p.name}">
            <i class="fas fa-eye"></i>
          </button>
        </div>
        <div class="card-body">
          <div class="card-category-meta">
            <span class="franchise">${p.franchise}</span>
            <span>${p.manufacturer}</span>
          </div>
          <h3 class="card-title" title="${p.name}">${p.name}</h3>
          <div class="card-specs">
            ${specsChips}
          </div>
          <div class="card-footer">
            <div class="price-box">
              <span class="current-price"><span>${STORE_CONFIG.currency}</span> ${p.price.toFixed(2)}</span>
              ${p.oldPrice ? `<span class="old-price">${STORE_CONFIG.currency} ${p.oldPrice.toFixed(2)}</span>` : ''}
            </div>
            <button class="btn-add-cart" aria-label="Agregar ${p.name} al carrito">
              <i class="fas fa-cart-plus"></i> Agregar
            </button>
          </div>
        </div>
      </article>
    `;
  }

  /* ================= PRODUCT MODAL ================= */
  function openProductModal(product) {
    if (!product) return;
    state.currentModalProduct = product;
    state.modalQty = 1;

    DOM.modalMainImg.src = product.image;
    DOM.modalMainImg.alt = product.name;
    DOM.modalCategory.innerHTML = `<i class="fas fa-tag"></i> ${product.category.toUpperCase()} • ${product.franchise}`;
    DOM.modalTitle.textContent = product.name;
    DOM.modalPrice.innerHTML = `<span>${STORE_CONFIG.currency}</span> ${product.price.toFixed(2)}`;
    
    if (DOM.modalOldPrice) {
      if (product.oldPrice) {
        DOM.modalOldPrice.textContent = `${STORE_CONFIG.currency} ${product.oldPrice.toFixed(2)}`;
        DOM.modalOldPrice.style.display = 'inline';
      } else {
        DOM.modalOldPrice.style.display = 'none';
      }
    }

    DOM.modalStockBadge.innerHTML = `<i class="fas fa-box-open"></i> ${product.stock} disponibles en tienda`;
    DOM.modalDesc.textContent = product.description;
    DOM.modalQtyInput.value = 1;

    // Specs Grid
    let specsHtml = '';
    if (product.specs) {
      if (product.specs.scale) specsHtml += `<div class="spec-item"><span>Escala/Tamaño:</span> <strong>${product.specs.scale}</strong></div>`;
      if (product.specs.material) specsHtml += `<div class="spec-item"><span>Material:</span> <strong>${product.specs.material}</strong></div>`;
      if (product.specs.players) specsHtml += `<div class="spec-item"><span>Jugadores:</span> <strong>${product.specs.players}</strong></div>`;
      if (product.specs.duration) specsHtml += `<div class="spec-item"><span>Duración:</span> <strong>${product.specs.duration}</strong></div>`;
      if (product.specs.age) specsHtml += `<div class="spec-item"><span>Edad:</span> <strong>${product.specs.age}</strong></div>`;
      if (product.specs.language) specsHtml += `<div class="spec-item"><span>Idioma / Origen:</span> <strong>${product.specs.language}</strong></div>`;
      if (product.specs.edition) specsHtml += `<div class="spec-item" style="grid-column: 1 / -1"><span>Detalles:</span> <strong>${product.specs.edition}</strong></div>`;
    }
    DOM.modalSpecsGrid.innerHTML = specsHtml;

    // Thumbnails
    const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
    DOM.modalThumbs.innerHTML = gallery.map((imgSrc, idx) => `
      <div class="modal-thumb ${idx === 0 ? 'active' : ''}" data-src="${imgSrc}">
        <img src="${imgSrc}" alt="Thumbnail ${idx + 1}" onerror="this.src='img/hero-banner.jpg'">
      </div>
    `).join('');

    DOM.modalThumbs.querySelectorAll('.modal-thumb').forEach(thumb => {
      thumb.addEventListener('click', () => {
        DOM.modalThumbs.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        DOM.modalMainImg.src = thumb.dataset.src;
      });
    });

    DOM.productModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!DOM.productModal) return;
    DOM.productModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  /* ================= SHOPPING CART ENGINE ================= */
  function addToCart(productId, qty = 1) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = state.cart.findIndex(item => item.id === productId);
    if (existingIndex > -1) {
      const newQty = state.cart[existingIndex].qty + qty;
      if (newQty > product.stock) {
        showToast(`Solo quedan ${product.stock} unidades en stock`, 'warning');
        state.cart[existingIndex].qty = product.stock;
      } else {
        state.cart[existingIndex].qty = newQty;
        showToast(`¡Se aumentó la cantidad de "${product.name}"!`, 'success');
      }
    } else {
      state.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        franchise: product.franchise,
        stock: product.stock,
        qty: Math.min(qty, product.stock)
      });
      showToast(`¡"${product.name}" agregado al carrito!`, 'success');
    }

    saveCartToStorage();
    updateCartUI();
  }

  function updateItemQty(productId, delta) {
    const item = state.cart.find(i => i.id === productId);
    if (!item) return;

    const targetQty = item.qty + delta;
    if (targetQty <= 0) {
      removeItemFromCart(productId);
      return;
    }

    if (targetQty > item.stock) {
      showToast(`Stock máximo alcanzado (${item.stock} uds)`, 'info');
      return;
    }

    item.qty = targetQty;
    saveCartToStorage();
    updateCartUI();
  }

  function removeItemFromCart(productId) {
    state.cart = state.cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartUI();
    showToast('Producto eliminado del carrito', 'info');
  }

  function saveCartToStorage() {
    try {
      localStorage.setItem('sebitas_toys_cart', JSON.stringify(state.cart));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }

  function loadCartFromStorage() {
    try {
      const stored = localStorage.getItem('sebitas_toys_cart');
      if (stored) {
        state.cart = JSON.parse(stored);
      }
    } catch (e) {
      state.cart = [];
    }
  }

  function updateCartUI() {
    const totalCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    // Update badge counts
    DOM.cartBadgeCounts.forEach(badge => {
      badge.textContent = totalCount;
      badge.style.display = totalCount > 0 ? 'flex' : 'none';
    });

    if (DOM.cartTotalAmount) {
      DOM.cartTotalAmount.textContent = `${STORE_CONFIG.currency} ${totalPrice.toFixed(2)}`;
    }

    if (!DOM.cartItemsContainer) return;

    if (state.cart.length === 0) {
      if (DOM.cartEmptyState) DOM.cartEmptyState.style.display = 'block';
      if (DOM.cartFooter) DOM.cartFooter.style.display = 'none';
      DOM.cartItemsContainer.innerHTML = '';
      return;
    }

    if (DOM.cartEmptyState) DOM.cartEmptyState.style.display = 'none';
    if (DOM.cartFooter) DOM.cartFooter.style.display = 'flex';

    DOM.cartItemsContainer.innerHTML = state.cart.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <div class="cart-item-img">
          <img src="${item.image}" alt="${item.name}" onerror="this.src='img/hero-banner.jpg'">
        </div>
        <div class="cart-item-info">
          <h4 class="cart-item-title">${item.name}</h4>
          <div class="cart-item-price">${STORE_CONFIG.currency} ${item.price.toFixed(2)} c/u</div>
          <div class="cart-item-stepper">
            <button class="stepper-btn btn-minus" aria-label="Disminuir"><i class="fas fa-minus"></i></button>
            <span class="stepper-qty">${item.qty}</span>
            <button class="stepper-btn btn-plus" aria-label="Aumentar"><i class="fas fa-plus"></i></button>
          </div>
        </div>
        <button class="cart-item-del" aria-label="Eliminar producto"><i class="fas fa-trash-alt"></i></button>
      </div>
    `).join('');

    // Attach stepper events
    DOM.cartItemsContainer.querySelectorAll('.cart-item').forEach(el => {
      const id = el.dataset.id;
      const minus = el.querySelector('.btn-minus');
      const plus = el.querySelector('.btn-plus');
      const del = el.querySelector('.cart-item-del');

      if (minus) minus.addEventListener('click', () => updateItemQty(id, -1));
      if (plus) plus.addEventListener('click', () => updateItemQty(id, 1));
      if (del) del.addEventListener('click', () => removeItemFromCart(id));
    });
  }

  function openCart() {
    if (DOM.cartDrawer) DOM.cartDrawer.classList.add('open');
    if (DOM.cartOverlay) DOM.cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    if (DOM.cartDrawer) DOM.cartDrawer.classList.remove('open');
    if (DOM.cartOverlay) DOM.cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  /* ================= WHATSAPP CHECKOUT ================= */
  function handleWhatsAppCheckout() {
    if (state.cart.length === 0) {
      showToast('Tu carrito está vacío', 'warning');
      return;
    }

    const clientName = DOM.clientNameInput ? DOM.clientNameInput.value.trim() : '';
    const clientCity = DOM.clientCityInput ? DOM.clientCityInput.value.trim() : '';
    const clientPayment = DOM.clientPaymentSelect ? DOM.clientPaymentSelect.value : 'QR Simple';

    if (!clientName) {
      showToast('Por favor escribe tu Nombre en el formulario del carrito', 'warning');
      if (DOM.clientNameInput) DOM.clientNameInput.focus();
      return;
    }

    let itemsListText = '';
    let total = 0;

    state.cart.forEach((item, idx) => {
      const sub = item.price * item.qty;
      total += sub;
      itemsListText += `${idx + 1}. *${item.name}*\n   ▸ Cantidad: ${item.qty} | Subtotal: ${STORE_CONFIG.currency} ${sub.toFixed(2)}\n`;
    });

    const orderMessage = 
      `🏮 *NUEVO PEDIDO - SEBITAS TOYS* 🏮\n\n` +
      `👤 *Cliente:* ${clientName}\n` +
      `📍 *Ciudad / Dirección:* ${clientCity || 'A coordinar'}\n` +
      `💳 *Forma de Pago:* ${clientPayment}\n\n` +
      `📦 *DETALLE DEL PEDIDO:*\n` +
      `${itemsListText}\n` +
      `💰 *TOTAL A PAGAR:* ${STORE_CONFIG.currency} ${total.toFixed(2)}\n\n` +
      `Por favor confírmenme la disponibilidad y los datos para realizar la transferencia / QR. ¡Muchas gracias!`;

    const encoded = encodeURIComponent(orderMessage);
    const waUrl = `https://wa.me/${STORE_CONFIG.phoneRaw}?text=${encoded}`;

    window.open(waUrl, '_blank');
  }

  /* ================= TOAST NOTIFICATIONS ================= */
  function showToast(message, type = 'info') {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.style.position = 'fixed';
      container.style.bottom = '20px';
      container.style.right = '20px';
      container.style.zIndex = '9999';
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '10px';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    let bg = '#161F33';
    let icon = 'fa-info-circle';
    let border = 'rgba(255,255,255,0.15)';

    if (type === 'success') {
      bg = '#064E3B';
      icon = 'fa-check-circle';
      border = '#10B981';
    } else if (type === 'warning') {
      bg = '#78350F';
      icon = 'fa-exclamation-triangle';
      border = '#F59E0B';
    }

    toast.style.background = bg;
    toast.style.border = `1px solid ${border}`;
    toast.style.color = '#fff';
    toast.style.padding = '12px 18px';
    toast.style.borderRadius = '10px';
    toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)';
    toast.style.fontSize = '0.9rem';
    toast.style.fontWeight = '600';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.gap = '10px';
    toast.style.transition = 'all 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(15px)';

    toast.innerHTML = `<i class="fas ${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // Start app on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
