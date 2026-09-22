import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();

    if (!orderData || !orderData.id) {
      return NextResponse.json({ error: "Missing order details" }, { status: 400 });
    }

    // Cloudflare D1 environment check (available when deployed on Cloudflare Workers / Pages)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const env = (process as any).env;
    const db = env?.DB;

    if (db && typeof db.prepare === "function") {
      try {
        await db
          .prepare(
            `INSERT OR REPLACE INTO orders (
              id, customer_name, customer_email, phone, total, subtotal, delivery_fee, status, delivery_address, district, province, payment_method, tracking_number, estimated_delivery, assigned_engineer
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
          )
          .bind(
            orderData.id,
            orderData.customerName || "Online Client",
            orderData.customerEmail || "client@elleyhill.zm",
            orderData.phone || "+260",
            orderData.total || 0,
            orderData.subtotal || 0,
            orderData.deliveryFee || 0,
            orderData.status || "Processing",
            orderData.deliveryAddress || "Lusaka",
            orderData.district || "Lusaka",
            orderData.province || "Lusaka Province",
            orderData.paymentMethod || "Mobile Money",
            orderData.trackingNumber || "",
            orderData.estimatedDelivery || "",
            orderData.assignedEngineer || ""
          )
          .run();
      } catch (dbErr) {
        console.warn("D1 query error (non-fatal):", dbErr);
      }
    }

    return NextResponse.json({
      success: true,
      orderId: orderData.id,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    console.error("Order sync error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
