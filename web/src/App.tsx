import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './components/Layout/MainLayout';
import Login from './pages/Auth/Login';
import DepartmentManagement from './pages/DepartmentManagement';
import EmployeeManagement from './pages/EmployeeManagement';
import SalaryManagement from './pages/SalaryManagement';
import UserManagement from './pages/UserManagement';
import './App.css';

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route path="/admin" element={<ProtectedRoute />}>
              <Route element={<MainLayout />}>
                <Route path="departments" element={<DepartmentManagement />} />
                <Route path="employees" element={<EmployeeManagement />} />
                <Route path="salaries" element={<SalaryManagement />} />
                <Route path="users" element={<UserManagement />} />
              </Route>
            </Route>

            <Route path="/" element={<Navigate to="/admin/employees" replace />} />
            <Route path="*" element={<Navigate to="/admin/employees" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ConfigProvider>
  );
};

export default App;
