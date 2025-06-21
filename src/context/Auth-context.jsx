"use client"

import { createContext, useContext, useState, useEffect } from "react"



const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email, password)  => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const mockUser = {
      id: "1",
      name: email.split("@")[0],
      email,
      provider: "email",
      joinDate: new Date().toISOString(),
      preferences: {
        newsletter: true,
        notifications: true,
        darkMode: false,
      },
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
    setIsLoading(false)
    return true
  }

  const loginWithGoogle = async () => {
    setIsLoading(true)
    // Simulate Google OAuth
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockUser = {
      id: "google_123",
      name: "John Doe",
      email: "john.doe@gmail.com",
      avatar: "/placeholder.svg?height=100&width=100",
      provider: "google",
      joinDate: new Date().toISOString(),
      preferences: {
        newsletter: true,
        notifications: true,
        darkMode: false,
      },
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
    setIsLoading(false)
    return true
  }

  const register = async (name, email, password) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const mockUser = {
      id: Date.now().toString(),
      name,
      email,
      provider: "email",
      joinDate: new Date().toISOString(),
      preferences: {
        newsletter: true,
        notifications: true,
        darkMode: false,
      },
    }

    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const updateProfile = (updates) => {
    if (user) {
      const updatedUser = { ...user, ...updates }
      setUser(updatedUser)
      localStorage.setItem("user", JSON.stringify(updatedUser))
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        loginWithGoogle,
        register,
        logout,
        updateProfile,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
