# 员工信息管理系统

这是一个基于 React + TypeScript 的员工信息管理系统，使用 Tailwind CSS 和 Ant Design 构建 UI。

## 功能特点

- 用户认证（登录/注册）
- 用户管理
- 员工管理
- 部门管理
- 薪资管理
- 适配桌面应用 (Tauri/Electron)
- 响应式设计

## 技术栈

- React 18
- TypeScript
- React Router v6
- Tailwind CSS
- Ant Design
- Axios

## 开发环境

### 先决条件

- Node.js >= 14.0.0
- npm >= 6.0.0

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm start
```

### 构建生产版本

```bash
npm run build
```

## 数据 API

系统默认使用模拟数据，可以通过配置切换到实际 API。

### 切换数据源

在 `.env` 文件中设置：

```
REACT_APP_USE_MOCK_DATA=false
REACT_APP_API_URL=http://your-api-url
```

## 项目结构

```
src/
  components/     # 共享组件
  contexts/       # React 上下文
  pages/          # 页面组件
    Auth/         # 认证相关页面
    DepartmentManagement/  # 部门管理
    EmployeeManagement/    # 员工管理
    SalaryManagement/      # 薪资管理
    UserManagement/        # 用户管理
  services/       # API 服务
  types/          # TypeScript 类型定义
  App.tsx         # 应用入口
  index.tsx       # 渲染入口
```

## 登录信息

使用以下账户登录：

- 用户名: admin
- 密码: 123456

或注册新用户。

## 许可证

MIT
