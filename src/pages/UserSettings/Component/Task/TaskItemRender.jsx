import React from 'react';
import { List, Progress } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Text from 'antd/lib/typography/Text';
import './TaskItemRender.scss';
const TaskItemRender = ({ tasks }) => {
  const { Item } = List;

  return (
    <List
      className="list-task-of-user"
      itemLayout="horizontal"
      dataSource={tasks}
      renderItem={(item) => (
        <Item>
          <Item.Meta
            title={
              <>
                <Link
                  to={`/${item.idProject}/jobs/${item.idBoard}/${item.idTask}`}
                  style={{ fontSize: '1rem' }}
                >
                  {item.title}
                </Link>

                {moment().isAfter(item.end_time) && !item.is_complete ? (
                  <Text type="danger"> - Overdue</Text>
                ) : (
                  <Text type="secondary">
                    {' '}
                    - Due in {moment(item.end_time).fromNow(true)}
                  </Text>
                )}
              </>
            }
          />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '30%',
            }}
          >
            <Progress
              percent={item.progress}
              status={
                item.is_complete
                  ? 'success'
                  : item.progress === 100
                  ? 'active'
                  : moment().isAfter(item.end_time)
                  ? 'exception'
                  : 'normal'
              }
            ></Progress>
          </div>
        </Item>
      )}
    />
  );
};

export default TaskItemRender;
