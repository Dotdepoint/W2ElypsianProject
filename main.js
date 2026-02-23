// ==========================================
        // DATA: MENU ITEMS
        // ==========================================
        // Array of objects representing available menu items.
        // Each object contains properties used to render cards and manage cart state.
        
        const menuData = [
            {
                id: 1,                                    // Unique identifier for the item
                name: "Truffle Porcini Risotto",          // Display name
                description: "Arborio rice slowly cooked in saffron broth, finished with wild porcini mushrooms and fresh black truffle shavings.", // Detailed description
                price: 32,                                // Price in dollars (number for calculations)
                category: "mains",                        // Category for filtering
                categoryDisplay: "Vegetarian",            // Display text for category tag
                image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&h=300&fit=crop" // Placeholder image URL
            },
            {
                id: 2,
                name: "Burrata & Heirloom Tomato",
                description: "Creamy Puglian burrata served with vine-ripened heirloom tomatoes, cold-pressed olive oil, and aged balsamic reduction.",
                price: 18,
                category: "starters",
                categoryDisplay: "Vegetarian",
                image: "./assets/Tomato.jpg"
            },
            {
                id: 3,
                name: "Seared Scallops with Pea Puree",
                description: "Pan-seared Hokkaido scallops over a vibrant sweet pea puree with crispy pancetta crumbles.",
                price: 24,
                category: "starters",
                categoryDisplay: "Seafood",
                image: "./assets/SearedSca.jpg"
            },
            {
                id: 4,
                name: "Wagyu Ribeye Steak",
                description: "A5 Japanese Wagyu ribeye, charcoal grilled, served with roasted root vegetables and red wine jus.",
                price: 85,
                category: "mains",
                categoryDisplay: "Premium",
                image: "./assets/Wagyu.jpg"
            },
            {
                id: 5,
                name: "Lobster Thermidor",
                description: "Classic French delicacy featuring tender lobster meat in a rich, creamy brandy sauce, gratinated with Gruyère.",
                price: 68,
                category: "mains",
                categoryDisplay: "Seafood",
                image: "./assets/Lobster.png"
            },
            {
                id: 6,
                name: "Coastal Oysters",
                description: "Six freshly shucked Kumamoto oysters served on crushed ice with champagne mignonette and fresh lemon.",
                price: 28,
                category: "starters",
                categoryDisplay: "Seafood",
                image: "./assets/CoastalOysters.png"
            },
            {
                id: 7,
                name: "Dark Chocolate Lava Cake",
                description: "Warm, molten center 70% dark chocolate cake served with Madagascar vanilla bean gelato.",
                price: 14,
                category: "desserts",
                categoryDisplay: "Dessert",
                image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&h=300&fit=crop"
            },
            {
                id: 8,
                name: "Smoked Salmon Carpaccio",
                description: "Thinly sliced Scottish smoked salmon with capers, red onions, and lemon zest emulsion.",
                price: 22,
                category: "starters",
                categoryDisplay: "Light",
                image: "./assets/SmSalmon.png"
            },
            {
                id: 9,
                name: "Garden Herb Gnocchi",
                description: "Handmade potato gnocchi tossed in a light herb butter sauce with toasted pine nuts.",
                price: 26,
                category: "mains",
                categoryDisplay: "Vegetarian",
                image: "./assets/Gherb.png"
            },
            {
                id: 10,
                name: "Signature Martini",
                description: "Our house special martini with dry vermouth, premium gin, and a hint of cucumber.",
                price: 16,
                category: "drinks",
                categoryDisplay: "Alcoholic",
                image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop"
            }
        ];

        // ==========================================
        // STATE MANAGEMENT
        // ==========================================
        // Object to track application state.
        // cart: array of objects with id, quantity for each item added
        // currentCategory: string tracking active filter tab
        
        let state = {
            cart: [],                                 // Empty array initially
            currentCategory: 'all',                    // Default to showing all items
            searchQuery: ''
        };

        // ==========================================
        // DOM ELEMENT REFERENCES
        // ==========================================
        // Cache references to DOM elements for performance.
        // Querying DOM is expensive, so we do it once on load.
        
        const elements = {
            menuGrid: document.getElementById('menuGrid'),           // Container for menu cards
            cartItems: document.getElementById('cartItems'),         // Desktop cart items container
            mobileCartItems: document.getElementById('mobileCartItems'), // Mobile cart items container
            cartSummary: document.getElementById('cartSummary'),     // Desktop summary section
            mobileCartSummary: document.getElementById('mobileCartSummary'), // Mobile summary
            emptyCart: document.getElementById('emptyCart'),         // Desktop empty state
            mobileEmptyCart: document.getElementById('mobileEmptyCart'), // Mobile empty state
            checkoutBtn: document.getElementById('checkoutBtn'),     // Desktop checkout button
            mobileCheckoutBtn: document.getElementById('mobileCheckoutBtn'), // Mobile checkout
            secureText: document.getElementById('secureText'),       // Desktop secure text
            mobileSecureText: document.getElementById('mobileSecureText'), // Mobile secure text
            subtotal: document.getElementById('subtotal'),           // Desktop subtotal display
            tax: document.getElementById('tax'),                     // Desktop tax display
            total: document.getElementById('total'),                 // Desktop total display
            mobileSubtotal: document.getElementById('mobileSubtotal'), // Mobile subtotal
            mobileGratuity: document.getElementById('mobileGratuity'), // Mobile gratuity (different from desktop)
            mobileTotal: document.getElementById('mobileTotal'),     // Mobile total
            headerCartBadge: document.getElementById('headerCartBadge'), // Header cart count badge
            mobileCartCount: document.getElementById('mobileCartCount'), // Mobile button count
            mobileCartModal: document.getElementById('mobileCartModal'), // Mobile modal container
            itemCount: document.getElementById('itemCount'),          // "Curating X delicacies" text
            searchInput: document.querySelector('.search-input'),
            searchBtn: document.querySelector('.search-btn'),

        };

        // ==========================================
        // INITIALIZATION
        // ==========================================
        // Run when DOM is fully loaded.
        // Sets up initial render and event listeners.
        
        document.addEventListener('DOMContentLoaded', () => {
            renderMenu();                             // Render initial menu items
            setupEventListeners();                    // Attach event handlers
            updateCartUI();                           // Initial cart state (empty)
        });

        // ==========================================
        // EVENT LISTENERS SETUP
        // ==========================================
        // Attach click handlers to interactive elements.
        // Separated from initialization for cleaner code organization.
        
        function setupEventListeners() {
            // Get all tab buttons for category filtering
            const tabButtons = document.querySelectorAll('.tab-btn');
            
            // Loop through each button and attach click handler
            tabButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    // Get category from data attribute
                    const category = e.target.dataset.category;
                    
                    // Update active tab styling
                    tabButtons.forEach(btn => {
                        btn.classList.remove('active');
                        btn.setAttribute('aria-selected', 'false');
                    });
                    e.target.classList.add('active');
                    e.target.setAttribute('aria-selected', 'true');
                    
                    // Update state and re-render menu
                    state.currentCategory = category;
                    renderMenu();
                });
            });

            // Header cart toggle (opens mobile cart on mobile devices)
            document.querySelector('.cart-toggle').addEventListener('click', () => {
                // Only open modal on mobile (desktop shows sidebar always)
                if (window.innerWidth < 1024) {
                    openMobileCart();
                }
            });
            elements.searchInput.addEventListener('input', (e) => {
                state.searchQuery = e.target.value.toLowerCase();
                renderMenu();
});

        }

        // ==========================================
        // MENU RENDERING
        // ==========================================
        // Generates HTML for menu cards based on current category filter.
        // Uses template literals (backticks) for readable HTML generation.
        
        function renderMenu() {
            // Filter items based on current category
            // If 'all', use entire array; otherwise filter by category property
            let filteredItems = menuData;

                // Category filtering
                if (state.currentCategory !== 'all') {
                    filteredItems = filteredItems.filter(item =>
                        item.category === state.currentCategory
                    );
                }

                // Search filtering
                if (state.searchQuery) {
                    filteredItems = filteredItems.filter(item =>
                        item.name.toLowerCase().includes(state.searchQuery) ||
                        item.description.toLowerCase().includes(state.searchQuery)
                    );
                }

            
            // Update item count display
            elements.itemCount.textContent = filteredItems.length;
            
            // Generate HTML for each item and join into single string
            // map() transforms each data object into HTML string
            // join('') combines array of strings into single string
            elements.menuGrid.innerHTML = filteredItems.map(item => `
                <!-- 
                    MENU CARD:
                    article tag for semantic card structure.
                    data-id attribute stores item ID for click handlers.
                -->
                <article class="menu-card" data-id="${item.id}">
                    <!-- Image container with price badge overlay -->
                    <div class="card-image">
                        <img src="${item.image}" alt="${item.name}" loading="lazy">
                        <!-- Price badge positioned absolute over image -->
                        <span class="price-badge">$${item.price}</span>
                    </div>
                    
                    <!-- Content section -->
                    <div class="card-content">
                        <h3 class="card-title">${item.name}</h3>
                        <p class="card-description">${item.description}</p>
                        
                        <!-- Footer with category and add button -->
                        <div class="card-footer">
                            <span class="category-tag">${item.categoryDisplay}</span>
                            <!-- 
                                ADD BUTTON:
                                onclick calls addToCart with item ID.
                                aria-label describes action for screen readers.
                            -->
                            <button 
                                class="add-btn" 
                                onclick="addToCart(${item.id})"
                                aria-label="Add ${item.name} to cart"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </article>
            `).join('');
        }

        // ==========================================
        // CART FUNCTIONALITY
        // ==========================================
        
        /**
         * Adds item to cart or increments quantity if already exists.
         * @param {number} itemId - The ID of the menu item to add
         */
        function addToCart(itemId) {
            // Check if item already exists in cart using find()
            const existingItem = state.cart.find(item => item.id === itemId);
            
            if (existingItem) {
                // If exists, increment quantity
                existingItem.quantity += 1;
            } else {
                // If new, add to cart with quantity 1
                // Find full item details from menuData
                const item = menuData.find(item => item.id === itemId);
                state.cart.push({
                    id: itemId,
                    quantity: 1,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                    category: item.categoryDisplay
                });
            }
            
            // Update UI to reflect changes
            updateCartUI();
        }

        /**
         * Removes item completely from cart regardless of quantity.
         * @param {number} itemId - The ID of the item to remove
         */
        function removeFromCart(itemId) {
            // filter() creates new array excluding the item with matching ID
            state.cart = state.cart.filter(item => item.id !== itemId);
            updateCartUI();
        }

        /**
         * Updates quantity of specific item in cart.
         * @param {number} itemId - The ID of the item to update
         * @param {number} change - Amount to change (+1 or -1)
         */
        function updateQuantity(itemId, change) {
            // Find the item in cart
            const cartItem = state.cart.find(item => item.id === itemId);
            
            if (cartItem) {
                // Calculate new quantity
                const newQuantity = cartItem.quantity + change;
                
                if (newQuantity > 0) {
                    // If still positive, update quantity
                    cartItem.quantity = newQuantity;
                } else {
                    // If zero or negative, remove item entirely
                    removeFromCart(itemId);
                    return;                       // Exit early since updateCartUI called in remove
                }
                
                updateCartUI();
            }
        }

        // ==========================================
        // UI UPDATES
        // ==========================================
        
        /**
         * Updates all cart-related UI elements.
         * Called whenever cart state changes.
         */
        function updateCartUI() {
            // Calculate totals
            const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            const tax = Math.round(subtotal * 0.08);  // 8% marine tax
            const total = subtotal + tax;
            const gratuity = Math.round(subtotal * 0.15); // 15% for mobile
            const mobileTotal = subtotal + gratuity;
            const itemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

            // Update header badge
            if (itemCount > 0) {
                elements.headerCartBadge.textContent = itemCount;
                elements.headerCartBadge.classList.remove('hidden');
                elements.mobileCartCount.textContent = itemCount;
            } else {
                elements.headerCartBadge.classList.add('hidden');
                elements.mobileCartCount.textContent = '0';
            }

            // Render cart items (both desktop and mobile)
            const cartHTML = state.cart.map(item => `
                <!-- 
                    CART ITEM:
                    Grid layout with image, details, and price.
                -->
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    
                    <div class="cart-item-details">
                        <span class="cart-item-name">${item.name}</span>
                        <!-- Quantity controls -->
                        <div class="quantity-controls">
                            <button 
                                class="qty-btn" 
                                onclick="updateQuantity(${item.id}, -1)"
                                ${item.quantity <= 1 ? 'disabled' : ''}
                                aria-label="Decrease quantity"
                            >−</button>
                            <span class="qty-display">${item.quantity}</span>
                            <button 
                                class="qty-btn" 
                                onclick="updateQuantity(${item.id}, 1)"
                                aria-label="Increase quantity"
                            >+</button>
                        </div>
                    </div>
                    
                    <div style="display: flex; align-items: center; gap: var(--space-2);">
                        <span class="cart-item-price">$${item.price * item.quantity}</span>
                        <button 
                            class="remove-btn" 
                            onclick="removeFromCart(${item.id})"
                            aria-label="Remove ${item.name} from cart"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            `).join('');

            // Update both desktop and mobile cart containers
            elements.cartItems.innerHTML = cartHTML;
            elements.mobileCartItems.innerHTML = cartHTML;

            // Toggle empty state vs items view
            if (state.cart.length === 0) {
                // Show empty states
                elements.emptyCart.classList.remove('hidden');
                elements.mobileEmptyCart.classList.remove('hidden');
                elements.cartItems.classList.add('hidden');
                elements.mobileCartItems.classList.add('hidden');
                
                // Hide summary and checkout
                elements.cartSummary.classList.add('hidden');
                elements.mobileCartSummary.classList.add('hidden');
                elements.checkoutBtn.classList.add('hidden');
                elements.mobileCheckoutBtn.classList.add('hidden');
                elements.secureText.classList.add('hidden');
                elements.mobileSecureText.classList.add('hidden');
            } else {
                // Show items
                elements.emptyCart.classList.add('hidden');
                elements.mobileEmptyCart.classList.add('hidden');
                elements.cartItems.classList.remove('hidden');
                elements.mobileCartItems.classList.remove('hidden');
                
                // Show summary and checkout
                elements.cartSummary.classList.remove('hidden');
                elements.mobileCartSummary.classList.remove('hidden');
                elements.checkoutBtn.classList.remove('hidden');
                elements.mobileCheckoutBtn.classList.remove('hidden');
                elements.secureText.classList.remove('hidden');
                elements.mobileSecureText.classList.remove('hidden');
                
                // Update price displays
                elements.subtotal.textContent = `$${subtotal}`;
                elements.tax.textContent = `$${tax}`;
                elements.total.textContent = `$${total}`;
                
                elements.mobileSubtotal.textContent = `$${subtotal}`;
                elements.mobileGratuity.textContent = `$${gratuity}`;
                elements.mobileTotal.textContent = `$${mobileTotal}`;
            }
        }

        // ==========================================
        // MOBILE MODAL CONTROLS
        // ==========================================
        
        /**
         * Opens mobile cart modal.
         * Adds 'active' class to display modal.
         * Prevents body scroll while modal is open.
         */
        function openMobileCart() {
            elements.mobileCartModal.classList.add('active');
            document.body.style.overflow = 'hidden';  // Prevent background scrolling
        }

        /**
         * Closes mobile cart modal.
         * Removes 'active' class to hide modal.
         * Restores body scroll.
         */
        function closeMobileCart() {
            elements.mobileCartModal.classList.remove('active');
            document.body.style.overflow = '';        // Restore scrolling
        }

        /**
         * Handles checkout button click.
         * Shows alert with order summary (placeholder for real checkout).
         */
        function handleCheckout() {
            const total = elements.total.textContent;
            const itemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
            
            // Simple confirmation dialog
            // In production, this would redirect to payment processor
            alert(`Thank you for your order!\n\nItems: ${itemCount}\nTotal: ${total}\n\nYour culinary experience awaits.`);
            
            // Optional: Clear cart after checkout
            // state.cart = [];
            // updateCartUI();
            // closeMobileCart();
        }

        // ==========================================
        // KEYBOARD ACCESSIBILITY
        // ==========================================
        // Close mobile modal on Escape key press
        
        document.addEventListener('keydown', (e) => {
            // Check if Escape key pressed and modal is open
            if (e.key === 'Escape' && elements.mobileCartModal.classList.contains('active')) {
                closeMobileCart();
            }
        });

        // ==========================================
        // RESPONSIVE HANDLING
        // ==========================================
        // Close mobile modal if window resized to desktop
        
        window.addEventListener('resize', () => {
            // If window is now desktop size and modal is open, close it
            if (window.innerWidth >= 1024 && elements.mobileCartModal.classList.contains('active')) {
                closeMobileCart();
            }
        });