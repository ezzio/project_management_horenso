import React from 'react';
import "./SignupScreen.scss";
import LoginForm from './component/SignupForm.jsx';
import { AiOutlineQuestionCircle } from 'react-icons/ai';

function SignupScreen() {
    return (
        <div className='signup'>
            <div className='signup__form'>
                <LoginForm />
            </div>
            <button className='help-btn' 
                    style={{
                        height: 60,
                        width: 60,
                        left: 1130,
                        top: 90 
                    }}>
                <AiOutlineQuestionCircle style={{
                        fontSize: 24
                    }}
                ></AiOutlineQuestionCircle>
                <span className='help-btn__text'>Help</span>
            </button>
            <div className='signup__login'>
                <span className='signup__login__text'>Already joined?</span>
            </div>
            <button className='logon-btn'>
                <span className='logon-btn__text'>Login</span>                
            </button>
            
        </div>
    )
}

export default SignupScreen