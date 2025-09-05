import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function RequireAuth({ children, role }){
  const { user } = useAuth()
  const location = useLocation()
  if(!user || (role && user.role !== role)){
    const to = role === 'admin' ? '/admin/login' : '/login'
    return <Navigate to={to} state={{ from: location }} replace/>
  }
  return children
}
