import React from 'react';
import PropTypes from 'prop-types';
import { MdMoreHoriz } from 'react-icons/md';
import './Column.scss';
import { BsPlusCircleFill } from 'react-icons/bs';

const Column = (props) => {
  const { tasks, column, numberOfTasks } = props;
  return (
    <div className="column">
      <div className="column__header">
        <h4 className="column__header__title">{column.title}</h4>
        <MdMoreHoriz />
      </div>
      <div className="column__content">
        <button className="column__content__add-task">
          <BsPlusCircleFill /> Add another task
        </button>
      </div>
    </div>
  );
};

Column.propTypes = {
  tasks: PropTypes.array,
  column: PropTypes.object,
  numberOfTasks: PropTypes.number,
};

export default Column;
