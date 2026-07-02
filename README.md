# Facheritos - Proyecto completo

Hola. Este proyecto es la tienda **Facheritos** que arme en React, ahora conectada con mi propia API en Node.js y los productos guardados en Firebase.

La idea es simple: la pagina web pide los productos a la API, y la API los guarda en la nube.

## Links online

- Tienda: https://facheritos.netlify.app/
- API: https://facheritos-1.onrender.com
- Codigo: https://github.com/najazangeclau/Facheritos

## Como usarlo en tu computadora

### Pagina web (React)

1. Abrí la terminal en la carpeta `frontend`.
2. Ejecutá:

```bash
npm install
npm run dev
```

3. Entrá a `http://localhost:5173`

### API (Node.js)

1. Abrí otra terminal en la carpeta `backend`.
2. Copiá `.env.example` a `.env` y completá las claves de Firebase.
3. Ejecutá:

```bash
npm install
npm run seed
npm run start:local
```

4. La API queda en `http://localhost:3001`

## Que hace cada parte

- `frontend/` → la tienda que ve el usuario (productos, carrito, admin).
- `backend/` → la API que maneja productos y login.
- **Firebase** → donde se guardan los productos en la nube.

Flujo:

```
Pagina web  →  API  →  Firebase
```

## Login de administrador

Para entrar al panel admin en la web:

- Email: `admin@facheritos.com`
- Password: `admin123`

Desde ahi podes crear, editar y borrar productos.

## Endpoints de la API

La API esta online en Render:

https://facheritos-1.onrender.com

### Listar productos

- Metodo: `GET`
- URL: `https://facheritos-1.onrender.com/api/products`

### Ver un producto por id

- Metodo: `GET`
- URL: `https://facheritos-1.onrender.com/api/products/:id`
- Ejemplo: `https://facheritos-1.onrender.com/api/products/987654321`

### Crear producto

- Metodo: `POST`
- URL: `https://facheritos-1.onrender.com/api/products/create`
- Necesita login (Bearer Token)

### Eliminar producto

- Metodo: `DELETE`
- URL: `https://facheritos-1.onrender.com/api/products/:id`
- Necesita login (Bearer Token)

### Login

- Metodo: `POST`
- URL: `https://facheritos-1.onrender.com/auth/login`

Body JSON:

```json
{
  "username": "admin",
  "password": "admin123"
}
```

## Si te aparece "fetch failed" en local

En Windows a veces pasa por temas de certificados.
El backend ya viene preparado para eso usando:

`node --use-system-ca`

Por eso en local se usa `npm run start:local` en vez de `npm start`.

## API usada

Antes en la pre-entrega usaba [FakeStore API](https://fakestoreapi.com).
Ahora este proyecto usa **mi propia API** desplegada en Render:

https://facheritos-1.onrender.com

Y los productos se guardan en **Firebase Firestore**.

## Continuidad del proyecto

Este trabajo sigue lo que fui haciendo en los cursos:

1. **React** → arme la tienda Facheritos.
2. **Pre-entrega Node** → practique pedir productos a una API (FakeStore).
3. **Pre-proyecto Node** → cree una API simple en localhost.
4. **Proyecto final** → API con capas, Firebase, JWT y todo online.

## Nota sobre Render

Si la API tarda en responder la primera vez, es normal.
En el plan gratis Render "duerme" cuando nadie la usa un rato.
Esperá unos segundos y recargá.
