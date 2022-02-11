import React from "react";
import { Modal, Form, message, Input, Avatar, Checkbox } from "antd";
import { useDispatch } from "react-redux";
import { changeChannelName } from "../ListChannelSlice";

function ChannelNameChangeModal({ id, name, type, openNameChangeModal, setOpenNameChangeModal}) {
  const ModalTitle = 'Enter new name for ' + name;

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const onFinish = (value) => {
    const info = {
        id,
        type,
        newName: value.newName,
    }
    console.log(value);
    dispatch(changeChannelName(info));
    setOpenNameChangeModal(false);
  };

  const onFinishFailed = () => {
    message.error("Submit Failed!");
  };

  return (
    <div>
      <Modal
        visible={openNameChangeModal}
        title={ModalTitle}
        okText="Confirm"
        cancelText="Cancel"
        onCancel={() => setOpenNameChangeModal(false)}
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
            name="newName"
            label="New name"
            rules={[{ required: true }, { type: "string", min: 6 }]}
          >
            <Input placeholder="Enter channel's new name" size="large" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ChannelNameChangeModal;
