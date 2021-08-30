import React from 'react';
import PropTypes from 'prop-types';
import { MdMoreHoriz } from 'react-icons/md';
import './Column.scss';
import { BsPlusCircleFill } from 'react-icons/bs';
import Task from 'features/Task/Task';

const Column = (props) => {
  const { tasks, column, numberOfTasks } = props;
  return (
    <div className="column">
      <div className="column__header">
        <h4 className="column__header__title">{column.title}</h4>
        <MdMoreHoriz />
      </div>
      <div className="column__content">
        <Task></Task>
        <Task></Task>
        <Task></Task>
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
