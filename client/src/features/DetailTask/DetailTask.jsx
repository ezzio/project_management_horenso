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
  List,
  Upload,
  Progress,
} from 'antd';

import {
  UserOutlined,
  AntDesignOutlined,
  CalendarOutlined,
  ArrowRightOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { useState, useEffect } from 'react';
import moment from 'moment';
import ChatOnTask from 'features/ChatOnTask/ChatOnTask';
import { useSelector, useDispatch } from 'react-redux';
import {
  listAllDetailTaskAsync,
  createADetailTaskAsync,
} from './DetailTaskSlice';
import { useParams } from 'react-router';
const { Content, Sider } = Layout;
const { Text, Title } = Typography;

const DetailTask = (props) => {
  // ----------------------------->
  // Table detail tasks
  const { idTask } = useParams();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.detailTask.allDetailTask);

  const [selectedRowKeys, setSelectedRowKeys] = useState(
    data.filter((item) => item.isCompleted).map((item) => item.key)
  );

  useEffect(() => {
    dispatch(listAllDetailTaskAsync(idTask));
  }, []);

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
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
      assignOn: moment().format('DD/MM/YYYY'),
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

  const save = (value) => {
    setVisibleEdit(false);

    const tmpData = [...data];
    const index = tmpData.findIndex((item) => targetTask.key === item.key);
    tmpData.splice(index, 1, {
      ...targetTask,
      name: value.name,
    });

    // setData(tmpData);
  };

  // Handle delete task
  const handleDelete = (key) => {
    const dataSource = [...data];

    // setData(dataSource.filter((item) => item.key !== key));
  };

  // Declare Col of table
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '50%',
      editable: true,
    },
    { title: 'Assign On', dataIndex: 'assignOn', key: 'assignOn' },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit name
          </Button>

          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  // <-----------------------------|

  // Upload file ------------------>
  const [dataAttachment, setDataAttachment] = useState([
    {
      file_name: 'document.docx',
      upload_by: 'Dang Khoa',
      upload_at: '2021-10-30',
    },
    {
      file_name: 'document.docx',
      upload_by: 'Dang Khoa',
      upload_at: '2021-10-30',
    },
    {
      file_name: 'document.docx',
      upload_by: 'Dang Khoa',
      upload_at: '2021-10-30',
    },
  ]);
  // <------------------------------

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
              form.resetFields();
              onCreate(values);
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
              form.resetFields();
              save(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_edit_detail_task"
          initialValue={{ name: targetTask }}
        >
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
            <Input autoFocus onChange={(e) => onChangeEdit(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>

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
              height: '400px',
              overflow: 'auto',
              borderRadius: '8px',
            }}
          >
            <PageHeader
              ghost={false}
              onBack={() => window.history.back()}
              title="This is the title of task"
              style={{ padding: '0px' }}
              subTitle={<div className="high">High</div>}
            >
              <Descriptions size="small" column={6}>
                <Descriptions.Item>
                  <Space>
                    <CalendarOutlined />
                    <Text>
                      28/10/2021 <ArrowRightOutlined /> 30/10/2021
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
              <Avatar src="https://joeschmoe.io/api/v1/random" />
              <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
              <Tooltip title="Ant User" placement="top">
                <Avatar
                  style={{ backgroundColor: '#87d068' }}
                  icon={<UserOutlined />}
                />
              </Tooltip>
              <Avatar
                style={{ backgroundColor: '#1890ff' }}
                icon={<AntDesignOutlined />}
              />
            </Avatar.Group>
            <Space direction="vertical">
              <Title level={5}>Decription:</Title>
              <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores perferendis quia ullam quaerat ipsam! Illo
                consequatur est modi quasi, id quae in quia animi veritatis
                voluptas dolorem vel, quam nostrum. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Id dolore quod enim sit veritatis
                debitis ipsa, iste neque reiciendis, nostrum mollitia
                doloremque! Fugit animi odio eligendi quae soluta, delectus
                facere?
              </Text>
            </Space>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Title level={5}>Progress:</Title>
              <Progress
                percent={parseInt((selectedRowKeys.length * 100) / data.length)}
                status="active"
              />
            </Space>
          </Space>
          <div
            style={{
              width: '100%',
              backgroundColor: 'white',
              padding: '1rem 2rem',
              height: '500px',
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
              dataSource={data}
              columns={columns}
              rowSelection={{
                type: 'checkbox',
                ...rowSelection,
              }}
              scroll={{ y: 240 }}
              pagination={false}
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

        {/* <div style={{ width: '20%' }}></div> */}
      </div>
    </>
  );
};

export default DetailTask;
