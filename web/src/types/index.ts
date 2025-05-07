// 用户类型
export interface User {
  id: number;
  username: string;
  avatar: string;
  sex: number;
  age: number;
  createTime?: string;
  updateTime?: string;
  token?: string;
}

// 部门类型
export interface Department {
  id: number;
  name: string;
  description: string;
  createTime: string;
  updateTime: string;
}

// 员工类型
export interface Employee {
  id: number;
  name: string;
  departmentId: number;
  position: string;
  hireDate: string;
  createTime: string;
  updateTime: string;
}

// 薪资类型
export interface Salary {
  id: number;
  employeeId: number;
  salaryAmount: number;
  payDate: string;
  createTime: string;
  updateTime: string;
}

// 认证响应类型
export interface AuthResponse {
  id: number;
  username: string;
  avatar: string;
  sex: number;
  age: number;
  token: string;
  status?: string;
} 