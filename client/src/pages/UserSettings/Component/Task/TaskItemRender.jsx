import React from 'react';
import { List } from 'antd';

const TaskItemRender = ({ tasks }) => {
  const { Item } = List;

  return (
    <List
      itemLayout="horizontal"
      dataSource={tasks}
      renderItem={(item) => (
        <Item>
          <Item.Meta title={<a style={{ fontSize: 20 }}>{item.title}</a>} />
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
