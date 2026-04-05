// ==========================================
// FOOD DATABASE (With Images)
// ==========================================
const menuData = {
    vegMomos: [
        { id: 'v1', name: 'Veg Steamed Momos', price: 60, desc: 'Classic steamed momos stuffed with fresh minced cabbage, carrot, and onion.', veg: true, bestSeller: true, img: 'veg_momos.png' },
        { id: 'v2', name: 'Veg Fried Momos', price: 70, desc: 'Crispy fried momos with a delicious crunchy exterior and soft veggie filling.', veg: true, bestSeller: false, img: 'veg_momos.png' },
        { id: 'v3', name: 'Veg Pan Fried Momos', price: 80, desc: 'Pan-tossed in a spicy schezwan sauce for a semi-gravy texture.', veg: true, bestSeller: false, img: 'veg_momos.png' },
        { id: 'v4', name: 'Veg Cheese Momos', price: 90, desc: 'Stuffed with melted cheese and sweet corn.', veg: true, bestSeller: true, img: 'veg_momos.png' }
    ],
    nonVegMomos: [
        { id: 'nv1', name: 'Chicken Steamed Momos', price: 80, desc: 'Juicy minced chicken blended with signature Himalayan spices.', veg: false, bestSeller: true, img: 'chicken_momos.png' },
        { id: 'nv2', name: 'Chicken Fried Momos', price: 90, desc: 'Deep-fried golden chicken momos. Super crunchy.', veg: false, bestSeller: false, img: 'chicken_momos.png' },
        { id: 'nv3', name: 'Chicken Kurkure Momos', price: 110, desc: 'Coated with crushed cornflakes and deep-fried to ultimate crispiness.', veg: false, bestSeller: false, img: 'chicken_momos.png' },
        { id: 'nv4', name: 'Chicken Tandoori Momos', price: 130, desc: 'Marinated in tandoori masala and roasted perfectly.', veg: false, bestSeller: true, img: 'chicken_momos.png' }
    ],
    chinese: [
        { id: 'c1', name: 'Veg Chowmein', price: 90, desc: 'Street-style spicy noodles tossed with fresh veggies.', veg: true, bestSeller: false, popular: true, img: 'hakka_noodles.png' },
        { id: 'c2', name: 'Egg Chowmein', price: 110, desc: 'Wok-tossed noodles with scrambled eggs and dark soy.', veg: false, bestSeller: false, popular: true, img: 'hakka_noodles.png' },
        { id: 'c3', name: 'Chicken Chowmein', price: 140, desc: 'Classic spicy noodles loaded with shredded chicken.', veg: false, bestSeller: false, popular: true, img: 'chicken_chowmein.png' },
        { id: 'c4', name: 'Chilli Potato', price: 100, desc: 'Crispy fried potato wedges tossed in a sweet & spicy sauce.', veg: true, bestSeller: false, popular: false, img: 'chilli_chicken.png' },
        { id: 'c5', name: 'Chilli Paneer', price: 150, desc: 'Diced paneer stir-fried with capsicum, onions, and hot chilli sauce.', veg: true, bestSeller: false, popular: false, img: 'chilli_chicken.png' },
        { id: 'c6', name: 'Veg Manchurian', price: 110, desc: 'Deep-fried veggie balls in a spicy tangy dark soy-based gravy.', veg: true, bestSeller: false, popular: false, img: 'chilli_chicken.png' },
        { id: 'c7', name: 'Chicken Manchurian', price: 150, desc: 'Juicy chicken dice coated and tossed in Chinese manchurian sauce.', veg: false, bestSeller: false, popular: false, img: 'chilli_chicken.png' }
    ]
};

// ==========================================
// STATE MANAGEMENT
// ==========================================
let cart = {}; // Format: { item_id: { item: Object, quantity: Number } }

// ==========================================
// DOM ELEMENTS
// ==========================================
const vegGrid = document.getElementById('veg-momos-grid');
const nonVegGrid = document.getElementById('non-veg-momos-grid');
const chineseGrid = document.getElementById('chinese-grid');

const floatingCartBtn = document.getElementById('floatingCartBtn');
const cartOverlay = document.getElementById('cartOverlay');
const closeCartBtn = document.getElementById('closeCart');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartTotalPriceEl = document.getElementById('cartTotalPrice');
const proceedToOrderBtn = document.getElementById('proceedToOrderBtn');
const cartCountEls = document.querySelectorAll('.cart-count');

const homeSection = document.getElementById('home');
const menuSection = document.getElementById('menu');
const offersSection = document.getElementById('offers');
const orderSection = document.getElementById('order');

