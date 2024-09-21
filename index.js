const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

// Server side values
const taxRate = 5; // 5%
const discountPercentage = 10; // 10%
const loyaltyRate = 2; // 2 points per $1

app.get('/cart-total', (req, res) => {
  const newItemPrice = Number(req.query.newItemPrice);
  const cartTotal = Number(req.query.cartTotal);

  const result = newItemPrice + cartTotal;

  res.send(result.toString());
});

app.get('/membership-discount', (req, res) => {
  const cartTotal = Number(req.query.cartTotal);
  const isMember = req.query.isMember === 'true';

  let result;
  if (isMember) {
    const discountedPrice = cartTotal * (discountPercentage / 100);
    result = cartTotal - discountedPrice;
  } else {
    result = cartTotal;
  }

  res.send(result.toString());
});

app.get('/calculate-tax', (req, res) => {
  const cartTotal = Number(req.query.cartTotal);

  const result = cartTotal * (taxRate / 100);

  res.send(result.toString());
});

app.get('/estimate-delivery', (req, res) => {
  const shippingMethod = req.query.shippingMethod;
  const distance = Number(req.query.distance);
  let deliveryDays;
  if (shippingMethod.toLowerCase() === 'express') {
    deliveryDays = Math.ceil(distance / 100);
  } else {
    deliveryDays = Math.ceil(distance / 50);
  }

  res.send(deliveryDays.toString());
});

app.get('/shipping-cost', (req, res) => {
  const weight = Number(req.query.weight);
  const distance = Number(req.query.distance);

  const result = weight * distance * 0.1;

  res.send(result.toString());
});

app.get('/loyalty-points', (req, res) => {
  const purchaseAmount = Number(req.query.purchaseAmount);

  const result = purchaseAmount * 2;

  res.send(result.toString());
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
