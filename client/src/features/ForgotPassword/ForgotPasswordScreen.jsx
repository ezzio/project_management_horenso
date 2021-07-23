import React from 'react';
import './ForgotPasswordScreen.scss'
import LoginForm from './component/ForgotPasswordForm.jsx'
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { useHistory } from 'react-router-dom'

function LoginScreen() {
    const history = useHistory()

    const forgotPasswordToSignUp = () => {
        history.push('/Signup')
    }

    return (
        <div className='forgot'>
            <div className='forgot__form'>
                <LoginForm />
            </div>
            <button className='help-btn' 
                    style={{
                        height: 60,
                        width: 60,
                        left: 1135,
                        top: -11 
            }}>
                <AiOutlineQuestionCircle style={{
                        fontSize: 24
                }}/>
                <span className='help-btn__text'>Help</span>
            </button>
            <div className='forgot__signup'>
                <span className='forgot__signup__text'>Don't have an account?</span>
            </div>
            <button className='signup-btn' onClick={() => forgotPasswordToSignUp()}>
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
