import { Button, Checkbox, Form, Input, message, Typography } from 'antd';
import React from 'react';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../LoginSlice';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const loading = useSelector((state) => state.login.loading);
  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log('Success:', values);
    message.success('Login Completed!');
    dispatch(userLogin(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    // message.error('Your password or account is not valid!');
  };
  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
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

        <Link style={{ float: 'right' }} path="/ForgotPassword">
          Forgot Password ?
        </Link>
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

      <Link style={{ float: 'right' }} path="/sign-up">
        Register Now!
      </Link>
    </Form>
  );
};

export default LoginForm;
