document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSubtotal = document.getElementById('cart-subtotal');
    const cartShipping = document.getElementById('cart-shipping');
    const cartTotal = document.getElementById('cart-total');
    const emptyCartMessage = document.getElementById('empty-cart');
    const checkoutForm = document.getElementById('checkout-form');
    const orderConfirmation = document.getElementById('order-confirmation');
    
    loadCartItems();
    
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', handleCheckout);
    }
    
    const closeModal = document.querySelector('.close-modal');
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            orderConfirmation.classList.remove('show');
        });
    }
    
    function handleCheckout(e) {
        e.preventDefault();
        
        const cart = getCart();
        if (cart.length === 0) {
            alert('Seu carrinho está vazio');
            return;
        }

        const formData = new FormData(checkoutForm);
        const customerData = Object.fromEntries(formData.entries());
        
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const shipping = subtotal > 200 ? 0 : 15;
        const total = subtotal + shipping;

        const orderData = {
            customer: customerData,
            items: cart,
            subtotal: subtotal,
            shipping: shipping,
            total: total
        };

        sendOrderToWhatsApp(orderData);
    }

    function sendOrderToWhatsApp(orderData) {
        const phoneNumber = "5583986696637";
        let message = `*Pedido de Cliente*\n`;
        
        if (orderData.customer.name) {
            message += `👤 Cliente: ${orderData.customer.name}\n`;
        }
        
        message += `📦 Itens do Pedido:\n`;
        orderData.items.forEach(item => {
            message += `- ${item.quantity}x ${item.name} - R$${item.price.toFixed(2)}\n`;
        });
        
        message += `\n💰 Subtotal: R$ ${orderData.subtotal.toFixed(2)}`;
        message += `\n🚚 Frete: ${orderData.shipping === 0 ? 'Grátis' : `R$ ${orderData.shipping.toFixed(2)}`}`;
        message += `\n🛒 Total: R$ ${orderData.total.toFixed(2)}`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, "_blank");
    }

    function loadCartItems() {
        const cart = getCart();
        if (cart.length === 0) {
            cartItemsContainer.parentElement.classList.add('hidden');
            emptyCartMessage.classList.remove('hidden');
            return;
        }
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            const cartItem = createCartItem(item);
            cartItemsContainer.appendChild(cartItem);
        });
        updateCartSummary();
    }

    function createCartItem(item) {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p class="price">R$ ${item.price.toFixed(2)}</p>
                <button class="remove-item" data-id="${item.id}">Remover</button>
            </div>
        `;
        cartItem.querySelector('.remove-item').addEventListener('click', () => removeFromCart(item.id));
        return cartItem;
    }

    function getCart() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }

    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function removeFromCart(itemId) {
        let cart = getCart();
        cart = cart.filter(item => item.id !== itemId);
        saveCart(cart);
        loadCartItems();
    }

    function updateCartSummary() {
        const cart = getCart();
        const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        const shipping = subtotal > 200 ? 0 : 15;
        const total = subtotal + shipping;
        cartSubtotal.textContent = `R$ ${subtotal.toFixed(2)}`;
        cartShipping.textContent = shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2)}`;
        cartTotal.textContent = `R$ ${total.toFixed(2)}`;
    }
});
