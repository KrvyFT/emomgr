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
import { Salary, Employee } from '../../types';
import dayjs from 'dayjs';
import { showSuccess, showError, showNotification, crudMessages } from '../../utils/notification';

const SalaryManagement: React.FC = () => {
  const [salaries, setSalaries] = useState<Salary[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('添加薪资记录');
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchSalaries = async () => {
    try {
      setLoading(true);
      const data = await apiService.salary.getAll();
      setSalaries(data);
      showSuccess(crudMessages.querySuccess);
    } catch (error) {
      showNotification(
        'error',
        crudMessages.queryError,
        '获取薪资列表时发生错误，请稍后重试',
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const data = await apiService.employee.getAll();
      setEmployees(data);
    } catch (error) {
      showNotification(
        'error',
        crudMessages.queryError,
        '获取员工列表时发生错误，请稍后重试',
      );
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSalaries();
    fetchEmployees();
  }, []);

  const handleAdd = () => {
    setModalTitle('添加薪资记录');
    setEditingId(null);
    form.resetFields();
    form.setFieldsValue({
      payDate: dayjs(),
    });
    setModalVisible(true);
  };

  const handleEdit = (record: Salary) => {
    setModalTitle('编辑薪资记录');
    setEditingId(record.id);
    form.setFieldsValue({
      employeeId: record.employeeId,
      salaryAmount: record.salaryAmount,
      payDate: record.payDate ? dayjs(record.payDate) : null,
    });
    setModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await apiService.salary.delete(id);
      showNotification(
        'success',
        crudMessages.deleteSuccess,
        `ID为${id}的薪资记录已成功删除`,
      );
      fetchSalaries();
    } catch (error) {
      showNotification(
        'error',
        crudMessages.deleteError,
        '删除薪资记录时发生错误，请稍后重试',
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
        payDate: values.payDate ? values.payDate.format('YYYY-MM-DD') : '',
      };

      const employeeName = getEmployeeName(formattedValues.employeeId);

      if (editingId) {
        await apiService.salary.update(editingId, formattedValues);
        showNotification(
          'success',
          crudMessages.updateSuccess,
          `${employeeName}的薪资记录已成功更新`,
        );
      } else {
        await apiService.salary.create(formattedValues);
        showNotification(
          'success',
          crudMessages.createSuccess,
          `已成功添加${employeeName}的薪资记录`,
        );
      }

      setModalVisible(false);
      fetchSalaries();
    } catch (error) {
      if (error instanceof Error) {
        showError(`操作失败: ${error.message}`);
      } else {
        showError('表单验证失败，请检查输入');
      }
      console.error('表单验证失败:', error);
    }
  };

  const getEmployeeName = (employeeId: number) => {
    const employee = employees.find(emp => emp.id === employeeId);
    return employee ? employee.name : '未知员工';
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
    },
    {
      title: '员工姓名',
      dataIndex: 'employeeId',
      key: 'employeeId',
      width: 120,
      render: (employeeId: number) => getEmployeeName(employeeId),
    },
    {
      title: '薪资金额',
      dataIndex: 'salaryAmount',
      key: 'salaryAmount',
      width: 120,
      render: (amount: number) => `¥${amount.toLocaleString()}`,
    },
    {
      title: '发放日期',
      dataIndex: 'payDate',
      key: 'payDate',
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
      render: (_: any, record: Salary) => (
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
            title="确定要删除这条薪资记录吗？"
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
    <Card title="薪资管理" className="shadow-md">
      <div className="mb-4">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          className="bg-blue-500"
        >
          添加薪资记录
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={salaries}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 1000 }}
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
            name="employeeId"
            label="员工"
            rules={[{ required: true, message: '请选择员工' }]}
          >
            <Select placeholder="请选择员工">
              {employees.map(emp => (
                <Select.Option key={emp.id} value={emp.id}>
                  {emp.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="salaryAmount"
            label="薪资金额"
            rules={[{ required: true, message: '请输入薪资金额' }]}
          >
            <Input type="number" prefix="¥" placeholder="请输入薪资金额" />
          </Form.Item>
          <Form.Item
            name="payDate"
            label="发放日期"
            rules={[{ required: true, message: '请选择发放日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default SalaryManagement; 