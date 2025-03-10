document.addEventListener('DOMContentLoaded', () => {
  // Certifique-se de que a variável 'products' está definida corretamente
  if (!Array.isArray(products)) {
    console.error("A variável 'products' não está definida corretamente.");
    return;
  }

  // Exibe os produtos em destaque
  const featuredProductsContainer = document.getElementById('featured-products');
  
  if (featuredProductsContainer) {
    const featuredProducts = products.filter(product => product.featured);
    
    featuredProducts.forEach(product => {
      const productCard = createProductCard(product);
      featuredProductsContainer.appendChild(productCard);
    });
  }
  
  // Filtros de categorias
  const categories = document.querySelectorAll('.category');
  categories.forEach(category => {
    category.addEventListener('click', () => {
      const categoryName = category.querySelector('h3').textContent.toLowerCase();
      window.location.href = `/products?category=${categoryName}`;
    });
  });

  // Função de busca
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');

  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', () => {
      const searchTerm = searchInput.value.toLowerCase();
      console.log('Buscando por:', searchTerm);  // Verifica se o termo de busca está correto
      filterProducts(searchTerm);
    });

    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const searchTerm = searchInput.value.toLowerCase();
        console.log('Buscando por (Enter):', searchTerm);  // Verifica se o termo de busca está correto
        filterProducts(searchTerm);
      }
    });
  }

  // Filtra os produtos com base no termo de busca
  function filterProducts(searchTerm) {
    const filteredProducts = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );

    console.log('Produtos filtrados:', filteredProducts);  // Verifica os produtos filtrados

    displayProducts(filteredProducts);
  }

  // Exibe os produtos na página
  function displayProducts(filteredProducts) {
    const productsContainer = document.getElementById('products-container');
    if (productsContainer) {
      productsContainer.innerHTML = '';  // Limpa os resultados anteriores
      if (filteredProducts.length > 0) {
        filteredProducts.forEach(product => {
          const productCard = createProductCard(product);
          productsContainer.appendChild(productCard);
        });
      } else {
        // Caso não haja produtos, exibe uma mensagem
        productsContainer.innerHTML = '<p>Nenhum produto encontrado.</p>';
      }
    }
  }
});

// Cria o cartão do produto
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
  
  // Adiciona o evento de clique para adicionar ao carrinho
  const addToCartBtn = card.querySelector('.add-to-cart');
  addToCartBtn.addEventListener('click', () => {
    addToCart(product);
    showNotification('Produto adicionado ao carrinho!');
  });
  
  return card;
}

// Converte o código da categoria para o nome legível
function getCategoryName(category) {
  switch(category) {
    case 'feminino': return 'Moda Feminina';
    case 'masculino': return 'Moda Masculina';
    case 'acessorios': return 'Acessórios';
    default: return category;
  }
}

// Adiciona um produto ao carrinho
function addToCart(product) {
  const cart = getCart();
  
  const existingItemIndex = cart.findIndex(item => item.id === product.id);
  
  if (existingItemIndex !== -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }
  
  saveCart(cart);
}

// Exibe uma notificação de sucesso
function showNotification(message) {
  const notification = document.getElementById('notification');
  
  if (notification) {
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  }
}
