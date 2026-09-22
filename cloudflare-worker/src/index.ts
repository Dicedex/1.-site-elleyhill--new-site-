/**
 * Elleyhill Power Zambia - pawaPay Cloudflare Worker Gateway
 * 
 * Secure Edge Payment Gateway Middleware for pawaPay API
 * Handles Mobile Money (MTN MoMo, Airtel Money, Zamtel Kwacha) and Card settlements.
 */

export interface Env {
  PAWAPAY_API_TOKEN?: string; // Secret stored via: wrangler secret put PAWAPAY_API_TOKEN
  PAWAPAY_ENV?: "sandbox" | "production";
  ALLOWED_ORIGIN?: string;
}

interface InitiatePaymentRequest {
  orderRef: string;
  amount: number;
  phone: string;
  provider: "mtn" | "airtel" | "zamtel" | "card";
  customerName?: string;
  customerEmail?: string;
  statementDescription?: string;
}

// Map local Zambian providers to pawaPay official correspondents
const CORRESPONDENTS: Record<string, string> = {
  mtn: "MTN_MOMO_ZMB",
  airtel: "AIRTEL_OAPI_ZMB",
  zamtel: "ZAMTEL_ZMB",
  card: "CARD_ZMB",
};

export default {
  async fetch(request: Request, env: Env, ctx?: any): Promise<Response> {
    const origin = request.headers.get("Origin") || "*";
    const allowedOrigin = env.ALLOWED_ORIGIN || "*";

    // CORS Headers
    const corsHeaders: Record<string, string> = {
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
            service: "Elleyhill Power pawaPay Edge Gateway",
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

        const body = (await request.json()) as InitiatePaymentRequest;

        if (!body.amount || !body.orderRef) {
          return jsonResponse({ error: "Missing required fields: amount, orderRef" }, 400, corsHeaders);
        }

        // Format Zambian MSISDN: Ensure 260XXXXXXXXX format
        const cleanPhone = normalizeZambianPhone(body.phone || "");
        const correspondent = CORRESPONDENTS[body.provider] || "MTN_MOMO_ZMB";
        const depositId = `EHP-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

        // Determine Base URL
        const isProduction = env.PAWAPAY_ENV === "production";
        const pawaPayBaseUrl = isProduction
          ? "https://api.pawapay.cloud"
          : "https://api.sandbox.pawapay.cloud";

        const pawaPayPayload = {
          depositId,
          amount: body.amount.toFixed(2),
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
              message: `STK push initiated to +${cleanPhone} for ZMW ${body.amount.toLocaleString()} via ${body.provider.toUpperCase()} MoMo.`,
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

        // If no API Token, return simulated completed status
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

      // 4. Webhook Receiver for pawaPay Callbacks
      if (path === "/api/pay/webhook" || path === "/v1/callbacks") {
        if (request.method !== "POST") {
          return jsonResponse({ error: "Method not allowed" }, 405, corsHeaders);
        }

        const callbackPayload = await request.json();
        console.log("pawaPay Webhook Received:", JSON.stringify(callbackPayload));

        // Return 200 OK to acknowledge receipt to pawaPay
        return jsonResponse({ received: true, timestamp: new Date().toISOString() }, 200, corsHeaders);
      }

      // 404 Route Not Found
      return jsonResponse({ error: "Route not found" }, 404, corsHeaders);
    } catch (err: any) {
      console.error("Worker error:", err);
      return jsonResponse({ error: err.message || "Internal Gateway Error" }, 500, corsHeaders);
    }
  },
};

function jsonResponse(data: any, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
}

function normalizeZambianPhone(phone: string): string {
  // Strip all non-digit characters
  let digits = phone.replace(/\D/g, "");

  // If starts with 0 (e.g. 0971838038) -> 260971838038
  if (digits.startsWith("0")) {
    digits = "260" + digits.substring(1);
  } else if (digits.length === 9) {
    // If entered without leading 0 (e.g. 971838038) -> 260971838038
    digits = "260" + digits;
  } else if (digits.startsWith("260")) {
    // Already in 260XXXXXXXXX format
    digits = digits;
  }

  return digits || "260971838038";
}
