import React, { useState } from 'react'
import './ResetPasswordForm.scss'
import { useForm } from 'react-hook-form'
import { AiOutlineLock} from 'react-icons/ai';
import { BsWatch } from 'react-icons/bs';


function LoginForm(props) {

    const {register, reset, handleSubmit, watch, formState: { errors } } = useForm()

    const createPassword = (data) => {
        console.log(data)
    }   

    return (
        <form onSubmit={handleSubmit(createPassword)} className='reset-form'>
            <div className='reset-form__title'>
                <span className='reset-form__title__text'>Create new password!</span>
            </div>
            <div className='reset-form__email-container'>
                <div className='password-textbox'>
                    <input className='password-textbox__input' placeholder='Enter password' 
                     type='password' name='password' 
                    {...register("password", { required: "This field is required", 
                    minLength: {value: 6, message: "Password must be 6-18 characters long"}, 
                    maxLength: {value: 18, message: "Password must be 6-18 characters long"} })} 
                    />
                    <span className='reset-form__email-container__label'>Choose new password</span>
                </div>
                { errors.password && <p style={{ position: 'absolute', top: 42, fontSize: 14 }} className='reset-form__error'>{errors.password.message}</p> }
            </div>
            <div className='reset-form__password-container'>
                <span className='reset-form__password-container__label'>Confirm</span>
                <div className='confirm-textbox'>
                    <input className='confirm-textbox__input' placeholder='Confirm password' 
                    type='password' name='confirm' 
                    {...register("confirm", { required: "This field is required"}, 
                    { validate: value => value === watch('password', '') || 'Password must match'} )} 
                    />
                </div>
                { errors.confirm && <p style={{ position: 'absolute', top: 42, fontSize: 14 }} className='reset-form__error'>{errors.confirm.message}</p> }
            </div>
            <AiOutlineLock style={{ 
                top: 145,
                left: 64,
                position: "absolute",
                fontSize: 25,
                color: 'gray'
            }} />
            <AiOutlineLock style={{
                top: 227,
                left: 64,
                position: "absolute",
                fontSize: 25,
                color: 'gray'
            }} />
            <div>
            </div>
            <div className='reset-form__login-btn-container'>
                <button type='submit' className='create-btn'>
                    <span className='create-btn__text'>Create Password</span>
                </button>
            </div>
        </form>
    )
}

export default LoginForm