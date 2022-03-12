import {
  AntDesignOutlined,
  ArrowRightOutlined,
  CalendarOutlined,
  DownOutlined,
  UserOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Descriptions,
  Dropdown,
  Empty,
  Form,
  Input,
  Menu,
  message,
  Modal,
  PageHeader,
  Popconfirm,
  Progress,
  Space,
  Spin,
  Switch,
  Table,
  Tooltip,
  Typography,
  Upload,
} from 'antd';
import axios from 'axios';
import { checkCompleted } from 'features/Board/boardSlice';
import ChatOnTask from 'features/ChatOnTask/ChatOnTask';
import { viewMemberInfo } from 'features/ModalCheckProfileMember/CheckProfileMemberSlice';
import ModalCheckProfileMember from 'features/ModalCheckProfileMember/ModalCheckProfileMember';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { AiFillFileZip } from 'react-icons/ai';
import { RiFileExcel2Fill, RiFileWord2Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import './DetailTask.scss';
import {
  createADetailTaskAsync,
  deleteDetailTaskAsync,
  editDetailTaskAsync,
  listAllDetailTaskAsync,
  uploadFile,
  changeCompletedDetailTaskAsync,
  setIsCompleted,
  setProgress,
} from './DetailTaskSlice';

const { Text, Title } = Typography;

const DetailTask = (props) => {
  // ----------------------------->
  // Table detail tasks
  const { idTask, idProject, idBoard } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const data = useSelector((state) => state.detailTask.infoAllDetailTask);
  const info = useSelector((state) => state.detailTask.infoTask);
  const loading = useSelector((state) => state.detailTask.loading);
  const memberInTask = useSelector((state) => state.detailTask.memberInTask);
  const [loadingPage, setLoadingPage] = useState(loading);
  const [isVisibleChatOnTask, setIsvisibleChatOnTask] = useState(true);
  const role = useSelector((state) => state.sidebar.role);
  // const role = 'Member';

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
          progress: parseInt((selectedRowKeys.length * 100) / data.length),
        })
      );
      dispatch(
        setProgress(parseInt((selectedRowKeys.length * 100) / data.length))
      );
    },
    selectedRowKeys,
  };
  const hasSelected = selectedRowKeys.length > 0;

  // View member's profile
  const [visible, setVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const viewProfile = (item) => {
    setUserName(item);
    setVisible(true);
    dispatch(viewMemberInfo(item));
  };

  // Modal form add new one
  const [form] = Form.useForm();
  const [isVisible, setIsVisible] = useState(false);

  const onCreate = (values) => {
    const nvalues = {
      key: data.length + 1,
      ...values,
      assignOn: moment().format('YYYY-MM-DD'),
      isCompleted: false,
      idProjectOwner: idProject,
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
  const [idDetailTask, setIdDetailTask] = useState('');
  const [isLt5M, setIsLt5M] = useState(false);

  const onClickUpload = (record) => {
    setIdDetailTask(record.idDetailTask || record.id);
  };

  // Check file size
  const beforeUploadFile = (file) => {
    if (file.size > 5120000) {
      message.error('File size must be smaller than 5MB');
      setIsLt5M(false);
    } else {
      setIsLt5M(true);
    }
    return;
  };

  const onFileChange = (info) => {
    if (isLt5M) {
      if (info.file.status === 'uploading') {
        setLoadingPage(true);
        return;
      }
      if (info.file.status === 'done') {
        setLoadingPage(false);
        message.success(`Upload file "${info.file.name}" successful`);
      }
    }
  };

  const handleUploadFile = ({ file, onSuccess }) => {
    let formData = new FormData();
    formData.append('my_file', file);
    formData.append('idDetailTask', idDetailTask);

    isLt5M &&
      axios
        .post(
          'https://servernckhv2.herokuapp.com/Tasks/uploadFileDetailTask',
          formData
        )
        .then((response) => {
          if (response.data.isSuccess) {
            onSuccess('ok');
            dispatch(uploadFile(response.data));
          }
        })
        .catch((error) => {
          console.log(error);
        });
  };

  // <------------------------------

  // get icon by file type
  const renderIconByFileType = (type) => {
    switch (type) {
      case 'application/zip':
        return <AiFillFileZip />;
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return <RiFileWord2Fill />;
      case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        return <RiFileExcel2Fill />;
      default:
        break;
    }
  };
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
              <Menu.Item
                key="0"
                onClick={() => onClickUpload(record)}
                disabled={info.is_complete}
              >
                <Upload
                  onChange={onFileChange}
                  showUploadList={false}
                  beforeUpload={beforeUploadFile}
                  customRequest={handleUploadFile}
                  disabled={info.is_complete}
                >
                  Upload attach
                </Upload>
              </Menu.Item>

              <Menu.Item
                key="1"
                onClick={() => {
                  handleEdit(record);
                }}
                disabled={info.is_complete}
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
                <Menu.Item
                  key="2"
                  danger={!info.is_complete}
                  disabled={info.is_complete}
                >
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

  // check completed this task
  const loadingCompleted = useSelector((state) => state.board.loadingCompleted);
  function checkFinished(checked) {
    dispatch(setIsCompleted(checked));
    dispatch(checkCompleted({ is_complete: checked, idTask, idBoard }));
  }
  return (
    <>
      {visible && (
        <ModalCheckProfileMember visible={true} setVisible={setVisible} />
      )}
      <Modal
        visible={isVisible}
        title="Create a new detail task"
        okText="Create"
        cancelText="Cancel"
        onCancel={() => {
          setIsVisible(false);
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
          <Space direction="vertical" style={{ width: '90%%' }} size="large">
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
                extra={
                  info.progress === 100 &&
                  (role === 'Leader' || role === 'Project Manager') && [
                    <Switch
                      onChange={checkFinished}
                      unCheckedChildren="Not finish"
                      checkedChildren="Finished"
                      defaultChecked={info.is_complete}
                      loading={loadingCompleted}
                    />,
                  ]
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
                      style={{ backgroundColor: '#87d068', cursor: 'pointer' }}
                      icon={<UserOutlined />}
                      src={mem.avatar}
                      onClick={() => viewProfile(mem.user_name)}
                    />
                  </Tooltip>
                ))}
              </Avatar.Group>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Title level={5}>Progress:</Title>
                <Progress
                  percent={selectedRowKeys.length && info.progress}
                  status={info.progress < 100 ? 'active' : ''}
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
                rowSelection={
                  !info.is_complete && {
                    type: 'checkbox',
                    ...rowSelection,
                  }
                }
                // scroll={{ y: 360 }}
                pagination={false}
                expandable={{
                  expandedRowRender: (record) =>
                    record.attachmentsOfDetailTask?.length > 0 ? (
                      record.attachmentsOfDetailTask.map((attach) => {
                        return (
                          <>
                            <p
                              className={'table-detail-task__name-attach'}
                              onClick={() => {
                                history.push(
                                  `/${idProject}/storage/?name=${attach.name}`
                                );
                                localStorage.setItem('sider', '3');
                              }}
                            >
                              <i className="table-detail-task__icon-attach">
                                {renderIconByFileType(attach.nameType)}
                              </i>
                              {attach.name}
                            </p>
                          </>
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
                    disabled={info.is_complete}
                    onClick={() => {
                      setIsVisible(true);
                    }}
                    style={{ borderRadius: '8px' }}
                  >
                    Add new one
                  </Button>
                )}
              />
            </div>
          </Space>
          <ChatOnTask
            visible={!isVisibleChatOnTask}
            onClose={() => setIsvisibleChatOnTask(true)}
          />
        </div>
        <Tooltip placement="left" title="Open chat">
          <Button
            shape={'circle'}
            type="primary"
            icon={<MessageOutlined />}
            size="large"
            onClick={() => setIsvisibleChatOnTask(false)}
            className="open-drawer-chat-on-task"
          />
        </Tooltip>
      </Spin>
    </>
  );
};

export default DetailTask;
