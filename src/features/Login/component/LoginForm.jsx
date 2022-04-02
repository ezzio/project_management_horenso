import { Button, Checkbox, Form, Input, message, Typography } from 'antd';
import React from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../LoginSlice';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const loading = useSelector((state) => state.login.loading);
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Success:', values);
    form.resetFields();
    dispatch(userLogin(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      form={form}
      name="basic"
      initialValues={{ remember: false }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
      size="large"
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
      </Form.Item>

      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        {/* <Link style={{ float: 'right' }} to="/ForgotPassword">
          Forgot Password ?
        </Link> */}
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: '100%' }}
          loading={loading}
        >
          Login
        </Button>
      </Form.Item>

      <Link style={{ float: 'right' }} to="/sign-up">
        Register Now!
      </Link>
    </Form>
  );
};

export default LoginForm;
