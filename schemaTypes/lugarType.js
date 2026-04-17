// schemaTypes/lugarType.js
export const lugarType = {
  name: "lugar",
  title: "Lugares",
  type: "document",
  fields: [
    {
      name: "nombre",
      type: "string",
      title: "Nombre del Lugar",
      description: "Ej: Estancia San Carlos",
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "nombre",
      },
    },
    {
      name: "zona",
      type: "string",
      title: "Zona",
      options: {
        list: [
          { title: "Zona Norte", value: "zona-norte" },
          { title: "CABA", value: "caba" },
          { title: "Zona Oeste", value: "zona-oeste" },
          { title: "Zona Sur", value: "zona-sur" },
        ],
      },
    },
    {
      name: "descripcion",
      type: "text",
      title: "Descripción",
      description: "Descripción del lugar y qué lo hace especial.",
    },
    {
      name: "imagenes",
      type: "array",
      title: "Imágenes",
      of: [{ type: "image" }],
    },
    {
      name: "caracteristicas",
      type: "array",
      title: "Características",
      of: [{ type: "string" }],
    },
    {
      name: "idealPara",
      type: "text",
      title: "Ideal para",
      description: "Ej: Eventos donde el fuego, el aire libre y la puesta en escena son protagonistas.",
    },
    {
      name: "textoBoton",
      type: "string",
      title: "Texto del Botón",
      initialValue: "Consultar",
    },
  ],
};