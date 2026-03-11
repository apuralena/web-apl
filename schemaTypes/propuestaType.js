// schemaTypes/propuestaType.js
export const propuestaType = {
  name: "propuesta",
  title: "Propuestas de Menú",
  type: "document",
  fields: [
    {
      name: "orden",
      type: "number",
      title: "Orden de visualización",
      description:
        "Número para ordenar las propuestas (1 = primera, 2 = segunda, etc.)",
      validation: (Rule) => Rule.required().integer().positive(),
    },
    {
      name: "titulo",
      type: "string",
      title: "Título de la Propuesta",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "foto",
      type: "image",
      title: "Foto de Portada (Cover)",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "descripcion",
      type: "text",
      title: "Descripción breve",
    },
    {
      name: "incluye",
      type: "array",
      title: "¿Qué incluye? (Lista de productos)",
      of: [{ type: "string" }],
      description: "Agregá cada ítem que compone la propuesta",
    },
  ],
};
