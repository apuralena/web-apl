// schemaTypes/nosotrosType.js
export const nosotrosType = {
  name: "nosotros",
  title: "Sección Nosotros",
  type: "document",
  fields: [
    {
      name: "titulo",
      type: "string",
      title: "Título",
    },
    {
      name: "subtitulo",
      type: "string",
      title: "Subtítulo",
    },
    {
      name: "descripcion",
      type: "text",
      title: "Descripción",
    },
    {
      name: "imagen",
      type: "image",
      title: "Imagen",
    },
  ],
};
