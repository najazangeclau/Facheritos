import { getApiAuthHeaders } from './apiAuth'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'
const PRODUCTS_URL = `${API_BASE_URL}/api/products`
const CREATE_URL = `${API_BASE_URL}/api/products/create`

async function request(url, options = {}) {
  const finalOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    ...options
  }

  const response = await fetch(url, finalOptions)
  if (!response.ok) {
    let message = `Error ${response.status}: ${response.statusText}`
    try {
      const errorBody = await response.json()
      if (errorBody?.message) {
        message = errorBody.message
      }
    } catch {
      // Ignorar parse fallido
    }
    throw new Error(message)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

async function loadLocalProducts() {
  const localRes = await fetch('/products.json', { cache: 'no-store' })
  if (!localRes.ok) {
    throw new Error('No se pudo acceder al catalogo local')
  }
  const localData = await localRes.json()
  return localData.map((p) => {
    if (p.categoria) return p
    const img = String(p.imagen || '')
    const categoria = img.includes('/ropa-nina/')
      ? 'ninas'
      : img.includes('/ropa-nino/')
      ? 'ninos'
      : img.includes('/accesorios/')
      ? 'accesorios'
      : 'productos'
    return { ...p, categoria }
  })
}

function normalizeIncomingProduct(product) {
  return {
    ...product,
    id: product.id,
    nombre: product.nombre || product.title || '',
    precio: Number(product.precio ?? product.price ?? 0),
    categoria: product.categoria || product.category || 'productos',
    descripcion:
      product.descripcion ||
      product.description ||
      'Producto disponible en Facherit@s.',
    imagen: product.imagen || product.image || '/img/logo.png'
  }
}

function toApiPayload(product) {
  return {
    title: product.nombre,
    price: product.precio,
    category: product.categoria,
    description: product.descripcion,
    image: product.imagen
  }
}

export const productsApi = {
  async getAll() {
    try {
      const data = await request(PRODUCTS_URL)
      return Array.isArray(data) ? data.map(normalizeIncomingProduct) : []
    } catch (error) {
      console.warn('API Node no disponible, usando catalogo local.', error)
      const fallbackData = await loadLocalProducts()
      return fallbackData.map(normalizeIncomingProduct)
    }
  },

  async create(product) {
    const created = await request(CREATE_URL, {
      method: 'POST',
      headers: getApiAuthHeaders(),
      body: JSON.stringify(toApiPayload(product))
    })
    return normalizeIncomingProduct(created)
  },

  async update(id, product) {
    const updated = await request(`${PRODUCTS_URL}/${id}`, {
      method: 'PUT',
      headers: getApiAuthHeaders(),
      body: JSON.stringify(toApiPayload(product))
    })
    return normalizeIncomingProduct(updated)
  },

  async remove(id) {
    await request(`${PRODUCTS_URL}/${id}`, {
      method: 'DELETE',
      headers: getApiAuthHeaders()
    })
    return true
  }
}

export async function fetchProducts() {
  return productsApi.getAll()
}
