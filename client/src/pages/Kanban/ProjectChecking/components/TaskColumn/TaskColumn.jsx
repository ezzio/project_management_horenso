import React, {useRef, useState} from 'react';
import "./TaskColumn.scss";
// import TaskDetail from "../TaskDetail/TaskDetail.jsx";
function TaskColumn() {
    const data = [
        {
        column: 'Todo',
        tasks: [
            {id: 1, name: "Design Homepage", member: "Nhut", time: "01:25:15",},
            {id: 2, name: "Design Kanban page", member: "Thang", time: "00:45:20"},
        ],
    },
    {
        column: 'On hold',
        tasks: [
            {id: 3, name: "Design login page", member: "Minh", time: "02:00:01"},
        ],
    },
    {
        column: 'In progress',
        tasks:[
            {id: 4, name: "Design Meeting page", member: "Nguyen", time: "00:10:48"}
        ],
    },
    {
        column: 'Done',
        tasks: [
            {id: 5, name: "Design Report page", member: "Khoa", time: "03:44:12"}
        ],
    },
]
    return (
        <div className="ctn kanban">
            {data.map((c, cIndex) => (
            <div className="kanban-board">
                    <div className="work-flow">
                        <p key={c.column} className="work-flow-task-infomation">{c.column}</p>
                            {c.tasks.map((task, taskIndex) => (
                                <div className="task-detail">
                                    <div className="task-header">
                                        <p className="task-header-name">{task.name}</p>
                                        <span>
                                            <a href="" className="task-header-more">...</a>
                                        </span>
                                    </div>
                                    <div className="task-content">
                                        <p className="task-content-member">{task.member}</p>
                                        <p className="task-content-time">{task.time} h</p>
                                    </div>
                                </div>
                            ))}
                    <div className="work-flow-footer">
                        <a href="">+Add new task</a>
                    </div>
                </div>
            </div>
            ))}
        </div>
    );
}

export default TaskColumn;