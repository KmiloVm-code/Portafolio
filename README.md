# Portafolio Kmilo

Sitio de portafolio personal para presentar **experiencia**, **proyectos** y **formación**.  
Incluye un formulario de contacto con envío de correo (Resend) y despliegue en **Vercel**.

**Demo:** https://portafolio-kmilovm.vercel.app

---

## Qué encontrarás

- 📌 **Proyectos** con detalle por página
- 💼 **Experiencia** profesional
- 🎓 **Estudios** y **certificaciones**
- ✉️ **Contacto** (envío de mensaje por correo)

---

## Tecnologías

- **Astro 5**
- **Tailwind CSS**
- **Astro API Routes** (endpoint de contacto)
- **Resend** (envío de correos)
- **Vercel** (deploy)

---

## Contenido y estructura

- La app vive en `frontend/`.
- El contenido del portafolio está en `frontend/src/content/`:
  - experiencia
  - estudios
  - certificaciones
  - proyectos
- La página de detalle de proyecto se genera desde `frontend/src/pages/proyecto/[id].astro`.
- El formulario consume `POST /api/contact` (implementado en `frontend/src/pages/api/contact.ts`).

---

## Desarrollo local (opcional)

**Requisitos:** Node.js (recomendado **22 LTS**) y `pnpm`.

### Nota para Windows (build con Vercel adapter)

En Windows, el build con `@astrojs/vercel` puede requerir permisos para crear **symlinks**.  
Si ves un error tipo:

`EPERM: operation not permitted, symlink ...`

Habilita **Developer Mode** en Windows o ejecuta la terminal como **Administrador** y vuelve a correr el build.

### Instalar

```bash
cd frontend
pnpm install
```

### Variables de entorno (contacto)

Crea un archivo `frontend/.env` con:

```bash
RESEND_API_KEY=tu_api_key
CONTACT_TO=tu_correo_destino
CONTACT_FROM="Tu Nombre <no-reply@tudominio.com>"
```

> Nota: `CONTACT_FROM` debe ser un remitente permitido por tu configuración de Resend.

### Ejecutar

```bash
cd frontend
pnpm dev
```

- App: `http://localhost:4321`

### Build y preview

```bash
cd frontend
pnpm build
pnpm preview
```

---

## Despliegue

Configurado para **Vercel**.

- En Vercel: usar `frontend/` como raíz del proyecto
- Variables requeridas: `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM`

---

## Contacto

Si quieres ponerte en contacto conmigo, usa el formulario dentro del sitio.