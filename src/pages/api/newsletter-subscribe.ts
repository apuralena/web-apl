import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(
        JSON.stringify({ error: "Email inválido" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const apiKey = import.meta.env.BREVO_API_KEY;
    const senderEmail = import.meta.env.BREVO_SENDER_EMAIL;
    const senderName = import.meta.env.BREVO_SENDER_NAME;

    if (!apiKey || !senderEmail || !senderName) {
      return new Response(
        JSON.stringify({ error: "Configuración de Brevo incompleta" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        attributes: {
          NEWSLETTER: true,
        },
        listIds: [3],
        updateEnabled: true,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Brevo error:", data);
      return new Response(
        JSON.stringify({ error: data.message || "Error al suscribir" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "¡Te suscribiste correctamente!" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error en /api/newsletter-subscribe:", err);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
