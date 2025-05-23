import React, { useEffect, useState } from 'react';
import {
  Space,
  Modal,
  Form,
  Input,
  Radio,
  Popconfirm,
  Card,
  Avatar,
  Button,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UserOutlined } from '@ant-design/icons';
import { apiService } from '../../services';
import { User } from '../../types';
import { showSuccess, showError, showNotification, crudMessages } from '../../utils/notification';
import AnimatedTable from '../../components/common/AnimatedTable';
import AnimatedButton from '../../components/common/AnimatedButton';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('添加用户');
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await apiService.user.getAll();
      setUsers(data);
      showSuccess(crudMessages.querySuccess);
    } catch (error) {
      showNotification(
        'error',
        crudMessages.queryError,
        '获取用户列表时发生错误，请稍后重试',
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = () => {
    setModalTitle('添加用户');
    setEditingId(null);
    form.resetFields();
    form.setFieldsValue({
      avatar: 'default',
      sex: 1,
    });
    setModalVisible(true);
  };

  const handleEdit = (record: User) => {
    setModalTitle('编辑用户');
    setEditingId(record.id);
    form.setFieldsValue({
      username: record.username,
      avatar: record.avatar,
      sex: record.sex,
      age: record.age,
    });
    setModalVisible(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await apiService.user.delete(id);
      showNotification(
        'success',
        crudMessages.deleteSuccess,
        `ID为${id}的用户已成功删除`
      );
      fetchUsers();
    } catch (error) {
      showNotification(
        'error',
        crudMessages.deleteError,
        '删除用户时发生错误，请稍后重试',
      );
      console.error(error);
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();

      if (editingId) {
        await apiService.user.update(editingId, values);
        showNotification(
          'success',
          crudMessages.updateSuccess,
          `用户 ${values.username} 已成功更新`
        );
      } else {
        await apiService.user.create({
          ...values,
          password: values.password || '123456', // 默认密码
        });
        showNotification(
          'success',
          crudMessages.createSuccess,
          `用户 ${values.username} 已成功创建`
        );
      }

      setModalVisible(false);
      fetchUsers();
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
      width: 60,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      width: 120,
      render: (text: string, record: User) => (
        <div className="flex items-center">
          <Avatar icon={<UserOutlined />} className="mr-2" />
          {text}
        </div>
      ),
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex',
      width: 100,
      render: (sex: number) => (sex === 1 ? '男' : '女'),
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      width: 100,
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
      render: (_: any, record: User) => (
        <Space size="small">
          <AnimatedButton
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            size="small"
          >
            编辑
          </AnimatedButton>
          <Popconfirm
            title="确定要删除这个用户吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <AnimatedButton
              danger
              icon={<DeleteOutlined />}
              size="small"
              disabled={record.username === 'admin'} // 防止删除管理员账户
            >
              删除
            </AnimatedButton>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card title="用户管理" className="shadow-md card-hover-effect">
      <div className="mb-4 add-component-animation">
        <AnimatedButton
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAdd}
          className="bg-blue-500"
          rippleEffect={true}
          hoverScale={true}
        >
          添加用户
        </AnimatedButton>
      </div>

      <div className="fade-in">
        <AnimatedTable
          columns={columns}
          dataSource={users}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 10 }}
          scroll={{ x: 900 }}
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
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          {!editingId && (
            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>
          )}

          <Form.Item name="avatar" label="头像" hidden>
            <Input />
          </Form.Item>

          <Form.Item
            name="sex"
            label="性别"
            rules={[{ required: true, message: '请选择性别' }]}
          >
            <Radio.Group>
              <Radio value={1}>男</Radio>
              <Radio value={0}>女</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="age"
            label="年龄"
            rules={[{ required: true, message: '请输入年龄' }]}
          >
            <Input type="number" placeholder="请输入年龄" />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default UserManagement; 