import { User, Department, Employee, Salary, AuthResponse } from '../types';

// 模拟用户数据
const mockUsers: User[] = [
  {
    id: 1,
    username: 'admin',
    avatar: 'default',
    sex: 1,
    age: 30,
    createTime: '2023-01-01',
    updateTime: '2023-01-01',
  },
  {
    id: 2,
    username: 'user1',
    avatar: 'default',
    sex: 0,
    age: 28,
    createTime: '2023-01-10',
    updateTime: '2023-01-10',
  },
];

// 模拟部门数据
const mockDepartments: Department[] = [
  {
    id: 1,
    name: '研发部',
    description: '负责产品研发',
    createTime: '2023-01-01',
    updateTime: '2023-01-01',
  },
  {
    id: 2,
    name: '市场部',
    description: '负责市场营销',
    createTime: '2023-01-01',
    updateTime: '2023-01-01',
  },
  {
    id: 3,
    name: '人力资源部',
    description: '负责人员招聘和管理',
    createTime: '2023-01-01',
    updateTime: '2023-01-01',
  },
];

// 模拟员工数据
const mockEmployees: Employee[] = [
  {
    id: 1,
    name: '张三',
    departmentId: 1,
    position: '前端工程师',
    hireDate: '2023-01-01',
    createTime: '2023-01-01',
    updateTime: '2023-01-01',
  },
  {
    id: 2,
    name: '李四',
    departmentId: 1,
    position: '后端工程师',
    hireDate: '2023-01-05',
    createTime: '2023-01-05',
    updateTime: '2023-01-05',
  },
  {
    id: 3,
    name: '王五',
    departmentId: 2,
    position: '市场专员',
    hireDate: '2023-01-10',
    createTime: '2023-01-10',
    updateTime: '2023-01-10',
  },
];

// 模拟薪资数据
const mockSalaries: Salary[] = [
  {
    id: 1,
    employeeId: 1,
    salaryAmount: 15000,
    payDate: '2023-05-01',
    createTime: '2023-05-01',
    updateTime: '2023-05-01',
  },
  {
    id: 2,
    employeeId: 2,
    salaryAmount: 18000,
    payDate: '2023-05-01',
    createTime: '2023-05-01',
    updateTime: '2023-05-01',
  },
  {
    id: 3,
    employeeId: 3,
    salaryAmount: 12000,
    payDate: '2023-05-01',
    createTime: '2023-05-01',
    updateTime: '2023-05-01',
  },
];

// 模拟认证API
export const mockAuthAPI = {
  login: async (username: string, password: string): Promise<AuthResponse> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find((u) => u.username === username);
        if (user && password === '123456') {
          resolve({
            ...user,
            token: 'mock-token-' + Date.now(),
          });
        } else {
          reject({ message: '用户名或密码错误' });
        }
      }, 500);
    });
  },
  register: async (
    username: string,
    password: string,
    age: number,
    sex: number
  ): Promise<AuthResponse> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockUsers.some((u) => u.username === username)) {
          reject({ message: '用户名已存在' });
        } else {
          const newUser = {
            id: mockUsers.length + 1,
            username,
            avatar: 'default',
            sex,
            age,
            createTime: new Date().toISOString().split('T')[0],
            updateTime: new Date().toISOString().split('T')[0],
            token: 'mock-token-' + Date.now(),
          };
          mockUsers.push(newUser);
          resolve({
            ...newUser,
            status: 'success',
          });
        }
      }, 500);
    });
  },
};

// 模拟部门API
export const mockDepartmentAPI = {
  getAll: async (): Promise<Department[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockDepartments]);
      }, 500);
    });
  },
  getById: async (id: number): Promise<Department> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const department = mockDepartments.find((d) => d.id === id);
        if (department) {
          resolve({ ...department });
        } else {
          reject({ message: '部门不存在' });
        }
      }, 500);
    });
  },
  create: async (
    department: Pick<Department, 'name' | 'description'>
  ): Promise<Department> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newDepartment = {
          ...department,
          id: mockDepartments.length + 1,
          createTime: new Date().toISOString().split('T')[0],
          updateTime: new Date().toISOString().split('T')[0],
        };
        mockDepartments.push(newDepartment);
        resolve({ ...newDepartment });
      }, 500);
    });
  },
  update: async (
    id: number,
    department: Pick<Department, 'name' | 'description'>
  ): Promise<Department> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockDepartments.findIndex((d) => d.id === id);
        if (index !== -1) {
          const updatedDepartment = {
            ...mockDepartments[index],
            ...department,
            updateTime: new Date().toISOString().split('T')[0],
          };
          mockDepartments[index] = updatedDepartment;
          resolve({ ...updatedDepartment });
        } else {
          reject({ message: '部门不存在' });
        }
      }, 500);
    });
  },
  delete: async (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockDepartments.findIndex((d) => d.id === id);
        if (index !== -1) {
          mockDepartments.splice(index, 1);
          resolve();
        } else {
          reject({ message: '部门不存在' });
        }
      }, 500);
    });
  },
};

