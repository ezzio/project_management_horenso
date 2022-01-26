import React, { useEffect } from 'react';
import {
  Modal,
  PageHeader,
  Input,
  DatePicker,
  Avatar,
  Tabs,
  Select,
  Form,
} from 'antd';
import 'antd/dist/antd.css';
import { useDispatch, useSelector } from 'react-redux';
import { editTask, editTaskAsync, updateTask } from '../../Board/boardSlice.js';
import moment from 'moment';
import { message } from 'antd';
import { useRef } from 'react';

function ModalEditTask({ modalOpen, closeModal, task, columnId }) {
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const formRef = useRef();
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const memberInJob = useSelector((state) => state.board.memberInJob);

  const onFinish = (values) => {
    const action = {
      editTask: {
        taskId: task.id,
        title: values.title,
        description: values.description,
        priority: values.priority,
        start_time: values.deadline[0].format('YYYY-MM-DD'),
        end_time: values.deadline[1].format('YYYY-MM-DD'),
        taskers: memberInJob.filter((mem) =>
          values.members.includes(mem.user_name)
        ),
        totalConversation: task.totalConversation,
        totalDetilTask: task.totalDetilTask,
      },
      columnId: columnId,
    };
    closeModal();
    console.log(action)
    dispatch(editTaskAsync(action));
  };

  const { TabPane } = Tabs;
  const [activeKey, setActiveKey] = React.useState('1');
  const onKeyChange = (key) => setActiveKey(key);

  useEffect(() => {
    setActiveKey('1');
  }, [modalOpen]);

  return (
    <div>
      <Modal
        title="Edit task"
        visible={modalOpen}
        onCancel={closeModal}
        okText={activeKey === '1' ? 'Next' : 'Confirm'}
        confirmLoading={confirmLoading}
        onOk={() => {
          activeKey !== '1'
            ? form
                .validateFields()
                .then((values) => {
                  onFinish(values);
                })
                .catch((info) => {
                  message.error('Please enter a valid value');
                })
            : onKeyChange('2');
        }}
      >
        <Tabs
          defaultActiveKey="1"
          activeKey={activeKey}
          onChange={onKeyChange}
          defaultChecked="1"
        >
          <TabPane tab="Step 1" key="1">
            <Step1 onFinish={onFinish} form={form} task={task} />
          </TabPane>
          <TabPane tab="Step 2" key="2">
            <Step2 onFinish={onFinish} form={form} task={task} />
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  );
}

function Step1({ onFinish, form, task }) {
  const { Option } = Select;
  const { RangePicker } = DatePicker;

  return (
    <div>
      <PageHeader title="Step 1" subTitle="Configure task details" />
      <Form
        layout="vertical"
        form={form}
        name="Step 1"
        onFinish={onFinish}
        autoComplete="off"
        initialValues={{
          priority: task.priority,
          title: task.title,
          description: task.description,
          deadline: [moment(task.start_time), moment(task.end_time)],
        }}
      >
        <Form.Item label="Priority:" name="priority">
          <Select size="large">
            <Option value="high">High</Option>
            <Option value="medium">Medium</Option>
            <Option value="low">Low</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Title: "
          name="title"
          rules={[
            { required: true, message: 'This field is required' },
            { min: 6, message: 'Title must be 6-30 characters long' },
            { max: 30, message: 'Title must be 6-30 characters long' },
          ]}
        >
          <Input
            bordered={true}
            maxLength={36}
            size="large"
            placeholder="Enter title here..."
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
            showTime={false}
            format="DD/MM/YYYY"
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Form>
    </div>
  );
}

function Step2({ onFinish, form, task }) {
  const { Option } = Select;

  // from initalData
  // const tasker = task.taskers.map((tasker) => (
  //   <Option value={tasker.user_name}>
  //     <Avatar src={tasker.avatar} alt="avatar" />
  //     <label style={{ marginLeft: 5 }}>
  //       {tasker.display_name || tasker.user_name}
  //     </label>
  //   </Option>
  // ));

  return (
    <div>
      <PageHeader title="Step 2" subTitle="Assign members to task" />
      <Form
        layout="vertical"
        form={form}
        name="Step 2"
        onFinish={onFinish}
        initialValues={{
          members: task.taskers.map((tasker) => tasker.user_name),
        }}
      >
        <Form.Item
          name="members"
          rules={[
            {
              type: 'array',
            },
          ]}
        >
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Select members to assign task"
            size="large"
            defaultValue={task.taskers.map((tasker) => tasker.user_name)}
          >
            {/* from initialValue --- all of taskers */}
            {task.taskers.map((member) => {
              return (
                <>
                  <Option value={member.user_name}>
                    <Avatar src={member.avatar} alt="avatar" />
                    <label style={{ marginLeft: 5 }}>
                      {member.display_name || member.user_name}
                    </label>
                  </Option>
                </>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ModalEditTask;
