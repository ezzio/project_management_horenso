import React from 'react';
import PropTypes from 'prop-types';
import ListMember from './components/ListMember';
import { BarsOutlined, LoginOutlined } from '@ant-design/icons';
import './JobTag.scss';
import {
  Button,
  Divider,
  message,
  Popconfirm,
  Popover,
  Progress,
  Space,
  Tooltip,
} from 'antd';
import { useState } from 'react';
import ModalEditKanban from 'features/KanbanDashBoard/components/ModalEditKanban';
import {
  updateKanban,
  EditAJob,
} from 'features/KanbanDashBoard/KanbanDashBoardSlice';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const JobTag = (props) => {
  const { title, priority, process, members, job, onDeleteJob } = props;
  const dispatch = useDispatch();
  const { idProject } = useParams();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleEditJob = (values) => {
    const action = {
      id_job: job.id_job,
      title: values.title,
      priority: values.priority,
      process: job.process,
      is_completed: values.is_completed,
      start_time: values.range_time[0].format('YYYY-MM-DD'),
      end_time: values.range_time[1].format('YYYY-MM-DD'),
      members: job.members.filter((item) =>
        values.members.includes(item.user_name)
      ),
    };
    dispatch(updateKanban(action));
    dispatch(EditAJob(action));
    message.success('Success! This Job has been edited');
    setIsModalVisible(false);
  };

  return (
    <>
      <ModalEditKanban
        handleCancel={handleCancel}
        state={isModalVisible}
        job={job}
        handleEditClick={handleEditJob}
      />
      <div className="ctn-job-task">
        {/* <Link to={`/kanban/${id}`}> */}
        <div className="ctn-job-task__title">
          <Link to={`/${idProject}/jobs/${job.id_job}`}>
            <p>{title}</p>
          </Link>
        </div>
        <div className="ctn-job-task__priority">
          <div
            className={
              priority.toLowerCase() === 'high'
                ? 'high'
                : priority === 'medium'
                ? 'medium'
                : 'low'
            }
            style={{ width: 'fit-content' }}
          >
            {priority}
          </div>
        </div>

        <div className="ctn-job-task__process">
          <Progress size="small" percent={process} />
        </div>
        {/* </Link> */}
        <div className="ctn-job-task__members">
          <ListMember members={members} />
          <div className="ctn-job-task__members__properties">
            <Popover
              placement="topLeft"
              content={
                <Space>
                  <Button onClick={showModal} type="primary">
                    Edit
                  </Button>
                  <Popconfirm
                    title="Are you sure to delete this job?"
                    onConfirm={(event) => onDeleteJob(job, event)}
                    onCancel={'cancel'}
                    okText="Yes"
                    cancelText="No"
                    placement="topRight"
                  >
                    <Button danger>Delete</Button>
                  </Popconfirm>
                </Space>
              }
              trigger={'click'}
            >
              <Button shape="circle" type="text">
                <BarsOutlined />
              </Button>
            </Popover>

            {job && (
              <Link to={`/${idProject}/jobs/${job.id_job}`}>
                <Tooltip title="Open Now">
                  <Button shape="circle" type="text">
                    <LoginOutlined />
                  </Button>
                </Tooltip>
              </Link>
            )}
          </div>
        </div>
      </div>
      <Divider classname="job-divider" style={{ margin: '0' }} />
    </>
  );
};

// JobTag.propTypes = {
//   title: PropTypes.string,
//   level: PropTypes.string,
//   process: PropTypes.string,
//   members: PropTypes.array,
//   onDeleteJob: PropTypes.func,
// };

export default JobTag;
