import React from 'react';
import { List } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';

const TaskItemRender = ({ tasks }) => {
  const { Item } = List;

  return (
    <List
      itemLayout="horizontal"
      dataSource={tasks}
      renderItem={(item) => (
        <Item>
          <Item.Meta
            title={
              <Link
                to={`/${item.idProject}/jobs/${item.idBoard}/${item.idTask}`}
                style={{ fontSize: '1rem' }}
              >
                {item.title}
              </Link>
            }
          />
          <div
            className={
              item.priority.toLowerCase() === 'high'
                ? 'high'
                : item.priority.toLowerCase() === 'medium'
                ? 'medium'
                : 'low'
            }
          >
            {item.priority}
          </div>
        </Item>
      )}
    />
  );
};

export default TaskItemRender;
