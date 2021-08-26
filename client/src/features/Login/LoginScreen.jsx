import React, { useState } from 'react';
import "./LoginScreen.scss";
import LoginForm from './component/LoginForm.jsx';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { useHistory } from 'react-router-dom'

function LoginScreen() {

    const history = useHistory()

    const loginToSignUp = () => {
        history.push('/Signup')
    }

    // const [user, setUser] = useState({id: -1, name: '', email: ''})
    // const [error, setError] = useState('')

    // const Login = (details) => {
    //     console.log(details)
    //     for (let i = 0; i < loginData.length; i++){
    //         if (details.email === loginData[i].email && details.password === loginData[i].password){
    //             setUser({
    //                 id: loginData[i].id,
    //                 name: loginData[i].name,
    //                 email: loginData[i].email,
    //             })
    //             console.log('Login successfully')
    //         }
    //     }
    //     if (user.id === -1){
    //         setError('Email or password incorrect!')
    //     }
    //     console.log(user)
    // }
    
    return (
        <div className='login'>
            <div className='login__form'>
                <LoginForm/>
                <button className='help-btn'>
                    <AiOutlineQuestionCircle style={{color: 'white', fontSize: 24}} />
                    <span className='help-btn__text'>Help</span>
                </button>
            </div>
            <div className='login__signup-container'>
                <div className='login__signup'>
                    <span className='login__signup__text'>Don't have an account?</span>
                </div>
                <button className='signup-btn' onClick={() => loginToSignUp()}>
                    <span className='signup-btn__text'>Sign up</span>                
                </button>
            </div>
            {/* <div className='login__slogan-container'>
                <span className='login__slogan-container__text'>This is the slogan</span>
            </div> */}
        </div>
    )
}

export default LoginScreen
