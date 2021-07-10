import React from 'react';
import './ForgotPasswordScreen.scss'
import LoginForm from './component/ForgotPasswordForm.jsx'
import { AiOutlineQuestionCircle } from 'react-icons/ai';

function LoginScreen() {
    return (
        <div className='forgot'>
            <div className='forgot__form'>
                <LoginForm />
            </div>
            <button className='help-btn' 
                    style={{
                        height: 60,
                        width: 60,
                        left: 1130,
                        top: -11 
                    }}>
                <AiOutlineQuestionCircle style={{
                        fontSize: 24
                    }}
                ></AiOutlineQuestionCircle>
                <span className='help-btn__text'>Help</span>
            </button>
            <div className='forgot__signup'>
                <span className='forgot__signup__text'>Don't have an account?</span>
            </div>
            <button className='signup-btn'>
                <span className='signup-btn__text'>Sign up</span>                
            </button>
            <div className='forgot__slogan-row'>
                <div className='forgot__slogan-row__stack'>
                    <span className='forgot__slogan-row__stack__text'>This is the slogan</span>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen