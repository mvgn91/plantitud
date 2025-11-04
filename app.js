// --- PRODUCT DATA (Simulated Database) ---
const PRODUCTS = {
    "yacarnitas": { 
        id: "yacarnitas",
        name: "Yacarnitas", 
        price: 500.00, 
        size: "500g", 
        icon: "sandwich", 
        image: "public/438651654_17853698337171843_5772834246784539142_n.jpg",
        description: "Yaca marinada y sazonada con especias lista para calentar y servir.",
        details: "Ingredientes: Yaca, pasta de achiote, vinagre, naranja, especias. Libre de gluten y soya."
    },
    "yacarnitas-ahumadas": { 
        id: "yacarnitas-ahumadas",
        name: "Yacarnitas Ahumadas", 
        price: 500.00, 
        size: "500g", 
        icon: "flame", 
        image: "public/467005388_17881819827171843_4967641793766953370_n.jpg",
        description: "Nuestra version de Yacarnitas con un toque Ahumado lista para preparar en hamburguesas, sandwiches y más.",
        details: "Ingredientes: Yaca, especias, humo líquido natural, chile de árbol. Perfecto para BBQ."
    },
    "mar-lyn": { 
        id: "mar-lyn",
        name: "Mar-Lyn", 
        price: 500.00, 
        size: "500g", 
        icon: "fish", 
        image: "public/469330086_17883936978171843_8651376783503214477_n.jpg",
        description: "Marlín vegano de yaca, una alternativa deliciosa y ética al tradicional marlin.",
        details: "Ingredientes: Yaca, algas marinas, especias, aceite de oliva. Sabor umami y textura inigualable."
    },
    "yaca-natural": { 
        id: "yaca-natural",
        name: "Yaca Natural", 
        price: 500.00, 
        size: "500g", 
        icon: "chef-hat", 
        image: "public/469339997_17884199676171843_3672591337304977708_n.jpg",
        description: "Yaca natural cocida y aromatizada con especias lista para agregar a tu plato favorito o crear tus propias recetas.",
        details: "Ingredientes: Yaca. Ideal para absorber cualquier sabor. Congelable."
    },
    "tinga-yaca": { 
        id: "tinga-yaca",
        name: "Tinga de Yaca", 
        price: 500.00, 
        size: "500g", 
        icon: "pepper", 
        image: "public/438651654_17853698337171843_5772834246784539142_n.jpg",
        description: "Nuestra tinga a base de yaca imita la textura tierna y desmenuzada del pollo cocinada con una rica salsa a base de tomate y chipotle.",
        details: "Ingredientes: Yaca, jitomate, cebolla, chipotle, especias. Producto gourmet."
    },
    "mole-oaxaqueno": { 
        id: "mole-oaxaqueno",
        name: "Mole Oaxaqueño", 
        price: 500.00, 
        size: "500g", 
        icon: "soup", 
        image: "public/467005388_17881819827171843_4967641793766953370_n.jpg",
        description: "Sumérgete en los sabores ricos y profundos de la cocina tradicional Mexicana con nuestro mole estilo Oaxaqueño.",
        details: "Ingredientes: Yaca, mole negro de Oaxaca (chile, chocolate, especias), aceite vegetal."
    },
    "birria-vegana": { 
        id: "birria-vegana",
        name: "Birria Vegana", 
        price: 500.00, 
        size: "500g", 
        icon: "cooking-pot", 
        image: "public/469330086_17883936978171843_8651376783503214477_n.jpg",
        description: "Capturamos la textura tierna y jugosa de la carne y cocinamos lentamente con una mezcla de chiles, especias y hierba aromaticas logrando el sabor profundo y especiado que caracteriza a la birria.",
        details: "Ingredientes: Yaca, mezcla de chiles, especias, laurel. Sabor auténtico de birria."
    },
    "yacalao": { 
        id: "yacalao",
        name: "Yacalao (Edición Navideña)", 
        price: 500.00, 
        size: "500g", 
        icon: "gift", 
        image: "public/469339997_17884199676171843_3672591337304977708_n.jpg",
        description: "Yaca guisada con aceite de oliva, una rica mezcla de tomate, aceitunas, alcaparras y especias recreando el caracteristico sabor del bacalao a la vizcaina.",
        details: "*Disponible solo en temporada navideña"
    }
};

