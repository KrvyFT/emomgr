import { config } from '../config';
import { authAPI, departmentAPI, employeeAPI, salaryAPI, userAPI } from './api';
import {
  mockAuthAPI,
  mockDepartmentAPI,
  mockEmployeeAPI,
  mockSalaryAPI,
  mockUserAPI,
} from './mockData';

// 根据配置选择使用真实API或Mock数据
export const apiService = {
  auth: config.USE_MOCK_DATA ? mockAuthAPI : authAPI,
  department: config.USE_MOCK_DATA ? mockDepartmentAPI : departmentAPI,
  employee: config.USE_MOCK_DATA ? mockEmployeeAPI : employeeAPI,
  salary: config.USE_MOCK_DATA ? mockSalaryAPI : salaryAPI,
  user: config.USE_MOCK_DATA ? mockUserAPI : userAPI,
}; 