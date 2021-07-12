import React from 'react';
import "./TaskDetail.scss";
function TaskDetail() {
    return (
        <div className="task-detail">
            <div className="task-header">
                <p className="task-header-name">Design homepage</p>
                <span>
                    <a href="" className="task-header-more">...</a>
                </span>
            </div>
            <div className="task-content">
                <p className="task-content-member">A</p>
                <p className="task-content-time">00:00:00 h</p>
            </div>
        </div>
    );
}

export default TaskDetail;