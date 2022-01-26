import { Button, Form, message, Modal } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FormTransferOwnership from "./FormTransferOwnership";

function ModalTransferOwnership(props) {
  const { projectOwner, idProject } = props;
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const onFinish = (values) => {
    const user_name = values.user_name[0].value;
    const action = {
      user_name: user_name,
      idProject: idProject,
    };
    console.log(action);
    setModalOpen(false);
    message.success(`Success! Project has been transfered to "${user_name}"!`);
  };

  return (
    <>
      <Button
        type="primary"
        size="large"
        danger
        style={{ width: "100px" }}
        onClick={() => setModalOpen(true)}
      >
        Transfer
      </Button>

      <Modal
        title="Transfer your project"
        visible={modalOpen}
        onCancel={() => setModalOpen(false)}
        confirmLoading={confirmLoading}
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
        <FormTransferOwnership
          onFinish={onFinish}
          form={form}
          projectOwner={projectOwner}
        />
      </Modal>
    </>
  );
}

export default ModalTransferOwnership;
