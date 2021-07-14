import React from 'react';
import "./LoginScreen.scss";
import LoginForm from './component/LoginForm.jsx';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { useHistory } from 'react-router-dom'

function LoginScreen() {
    const history = useHistory()

    const loginToSignUp = () => {
        history.push('/Signup')
    }

    return (
        <div className='login'>
            <div className='login__form'>
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
            <div className='login__signup'>
                <span className='login__signup__text'>Don't have an account?</span>
            </div>
            <button className='signup-btn' onClick={() => loginToSignUp()}>
                <span className='signup-btn__text'>Sign up</span>                
            </button>
            <div className='login__slogan-row'>
                <div className='login__slogan-row__stack'>
                    <span className='login__slogan-row__stack__text'>This is the slogan</span>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen
