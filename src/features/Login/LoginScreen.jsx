import React from 'react';
import LoginForm from './component/LoginForm';
import { Typography } from 'antd';

//styles
import './LoginScreen.scss';
import { useHistory } from 'react-router-dom';

//library
const { Title } = Typography;

const LoginScreen = () => {
  const history = useHistory();

  const isLoggedIn = Boolean(localStorage.getItem('access_token'));
  if (isLoggedIn) history.push('/');
  return (
    <div className="ctn login">
      <div className="login__form">
        <Title level={1} style={{ marginBottom: '2rem', textAlign: 'center' }}>
          Welcome to Kanso!
        </Title>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginScreen;
