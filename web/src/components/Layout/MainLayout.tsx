import React, { useState, useEffect, useRef } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown, MenuProps } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  TeamOutlined,
  BankOutlined,
  DollarOutlined,
  LogoutOutlined,
  BarChartOutlined,
  SettingOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './MainLayout.css';

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // DOM引用
  const headerRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // 使用CSS动画替代GSAP，确保基本功能正常
  useEffect(() => {
    // 为元素添加淡入动画的类
    if (bannerRef.current) {
      bannerRef.current.classList.add('banner-fade-in');
    }
    if (sidebarRef.current) {
      sidebarRef.current.classList.add('sidebar-slide-in');
    }
    if (headerRef.current) {
      headerRef.current.classList.add('header-fade-in');
    }
    if (contentRef.current) {
      contentRef.current.classList.add('content-fade-in');
    }
  }, []);

  // 侧边栏折叠/展开
  useEffect(() => {
    if (sidebarRef.current) {
      // 使用纯CSS动画控制侧边栏宽度
      sidebarRef.current.style.width = collapsed ? '80px' : '220px';
    }
  }, [collapsed]);

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
    {
      key: 'notification-test',
      icon: <BellOutlined />,
      label: <Link to="/admin/notification-test">通知测试</Link>,
    },
    {
      key: 'analytics',
      icon: <BarChartOutlined />,
      label: <Link to="/admin/employees">数据分析</Link>,
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: <Link to="/admin/employees">系统设置</Link>,
    }
  ];

  const getSelectedKeys = () => {
    const path = location.pathname;
    if (path.includes('users')) return ['users'];
    if (path.includes('employees')) return ['employees'];
    if (path.includes('departments')) return ['departments'];
    if (path.includes('salaries')) return ['salaries'];
    if (path.includes('notification-test')) return ['notification-test'];
    if (path.includes('analytics')) return ['analytics'];
    if (path.includes('settings')) return ['settings'];
    return [];
  };

  // 生成当前时间
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const [time, setTime] = useState(getCurrentTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getCurrentTime());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Layout className="layout-container">
      {/* 顶部Banner */}
      <div
        ref={bannerRef}
        className="top-banner"
      >
        <div className="banner-content">
          <div className="banner-logo">
            <span className="logo-text">EMS</span>
            <span className="logo-dot"></span>
          </div>
          <div className="banner-info">
            <div className="banner-title">企业员工管理系统</div>
            <div className="banner-subtitle">Enterprise Management Solution</div>
          </div>
          <div className="banner-time">{time}</div>
        </div>
      </div>

      <Layout>
        <Sider
          ref={sidebarRef}
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="main-sidebar"
          width={220}
        >
          <div className="sidebar-header">
            <div className="sidebar-logo">
              {collapsed ? 'EMS' : '员工管理系统'}
            </div>
          </div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={getSelectedKeys()}
            items={menuItems}
            className="sidebar-menu"
          />
        </Sider>
        <Layout>
          <Header
            ref={headerRef}
            className="main-header"
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={toggleCollapsed}
              className="header-trigger"
            />
            <div className="header-right">
              <div className="header-notification">
                {/* 可以添加通知图标 */}
              </div>
              <Dropdown menu={{ items }} placement="bottomRight" arrow>
                <div className="header-avatar-container">
                  <Avatar
                    icon={<UserOutlined />}
                    className="header-avatar"
                  />
                  <span className="header-username">{currentUser?.username}</span>
                </div>
              </Dropdown>
            </div>
          </Header>
          <Content
            ref={contentRef}
            className="main-content"
          >
            <div className="content-wrapper">
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default MainLayout; 