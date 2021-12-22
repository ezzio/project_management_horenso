import React from 'react';
import './LoginScreen.scss';
import LoginForm from './component/LoginForm.jsx';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';

function LoginScreen() {
  const history = useHistory();

  return (
    <div className="login">
      <div className="login__form">
        <LoginForm />
      </div>
      <div className="login__signup-container">
        <div className="login__signup">
          <span className="login__signup__text">Don't have an account?</span>
        </div>
        <button className="signup-btn" onClick={() => history.push('/sign-up')}>
          <span className="signup-btn__text">Sign up</span>
        </button>
      </div>
    </div>
  );
}

export default LoginScreen;
