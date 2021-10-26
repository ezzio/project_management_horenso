import React from "react";
import PropTypes from "prop-types";
import { MdMoreHoriz } from "react-icons/md";
import "./Column.scss";
import Task from "features/Task/Task";
import { Droppable } from "react-beautiful-dnd";
import { AiFillPlusCircle } from "react-icons/ai";

const Column = (props) => {
  const { column } = props;

  return (
    <Droppable droppableId={column.id_column.toString()}>
      {(provided, snapshot) => (
        <div
          className={`column ${snapshot.isDraggingOver ? "drag-active" : ""}`}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="column__header">
            <h4 className="column__header__title">{column.name}</h4>
            {column.id_column === 0 && (
              <AiFillPlusCircle className="column__header__add" />
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
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};

Column.propTypes = {
  column: PropTypes.object,
};

export default Column;
