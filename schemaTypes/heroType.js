// schemaTypes/heroType.js
export const heroType = {
  name: "hero",
  title: "Sección Hero",
  type: "document",
  fields: [
    {
      name: "tituloPrincipal",
      type: "string",
      title: "Título Principal (H1)",
      description: "Ej: Asado Argentino",
    },
    {
      name: "subtitulo",
      type: "string",
      title: "Subtítulo o frase de impacto",
      description: "El texto que va debajo del título.",
    },
    {
      name: "textoBotonPrincipal",
      type: "string",
      title: "Texto Botón Presupuesto",
      initialValue: "Pedir presupuesto",
    },
    {
      name: "textoBotonSecundario",
      type: "string",
      title: "Texto Botón Propuestas",
      initialValue: "Ver propuestas",
    },
    {
      name: "textoDebajoCTA",
      type: "text",
      title: "Texto debajo del CTA",
      description:
        "Breve descripción (2-3 líneas) que aparece debajo del título.",
      initialValue:
        "El mejor asado argentino en tu evento. Fuego, tradición y sabor.",
      rows: 3,
    },
  ],
};
