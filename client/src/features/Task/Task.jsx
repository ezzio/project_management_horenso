import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { RiChat1Line } from 'react-icons/ri';
import { ImAttachment } from 'react-icons/im';
import './Task.scss';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { deleteTask } from 'features/Board/boardSlice';
import { Menu, Dropdown, Badge } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Popconfirm, message } from 'antd';
import moment from 'moment';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const Task = (props) => {
  const { task, columnId } = props;
  const dispatch = useDispatch();

  const location = useLocation();
  console.log(location);

  // const currentTime = moment();
  // const projectTime = moment(task.endTime);
  // const endTime = currentTime.from(projectTime);

  function cancel(e) {
    console.log(e);
    // message.error("Click on No");
  }

  const handleDeleteTask = (task) => {
    const deleteTaskId = task.id;
    const action = deleteTask({ deleteTaskId, columnId });
    dispatch(action);
    message.success('Success! Task has been deleted.');
  };

  const menu = (
    <Menu>
      <Menu.Item key="0" primary ghost>
        <a>Edit task</a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1" danger ghost>
        <Popconfirm
          title="Are you sure to delete this task?"
          onConfirm={() => handleDeleteTask(task)}
          onCancel={cancel}
          okText="Yes"
          cancelText="No"
        >
          <a href="#">Delete task</a>
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      {task.isOverdue ? (
        <Badge.Ribbon text="Overdue" color="red">
          <Link to={`${location.pathname}/${task.id}`}>
            <div className="kanban-task">
              <div className="kanban-task__title">
                <h4>{task.title}</h4>
                <Dropdown overlay={menu} trigger={['click']}>
                  <a
                    className="ant-dropdown-link"
                    onClick={(e) => e.preventDefault()}
                  >
                    <DownOutlined />
                  </a>
                </Dropdown>
              </div>
              <div className="kanban-task__progress">
                <div
                  className="kanban-task__progress__bar"
                  style={{ width: `${task.progress}%` }}
                >
                  {task.progress > 10 && <p>{task.progress}%</p>}
                </div>
                {task.progress < 10 && <p>{task.progress}%</p>}
              </div>
              <div className="kanban-task__info">
                <div
                  className={
                    task.level === 'high'
                      ? 'high'
                      : task.level === 'low'
                      ? 'low'
                      : 'medium'
                  }
                >
                  {task.level}
                </div>
                <div className="kanban-task__info__time">Due in 2 days</div>
              </div>
              <div className="kanban-task__members-attach">
                <div className="kanban-task__members-attach__members">
                  {task.taskers.map((tasker, index) =>
                    index < 4 ? (
                      <img
                        src={tasker.avatar}
                        alt="avatar"
                        height="30"
                        width="30"
                      />
                    ) : null
                  )}
                  {task.taskers.length > 4 && (
                    <div
                      style={{
                        backgroundColor: '#eee',
                        borderRadius: '50%',
                        width: '30px',
                        height: '30px',
                        transform: 'translateX(-20px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <p>+{task.taskers.length - 4}</p>
                    </div>
                  )}
                </div>
                <div className="kanban-task__members-attach__attach">
                  <p>
                    <ImAttachment /> 2
                  </p>
                  <p>
                    <RiChat1Line /> 18
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </Badge.Ribbon>
      ) : (
        <Link to={`${location.pathname}/${task.id}`}>
          <div className="kanban-task">
            <div className="kanban-task__title">
              <h4>{task.title}</h4>
              <Dropdown overlay={menu} trigger={['click']}>
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  <DownOutlined />
                </a>
              </Dropdown>
            </div>
            <div className="kanban-task__progress">
              <div
                className="kanban-task__progress__bar"
                style={{ width: `${task.progress}%` }}
              >
                {task.progress > 10 && <p>{task.progress}%</p>}
              </div>
              {task.progress < 10 && <p>{task.progress}%</p>}
            </div>
            <div className="kanban-task__info">
              <div
                className={
                  task.level === 'high'
                    ? 'high'
                    : task.level === 'low'
                    ? 'low'
                    : 'medium'
                }
              >
                {task.level}
              </div>
              <div className="kanban-task__info__time">Due in 2 days</div>
            </div>
            <div className="kanban-task__members-attach">
              <div className="kanban-task__members-attach__members">
                {task.taskers.map((tasker, index) =>
                  index < 4 ? (
                    <img
                      src={tasker.avatar}
                      alt="avatar"
                      height="30"
                      width="30"
                    />
                  ) : null
                )}
                {task.taskers.length > 4 && (
                  <div
                    style={{
                      backgroundColor: '#eee',
                      borderRadius: '50%',
                      width: '30px',
                      height: '30px',
                      transform: 'translateX(-20px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <p>+{task.taskers.length - 4}</p>
                  </div>
                )}
              </div>
              <div className="kanban-task__members-attach__attach">
                <p>
                  <ImAttachment /> 2
                </p>
                <p>
                  <RiChat1Line /> 18
                </p>
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

Task.propTypes = {
  task: PropTypes.object.isRequired,
  columnId: PropTypes.number.isRequired,
};

export default Task;
