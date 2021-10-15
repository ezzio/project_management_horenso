import React, { useState } from 'react'
import './SignupForm.scss'
import { useForm } from 'react-hook-form'
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { BsPerson } from 'react-icons/bs'
import { useDispatch } from 'react-redux'
import { userSignUp } from '../SignupSlice'

function SignupForm() {
    const {register, reset, handleSubmit, formState: { errors } } = useForm()
    
    const [error, setError] = useState('')
    const [isShow, setisShow] = useState(false)

    const dispatch = useDispatch()

    const toggleShow = () => {
        setisShow(!isShow)
    }

   const onHandleSubmit = (data) => {
        setError('')
        const today = new Date()

        const createAt = today.getDate() + '-' + (today.getMonth() + 1) + '-' + 
        today.getFullYear() + ' ' + today.getHours() + ':' + 
        today.getMinutes() + ':' + today.getSeconds()

        dispatch(
            userSignUp({
                fullName: data.fullName,
                email: data.email,
                password: data.password,
                createAt, 
                setError
            })
        )
        reset({
            fullName: data.fullName,
            email: '',
            password: ''
        })
   }

    return (
        <form className='signup-form' onSubmit={handleSubmit(onHandleSubmit)}>
            <div className='signup-form__title'>
                <span className='signup-form__title__text'>Let's go!</span>
            </div>
            <div className='signup-form__email-container'>
                <span className='signup-form__email-container__label'>Email</span>
                <div className='email-textbox'>
                    <input className='email-textbox__input' placeholder='example@mail.com' 
                     name='email' 
                     {...register("email", { required: "This field is required!", pattern: {value: /^\S+@\S+$/i, message: 'Invalid email address'} })} 
                    />
                </div>
                { errors.email && <p style={{position: 'absolute', top: -39, fontSize: 12}} className='signup-form__error'>{errors.email.message}</p> }
            </div>
            <div className='signup-form__password-container'>
                <span className='signup-form__password-container__label'>Choose Password</span>
                <div className='password-textbox'>
                        <input className='password-textbox__input' placeholder='*****' type={isShow ? 'text' : 'password'}
                        name='password' 
                        {...register("password", { required: "This field is required!", 
                        minLength: {value: 6, message: "Password must be 6-18 characters long"}, 
                        maxLength: {value: 18, message: "Password must be 6-18 characters long"} })} 
                        />
                        { isShow ? <span className='password-textbox__hide-password' onClick={() => toggleShow()}>Hide</span> : 
                        <span className='password-textbox__hide-password' onClick={() => toggleShow()}>Show</span> }
                </div>
                { errors.password && <p style={{position: 'absolute', top: 42, fontSize: 12}} className='signup-form__error'>{errors.password.message}</p> }
            </div>
            <div className='signup-form__fullname-container'>
                <span className='signup-form__fullname-container__label'>Full Name</span>
                <div className='fullname-textbox'>
                    <input className='fullname-textbox__input' placeholder="John Smith" 
                    name='fullName' 
                    {...register("fullName", { required: "This field is required!" })}
                    />
                </div>
                { errors.fullName && <p style={{position: 'absolute', top: 127, fontSize: 12}} className='signup-form__error'>{errors.fullName.message}</p> }
                {(error != '') ? (<p style={{ position: 'absolute', top: 127, fontSize: 12 }} className='signup-form__error'>{error}</p>) : ''}
            </div>
            <AiOutlineMail style={{
                top: 238,
                left: 68,
                position: "absolute",
                fontSize: 25,
                color: 'gray'
            }} />
            <AiOutlineLock style={{
                top: 320,
                left: 67,
                position: "absolute",
                fontSize: 28,
                color: 'gray'
            }} />
            <BsPerson style={{
                top: 152,
                left: 66,
                position: "absolute",
                fontSize: 28,
                color: 'gray'
            }} />
            <div className='signup-form__joinnow-btn-container'>
                <button type='submit' className='joinnow-btn'>
                    <span className='joinnow-btn__text'>Join now</span>
                </button>
            </div>
            <a className='signup-form__login-github' href='https://www.google.com'>or signup with Github</a>
            <span className='signup-form__footer'>By clicking the button above, you agree to our 
                <a href='https://www.google.com'> Terms of Service</a> and <a href='https://www.google.com'>Privacy Policy</a>
            </span>
        </form>
    )
}

export default SignupForm
