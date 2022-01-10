import { Avatar, Space, Input, Button, Form, Tooltip } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { LinkOutlined } from '@ant-design/icons';

import './ChatOnTask.scss';

const ChatOnTask = () => {
  // Hanlde form
  const [form] = Form.useForm();

  const onFinish = (values) => {
    if (values.mess) {
      console.log('Success:', values);
      form.resetFields();
    }
  };

  return (
    <div className="chat-on-task">
      <div className="chat-on-task__header">
        <Title level={3}>Task Chat</Title>
      </div>
      <div className="chat-on-task__body">
        <Space
          className="chat-on-task__body__box"
          direction="vertical"
          size={'middle'}
        >
          <Space>
            <Avatar
              src="https://joeschmoe.io/api/v1/random"
              style={{ border: '1px solid #ccc' }}
            />
            <div className="chat-on-task__body__box__bubble">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis
              suscipit id minima quo provident doloremque, cum nisi eius fuga
              quod aspernatur. Cupiditate incidunt perspiciatis delectus
              distinctio temporibus rerum tenetur unde!
            </div>
          </Space>
          <div className="chat-on-task__body__box__bubble chat-on-task__body__box__bubble--owner">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis
            suscipit id minima quo provident doloremque, cum nisi eius fuga quod
            aspernatur. Cupiditate incidunt perspiciatis delectus distinctio
            temporibus rerum tenetur unde!
          </div>
        </Space>
      </div>
      <div className="chat-on-task__footer">
        <Form
          name="chat-on-task"
          onFinish={onFinish}
          autoComplete="off"
          layout="inline"
          form={form}
          
        >
          <Form.Item name="mess">
            <div className="chat-on-task__footer__input-mess">
              <Input bordered={false} />
              <Button type="primary" htmlType="submit">
                SEND
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ChatOnTask;