const backToMenuBtn = document.getElementById('backToMenuBtn');
const checkoutItemsList = document.getElementById('checkoutItemsList');
const checkoutTotalVal = document.getElementById('checkoutTotalVal');
const orderForm = document.getElementById('orderForm');
const orderSuccessModal = document.getElementById('orderSuccessModal');

// ==========================================
// INITIALIZATION
// ==========================================
function init() {
    renderMenu();
    setupEventListeners();
    updateCartUI();
    initScrollAnimations();
}

// ==========================================
// ANIMATIONS
// ==========================================
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.scroll-fade');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(el => observer.observe(el));
}

// ==========================================
// RENDER MENU
// ==========================================
function renderMenu() {
    renderCategory(menuData.vegMomos, vegGrid);
    renderCategory(menuData.nonVegMomos, nonVegGrid);
    renderCategory(menuData.chinese, chineseGrid);
}

function renderCategory(items, container) {
    container.innerHTML = items.map(item => `
        <div class="food-card scroll-fade">
            ${item.popular ? '<div class="best-seller-badge" style="background-color: var(--primary-red); color: white;">Popular</div>' : item.bestSeller ? '<div class="best-seller-badge">Best Seller</div>' : ''}
            <div class="food-img-container">
                <img src="${item.img}" alt="${item.name}" loading="lazy">
            </div>
            <div class="food-card-body">
                <div class="food-card-header">
                    <div class="food-title">
                        <div class="food-badge ${item.veg ? 'veg' : 'non-veg'}"></div>
                        ${item.name}
                    </div>
                </div>
                <!-- Price moved slightly below title for cleaner layout -->
                <div class="food-price">₹${item.price}</div>
                <p class="food-desc">${item.desc}</p>
                <div class="food-card-footer" id="footer-${item.id}">
                    ${getCardFooterHTML(item.id)}
                </div>
            </div>
        </div>
    `).join('');
}

function getCardFooterHTML(id) {
    const qty = cart[id] ? cart[id].quantity : 0;
    if (qty === 0) {
        return `
            <button class="add-btn w-100" onclick="addToCart('${id}')">
                <i class='bx bx-plus'></i> Add to Cart
            </button>
        `;
    } else {
        return `
            <div class="qty-controls w-100" style="justify-content: space-between;">
                <button onclick="decreaseQty('${id}')"><i class='bx bx-minus'></i></button>
                <span>${qty}</span>
                <button onclick="increaseQty('${id}')"><i class='bx bx-plus'></i></button>
            </div>
        `;
    }
}

function updateCardFooter(id) {
    const footerEl = document.getElementById(`footer-${id}`);
    if (footerEl) {
        footerEl.innerHTML = getCardFooterHTML(id);
    }
}

function findItemById(id) {
    for (const category in menuData) {
        const found = menuData[category].find(item => item.id === id);
        if (found) return found;
    }
    return null;
}

// ==========================================
// CART FUNCTIONALITY
// ==========================================
window.addToCart = function(id) {
    if (!cart[id]) {
        cart[id] = { item: findItemById(id), quantity: 1 };
    }
    updateCartAndFooter(id);
    
    // Tiny animation feedback
    floatingCartBtn.style.transform = 'scale(1.2)';
    setTimeout(() => floatingCartBtn.style.transform = 'scale(1)', 200);
};

window.decreaseQty = function(id) {
    if (cart[id]) {
        cart[id].quantity -= 1;
        if (cart[id].quantity <= 0) delete cart[id];
    }
    updateCartAndFooter(id);
};

window.increaseQty = function(id) {
    if (cart[id]) cart[id].quantity += 1;
    updateCartAndFooter(id);
};

function updateCartAndFooter(id) {
    updateCartUI();
    updateCardFooter(id);
}

function updateCartUI() {
    const itemIds = Object.keys(cart);
    let totalQty = 0;
    let totalPrice = 0;
    
    if (itemIds.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart-message">
                <i class='bx bx-basket' style="font-size: 3rem; opacity: 0.5; margin-bottom: 10px;"></i><br>
                Your cart is empty.
            </div>`;
        proceedToOrderBtn.disabled = true;
    } else {
        proceedToOrderBtn.disabled = false;
        cartItemsContainer.innerHTML = '';
        
        itemIds.forEach(id => {
            const cartItem = cart[id];
            totalQty += cartItem.quantity;
            const itemTotal = cartItem.quantity * cartItem.item.price;
            totalPrice += itemTotal;
            
            cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-title">${cartItem.item.name}</div>
                        <div class="cart-item-price">₹${itemTotal} <small>(₹${cartItem.item.price} × ${cartItem.quantity})</small></div>
                    </div>
                    <div class="qty-controls" style="padding: 2px;">
                        <button onclick="decreaseQty('${id}')"><i class='bx bx-minus'></i></button>
                        <span>${cartItem.quantity}</span>
                        <button onclick="increaseQty('${id}')"><i class='bx bx-plus'></i></button>
                    </div>
                </div>
            `;
        });
    }
    
    cartTotalPriceEl.textContent = `₹${totalPrice}`;
    cartCountEls.forEach(el => el.textContent = totalQty);
}

