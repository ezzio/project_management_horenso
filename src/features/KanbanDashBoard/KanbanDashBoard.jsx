import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  message,
  Typography,
  Empty,
  Spin,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import JobTag from 'features/JobTag - Kanban/JobTag';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './KanbanDashBoard.scss';
import {
  addKanban,
  deleteKanban,
  ListKanban,
  AddNewJobkanban,
  DeleteAJob,
} from './KanbanDashBoardSlice';

const { RangePicker } = DatePicker;
const { Title } = Typography;

const KanbanDashBoard = () => {
  const [showCompleteTask, setShowCompleteTask] = useState(true);
  const jobs = useSelector((state) => state.kanban);
  const loading = useSelector((state) => state.kanban.loading);
  const dispatch = useDispatch();

  //-------------- Jobs On Working -------------->
  const highJobsOnWorking = jobs.listJobs.filter(
    (item) => item.priority === 'High'
  );
  const mediumJobsOnWorking = jobs.listJobs.filter(
    (item) => item.priority === 'Medium'
  );
  const lowJobsOnWorking = jobs.listJobs.filter(
    (item) => item.priority === 'Low'
  );
  const resultJobsOnWorking = [
    ...highJobsOnWorking,
    ...mediumJobsOnWorking,
    ...lowJobsOnWorking,
  ];
  // <--------------------------------------------

  //------------ Jobs In Completed Space -------->
  const isCompletedJobs = jobs.listJobs.filter((job) => job.is_completed);
  const highCompletedJobs = isCompletedJobs.filter(
    (item) => item.priority === 'High'
  );
  const mediumCompletedJobs = isCompletedJobs.filter(
    (item) => item.priority === 'Medium'
  );
  const lowCompletedJobs = isCompletedJobs.filter(
    (item) => item.priority === 'Low'
  );
  const resultCompletedJobs = [
    ...highCompletedJobs,
    ...mediumCompletedJobs,
    ...lowCompletedJobs,
  ];
  //<---------------------------------------------

  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  // List Kanban
  useEffect(() => {
    dispatch(ListKanban());
  }, []);

  //Delete Kanban here
  const handleDeleteJob = (job) => {
    const deleteKanbanID = job.id_job;
    const action = deleteKanban(deleteKanbanID);
    dispatch(action);
    dispatch(DeleteAJob({ kanban_id: deleteKanbanID }));
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  // -----------------------------
  //          Modal Form
  const onFinish = (values) => {
    const newKanban = {
      // id_job: jobs.id_job,
      title: values.title,
      proccess: 0,
      priority: values.priority,
      is_completed: false,
      start_time: values.range_time[0].format('YYYY-MM-DD'),
      end_time: values.range_time[1].format('YYYY-MM-DD'),
      members: values.members,
      parent: values.parent,
    };
    // console.log(newKanban);
    // dispatch(addKanban(newKanban));
    dispatch(AddNewJobkanban(newKanban));
    setVisible(false);
  };
  const [form] = Form.useForm();

  // -----------------------------

  const role = useSelector((state) => state.sidebar.role);

  return (
    <>
      <Modal
        title="Add new kanban"
        visible={visible}
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
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        initialValues={{ priority: 'Low' }}
      >
        <Form
          layout="vertical"
          form={form}
          name="add_new_kanban"
          onFinish={onFinish}
          autoComplete="off"
          initialValues={{ priority: 'Low', parent: 'not' }}
        >
          <Form.Item
            label="Title: "
            name="title"
            rules={[
              { required: true, message: 'Please input title of job !' },
              {
                max: 50,
                message: 'The title must be maximum 50 characters !',
              },
              { min: 5, message: 'The title must be minimum 5 characters !' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Priority: " name="priority">
            <Select>
              <Select.Option value="High">High</Select.Option>
              <Select.Option value="Medium">Medium</Select.Option>
              <Select.Option value="Low">Low</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="range_time"
            label="Time range: "
            rules={[
              {
                type: 'array',
                required: true,
                message: 'Please select time!',
              },
            ]}
          >
            <RangePicker
              allowClear
              format="YYYY-MM-DD"
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item
            name="members"
            label="Members:"
            rules={[
              {
                required: true,
                message: 'Please select members on duty',
                type: 'array',
              },
            ]}
          >
            <Select mode="multiple" placeholder="Search member...">
              {jobs.membersInProject.map((eachMember) => (
                <Select.Option value={eachMember.name}>
                  {eachMember.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="parent"
            label="Parent job"
            rules={[
              {
                required: true,
                message: 'Please select one',
              },
            ]}
          >
            <Select defaultValue="not">
              <Select.Option value={'not'}>Not available</Select.Option>
              {jobs.listJobs.map((job) => (
                <Select.Option value={job.id_job}>{job.title}</Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Spin tip="Loading..." size="large" spinning={loading}>
        <div className="ctn-kanbandashboard">
          <div className="ctn-kanbandashboard__working">
            <div className="ctn-kanbandashboard__working__title">
              <Title level={3} className="title">
                Jobs in progress
              </Title>
              {(role ===  'Project Manager'|| role ===  'Leader') && (
                <Button
                  type={'primary'}
                  onClick={showModal}
                  icon={<PlusOutlined />}
                  className="add-new-job"
                >
                  Add new
                </Button>
              )}
            </div>
            <div className="ctn-kanbandashboard__working__content">
              {jobs.listJobs?.length > 0 ? (
                resultJobsOnWorking.map((job) => {
                  if (!job.is_completed)
                    return (
                      <JobTag
                        key={job.id_job}
                        onDeleteJob={handleDeleteJob}
                        job={job}
                        title={job.title}
                        priority={job.priority}
                        process={parseInt(job.progress)}
                        members={job.members}
                        setVisible={setVisible}
                        role={role}
                      />
                    );
                })
              ) : (
                <Empty style={{ marginTop: '5rem' }} />
              )}
            </div>
          </div>
          <div className="ctn-kanbandashboard__complete">
            <div className="ctn-kanbandashboard__complete__title">
              <Title level={3} className="title">
                Completed jobs
              </Title>
            </div>
            {showCompleteTask && (
              <CompleteTask
                jobs={resultCompletedJobs}
                handleDeleteJob={handleDeleteJob}
                setVisible={setVisible}
                role={role}
              />
            )}
          </div>
        </div>
      </Spin>
    </>
  );
};

export default KanbanDashBoard;

const CompleteTask = ({ jobs, handleDeleteJob, setVisible, role }) => {
  return (
    <div className="ctn-kanbandashboard__complete__content">
      {jobs.length > 0 ? (
        jobs.map((job) => {
          if (job.is_completed)
            return (
              <JobTag
                key={job.id_job}
                onDeleteJob={handleDeleteJob}
                job={job}
                title={job.title}
                priority={job.priority}
                process={parseInt(job.progress)}
                members={job.members}
                setVisible={setVisible}
                role={role}
              />
            );
        })
      ) : (
        <Empty style={{ marginTop: '5rem' }} />
      )}
    </div>
  );
};
