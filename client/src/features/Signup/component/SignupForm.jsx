import React, { useState, useRef } from 'react'
import './SignupForm.scss'
import { useForm } from 'react-hook-form'
import { AiOutlineLock } from 'react-icons/ai';
import { BsPerson } from 'react-icons/bs'
import { BiShow, BiHide } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { userSignUp } from '../SignupSlice'

function SignupForm() {
    const {register, reset, handleSubmit, formState: { errors } } = useForm()

    const refPassword = useRef(null);
    
    const [error, setError] = useState('')
    const [isShow, setisShow] = useState(false)

    const dispatch = useDispatch()

    const toggleShow = () => {
        setisShow(!isShow)
    }

   const onHandleSubmit = (data) => {
        // const today = new Date()

        // const createAt = today.getDate() + '-' + (today.getMonth() + 1) + '-' + 
        // today.getFullYear() + ' ' + today.getHours() + ':' + 
        // today.getMinutes() + ':' + today.getSeconds()

        // dispatch(
        //     userSignUp({
        //         fullName: data.fullName,
        //         email: data.email,
        //         password: data.password,
        //         createAt, 
        //         setError
        //     })
        // )

        // dispatch(userSignUp(data));

        console.log(data)
        // reset({
        //     fullName: data.fullName,
        //     email: '',
        //     password: ''
        // })
   }

    return (
        <form className='signup-form' onSubmit={handleSubmit(onHandleSubmit)}>
            <div className='signup-form__title'>
                <span className='signup-form__title__text'>Let's go!</span>
            </div>
            <div className='signup-form__confirm-password-container'>
                <span className='signup-form__confirm-password-container__label'>Confirm password</span>
                <div className='confirm-password-textbox'>
                    <input className='confirm-password-textbox__input' placeholder='*****' 
                     name='confirmPassword' type={'password'}
                     {...register("confirmPassword", { required: "This field is required!", 
                     validate: value => value === refPassword.current || "Password do not match! Please try again" })} 
                    />
                </div>
                { errors.confirmPassword && <p style={{position: 'absolute', top: -39, fontSize: 12}} className='signup-form__error'>{errors.confirmPassword.message}</p> }
            </div>
            <div className='signup-form__password-container'>
                <span className='signup-form__password-container__label'>Choose Password</span>
                <div className='password-textbox'>
                        <input className='password-textbox__input' placeholder='*****' type={isShow ? 'text' : 'password'}
                        name='password' 
                        ref={refPassword}
                        {...register("password", { required: "This field is required!", 
                        minLength: {value: 5, message: "Password must be 5-18 characters long"}, 
                        maxLength: {value: 18, message: "Password must be 5-18 characters long"} })} 
                        />
                        { isShow ? 
                            <BiHide className='password-textbox__hide-password' onClick={() => toggleShow()} style={{fontSize: 25}}/> : 
                            <BiShow className='password-textbox__hide-password' onClick={() => toggleShow()} style={{fontSize: 24}}/> 
                        }
                </div>
                { errors.password && <p style={{position: 'absolute', top: 42, fontSize: 12}} className='signup-form__error'>{errors.password.message}</p> }
            </div>
            <div className='signup-form__fullname-container'>
                <span className='signup-form__fullname-container__label'>Username</span>
                <div className='fullname-textbox'>
                    <input className='fullname-textbox__input' placeholder="John Smith" 
                    name='username' 
                    {...register('username', { required: "This field is required!" })}
                    />
                </div>
                { errors.fullName && <p style={{position: 'absolute', top: 127, fontSize: 12}} className='signup-form__error'>{errors.fullName.message}</p> }
                {(error != '') ? (<p style={{ position: 'absolute', top: 127, fontSize: 12 }} className='signup-form__error'>{error}</p>) : ''}
            </div>
            <AiOutlineLock style={{
                top: 320,
                left: 67,
                position: "absolute",
                fontSize: 28,
                color: 'gray'
            }} />
            <AiOutlineLock style={{
                top: 236,
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
