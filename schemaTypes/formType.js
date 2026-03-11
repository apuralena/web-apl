// schemaTypes/formType.js

// ── Objeto reutilizable: una opción dentro de un campo radio/checkbox ──
export const opcionFormularioType = {
  name: "opcionFormulario",
  title: "Opción de campo",
  type: "object",
  fields: [
    {
      name: "valor",
      type: "string",
      title: "Valor (ID interno)",
      description: "Identificador único sin espacios. Ej: tabla-fiambres",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "etiqueta",
      type: "string",
      title: "Etiqueta visible",
      description: "Lo que ve el usuario. Ej: 🧀 Tabla de fiambres caseros",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "descripcion",
      type: "string",
      title: "Descripción (opcional)",
      description: "Texto secundario debajo de la etiqueta",
    },
  ],
  preview: {
    select: { title: "etiqueta", subtitle: "valor" },
  },
};

// ── Objeto reutilizable: un campo del formulario ──
export const campoFormularioType = {
  name: "campoFormulario",
  title: "Campo de formulario",
  type: "object",
  fields: [
    {
      name: "clave",
      type: "string",
      title: "Clave (ID interno)",
      description:
        "Identificador único sin espacios ni tildes. Ej: email, nombre, tipoEvento",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "etiqueta",
      type: "string",
      title: "Etiqueta",
      description: "Texto del label que ve el usuario",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "tipo",
      type: "string",
      title: "Tipo de campo",
      options: {
        list: [
          { title: "Texto", value: "text" },
          { title: "Email", value: "email" },
          { title: "Teléfono", value: "tel" },
          { title: "Número", value: "number" },
          { title: "Fecha", value: "date" },
          { title: "Hora", value: "time" },
          { title: "Texto largo (textarea)", value: "textarea" },
          { title: "Opciones únicas (radio)", value: "radio" },
          { title: "Opciones múltiples (checkbox)", value: "checkbox" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "placeholder",
      type: "string",
      title: "Placeholder",
      description: "Texto de ejemplo dentro del campo",
    },
    {
      name: "descripcion",
      type: "text",
      title: "Texto de ayuda",
      description: "Se muestra debajo del campo como descripción",
      rows: 2,
    },
    {
      name: "obligatorio",
      type: "boolean",
      title: "¿Es obligatorio?",
      initialValue: false,
    },
    {
      name: "anchoColumna",
      type: "string",
      title: "Ancho de columna",
      description:
        'Usá "Mitad" para poner dos campos lado a lado (ej: fecha + hora)',
      options: {
        list: [
          { title: "Completo", value: "completo" },
          { title: "Mitad", value: "mitad" },
        ],
      },
      initialValue: "completo",
    },
    {
      name: "opciones",
      type: "array",
      title: "Opciones",
      description: "Solo para campos tipo radio o checkbox",
      of: [{ type: "opcionFormulario" }],
      hidden: ({ parent }) =>
        !parent?.tipo || !["radio", "checkbox"].includes(parent.tipo),
    },
    {
      name: "incluyeOpcionOtro",
      type: "boolean",
      title: '¿Incluir opción "Otro" con campo de texto?',
      description:
        'Agrega una opción "Otro" al final con un campo libre para escribir',
      initialValue: false,
      hidden: ({ parent }) => parent?.tipo !== "radio",
    },
    {
      name: "origenDinamico",
      type: "string",
      title: "Origen dinámico de opciones",
      description:
        "Si se selecciona, las opciones se cargan automáticamente de Sanity (reemplaza las opciones manuales)",
      options: {
        list: [
          { title: "Ninguno (usar opciones manuales)", value: "ninguno" },
          { title: "Eventos (tipos de evento)", value: "eventos" },
          { title: "Propuestas de menú", value: "propuestas" },
        ],
      },
      initialValue: "ninguno",
      hidden: ({ parent }) =>
        !parent?.tipo || !["radio", "checkbox"].includes(parent.tipo),
    },
    {
      name: "opcionFijaFinal",
      type: "opcionFormulario",
      title: "Opción fija al final (opcional)",
      description:
        'Se agrega como última opción después de las dinámicas. Ej: "No lo tengo decidido"',
      hidden: ({ parent }) =>
        !parent?.origenDinamico || parent.origenDinamico === "ninguno",
    },
  ],
  preview: {
    select: {
      title: "etiqueta",
      subtitle: "tipo",
      obligatorio: "obligatorio",
    },
    prepare({ title, subtitle, obligatorio }) {
      const tipoLabels = {
        text: "Texto",
        email: "Email",
        tel: "Teléfono",
        number: "Número",
        date: "Fecha",
        time: "Hora",
        textarea: "Texto largo",
        radio: "Opciones (radio)",
        checkbox: "Casillas (checkbox)",
      };
      return {
        title: `${obligatorio ? "⚠️ " : ""}${title || "Sin etiqueta"}`,
        subtitle: tipoLabels[subtitle] || subtitle || "Sin tipo",
      };
    },
  },
};

// ── Documento principal: formulario de presupuesto ──
export const formType = {
  name: "formulario",
  title: "Formulario de Presupuesto",
  type: "document",
  fields: [
    // — Paso 1
    {
      name: "paso1Titulo",
      type: "string",
      title: "Paso 1 — Título",
      initialValue: "Datos del evento",
    },
    {
      name: "paso1Subtitulo",
      type: "text",
      title: "Paso 1 — Subtítulo (opcional)",
      rows: 2,
    },
    {
      name: "camposPaso1",
      type: "array",
      title: "Campos del Paso 1",
      of: [{ type: "campoFormulario" }],
    },
    // — Paso 2
    {
      name: "paso2Titulo",
      type: "string",
      title: "Paso 2 — Título",
      initialValue: "Menú y servicios",
    },
    {
      name: "paso2Subtitulo",
      type: "text",
      title: "Paso 2 — Subtítulo (opcional)",
      rows: 2,
      initialValue:
        "Estas respuestas son orientativas: podemos personalizar todo.",
    },
    {
      name: "camposPaso2",
      type: "array",
      title: "Campos del Paso 2",
      of: [{ type: "campoFormulario" }],
    },
    // — Botones
    {
      name: "textoBotonSiguiente",
      type: "string",
      title: 'Texto del botón "Siguiente"',
      initialValue: "Siguiente →",
    },
    {
      name: "textoBotonVolver",
      type: "string",
      title: 'Texto del botón "Volver"',
      initialValue: "← Volver",
    },
    {
      name: "textoBotonEnviar",
      type: "string",
      title: 'Texto del botón "Enviar"',
      initialValue: "Enviar solicitud",
    },
  ],
};
