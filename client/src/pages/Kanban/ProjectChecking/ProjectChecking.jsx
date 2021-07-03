import React from 'react';
import './ProjectChecking.scss';

function ProjectChecking() {
    return (
        
        <div id="main">
            <div id="side-bar">
                <div className="side-bar-header">

                </div>
                <div className="side-bar-content">

                </div>
            </div>

            <div id="header">
                <div id="nav">
                    <div className="work-info">
                        <h2>Design System</h2>
                        <button>Edit</button>
                    </div>
                </div>

                <div id="time">
                    <div className="total-time">
                        <h2>Total time</h2>
                        {/* <p>Calendar</p> */}
                    </div>
                </div>
            </div>

            <div id="content">
                <div className="content-section">
                    <div className="statistics">
                        <div className="parameter-list">
                            <div className="parameter-item">
                                <p className="parameter-name">Total time on Projects</p>
                                <h2 className="parameter-value">03:39h</h2>
                            </div>

                            <div className="parameter-item">
                                <p className="parameter-name">Earnings</p>
                                <h2 className="parameter-value">$2,409.20</h2>
                            </div>

                            <div className="parameter-item">
                                <p className="parameter-name">Costs</p>
                                <h2 className="parameter-value">$1,260.14</h2>

                            </div>

                            <div className="parameter-item">
                                <p className="parameter-name">Productivity</p>
                                <h2 className="parameter-value">93.57%</h2>
                            </div>

                            <div class="clear"></div>
                        </div>
                    </div>
                    <div className="task-table">
                        <div className="task-management">
                            <p>Task</p>
                            <button>Add New Task</button>
                        </div>
                        
                        <div className="work-space">
                            <div className="kanban-board">
                                <div className="work-flow">
                                    <p className="task-infomation">To Do</p>
                                    <div className="task-detail">
                                        <div className="task-header">
                                            <p className="task-name">Design homepage</p>
                                        </div>
                                        <div className="task-content">
                                            <p className="task-member">A</p>
                                            <p className="task-time">00:00:00 h</p>
                                        </div>
                                    </div>
                                    <div className="new-task">
                                        <button>+Add new task</button>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="kanban-board">
                                <div className="work-flow">
                                    <p className="task-infomation">On Hold</p>
                                    <div className="task-detail">
                                        <div className="task-header">
                                            <p className="task-name">Design homepage</p>
                                        </div>
                                        <div className="task-content">
                                            <p className="task-member">A</p>
                                            <p className="task-time">00:00:00 h</p>
                                        </div>
                                    </div>
                                    <div className="new-task">
                                        <button>+Add new task</button>
                                    </div>
                                </div>
                            </div>

                            <div className="kanban-board">
                                <div className="work-flow">
                                    <p className="task-infomation">In Progress</p>
                                    <div className="task-detail">
                                        <div className="task-header">
                                            <p className="task-name">Design homepage</p>
                                        </div>
                                        <div className="task-content">
                                            <p className="task-member">A</p>
                                            <p className="task-time">00:00:00 h</p>
                                        </div>
                                    </div>
                                    <div className="new-task">
                                        <button>+Add new task</button>
                                    </div>
                                </div>
                            </div>

                            <div className="kanban-board">
                                <div className="work-flow">
                                    <p className="task-infomation">Done</p>
                                    <div className="task-detail">
                                        <div className="task-header">
                                            <p className="task-name">Design homepage</p>
                                        </div>
                                        <div className="task-content">
                                            <p className="task-member">A</p>
                                            <p className="task-time">00:00:00 h</p>
                                        </div>
                                    </div>
                                    <div className="new-task">
                                        <button>+Add new task</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="footer">

            </div>
        </div>
    );
}
export default ProjectChecking;