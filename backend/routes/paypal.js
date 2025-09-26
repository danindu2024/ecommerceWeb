const express = require('express');
const router = express.Router();

// Create PayPal order
router.post('/create-order', async (req, res) => {
  const { amount } = req.body;

  try {
    // Get access token
    const authResponse = await fetch(`https://api-m.sandbox.paypal.com/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials'
    });

    const authData = await authResponse.json();

    if (!authResponse.ok) {
      console.error('PayPal auth error:', authData);
      return res.status(500).json({ error: 'PayPal authentication failed' });
    }

    // Create order
    const orderResponse = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authData.access_token}`
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [{
          amount: {
            currency_code: "USD", // Use USD for sandbox
            value: amount.toString()
          }
        }],
        application_context: {
          return_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/success`,
          cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/cancel`
        }
      })
    });

    const orderData = await orderResponse.json();

    if (!orderResponse.ok) {
      console.error('PayPal order creation error:', orderData);
      return res.status(500).json({ error: 'Failed to create PayPal order' });
    }

    res.json(orderData);
  } catch (error) {
    console.error('PayPal create order error:', error);
    res.status(500).json({ error: "Error creating PayPal order" });
  }
});

// Capture payment
router.post('/capture-order/:orderID', async (req, res) => {
  const { orderID } = req.params;

  try {
    // Get access token
    const authResponse = await fetch(`https://api-m.sandbox.paypal.com/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials'
    });

    const authData = await authResponse.json();

    if (!authResponse.ok) {
      console.error('PayPal auth error:', authData);
      return res.status(500).json({ error: 'PayPal authentication failed' });
    }

    // Capture payment
    const captureResponse = await fetch(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authData.access_token}`
      }
    });

    const captureData = await captureResponse.json();

    if (!captureResponse.ok) {
      console.error('PayPal capture error:', captureData);
      return res.status(500).json({ error: 'Failed to capture PayPal payment' });
    }

    res.json(captureData);
  } catch (error) {
    console.error('PayPal capture error:', error);
    res.status(500).json({ error: "Error capturing PayPal payment" });
  }
});

module.exports = router;