# 🤺 Fencing Pro v2.0 — PWA con Supabase

App multi-arma para esgrimistas y entrenadores. Funciona **offline** y sincroniza con la nube cuando hay internet.

---

## 📦 ¿Qué incluye este paquete?

| Archivo | Descripción |
|---------|-------------|
| `index.html` | La aplicación completa (PWA) |
| `sw.js` | Service Worker para instalación offline |
| `database.sql` | Tablas y seguridad para Supabase |

---

## 🚀 Pasos para ponerla en marcha

### Paso 1: Crear proyecto en Supabase

1. Ve a [https://supabase.com](https://supabase.com) e inicia sesión.
2. Crea un **New Project**.
3. Espera a que termine de provisionarse.

### Paso 2: Crear la base de datos

1. En tu proyecto Supabase, ve al **SQL Editor** (barra lateral izquierda).
2. Clic en **New query**.
3. Abre el archivo `database.sql` de este paquete, copia TODO el contenido y pégalo ahí.
4. Clic en **Run**.
5. Debería decir "Success. No rows returned".

### Paso 3: Configurar Auth con Google

1. Ve a **Authentication** → **Providers** → **Google**.
2. Actívalo (Status: **Enabled**).
3. Necesitas el **Client ID** y **Client Secret** de Google:
   - Ve a [Google Cloud Console](https://console.cloud.google.com/)
   - Crea un proyecto nuevo.
   - Ve a **APIs & Services** → **Credentials** → **Create Credentials** → **OAuth client ID**.
   - Tipo: **Web application**.
   - En **Authorized redirect URIs** agrega:
     ```
     https://TU_PROYECTO.supabase.co/auth/v1/callback
     ```
     (Reemplaza `TU_PROYECTO` por tu ID real de Supabase, lo ves en la URL del dashboard).
   - Guarda y copia el **Client ID** y **Client Secret** a Supabase.
4. Ve a **Authentication** → **URL Configuration**:
   - **Site URL**: `https://TUUSUARIO.github.io/fencing-app`
   - **Redirect URLs**: agrega `https://TUUSUARIO.github.io/fencing-app/**`

### Paso 4: Configurar tu app

Abre `index.html` y busca esta sección (está al inicio del `<script>`):

```javascript
const SUPABASE_URL = 'https://TU_PROYECTO.supabase.co';
const SUPABASE_ANON_KEY = 'TU_ANON_KEY';
```

Reemplaza con tus datos reales de Supabase:
- **URL**: la encuentras en **Project Settings** → **API** → **Project URL**.
- **Anon Key**: la encuentras en **Project Settings** → **API** → `anon public`.

### Paso 5: Subir a GitHub Pages

1. Crea un repositorio nuevo en GitHub (ej: `fencing-app`).
2. Sube estos 3 archivos (`index.html`, `sw.js`, `README.md`) a la raíz del repo.
3. Ve a **Settings** → **Pages** → Source: **Deploy from a branch** → selecciona `main` y `/root`.
4. Espera 1-2 minutos. Tu link será: `https://TUUSUARIO.github.io/fencing-app`

### Paso 6: Probar

1. Abre el link en tu celular.
2. Toca **"Ingresar con Google"**.
3. La primera vez te pedirá completar tu perfil (arma, categoría, rol).
4. ¡Listo! Empieza a registrar entrenamientos.

---

## 📱 Instalar en el celular

**Android (Chrome):**
- Abre la app → Menú ⋮ → **"Agregar a pantalla de inicio"** → Instalar.

**iPhone (Safari):**
- Abre la app → Compartir ⬆️ → **"Agregar a pantalla de inicio"**.

---

## 🔄 ¿Cómo funciona el modo offline?

- Todo se guarda **primero en tu celular**.
- Si no hay internet, la app sigue funcionando 100%.
- Cuando recuperas señal, toca el botón **"☁️ Sincronizar"** (o la app lo intenta sola).
- Los datos suben a Supabase y el entrenador puede verlos.

---

## 👨‍🏫 ¿Cómo une un atleta a su entrenador?

1. El **entrenador** va a **Gestionar Atletas** → **Generar código de invitación**.
2. Copia el código (ej: `FENCINGA3B9`).
3. Lo comparte por WhatsApp con el atleta.
4. El **atleta** va a su perfil (botón ⚙️) → **Unirme a un equipo** → pega el código.
5. ¡Listo! El entrenador ya puede ver sus datos.

---

## ⚠️ Importante

- No edites el archivo `sw.js` a menos que sepas qué haces.
- Si borras los datos del navegador sin sincronizar, los perderás. ¡Sincroniza seguido!
- El plan gratuito de Supabase incluye 500 MB de base de datos. Es más que suficiente para 10-20 atletas.

---

Creada con ❤️ para atletas de esgrima.
