/**
 * Elleyhill Power Zambia - pawaPay Cloudflare Worker Gateway (JavaScript)
 * 
 * Secure Edge Payment Gateway Middleware for pawaPay API
 * Handles Mobile Money (MTN MoMo, Airtel Money, Zamtel Kwacha), Cards, and Callbacks.
 */

// Map local Zambian providers to pawaPay official correspondents
const CORRESPONDENTS = {
  mtn: "MTN_MOMO_ZMB",
  airtel: "AIRTEL_OAPI_ZMB",
  zamtel: "ZAMTEL_ZMB",
  card: "CARD_ZMB",
};

export default {
  async fetch(request, env, ctx) {
    const origin = request.headers.get("Origin") || "*";
    const allowedOrigin = env.ALLOWED_ORIGIN || "*";

    // CORS Headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": allowedOrigin === "*" ? origin : allowedOrigin,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
      "Access-Control-Max-Age": "86400",
    };

    // Handle CORS Preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    try {
      // 1. Health Check
      if (path === "/" || path === "/health" || path === "/api/health") {
        return jsonResponse(
          {
            status: "online",
            service: "Elleyhill Power pawaPay Edge Gateway (JavaScript)",
            environment: env.PAWAPAY_ENV || "sandbox",
            region: "Zambia (ZMB)",
            timestamp: new Date().toISOString(),
          },
          200,
          corsHeaders
        );
      }

      // 2. Initiate Payment (STK Push or Card Deposit)
      if (path === "/api/pay/initiate" || path === "/v1/deposits") {
        if (request.method !== "POST") {
          return jsonResponse({ error: "Method not allowed" }, 405, corsHeaders);
        }

        const body = await request.json();

        if (!body.amount || !body.orderRef) {
          return jsonResponse({ error: "Missing required fields: amount, orderRef" }, 400, corsHeaders);
        }

        // Format Zambian MSISDN: Ensure 260XXXXXXXXX format
        const cleanPhone = normalizeZambianPhone(body.phone || "");
        const correspondent = CORRESPONDENTS[body.provider] || "MTN_MOMO_ZMB";
        const depositId = `EHP-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

        const isProduction = env.PAWAPAY_ENV === "production";
        const pawaPayBaseUrl = isProduction
          ? "https://api.pawapay.cloud"
          : "https://api.sandbox.pawapay.cloud";

        const pawaPayPayload = {
          depositId,
          amount: Number(body.amount).toFixed(2),
          currency: "ZMW",
          country: "ZMB",
          correspondent,
          payer: {
            type: "MSISDN",
            address: {
              value: cleanPhone,
            },
          },
          customerTimestamp: new Date().toISOString(),
          statementDescription: (body.statementDescription || `Elleyhill #${body.orderRef}`).substring(0, 22),
          metadata: [
            { fieldName: "orderRef", fieldValue: body.orderRef },
            { fieldName: "customerEmail", fieldValue: body.customerEmail || "customer@elleyhill.co.zm" },
            { fieldName: "customerName", fieldValue: body.customerName || "Valued Client" },
          ],
        };

        // If no API Token configured (e.g. testing in dev), return simulated successful STK Push
        if (!env.PAWAPAY_API_TOKEN) {
          return jsonResponse(
            {
              success: true,
              mode: "simulated_sandbox",
              depositId,
              orderRef: body.orderRef,
              status: "SUBMITTED",
              message: `STK push initiated to +${cleanPhone} for ZMW ${Number(body.amount).toLocaleString()} via ${String(body.provider).toUpperCase()} MoMo.`,
              correspondent,
              pawaPayPayload,
            },
            200,
            corsHeaders
          );
        }

        // Forward to pawaPay API with bearer token
        const pawaPayResponse = await fetch(`${pawaPayBaseUrl}/deposits`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${env.PAWAPAY_API_TOKEN}`,
          },
          body: JSON.stringify(pawaPayPayload),
        });

        const responseData = await pawaPayResponse.json();

        if (!pawaPayResponse.ok) {
          return jsonResponse(
            {
              success: false,
              status: "FAILED",
              error: responseData || "Failed to initiate pawaPay deposit",
              depositId,
            },
            pawaPayResponse.status,
            corsHeaders
          );
        }

        return jsonResponse(
          {
            success: true,
            depositId,
            orderRef: body.orderRef,
            status: "SUBMITTED",
            data: responseData,
          },
          200,
          corsHeaders
        );
      }

      // 3. Check Deposit Status
      if (path.startsWith("/api/pay/status/") || path.startsWith("/v1/deposits/")) {
        if (request.method !== "GET") {
          return jsonResponse({ error: "Method not allowed" }, 405, corsHeaders);
        }

        const parts = path.split("/");
        const depositId = parts[parts.length - 1];

        if (!depositId) {
          return jsonResponse({ error: "Missing depositId parameter" }, 400, corsHeaders);
        }

        if (!env.PAWAPAY_API_TOKEN) {
          return jsonResponse(
            {
              depositId,
              status: "COMPLETED",
              mode: "simulated_sandbox",
              message: "Payment successfully verified via pawaPay gateway switch",
            },
            200,
            corsHeaders
          );
        }

        const isProduction = env.PAWAPAY_ENV === "production";
        const pawaPayBaseUrl = isProduction
          ? "https://api.pawapay.cloud"
          : "https://api.sandbox.pawapay.cloud";

        const checkResponse = await fetch(`${pawaPayBaseUrl}/deposits/${depositId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${env.PAWAPAY_API_TOKEN}`,
          },
        });

        const statusData = await checkResponse.json();
        return jsonResponse(statusData, checkResponse.status, corsHeaders);
      }

      // 4. pawaPay Checkouts Callback Handler (Hosted / 3DS Checkouts)
      if (
        path === "/api/pay/callback/checkouts" ||
        path === "/api/pay/callback/checkout" ||
        path === "/v1/callbacks/checkout" ||
        path === "/v1/callbacks/checkouts" ||
        path === "/callbacks/checkouts" ||
        path === "/callbacks/checkout"
      ) {
        if (request.method === "GET" || request.method === "HEAD") {
          return jsonResponse(
            {
              status: "ACTIVE",
              endpoint: "pawaPay Checkouts Callback",
              ready: true,
              timestamp: new Date().toISOString(),
            },
            200,
            corsHeaders
          );
        }

        if (request.method === "POST") {
          let payload = {};
          try {
            payload = await request.json();
          } catch (e) {
            console.warn("Empty checkout callback body");
          }
          console.log("pawaPay Checkout Callback Received:", JSON.stringify(payload));

          return jsonResponse(
            {
              received: true,
              status: "PROCESSED",
              timestamp: new Date().toISOString(),
            },
            200,
            corsHeaders
          );
        }

        return jsonResponse({ error: "Method not allowed" }, 405, corsHeaders);
      }

      // 5. pawaPay Deposits Callback Handler (Mobile Money Inbound Payments)
      if (
        path === "/api/pay/callback" ||
        path === "/api/pay/callback/deposits" ||
        path === "/api/pay/callback/deposit" ||
        path === "/api/pay/webhook" ||
        path === "/v1/callbacks" ||
        path === "/v1/callbacks/deposit" ||
        path === "/v1/callbacks/deposits" ||
        path === "/callbacks/deposit" ||
        path === "/callbacks/deposits" ||
        path === "/callback"
      ) {
        if (request.method === "GET" || request.method === "HEAD") {
          return jsonResponse(
            {
              status: "ACTIVE",
              endpoint: "pawaPay Deposit Callback",
              ready: true,
              timestamp: new Date().toISOString(),
            },
            200,
            corsHeaders
          );
        }

        if (request.method === "POST") {
          let callbackPayload = {};
          try {
            callbackPayload = await request.json();
          } catch (e) {
            console.warn("Empty deposit callback body");
          }

          console.log("pawaPay Deposit Callback Received:", JSON.stringify(callbackPayload));

          const depositId = callbackPayload.depositId || callbackPayload.deposit_id;
          const status = callbackPayload.status;

          return jsonResponse(
            {
              received: true,
              depositId: depositId || "acknowledged",
              status: status || "PROCESSED",
              timestamp: new Date().toISOString(),
            },
            200,
            corsHeaders
          );
        }

        return jsonResponse({ error: "Method not allowed" }, 405, corsHeaders);
      }

      // 6. pawaPay Payouts Callback Handler
      if (
        path === "/api/pay/callback/payouts" ||
        path === "/api/pay/callback/payout" ||
        path === "/v1/callbacks/payout" ||
        path === "/v1/callbacks/payouts" ||
        path === "/callbacks/payout" ||
        path === "/callbacks/payouts"
      ) {
        if (request.method === "GET" || request.method === "HEAD") {
          return jsonResponse(
            {
              status: "ACTIVE",
              endpoint: "pawaPay Payouts Callback",
              ready: true,
              timestamp: new Date().toISOString(),
            },
            200,
            corsHeaders
          );
        }

        if (request.method === "POST") {
          let payoutPayload = {};
          try {
            payoutPayload = await request.json();
          } catch (e) {
            console.warn("Empty payout callback");
          }

          console.log("pawaPay Payout Callback:", JSON.stringify(payoutPayload));

          return jsonResponse(
            {
              received: true,
              timestamp: new Date().toISOString(),
            },
            200,
            corsHeaders
          );
        }

        return jsonResponse({ error: "Method not allowed" }, 405, corsHeaders);
      }

      // 7. pawaPay Refunds Callback Handler
      if (
        path === "/api/pay/callback/refunds" ||
        path === "/api/pay/callback/refund" ||
        path === "/v1/callbacks/refund" ||
        path === "/v1/callbacks/refunds" ||
        path === "/callbacks/refund" ||
        path === "/callbacks/refunds"
      ) {
        if (request.method === "GET" || request.method === "HEAD") {
          return jsonResponse(
            {
              status: "ACTIVE",
              endpoint: "pawaPay Refunds Callback",
              ready: true,
              timestamp: new Date().toISOString(),
            },
            200,
            corsHeaders
          );
        }

        if (request.method === "POST") {
          let refundPayload = {};
          try {
            refundPayload = await request.json();
          } catch (e) {
            console.warn("Empty refund callback");
          }

          console.log("pawaPay Refund Callback:", JSON.stringify(refundPayload));

          return jsonResponse(
            {
              received: true,
              timestamp: new Date().toISOString(),
            },
            200,
            corsHeaders
          );
        }

        return jsonResponse({ error: "Method not allowed" }, 405, corsHeaders);
      }

      // 404 Route Not Found
      return jsonResponse({ error: "Route not found", path }, 404, corsHeaders);
    } catch (err) {
      console.error("Worker error:", err);
      return jsonResponse({ error: err.message || "Internal Gateway Error" }, 500, corsHeaders);
    }
  },
};

function jsonResponse(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
}

function normalizeZambianPhone(phone) {
  let digits = String(phone || "").replace(/\D/g, "");

  if (digits.startsWith("0")) {
    digits = "260" + digits.substring(1);
  } else if (digits.length === 9) {
    digits = "260" + digits;
  }

  return digits || "260971838038";
}
