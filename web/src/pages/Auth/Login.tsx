import React, { useState } from 'react';
import { Form, Input, Button, Card, Tabs, Radio } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { showSuccess, showError, showNotification } from '../../utils/notification';

const { TabPane } = Tabs;

interface LoginFormValues {
  username: string;
  password: string;
}

interface RegisterFormValues extends LoginFormValues {
  age: number;
  sex: number;
}

const Login: React.FC = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeKey, setActiveKey] = useState('login');

  const handleLogin = async (values: LoginFormValues) => {
    try {
      setLoading(true);
      await login(values.username, values.password);
      showNotification(
        'success',
        '登录成功',
        `欢迎回来，${values.username}！`,
      );
      navigate('/admin/employees');
    } catch (error: any) {
      showNotification(
        'error',
        '登录失败',
        error.message || '用户名或密码错误，请重试！',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (values: RegisterFormValues) => {
    try {
      setLoading(true);
      await register(values.username, values.password, values.age, values.sex);
      showNotification(
        'success',
        '注册成功',
        `账号 ${values.username} 已创建，欢迎加入！`,
      );
      navigate('/admin/employees');
    } catch (error: any) {
      showNotification(
        'error',
        '注册失败',
        error.message || '该用户名可能已被使用，请尝试其他用户名。',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-md">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">员工管理系统</h2>
          <p className="text-gray-500">登录以管理您的员工信息</p>
        </div>

        <Tabs activeKey={activeKey} onChange={setActiveKey}>
          <TabPane tab="登录" key="login">
            <Form
              name="login"
              initialValues={{ remember: true }}
              onFinish={handleLogin}
              layout="vertical"
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: '请输入用户名！' }]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="用户名"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: '请输入密码！' }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="密码"
                  size="large"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full bg-blue-500"
                  size="large"
                  loading={loading}
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </TabPane>

          <TabPane tab="注册" key="register">
            <Form
              name="register"
              onFinish={handleRegister}
              layout="vertical"
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: '请输入用户名！' }]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="用户名"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: '请输入密码！' }]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="密码"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="age"
                rules={[{ required: true, message: '请输入年龄！' }]}
              >
                <Input
                  type="number"
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="年龄"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                name="sex"
                rules={[{ required: true, message: '请选择性别！' }]}
              >
                <Radio.Group>
                  <Radio value={1}>男</Radio>
                  <Radio value={0}>女</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full bg-blue-500"
                  size="large"
                  loading={loading}
                >
                  注册
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Login; 