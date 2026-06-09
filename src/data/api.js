// Dynamically check for Vite environment variable, fallback to localhost
const PRODUCTION_URL = import.meta.env.VITE_API_URL; 
const BASE_URL = PRODUCTION_URL ? `${PRODUCTION_URL}/api` : 'http://localhost:5000/api';

// Helper to make API calls
const api = async (endpoint, method = 'GET', body = null, token = null) => {
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`

  const options = { method, headers }
  if (body) options.body = JSON.stringify(body)

  const response = await fetch(`${BASE_URL}${endpoint}`, options)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong')
  }

  return data
}

export default api