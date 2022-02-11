import React, { useState } from 'react';
import { Button, Form, Input, message, Typography } from 'antd';

import './Register.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from './registerSlice';
import axios from 'axios';
import { API } from 'api/configApi';

const { Title, Text } = Typography;
const SignUp = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.signUp.loading);
  const [loadingCheckUsername, setLoadingCheckUsername] = useState(false);

  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  const onFinish = (values) => {
    const account = {
      user_name: values.username,
      email: values.email,
      password: values.password,
      avatar: '',
      display_name: values.displayName,
      phone: values.phone,
      bio: values.bio || '',
      company: values.company || '',
      address: values.address || '',
    };
    setLoadingCheckUsername(true);
    const checkValidUsername = async (value) => {
      await axios
        .post(`${API}/register/check-username`, { user_name: value })
        .then((res) => {
          if (!res.data.isSuccess) {
            setLoadingCheckUsername(false);
            dispatch(signUp(account));
          } else {
            setLoadingCheckUsername(false);
            message.error(
              'Your username is already existed, please change and try again'
            );
          }
        });
    };
    checkValidUsername(values.username);
  };

  return (
    <div className="ctn register">
      <div className="register__form">
        <Title
          level={3}
          style={{ width: 'fit-content', margin: '0 auto 3rem auto' }}
        >
          Create your Kanso Account
        </Title>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
          autoComplete={false}
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                min: 8,
                message: 'Your password at least 8 characters',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      'The two passwords that you entered do not match!'
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: 'Please input your phone number!',
              },
            ]}
          >
            <Input
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
          <Form.Item
            name="displayName"
            label="Display Name"
            tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: 'Please input your nickname!',
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="company" label="Company">
            <Input
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
          <Form.Item name="address" label="Address">
            <Input
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
          <Form.Item name="bio" label="Intro">
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>
          <Form.Item {...tailFormItemLayout} className="register__form__footer">
            <Button
              type="primary"
              style={{ borderRadius: '4px', padding: '0 1.5rem' }}
              loading={loading || loadingCheckUsername}
              htmlType="submit"
            >
              Sign up
            </Button>
            <Text style={{ margin: 0 }}>
              <Link to="/login">Sign in instead</Link>
            </Text>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
