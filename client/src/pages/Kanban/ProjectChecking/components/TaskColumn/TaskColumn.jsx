import React from 'react';
import "./TaskColumn.scss";
import TaskDetail from "../TaskDetail/TaskDetail.jsx";
function TaskColumn() {
    return (
        <div className="kanban-board">
            <div className="work-flow">
                <p className="work-flow-task-infomation">To Do</p>
                <TaskDetail />
                <TaskDetail />
                <TaskDetail />
                <TaskDetail />
                <TaskDetail />
                <TaskDetail />
                <TaskDetail />
                <TaskDetail />
                <TaskDetail />
                <TaskDetail />
                <TaskDetail />
                <div className="work-flow-footer">
                    <a href="">+Add new task</a>
                </div>
            </div>
        </div>
    );
}

export default TaskColumn;