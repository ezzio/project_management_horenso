import React, { useState } from 'react'
import './ForgotPasswordForm.scss'
import { AiOutlineMail } from 'react-icons/ai';
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../ForgotPasswordSlice'

function ForgotPasswordForm(props) {

    const {register, reset, handleSubmit, formState: { errors } } = useForm() 
    
    const [error, setError] = useState('')

    const { setIsSent } = props

    const dispatch = useDispatch()

    const onHandleSubmit = (data) => {
        setError('')
        if ( dispatch(
                forgotPassword({
                    email: data.email,
                    setError
            }))) {
            setIsSent(true)
        }
        reset({
            email: data.email,
            password: ''
        })
    }

    return (
        <div onClick={handleSubmit(onHandleSubmit)} className='forgotpassword-form'>
            <div className='forgotpassword-form__title'>
                <span className='forgotpassword-form__title__text'>Welcome!</span>
            </div>
            <div className='forgotpassword-form__email-container'>
                <div className='email-textbox'>
                    <input className='email-textbox__input' placeholder='Enter your email' 
                    type='text' name='email' 
                    {...register("email", { required: "This field is required", 
                    pattern: {value: /^\S+@\S+$/i, message: 'Invalid email address'} })}
                    />
                </div>
                <span className='forgotpassword-form__email-container__label'>Email</span>
                { errors.email && <p style={{ position: 'absolute', top: 42, fontSize: 14 }} className='forgotpassword-form__error'>{errors.email.message}</p> }
                { (error && !errors.email) && <p style={{ position: 'absolute', top: 42, fontSize: 14}} className='forgotpassword-form__error'>{error}</p> }
            </div>
            <AiOutlineMail style={{
                top: 143,
                left: 64,
                position: "absolute",
                fontSize: 25,
                color: 'gray'
            }} />
            <div className='forgotpassword-form__sendlink-btn-container'>
                <button className='sendlink-btn'>
                    <span className='sendlink-btn__text'>Send me the link</span>
                </button>
            </div>
            <Link className='forgotpassword-form__login' path='/'>or Log in</Link>
        </div>
    )
}

export default ForgotPasswordForm
