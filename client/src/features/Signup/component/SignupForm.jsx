import React from 'react'
import './SignupForm.scss'
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { BsPerson } from 'react-icons/bs'

function SignupForm() {
    return (
        <div className='form'>
            <div className='form__title'>
                <span className='form__title__text'>Let's Go!</span>
            </div>
            <div className='form__email-container'>
                <div className='email-textbox' 
                    style={{
                        height: 45,
                        width: 400,
                        position: "absolute",
                        left: 0,
                        top: 28,
                        borderWidth: 1,
                        borderColor: "#000000",
                        borderStyle: "solid"
                }}>
                    <input className='email-textbox__input' placeholder='example@mail.com'></input>
                </div>
                <span className='form__email-container__label'>Email</span>
            </div>
            <div className='form__password-container'>
                <span className='form__password-container__label'>Password</span>
                <div className='password-textbox' 
                    style={{
                        height: 45,
                        width: 400,
                        position: "absolute",
                        left: 0,
                        top: 80,
                        borderWidth: 1,
                        borderColor: "#000000",
                        borderStyle: "solid"
                    }}>
                        <input className='password-textbox__input' placeholder='*****'></input>
                </div>
            </div>
            <div className='form__fullname-container'>
                <span className='form__fullname-container__label'>Full Name</span>
                <div className='fullname-textbox' style={{
                        height: 45,
                        width: 400,
                        position: "absolute",
                        left: 0,
                        top: 40,
                        borderWidth: 1,
                        borderColor: "#000000",
                        borderStyle: "solid"
                    }}>
                    <input className='fullname-textbox__input' placeholder="John Smith"></input>
                </div>
            </div>
            <AiOutlineMail style={{
                top: 205,
                left: 64,
                position: "absolute",
                fontSize: 30,
                color: 'gray'
            }}></AiOutlineMail>
            <AiOutlineLock style={{
                top: 300,
                left: 63,
                position: "absolute",
                fontSize: 30,
                color: 'gray'
            }}></AiOutlineLock>
            <BsPerson style={{
                top: 108,
                left: 63,
                position: "absolute",
                fontSize: 30,
                color: 'gray'
            }}></BsPerson>
            <div className='form__joinnow-btn-container'>
                <button className='joinnow-btn'>
                    <span className='joinnow-btn__text'>Join now</span>
                </button>
            </div>
            <a className='form__login-github' href='https://www.google.com'>Or login with Github</a>
            <span className='form__footer'>By clicking the button above, you agree to our 
                <a href='https://www.google.com'> Terms of Service</a> and <a href='https://www.google.com'>Privacy Policy</a>
            </span>
        </div>
    )
}

export default SignupForm
