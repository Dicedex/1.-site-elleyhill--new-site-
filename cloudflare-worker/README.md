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

## pawaPay Dashboard Callback Configuration

Before pawaPay lets you generate an API Token, you must register your callback URLs in the **pawaPay Merchant Dashboard** (Settings / Integration / Callbacks).

Once your Cloudflare Worker is deployed, configure your URLs as follows:

| Setting in pawaPay Dashboard | URL to Enter |
| :--- | :--- |
| **Deposit Callback URL** | `https://elleyhill-pawapay-gateway.<your-subdomain>.workers.dev/api/pay/callback` |
| **Payout Callback URL** (optional/refunds) | `https://elleyhill-pawapay-gateway.<your-subdomain>.workers.dev/api/pay/callback/payout` |
| **Return / Redirect URL** (Card / 3DS) | `https://elleyhillzm.com/order-confirmation` *(or `http://localhost:3000/order-confirmation`)* |

> 💡 **Tip:** The worker handles both `GET` verification pings and `POST` webhook payloads returning `200 OK`, so the pawaPay dashboard will instantly validate and approve your URLs.

---

## Deployment & Setup Steps

### 1. Deploy the Cloudflare Worker First
To get your live worker URL for the pawaPay dashboard:
```bash
cd cloudflare-worker
npx wrangler deploy
```
*Cloudflare will print your URL: e.g. `https://elleyhill-pawapay-gateway.<your-subdomain>.workers.dev`*

### 2. Enter Callbacks in pawaPay Dashboard
1. Go to your **pawaPay Merchant Dashboard** → **Settings** → **Callbacks / Integration**.
2. Paste the **Deposit Callback URL**:
   `https://elleyhill-pawapay-gateway.<your-subdomain>.workers.dev/api/pay/callback`
3. Paste the **Payout Callback URL**:
   `https://elleyhill-pawapay-gateway.<your-subdomain>.workers.dev/api/pay/callback/payout`
4. Click **Save / Verify**.

### 3. Generate & Store your pawaPay API Token
1. In the pawaPay Dashboard, click **Generate API Token** (now unlocked!).
2. Copy your token and store it securely in your Cloudflare Worker:
   ```bash
   npx wrangler secret put PAWAPAY_API_TOKEN
   ```
   *(Paste your pawaPay token when prompted)*

### 4. Connect to Next.js Web App
In the root directory of your Next.js project, add to `.env.local`:
```env
NEXT_PUBLIC_PAWAPAY_WORKER_URL=https://elleyhill-pawapay-gateway.<your-subdomain>.workers.dev
```
