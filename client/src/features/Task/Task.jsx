import React from 'react';
import PropTypes from 'prop-types';
import { RiChat1Line } from 'react-icons/ri';
import { ImAttachment } from 'react-icons/im';
import { FiMoreHorizontal } from 'react-icons/fi';
import './Task.scss';
import { Draggable } from 'react-beautiful-dnd';

const Task = (props) => {
  const { task, index } = props;
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          className="kanban-task"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="kanban-task__title">
            <h4>{task.title}</h4>
            <FiMoreHorizontal />
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
      )}
    </Draggable>
  );
};

Task.propTypes = {
  index: PropTypes.number.isRequired,
  task: PropTypes.object.isRequired,
};

export default Task;
