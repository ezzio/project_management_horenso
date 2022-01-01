import React, { useState } from 'react';
import {
  Button,
  Form,
  Input,
  message,
  Card,
  Typography,
  DatePicker,
  Space,
  Divider,
} from 'antd';
import './Setting.scss';
import moment from 'moment';

const { Text, Title } = Typography;
const { RangePicker } = DatePicker;

const Setting = () => {
  // Change name
  const projectNameConfig = {
    rules: [
      {
        required: true,
        message: 'Please enter name of project!',
      },
    ],
  };

  const [projectName, setProjectName] = useState(
    'Du an con cac gi do toi khong biet nua'
  );
  const [disabledChangeName, setDisabledChangeName] = useState(true);

  const onChangeProjectName = (value) => {
    if (value !== projectName) setDisabledChangeName(false);
    else setDisabledChangeName(true);
  };

  const onFinishChangeName = (value) => {
    message.success('Renaming!');
    console.log(value);
  };
  // Change deadline
  const [deadline, setDeadline] = useState(['2015/01/01', '2015/02/01']);
  const [disabledChangeDeadline, setDisabledChangeDeadline] = useState(true);
  const dateFormat = 'YYYY/MM/DD';

  const onChangeDeadline = (value) => {
    if (deadline[1] !== value[1].format(dateFormat)) {
      setDisabledChangeDeadline(false);
    } else setDisabledChangeDeadline(true);
  };

  const onFinishDeadline = (value) => {
    message.success('Changing!');
    const rangeValue = value['deadline'];
    console.log([
      rangeValue[0].format(dateFormat),
      rangeValue[1].format(dateFormat),
    ]);
  };

  const deadlineConfig = {
    rules: [
      {
        type: 'array',
        required: true,
        message: 'Please select time!',
      },
    ],
  };

  return (
    <div className="ctn setting-ctn">
      <Title>Setting</Title>
      <div className="setting-ctn__content">
        <div className="setting-ctn__content__basic-info">
          <Card title="Project name" bordered={false} style={{ width: '70%' }}>
            <Form
              name="project-name"
              onFinish={onFinishChangeName}
              autoComplete="off"
            >
              <Form.Item name="projectName" {...projectNameConfig}>
                <Input
                  size="large"
                  onChange={(e) => onChangeProjectName(e.target.value)}
                  defaultValue={projectName}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  disabled={disabledChangeName}
                >
                  Rename
                </Button>
              </Form.Item>
            </Form>
          </Card>
          <Card
            title="Operating time"
            bordered={false}
            style={{ width: '29%' }}
          >
            <Form
              name="set-deadline"
              onFinish={onFinishDeadline}
              autoComplete="off"
            >
              <Form.Item name="deadline" {...deadlineConfig}>
                <RangePicker
                  defaultValue={[
                    moment(deadline[0], dateFormat),
                    moment(deadline[1], dateFormat),
                  ]}
                  onChange={onChangeDeadline}
                  disabled={[true, false]}
                  size="large"
                  allowClear={false}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={disabledChangeDeadline}
                  size="large"
                >
                  Change
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </div>
        <Card
          title="Jobs settings"
          bordered={false}
          style={{ width: '100%', marginBottom: '2rem' }}
        ></Card>
        <Card
          title="Horenso settings"
          bordered={false}
          style={{ width: '100%', marginBottom: '2rem' }}
        ></Card>
        <div style={{ width: '100%' }} className="setting-ctn__content__danger">
          <Title level={5} style={{ color: 'crimson' }}>
            Danger settings
          </Title>

          <Divider orientation="left" orientationMargin="0">
            Transfer ownership
          </Divider>
          <div className="setting-ctn__content__danger__content">
            <Text>
              Transfer this repository to another user or to an organization
              where you have the ability to create repositories
            </Text>
            <Button type="primary" size="large" danger>
              Transfer
            </Button>
          </div>

          <Divider orientation="left" orientationMargin="0">
            Delete this project
          </Divider>
          <div className="setting-ctn__content__danger__content">
            <Text>
              Once you delete a repository, there is no going back. Please be
              certain.
            </Text>
            <Button type="primary" size="large" danger>
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
