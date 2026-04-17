// schemaTypes/eventosType.js
export const eventosType = {
  name: "eventos",
  title: "Eventos",
  type: "document",
  fields: [
    {
      name: "nombreEvento",
      type: "string",
      title: "Nombre del Evento",
      description: "Ej: Casamientos",
    },
    {
      name: "subtituloEvento",
      type: "string",
      title: "Subtítulo del Evento",
      description: "Ej: Celebra tu día especial con nosotros",
    },
    {
      name: "descripcionEvento",
      type: "text",
      title: "Descripción del Evento",
      description:
        "Ej: Nuestra propuesta para bodas es emocional, visual y sensorial. El fuego como símbolo, la cocina en vivo como espectáculo y la tradición como identidad.",
    },
    {
      name: "fotoEvento",
      type: "image",
      title: "Foto del Evento",
      description:
        "Una imagen que represente el evento, como una boda al aire libre con parrilla.",
    },
    {
      name: "incluyeEvento",
      type: "text",
      title: "¿Qué incluye el evento?",
      description: "Ej: podemos montar: ",
    },
    {
      name: "incluyeEventoArray",
      type: "array",
      title: "¿Podés montar el evento en...?",
      description:
        "Ej: Recepciones descontracturadas al fuego, Show de fuegos para cocinar, Presentación de cortes premium con impacto visual, Malambo en vivo, Momentos musicales con guitarreros, Barra de tragos y ambientación completa",
      of: [{ type: "string" }],
    },
    {
      name: "textoCTA",
      type: "string",
      title: "Texto del Botón CTA",
      description: "Ej: Contáctanos para tu evento",
      initialValue: "Contáctanos para tu evento",
    },
  ],
};
