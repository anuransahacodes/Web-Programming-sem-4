// Task 2: Product Data
const products = [
    { id: 1, name: "Wireless Headphones", price: 99.99, desc: "Noise-cancelling over-ear headphones with 30hr battery." },
    { id: 2, name: "Smart Fitness Watch", price: 149.50, desc: "Tracks heart rate, sleep, and daily steps." },
    { id: 3, name: "Bluetooth Speaker", price: 45.00, desc: "Portable, waterproof speaker with heavy bass." }
];

// Task 7 Bonus: Retrieve cart from Local Storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Render Products to the page
function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.desc}</p>
            <h4>$${product.price.toFixed(2)}</h4>
            <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(card);
    });
}

// Render Cart items and calculate totals
function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="color: #7f8c8d; text-align: center; padding: 10px;">Your cart is empty.</p>';
    }

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
            <div>
                <strong>${item.name}</strong> <br>
                $${item.price.toFixed(2)} x ${item.quantity}
            </div>
            <div>
                <button class="qty-btn" onclick="updateQty(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" onclick="updateQty(${index}, 1)">+</button>
                <button class="btn remove-btn" onclick="removeItem(${index})">X</button>
            </div>
        `;
        cartItems.appendChild(div);
    });
    
    // Update Total and Local Storage
    cartTotal.innerText = total.toFixed(2);
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Task 4: Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    renderCart();
}

// Update item quantity
function updateQty(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    renderCart();
}

// Remove item completely
function removeItem(index) {
    cart.splice(index, 1);
    renderCart();
}

// Task 6: Checkout Simulation
document.getElementById('checkout-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent page reload
    
    if(cart.length === 0) {
        alert("Your cart is empty! Please add items before checking out.");
        return;
    }
    
    const name = document.getElementById('cust-name').value;
    alert(`Thank you for your purchase, ${name}! Your order has been confirmed.`);
    
    // Clear the cart and reset the form
    cart = [];
    renderCart();
    this.reset();
});

// Initialize the page on load
renderProducts();
renderCart();