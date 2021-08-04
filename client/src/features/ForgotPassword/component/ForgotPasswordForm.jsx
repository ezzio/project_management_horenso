import React from 'react'
import './ForgotPasswordForm.scss'
import { AiOutlineMail } from 'react-icons/ai';
import { Link } from 'react-router-dom'

function ForgotPasswordForm() {
    return (
        <div className='forgotpassword-form'>
            <div className='forgotpassword-form__title'>
                <span className='forgotpassword-form__title__text'>Welcome!</span>
            </div>
            <div className='forgotpassword-form__email-container'>
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
                    <input className='email-textbox__input' placeholder='Enter your email' />
                </div>
                <span className='forgotpassword-form__email-container__label'>Email</span>
            </div>
            <AiOutlineMail style={{
                top: 127,
                left: 64,
                position: "absolute",
                fontSize: 30,
                color: 'gray'
            }} />
            <div className='forgotpassword-form__sendlink-btn-container'>
                <button className='sendlink-btn'>
                    <span className='sendlink-btn__text'>Send me the link</span>
                </button>
            </div>
            <Link className='forgotpassword-form__login' path='/'>Or Log in</Link>
        </div>
    )
}

export default ForgotPasswordForm