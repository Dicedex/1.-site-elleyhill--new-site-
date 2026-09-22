# pawaPay Cloudflare Worker Gateway for Elleyhill Power Zambia

This Cloudflare Worker acts as a secure, low-latency edge API gateway between the Elleyhill Power Zambia Next.js web application and the **pawaPay** multi-carrier payment switch (MTN MoMo, Airtel Money, Zamtel Kwacha & Cards).

---

## Features

- **Multi-Carrier Zambian Mobile Money**: Automatically maps Zambian phone numbers and providers:
  - 🟡 **MTN Mobile Money** (`MTN_MOMO_ZMB`)
  - 🔴 **Airtel Money** (`AIRTEL_OAPI_ZMB`)
  - 🟢 **Zamtel Kwacha** (`ZAMTEL_ZMB`)
- **MSISDN Formatting**: Automatically cleans and normalizes phone numbers to standard `260XXXXXXXXX` format.
- **Deposit Initiation (`POST /api/pay/initiate`)**: Triggers an automated STK Push directly to the customer's phone.
- **Status Polling (`GET /api/pay/status/:depositId`)**: Checks clearance and completion status.
- **Webhook Processing (`POST /api/pay/webhook`)**: Receives pawaPay async settlement notifications.
- **CORS Enabled**: Configured for cross-origin requests from your frontend domains.
- **Dev Sandbox Simulation**: Allows seamless local frontend testing even before pawaPay live credentials are configured.

---

## Deployment Instructions

### 1. Install Wrangler CLI
```bash
npm install -g wrangler
```

### 2. Login to Cloudflare
```bash
wrangler login
```

### 3. Configure Your pawaPay Secret API Token
Run the following command to securely store your token in Cloudflare (never commit API keys into source control):
```bash
wrangler secret put PAWAPAY_API_TOKEN
```
When prompted, paste your pawaPay JWT API Token provided by the pawaPay developer dashboard.

### 4. Deploy to Cloudflare Workers
```bash
# Deploy to Sandbox / Staging
npm run deploy

# Or deploy to Production
npm run deploy:prod
```

After deploying, Cloudflare will output your worker URL (e.g., `https://elleyhill-pawapay-gateway.<your-subdomain>.workers.dev`).

---

## Connecting with Next.js Frontend

In the Next.js site root, set the worker URL in your `.env.local`:
```env
NEXT_PUBLIC_PAWAPAY_WORKER_URL=https://elleyhill-pawapay-gateway.<your-subdomain>.workers.dev
```
