// Product data (in a real application, this would come from a database)
const products = [
    {
      id: 1,
      name: "Vestido Floral",
      category: "feminino",
      price: 129.90,
      image: "images/product-1.jpg",
      description: "Vestido floral elegante, perfeito para ocasiões especiais e dias de verão.",
      featured: true
    },
    {
      id: 2,
      name: "Camisa Social Slim",
      category: "masculino",
      price: 89.90,
      image: "images/product-2.jpg",
      description: "Camisa social de corte slim, ideal para o ambiente de trabalho ou eventos formais.",
      featured: true
    },
    {
      id: 3,
      name: "Bolsa de Couro",
      category: "acessorios",
      price: 149.90,
      image: "images/product-3.jpg",
      description: "Bolsa de couro genuíno, espaçosa e elegante para complementar qualquer look.",
      featured: true
    },
    {
      id: 4,
      name: "Tênis Casual",
      category: "masculino",
      price: 159.90,
      image: "images/product-4.jpg",
      description: "Tênis casual confortável, perfeito para o dia a dia e looks descontraídos.",
      featured: true
    },
    {
      id: 5,
      name: "Blusa de Tricô",
      category: "feminino",
      price: 79.90,
      image: "images/product-5.jpg",
      description: "Blusa de tricô quentinha e estilosa para os dias mais frios."
    },
    {
      id: 6,
      name: "Calça Jeans Skinny",
      category: "feminino",
      price: 119.90,
      image: "images/product-6.jpg",
      description: "Calça jeans skinny de alta qualidade, confortável e versátil."
    },
    {
      id: 7,
      name: "Relógio Analógico",
      category: "acessorios",
      price: 199.90,
      image: "images/product-7.jpg",
      description: "Relógio analógico elegante, com pulseira de couro e design atemporal."
    },
    {
      id: 8,
      name: "Bermuda Cargo",
      category: "masculino",
      price: 89.90,
      image: "images/product-8.jpg",
      description: "Bermuda cargo confortável, com vários bolsos e perfeita para o verão."
    },
    {
      id: 9,
      name: "Óculos de Sol",
      category: "acessorios",
      price: 119.90,
      image: "images/product-9.jpg",
      description: "Óculos de sol com proteção UV, estiloso e durável."
    },
    {
      id: 10,
      name: "Vestido Midi",
      category: "feminino",
      price: 139.90,
      image: "images/product-10.jpg",
      description: "Vestido midi elegante, com corte moderno e tecido de alta qualidade."
    },
    {
      id: 11,
      name: "Camisa Polo",
      category: "masculino",
      price: 69.90,
      image: "images/product-11.jpg",
      description: "Camisa polo clássica, confortável e versátil para diversas ocasiões."
    },
    {
      id: 12,
      name: "Colar de Prata",
      category: "acessorios",
      price: 89.90,
      image: "images/product-12.jpg",
      description: "Colar de prata delicado e elegante, perfeito para complementar qualquer look."
    }
  ];
  
  // Cart Management
  const getCart = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  };
  
  const saveCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
  };
  
  const updateCartCount = () => {
    const cart = getCart();
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    // Update cart count in all pages
    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(element => {
      element.textContent = cartCount;
    });
  };
  
  // Initialize cart count on page load
  document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
  });
  