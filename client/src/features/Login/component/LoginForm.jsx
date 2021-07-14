import React from 'react'
import './LoginForm.scss'
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';

function LoginForm() {
    return (
        <div className='login-form'>
            <div className='login-form__title'>
                <span className='login-form__title__text'>Welcome!</span>
            </div>
            <div className='login-form__email-container'>
                <div className='email-textbox' 
                    style={{
                        height: 45,
                        width: 400,
                        position: "absolute",
                        left: 0,
                        top: 23,
                        borderWidth: 1,
                        borderColor: "#000000",
                        borderStyle: "solid"
                }}>
                    <input className='email-textbox__input' placeholder='Enter your email'></input>
                </div>
                <span className='login-form__email-container__label'>Email</span>
            </div>
            <div className='login-form__password-container'>
                <span className='login-form__password-container__label'>Password</span>
                <div className='password-textbox' 
                    style={{
                        height: 45,
                        width: 400,
                        position: "absolute",
                        left: 0,
                        top: 0,
                        borderWidth: 1,
                        borderColor: "#000000",
                        borderStyle: "solid"
                    }}>
                        <input className='password-textbox__input' placeholder='Enter password'></input>
                </div>
            </div>
            <a className='login-form__forgotpassword' href='https://www.google.com/'>Forgot password?</a>
            <AiOutlineMail style={{ 
                top: 118,
                left: 64,
                position: "absolute",
                fontSize: 30,
                color: 'gray'
            }}>
            </AiOutlineMail>
            <AiOutlineLock style={{
                top: 210,
                left: 64,
                position: "absolute",
                fontSize: 30,
                color: 'gray'
            }}>
            </AiOutlineLock>
            <div className='login-form__login-btn-container'>
                <button className='login-btn'>
                    <span className='login-btn__text'>Log In</span>
                </button>
            </div>
            <a className='login-form__login-github' href='https://www.google.com'>Or login with Github</a>
        </div>
    )
}

export default LoginForm
