const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'products.html'));
});

app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'cart.html'));
});

// API endpoint for processing orders
app.post('/api/order', (req, res) => {
  const orderData = req.body;
  console.log('New order received:', orderData);
  
  // In a real implementation, you would handle WhatsApp notification here
  // using a service like Twilio or WhatsApp Business API
  
  res.json({ 
    success: true, 
    message: 'Order received successfully. WhatsApp notification would be sent to the seller.' 
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to view the site`);
});