// --- CARRIRO STATE ---
let cart = JSON.parse(localStorage.getItem('plantitudCart')) || {}; // { productId: quantity }
let currentProductInModal = null;
let currentQuantity = 1;
const WHATSAPP_NUMBER = "523339682571"; // Número de WhatsApp de destino

// --- GENERAL MODAL LOGIC ---
function closeModal(event, modalId) {
    if (event.target.id === modalId) {
        document.getElementById(modalId).classList.remove('show');
    }
}

// --- PRODUCT MODAL LOGIC ---
document.addEventListener('DOMContentLoaded', function() {
    // Attach click event to cart icon
    document.getElementById('cart-icon').addEventListener('click', openCartModal);

    // Attach click events to all product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            openProductModal(productId);
        });
    });
});

function openProductModal(productId) {
    currentProductInModal = PRODUCTS[productId];
    currentQuantity = cart[productId] || 1; // Muestra la cantidad actual en carrito o 1 por defecto

    // Update modal content
    document.getElementById('modal-product-name').textContent = currentProductInModal.name;
    document.getElementById('modal-product-description').textContent = currentProductInModal.description;
    document.getElementById('modal-product-details').textContent = currentProductInModal.details;
    document.getElementById('modal-product-price').textContent = currentProductInModal.price.toFixed(2);
    document.getElementById('modal-product-size').textContent = currentProductInModal.size;
    document.getElementById('modal-product-quantity').textContent = currentQuantity;
    document.getElementById('add-to-cart-btn').setAttribute('data-product-id', productId);
    document.getElementById('cart-message').style.display = 'none';

    // Show modal
    const modal = document.getElementById('product-modal');
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
    document.body.style.overflow = 'hidden'; // Evitar scroll del fondo
}

