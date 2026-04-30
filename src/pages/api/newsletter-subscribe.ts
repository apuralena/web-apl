import type { APIRoute } from "astro";
import { z } from "zod";

const subscribeSchema = z.object({
  email: z.string().trim().email("Email inválido").toLowerCase(),
});

export const POST: APIRoute = async ({ request }) => {
  try {
    const parsed = subscribeSchema.safeParse(await request.json());

    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: "Email inválido" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const { email } = parsed.data;

    const apiKey = import.meta.env.BREVO_API_KEY;
    const senderEmail = import.meta.env.BREVO_SENDER_EMAIL;
    const senderName = import.meta.env.BREVO_SENDER_NAME;
    const listId = Number(import.meta.env.BREVO_LIST_ID || 3);

    if (!apiKey || !senderEmail || !senderName || !Number.isInteger(listId)) {
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
        listIds: [listId],
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
