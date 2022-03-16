import { Form, Input, message, Modal } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProjectAsync } from "./createProjectSlice";

const CreateProject = (props) => {
  const { isModalVisible, setIsModalVisible } = props;

  const idProject = useSelector((state) => state.createProject.idProject);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onFinish = (value) => {
    dispatch(
      createProjectAsync({
        ...value,
        owner: localStorage.getItem("access_token"),
      })
    );
    handleOk();
  };

  const onFinishFailed = () => {
    message.error("Submit failed!");
  };

  return (
    <Modal
      title="Create new project"
      visible={isModalVisible}
      onCancel={handleCancel}
      okText="Create"
      cancelText="Cancel"
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
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true }, { type: "string", min: 6 }]}
        >
          <Input placeholder="Enter project name" size="large" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateProject;
