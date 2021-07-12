import React from 'react';
import "./Workplace.scss";
import Statistics from '../Statistics/Statistics';
import NewTask from '../NewTask/NewTask';
import TaskColumn from '../TaskColumn/TaskColumn';
function Workplace() {
    return (
            <div className="content">
                <div className="content-section">
                    {/* Thống kê số liệu */}
                    <Statistics /> 
                    <div className="task-table">
                        {/* Thêm task mới */}
                        <NewTask />
                        
                        <div className="work-space">
                            {/* Các cột công việc */}
                            <TaskColumn />
                            <TaskColumn />
                            <TaskColumn />
                            <TaskColumn />
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Workplace;