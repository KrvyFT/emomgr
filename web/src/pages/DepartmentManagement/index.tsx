import React, { useEffect, useState } from 'react';
import {
  Space,
  Modal,
  Form,
  Input,
  Popconfirm,
  Card,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { apiService } from '../../services';
import { Department } from '../../types';
import { showSuccess, showError, showNotification, crudMessages } from '../../utils/notification';
import AnimatedTable from '../../components/common/AnimatedTable';
import AnimatedButton from '../../components/common/AnimatedButton';

const DepartmentManagement: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('添加部门');
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const data = await apiService.department.getAll();
      setDepartments(data);
      showSuccess(crudMessages.querySuccess);
    } catch (error) {
      showNotification(
        'error',
        crudMessages.queryError,
        '获取部门列表时发生错误，请稍后重试',
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleAdd = () => {
    setModalTitle('添加部门');
    setEditingId(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEdit = (record: Department) => {
    setModalTitle('编辑部门');
    setEditingId(record.id);
    form.setFieldsValue({
      name: record.name,
      description: record.description,
    });
    setModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await apiService.department.delete(id);
      showNotification(
        'success',
        crudMessages.deleteSuccess,
        `ID为${id}的部门已成功删除`,
      );
      fetchDepartments();
    } catch (error) {
      showNotification(
        'error',
        crudMessages.deleteError,
        '删除部门时发生错误，可能该部门下还有员工',
      );
      console.error(error);
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();

      if (editingId) {
        await apiService.department.update(editingId, values);
        showNotification(
          'success',
          crudMessages.updateSuccess,
          `部门 ${values.name} 已成功更新`,
        );
      } else {
        await apiService.department.create(values);
        showNotification(
          'success',
          crudMessages.createSuccess,
          `部门 ${values.name} 已成功创建`,
        );
      }

      setModalVisible(false);
      fetchDepartments();
    } catch (error) {
      if (error instanceof Error) {
        showError(`操作失败: ${error.message}`);
      } else {
        showError('表单验证失败，请检查输入');
      }
      console.error('表单验证失败:', error);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '部门名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '部门描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Department) => (
        <Space size="middle">
          <AnimatedButton
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size="small"
          >
            编辑
          </AnimatedButton>
          <Popconfirm
            title="确定要删除这个部门吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <AnimatedButton
              danger
              icon={<DeleteOutlined />}
              size="small"
            >
              删除
            </AnimatedButton>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card title="部门管理" className="shadow-md card-hover-effect">
      <div className="mb-4 add-component-animation">
        <AnimatedButton
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          className="bg-blue-500"
          rippleEffect={true}
          hoverScale={true}
        >
          添加部门
        </AnimatedButton>
      </div>

      <div className="fade-in">
        <AnimatedTable
          columns={columns}
          dataSource={departments}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
          highlightNewItems={true}
        />
      </div>

      <Modal
        title={modalTitle}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={() => setModalVisible(false)}
        okText="确定"
        cancelText="取消"
        className="modal-animation-enter"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="部门名称"
            rules={[{ required: true, message: '请输入部门名称' }]}
          >
            <Input placeholder="请输入部门名称" />
          </Form.Item>
          <Form.Item
            name="description"
            label="部门描述"
            rules={[{ required: true, message: '请输入部门描述' }]}
          >
            <Input.TextArea rows={4} placeholder="请输入部门描述" />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default DepartmentManagement; 