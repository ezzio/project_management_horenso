import React, { useState } from 'react'
import './LoginForm.scss'
import { useForm } from 'react-hook-form'
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { Link } from 'react-router-dom'


function LoginForm(props) {
    const {Login, error} = props

    const {register, reset, handleSubmit, formState: { errors } } = useForm()

    const submitHandler = (data) => {
        Login(data)
        reset({
            email: data.email,
            password: ''
        })
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)} className='login-form'>
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
                    type='text' name='email' 
                    {...register("email", { required: "This field is required", 
                    pattern: {value: /^\S+@\S+$/i, message: 'Invalid email address'} })} 
                    />
                    <span className='login-form__email-container__label'>Email</span>
                </div>
                { errors.email && <p style={{ marginTop: 70 }} className='login-form__error'>{errors.email.message}</p> }
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
                    type='password' name='password' 
                    {...register("password", { required: "This field is required", 
                    minLength: {value: 6, message: "Password must be 6-18 characters long"}, 
                    maxLength: {value: 18, message: "Password must be 6-18 characters long"} })} 
                    />
                </div>
                { errors.password && <p style={{ marginTop: 50 }} className='login-form__error'>{errors.password.message}</p> }
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
                {(error != '') ? (<p style={{ marginTop: -220, marginLeft: 167 }} className='login-form__error'>{error}</p>) : ''}
            </div>
            <div className='login-form__login-btn-container'>
                <button type='submit' className='login-btn'>
                    <span className='login-btn__text'>Log In</span>
                </button>
            </div>
            <a className='login-form__login-github' href='https://www.google.com'>Or login with Github</a>
        </form>
    )
}

export default LoginForm
