# 员工管理系统 API 文档

## 概述
本文档详细描述了员工管理系统 (emomgr) 的 API 接口规范，包括认证、部门管理、员工管理、薪资管理和用户管理等功能模块。

## 认证接口

### 用户登录
- **URL**: `/auth/login`
- **方法**: POST
- **参数**:
  - `username`: 用户名
  - `password`: 密码
- **响应**:
  ```json
  {
    "id": 1,
    "username": "example",
    "avatar": "default",
    "sex": 0,
    "age": 25,
    "token": "eyJhbGciOiJIUzI1NiJ9..."
  }
  ```
- **错误响应**:
  ```json
  {
    "status": "error",
    "message": "Invalid credentials"
  }
  ```

### 用户注册
- **URL**: `/auth/register`
- **方法**: POST
- **参数**:
  - `username`: 用户名
  - `password`: 密码
  - `Age`: 年龄
  - `Sex`: 性别
- **响应**:
  ```json
  {
    "id": 1,
    "username": "example",
    "avatar": "Default",
    "sex": 0,
    "age": 25,
    "token": "eyJhbGciOiJIUzI1NiJ9...",
    "status": "success"
  }
  ```
- **错误响应**:
  ```json
  {
    "status": "error",
    "message": "Username already exists"
  }
  ```

## 部门管理

### 获取所有部门
- **URL**: `/api/departments`
- **方法**: GET
- **授权**: 需要 Bearer Token
- **响应**: 部门列表
  ```json
  [
    {
      "id": 1,
      "name": "研发部",
      "description": "负责产品研发",
      "createTime": "2023-01-01",
      "updateTime": "2023-01-01"
    },
    ...
  ]
  ```

### 获取单个部门
- **URL**: `/api/departments/{id}`
- **方法**: GET
- **授权**: 需要 Bearer Token
- **响应**: 部门详情
  ```json
  {
    "id": 1,
    "name": "研发部",
    "description": "负责产品研发",
    "createTime": "2023-01-01",
    "updateTime": "2023-01-01"
  }
  ```

### 创建部门
- **URL**: `/api/departments`
- **方法**: POST
- **授权**: 需要 Bearer Token
- **请求体**:
  ```json
  {
    "name": "市场部",
    "description": "负责市场营销"
  }
  ```
- **响应**: 创建的部门信息

### 更新部门
- **URL**: `/api/departments/{id}`
- **方法**: PUT
- **授权**: 需要 Bearer Token
- **请求体**:
  ```json
  {
    "name": "市场部",
    "description": "负责市场营销和品牌推广"
  }
  ```
- **响应**: 更新后的部门信息

### 删除部门
- **URL**: `/api/departments/{id}`
- **方法**: DELETE
- **授权**: 需要 Bearer Token
- **响应**: 204 No Content

## 员工管理

### 获取所有员工
- **URL**: `/api/employees`
- **方法**: GET
- **授权**: 需要 Bearer Token
- **响应**: 员工列表
  ```json
  [
    {
      "id": 1,
      "name": "张三",
      "departmentId": 1,
      "position": "工程师",
      "hireDate": "2023-01-01",
      "createTime": "2023-01-01",
      "updateTime": "2023-01-01"
    },
    ...
  ]
  ```

### 获取单个员工
- **URL**: `/api/employees/{id}`
- **方法**: GET
- **授权**: 需要 Bearer Token
- **响应**: 员工详情
  ```json
  {
    "id": 1,
    "name": "张三",
    "departmentId": 1,
    "position": "工程师",
    "hireDate": "2023-01-01",
    "createTime": "2023-01-01",
    "updateTime": "2023-01-01"
  }
  ```

### 创建员工
- **URL**: `/api/employees`
- **方法**: POST
- **授权**: 需要 Bearer Token
- **请求体**:
  ```json
  {
    "name": "李四",
    "departmentId": 2,
    "position": "销售经理",
    "hireDate": "2023-02-01"
  }
  ```
- **响应**: 创建的员工信息

### 更新员工
- **URL**: `/api/employees/{id}`
- **方法**: PUT
- **授权**: 需要 Bearer Token
- **请求体**:
  ```json
  {
    "name": "李四",
    "departmentId": 3,
    "position": "高级销售经理",
    "hireDate": "2023-02-01"
  }
  ```
