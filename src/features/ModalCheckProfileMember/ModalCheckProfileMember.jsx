import React from 'react';
import {
  Modal,
  Button,
  Avatar,
  Image,
  Typography,
  Form,
  Input,
  Card,
  Tabs,
  Row,
  Col,
  Progress,
  Spin,
} from 'antd';
import { useSelector } from 'react-redux';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Meta } = Card;
const { TabPane } = Tabs;

const ModalCheckProfileMember = (props) => {
  const { visible, setVisible } = props;
  const handleOk = () => {
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const [form] = Form.useForm();

  const info = useSelector((state) => state.checkProfileMember);
  const loading = useSelector((state) => state.checkProfileMember.loading);

  return (
    <div>
      <Modal
        style={info ? { top: 30 } : null}
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
        <Spin tip="Loading..." size="large" spinning={loading}>
          <Tabs type="card">
            <TabPane tab="Detail" key="1">
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
                      src={info?.avatarURL}
                      style={info ? { width: 200 } : { width: 256 }}
                    />
                  }
                  size={info ? 200 : 256}
                  style={{ border: '1px solid #ccc' }}
                />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Title level={4}>{info?.displayName}</Title>
                  <Text type="secondary">{info?.user_name}</Text>
                </div>
              </div>

              <Form form={form} name="view-profile" layout="vertical">
                <Form.Item
                  name="bio"
                  label="Bio"
                  style={!info?.bio && { display: 'none' }}
                >
                  <TextArea placeholder={info?.bio} disabled />
                </Form.Item>
                <Form.Item
                  name="email"
                  label="E-mail"
                  style={!info?.email && { display: 'none' }}
                >
                  <Input placeholder={info?.email} disabled />
                </Form.Item>
                <Form.Item
                  name="company"
                  label="Company"
                  style={!info?.company && { display: 'none' }}
                >
                  <Input placeholder={info?.company} disabled />
                </Form.Item>
                <Form.Item
                  name="address"
                  label="Address"
                  style={!info?.address && { display: 'none' }}
                >
                  <Input placeholder={info?.address} disabled />
                </Form.Item>
              </Form>
            </TabPane>
            <TabPane tab="Project" key="2">
              <Row gutter={[8, 8]}>
                {info.projectOwner.map((item) => {
                  const percent = item.progress;
                  return (
                    <Col>
                      <Card
                        style={{ width: 230 }}
                        cover={
                          <Progress
                            strokeColor={
                              percent <= 30
                                ? 'red'
                                : percent <= 50
                                ? 'orange'
                                : percent <= 70
                                ? 'yellow'
                                : percent <= 90
                                ? 'dodgerblue'
                                : 'lawngreen'
                            }
                            percent={percent}
                            style={{ padding: '.5rem .5rem' }}
                          />
                        }
                      >
                        <Meta title={item.title} />
                      </Card>
                    </Col>
                  );
                })}
              </Row>
            </TabPane>
          </Tabs>
        </Spin>
      </Modal>
    </div>
  );
};

export default ModalCheckProfileMember;
