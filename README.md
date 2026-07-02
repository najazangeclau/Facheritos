# Facheritos

Hola. Este proyecto es la tienda **Facheritos** que arme en React, conectada con mi API en Node.js y los productos guardados en Firebase.

La idea es simple: la pagina web pide los productos a la API, y la API los guarda en la nube.

## Links

- [Tienda online](https://facheritos.netlify.app/)
- [API en Render](https://facheritos-1.onrender.com)
- [Repositorio en GitHub](https://github.com/najazangeclau/Facheritos)

## Como usarlo

1. Entrá a la [tienda online](https://facheritos.netlify.app/).
2. Navegá por los productos, categorías y carrito.
3. Para administrar productos, hacé login con:
   - Email: `admin@facheritos.com`
   - Password: `admin123`
4. Desde el panel admin podes crear, editar y borrar productos.

## Que hace cada parte

- `frontend/` → la tienda (productos, carrito, panel admin).
- `backend/` → la API (productos, login, JWT).
- `Firebase` → base de datos en la nube.

## Endpoints de la API

Base: `https://facheritos-1.onrender.com`

Ejemplos:

```bash
# Listar productos
GET /api/products

# Ver un producto
GET /api/products/987654321

# Login
POST /auth/login

# Crear producto (necesita token)
POST /api/products/create

# Eliminar producto (necesita token)
DELETE /api/products/:id
```

Body del login:

```json
{
  "username": "admin",
  "password": "admin123"
}
```

## API usada

En la pre-entrega usaba [FakeStore API](https://fakestoreapi.com).  
En este proyecto uso mi propia API en [Render](https://facheritos-1.onrender.com) y los productos quedan en Firebase.
