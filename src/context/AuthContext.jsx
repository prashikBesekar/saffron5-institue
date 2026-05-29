import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  // On app load — check if user was already logged in
  useEffect(() => {
    const savedToken = localStorage.getItem('saffron5_token')
    const savedUser = localStorage.getItem('saffron5_user')
    const savedRole = localStorage.getItem('saffron5_role')

    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
      setRole(savedRole)
    }
    setLoading(false)
  }, [])

  const login = (userData, userToken, userRole) => {
    setUser(userData)
    setToken(userToken)
    setRole(userRole)
    localStorage.setItem('saffron5_token', userToken)
    localStorage.setItem('saffron5_user', JSON.stringify(userData))
    localStorage.setItem('saffron5_role', userRole)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    setRole(null)
    localStorage.removeItem('saffron5_token')
    localStorage.removeItem('saffron5_user')
    localStorage.removeItem('saffron5_role')
  }

  return (
    <AuthContext.Provider value={{ user, token, role, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook — easy to use anywhere
export function useAuth() {
  return useContext(AuthContext)
}