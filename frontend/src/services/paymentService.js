// src/services/paymentService.js

const PAYMENT_BASE = "http://localhost:1110/ORDERSERVICE/api/v1/payments";

export const processPayment = async (paymentRequest, token) => {
  const res = await fetch(`${PAYMENT_BASE}/process`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(paymentRequest),
  });
  const data = await res.json();
  if (!res.ok) {
    console.error("Stripe payment failed:", data);
    throw new Error(data.message || "Stripe payment failed");
  }

  return data;
};
