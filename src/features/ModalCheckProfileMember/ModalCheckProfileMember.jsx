import React from 'react';
import { Modal, Button, Avatar, Image, Typography, Space } from 'antd';

const { Title, Text } = Typography;
const ModalCheckProfileMember = (props) => {
  const { visible } = props;
  const handleOk = () => {};
  const handleCancel = () => {};

  return (
    <div>
      <Modal
        visible={visible}
        title="User Profile"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="submit" type="primary" onClick={handleOk}>
            Return
          </Button>,
        ]}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            src={
              <Image
                src="https://joeschmoe.io/api/v1/random"
                style={{ width: 256 }}
              />
            }
            size={256}
            style={{ border: '1px solid #ccc' }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Title level={4}>Duong Dang Khoa</Title>
            <Text type="secondary">ddkhoa120620</Text>
          </div>
        </div>
        {true && <Text>Your bio</Text>}
        
      </Modal>
    </div>
  );
};

export default ModalCheckProfileMember;
