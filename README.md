# 🔥 A Pura Leña — Web Oficial

Sitio web oficial de **A Pura Leña**, servicio de catering de asado argentino. Página institucional con secciones de eventos, propuestas gastronómicas, galería de experiencias, formulario de presupuesto y más.

🌐 **Sitio en producción:** desplegado en [Vercel](https://vercel.com/)
📋 **CMS:** [Sanity Studio](https://www.sanity.io/) integrado en `/admin`

---

## Tecnologías

| Categoría          | Stack                                                                                                                                                     |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Framework**      | [Astro 5](https://astro.build/) con SSR + pre-rendering híbrido                                                                                           |
| **UI**             | [React 19](https://react.dev/) · [Tailwind CSS 4](https://tailwindcss.com/) · [Shadcn/ui](https://ui.shadcn.com/) · [Radix UI](https://www.radix-ui.com/) |
| **Animaciones**    | [Motion](https://motion.dev/) (Framer Motion) · Aurora Background                                                                                         |
| **CMS**            | [Sanity v5](https://www.sanity.io/) con Studio embebido                                                                                                   |
| **Formularios**    | [React Hook Form](https://react-hook-form.com/) · [Zod](https://zod.dev/)                                                                                 |
| **Email**          | [Resend](https://resend.com/) (API de envío de presupuestos)                                                                                              |
| **Galería**        | [Yet Another React Lightbox](https://yet-another-react-lightbox.com/)                                                                                     |
| **Iconos**         | [Lucide React](https://lucide.dev/)                                                                                                                       |
| **Notificaciones** | [Sonner](https://sonner.emilkowal.dev/)                                                                                                                   |
| **Instagram**      | [Behold Widget](https://behold.so/)                                                                                                                       |
| **Deploy**         | [Vercel](https://vercel.com/) con `@astrojs/vercel`                                                                                                       |
| **Lenguaje**       | TypeScript                                                                                                                                                |

---

## Estructura del proyecto

```
├── public/                  # Assets estáticos
├── schemaTypes/             # Esquemas de Sanity (hero, eventos, galería, etc.)
├── src/
│   ├── components/          # Componentes Astro y React
│   │   ├── sections/        # Secciones de la landing (Eventos, Propuestas, etc.)
│   │   └── ui/              # Componentes UI reutilizables (Shadcn/Radix)
│   ├── config/              # Configuración de navegación
│   ├── layouts/             # Layout principal
│   ├── lib/                 # Utilidades
│   ├── pages/               # Páginas y API routes
│   │   └── api/             # Endpoint de presupuesto (Resend)
│   └── styles/              # Estilos globales
├── sanity.config.js         # Configuración de Sanity Studio
├── astro.config.mjs         # Configuración de Astro
└── package.json
```

---

## Instalación y desarrollo

```bash
# Clonar el repositorio
git clone git@github.com:apuralena/web-apl.git
cd web-apl

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Scripts disponibles

| Comando           | Descripción                           |
| ----------------- | ------------------------------------- |
| `npm run dev`     | Servidor de desarrollo con hot reload |
| `npm run build`   | Build de producción                   |
| `npm run preview` | Preview del build local               |

---

## Variables de entorno

Crear un archivo `.env` con las siguientes variables. Podés copiar `.env.example` como base:

```env
# Presupuestos por email
RESEND_API_KEY=tu_api_key_de_resend
EMAIL_DESTINO=consultas@tu-dominio.com

# Newsletter con Brevo
BREVO_API_KEY=tu_api_key_de_brevo
BREVO_SENDER_EMAIL=newsletter@tu-dominio.com
BREVO_SENDER_NAME="A Pura Leña"
BREVO_LIST_ID=3

# Panel simple de envío de newsletter
NEWSLETTER_PASSWORD=una_contraseña_segura
```

---

## Redes sociales

- 📸 [Instagram — @a_pura_lena](https://www.instagram.com/a_pura_lena/)
- 📘 [Facebook](https://www.facebook.com/people/A-pura-le%C3%B1a/61561940952103/)
- 🎥 [YouTube — @apuralena](https://www.youtube.com/@apuraleña)
- 💬 [WhatsApp](https://wa.me/5491139240988)

---

## Desarrollador

**Lucas Andres Gallardo**
📧 gallardolucas003@gmail.com
🐙 [GitHub — Lucas-Andres-GF](https://github.com/Lucas-Andres-GF)

---

## Licencia

Todos los derechos reservados © A Pura Leña.
