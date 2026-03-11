// schemaTypes/resenaType.js
export const resenaType = {
  name: "resena",
  title: "Reseñas",
  type: "document",
  fields: [
    {
      name: "autor",
      type: "string",
      title: "Nombre del autor",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "texto",
      type: "text",
      title: "Texto de la reseña",
      rows: 3,
      validation: (Rule) => Rule.required(),
    },
    {
      name: "estrellas",
      type: "number",
      title: "Calificación (1-5)",
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
      initialValue: 5,
    },
    {
      name: "fecha",
      type: "string",
      title: "Fecha de la reseña",
      description: 'Ej: "Hace 2 meses", "Enero 2026"',
    },
  ],
  preview: {
    select: {
      title: "autor",
      subtitle: "texto",
    },
  },
};
