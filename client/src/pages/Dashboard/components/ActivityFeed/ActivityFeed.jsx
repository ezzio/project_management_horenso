import React from 'react';
import { Avatar, Comment, Tooltip, Typography } from 'antd';
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';

const { Title, Text } = Typography;

const ActivityFeed = ({ item }) => {
  const { idProject } = useParams();

  return (
    <Comment
      // actions={actions}
      author={<Title level={5}>{item.display_name || item.username}</Title>}
      avatar={
        <Avatar src={item.avatar} alt={item.display_name || item.username} />
      }
      content={
        <Text>
          {item.action} a new task{' '}
          {item.job ? (
            <Link
              to={`/${idProject}/jobs/${item.job.idJobOwner}/${item.idTask}`}
            >
              ({item.taskTitle})
            </Link>
          ) : (
            <b>({item.taskTitle} - Closed )</b>
          )}
        </Text>
      }
      datetime={
        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment(item.createAt).fromNow()}</span>
        </Tooltip>
      }
    />
  );
};

export default ActivityFeed;
