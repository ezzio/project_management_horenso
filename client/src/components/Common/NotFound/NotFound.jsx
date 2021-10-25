import { Button, Result } from 'antd';
import React from 'react';

const NotFound = () => {
  return (
    <Result
      style={{margin: '0 auto'}}
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button onClick={() => window.history.back()} type="primary">Back</Button>}
    />
  );
};

export default NotFound;
