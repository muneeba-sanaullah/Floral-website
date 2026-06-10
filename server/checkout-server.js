import express from 'express'
import cors from 'cors'
import db from './db/database.js'

const app = express()
app.use(cors({ origin: true }))
app.use(express.json())

// MOCK CHECKOUT ONLY (Stripe removed)
app.post('/mock-checkout-session', async (req, res) => {
  try {
    const { items = [], successUrl } = req.body || {}

    const fakeOrderId = 'mock_' + Date.now()

    await db.run(
      `INSERT INTO orders (
        session_id,
        customer_email,
        amount_total,
        currency,
        items,
        valid
      ) VALUES (?, ?, ?, ?, ?, ?)`,
      fakeOrderId,
      'test@mock.com',
      5000,
      'inr',
      JSON.stringify(items),
      1
    )

    return res.json({
      url: successUrl || 'http://localhost:5173/checkout/success'
    })

  } catch (err) {
    console.error('Mock checkout error:', err)

    return res.json({
      url: 'http://localhost:5173/checkout/success'
    })
  }
})

//  ORDERS API (UNCHANGED)
app.get('/orders', async (req, res) => {
  try {
    const rows = await db.all(
      'SELECT * FROM orders ORDER BY created_at DESC LIMIT 50'
    )
    res.json(rows)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

const port = process.env.PORT || 4242
app.listen(port, () => {
  console.log(`Mock checkout server running on http://localhost:${port}`)
})