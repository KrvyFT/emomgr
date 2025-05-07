import axios from 'axios';
import { config } from '../config';
import { User, Department, Employee, Salary, AuthResponse } from '../types';

// 创建axios实例
const api = axios.create({
  baseURL: config.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器，添加token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 认证相关API
export const authAPI = {
  login: async (username: string, password: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  },
  register: async (
    username: string,
    password: string,
    age: number,
    sex: number
  ): Promise<AuthResponse> => {
    const response = await api.post('/auth/register', {
      username,
      password,
      Age: age,
      Sex: sex,
    });
    return response.data;
  },
};

// 部门相关API
export const departmentAPI = {
  getAll: async (): Promise<Department[]> => {
    const response = await api.get('/api/departments');
    return response.data;
  },
  getById: async (id: number): Promise<Department> => {
    const response = await api.get(`/api/departments/${id}`);
    return response.data;
  },
  create: async (
    department: Pick<Department, 'name' | 'description'>
  ): Promise<Department> => {
    const response = await api.post('/api/departments', department);
    return response.data;
  },
  update: async (
    id: number,
    department: Pick<Department, 'name' | 'description'>
  ): Promise<Department> => {
    const response = await api.put(`/api/departments/${id}`, department);
    return response.data;
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/departments/${id}`);
  },
};

// 员工相关API
export const employeeAPI = {
  getAll: async (): Promise<Employee[]> => {
    const response = await api.get('/api/employees');
    return response.data;
  },
  getById: async (id: number): Promise<Employee> => {
    const response = await api.get(`/api/employees/${id}`);
    return response.data;
  },
  create: async (
    employee: Pick<Employee, 'name' | 'departmentId' | 'position' | 'hireDate'>
  ): Promise<Employee> => {
    const response = await api.post('/api/employees', employee);
    return response.data;
  },
  update: async (
    id: number,
    employee: Pick<Employee, 'name' | 'departmentId' | 'position' | 'hireDate'>
  ): Promise<Employee> => {
    const response = await api.put(`/api/employees/${id}`, employee);
    return response.data;
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/employees/${id}`);
  },
};

// 薪资相关API
export const salaryAPI = {
  getAll: async (): Promise<Salary[]> => {
    const response = await api.get('/api/salarys');
    return response.data;
  },
  getById: async (id: number): Promise<Salary> => {
    const response = await api.get(`/api/salarys/${id}`);
    return response.data;
  },
  create: async (
    salary: Pick<Salary, 'employeeId' | 'salaryAmount' | 'payDate'>
  ): Promise<Salary> => {
    const response = await api.post('/api/salarys', salary);
    return response.data;
  },
  update: async (
    id: number,
    salary: Pick<Salary, 'employeeId' | 'salaryAmount' | 'payDate'>
  ): Promise<Salary> => {
    const response = await api.put(`/api/salarys/${id}`, salary);
    return response.data;
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/salarys/${id}`);
  },
};

// 用户相关API
export const userAPI = {
  getAll: async (): Promise<User[]> => {
    const response = await api.get('/api/users');
    return response.data;
  },
  getById: async (id: number): Promise<User> => {
    const response = await api.get(`/api/users/${id}`);
    return response.data;
  },
  create: async (
    user: Pick<User, 'username' | 'avatar' | 'sex' | 'age'> & { password: string }
  ): Promise<User> => {
    const response = await api.post('/api/users', user);
    return response.data;
  },
  update: async (
    id: number,
    user: Pick<User, 'username' | 'avatar' | 'sex' | 'age'>
  ): Promise<User> => {
    const response = await api.put(`/api/users/${id}`, user);
    return response.data;
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/users/${id}`);
  },
}; 