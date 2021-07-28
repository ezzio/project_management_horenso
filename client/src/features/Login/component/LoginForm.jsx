import React, { useState } from 'react'
import './LoginForm.scss'
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { Link } from 'react-router-dom'

function LoginForm(props) {
    const {Login, error} = props

    const [details, setDetails] = useState({email: '', password: ''})

    const submitHandler = (e) => {
        e.preventDefault()
        Login(details)
        setDetails({email: '', password: ''})
    }

    return (
        <div className='login-form'>
            <div className='login-form__title'>
                <span className='login-form__title__text'>Welcome!</span>
            </div>
            <div className='login-form__email-container'>
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
                    <input className='email-textbox__input' placeholder='Enter your email' 
                    type='text' name='email' id='email' value={details.email}
                    onChange={(e) => setDetails({...details, name: e.target.value})}
                    />
                </div>
                <span className='login-form__email-container__label'>Email</span>
            </div>
            <div className='login-form__password-container'>
                <span className='login-form__password-container__label'>Password</span>
                <div className='password-textbox' 
                    style={{
                        height: 45,
                        width: 400,
                        position: "absolute",
                        left: 0,
                        top: 0,
                        borderWidth: 1,
                        borderColor: "#000000",
                        borderStyle: "solid"
                }}>
                    <input className='password-textbox__input' placeholder='Enter password' 
                    type='password' name='password' id='password' value={details.password}
                    onChange={(e) => setDetails({...details, name: e.target.value})}
                    />
                </div>
            </div>
            <Link className='login-form__forgotpassword' path='/ForgotPassword'>Forgot password?</Link>
            <AiOutlineMail style={{ 
                top: 118,
                left: 64,
                position: "absolute",
                fontSize: 30,
                color: 'gray'
            }} />
            <AiOutlineLock style={{
                top: 210,
                left: 64,
                position: "absolute",
                fontSize: 30,
                color: 'gray'
            }} />
            <div>
                {(error != '') ? (<p style={{color: 'red'}}>{error}</p>) : ''}
            </div>
            <div className='login-form__login-btn-container'>
                <button className='login-btn'>
                    <span className='login-btn__text'>Log In</span>
                </button>
            </div>
            <a className='login-form__login-github' href='https://www.google.com'>Or login with Github</a>
        </div>
    )
}

export default LoginForm
