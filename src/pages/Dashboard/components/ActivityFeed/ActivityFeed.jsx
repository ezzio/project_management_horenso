import React, { useState } from 'react';
import { Avatar, Comment, Tooltip, Typography } from 'antd';
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { viewMemberInfo } from 'features/ModalCheckProfileMember/CheckProfileMemberSlice';
import ModalCheckProfileMember from 'features/ModalCheckProfileMember/ModalCheckProfileMember';

const { Title, Text } = Typography;

const ActivityFeed = ({ item }) => {
  const { idProject } = useParams();

  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const viewProfile = (item) => {
    console.log(item);
    setUserName(item);
    setVisible(true);
    dispatch(viewMemberInfo(item));
  };

  return (
    <>
      {visible && (
        <ModalCheckProfileMember visible={true} setVisible={setVisible} />
      )}
      <Comment
        // actions={actions}
        author={<Title level={5}>{item.display_name || item.username}</Title>}
        avatar={
          <Avatar
            src={item.avatar}
            alt={item.display_name || item.username}
            onClick={() => viewProfile(item.username)}
          />
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
    </>
  );
};

export default ActivityFeed;
