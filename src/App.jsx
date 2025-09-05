import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import NavBar from './components/NavBar'
import { AuthProvider } from './AuthContext'
import RequireAuth from './components/RequireAuth'

import AdminLogin from './pages/AdminLogin'
import AdminNewDoc from './pages/AdminNewDoc'
import AdminSignedList from './pages/AdminSignedList'
import UserLogin from './pages/UserLogin'
import UserSignDoc from './pages/UserSignDoc'

function Home(){
  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="card text-center">
        <h1 className="text-2xl font-bold">Plataforma de Assinatura Digital</h1>
        <p className="text-slate-300">Fluxo: <b>Backoffice</b> cadastra documento → <b>Usuário</b> assina → <b>Backoffice</b> consulta assinados.</p>
        <div className="grid md:grid-cols-2 gap-3 mt-4">
          <div className="card">
            <h3 className="text-lg font-semibold">Usuário Final</h3>
            <p className="text-slate-300">Faça login e assine o documento disponível.</p>
            <Link to="/login" className="btn-primary mt-2">Entrar como Usuário</Link>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold">Backoffice (Admin)</h3>
            <p className="text-slate-300">Acesse, cadastre documentos e consulte assinaturas.</p>
            <Link to="/admin/login" className="btn-secondary mt-2">Entrar como Admin</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App(){
  return (
    <AuthProvider>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<UserLogin/>} />
        <Route path="/sign" element={<RequireAuth role="user"><UserSignDoc/></RequireAuth>} />
        <Route path="/admin/login" element={<AdminLogin/>} />
        <Route path="/admin/new" element={<RequireAuth role="admin"><AdminNewDoc/></RequireAuth>} />
        <Route path="/admin/signed" element={<RequireAuth role="admin"><AdminSignedList/></RequireAuth>} />
      </Routes>
    </AuthProvider>
  )
}
