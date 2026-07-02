# Facheritos - Proyecto completo

Tienda infantil **Facheritos** (React) con API Node.js, Firebase Firestore y JWT.

Continuidad de cursos:
- **React**: frontend, carrito, panel admin
- **Node.js**: API REST en capas, autenticacion, persistencia en Firestore

## Estructura

```
facheritos-completo/
├── backend/     API Node.js (proyecto final)
├── frontend/    Facheritos React (Vite)
└── README.md
```

## Arquitectura

```
Frontend (Netlify)  →  API (Render)  →  Firebase (Firestore)
```

## Desarrollo local

### Backend

```bash
cd backend
cp .env.example .env   # completar variables
npm install
npm run seed           # importar productos (una vez)
npm run start:local    # Windows
```

API en `http://localhost:3001`

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

App en `http://localhost:5173`

Login admin: `admin@facheritos.com` / `admin123`

---

## Deploy en produccion

### Paso 1: GitHub

1. Crear repo en GitHub (ej. `facheritos-completo`)
2. Subir este proyecto:

```bash
cd facheritos-completo
git init
git add .
git commit -m "Proyecto completo Facheritos: React + API Node + Firebase"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/facheritos-completo.git
git push -u origin main
```

### Paso 2: Render (API backend)

1. Entrar a [render.com](https://render.com) y crear cuenta
2. **New +** → **Web Service**
3. Conectar el repo de GitHub
4. Configuracion:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. En **Environment**, agregar las variables del `.env.example` (valores reales)
6. Deploy → copiar la URL (ej. `https://facheritos-api.onrender.com`)

### Paso 3: Netlify (frontend React)

1. Entrar a [netlify.com](https://netlify.com)
2. **Add new site** → **Import from Git**
3. Elegir el mismo repo
4. Configuracion:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
5. En **Environment variables**:
   ```
   VITE_API_BASE_URL=https://facheritos-api.onrender.com
   ```
   (usar tu URL real de Render)
6. Deploy

### Paso 4: Probar

- Abrir la URL de Netlify
- Ver productos (vienen de Firebase via API)
- Login admin y crear/borrar un producto

---

## Variables de entorno

### Backend (`backend/.env`)

Ver `backend/.env.example`

### Frontend (`frontend/.env`)

```
VITE_API_BASE_URL=http://localhost:3001
```

En produccion (Netlify): la URL de Render.

---

## Endpoints API

| Metodo | Ruta | Auth |
|--------|------|------|
| GET | `/api/products` | No |
| GET | `/api/products/:id` | No |
| POST | `/api/products/create` | Si |
| PUT | `/api/products/:id` | Si |
| DELETE | `/api/products/:id` | Si |
| POST | `/auth/login` | No |
