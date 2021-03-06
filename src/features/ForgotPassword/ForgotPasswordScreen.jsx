import React, { useState } from 'react';
import './ForgotPasswordScreen.scss'
import LoginForm from './component/ForgotPasswordForm.jsx'
import LinkSent from './component/LinkSent.jsx'
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { useHistory } from 'react-router-dom'

function LoginScreen() {

    const [isSent, setIsSent] = useState(false)

    const history = useHistory()

    const forgotPasswordToSignUp = () => {
        history.push('/Signup')
    }

    return (
        <div className='forgot'>
            <div className='forgot__form'>
                { isSent ? <LinkSent /> : <LoginForm setIsSent={setIsSent}/>}
                {isSent ?
                <button className='help-btn2'>
                    <AiOutlineQuestionCircle style={{fontSize: 24, color: 'white'}}/>
                    <span className='help-btn2__text'>Help</span>
                </button> : 
                <button className='help-btn'>
                    <AiOutlineQuestionCircle style={{fontSize: 24, color: 'white'}}/>
                    <span className='help-btn__text'>Help</span>
                </button>}
            </div>
            <div className='forgot__signup-container'>
                <div className='forgot__signup'>
                    <span className='forgot__signup__text'>Don't have an account?</span>
                </div>
                <button className='signup-btn' onClick={() => forgotPasswordToSignUp()}>
                    <span className='signup-btn__text'>Sign up</span>                
                </button>
            </div>
            {/* <div className='forgot__slogan-row'>
                <div className='forgot__slogan-row__stack'>
                    <span className='forgot__slogan-row__stack__text'>This is the slogan</span>
                </div>
            </div> */}
        </div>
    )
}

export default LoginScreen
