import React from 'react'
import './ForgotPasswordScreen.scss'
import ForgotPasswordForm from './component/ForgotPasswordForm.jsx'
import { AiOutlineQuestionCircle } from 'react-icons/ai'

function ForgotPasswordScreen() {
    return (
        <div className='forgotpassword'>
            <div className='forgotpassword__form'>
                <ForgotPasswordForm  
                    style={{
                        height: 300,
                        width: 500
                    }}
                ></ForgotPasswordForm>
                <button className='help-btn'
                    style={{
                        height: 60,
                        width: 60,
                        marginLeft: 11,
                        marginTop: 239
                    }}>
                        <AiOutlineQuestionCircle 
                            style={{
                                color: "#fff",
                                fontSize: 24
                            }}
                        ></AiOutlineQuestionCircle>    
                        <span className='help-btn__text'>Help</span>
                </button>
            </div>
            <input className='forgotpassword__slogan' placeholder='This is the slogan'></input>
            <div className='forgotpassword__signup-container'>
                <span className='forgotpassword__signup-container__text'>Don't have an account?</span>
                <button className='signup-btn'>
                    <span className='signup-btn__text'>Sign up</span>
                </button>
            </div>
        </div>
    )
}

export default ForgotPasswordScreen
