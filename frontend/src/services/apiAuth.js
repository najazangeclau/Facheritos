const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'
const API_TOKEN_KEY = 'facheritos_api_token'

export const getApiToken = () => localStorage.getItem(API_TOKEN_KEY)

export const setApiToken = (token) => {
  if (token) {
    localStorage.setItem(API_TOKEN_KEY, token)
    return
  }
  localStorage.removeItem(API_TOKEN_KEY)
}

export const loginToApi = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'No se pudo iniciar sesion en la API')
  }

  setApiToken(data.token)
  return data
}

export const getApiAuthHeaders = () => {
  const token = getApiToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}
