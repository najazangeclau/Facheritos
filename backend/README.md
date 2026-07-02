# Proyecto Final Node.js - API de Productos

API REST con Express, Firebase Firestore y autenticacion JWT para administrar productos.

## Requisitos cumplidos

- Arquitectura en capas: rutas, controladores, servicios, modelos, middlewares y config
- CRUD de productos con persistencia en Firestore
- Login con JWT (`POST /auth/login`)
- Rutas protegidas para crear y eliminar productos
- Manejo de errores 400, 401, 403, 404 y 500

## Instalacion

```bash
npm install
```

## Configuracion

1. Copia `.env.example` a `.env`
2. Completa las variables de Firebase desde la consola de [Firebase](https://console.firebase.google.com/)
3. Crea un proyecto Firestore y una coleccion llamada `products`
4. Agrega un documento de ejemplo con esta estructura:

```json
{
  "title": "Remera Dino",
  "price": 12000,
  "category": "remeras",
  "description": "Remera de algodon para ninos",
  "image": "https://ejemplo.com/imagen.jpg"
}
```

5. En Firestore > Reglas, habilita lectura/escritura para desarrollo (o ajusta segun tu caso):

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

## Ejecutar

```bash
npm run start
```

El servidor queda en `http://localhost:3001`

## Endpoints

### Auth

`POST /auth/login`

```json
{
  "username": "admin",
  "password": "admin123"
}
```

Respuesta:

```json
{
  "success": true,
  "message": "Inicio de sesion exitoso.",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer"
}
```

### Productos

| Metodo | Ruta | Auth | Descripcion |
|--------|------|------|-------------|
| GET | `/api/products` | No | Lista todos los productos |
| GET | `/api/products/:id` | No | Obtiene un producto por ID |
| POST | `/api/products/create` | Si | Crea un producto |
| DELETE | `/api/products/:id` | Si | Elimina un producto |

Para rutas protegidas, envia el header:

```
Authorization: Bearer <token>
```

### Ejemplo crear producto

```bash
curl -X POST http://localhost:3001/api/products/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TU_TOKEN" \
  -d "{\"title\":\"Buzo Frizado\",\"price\":22000,\"category\":\"buzos\"}"
```

## Importar productos de Facheritos a Firestore

Los 22 productos de `public/products.json` ya estan copiados en `data/products.json`.

Cuando tengas Firebase configurado en `.env`, ejecuta:

```bash
npm run seed
```

Eso sube todos los productos a la coleccion `products` en Firestore, conservando el mismo ID de cada uno.

Si queres reimportar todo:

```bash
npm run seed -- --force
```

Tambien podes apuntar a otro archivo JSON:

```
FACHERITOS_PRODUCTS_PATH=D:\ruta\a\products.json
```

## Integracion con Facheritos (React)

1. En React, copia `.env.example` a `.env` con `VITE_API_BASE_URL=http://localhost:3001`
2. Levanta esta API: `npm run start`
3. Levanta React: `npm run dev`
4. Inicia sesion en Facheritos como admin (`admin@facheritos.com` / `admin123`)
5. El panel admin creara, editara y eliminara productos en Firestore via esta API

Flujo: **React -> API Node -> Firestore**


```
proyecto-final-nodejs/
├── config/
│   └── firebase.config.js
├── controllers/
│   ├── auth.controller.js
│   └── products.controller.js
├── middlewares/
│   └── auth.middleware.js
├── models/
│   └── product.model.js
├── routes/
│   ├── auth.routes.js
│   └── products.routes.js
├── services/
│   ├── auth.service.js
│   └── products.service.js
├── index.js
├── .env
└── package.json
```
