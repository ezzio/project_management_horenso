import Text from 'antd/lib/typography/Text';
import React from 'react';
import './TaskCounter.scss';
const TaskCounter = () => {
  return (
    <>
      <div className="task-counter-card ">
        <div className="task-counter-card__header">
          <Text type="secondary">Task waiting</Text>
          <Text style={{ fontSize: '1.15rem' }}>👀</Text>
        </div>
        <div className="task-counter-card__body">
          <b style={{ fontSize: '3rem' }}>125</b>
        </div>
      </div>
      <div className="task-counter-card ">
        <div className="task-counter-card__header">
          <Text type="secondary">Task on working</Text>
          <Text style={{ fontSize: '1.15rem' }}>🚀</Text>
        </div>
        <div className="task-counter-card__body">
          <b style={{ fontSize: '3rem' }}>125</b>
        </div>
      </div>
      <div className="task-counter-card ">
        <div className="task-counter-card__header">
          <Text type="secondary">Wait to review task</Text>
          <Text style={{ fontSize: '1.15rem' }}>📑</Text>
        </div>
        <div className="task-counter-card__body">
          <b style={{ fontSize: '3rem' }}>125</b>
        </div>
      </div>
      <div className="task-counter-card ">
        <div className="task-counter-card__header">
          <Text type="secondary">Completed</Text>
          <Text style={{ fontSize: '1.15rem' }}>✅</Text>
        </div>
        <div className="task-counter-card__body">
          <b style={{ fontSize: '3rem' }}>125</b>
        </div>
      </div>
    </>
  );
};

export default TaskCounter;
