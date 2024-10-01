// server.js
const express = require('express');
const app = express();
const PORT = 3001;

app.use(express.json());

let products = [
  { id: 1, name: 'Laptop', price: 1200 },
  { id: 2, name: 'Phone', price: 800 },
  { id: 3, name: 'Headphones', price: 150 },
];

let cart = [];

// GET /products - Fetch products
app.get('/products', (req, res) => {
  res.json(products);
});

// POST /cart - Add item to cart
app.post('/cart', (req, res) => {
  const productId = req.body.id;
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.push(product);
    res.status(201).json({ message: 'Product added to cart', cart });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// DELETE /cart/:id - Remove item from cart
app.delete('/cart/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  cart = cart.filter(item => item.id !== productId);
  res.json({ message: 'Product removed from cart', cart });
});

// POST /checkout - Checkout (clear cart)
app.post('/checkout', (req, res) => {
  if (cart.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }
  cart = [];
  res.json({ message: 'Checkout complete', cart });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