// 模拟员工API
export const mockEmployeeAPI = {
  getAll: async (): Promise<Employee[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockEmployees]);
      }, 500);
    });
  },
  getById: async (id: number): Promise<Employee> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const employee = mockEmployees.find((e) => e.id === id);
        if (employee) {
          resolve({ ...employee });
        } else {
          reject({ message: '员工不存在' });
        }
      }, 500);
    });
  },
  create: async (
    employee: Pick<Employee, 'name' | 'departmentId' | 'position' | 'hireDate'>
  ): Promise<Employee> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newEmployee = {
          ...employee,
          id: mockEmployees.length + 1,
          createTime: new Date().toISOString().split('T')[0],
          updateTime: new Date().toISOString().split('T')[0],
        };
        mockEmployees.push(newEmployee);
        resolve({ ...newEmployee });
      }, 500);
    });
  },
  update: async (
    id: number,
    employee: Pick<Employee, 'name' | 'departmentId' | 'position' | 'hireDate'>
  ): Promise<Employee> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockEmployees.findIndex((e) => e.id === id);
        if (index !== -1) {
          const updatedEmployee = {
            ...mockEmployees[index],
            ...employee,
            updateTime: new Date().toISOString().split('T')[0],
          };
          mockEmployees[index] = updatedEmployee;
          resolve({ ...updatedEmployee });
        } else {
          reject({ message: '员工不存在' });
        }
      }, 500);
    });
  },
  delete: async (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockEmployees.findIndex((e) => e.id === id);
        if (index !== -1) {
          mockEmployees.splice(index, 1);
          resolve();
        } else {
          reject({ message: '员工不存在' });
        }
      }, 500);
    });
  },
};

// 模拟薪资API
export const mockSalaryAPI = {
  getAll: async (): Promise<Salary[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockSalaries]);
      }, 500);
    });
  },
  getById: async (id: number): Promise<Salary> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const salary = mockSalaries.find((s) => s.id === id);
        if (salary) {
          resolve({ ...salary });
        } else {
          reject({ message: '薪资记录不存在' });
        }
      }, 500);
    });
  },
  create: async (
    salary: Pick<Salary, 'employeeId' | 'salaryAmount' | 'payDate'>
  ): Promise<Salary> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newSalary = {
          ...salary,
          id: mockSalaries.length + 1,
          createTime: new Date().toISOString().split('T')[0],
          updateTime: new Date().toISOString().split('T')[0],
        };
        mockSalaries.push(newSalary);
        resolve({ ...newSalary });
      }, 500);
    });
  },
  update: async (
    id: number,
    salary: Pick<Salary, 'employeeId' | 'salaryAmount' | 'payDate'>
  ): Promise<Salary> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockSalaries.findIndex((s) => s.id === id);
        if (index !== -1) {
          const updatedSalary = {
            ...mockSalaries[index],
            ...salary,
            updateTime: new Date().toISOString().split('T')[0],
          };
          mockSalaries[index] = updatedSalary;
          resolve({ ...updatedSalary });
        } else {
          reject({ message: '薪资记录不存在' });
        }
      }, 500);
    });
  },
  delete: async (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockSalaries.findIndex((s) => s.id === id);
        if (index !== -1) {
          mockSalaries.splice(index, 1);
          resolve();
        } else {
          reject({ message: '薪资记录不存在' });
        }
      }, 500);
    });
  },
};

// 模拟用户API
export const mockUserAPI = {
  getAll: async (): Promise<User[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...mockUsers]);
      }, 500);
    });
  },
  getById: async (id: number): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find((u) => u.id === id);
        if (user) {
          resolve({ ...user });
        } else {
          reject({ message: '用户不存在' });
        }
      }, 500);
    });
  },
  create: async (
    user: Pick<User, 'username' | 'avatar' | 'sex' | 'age'> & { password: string }
  ): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (mockUsers.some((u) => u.username === user.username)) {
          reject({ message: '用户名已存在' });
        } else {
          const newUser = {
            ...user,
            id: mockUsers.length + 1,
            createTime: new Date().toISOString().split('T')[0],
            updateTime: new Date().toISOString().split('T')[0],
          };
          mockUsers.push(newUser);
          resolve({ ...newUser });
        }
      }, 500);
    });
  },
  update: async (
    id: number,
    user: Pick<User, 'username' | 'avatar' | 'sex' | 'age'>
  ): Promise<User> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockUsers.findIndex((u) => u.id === id);
        if (index !== -1) {
          const updatedUser = {
            ...mockUsers[index],
            ...user,
            updateTime: new Date().toISOString().split('T')[0],
          };
          mockUsers[index] = updatedUser;
          resolve({ ...updatedUser });
        } else {
          reject({ message: '用户不存在' });
        }
      }, 500);
    });
  },
  delete: async (id: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockUsers.findIndex((u) => u.id === id);
        if (index !== -1) {
          mockUsers.splice(index, 1);
          resolve();
        } else {
          reject({ message: '用户不存在' });
        }
      }, 500);
    });
  },
}; 