function closeProductModal() {
    const modal = document.getElementById('product-modal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

function updateQuantity(change) {
    currentQuantity = Math.max(1, currentQuantity + change);
    document.getElementById('modal-product-quantity').textContent = currentQuantity;
}

function addToCart() {
    if (!currentProductInModal) {
        console.error('No hay producto seleccionado');
        return;
    }
    
    const productId = currentProductInModal.id;
    if (!productId) {
        console.error('ID de producto no encontrado');
        return;
    }

    if (currentQuantity > 0) {
        // Si el producto ya está en el carrito, sumamos la cantidad
        cart[productId] = (cart[productId] || 0) + currentQuantity;
        
        // Actualizar el localStorage
        localStorage.setItem('plantitudCart', JSON.stringify(cart));
        
        // Mostrar mensaje de éxito
        const message = document.getElementById('cart-message');
        if (message) {
            message.textContent = `¡${currentQuantity} unidad(es) de ${currentProductInModal.name} añadido(s)!`;
            message.style.display = 'block';
        }
        
        // Actualizar el contador del carrito
        updateCartCount();
        
        // Cerrar el modal después de un breve mensaje
        setTimeout(() => {
            if (message) message.style.display = 'none';
            closeProductModal();
            renderCart();
        }, 800);
    }
}

// Función auxiliar para actualizar el contador del carrito
function updateCartCount() {
    const cartCount = document.getElementById('cart-item-count');
    if (cartCount) {
        const totalItems = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
        cartCount.textContent = totalItems;
        cartCount.classList.toggle('visible', totalItems > 0);
    }
}

// --- CART MODAL LOGIC ---
function openCartModal() {
    renderCart();
    const modal = document.getElementById('cart-modal');
    const overlay = document.getElementById('cart-overlay');
    
    modal.classList.add('show');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Inicializar iconos de Lucide
    lucide.createIcons();
}

function closeCartModal() {
    const modal = document.getElementById('cart-modal');
    const overlay = document.getElementById('cart-overlay');
    
    modal.classList.remove('show');
    overlay.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Cerrar el carrito al hacer clic en el overlay
document.getElementById('cart-overlay').addEventListener('click', closeCartModal);

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total-price');
    const cartCount = document.getElementById('cart-item-count');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (!cartItems) return;
    
    // Clear current items
    cartItems.innerHTML = '';
    
    let total = 0;
    let itemCount = 0;
    
    // Add each item to the cart
    Object.entries(cart).forEach(([productId, quantity]) => {
        const product = PRODUCTS[productId];
        if (!product) return;
        
        const itemTotal = product.price * quantity;
        total += itemTotal;
        itemCount += quantity;
        
        // Crear elemento del ítem del carrito
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        
        // Obtener la ruta de la imagen (usar directamente el nombre del archivo)
        // Las imágenes están en la carpeta public, por lo que podemos acceder a ellas directamente
        const imageName = product.image.split('/').pop(); // Obtener solo el nombre del archivo
        const imagePath = `/${imageName}`; // Ruta relativa a la raíz del sitio
        
        itemElement.innerHTML = `
            <div class="cart-item-image">
                <img src="${imagePath}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/100?text=Imagen+no+disponible'">
            </div>
            <div class="cart-item-details">
                <h4>${product.name}</h4>
                <p>${product.size} • $${product.price.toFixed(2)} c/u</p>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn" onclick="event.stopPropagation(); updateCartItem('${productId}', -1)">-</button>
                <span>${quantity}</span>
                <button class="quantity-btn" onclick="event.stopPropagation(); updateCartItem('${productId}', 1)">+</button>
            </div>
            <div class="cart-item-total">$${itemTotal.toFixed(2)}</div>
            <button class="cart-item-remove" onclick="event.stopPropagation(); removeFromCart('${productId}')">
                <i data-lucide="x"></i>
            </button>
        `;
        
        cartItems.appendChild(itemElement);
    });
    
    // Update totals
    if (cartTotal) cartTotal.textContent = total.toFixed(2);
    if (cartCount) cartCount.textContent = itemCount;
    
    // Toggle checkout button
    if (checkoutBtn) {
        checkoutBtn.disabled = itemCount === 0;
        checkoutBtn.style.opacity = itemCount > 0 ? '1' : '0.5';
        checkoutBtn.style.cursor = itemCount > 0 ? 'pointer' : 'not-allowed';
    }
    
    // Show empty cart message if needed
    if (itemCount === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <i data-lucide="shopping-bag" style="width: 48px; height: 48px; margin-bottom: 1rem; opacity: 0.3;"></i>
                <p>El carrito está vacío</p>
                <p class="cart-empty-subtitle">¡Agrega productos para comenzar!</p>
            </div>`;
    }
    
    // Initialize Lucide icons for new elements
    if (window.lucide) {
        lucide.createIcons();
    }
}

function updateCartItem(productId, change) {
    const currentQty = cart[productId] || 0;
    const newQty = Math.max(0, currentQty + change);

    if (newQty === 0) {
        delete cart[productId];
    } else {
        cart[productId] = newQty;
    }

    localStorage.setItem('plantitudCart', JSON.stringify(cart));
    renderCart();
}

function updateCartItem(productId, change) {
    if (!cart[productId]) return;
    
    const newQuantity = cart[productId] + change;
    
    if (newQuantity <= 0) {
        // Si la cantidad es 0 o menos, eliminamos el producto
        removeFromCart(productId);
    } else {
        // Actualizamos la cantidad
        cart[productId] = newQuantity;
        localStorage.setItem('plantitudCart', JSON.stringify(cart));
        renderCart();
    }
    
    // Actualizar el contador del carrito
    updateCartCount();
}

function removeFromCart(productId) {
    delete cart[productId];
    localStorage.setItem('plantitudCart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

function sendWhatsAppQuote() {
    let total = 0;
    let message = `¡Hola! Me gustaría cotizar el siguiente pedido de Plantitud:\n\n`;

    for (const productId in cart) {
        const quantity = cart[productId];
        if (quantity > 0) {
            const product = PRODUCTS[productId];
            const subtotal = product.price * quantity;
            total += subtotal;
            message += `${quantity} x ${product.name} (${product.size}) - $${subtotal.toFixed(2)}\n`;
        }
    }

    message += `\n*Total estimado: $${total.toFixed(2)} MXN*\n\n`;
    message += `Por favor, confírmenme disponibilidad y costo de envío. ¡Gracias!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
    closeCartModal();
}

// --- SDK CONFIGURATION & INITIALIZATION ---
const defaultConfig = {
  hero_title: "Tu alternativa sustentable a la carne",
  hero_subtitle: "Productos deliciosos hechos a base de yaca, una opción saludable, versátil y amigable con el planeta",
  cta_button: "Explora nuestros productos",
  about_title: "¿Qué es la carne de yaca?",
  contact_title: "Contacto y Redes Sociales",
  whatsapp_number: WHATSAPP_NUMBER,
  instagram_handle: "@plantitud.mx",
  background_color: "#f0fdf4",
  primary_color: "#2f855a",
  text_color: "#2d3748",
  accent_color: "#1a4d2e",
  card_background: "#ffffff"
};

async function onConfigChange(config) {
  document.getElementById('heroTitle').textContent = config.hero_title || defaultConfig.hero_title;
  document.getElementById('heroSubtitle').textContent = config.hero_subtitle || defaultConfig.hero_subtitle;
  document.getElementById('ctaButton').textContent = config.cta_button || defaultConfig.cta_button;
  document.getElementById('aboutTitle').textContent = config.about_title || defaultConfig.about_title;
  document.getElementById('contactTitle').textContent = config.contact_title || defaultConfig.contact_title;

  const backgroundColor = config.background_color || defaultConfig.background_color;
  const primaryColor = config.primary_color || defaultConfig.primary_color;
  const textColor = config.text_color || defaultConfig.text_color;
  const accentColor = config.accent_color || defaultConfig.accent_color;
  const cardBackground = config.card_background || defaultConfig.card_background;

  document.documentElement.style.setProperty('--color-background', backgroundColor);
  document.documentElement.style.setProperty('--color-primary', primaryColor);
  document.documentElement.style.setProperty('--color-accent', accentColor);
  document.documentElement.style.setProperty('--color-text', textColor);
  document.documentElement.style.setProperty('--color-card', cardBackground);
  
  // Re-apply background gradients with new base color
  document.querySelectorAll('.hero, .process, .why-choose').forEach(el => {
    el.style.background = `linear-gradient(135deg, ${backgroundColor} 0%, #dcfce7 100%)`;
  });
  document.querySelectorAll('.benefit-card, .process-step, .reason-card, .product-card, .modal-content').forEach(el => {
    el.style.backgroundColor = cardBackground;
  });

  const ctaBuyButton = document.querySelector('.cta-buy-button');
  if(ctaBuyButton) {
    ctaBuyButton.style.backgroundColor = accentColor;
    // Re-establish hover states for colors
    ctaBuyButton.onmouseover = () => ctaBuyButton.style.backgroundColor = primaryColor;
    ctaBuyButton.onmouseout = () => ctaBuyButton.style.backgroundColor = accentColor;
  }
}

function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                const navLinks = document.getElementById('navLinks');
                if (navLinks) navLinks.classList.remove('active');
            }
        });
    });

    // Initialize Lucide icons
    if (window.lucide) {
        lucide.createIcons();
    }
    
    // Load cart on init
    renderCart();

    // Botón de volver arriba
    const backToTopButton = document.getElementById('backToTop');

    // Mostrar/ocultar el botón al hacer scroll
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });

    // Desplazamiento suave al hacer clic
    backToTopButton.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
});

