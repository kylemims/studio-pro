import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored auth token
    const token = localStorage.getItem('authToken')
    if (token) {
      // In a real app, you would validate the token with your backend
      setUser({ 
        id: '1', 
        name: 'Your Name', 
        email: 'admin@yourstudio.com',
        role: 'admin'
      })
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      setLoading(true)
      // In a real app, you would make an API call here
      // For demo purposes, we'll simulate a successful login
      if (email === 'admin@yourstudio.com' && password === 'password') {
        const userData = { 
          id: '1', 
          name: 'Your Name', 
          email: 'admin@yourstudio.com',
          role: 'admin'
        }
        setUser(userData)
        localStorage.setItem('authToken', 'demo-token')
        return { success: true }
      } else {
        return { success: false, error: 'Invalid credentials' }
      }
    } catch (error) {
      return { success: false, error: 'Login failed' }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('authToken')
  }

  const value = {
    user,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}