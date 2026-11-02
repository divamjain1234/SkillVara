import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

// <PrivateRoute role="employer"> only lets that role in; without `role` any logged-in user can enter.
const PrivateRoute = ({ children, role }) => {
  const { isAuthenticated, user } = useContext(AuthContext)
  if (!isAuthenticated) {
    return <Navigate to="/login" replace={true} />
  }
  if (role && user?.role !== role) {
    return <Navigate to="/" replace={true} />
  }
  return children
}

export default PrivateRoute