// Initialize element SDK if available
window.onload = function() {
    if (window.lucide) {
        lucide.createIcons();
    }
    renderCart();

    if (window.elementSdk) {
      window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities: (config) => ({
          recolorables: [
            {
              get: () => config.background_color || defaultConfig.background_color,
              set: (value) => {
                config.background_color = value;
                window.elementSdk.setConfig({ background_color: value });
              }
            },
            {
              get: () => config.card_background || defaultConfig.card_background,
              set: (value) => {
                config.card_background = value;
                window.elementSdk.setConfig({ card_background: value });
              }
            },
            {
              get: () => config.text_color || defaultConfig.text_color,
              set: (value) => {
                config.text_color = value;
                window.elementSdk.setConfig({ text_color: value });
              }
            },
            {
              get: () => config.primary_color || defaultConfig.primary_color,
              set: (value) => {
                config.primary_color = value;
                window.elementSdk.setConfig({ primary_color: value });
              }
            },
            {
              get: () => config.accent_color || defaultConfig.accent_color,
              set: (value) => {
                config.accent_color = value;
                window.elementSdk.setConfig({ accent_color: value });
              }
            }
          ],
          borderables: [],
          fontEditable: undefined,
          fontSizeable: undefined
        }),
        mapToEditPanelValues: (config) => new Map([
          ["hero_title", config.hero_title || defaultConfig.hero_title],
          ["hero_subtitle", config.hero_subtitle || defaultConfig.hero_subtitle],
          ["cta_button", config.cta_button || defaultConfig.cta_button],
          ["about_title", config.about_title || defaultConfig.about_title],
          ["contact_title", config.contact_title || defaultConfig.contact_title],
          ["whatsapp_number", config.whatsapp_number || defaultConfig.whatsapp_number],
          ["instagram_handle", config.instagram_handle || defaultConfig.instagram_handle]
        ])
      });
    }
}
