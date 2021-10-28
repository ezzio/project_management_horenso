import React from "react";
import {
  Modal,
  PageHeader,
  Input,
  DatePicker,
  Avatar,
  Tabs,
  Select,
  Form,
} from "antd";
import "antd/dist/antd.css";
import { useDispatch } from "react-redux";
import { updateTask } from "../../Board/boardSlice.js";
import moment from "moment";
import { message } from "antd";
import { useRef } from "react";

function ModalEditTask({ modalOpen, closeModal, task, columnId }) {
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const formRef = useRef();
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const onFinish = (values) => {
    const action = {
      editTask: {
        id: task.id,
        title: values.title,
        description: values.description,
        level: values.priority,
        startTime: values.deadline[0].format("YYYY-MM-DD"),
        endTime: values.deadline[1].format("YYYY-MM-DD"),
        taskers: values.members,
      },
      columnId: columnId,
    };
    console.log(action.editTask.taskers);
    closeModal();
    dispatch(updateTask(action));
    message.success("Success! Task has been updated.");
  };

  const { TabPane } = Tabs;
  const [activeKey, setActiveKey] = React.useState("1");
  const onKeyChange = (key) => setActiveKey(key);

  return (
    <div>
      <Modal
        title="Edit task"
        visible={modalOpen}
        onCancel={closeModal}
        okText={activeKey === "1" ? "Next" : "Confirm"}
        confirmLoading={confirmLoading}
        onOk={() => {
          activeKey !== "1"
            ? form
                .validateFields()
                .then((values) => {
                  // form.resetFields();
                  onFinish(values);
                })
                .catch((info) => {
                  console.log("Validate Failed:", info);
                })
            : onKeyChange("2");
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
          priority: task.level,
          title: task.title,
          description: task.description,
          deadline: [moment(task.startTime), moment(task.endTime)],
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
            { required: true, message: "This field is required" },
            { min: 6, message: "Title must be 6-30 characters long" },
            { max: 30, message: "Title must be 6-30 characters long" },
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
            { required: true, message: "This field is required" },
            { min: 6, message: "Description must be 6-100 characters long" },
            { max: 100, message: "Description must be 6-100 characters long" },
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
              type: "array",
              required: true,
              message: "This field is required",
            },
          ]}
        >
          <RangePicker
            size="large"
            allowClear
            showTime
            format="DD/MM/YYYY"
            style={{ width: "100%" }}
          />
        </Form.Item>
      </Form>
    </div>
  );
}

function Step2({ onFinish, form, task }) {
  const members = [
    {
      id: 0,
      name: "Koih Hana",
      avatar:
        "https://static.remove.bg/remove-bg-web/a4391f37bcf9559ea5f1741ac3cee53c31ab75cc/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg",
    },
    {
      id: 1,
      name: "Jack Will",
      avatar:
        "https://static.remove.bg/remove-bg-web/a4391f37bcf9559ea5f1741ac3cee53c31ab75cc/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg",
    },
    {
      id: 2,
      name: "MenGuy124",
      avatar:
        "https://static.remove.bg/remove-bg-web/a4391f37bcf9559ea5f1741ac3cee53c31ab75cc/assets/start-0e837dcc57769db2306d8d659f53555feb500b3c5d456879b9c843d1872e7baa.jpg",
    },
    {
      id: 3,
      name: "Nhut",
      avatar:
        "https://www.timeoutdubai.com/public/styles/full_img/public/images/2020/07/13/IMG-Dubai-UAE.jpg?itok=j4dmDDZa",
    },
    {
      id: 4,
      name: "Pum",
      avatar:
        "https://www.timeoutdubai.com/public/styles/full_img/public/images/2020/07/13/IMG-Dubai-UAE.jpg?itok=j4dmDDZa",
    },
    {
      id: 5,
      name: "Minh",
      avatar:
        "https://www.timeoutdubai.com/public/styles/full_img/public/images/2020/07/13/IMG-Dubai-UAE.jpg?itok=j4dmDDZa",
    },
    {
      id: 6,
      name: "Nguyen",
      avatar:
        "https://www.timeoutdubai.com/public/styles/full_img/public/images/2020/07/13/IMG-Dubai-UAE.jpg?itok=j4dmDDZa",
    },
  ];

  const { Option } = Select;

  // from initalData
  const tasker = task.taskers.map((tasker) => (
    <div key={tasker.id}>
      <Avatar src={tasker.avatar} alt="avatar" />
      <label style={{ marginLeft: 5 }}>{tasker.name}</label>
    </div>
  ));

  return (
    <div>
      <PageHeader title="Step 2" subTitle="Assign members to task" />
      <Form
        layout="vertical"
        form={form}
        name="Step 2"
        onFinish={onFinish}
        initialValues={{ members: tasker }}
      >
        <Form.Item
          name="members"
          rules={[
            {
              required: true,
              message: "This field is required",
              type: "array",
            },
          ]}
        >
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Select members to assign task"
            size="large"
          >
            {/* from initialValue --- all of taskers */}
            {members.map((member) => {
              return (
                <>
                  <Option key={member.id} value={member.name}>
                    <Avatar src={member.avatar} alt="avatar" />
                    <label style={{ marginLeft: 5 }}>{member.name}</label>
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