// ==========================================
// EVENT LISTENERS & NAVIGATION
// ==========================================
function setupEventListeners() {
    floatingCartBtn.addEventListener('click', () => {
        cartOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeCartBtn.addEventListener('click', () => {
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    cartOverlay.addEventListener('click', (e) => {
        if (e.target === cartOverlay) {
            cartOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    proceedToOrderBtn.addEventListener('click', () => {
        cartOverlay.classList.remove('active');
        document.body.style.overflow = '';
        
        homeSection.style.display = 'none';
        menuSection.style.display = 'none';
        offersSection.style.display = 'none';
        document.querySelector('.reviews').style.display = 'none';
        orderSection.style.display = 'block';
        
        floatingCartBtn.style.display = 'none';
        
        window.scrollTo(0, 0);
        // Add scroll-fade trigger for order section
        setTimeout(() => orderSection.classList.add('visible'), 50);
        renderCheckoutSummary();
    });

    backToMenuBtn.addEventListener('click', () => {
        orderSection.style.display = 'none';
        
        homeSection.style.display = 'flex';
        menuSection.style.display = 'block';
        offersSection.style.display = 'block';
        document.querySelector('.reviews').style.display = 'block';
        
        floatingCartBtn.style.display = 'flex';
        
        window.scrollTo(0, 0);
    });

    orderForm.addEventListener('submit', generateWhatsAppMessage);
}

// ==========================================
// CHECKOUT & WHATSAPP GENERATOR
// ==========================================
function renderCheckoutSummary() {
    checkoutItemsList.innerHTML = '';
    let totalPrice = 0;
    
    Object.keys(cart).forEach(id => {
        const cartItem = cart[id];
        const itemTotal = cartItem.quantity * cartItem.item.price;
        totalPrice += itemTotal;
        
        checkoutItemsList.innerHTML += `
            <div class="checkout-item">
                <span>${cartItem.quantity}x ${cartItem.item.name}</span>
                <span>₹${itemTotal}</span>
            </div>
        `;
    });
    
    checkoutTotalVal.textContent = `₹${totalPrice}`;
}

function generateWhatsAppMessage(e) {
    e.preventDefault();
    
    const name = document.getElementById('userName').value.trim();
    const phone = document.getElementById('userPhone').value.trim();
    const address = document.getElementById('userAddress').value.trim();
    
    if(!name || !phone || !address) return;
    
    let message = `*NEW ORDER - Himalaya Fast Food*🍜\n\n`;
    message += `*Customer Info:*\n`;
    message += `👤 Name: ${name}\n`;
    message += `📞 Phone: ${phone}\n`;
    message += `📍 Address: ${address}\n\n`;
    
    message += `*Order Details:*\n`;
    
    let totalPrice = 0;
    Object.keys(cart).forEach((id, index) => {
        const cartItem = cart[id];
        const itemTotal = cartItem.quantity * cartItem.item.price;
        totalPrice += itemTotal;
        message += `${index + 1}. ${cartItem.item.name} x${cartItem.quantity} - ₹${itemTotal}\n`;
    });
    
    message += `\n*Total Payable: ₹${totalPrice}*\n`;
    message += `\nPlease confirm my order. Thank you!`;
    
    const encodedMessage = encodeURIComponent(message);
    const storeWhatsAppNumber = "918471012563"; 
    const whatsappUrl = `https://wa.me/${storeWhatsAppNumber}?text=${encodedMessage}`;
    
    // Show Success Modal
    orderSuccessModal.classList.add('active');
    
    // Redirect after 2.5 seconds
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        
        // Reset state
        orderSuccessModal.classList.remove('active');
        cart = {};
        updateCartUI();
        
        // Render updated empty footers
        Object.keys(menuData).forEach(cat => {
            menuData[cat].forEach(item => updateCardFooter(item.id));
        });
        
        backToMenuBtn.click(); // go back to menu
    }, 2500);
}

// Bootstrap
document.addEventListener('DOMContentLoaded', init);
