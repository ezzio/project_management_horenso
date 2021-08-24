import React, { useState } from 'react';
import "./ResetPasswordScreen.scss";
import ResetPasswordForm from './component/ResetPasswordForm.jsx';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { useHistory } from 'react-router-dom'

function ResetPasswordScreen() {
    const history = useHistory()

    const loginToSignUp = () => {
        history.push('/Signup')
    }
    
    return (
        <div className='reset'>
            <div className='reset__form'>
                <ResetPasswordForm/>
                <button className='help-btn'>
                    <AiOutlineQuestionCircle style={{color: 'white', fontSize: 24}} />
                <span className='help-btn__text'>Help</span>
            </button>
            </div>
            <div className='reset__signup-container'>
                <div className='reset__signup'>
                    <span className='reset__signup__text'>Don't have an account?</span>
                </div>
                <button className='signup-btn' onClick={() => loginToSignUp()}>
                    <span className='signup-btn__text'>Sign up</span>                
                </button>
            </div>
        </div>
    )
}

export default ResetPasswordScreen
