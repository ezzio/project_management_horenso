import React from 'react';
import "./TaskColumn.scss";
function TaskColumn() {
    return (
        <div className="kanban-board">
            <div className="work-flow">
                <p className="task-infomation">To Do</p>
                <div className="task-detail">
                    <div className="task-header">
                        <p className="task-name">Design homepage</p>
                        <span>
                            <a href="" className="more">...</a>
                        </span>
                    </div>
                    <div className="task-content">
                        <p className="task-member">A</p>
                        <p className="task-time">00:00:00 h</p>
                    </div>
                </div>
                <div className="new-task">
                    <a href="">+Add new task</a>
                </div>
            </div>
        </div>
    );
}

export default TaskColumn;