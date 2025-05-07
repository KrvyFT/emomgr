import React, { useEffect, useState } from 'react';
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Popconfirm,
  Card,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { apiService } from '../../services';
import { Employee, Department } from '../../types';
import dayjs from 'dayjs';
import { showSuccess, showError, showNotification, crudMessages } from '../../utils/notification';

const EmployeeManagement: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('添加员工');
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const data = await apiService.employee.getAll();
      setEmployees(data);
      showSuccess(crudMessages.querySuccess);
    } catch (error) {
      showNotification(
        'error',
        crudMessages.queryError,
        '获取员工列表时发生错误，请稍后重试',
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const data = await apiService.department.getAll();
      setDepartments(data);
    } catch (error) {
      showNotification(
        'error',
        crudMessages.queryError,
        '获取部门列表时发生错误，请稍后重试',
      );
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, []);

  const handleAdd = () => {
    setModalTitle('添加员工');
    setEditingId(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record: Employee) => {
    setModalTitle('编辑员工');
    setEditingId(record.id);
    form.setFieldsValue({
      name: record.name,
      departmentId: record.departmentId,
      position: record.position,
      hireDate: record.hireDate ? dayjs(record.hireDate) : null,
    });
    setModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await apiService.employee.delete(id);
      showNotification(
        'success',
        crudMessages.deleteSuccess,
        `ID为${id}的员工已成功删除`,
      );
      fetchEmployees();
    } catch (error) {
      showNotification(
        'error',
        crudMessages.deleteError,
        '删除员工时发生错误，可能该员工还有关联的薪资记录',
      );
      console.error(error);
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      // 将 dayjs 对象转换为字符串
      const formattedValues = {
        ...values,
        hireDate: values.hireDate ? values.hireDate.format('YYYY-MM-DD') : '',
      };

      if (editingId) {
        await apiService.employee.update(editingId, formattedValues);
        showNotification(
          'success',
          crudMessages.updateSuccess,
          `员工 ${formattedValues.name} 信息已成功更新`,
        );
      } else {
        await apiService.employee.create(formattedValues);
        showNotification(
          'success',
          crudMessages.createSuccess,
          `员工 ${formattedValues.name} 已成功添加`,
        );
      }

      setModalVisible(false);
      fetchEmployees();
    } catch (error) {
      if (error instanceof Error) {
        showError(`操作失败: ${error.message}`);
      } else {
        showError('表单验证失败，请检查输入');
      }
      console.error('表单验证失败:', error);
    }
  };

  const getDepartmentName = (departmentId: number) => {
    const department = departments.find(dept => dept.id === departmentId);
    return department ? department.name : '未知部门';
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    },
    {
      title: '部门',
      dataIndex: 'departmentId',
      key: 'departmentId',
      width: 120,
      render: (departmentId: number) => getDepartmentName(departmentId),
    },
    {
      title: '职位',
      dataIndex: 'position',
      key: 'position',
      width: 150,
    },
    {
      title: '入职日期',
      dataIndex: 'hireDate',
      key: 'hireDate',
      width: 120,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 120,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: 120,
    },
    {
      title: '操作',
      key: 'action',
      fixed: 'right' as const,
      width: 150,
      render: (_: any, record: Employee) => (
        <Space size="small">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size="small"
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个员工吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              size="small"
            >
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card title="员工管理" className="shadow-md">
      <div className="mb-4">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          className="bg-blue-500"
        >
          添加员工
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={employees}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1200 }}
      />

      <Modal
        title={modalTitle}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        okText="确定"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item
            name="departmentId"
            label="部门"
            rules={[{ required: true, message: '请选择部门' }]}
          >
            <Select placeholder="请选择部门">
              {departments.map(dept => (
                <Select.Option key={dept.id} value={dept.id}>
                  {dept.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="position"
            label="职位"
            rules={[{ required: true, message: '请输入职位' }]}
          >
            <Input placeholder="请输入职位" />
          </Form.Item>
          <Form.Item
            name="hireDate"
            label="入职日期"
            rules={[{ required: true, message: '请选择入职日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default EmployeeManagement; 