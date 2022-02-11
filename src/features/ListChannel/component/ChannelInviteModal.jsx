import React from "react";
import { Modal, Form, message, Select, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { inviteMember } from '../ListChannelSlice'

function ChannelInviteModal({ id, name, type, openInviteModal, setOpenInviteModal}) {
  const ModalTitle = 'Invite members for ' + name;

  const [form] = Form.useForm();
  const { Option } = Select;

  const members = useSelector((state) => state.createChannel.members)
  const dispatch = useDispatch();

  const onFinish = (value) => {
    const memberInfo = {
        id,
        type,
        members: value.members,
    }

    dispatch(inviteMember(memberInfo));
    setOpenInviteModal(false);
  };

  const onFinishFailed = () => {
    message.error("Submit Failed!");
  };

  return (
    <div>
      <Modal
        visible={openInviteModal}
        title={ModalTitle}
        okText="Confirm"
        cancelText="Cancel"
        onCancel={() => setOpenInviteModal(false)}
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
          initialValues={{members: members.map((member) => member)}}
        >
          <Form.Item
            name="members"
            label="Invite members"
            rules={[{ type: 'array'}]}
          >
            <Select
                mode="multiple"
                style={{ width: '100%'}}
                placeholder="Select members to invite"
                size="large"
            >
                {members.map(member => {
                    return (
                        <>
                            <Option value={member}>
                                <Avatar src={member.avaURL} alt='avatar' />
                                <label style={{marginLeft: 5}}>
                                    {member.user_name}
                                </label>
                            </Option>
                        </>
                    )
                })}
            </Select>
          </Form.Item>   
        </Form>
      </Modal>
    </div>
  );
}

export default ChannelInviteModal;
