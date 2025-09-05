import React, { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)

const DEFAULT_ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL ?? 'admin@akrk.dev'
const DEFAULT_ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? 'admin123'

export function AuthProvider({ children }){
  const [user, setUser] = useState(null)

  async function login({ email, password, role }){
    if(role === 'admin'){
      if(email === DEFAULT_ADMIN_EMAIL && password === DEFAULT_ADMIN_PASSWORD){
        setUser({ role: 'admin', email })
        return { ok: true }
      }
      return { ok: false, error: 'Credenciais administrativas inválidas.' }
    }
    if(!email || !password) return { ok: false, error: 'Informe email e senha.' }
    setUser({ role: 'user', email })
    return { ok: true }
  }

  function logout(){ setUser(null) }

  const value = useMemo(()=>({ user, login, logout }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(){
  const ctx = useContext(AuthContext)
  if(!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider')
  return ctx
}
