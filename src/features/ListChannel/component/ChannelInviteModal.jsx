import React from 'react';
import { Modal, Form, message, Select, Avatar, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { inviteMember, inviteMemberToRoom } from '../ListChannelSlice';

const { Text } = Typography;

function ChannelInviteModal({
  id,
  name,
  type,
  openInviteModal,
  setOpenInviteModal,
  setDrawerVisible,
}) {
  const ModalTitle = `Invite members for ${name}`;

  const [form] = Form.useForm();
  const { Option } = Select;

  const members = useSelector((state) => state.kanban.membersInProject);
  const dispatch = useDispatch();

  const onFinish = (value) => {
    const memberInfo = {
      id,
      type,
      members: value.members,
    };
    console.log(memberInfo);
    dispatch(inviteMember(memberInfo));
    dispatch(
      inviteMemberToRoom({ idRoom: id, listUserInviteToChannel: value.members })
    );
    setOpenInviteModal(false);
    setDrawerVisible(false);
  };

  const onFinishFailed = () => {
    message.error('Submit Failed!');
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
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{ members: members.map((member) => member.name) }}
        >
          <Form.Item
            name="members"
            label="Invite members"
            rules={[{ type: 'array' }]}
          >
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="Select members to invite"
              size="large"
            >
              {members.map((member) => (
                <Select.Option value={member.name}>
                  <Text style={{ marginLeft: 5 }}>{member.name}</Text>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ChannelInviteModal;
