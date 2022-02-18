import { Form, Input, message, Modal, Select } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { addTeamChannelAsync } from "../ListChannelSlice";

const { Option } = Select;

function TeamsModal({
  openTeamsModal,
  setOpenTeamsModal,
  members,
  conversationId,
}) {
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const onFinish = (value) => {
    console.log(value);
    setOpenTeamsModal(false);
    dispatch(addTeamChannelAsync({ conversationId, ...value }));
    setTimeout(message.success("Add channel successfull"), 500);
  };

  const onFinishFailed = () => {
    message.error("Submit Failed!");
  };

  return (
    <div>
      <Modal
        visible={openTeamsModal}
        title="Add new team"
        okText="Create"
        cancelText="Cancel"
        onCancel={() => setOpenTeamsModal(false)}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onFinish(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true }, { type: "string", min: 6 }]}
          >
            <Input placeholder="Enter name of team" size="large" />
          </Form.Item>
          <Form.Item
            label="Members"
            name="members"
            rules={[
              {
                required: true,
                message: "Please choose member to this conversation",
              },
            ]}
          >
            <Select mode="multiple" placeholder="Members in this conversation">
              {members.map((item) => (
                <Select.Option value={item.name}>{item.name}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default TeamsModal;
