import Task from 'features/Task/Task';
import PropTypes from 'prop-types';
import React from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import './Column.scss';

const Column = (props) => {
  const { column, openModal, role, members } = props;

  // const highTask = column.eachColumnTask.filter(
  //   (item) => item.priority === 'High'
  // );
  // const mediumTask = column.eachColumnTask.filter(
  //   (item) => item.priority === 'Medium'
  // );
  // const lowTask = column.eachColumnTask.filter(
  //   (item) => item.priority === 'Low'
  // );
  // const resultTask = [...highTask, ...mediumTask, ...lowTask];

  return (
    <div className={`column`}>
      <div className="column__header">
        <h4 className="column__header__title">
          {column.id_column === 0
            ? 'Backlogs'
            : column.id_column === 1
            ? 'In progress'
            : column.id_column === 2
            ? 'In review'
            : 'Completed'}
        </h4>
        {column.id_column === 0 &&
          (role === 'Leader' || role === 'Project Manager') && (
            <AiFillPlusCircle
              className="column__header__add"
              onClick={openModal}
            />
          )}
      </div>
      <div className="column__content">
        {column.eachColumnTask &&
          column.eachColumnTask.map((task, index) => {
            return (
              <Task
                task={task}
                key={task.id}
                index={index}
                columnId={column.id_column}
                members={members}
              />
            );
          })}
      </div>
    </div>
  );
};

Column.propTypes = {
  column: PropTypes.object,
};

export default Column;
