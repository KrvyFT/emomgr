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
import NotificationTest from './pages/NotificationTest';
import './App.css';
import './styles/animations.css'; // 引入动画样式文件

// 添加错误边界组件
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("UI渲染错误:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="error-container">
        <h2>页面加载出错</h2>
        <p>请刷新页面重试</p>
        <button onClick={() => window.location.reload()} className="btn-ripple">刷新页面</button>
      </div>;
    }

    return this.props.children;
  }
}

// 定义主题配置
const themeConfig = {
  token: {
    colorPrimary: '#1a237e', // 设置主色调与MainLayout中一致
    borderRadius: 6,
    colorBgContainer: '#ffffff',
  },
  components: {
    Table: {
      colorBgContainer: '#ffffff',
      fontSize: 14,
    },
    Button: {
      borderRadius: 6,
      colorPrimary: '#1a237e',
    },
    Modal: {
      borderRadiusLG: 10,
    },
  },
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ConfigProvider locale={zhCN} theme={themeConfig}>
        <AuthProvider>
          <BrowserRouter>
            <div className="page-container">
              <Routes>
                <Route path="/login" element={<Login />} />

                <Route path="/admin" element={<ProtectedRoute />}>
                  <Route element={<MainLayout />}>
                    <Route path="departments" element={<DepartmentManagement />} />
                    <Route path="employees" element={<EmployeeManagement />} />
                    <Route path="salaries" element={<SalaryManagement />} />
                    <Route path="users" element={<UserManagement />} />
                    <Route path="notification-test" element={<NotificationTest />} />
                    <Route index element={<Navigate to="/admin/employees" replace />} />
                  </Route>
                </Route>

                <Route path="/" element={<Navigate to="/admin/employees" replace />} />
                <Route path="*" element={<Navigate to="/admin/employees" replace />} />
              </Routes>
            </div>
          </BrowserRouter>
        </AuthProvider>
      </ConfigProvider>
    </ErrorBoundary>
  );
};

export default App;
