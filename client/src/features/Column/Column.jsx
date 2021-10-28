import React from 'react';
import PropTypes from 'prop-types';
import { MdMoreHoriz } from 'react-icons/md';
import './Column.scss';
import Task from 'features/Task/Task';
import { Droppable } from 'react-beautiful-dnd';
import { AiFillPlusCircle } from 'react-icons/ai';
import { Badge } from 'antd';

const Column = (props) => {
  const { column, openModal } = props;

  return (
    <div className={`column`}>
      <div className="column__header">
        <h4 className="column__header__title">{column.name}</h4>
        {column.id_column === 0 && (
          <AiFillPlusCircle
            className="column__header__add"
            onClick={openModal}
          />
        )}
      </div>
      <div className="column__content">
        {column.tasks &&
          column.tasks.map((task, index) => {
            return (
              <Task
                task={task}
                key={task.id}
                index={index}
                columnId={column.id_column}
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
