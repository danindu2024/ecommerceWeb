
import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

// Create PayPal order
router.post('/create-order', async (req, res) => {
  const { amount } = req.body;

  try {
    // Get access token
    const auth = await fetch(`https://api-m.sandbox.paypal.com/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials'
    });

    const authData = await auth.json();

    // Create order
    const order = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authData.access_token}`
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [{ amount: { currency_code: "USD", value: amount } }]
      })
    });

    const orderData = await order.json();
    res.json(orderData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating PayPal order");
  }
});

// Capture payment
router.post('/capture-order/:orderID', async (req, res) => {
  const { orderID } = req.params;

  try {
    const auth = await fetch(`https://api-m.sandbox.paypal.com/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials'
    });

    const authData = await auth.json();

    const capture = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authData.access_token}`
      }
    });

    const captureData = await capture.json();
    res.json(captureData);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error capturing PayPal order");
  }
});

export default router;
