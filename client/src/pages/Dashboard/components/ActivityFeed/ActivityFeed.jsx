import React from "react";
import { Avatar, Comment, Tooltip, Typography } from "antd";
import moment from "moment";

const { Title, Text } = Typography;

const ActivityFeed = () => {
  return (
    <Comment
      // actions={actions}
      author={<Title level={5}>Han Solo</Title>}
      avatar={
        <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
      }
      content={<Text>Hello There.</Text>}
      datetime={
        <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
          <span>{moment().fromNow()}</span>
        </Tooltip>
      }
    />
  );
};

export default ActivityFeed;
