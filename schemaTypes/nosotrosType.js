// schemaTypes/nosotrosType.js
export const nosotrosType = {
  name: "nosotros",
  title: "Sección Nosotros",
  type: "document",
  fields: [
    {
      name: "titulo",
      type: "string",
      title: "Título Principal (H1)",
      description: "Ej: Nosotros – A Pura Leña",
    },
    {
      name: "subtitulo",
      type: "string",
      title: "Subtítulo o frase de impacto",
      description: "El texto que va debajo del título.",
    },
    {
      name: "descripcion",
      type: "text",
      title: "Descripción de la sección",
      description:
        "Ej: En A Pura Leña, somos apasionados por el arte del asado argentino. Nuestra misión es llevar la auténtica experiencia del asado a cada rincón, ofreciendo un servicio de catering excepcional que celebra la tradición y el sabor único de nuestra cultura culinaria.",
    },
    {
      name: "fotoNosotros",
      type: "image",
      title: "Foto de Nosotros",
      description:
        "Una imagen que represente la esencia de A Pura Leña, como una parrilla encendida o un grupo de personas disfrutando de un asado.",
    },
  ],
};
