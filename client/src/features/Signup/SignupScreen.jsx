import React from 'react';
import './SignupScreen.scss';
import SignupForm from './component/SignupForm.jsx'
import { AiOutlineQuestionCircle } from 'react-icons/ai';

function SignupScreen() {
    return (
        <div className='Signup'>
            <div className='Signup__form'>
                <SignupForm 
                    style={{
                        width: 500,
                        height: 510
                    }}
                ></SignupForm>
            </div>
            <button className='help-btn'
                    style={{
                        height: 36,
                        width: 100,
                        marginLeft: 6
                    }}>
                <AiOutlineQuestionCircle style={{
                        fontSize: 24
                    }}
                ></AiOutlineQuestionCircle>
                <span className='help-btn__text'>Help</span>
            </button>
            <div className='Signup__already-joined'>
                <span className='Signup__already-joined__text'>Already joined?</span>
                <button className='login-btn'>
                    <span className='login-btn__text'>Login</span>
                </button>
            </div>
        </div>
    )
}

export default SignupScreen
