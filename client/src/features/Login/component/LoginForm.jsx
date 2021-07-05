import React from 'react'
import './LoginForm.scss'
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';

function LoginForm() {
    return (
        <div className='form'>
            <div className='form__title'>
                <span className='form__title__text'>Welcome!</span>
            </div>
            <div className='form__email-container'>
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
                <span className='form__email-container__label'>Email</span>
            </div>
            <div className='form__password-container'>
                <span className='form__password-container__label'>Password</span>
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
            <AiOutlineMail style={{
                top: 129,
                left: 23,
                position: "absolute",
                fontSize: 40}}
            ></AiOutlineMail>
            <AiOutlineLock style={{
                top: 213,
                left: 23,
                position: "absolute",
                fontSize: 40
            }}>
            </AiOutlineLock>
            <div className='form__login-btn-container'>
                <button className='login-btn'>
                    <span className='login-btn__text'>Log In</span>
                </button>
            </div>
            <a className='form__login-github' href='https://www.google.com'>Or login with Github</a>
        </div>
    )
}

export default LoginForm
