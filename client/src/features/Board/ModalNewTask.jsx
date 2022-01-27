import React from 'react';
import {
  Modal,
  PageHeader,
  Input,
  DatePicker,
  Avatar,
  Tabs,
  Select,
  Form,
  message,
} from 'antd';
import 'antd/dist/antd.css';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from './boardSlice';
import moment from 'moment';
// import { register } from 'serviceWorker';

function ModalNewTask({
  modalOpen,
  closeModal,
  jobowner,
  members,
  startTime,
  endTime,
}) {
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState('1');

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const changeTab = (key) => {
    setActiveTab(key);
  };

  const onFinish = (values) => {
    let tempTasker = values.members.map((item) => {
      return {
        name: item,
      };
    });
    const newTask = {
      idBoard: jobowner,
      title: values.title,
      description: values.description,
      progress: 0,
      priority: values.priority,
      start_time: values.deadline[0].format('YYYY-MM-DD'),
      end_time: values.deadline[1].format('YYYY-MM-DD'),
      taskers: tempTasker,
      owner: localStorage.getItem('access_token'),
    };
    closeModal();
    dispatch(addTask(newTask));
    setActiveTab('1');
  };

  const { TabPane } = Tabs;

  return (
    <div>
      <Modal
        title="Create a new task"
        visible={modalOpen}
        onCancel={closeModal}
        okText="Confirm"
        confirmLoading={confirmLoading}
        onOk={() => {
          if (activeTab === '1') {
            changeTab('2');
          } else {
            form
              .validateFields()
              .then((values) => {
                form.resetFields();
                onFinish(values);
              })
              .catch((info) => {
                if (info.values.title === undefined) {
                  message.warning('Task title is invalid! Please try again');
                } else if (
                  info.values.title !== undefined &&
                  (info.values.title.length < 6 ||
                    info.values.title.length > 36)
                ) {
                  message.warning('Task title is invalid! Please try again');
                } else if (info.values.description === undefined) {
                  message.warning(
                    'Task description is invalid! Please try again'
                  );
                } else if (
                  info.values.title !== undefined &&
                  (info.values.description.length < 6 ||
                    info.values.description.length > 100)
                ) {
                  message.warning(
                    'Task description is invalid! Please try again'
                  );
                } else if (info.values.deadline === undefined) {
                  message.warning('Task deadline is invalid! Please try again');
                } else if (info.values.members === undefined) {
                  message.warning('Task members is invalid! Please try again');
                }
                console.log('Validate Failed:', info);
              });
          }
        }}
      >
        <Tabs defaultActiveKey="1" activeKey={activeTab} onChange={changeTab}>
          <TabPane tab="Step 1" key="1">
            <Step1
              onFinish={onFinish}
              form={form}
              startTime={startTime}
              endTime={endTime}
            />
          </TabPane>
          <TabPane tab="Step 2" key="2">
            <Step2 onFinish={onFinish} form={form} members={members} />
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  );
}

function Step1({ onFinish, form, startTime, endTime }) {
  const { Option } = Select;
  const { RangePicker } = DatePicker;

  function disabledDate(current) {
    let startCheck = true;
    let endCheck = true;
    if (startTime) {
      startCheck = current < moment(startTime);
    }
    if (endTime) {
      endCheck = current > moment(endTime);
    }
    return (startTime && startCheck) || (endTime && endCheck);
  }

  return (
    <div>
      <PageHeader title="Step 1" subTitle="Configure task details" />
      <Form
        layout="vertical"
        form={form}
        name="Step 1"
        onFinish={onFinish}
        autoComplete="off"
        initialValues={{ priority: 'Low' }}
      >
        <Form.Item label="Priority:" name="priority">
          <Select size="large">
            <Option value="High">High</Option>
            <Option value="Medium">Medium</Option>
            <Option value="Low">Low</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Title: "
          name="title"
          rules={[
            { required: true, message: 'This field is required' },
            { min: 6, message: 'Title must be 6-50 characters long' },
            { max: 50, message: 'Title must be 6-50 characters long' },
          ]}
        >
          <Input
            bordered={true}
            maxLength={36}
            size="large"
            placeholder="Enter title here..."
            style={{ marginBottom: 30 }}
            name="title"
          />
        </Form.Item>
        <Form.Item
          label="Description: "
          name="description"
          rules={[
            { required: true, message: 'This field is required' },
            { min: 6, message: 'Description must be 6-100 characters long' },
            { max: 100, message: 'Description must be 6-100 characters long' },
          ]}
        >
          <Input
            bordered={true}
            placeholder="Enter Description here..."
            style={{ marginBottom: 30 }}
            size="large"
            maxLength={100}
          />
        </Form.Item>
        <Form.Item
          label="Set deadline: "
          name="deadline"
          rules={[
            {
              type: 'array',
              required: true,
              message: 'This field is required',
            },
          ]}
        >
          <RangePicker
            size="large"
            allowClear
            format="YYYY-MM-DD"
            style={{ width: '100%' }}
            disabledDate={disabledDate}
          />
        </Form.Item>
      </Form>
    </div>
  );
}

function Step2({ onFinish, form, members }) {
  const { Option } = Select;

  return (
    <div>
      <PageHeader title="Step 2" subTitle="Assign members to task" />
      <Form layout="vertical" form={form} name="Step 2" onFinish={onFinish}>
        <Form.Item
          name="members"
          rules={[
            {
              required: true,
              message: 'This field is required',
              type: 'array',
            },
          ]}
        >
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Select members to assign task"
            size="large"
          >
            {members.map((member, index) => {
              return (
                <Option key={index} value={member.user_name}>
                  <Avatar src={member.avatar} alt="avatar" />
                  <label style={{ marginLeft: 5 }}>
                    {member.display_name || member.user_name}
                  </label>
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ModalNewTask;
