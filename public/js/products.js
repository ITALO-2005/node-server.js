document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products-container');
    const categoryFilters = document.querySelectorAll('input[name="category"]');
    const priceFilters = document.querySelectorAll('input[name="price"]');

    // Carrega os produtos ao carregar a página
    loadProducts();

    // Adiciona listeners para os filtros de categoria
    categoryFilters.forEach(filter => {
        filter.addEventListener('change', () => {
            loadProducts();
        });
    });

    // Adiciona listeners para os filtros de preço
    priceFilters.forEach(filter => {
        filter.addEventListener('change', () => {
            loadProducts();
        });
    });

    function loadProducts() {
        const selectedCategory = document.querySelector('input[name="category"]:checked').value;
        const selectedPrice = document.querySelector('input[name="price"]:checked').value;

        // Filtra os produtos com base na categoria e no preço selecionados
        const filteredProducts = products.filter(product => {
            const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
            const matchesPrice = selectedPrice === 'all' || (
                (selectedPrice === 'low' && product.price <= 50) ||
                (selectedPrice === 'medium' && product.price > 50 && product.price <= 100) ||
                (selectedPrice === 'high' && product.price > 100)
            );
            return matchesCategory && matchesPrice;
        });

        // Exibe os produtos filtrados
        displayProducts(filteredProducts);
    }

    function displayProducts(products) {
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const productCard = createProductCard(product);
            productsContainer.appendChild(productCard);
        });
    }

    function createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">R$ ${product.price.toFixed(2)}</p>
                <p class="category">${getCategoryName(product.category)}</p>
                <button class="add-to-cart" data-id="${product.id}">
                    <i class="fas fa-cart-plus"></i> Adicionar ao Carrinho
                </button>
            </div>
        `;
        
        // Adiciona evento de clique ao botão "Adicionar ao Carrinho"
        const addToCartBtn = card.querySelector('.add-to-cart');
        addToCartBtn.addEventListener('click', () => {
            addToCart(product);
            showNotification('Produto adicionado ao carrinho!');
        });
        
        return card;
    }

    function getCategoryName(category) {
        switch(category) {
            case 'feminino': return 'Moda Feminina';
            case 'masculino': return 'Moda Masculina';
            case 'acessorios': return 'Acessórios';
            default: return category;
        }
    }

    function addToCart(product) {
        const cart = getCart();
        
        // Verifica se o produto já está no carrinho
        const existingItemIndex = cart.findIndex(item => item.id === product.id);
        
        if (existingItemIndex !== -1) {
            // Se o produto já está no carrinho, aumenta a quantidade
            cart[existingItemIndex].quantity += 1;
        } else {
            // Se o produto não está no carrinho, adiciona com quantidade 1
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }
        
        // Salva o carrinho atualizado no localStorage
        saveCart(cart);
    }

    function showNotification(message) {
        const notification = document.getElementById('notification');
        
        if (notification) {
            notification.textContent = message;
            notification.classList.add('show');
            
            // Esconde a notificação após 3 segundos
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }
    }

    function getCart() {
        return JSON.parse(localStorage.getItem('cart')) || [];
    }

    function saveCart(cart) {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }

    function updateCartCount() {
        const cart = getCart();
        const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
        
        // Atualiza o contador do carrinho em todas as páginas
        const cartCountElements = document.querySelectorAll('#cart-count');
        cartCountElements.forEach(element => {
            element.textContent = cartCount;
        });
    }
});