import './DetailTask.scss';
import {
  Layout,
  Space,
  PageHeader,
  Descriptions,
  Typography,
  Avatar,
  Tooltip,
  Table,
  Button,
  Modal,
  Form,
  Popconfirm,
  Input,
  Upload,
  Progress,
  Menu,
  Dropdown,
  Spin,
  Empty,
} from 'antd';

import {
  UserOutlined,
  AntDesignOutlined,
  CalendarOutlined,
  ArrowRightOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { useState, useEffect } from 'react';
import moment from 'moment';
import ChatOnTask from 'features/ChatOnTask/ChatOnTask';
import { useSelector, useDispatch } from 'react-redux';
import {
  listAllDetailTaskAsync,
  createADetailTaskAsync,
  editDetailTaskAsync,
  deleteDetailTaskAsync,
  changeCompletedDetailTaskAsync,
} from './DetailTaskSlice';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
const { Text, Title } = Typography;

const DetailTask = (props) => {
  // ----------------------------->
  // Table detail tasks
  const { idTask, idProject } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const data = useSelector((state) => state.detailTask.allDetailTask);
  const info = useSelector((state) => state.detailTask.infoTask);
  const loading = useSelector((state) => state.detailTask.loading);
  const memberInTask = useSelector((state) => state.detailTask.memberInTask);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  useEffect(() => {
    dispatch(listAllDetailTaskAsync(idTask));
  }, []);
  useEffect(() => {
    if (data) {
      const initialSelectedRowKey = data
        .filter((item) => item.is_complete)
        .map((item) => item.id);
      setSelectedRowKeys(initialSelectedRowKey);
    }
  }, [data]);

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
      dispatch(
        changeCompletedDetailTaskAsync({
          idDetailTask: selectedRowKeys,
          idTask,
          completed_by: localStorage.getItem('access_token'),
        })
      );
    },
    selectedRowKeys,
  };
  const hasSelected = selectedRowKeys.length > 0;

  // Modal form add new one
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    const nvalues = {
      key: data.length + 1,
      ...values,
      assignOn: moment().format('YYYY-MM-DD'),
      isCompleted: false,
    };
    // console.log({});
    dispatch(createADetailTaskAsync({ ...nvalues, idTask }));
    setVisible(false);
  };

  // modal form edit task
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [targetTask, setTargetTask] = useState();
  const [allowEdit, setAllowEdit] = useState(false);

  const handleEdit = (record) => {
    setTargetTask(record);
    setVisibleEdit(true);
  };

  const onChangeEdit = (name) => {
    if (targetTask.name === name) {
      setAllowEdit(false);
    } else {
      setAllowEdit(true);
    }
  };

  const saveEdit = (value) => {
    setVisibleEdit(false);
    dispatch(editDetailTaskAsync({ idDetailTask: targetTask.id, ...value }));
  };

  // Handle delete task
  function confirmDelete(record) {
    const temp = {
      idDetailTask: record.id,
      idTask: idTask,
    };
    dispatch(deleteDetailTaskAsync({ ...temp }));
  }

  // Upload file ------------------>
  const handleUpload = (record) => {};
  // <------------------------------

  // Declare Col of table
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '70%',
      editable: true,
    },
    {
      title: 'Assign On',
      dataIndex: 'assignOn',
      key: 'assignOn',
      width: '20%',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      width: '10%',
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="0">Upload attach</Menu.Item>

              <Menu.Item
                key="1"
                onClick={() => {
                  handleEdit(record);
                }}
              >
                Edit name
              </Menu.Item>
              <Menu.Divider />
              <Popconfirm
                title="Are you sure to delete this task?"
                onConfirm={() => confirmDelete(record)}
                okText="Yes"
                cancelText="No"
              >
                <Menu.Item key="2" danger>
                  Delete
                </Menu.Item>
              </Popconfirm>
            </Menu>
          }
          trigger={['click']}
        >
          <DownOutlined />
        </Dropdown>
      ),
    },
  ];
  // <-----------------------------|
  return (
    <>
      <Modal
        visible={visible}
        title="Create a new detail task"
        okText="Create"
        cancelText="Cancel"
        onCancel={() => {
          setVisible(false);
        }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              onCreate(values);
              form.resetFields();
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form form={form} layout="vertical" name="form_add_new_detail_task">
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please input the name of task',
              },
            ]}
          >
            <Input autoFocus />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        visible={visibleEdit}
        title="Edit the detail task"
        okText="Update"
        cancelText="Cancel"
        okButtonProps={{ disabled: !allowEdit }}
        onCancel={() => {
          setVisibleEdit(false);
        }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              saveEdit(values);
              form.resetFields();
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form form={form} layout="vertical" name="form_edit_detail_task">
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please input the name of task',
              },
            ]}
          >
            <Input
              autoFocus
              onChange={(e) => onChangeEdit(e.target.value)}
              placeholder={targetTask && targetTask.name}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Spin tip="Loading..." spinning={loading}>
        <div
          style={{
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'space-between',
            padding: '1rem',
            backgroundColor: '#F3F5F7',
          }}
        >
          <Space direction="vertical" style={{ width: '75%' }} size="large">
            <Space
              direction="vertical"
              style={{
                width: '100%',
                backgroundColor: 'white',
                padding: '1rem 2rem',
                height: '313px',
                overflow: 'auto',
                borderRadius: '8px',
              }}
            >
              <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title={info.title || 'No title'}
                style={{ padding: '0px' }}
                subTitle={
                  <div className={info.priority && info.priority.toLowerCase()}>
                    {info.priority}
                  </div>
                }
              >
                <Descriptions size="small" column={6}>
                  <Descriptions.Item>
                    <Space>
                      <CalendarOutlined />
                      <Text>
                        {info.start_time} <ArrowRightOutlined /> {info.end_time}
                      </Text>
                    </Space>
                  </Descriptions.Item>
                </Descriptions>
              </PageHeader>
              <Avatar.Group
                size="default"
                maxCount={5}
                maxStyle={{
                  color: '#f56a00',
                  backgroundColor: '#fde3cf',
                }}
              >
                {memberInTask.map((mem, index) => (
                  <Tooltip
                    title={mem.display_name || mem.user_name}
                    placement="top"
                  >
                    <Avatar
                      style={{ backgroundColor: '#87d068' }}
                      icon={<UserOutlined />}
                      src={mem.avatar}
                    />
                  </Tooltip>
                ))}
              </Avatar.Group>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Title level={5}>Progress:</Title>
                <Progress
                  percent={
                    selectedRowKeys.length &&
                    parseInt((selectedRowKeys.length * 100) / data.length)
                  }
                  status="active"
                />
              </Space>
              {info.description && (
                <Space direction="vertical">
                  <Title level={5}>Decription:</Title>
                  <Text>{info.description}</Text>
                </Space>
              )}
            </Space>
            <div
              style={{
                width: '100%',
                backgroundColor: 'white',
                padding: '1rem 2rem',
                height: '600px',
                overflow: 'auto',
                borderRadius: '8px',
              }}
            >
              <Title level={5} style={{ marginBottom: '1rem !important' }}>
                {hasSelected
                  ? `Completed ${selectedRowKeys.length}/${data.length} of the detail task`
                  : 'Detail task'}
              </Title>
              <Table
                className="table-detail-task"
                dataSource={data}
                columns={columns}
                scroll={{ y: 400 }}
                rowSelection={{
                  type: 'checkbox',
                  ...rowSelection,
                }}
                // scroll={{ y: 360 }}
                pagination={false}
                expandable={{
                  expandedRowRender: (record) =>
                    record.attachmentsOfDetailTask.length > 0 ? (
                      record.attachmentsOfDetailTask.map((attach) => {
                        return (
                          <p
                            className={'table-detail-task__name-attach'}
                            onClick={() => {
                              history.push(
                                `/${idProject}/storage/?name=${attach.name}`
                              );
                              localStorage.setItem('sider', '3');
                            }}
                          >
                            {attach.name}
                          </p>
                        );
                      })
                    ) : (
                      <Empty description={<span>No attachment</span>} />
                    ),
                }}
                footer={() => (
                  <Button
                    type="primary"
                    size="large"
                    block
                    onClick={() => {
                      setVisible(true);
                    }}
                    style={{ borderRadius: '8px' }}
                  >
                    Add new one
                  </Button>
                )}
              />
            </div>
          </Space>
          <ChatOnTask />
        </div>
      </Spin>
    </>
  );
};

export default DetailTask;
