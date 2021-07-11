import React from 'react';
import "./TaskColumn.scss";
import TaskDetail from "../TaskDetail/TaskDetail.jsx";
function TaskColumn() {
    return (
        <div className="kanban-board">
            <div className="work-flow">
                <p className="task-infomation">To Do</p>
                <TaskDetail />
                <TaskDetail />
                <TaskDetail />
                <TaskDetail />
                <TaskDetail />
                <TaskDetail />
                <TaskDetail />
                <TaskDetail />
                <div className="new-task">
                    <a href="" className="">+Add new task</a>
                </div>
            </div>
        </div>
    );
}

export default TaskColumn;