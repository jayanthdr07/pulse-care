import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RoleSelect from '../pages/RoleSelect'
import PublicOnlyRoute from './PublicOnlyRoute'
import {Navigate} from "react-router-dom";
import AdminSignUp from '../pages/login/AdminSignUp';
import AdminLogin from '../pages/login/AdminLogin';
import AdminDashboard from '../pages/dashboard/AdminDashboard';
import StaffSignUp from '../pages/login/StaffSignUp';
import StaffLogin from '../pages/login/StaffLogin';


const AppRoutes = () => {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<Navigate to="/role-select" replace />} />

      {/* Public Only */}
      <Route
        path="/role-select"
        element={
          <PublicOnlyRoute>
            <RoleSelect />
          </PublicOnlyRoute>
        }
      />

      {/* Fallback Route */}
      <Route path="/signup/admin" element={<AdminSignUp />} />
      <Route path='/login/admin' element={<AdminLogin />}/>
      <Route path='/signup/staff' element={<StaffSignUp />}/>
      <Route path='/login/staff' element={<StaffLogin />}/>



      <Route path='/admin/dashboard' element={<AdminDashboard />}/>
    </Routes>
  );
}


export default AppRoutes
