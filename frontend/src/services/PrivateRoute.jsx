import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }) => {
  const { isAuthenticated} = useContext(AuthContext)
  if (!isAuthenticated) {
    return <Navigate to="/login" replace={true} />
  }
  return children
}

export default PrivateRoute