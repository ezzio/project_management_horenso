import React from 'react'
import './ForgotPasswordForm.scss'
import { AiOutlineMail } from 'react-icons/ai';

function ForgotPasswordForm() {
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
            <AiOutlineMail style={{
                top: 127,
                left: 64,
                position: "absolute",
                fontSize: 30,
                color: 'gray'
            }}></AiOutlineMail>
            <div className='form__sendlink-btn-container'>
                <button className='sendlink-btn'>
                    <span className='sendlink-btn__text'>Send me the link</span>
                </button>
            </div>
            <a className='form__login' href='https://www.google.com'>Or Log in</a>
        </div>
    )
}

export default ForgotPasswordForm