- **响应**: 更新后的员工信息

### 删除员工
- **URL**: `/api/employees/{id}`
- **方法**: DELETE
- **授权**: 需要 Bearer Token
- **响应**: 204 No Content

## 薪资管理

### 获取所有薪资记录
- **URL**: `/api/salarys`
- **方法**: GET
- **授权**: 需要 Bearer Token
- **响应**: 薪资记录列表
  ```json
  [
    {
      "id": 1,
      "employeeId": 1,
      "salaryAmount": 10000,
      "payDate": "2023-05-01",
      "createTime": "2023-05-01",
      "updateTime": "2023-05-01"
    },
    ...
  ]
  ```

### 获取单个薪资记录
- **URL**: `/api/salarys/{id}`
- **方法**: GET
- **授权**: 需要 Bearer Token
- **响应**: 薪资详情
  ```json
  {
    "id": 1,
    "employeeId": 1,
    "salaryAmount": 10000,
    "payDate": "2023-05-01",
    "createTime": "2023-05-01",
    "updateTime": "2023-05-01"
  }
  ```

### 创建薪资记录
- **URL**: `/api/salarys`
- **方法**: POST
- **授权**: 需要 Bearer Token
- **请求体**:
  ```json
  {
    "employeeId": 2,
    "salaryAmount": 12000,
    "payDate": "2023-05-01"
  }
  ```
- **响应**: 创建的薪资记录

### 更新薪资记录
- **URL**: `/api/salarys/{id}`
- **方法**: PUT
- **授权**: 需要 Bearer Token
- **请求体**:
  ```json
  {
    "employeeId": 2,
    "salaryAmount": 13000,
    "payDate": "2023-05-01"
  }
  ```
- **响应**: 更新后的薪资记录

### 删除薪资记录
- **URL**: `/api/salarys/{id}`
- **方法**: DELETE
- **授权**: 需要 Bearer Token
- **响应**: 204 No Content

## 用户管理

### 获取所有用户
- **URL**: `/api/users`
- **方法**: GET
- **授权**: 需要 Bearer Token
- **响应**: 用户列表
  ```json
  [
    {
      "id": 1,
      "username": "admin",
      "avatar": "default",
      "sex": 1,
      "age": 30,
      "createTime": "2023-01-01",
      "updateTime": "2023-01-01"
    },
    ...
  ]
  ```

### 获取单个用户
- **URL**: `/api/users/{id}`
- **方法**: GET
- **授权**: 需要 Bearer Token
- **响应**: 用户详情
  ```json
  {
    "id": 1,
    "username": "admin",
    "avatar": "default",
    "sex": 1,
    "age": 30,
    "createTime": "2023-01-01",
    "updateTime": "2023-01-01"
  }
  ```

### 创建用户
- **URL**: `/api/users`
- **方法**: POST
- **授权**: 需要 Bearer Token
- **请求体**:
  ```json
  {
    "username": "manager",
    "password": "secret123",
    "avatar": "default",
    "sex": 0,
    "age": 28
  }
  ```
- **响应**: 创建的用户信息

### 更新用户
- **URL**: `/api/users/{id}`
- **方法**: PUT
- **授权**: 需要 Bearer Token
- **请求体**:
  ```json
  {
    "username": "manager",
    "avatar": "new_avatar",
    "sex": 0,
    "age": 29
  }
  ```
- **响应**: 更新后的用户信息

### 删除用户
- **URL**: `/api/users/{id}`
- **方法**: DELETE
- **授权**: 需要 Bearer Token
- **响应**: 204 No Content

## 认证说明

所有需要认证的 API 请求都必须在 HTTP 请求头中包含有效的 JWT token:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
```

Token 有效期为 24 小时，过期后需要重新登录获取新的 token。

## 错误响应

API 可能返回以下错误码：

- 400 Bad Request: 请求参数错误
- 401 Unauthorized: 未授权访问
- 404 Not Found: 请求的资源不存在
- 409 Conflict: 资源冲突（如用户名已存在）
- 500 Internal Server Error: 服务器内部错误