document.addEventListener('DOMContentLoaded', () => {
  // Load featured products on the home page
  const featuredProductsContainer = document.getElementById('featured-products');
  
  if (featuredProductsContainer) {
    // Filter featured products
    const featuredProducts = products.filter(product => product.featured);
    
    // Display featured products
    featuredProducts.forEach(product => {
      const productCard = createProductCard(product);
      featuredProductsContainer.appendChild(productCard);
    });
  }
  
  // Handle category clicks
  const categories = document.querySelectorAll('.category');
  categories.forEach(category => {
    category.addEventListener('click', () => {
      const categoryName = category.querySelector('h3').textContent.toLowerCase();
      window.location.href = `/products?category=${categoryName}`;
    });
  });

  // Button search functionality
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');

  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      const searchTerm = searchInput.value.toLowerCase();
      console.log('Termo de busca:', searchTerm); // Depuração
      filterProducts(searchTerm);
    });

    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const searchTerm = searchInput.value.toLowerCase();
        console.log('Termo de busca (Enter):', searchTerm); // Depuração
        filterProducts(searchTerm);
      }
    });
  }

  // Filter products based on search term
  function filterProducts(searchTerm) {
    const filteredProducts = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );

    console.log('Produtos filtrados:', filteredProducts); // Depuração

    displayProducts(filteredProducts);
  }

  // Display products on the page
  function displayProducts(products) {
    const productsContainer = document.getElementById('products-container');
    if (productsContainer) {
      productsContainer.innerHTML = ''; // Clear previous results
      if (products.length > 0) {
        products.forEach(product => {
          const productCard = createProductCard(product);
          productsContainer.appendChild(productCard);
        });
      } else {
        // If no products found, show a message
        productsContainer.innerHTML = '<p>Nenhum produto encontrado.</p>';
      }
    }
  }
});

// Create a product card element
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
  
  // Add event listener to the add to cart button
  const addToCartBtn = card.querySelector('.add-to-cart');
  addToCartBtn.addEventListener('click', () => {
    addToCart(product);
    showNotification('Produto adicionado ao carrinho!');
  });
  
  return card;
}

// Convert category code to display name
function getCategoryName(category) {
  switch(category) {
    case 'feminino': return 'Moda Feminina';
    case 'masculino': return 'Moda Masculina';
    case 'acessorios': return 'Acessórios';
    default: return category;
  }
}

// Add a product to the cart
function addToCart(product) {
  const cart = getCart();
  
  // Check if the product is already in the cart
  const existingItemIndex = cart.findIndex(item => item.id === product.id);
  
  if (existingItemIndex !== -1) {
    // If the product is already in the cart, increase the quantity
    cart[existingItemIndex].quantity += 1;
  } else {
    // If the product is not in the cart, add it with quantity 1
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }
  
  // Save the updated cart to localStorage
  saveCart(cart);
}

// Show notification
function showNotification(message) {
  const notification = document.getElementById('notification');
  
  if (notification) {
    notification.textContent = message;
    notification.classList.add('show');
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  }
}
