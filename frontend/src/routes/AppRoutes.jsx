import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RoleSelect from '../pages/RoleSelect'
import PublicOnlyRoute from './PublicOnlyRoute'
import {Navigate} from "react-router-dom";


const AppRoutes = () => {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path='/' element={<Navigate to="/role-select" replace/>}/>

      {/* Public Only */}
      <Route 
      path='/role-select'
      element={
        <PublicOnlyRoute>
          <RoleSelect />
        </PublicOnlyRoute>
      }
      />
    </Routes>
  )
}


export default AppRoutes
