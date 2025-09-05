import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function UserLogin(){
  const [email, setEmail] = useState('user@email.com')
  const [password, setPassword] = useState('123456')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  async function onSubmit(e){
    e.preventDefault()
    const res = await login({ email, password, role: 'user' })
    if(!res.ok){ setError(res.error || 'Erro ao logar'); return }
    navigate('/sign')
  }

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="card">
        <h2 className="text-xl font-semibold">Login do Usuário</h2>
        <form onSubmit={onSubmit} className="grid gap-3 mt-2">
          <label className="label">E-mail</label>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)}/>
          <label className="label">Senha</label>
          <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
          {error && <p className="text-sm text-slate-400">{error}</p>}
          <button className="btn-primary" type="submit">Entrar</button>
        </form>
      </div>
    </div>
  )
}
