import { Comment, Typography, Avatar, Tooltip } from 'antd';

import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { viewMemberInfo } from 'features/ModalCheckProfileMember/CheckProfileMemberSlice';
import ModalCheckProfileMember from 'features/ModalCheckProfileMember/ModalCheckProfileMember';

const { Text } = Typography;
const BubbleChatOnTask = (props) => {
  const { key, user, sendAt, mess } = props;

  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(false);
  const [userName, setUserName] = React.useState('');
  const viewProfile = (item) => {
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
        key={key}
        author={<Text>{user.user_name}</Text>}
        avatar={
          <Avatar
            src={user.avatar}
            alt={user.user_name}
            onClick={() => viewProfile(user.user_name)}
          />
        }
        content={mess.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
        datetime={
          <Tooltip title={moment(sendAt).format('YYYY-MM-DD HH:mm:ss')}>
            <span>{moment(sendAt).fromNow()}</span>
          </Tooltip>
        }
      ></Comment>
    </>
  );
};

export default BubbleChatOnTask;
