import React from 'react';
import "./SignupScreen.scss";
import LoginForm from './component/SignupForm.jsx';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { useHistory } from 'react-router-dom'

function SignupScreen() {
    const history = useHistory()

    const signuptoLogin = () => {
        history.push('/login')
    }

    return (
        <div className='signup'>
            <div className='signup__form'>
                <LoginForm />
            </div>
            <div className='signup__logon-container'>
                <div className='signup__login'>
                    <span className='signup__login__text'>Already joined?</span>
                </div>
                <button className='signup__logon-btn' onClick={() => signuptoLogin()}>
                    <span className='signup__logon-btn__text'>Login</span>                
                </button>
            </div>
        </div>
    )
}

export default SignupScreen