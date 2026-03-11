import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

function formatValue(key: string, value: unknown): string {
  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(", ") : "—";
  }
  if (typeof value === "string" && value.trim() !== "") {
    return value;
  }
  return "—";
}

function buildEmailHtml(data: Record<string, string | string[]>): string {
  const rows = Object.entries(data)
    .filter(([key]) => !key.endsWith("_otro"))
    .map(([key, value]) => {
      const otroKey = `${key}_otro`;
      let displayValue = formatValue(key, value);
      if (value === "otro" && otroKey in data) {
        displayValue = `Otro: ${data[otroKey]}`;
      }
      const label = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (s) => s.toUpperCase());
      return `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;color:#333;vertical-align:top;white-space:nowrap">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#555">${displayValue}</td></tr>`;
    })
    .join("");

  return `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#ea580c;padding:24px;border-radius:12px 12px 0 0">
        <h1 style="color:white;margin:0;font-size:22px">Nueva Solicitud de Presupuesto</h1>
        <p style="color:rgba(255,255,255,0.8);margin:8px 0 0;font-size:14px">A Pura Leña — Catering de Asados</p>
      </div>
      <table style="width:100%;border-collapse:collapse;background:white;border:1px solid #eee;border-top:none">
        ${rows}
      </table>
      <div style="padding:16px;background:#f9f9f9;border-radius:0 0 12px 12px;border:1px solid #eee;border-top:none">
        <p style="margin:0;font-size:12px;color:#999">Enviado desde el formulario de presupuesto de apuraleña.com.ar</p>
      </div>
    </div>
  `;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    const apiKey = import.meta.env.RESEND_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "RESEND_API_KEY no configurada" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const resend = new Resend(apiKey);

    const emailDestino = import.meta.env.EMAIL_DESTINO;
    if (!emailDestino) {
      return new Response(
        JSON.stringify({ error: "EMAIL_DESTINO no configurado" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const nombre = data.nombre || "Sin nombre";
    const tipoEvento = data.tipoEvento || "Evento";

    const { error } = await resend.emails.send({
      from: "A Pura Leña <onboarding@resend.dev>",
      to: [emailDestino],
      subject: `Nuevo presupuesto: ${nombre} — ${tipoEvento}`,
      html: buildEmailHtml(data),
    });

    if (error) {
      console.error("Error enviando email:", error);
      return new Response(
        JSON.stringify({ error: "Error al enviar el email" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error en /api/presupuesto:", err);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
