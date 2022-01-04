import { Button, Form, message, Modal } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { AddNewTeammate, addNewTeammate } from "../../teammateSlice";
import FormAddTeammate from "./FormAddTeammate";

ModalAddTeammate.propTypes = {};

function ModalAddTeammate(props) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const onFinish = (values) => {
    const action = {
      user_name: values.user_name[0].value,
      projectowner: localStorage.getItem("access_token"),
      projectId: "61cc10d77f58160024c8bc39",
    };
    setModalOpen(false);
    dispatch(addNewTeammate(action));
    dispatch(AddNewTeammate(action));
    message.success(
      `Success! "${values.user_name[0].value}" has been added to our project!`
    );
  };

  return (
    <>
      <Button type="primary" onClick={() => setModalOpen(true)}>
        Add new
      </Button>

      <Modal
        title="Add new teammate"
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
        <FormAddTeammate onFinish={onFinish} form={form} />
      </Modal>
    </>
  );
}

export default ModalAddTeammate;
