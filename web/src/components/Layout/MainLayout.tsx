import React, { useState } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, MenuProps } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  TeamOutlined,
  BankOutlined,
  DollarOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className="px-4 py-2">
          <div className="font-medium">{currentUser?.username}</div>
          <div className="text-gray-500 text-sm">
            {currentUser?.sex === 1 ? '男' : '女'}, {currentUser?.age}岁
          </div>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <Button
          type="text"
          icon={<LogoutOutlined />}
          onClick={handleLogout}
          className="w-full text-left"
        >
          退出登录
        </Button>
      ),
    },
  ];

  const menuItems = [
    {
      key: 'users',
      icon: <UserOutlined />,
      label: <Link to="/admin/users">用户管理</Link>,
    },
    {
      key: 'employees',
      icon: <TeamOutlined />,
      label: <Link to="/admin/employees">员工管理</Link>,
    },
    {
      key: 'departments',
      icon: <BankOutlined />,
      label: <Link to="/admin/departments">部门管理</Link>,
    },
    {
      key: 'salaries',
      icon: <DollarOutlined />,
      label: <Link to="/admin/salaries">工资管理</Link>,
    },
  ];

  const getSelectedKeys = () => {
    const path = location.pathname;
    if (path.includes('users')) return ['users'];
    if (path.includes('employees')) return ['employees'];
    if (path.includes('departments')) return ['departments'];
    if (path.includes('salaries')) return ['salaries'];
    return [];
  };

  return (
    <Layout className="min-h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed} className="bg-white">
        <div className="h-16 flex items-center justify-center bg-gray-800">
          <h1 className="text-white text-lg font-bold">
            {collapsed ? 'EMS' : '员工管理系统'}
          </h1>
        </div>
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={getSelectedKeys()}
          items={menuItems}
          className="border-r"
        />
      </Sider>
      <Layout>
        <Header className="bg-white p-0 px-4 flex justify-between items-center border-b">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapsed}
            className="text-xl"
          />
          <div className="flex items-center">
            <Dropdown menu={{ items }} placement="bottomRight" arrow>
              <div className="flex items-center cursor-pointer">
                <Avatar
                  icon={<UserOutlined />}
                  className="bg-blue-500"
                />
                <span className="ml-2 mr-4">{currentUser?.username}</span>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content className="p-6 bg-gray-50">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 