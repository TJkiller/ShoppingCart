const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Middleware to initialize cart
router.use(async (req, res, next) => {
  if (!req.session.cartId) {
    try {
      const result = await db.query(
        'INSERT INTO carts (session_id) VALUES ($1) RETURNING id',
        [req.sessionID]
      );
      req.session.cartId = result.rows[0].id;
    } catch (err) {
      console.error('Error creating cart:', err);
      return next(err);
    }
  }
  next();
});

// Get cart items
async function getCartItems(cartId) {
  const result = await db.query(
    `SELECT ci.id, ci.product, ci.price 
     FROM cart_items ci
     WHERE ci.cart_id = $1
     ORDER BY ci.created_at`,
    [cartId]
  );
  return result.rows;
}

// Calculate total
async function calculateTotal(cartId) {
  const result = await db.query(
    'SELECT SUM(price) as total FROM cart_items WHERE cart_id = $1',
    [cartId]
  );
  return parseFloat(result.rows[0].total) || 0;
}

// Home page - show cart
router.get('/', async (req, res) => {
  try {
    const cartItems = await getCartItems(req.session.cartId);
    const total = await calculateTotal(req.session.cartId);
    
    res.render('index', { 
      cart: cartItems,
      total: total,
      messages: req.flash()
    });
  } catch (err) {
    console.error('Error loading cart:', err);
    req.flash('error', 'Failed to load your cart');
    res.redirect('/');
  }
});

// Add item form
router.get('/add', (req, res) => {
  res.render('add-item', { messages: req.flash() });
});

// Process add item
router.post('/add', async (req, res) => {
  const { product, price } = req.body;
  
  if (!product || !product.trim()) {
    req.flash('error', 'Product name cannot be empty');
    return res.redirect('/add');
  }
  
  const priceNum = parseFloat(price);
  if (isNaN(priceNum)) {
    req.flash('error', 'Please enter a valid number for price');
    return res.redirect('/add');
  }
  
  if (priceNum <= 0) {
    req.flash('error', 'Price must be positive');
    return res.redirect('/add');
  }
  
  try {
    await db.query(
      'INSERT INTO cart_items (cart_id, product, price) VALUES ($1, $2, $3)',
      [req.session.cartId, product.trim(), priceNum]
    );
    
    req.flash('success', `Added '${product}' for R${priceNum.toFixed(2)} to your cart`);
    res.redirect('/');
  } catch (err) {
    console.error('Error adding item:', err);
    req.flash('error', 'Failed to add item to cart');
    res.redirect('/add');
  }
});

// Remove item
router.get('/remove/:id', async (req, res) => {
  try {
    const result = await db.query(
      'DELETE FROM cart_items WHERE id = $1 AND cart_id = $2 RETURNING product',
      [req.params.id, req.session.cartId]
    );
    
    if (result.rowCount === 0) {
      req.flash('error', 'Item not found in your cart');
    } else {
      req.flash('success', `Removed '${result.rows[0].product}' from your cart`);
    }
  } catch (err) {
    console.error('Error removing item:', err);
    req.flash('error', 'Failed to remove item');
  }
  
  res.redirect('/');
});

// Edit item form
router.get('/edit/:id', async (req, res) => {
  try {
    const result = await db.query(
      'SELECT id, product, price FROM cart_items WHERE id = $1 AND cart_id = $2',
      [req.params.id, req.session.cartId]
    );
    
    if (result.rowCount === 0) {
      req.flash('error', 'Item not found in your cart');
      return res.redirect('/');
    }
    
    res.render('edit-item', { 
      item: result.rows[0],
      messages: req.flash()
    });
  } catch (err) {
    console.error('Error loading item:', err);
    req.flash('error', 'Failed to load item');
    res.redirect('/');
  }
});

// Process edit item
router.post('/edit/:id', async (req, res) => {
  const { product, price } = req.body;
  
  if (!product || !product.trim()) {
    req.flash('error', 'Product name cannot be empty');
    return res.redirect(`/edit/${req.params.id}`);
  }
  
  const priceNum = parseFloat(price);
  if (isNaN(priceNum)) {
    req.flash('error', 'Please enter a valid number for price');
    return res.redirect(`/edit/${req.params.id}`);
  }
  
  if (priceNum <= 0) {
    req.flash('error', 'Price must be positive');
    return res.redirect(`/edit/${req.params.id}`);
  }
  
  try {
    const result = await db.query(
      `UPDATE cart_items 
       SET product = $1, price = $2 
       WHERE id = $3 AND cart_id = $4`,
      [product.trim(), priceNum, req.params.id, req.session.cartId]
    );
    
    if (result.rowCount === 0) {
      req.flash('error', 'Item not found in your cart');
    } else {
      req.flash('success', 'Item updated successfully');
    }
    
    res.redirect('/');
  } catch (err) {
    console.error('Error updating item:', err);
    req.flash('error', 'Failed to update item');
    res.redirect(`/edit/${req.params.id}`);
  }
});

// Checkout
router.get('/checkout', async (req, res) => {
  try {
    const cartItems = await getCartItems(req.session.cartId);
    const total = await calculateTotal(req.session.cartId);
    
    if (cartItems.length === 0) {
      req.flash('info', 'Your cart is empty. Nothing to checkout');
      return res.redirect('/');
    }
    
    // Clear the cart by deleting it (cascade will delete items)
    await db.query('DELETE FROM carts WHERE id = $1', [req.session.cartId]);
    req.session.cartId = null;
    
    res.render('index', {
      cart: [],
      total: 0,
      checkout: true,
      receiptCart: cartItems,
      receiptTotal: total,
      messages: req.flash()
    });
  } catch (err) {
    console.error('Error during checkout:', err);
    req.flash('error', 'Checkout failed');
    res.redirect('/');
  }
});

module.exports = router;