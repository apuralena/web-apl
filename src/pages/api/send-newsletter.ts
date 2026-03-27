import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
  try {
    const { password, subject, htmlContent } = await request.json();

    const expectedPassword = import.meta.env.NEWSLETTER_PASSWORD;
    if (password !== expectedPassword) {
      return new Response(
        JSON.stringify({ error: "Contraseña incorrecta" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!subject || !htmlContent) {
      return new Response(
        JSON.stringify({ error: "Faltan datos requeridos" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const apiKey = import.meta.env.BREVO_API_KEY;
    const senderEmail = import.meta.env.BREVO_SENDER_EMAIL;
    const senderName = import.meta.env.BREVO_SENDER_NAME;
    const listId = import.meta.env.BREVO_LIST_ID || 3;

    if (!apiKey || !senderEmail || !senderName) {
      return new Response(
        JSON.stringify({ error: "Configuración incompleta" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Obtener contactos de la lista específica usando el endpoint correcto
    const contactsRes = await fetch(
      `https://api.brevo.com/v3/contacts?listIds=${listId}&limit=500`,
      { headers: { "api-key": apiKey } }
    );

    const data = await contactsRes.json();
    console.log("Brevo response:", JSON.stringify(data));

    if (!contactsRes.ok) {
      return new Response(
        JSON.stringify({ error: `Error de Brevo: ${data.message || JSON.stringify(data)}` }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const contacts = data.contacts || [];
    const emails = contacts.map((c: { email: string }) => c.email).filter(Boolean);

    console.log("Contactos encontrados:", contacts.length);
    console.log("Emails:", emails);

    if (emails.length === 0) {
      return new Response(
        JSON.stringify({ error: "No hay contactos en la lista" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Enviar en batches de 30
    const batchSize = 30;
    let sentCount = 0;

    for (let i = 0; i < emails.length; i += batchSize) {
      const batch = emails.slice(i, i + batchSize);
      const toList = batch.map((email: string) => ({ email, name: "Suscriptor" }));

      const sendRes = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: { name: senderName, email: senderEmail },
          subject: subject,
          htmlContent: htmlContent,
          to: toList,
        }),
      });

      const sendData = await sendRes.json();
      console.log("Send response:", JSON.stringify(sendData));

      if (!sendRes.ok) {
        return new Response(
          JSON.stringify({ error: `Error al enviar: ${sendData.message || JSON.stringify(sendData)}` }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      sentCount += batch.length;
    }

    return new Response(
      JSON.stringify({ success: true, message: `Enviado a ${sentCount} contactos` }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error:", err);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
