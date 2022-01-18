import { Avatar, Space, Input, Button, Form, Drawer } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';

import './ChatOnTask.scss';

const ChatOnTask = ({ visible, onClose }) => {
  // Hanlde form
  const [form] = Form.useForm();

  const onFinish = (values) => {
    if (values.mess) {
      console.log('Success:', values);
      form.resetFields();
    }
  };

  return (
    <Drawer
      title="Chat on task"
      placement="right"
      onClose={onClose}
      visible={visible}
      size="large"
    ></Drawer>
  );
};

export default ChatOnTask;
