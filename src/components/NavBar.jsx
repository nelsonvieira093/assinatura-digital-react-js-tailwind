import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function NavBar(){
  const { user, logout } = useAuth()
  return (
    <nav className="sticky top-0 z-10 border-b border-slate-800 bg-slate-900/80 backdrop-blur">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-cyan-300 text-cyan-900">NELSON SIGNED</span>
          <strong>Assinatura Digital</strong>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/" className="hover:underline">Início</Link>
          <Link to="/login" className="hover:underline">Usuário</Link>
          <Link to="/admin/login" className="hover:underline">Admin</Link>
          {user && (<>
            {user.role === 'admin' && (<>
              <Link to="/admin/new" className="hover:underline">Cadastrar</Link>
              <Link to="/admin/signed" className="hover:underline">Assinados</Link>
            </>)}
            <button className="btn-secondary" onClick={logout}>Sair</button>
          </>)}
        </div>
      </div>
    </nav>
  )
}
