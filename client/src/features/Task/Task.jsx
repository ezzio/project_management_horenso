import React from 'react';
import PropTypes from 'prop-types';
import { GrAttachment } from 'react-icons/gr';
import { RiChat1Line } from 'react-icons/ri';
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
          <section className="kanban-task__title">
            <h4>{task.title}</h4>
          </section>

          <section className="kanban-task__block-2">
            <div className="kanban-task__priority high">High</div>
            <section className="kanban-task__attachment">
              <section className="kanban-task__attachment__file">
                <p>
                  <GrAttachment /> 2 files
                </p>
              </section>
              <section className="kanban-task__attachment__comment">
                <p>
                  <RiChat1Line /> 2 comments
                </p>
              </section>
            </section>
          </section>

          <section className="kanban-task__member">
            <img
              src="https://www.timeoutdubai.com/public/styles/full_img/public/images/2020/07/13/IMG-Dubai-UAE.jpg?itok=j4dmDDZa"
              alt=""
              className="kanban-task__member__icon"
              height="32"
              width="32"
            />
          </section>
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
