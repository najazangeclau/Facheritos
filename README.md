# Facheritos - Proyecto completo

Hola. Este es el proyecto final de **Facheritos**, la tienda infantil que arme en React, ahora conectada con una API en Node.js y los productos guardados en Firebase.

## Links del proyecto online

- **Tienda:** https://facheritos.netlify.app/
- **API:** https://facheritos-1.onrender.com
- **Codigo:** https://github.com/najazangeclau/Facheritos

## Que es cada cosa (en simple)

- **frontend/** → la pagina web de Facheritos (React)
- **backend/** → la API que maneja productos y login (Node.js)
- **Firebase** → donde se guardan los productos en la nube

Flujo:

```
Pagina web  →  API  →  Firebase
```

## Como usarlo en tu computadora

### 1) Backend (API)

```bash
cd backend
npm install
```

Copia `.env.example` a `.env` y completa las claves de Firebase.

Para importar los productos de Facheritos a Firebase (solo la primera vez):

```bash
npm run seed
```

Para prender el servidor:

```bash
npm run start:local
```

Queda en: `http://localhost:3001`

### 2) Frontend (pagina web)

```bash
cd frontend
npm install
npm run dev
```

Queda en: `http://localhost:5173`

## Login de administrador

Para entrar al panel admin en la web:

- Email: `admin@facheritos.com`
- Password: `admin123`

## Endpoints de la API

### Listar productos

- Metodo: `GET`
- URL: `https://facheritos-1.onrender.com/api/products`

### Ver un producto

- Metodo: `GET`
- URL: `https://facheritos-1.onrender.com/api/products/:id`

### Crear producto (necesita login)

- Metodo: `POST`
- URL: `https://facheritos-1.onrender.com/api/products/create`
- Header: `Authorization: Bearer TU_TOKEN`

Body JSON:

```json
{
  "title": "Buzo Frizado",
  "price": 22000,
  "category": "buzos",
  "description": "Buzo comodo para ninos",
  "image": "/img/logo.png"
}
```

### Editar producto (necesita login)

- Metodo: `PUT`
- URL: `https://facheritos-1.onrender.com/api/products/:id`

### Eliminar producto (necesita login)

- Metodo: `DELETE`
- URL: `https://facheritos-1.onrender.com/api/products/:id`

### Login (para obtener el token)

- Metodo: `POST`
- URL: `https://facheritos-1.onrender.com/auth/login`

Body JSON:

```json
{
  "username": "admin",
  "password": "admin123"
}
```

## Continuidad del proyecto

Este trabajo es la evolucion de lo que fui haciendo en los cursos:

1. **React** → arme la tienda Facheritos con carrito y panel admin
2. **Pre-entrega Node** → practique pedir productos a una API
3. **Pre-proyecto Node** → cree una API simple en localhost
4. **Proyecto final** → API con capas, Firebase, JWT y deploy online

## Estructura del repo

```
Facheritos/
├── backend/     API Node.js
├── frontend/    Pagina React
└── README.md
```

## Nota sobre Render (plan gratis)

Si la API tarda en responder la primera vez, es normal. Render "duerme" cuando nadie la usa un rato. Espera unos segundos y recarga.
