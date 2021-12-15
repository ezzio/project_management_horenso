import React, { useState } from 'react';
import './LoginForm.scss';
import { useForm } from 'react-hook-form';
import { AiOutlineMail, AiOutlineLock, AiFillGithub } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogin } from '../LoginSlice';

function LoginForm(props) {
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const handleLogin = async (data) => {
    await dispatch(userLogin(data));
  };

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="login-form">
      <div className="login-form__title">
        <span className="login-form__title__text">Welcome!</span>
      </div>
      <div className="login-form__email-container">
        <div className="email-textbox">
          <input
            className="email-textbox__input"
            placeholder="Enter your username"
            type="text"
            name="username"
            autocomplete="off"
            {...register('username', {
              required: 'This field is required',
              pattern: {
                message: 'Invalid username',
              },
            })}
          />
          <span className="login-form__email-container__label">Username</span>
        </div>
        {errors.username && (
          <p
            style={{ position: 'absolute', top: 40, fontSize: 14 }}
            className="login-form__error"
          >
            {errors.username.message}
          </p>
        )}
      </div>
      <div className="login-form__password-container">
        <span className="login-form__password-container__label">Password</span>
        <div className="password-textbox">
          <input
            className="password-textbox__input"
            placeholder="Enter password"
            type="password"
            name="password"
            {...register('password', {
              required: 'This field is required',
              minLength: {
                value: 5,
                message: 'Password must be 5-18 characters long',
              },
              maxLength: {
                value: 18,
                message: 'Password must be 5-18 characters long',
              },
            })}
          />
        </div>
        {errors.password && (
          <p
            style={{ position: 'absolute', top: 42, fontSize: 14 }}
            className="login-form__error"
          >
            {errors.password.message}
          </p>
        )}
      </div>
      <Link className="login-form__forgotpassword" path="/ForgotPassword">
        Forgot Password?
      </Link>
      <AiOutlineMail
        style={{
          top: 145,
          left: 64,
          position: 'absolute',
          fontSize: 25,
          color: 'gray',
        }}
      />
      <AiOutlineLock
        style={{
          top: 227,
          left: 64,
          position: 'absolute',
          fontSize: 25,
          color: 'gray',
        }}
      />
      <div>
        {error !== '' ? (
          <p
            style={{ position: 'absolute', top: 95, left: 162, fontSize: 14 }}
            className="login-form__error"
          >
            {error}
          </p>
        ) : (
          ''
        )}
      </div>
      <div className="login-form__login-btn-container">
        <button type="submit" className="login-btn">
          <span className="login-btn__text">Log In</span>
        </button>
      </div>

      <button type="button" className="github-btn">
        <AiFillGithub
          style={{ position: 'absolute', fontSize: 25, left: 20, bottom: 3 }}
        />
        <span className="github-btn__text">Or Log in with Github</span>
      </button>
    </form>
  );
}

export default LoginForm;
