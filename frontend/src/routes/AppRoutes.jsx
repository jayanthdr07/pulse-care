import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RoleSelect from '../pages/RoleSelect'

const AppRoutes = () => {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path='/' element={<RoleSelect />}/>
    </Routes>
  )
}

export default AppRoutes