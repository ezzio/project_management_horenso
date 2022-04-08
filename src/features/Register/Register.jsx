import React, { useState } from "react";
import { Button, Form, Input, message, Tooltip, Typography } from "antd";
import "./Register.scss";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import { GoLocation } from "react-icons/go";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "./registerSlice";
import axios from "axios";
import { API } from "api/configApi";
import { InfoCircleOutlined } from "@ant-design/icons";

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
      avatar: "",
      display_name: values.displayName,
      phone: values.phone,
      bio: values.bio || "",
      company: values.company || "",
      address: values.address || "",
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
              "Your username is already existed, please change and try again"
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
          style={{ width: "fit-content", margin: "0 auto 3rem auto" }}
        >
          Create your Kanso Account
        </Title>
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
          autoComplete={false}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              placeholder="Username"
              size="large"
              prefix={<UserOutlined />}
              suffix={
                <Tooltip title="Required information">
                  <InfoCircleOutlined style={{ color: "red" }} />
                </Tooltip>
              }
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input
              placeholder="E-mail"
              size="large"
              prefix={<MailOutlined />}
              suffix={
                <Tooltip title="Required information">
                  <InfoCircleOutlined style={{ color: "red" }} />
                </Tooltip>
              }
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              {
                min: 8,
                message: "Your password at least 8 characters",
              },
            ]}
            hasFeedback
          >
            <Input.Password
              placeholder="Password"
              size="large"
              prefix={<LockOutlined />}
              suffix={
                <Tooltip title="Required information">
                  <InfoCircleOutlined style={{ color: "red" }} />
                </Tooltip>
              }
            />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Confirm Password"
              size="large"
              prefix={<LockOutlined />}
              suffix={
                <Tooltip title="Required information">
                  <InfoCircleOutlined style={{ color: "red" }} />
                </Tooltip>
              }
            />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input
              size="large"
              placeholder="Phone Number"
              prefix={<PhoneOutlined />}
              suffix={
                <Tooltip title="Required information">
                  <InfoCircleOutlined style={{ color: "red" }} />
                </Tooltip>
              }
            />
          </Form.Item>
          <Form.Item
            name="displayName"
            rules={[
              {
                required: true,
                message: "Please input your nickname!",
                whitespace: true,
              },
            ]}
          >
            <Input
              placeholder="Display Name"
              size="large"
              prefix={<ContactsOutlined />}
              suffix={
                <Tooltip title="Required information">
                  <InfoCircleOutlined style={{ color: "red" }} />
                </Tooltip>
              }
            />
          </Form.Item>

          <Form.Item name="company">
            <Input
              placeholder="Company"
              size="large"
              prefix={<HiOutlineOfficeBuilding />}
            />
          </Form.Item>
          <Form.Item name="address">
            <Input size="large" placeholder="Address" prefix={<GoLocation />} />
          </Form.Item>
          <Form.Item name="bio">
            <Input.TextArea
              showCount
              maxLength={100}
              placeholder="Intro"
              size="large"
            />
          </Form.Item>
          <Form.Item className="register__form__footer">
            <Button
              type="primary"
              style={{ borderRadius: "4px", padding: "0 1.5rem" }}
              block
              loading={loading || loadingCheckUsername}
              htmlType="submit"
              size="large"
            >
              Sign up
            </Button>
          </Form.Item>
          <Text style={{ width: " 100%", textAlign: "center" }}>
            <Link to="/login">Sign in instead</Link>
          </Text>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
