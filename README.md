# Bloom & Blossom — E-commerce Demo

This is a small React + Vite e-commerce demo app used as a portfolio project.

Setup
```
npm install
npm run dev
```

Build
```
npm run build
```

# Tests
```
npm test
```

Stripe Checkout (local)

1. Create a Stripe test account and get your secret key.
2. In PowerShell set the env var and run the checkout server:
```powershell
$env:STRIPE_SECRET_KEY = "sk_test_..."
node server/checkout-server.js
```
3. Start the frontend in a separate shell:
```powershell
npm run dev
```
 
Email confirmations

You can configure order confirmation emails after Stripe payment by setting one of the following env vars before starting the checkout server:

- SendGrid (recommended):
```powershell
$env:SENDGRID_API_KEY = "SG.xxxx"
$env:SENDER_EMAIL = "hello@yourdomain.com"
```

- SMTP (fallback):
```powershell
$env:SMTP_HOST = "smtp.example.com"
$env:SMTP_PORT = "587"
$env:SMTP_USER = "username"
$env:SMTP_PASS = "password"
$env:SENDER_EMAIL = "hello@yourdomain.com"
```

If no email provider is configured the server will still persist orders but will not send confirmation emails.
4. Open the site and click Checkout in the cart — you'll be redirected to Stripe Checkout (test).

Notes
- I added a small test for the product filtering util and a CI workflow.
- For best performance, run `npm run build` and deploy the `dist/` folder to a static host (Vercel/Netlify).
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
