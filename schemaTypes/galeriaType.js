// schemaTypes/galeriaType.js
export const galeriaType = {
  name: "galeria",
  title: "Galería de Fotos",
  type: "document",
  fields: [
    {
      name: "titulo",
      type: "string",
      title: "Título de la Galería",
      initialValue: "Galería de Fotos",
    },
    {
      name: "fotos",
      type: "array",
      title: "Fotos",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Texto alternativo",
              description: "Descripción breve de la foto (accesibilidad)",
            },
          ],
        },
      ],
      description:
        "Subí las fotos profesionales que querés mostrar en la galería.",
    },
  ],
};
