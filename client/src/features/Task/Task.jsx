import React from 'react';
import PropTypes from 'prop-types';
import { GrAttachment } from 'react-icons/gr';
import { RiChat1Line } from 'react-icons/ri';
import './Task.scss';

const Task = (props) => {
  return (
    <div className="kanban-task">
      <section className="kanban-task__title">
        <h4>
          This is a name of the task you want to create and launch a new task.
          You can use this to create a new task.
        </h4>
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
  );
};

Task.propTypes = {};

export default Task;
