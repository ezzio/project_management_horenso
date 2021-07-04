import React from 'react';
import {AiOutlineMail} from 'react-icons/ai';

function ForgotPasswordForm() {
    return (
        <div className='form'>
            <div className='form__icon-container'>
                <AiOutlineMail style={{
                    fontSize: 40
                }}
                ></AiOutlineMail>
                <div className='email-textbox'
                    style={{
                        height: 45,
                        width: 400,
                        borderWidth: 1,
                        borderColor: "#000000",
                        borderStyle: "solid"
                    }}>
                    <span className='email-textbox__text'>Enter your email</span>
                    <input className='email-textbox__input'></input>
                </div>
            </div>
            <button className='sendlink-btn'
                style={{
                    height: 45,
                    width: 400,
                    marginTop: 31,
                    marginLeft: 64
                }}>
                <span className='sendlink-btn__text'>Send me the link</span>
            </button>
            <span className='form__email-text'>Email</span>
            <span className='form__signin'>Or Sign In</span>
            <span className='form__title'>Welcome!</span>
        </div>
    )
}

export default ForgotPasswordForm
