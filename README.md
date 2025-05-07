# emomgr - 员工管理系统

## 项目介绍
emomgr是一个基于Spring Boot和React开发的员工管理系统，提供用户认证、员工管理、部门管理及薪资管理等功能。系统采用前后端分离架构，后端基于RESTful API设计理念，前端使用React与Ant Design组件库构建现代化UI界面。

## 技术栈

### 后端
- Java 24
- Spring Boot 3.4.5
- Spring Security
- Spring Data JPA
- MariaDB/MySQL
- JWT认证

### 前端
- React
- TypeScript
- Ant Design 5.x
- Axios

## 系统功能
- 用户认证（登录/注册）
- 员工信息管理
- 部门管理
- 薪资管理
- 数据可视化

## 环境要求
- JDK 17+
- MariaDB 11.7+ 或 MySQL 8.0+
- Node.js 18+
- npm/yarn

## 安装步骤

### 数据库配置
1. 创建MariaDB/MySQL数据库：
   ```sql
   CREATE DATABASE emomgr;
   ```

2. 创建数据库用户并授权：
   ```sql
   CREATE USER 'krvy'@'localhost' IDENTIFIED BY 'vneipack';
   GRANT ALL PRIVILEGES ON emomgr.* TO 'krvy'@'localhost';
   FLUSH PRIVILEGES;
   ```

3. 运行初始化脚本：
   ```bash
   chmod +x init_database.sh
   ./init_database.sh
   ```

### 后端服务

1. 配置应用参数（可选）
   - 默认配置位于`src/main/resources/application.yml`
   - 可根据需要调整数据库连接、服务端口等配置

2. 编译并运行后端服务：
   ```bash
   mvn clean package
   java -jar target/emomgr-1.0.0.jar
   ```

   或使用Maven插件直接运行：
   ```bash
   mvn spring-boot:run
   ```

3. 服务将在默认端口8080启动

### 前端服务

1. 进入前端目录：
   ```bash
   cd web
   ```

2. 安装依赖：
   ```bash
   npm install
   ```
   或
   ```bash
   yarn
   ```

3. 启动开发服务器：
   ```bash
   npm run dev
   ```
   或
   ```bash
   yarn dev
   ```

4. 前端开发服务器将在端口3000启动，可通过http://localhost:3000访问

## API说明

系统提供以下主要API端点：

### 认证API
- `POST /auth/login` - 用户登录
- `POST /auth/register` - 用户注册

### 用户API
- `GET /api/users` - 获取所有用户
- `GET /api/users/{id}` - 获取指定用户
- `POST /api/users` - 创建用户
- `PUT /api/users/{id}` - 更新用户
- `DELETE /api/users/{id}` - 删除用户

### 部门API
- `GET /api/departments` - 获取所有部门
- `GET /api/departments/{id}` - 获取指定部门
- `POST /api/departments` - 创建部门
- `PUT /api/departments/{id}` - 更新部门
- `DELETE /api/departments/{id}` - 删除部门

### 员工API
- `GET /api/employees` - 获取所有员工
- `GET /api/employees/{id}` - 获取指定员工
- `POST /api/employees` - 创建员工
- `PUT /api/employees/{id}` - 更新员工
- `DELETE /api/employees/{id}` - 删除员工

### 薪资API
- `GET /api/salaries` - 获取所有薪资记录
- `GET /api/salaries/{id}` - 获取指定薪资记录
- `POST /api/salaries` - 创建薪资记录
- `PUT /api/salaries/{id}` - 更新薪资记录
- `DELETE /api/salaries/{id}` - 删除薪资记录

## 默认账户

系统初始化后包含以下测试账户：

| 用户名 | 密码 | 说明 |
|-------|------|-----|
| alice | password123 | 普通测试账户 |
| bob | securepass | 普通测试账户 |
| charlie | charliepwd | 普通测试账户 |

## 常见问题解决

### 数据库连接问题
- 检查数据库服务是否运行
- 确认连接信息在`application.yml`中配置正确
- 确认数据库用户有足够权限访问指定数据库

### 端口占用问题
如果8080端口被占用，可通过以下方式修改：
1. 在`application.properties`中添加：`server.port=8081`
2. 或启动时指定：`java -jar target/emomgr-1.0.0.jar --server.port=8081`

### API调用失败
- 确保JWT令牌已包含在请求头中：`Authorization: Bearer <token>`
- 检查令牌是否过期（默认有效期24小时）
- 验证请求参数格式是否正确

## 开发说明

### 数据模型
系统包含四个核心实体：
- User：系统用户信息
- Department：部门信息
- Employee：员工信息
- Salary：薪资信息

### 项目结构
```
emomgr/
├── src/main/            # 后端Java代码
│   ├── java/
│   │   └── com/krvy/emomgr/
│   │       ├── controller/  # REST控制器
│   │       ├── database/    # 实体类
│   │       ├── repository/  # 数据库访问层
│   │       ├── service/     # 业务逻辑层
│   │       └── util/        # 工具类
│   └── resources/       # 配置文件
└── web/                 # 前端代码
    ├── src/
    │   ├── components/  # React组件
    │   ├── pages/       # 页面组件
    │   ├── services/    # API服务
    │   └── types/       # TypeScript类型定义
    └── public/          # 静态资源
```

## 许可证

本项目基于MIT许可证开源。
