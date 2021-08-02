import React, { useState, useEffect } from 'react'
import './SignupForm.scss'
import { AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { BsPerson } from 'react-icons/bs'

function SignupForm() {
    const [id, setId] = useState(1)
    // const [userName, setUserName] = useState('')
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    const [signUp, setSignUp] = useState({id: -1, userName: '', email: '', password: ''})
    const [users, setUsers] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (signUp.userName && signUp.email && signUp.password) {
            const newUser = {id, userName: signUp.userName, email: signUp.email, password: signUp.password}
            setUsers((users) => {
                return [...users, newUser]
            })
            setId((id) => {
                return id + 1
            })
            setSignUp({id: -1, userName: '', email: '', password: ''})
        }
    }

    useEffect(() => {
        console.log(users)
    }, [users])
    //check if array is updated

    return (
        <div className='signup-form'>
            <div className='signup-form__title'>
                <span className='signup-form__title__text'>Let's Go!</span>
            </div>
            <div className='signup-form__email-container'>
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
                    <label htmlFor='userName' />
                    <input className='email-textbox__input' placeholder='example@mail.com' 
                     name='userName' value={signUp.userName} type='text' id='userName' 
                     onChange={(e) => setSignUp(e.target.value)}
                    />
                </div>
                <span className='signup-form__email-container__label'>Email</span>
            </div>
            <div className='signup-form__password-container'>
                <span className='signup-form__password-container__label'>Password</span>
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
                        <label htmlFor='password' />
                        <input className='password-textbox__input' placeholder='*****' 
                        name='password' value={signUp.password} type='password' id='password'
                        onChange={(e) => setSignUp(e.target.value)}
                        />
                </div>
            </div>
            <div className='signup-form__fullname-container'>
                <span className='signup-form__fullname-container__label'>Full Name</span>
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
                    <label htmlFor='email' />
                    <input className='fullname-textbox__input' placeholder="John Smith" 
                    name='email' value={signUp.email} type='text' id='email'
                    onChange={(e) => setSignUp(e.target.value)}
                    />
                </div>
            </div>
            <AiOutlineMail style={{
                top: 205,
                left: 64,
                position: "absolute",
                fontSize: 30,
                color: 'gray'
            }} />
            <AiOutlineLock style={{
                top: 300,
                left: 63,
                position: "absolute",
                fontSize: 30,
                color: 'gray'
            }} />
            <BsPerson style={{
                top: 108,
                left: 63,
                position: "absolute",
                fontSize: 30,
                color: 'gray'
            }} />
            <div className='signup-form__joinnow-btn-container'>
                <button type='submit' onClick={handleSubmit} className='joinnow-btn'>
                    <span className='joinnow-btn__text'>Join now</span>
                </button>
            </div>
            <a className='signup-form__login-github' href='https://www.google.com'>Or login with Github</a>
            <span className='signup-form__footer'>By clicking the button above, you agree to our 
                <a href='https://www.google.com'> Terms of Service</a> and <a href='https://www.google.com'>Privacy Policy</a>
            </span>
        </div>
    )
}

export default SignupForm
